import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";
import { HugeiconsIcon, Cancel01Icon } from "../../../constants/icons";
import type { SelectedSeat } from "../utils/types";

type SelectedSeatsChipsProps = {
  selectedList: SelectedSeat[];
  onRemoveSeat: (row: number, seat: number) => void;
};

export function SelectedSeatsChips({
  selectedList,
  onRemoveSeat,
}: SelectedSeatsChipsProps) {
  if (selectedList.length === 0) return null;
  return (
    <View style={styles.selectedWrap}>
      {selectedList.map(({ row, seat }) => (
        <View key={`${row}-${seat}`} style={styles.selectedChip}>
          <Text style={styles.selectedChipText}>
            {seat} / {row} row
          </Text>
          <Pressable onPress={() => onRemoveSeat(row, seat)} hitSlop={8}>
            <HugeiconsIcon
              icon={Cancel01Icon}
              size={16}
              color={colors.textSecondary}
              strokeWidth={1.5}
            />
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  selectedWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.lg,
    justifyContent: "center",
  },
  selectedChip: {
    flexDirection: "row",
    alignItems: "center",
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
    fontFamily: fonts.regular,
    color: colors.text,
    marginRight: spacing.xs,
  },
});
