import React from "react";
import { Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";

export type DateOption = { label: string; key: string; date: string };

type DateSectionProps = {
  dates: DateOption[];
  selectedDate: DateOption;
  onSelectDate: (date: DateOption) => void;
};

export function DateSection({
  dates,
  selectedDate,
  onSelectDate,
}: DateSectionProps) {
  return (
    <>
      <Text style={styles.sectionTitle}>Date</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.datesRow}
      >
        {dates.map((d) => (
          <Pressable
            key={d.key}
            style={[
              styles.dateChip,
              selectedDate.key === d.key && styles.dateChipSelected,
            ]}
            onPress={() => onSelectDate(d)}
          >
            <Text
              style={[
                styles.dateChipText,
                selectedDate.key === d.key && styles.dateChipTextSelected,
              ]}
            >
              {d.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  datesRow: {
    flexDirection: "row",
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
    fontFamily: fonts.medium,
    color: colors.text,
  },
  dateChipTextSelected: {
    color: "#FFF",
  },
});
