import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import type { TMDBMovieListItem } from "../../../types/api";
import { getPosterUrl } from "../../../constants/config";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";
import { POSTER_ASPECT, CARD_MARGIN, POSTER_SIZE } from "../utils/constants";

type MovieCardProps = {
  item: TMDBMovieListItem;
  width: number;
  onPress: () => void;
};

export function MovieCard({ item, width, onPress }: MovieCardProps) {
  const posterUrl = getPosterUrl(item.poster_path, POSTER_SIZE);
  const cardWidth = width - CARD_MARGIN * 2;
  const cardHeight = cardWidth / POSTER_ASPECT;

  return (
    <Pressable
      style={[styles.card, { width: cardWidth, height: cardHeight }]}
      onPress={onPress}
    >
      <Image
        source={{ uri: posterUrl }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <View style={styles.cardOverlay} />
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.md,
    overflow: "hidden",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  cardTitle: {
    position: "absolute",
    left: spacing.md,
    bottom: spacing.md,
    right: spacing.md,
    fontSize: 20,
    fontFamily: fonts.bold,
    color: "#FFF",
  },
});
