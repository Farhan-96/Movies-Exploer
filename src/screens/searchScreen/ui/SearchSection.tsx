import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fonts } from "../../../constants/theme";
import { SECTION_TITLE, SECTION_HINT } from "../utils/constants";

export function SearchSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{SECTION_TITLE}</Text>
      <Text style={styles.hint}>{SECTION_HINT}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  hint: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
});
