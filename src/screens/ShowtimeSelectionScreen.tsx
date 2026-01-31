import React, { useCallback, useState } from 'react';
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
import type { TMDBMovieListItem } from '../types/api';
import { colors, spacing, borderRadius } from '../constants/theme';

type Nav = NativeStackNavigationProp<WatchStackParamList, 'ShowtimeSelection'>;
type Route = RouteProp<WatchStackParamList, 'ShowtimeSelection'>;

const DATES = [
  { label: '5 Mar', key: '5-Mar', date: 'March 5, 2021' },
  { label: '6 Mar', key: '6-Mar', date: 'March 6, 2021' },
  { label: '7 Mar', key: '7-Mar', date: 'March 7, 2021' },
  { label: '8 Mar', key: '8-Mar', date: 'March 8, 2021' },
  { label: '9 Mar', key: '9-Mar', date: 'March 9, 2021' },
];

const SHOWTIMES = [
  { time: '12:30', hall: 'Cinetech + Hall 1', price: 50, bonus: 2500 },
  { time: '13:30', hall: 'Cinetech', price: 75, bonus: 300 },
  { time: '14:00', hall: 'Hall 2', price: 50, bonus: 2500 },
];

function SeatPreview() {
  const size = 6;
  const rows = 4;
  const cols = 8;
  const seats: ('available' | 'taken')[] = [];
  for (let i = 0; i < rows * cols; i++) {
    seats.push(i % 7 === 3 || i % 11 === 2 ? 'taken' : 'available');
  }
  return (
    <View style={seatPreviewStyles.wrap}>
      {Array.from({ length: rows }).map((_, row) => (
        <View key={row} style={seatPreviewStyles.row}>
          {Array.from({ length: cols }).map((_, col) => {
            const idx = row * cols + col;
            const taken = seats[idx] === 'taken';
            return (
              <View
                key={col}
                style={[
                  seatPreviewStyles.seat,
                  { width: size, height: size },
                  taken ? seatPreviewStyles.taken : seatPreviewStyles.available,
                ]}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const seatPreviewStyles = StyleSheet.create({
  wrap: { padding: 4 },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 2, marginBottom: 2 },
  seat: { borderRadius: 2 },
  available: { backgroundColor: colors.seat.regular },
  taken: { backgroundColor: colors.seat.unavailable },
});

export function ShowtimeSelectionScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { movie } = route.params;
  const { width } = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [selectedShowtime, setSelectedShowtime] = useState<typeof SHOWTIMES[0] | null>(null);

  const goBack = useCallback(() => navigation.goBack(), [navigation]);
  const openSeatMap = useCallback(() => {
    const st = selectedShowtime ?? SHOWTIMES[0];
    navigation.navigate('SeatMap', {
      movieTitle: movie.title,
      showtime: st.time,
      hall: st.hall,
      date: selectedDate.date,
    });
  }, [navigation, movie.title, selectedDate, selectedShowtime]);

  const cardWidth = Math.min(width - spacing.md * 2, 320);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.backButton} hitSlop={12}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>{movie.title}</Text>
          <Text style={styles.headerSub}>In Theaters December 22, 2021</Text>
        </View>
        <View style={styles.headerRight} />
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Date</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.datesRow}
        >
          {DATES.map((d) => (
            <Pressable
              key={d.key}
              style={[styles.dateChip, selectedDate.key === d.key && styles.dateChipSelected]}
              onPress={() => setSelectedDate(d)}
            >
              <Text style={[styles.dateChipText, selectedDate.key === d.key && styles.dateChipTextSelected]}>
                {d.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={styles.sectionTitle}>Showtime</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.showtimeRow}
        >
          {SHOWTIMES.map((st) => {
            const isSelected = selectedShowtime?.time === st.time && selectedShowtime?.hall === st.hall;
            return (
              <Pressable
                key={`${st.time}-${st.hall}`}
                style={[styles.showtimeCard, { width: cardWidth }, isSelected && styles.showtimeCardSelected]}
                onPress={() => setSelectedShowtime(st)}
              >
                <Text style={styles.showtimeTitle}>{st.time} {st.hall}</Text>
                <View style={styles.seatPreviewWrap}>
                  <SeatPreview />
                </View>
                <Text style={styles.showtimePrice}>From {st.price}$ or {st.bonus} bonus</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </ScrollView>
      <View style={styles.footer}>
        <Pressable style={styles.selectSeatsButton} onPress={openSeatMap}>
          <Text style={styles.selectSeatsText}>Select Seats</Text>
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
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  datesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  dateChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
  },
  dateChipSelected: {
    backgroundColor: colors.primary,
  },
  dateChipText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  dateChipTextSelected: {
    color: '#FFF',
  },
  showtimeRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  showtimeCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
  },
  showtimeCardSelected: {
    borderColor: colors.primary,
  },
  showtimeTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  seatPreviewWrap: {
    alignSelf: 'center',
    marginVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  showtimePrice: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  footer: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  selectSeatsButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  selectSeatsText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
