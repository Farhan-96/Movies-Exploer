import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import type { TMDBMovieListItem } from "../../../types/api";
import { colors, spacing, fonts } from "../../../constants/theme";
import { SECTION_TITLE, MIN_SEARCH_LENGTH } from "../utils/constants";
import { GenreGrid } from "./GenreGrid";
import { ResultRow } from "../../searchResultsScreen/ui/ResultRow";

type SearchSectionProps = {
  query: string;
  results: TMDBMovieListItem[];
  loading: boolean;
  onOpenDetail: (movie: TMDBMovieListItem) => void;
};

export function SearchSection({
  query,
  results,
  loading,
  onOpenDetail,
}: SearchSectionProps) {
  const showGrid = query.trim().length < MIN_SEARCH_LENGTH;
  const showResults = query.trim().length >= MIN_SEARCH_LENGTH;

  const renderItem = useCallback(
    ({ item }: { item: TMDBMovieListItem }) => (
      <ResultRow item={item} onPress={() => onOpenDetail(item)} />
    ),
    [onOpenDetail]
  );

  const keyExtractor = useCallback(
    (item: TMDBMovieListItem) => String(item.id),
    []
  );

  if (showGrid) {
    return <GenreGrid />;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{SECTION_TITLE}</Text>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.empty}>No results yet.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.backgroundSecondary,
    height: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  centered: {
    paddingVertical: spacing.lg,
    alignItems: "center",
  },
  empty: {
    padding: spacing.lg,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    fontSize: 14,
  },
});
