import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fonts } from "../../../constants/theme";

type MovieDetailBodyProps = {
  overview: string | null;
  error: string | null;
};

export function MovieDetailBody({ overview, error }: MovieDetailBodyProps) {
  return (
    <View style={styles.body}>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {overview ? (
        <>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overview}>{overview}</Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  overview: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  errorText: {
    color: "#c0392b",
    fontSize: 14,
    fontFamily: fonts.regular,
    marginBottom: spacing.sm,
  },
});
