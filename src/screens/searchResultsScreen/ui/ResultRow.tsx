import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import type { TMDBMovieListItem } from "../../../types/api";
import { getPosterUrl } from "../../../constants/config";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";
import { HugeiconsIcon, MoreHorizontalIcon } from "../../../constants/icons";
import { getGenreName } from "../utils/callbacks";
import { POSTER_SIZE } from "../utils/constants";

type ResultRowProps = {
  item: TMDBMovieListItem;
  onPress: () => void;
};

export function ResultRow({ item, onPress }: ResultRowProps) {
  const posterUrl = getPosterUrl(item.poster_path, POSTER_SIZE);
  const genre = getGenreName(item.genre_ids);

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image
        source={{ uri: posterUrl }}
        style={styles.rowPoster}
        resizeMode="cover"
      />
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.rowGenre} numberOfLines={1}>
          {genre}
        </Text>
      </View>
      <View style={styles.moreIconWrap}>
        <HugeiconsIcon
          icon={MoreHorizontalIcon}
          size={20}
          color={colors.primary}
          strokeWidth={1.5}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  rowPoster: {
    width: 130,
    height: 100,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.border,
  },
  rowContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  rowTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.text,
  },
  rowGenre: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    marginTop: 2,
  },
  moreIconWrap: {
    padding: spacing.sm,
  },
});
