import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fonts } from "../../../constants/theme";

export function ScreenIndicator() {
  return (
    <View style={styles.screenWrap}>
      <View style={styles.screenCurve} />
      <Text style={styles.screenText}>SCREEN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrap: {
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  screenCurve: {
    width: "80%",
    height: 8,
    backgroundColor: colors.screenCurve,
    borderRadius: 4,
    opacity: 0.8,
  },
  screenText: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
