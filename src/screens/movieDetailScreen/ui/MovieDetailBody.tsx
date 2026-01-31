import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";

type MovieDetailBodyProps = {
  title: string;
  releaseDate: string | null;
  overview: string | null;
  error: string | null;
  hasTrailer: boolean;
  onWatchTrailer: () => void;
  onGetTickets: () => void;
};

export function MovieDetailBody({
  title,
  releaseDate,
  overview,
  error,
  hasTrailer,
  onWatchTrailer,
  onGetTickets,
}: MovieDetailBodyProps) {
  return (
    <View style={styles.body}>
      <Text style={styles.title}>{title}</Text>
      {releaseDate ? (
        <Text style={styles.release}>In Theaters {releaseDate}</Text>
      ) : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {overview ? (
        <Text style={styles.overview}>{overview}</Text>
      ) : null}
      <View style={styles.actions}>
        {hasTrailer ? (
          <Pressable style={styles.primaryButton} onPress={onWatchTrailer}>
            <Text style={styles.primaryButtonText}>Watch Trailer</Text>
          </Pressable>
        ) : null}
        <Pressable style={styles.secondaryButton} onPress={onGetTickets}>
          <Text style={styles.secondaryButtonText}>Get Tickets</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.md,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  release: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  overview: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  errorText: {
    color: "#c0392b",
    fontSize: 14,
    fontFamily: fonts.regular,
    marginBottom: spacing.sm,
  },
  actions: {
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
});
