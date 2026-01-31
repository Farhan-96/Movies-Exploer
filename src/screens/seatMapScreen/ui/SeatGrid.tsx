import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";
import type { SeatState } from "../utils/types";
import { getSeatColor } from "../utils/callbacks";
import { AISLE_AFTER, SEAT_SIZE, SEAT_GAP } from "../utils/callbacks";

type SeatGridProps = {
  seatState: SeatState[][];
  onToggleSeat: (row: number, col: number) => void;
  scale: number;
};

export function SeatGrid({
  seatState,
  onToggleSeat,
  scale,
}: SeatGridProps) {
  return (
    <View style={[styles.gridWrap, { transform: [{ scale }] }]}>
      {seatState.map((row, r) => (
        <View key={r} style={styles.row}>
          <Text style={styles.rowLabel}>{r + 1}</Text>
          <View style={styles.rowSeats}>
            {row.map((state, c) => {
              const isAisle = AISLE_AFTER.includes(c);
              return (
                <React.Fragment key={c}>
                  {isAisle ? (
                    <View style={{ width: SEAT_GAP + SEAT_SIZE }} />
                  ) : null}
                  <Pressable
                    style={[
                      styles.seat,
                      {
                        width: SEAT_SIZE,
                        height: SEAT_SIZE,
                        backgroundColor: getSeatColor(state),
                      },
                      state.type === "unavailable" && styles.seatDisabled,
                    ]}
                    onPress={() => onToggleSeat(r, c)}
                    disabled={state.type === "unavailable"}
                  />
                </React.Fragment>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridWrap: {
    marginVertical: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SEAT_GAP,
  },
  rowLabel: {
    width: 24,
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  rowSeats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SEAT_GAP,
  },
  seat: {
    borderRadius: 4,
  },
  seatDisabled: {
    opacity: 0.9,
  },
});
