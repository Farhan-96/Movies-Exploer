import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { TMDBMovieListItem } from "../../../types/api";
import { fetchUpcoming } from "../../../api/tmdb";
import { colors, spacing, fonts } from "../../../constants/theme";
import { Nav } from "../utils/types";
import {
  createOpenSearch,
  createOpenDetail,
} from "../utils/callbacks";
import { MovieListHeader } from "./MovieListHeader";
import { MovieCard } from "./MovieCard";

export function MovieListScreen() {
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const [movies, setMovies] = useState<TMDBMovieListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const load = useCallback(async (pageNum: number, append: boolean) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      setError(null);
      const res = await fetchUpcoming(pageNum);
      setMovies((prev) => (append ? [...prev, ...res.results] : res.results));
      setHasMore(res.page < res.total_pages);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load movies");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  React.useEffect(() => {
    load(1, false);
  }, [load]);

  const onEndReached = useCallback(() => {
    if (!loadingMore && hasMore) {
      const next = page + 1;
      setPage(next);
      load(next, true);
    }
  }, [page, hasMore, loadingMore, load]);

  const openSearch = useCallback(createOpenSearch(navigation), [navigation]);
  const openDetail = useCallback(createOpenDetail(navigation), [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: TMDBMovieListItem }) => (
      <View style={styles.cardWrap}>
        <MovieCard
          item={item}
          width={width}
          onPress={() => openDetail(item)}
        />
      </View>
    ),
    [width, openDetail]
  );

  const keyExtractor = useCallback(
    (item: TMDBMovieListItem) => String(item.id),
    []
  );

  if (loading && movies.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <MovieListHeader onSearch={openSearch} />
      {error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                style={styles.footerLoader}
                color={colors.primary}
              />
            ) : null
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
  cardWrap: {
    marginBottom: spacing.md,
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  footerLoader: {
    paddingVertical: spacing.md,
  },
});
