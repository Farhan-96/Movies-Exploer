import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";
import { getPosterUrl, getBackdropUrl } from "../../../constants/config";
import type { TMDBImage } from "../../../types/api";

const POSTER_WIDTH = 120;
const POSTER_HEIGHT = 180;
const BACKDROP_WIDTH = 200;
const BACKDROP_HEIGHT = 112;

type MovieDetailImagesProps = {
  posters: TMDBImage[];
  backdrops: TMDBImage[];
};

export function MovieDetailImages({ posters, backdrops }: MovieDetailImagesProps) {
  const hasPosters = posters?.length > 0;
  const hasBackdrops = backdrops?.length > 0;
  if (!hasPosters && !hasBackdrops) return null;

  return (
    <View style={styles.section}>
      {hasPosters ? (
        <>
          <Text style={styles.sectionTitle}>Posters</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.row}
          >
            {posters.slice(0, 10).map((img) => (
              <Image
                key={img.file_path}
                source={{ uri: getPosterUrl(img.file_path, "w342") }}
                style={styles.poster}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        </>
      ) : null}
      {hasBackdrops ? (
        <>
          <Text style={[styles.sectionTitle, { marginTop: hasPosters ? spacing.lg : 0 }]}>
            Backdrops
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.row}
          >
            {backdrops.slice(0, 10).map((img) => (
              <Image
                key={img.file_path}
                source={{ uri: getBackdropUrl(img.file_path, "w780") }}
                style={styles.backdrop}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        </>
      ) : null}
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
  row: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingRight: spacing.md,
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.border,
  },
  backdrop: {
    width: BACKDROP_WIDTH,
    height: BACKDROP_HEIGHT,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.border,
  },
});
