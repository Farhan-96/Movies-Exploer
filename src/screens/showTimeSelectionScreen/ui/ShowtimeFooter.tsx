import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";

type ShowtimeFooterProps = {
  onSelectSeats: () => void;
};

export function ShowtimeFooter({ onSelectSeats }: ShowtimeFooterProps) {
  return (
    <View style={styles.footer}>
      <Pressable style={styles.selectSeatsButton} onPress={onSelectSeats}>
        <Text style={styles.selectSeatsText}>Select Seats</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  selectSeatsButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
  },
  selectSeatsText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
});
