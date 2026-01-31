import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";

type Genre = { id: number; name: string };

const GENRE_COLORS = [
  "#0D9488",
  "#DB2777",
  "#7C3AED",
  "#D97706",
  "#059669",
  "#4F46E5",
  "#DC2626",
  "#2563EB",
];

type MovieDetailGenresProps = {
  genres: Genre[];
};

export function MovieDetailGenres({ genres }: MovieDetailGenresProps) {
  if (!genres?.length) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Genres</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pills}
      >
        {genres.map((g, i) => (
          <View
            key={g.id}
            style={[
              styles.pill,
              { backgroundColor: GENRE_COLORS[i % GENRE_COLORS.length] },
            ]}
          >
            <Text style={styles.pillText}>{g.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  pills: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
  },
  pillText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: "#FFF",
  },
});
