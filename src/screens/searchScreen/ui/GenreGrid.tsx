import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";
import { GENRE_GRID_ITEMS } from "../utils/constants";

const CARD_GAP = spacing.sm;
const CARD_MIN_HEIGHT = 100;

/** Gradient color pairs per genre (cycle if more genres than pairs). */
const CARD_GRADIENTS: [string, string][] = [
  ["#6B5B95", "#3D2C5E"],
  ["#4A5568", "#2D3748"],
  ["#C05621", "#744210"],
  ["#2B6B4A", "#1A4030"],
  ["#553C9A", "#32236A"],
  ["#B83280", "#702459"],
  ["#C53030", "#742A2A"],
  ["#2C5282", "#1A365D"],
  ["#744210", "#44337A"],
  ["#234E52", "#0F2027"],
];

export function GenreGrid() {
  const { width } = useWindowDimensions();
  const padding = spacing.md;
  const numColumns = 2;
  const cardWidth =
    (width - padding * 2 - CARD_GAP * (numColumns - 1)) / numColumns;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.grid, { paddingHorizontal: padding }]}>
        {GENRE_GRID_ITEMS.map((genre, index) => {
          const [start, end] =
            CARD_GRADIENTS[index % CARD_GRADIENTS.length];
          return (
            <View
              key={genre.id}
              style={[
                styles.cardWrap,
                {
                  width: cardWidth,
                  marginRight: (index + 1) % numColumns === 0 ? 0 : CARD_GAP,
                  marginBottom: CARD_GAP,
                },
              ]}
            >
              <LinearGradient
                colors={[start, end]}
                style={[styles.card, { minHeight: CARD_MIN_HEIGHT }]}
              >
                <Text style={styles.cardLabel} numberOfLines={1}>
                  {genre.name}
                </Text>
              </LinearGradient>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: spacing.xs,
  },
  cardWrap: {},
  card: {
    borderRadius: borderRadius.md,
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: spacing.md,
  },
  cardLabel: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.surface,
  },
});
