import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { WatchStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius } from '../constants/theme';

type Nav = NativeStackNavigationProp<WatchStackParamList, 'SeatMap'>;
type Route = RouteProp<WatchStackParamList, 'SeatMap'>;

type SeatType = 'regular' | 'vip' | 'unavailable';
type SeatState = { type: SeatType; selected: boolean };

const ROWS = 10;
const COLS = 12;
const AISLE_AFTER = [4, 8];

function getSeatType(row: number, col: number): SeatType {
  if (row === ROWS - 1) return 'vip';
  if (row < 2 && col < 3) return 'vip';
  if (row === 2 && col >= 4 && col <= 7) return 'vip';
  if ((row + col) % 5 === 0 || (row * col) % 7 === 2) return 'unavailable';
  return 'regular';
}

const SEAT_SIZE = 20;
const SEAT_GAP = 4;

export function SeatMapScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { movieTitle, showtime, hall, date } = route.params;
  const { width } = useWindowDimensions();
  const grid = useMemo(() => {
    const g: SeatState[][] = [];
    for (let r = 0; r < ROWS; r++) {
      const row: SeatState[] = [];
      for (let c = 0; c < COLS; c++) {
        const type = getSeatType(r, c);
        row.push({ type, selected: false });
      }
      g.push(row);
    }
    return g;
  }, []);

  const [seatState, setSeatState] = useState<SeatState[][]>(grid);

  const toggleSeat = useCallback((row: number, col: number) => {
    const type = seatState[row][col].type;
    if (type === 'unavailable') return;
    setSeatState((prev) => {
      const next = prev.map((r) => r.map((s) => ({ ...s })));
      next[row][col] = { ...next[row][col], selected: !next[row][col].selected };
      return next;
    });
  }, [seatState]);

  const selectedList = useMemo(() => {
    const list: { row: number; seat: number }[] = [];
    seatState.forEach((row, r) => {
      row.forEach((seat, c) => {
        if (seat.selected) list.push({ row: r + 1, seat: c + 1 });
      });
    });
    return list;
  }, [seatState]);

  const totalPrice = useMemo(() => {
    let total = 0;
    seatState.forEach((row, r) => {
      row.forEach((seat, c) => {
        if (seat.selected) {
          total += seatState[r][c].type === 'vip' ? 150 : 50;
        }
      });
    });
    return total;
  }, [seatState]);

  const goBack = useCallback(() => navigation.goBack(), [navigation]);
  const removeSeat = useCallback((row: number, seat: number) => {
    setSeatState((prev) => {
      const next = prev.map((r) => r.map((s) => ({ ...s })));
      if (next[row - 1]?.[seat - 1]) next[row - 1][seat - 1].selected = false;
      return next;
    });
  }, []);

  const getSeatColor = (state: SeatState) => {
    if (state.selected) return colors.seat.selected;
    if (state.type === 'unavailable') return colors.seat.unavailable;
    if (state.type === 'vip') return colors.seat.vip;
    return colors.seat.regular;
  };

  const mapWidth = COLS * (SEAT_SIZE + SEAT_GAP) + (AISLE_AFTER.length * (SEAT_SIZE + SEAT_GAP));
  const scale = Math.min(1, (width - spacing.lg * 2) / mapWidth);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.backButton} hitSlop={12}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>{movieTitle}</Text>
          <Text style={styles.headerSub}>{date} | {showtime} {hall}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.screenWrap}>
          <View style={styles.screenCurve} />
          <Text style={styles.screenText}>SCREEN</Text>
        </View>
        <View style={[styles.gridWrap, { transform: [{ scale }] }]}>
          {seatState.map((row, r) => (
            <View key={r} style={styles.row}>
              <Text style={styles.rowLabel}>{r + 1}</Text>
              <View style={styles.rowSeats}>
                {row.map((state, c) => {
                  const isAisle = AISLE_AFTER.includes(c);
                  return (
                    <React.Fragment key={c}>
                      {isAisle ? <View style={{ width: SEAT_GAP + SEAT_SIZE }} /> : null}
                      <Pressable
                        style={[
                          styles.seat,
                          { width: SEAT_SIZE, height: SEAT_SIZE, backgroundColor: getSeatColor(state) },
                          state.type === 'unavailable' && styles.seatDisabled,
                        ]}
                        onPress={() => toggleSeat(r, c)}
                        disabled={state.type === 'unavailable'}
                      />
                    </React.Fragment>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.zoomWrap}>
          <Pressable style={styles.zoomBtn}><Text style={styles.zoomText}>+</Text></Pressable>
          <Pressable style={styles.zoomBtn}><Text style={styles.zoomText}>−</Text></Pressable>
        </View>
        <View style={styles.legend}>
          <View style={styles.legendRow}>
            <View style={[styles.legendBox, { backgroundColor: colors.seat.selected }]} />
            <Text style={styles.legendText}>Selected</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendBox, { backgroundColor: colors.seat.unavailable }]} />
            <Text style={styles.legendText}>Not available</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendBox, { backgroundColor: colors.seat.vip }]} />
            <Text style={styles.legendText}>VIP (150$)</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendBox, { backgroundColor: colors.seat.regular }]} />
            <Text style={styles.legendText}>Regular (50 $)</Text>
          </View>
        </View>
        {selectedList.length > 0 && (
          <View style={styles.selectedWrap}>
            {selectedList.map(({ row, seat }) => (
              <View key={`${row}-${seat}`} style={styles.selectedChip}>
                <Text style={styles.selectedChipText}>{seat} / {row} row</Text>
                <Pressable onPress={() => removeSeat(row, seat)} hitSlop={8}>
                  <Text style={styles.selectedChipX}>✕</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.totalWrap}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalValue}>$ {totalPrice}</Text>
        </View>
        <Pressable style={styles.payButton}>
          <Text style={styles.payButtonText}>Proceed to pay</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 32,
    color: colors.text,
    fontWeight: '300',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  headerSub: {
    fontSize: 13,
    color: colors.primary,
    marginTop: 2,
  },
  headerRight: {
    width: 40,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  screenWrap: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  screenCurve: {
    width: '80%',
    height: 8,
    backgroundColor: colors.screenCurve,
    borderRadius: 4,
    opacity: 0.8,
  },
  screenText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 4,
  },
  gridWrap: {
    marginVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SEAT_GAP,
  },
  rowLabel: {
    width: 24,
    fontSize: 12,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  rowSeats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SEAT_GAP,
  },
  seat: {
    borderRadius: 4,
  },
  seatDisabled: {
    opacity: 0.9,
  },
  zoomWrap: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  zoomBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomText: {
    fontSize: 18,
    color: colors.text,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.lg,
    marginTop: spacing.lg,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  selectedWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
    justifyContent: 'center',
  },
  selectedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: spacing.xs,
    paddingLeft: spacing.sm,
    paddingRight: spacing.xs,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedChipText: {
    fontSize: 13,
    color: colors.text,
    marginRight: spacing.xs,
  },
  selectedChipX: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.surface,
    gap: spacing.md,
  },
  totalWrap: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  totalLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  payButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
  },
  payButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
