import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";

type SeatMapFooterProps = {
  totalPrice: number;
  onProceedToPay?: () => void;
};

export function SeatMapFooter({
  totalPrice,
  onProceedToPay,
}: SeatMapFooterProps) {
  return (
    <View style={styles.footer}>
      <View style={styles.totalWrap}>
        <Text style={styles.totalLabel}>Total Price</Text>
        <Text style={styles.totalValue}>$ {totalPrice}</Text>
      </View>
      <Pressable
        style={styles.payButton}
        onPress={onProceedToPay}
      >
        <Text style={styles.payButtonText}>Proceed to pay</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
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
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
  totalValue: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.text,
  },
  payButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    justifyContent: "center",
  },
  payButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
});
