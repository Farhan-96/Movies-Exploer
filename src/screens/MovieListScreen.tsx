import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { WatchStackParamList } from "../navigation/types";
import type { TMDBMovieListItem } from "../types/api";
import { fetchUpcoming } from "../api/tmdb";
import { getPosterUrl } from "../constants/config";
import { colors, spacing, borderRadius } from "../constants/theme";

type Nav = NativeStackNavigationProp<WatchStackParamList, "MovieList">;

const POSTER_ASPECT = 16 / 9;
const CARD_MARGIN = spacing.md;

function MovieCard({
  item,
  width,
  onPress,
}: {
  item: TMDBMovieListItem;
  width: number;
  onPress: () => void;
}) {
  const posterUrl = getPosterUrl(item.poster_path, "w500");
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
      console.log(e);
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

  const openSearch = useCallback(
    () => navigation.navigate("Search"),
    [navigation]
  );
  const openDetail = useCallback(
    (movie: TMDBMovieListItem) => navigation.navigate("MovieDetail", { movie }),
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: TMDBMovieListItem }) => (
      <View style={styles.cardWrap}>
        <MovieCard item={item} width={width} onPress={() => openDetail(item)} />
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
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Watch</Text>
        <Pressable
          onPress={openSearch}
          style={styles.searchButton}
          hitSlop={12}
        >
          <Text style={styles.searchIcon}>🔍</Text>
        </Pressable>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    paddingTop: spacing.lg,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },
  searchButton: {
    padding: spacing.sm,
  },
  searchIcon: {
    fontSize: 22,
  },
  listContent: {
    paddingVertical: spacing.sm,
    paddingBottom: spacing.xl,
  },
  cardWrap: {
    marginBottom: spacing.md,
    alignItems: "center",
  },
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
    fontWeight: "700",
    color: "#FFF",
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
  },
  footerLoader: {
    paddingVertical: spacing.md,
  },
});
