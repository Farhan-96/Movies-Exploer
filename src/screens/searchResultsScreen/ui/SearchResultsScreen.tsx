import React, { useCallback, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { TMDBMovieListItem } from "../../../types/api";
import { searchMovies } from "../../../api/tmdb";
import { colors, spacing, fonts } from "../../../constants/theme";
import { Nav, Route } from "../utils/types";
import {
  createGoBack,
  createOpenDetail,
  getResultsTitle,
} from "../utils/callbacks";
import { EMPTY_MESSAGE } from "../utils/constants";
import { SearchResultsHeader } from "./SearchResultsHeader";
import { ResultRow } from "./ResultRow";

export function SearchResultsScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { query } = route.params;
  const [results, setResults] = useState<TMDBMovieListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await searchMovies(query);
        if (!cancelled) setResults(res.results);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Search failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [query]);

  const goBack = useCallback(createGoBack(navigation), [navigation]);
  const openDetail = useCallback(createOpenDetail(navigation), [navigation]);

  const title = useMemo(
    () => getResultsTitle(results.length),
    [results.length]
  );

  const renderItem = useCallback(
    ({ item }: { item: TMDBMovieListItem }) => (
      <ResultRow item={item} onPress={() => openDetail(item)} />
    ),
    [openDetail]
  );

  const keyExtractor = useCallback(
    (item: TMDBMovieListItem) => String(item.id),
    []
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <SearchResultsHeader onGoBack={goBack} title={title} />
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.empty}>{EMPTY_MESSAGE}</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  listContent: {
    paddingVertical: spacing.sm,
    paddingBottom: spacing.xl,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  empty: {
    padding: spacing.lg,
    textAlign: "center",
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
});
