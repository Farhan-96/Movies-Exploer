import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fonts } from "../../../constants/theme";

export function SeatLegend() {
  const items = [
    { color: colors.seat.selected, label: "Selected" },
    { color: colors.seat.unavailable, label: "Not available" },
    { color: colors.seat.vip, label: "VIP (150$)" },
    { color: colors.seat.regular, label: "Regular (50 $)" },
  ];
  return (
    <View style={styles.legend}>
      {items.map(({ color, label }) => (
        <View key={label} style={styles.legendRow}>
          <View style={[styles.legendBox, { backgroundColor: color }]} />
          <Text style={styles.legendText}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.lg,
    marginTop: spacing.lg,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
});
