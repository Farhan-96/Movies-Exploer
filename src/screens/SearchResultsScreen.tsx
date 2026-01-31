import React, { useCallback, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { WatchStackParamList } from '../navigation/types';
import type { TMDBMovieListItem } from '../types/api';
import { searchMovies } from '../api/tmdb';
import { getPosterUrl } from '../constants/config';
import { colors, spacing, borderRadius } from '../constants/theme';

type Nav = NativeStackNavigationProp<WatchStackParamList, 'SearchResults'>;
type Route = RouteProp<WatchStackParamList, 'SearchResults'>;

function getGenreName(genreIds: number[] | undefined): string {
  const map: Record<number, string> = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
    99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
    10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
  };
  return genreIds?.map((id) => map[id]).filter(Boolean).join(', ') || 'Movie';
}

function ResultRow({
  item,
  onPress,
}: {
  item: TMDBMovieListItem;
  onPress: () => void;
}) {
  const posterUrl = getPosterUrl(item.poster_path, 'w185');
  const genre = getGenreName(item.genre_ids);

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image source={{ uri: posterUrl }} style={styles.rowPoster} resizeMode="cover" />
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.rowGenre} numberOfLines={1}>{genre}</Text>
      </View>
      <Text style={styles.moreIcon}>⋯</Text>
    </Pressable>
  );
}

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
        if (!cancelled) setError(e instanceof Error ? e.message : 'Search failed');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [query]);

  const goBack = useCallback(() => navigation.goBack(), [navigation]);
  const openDetail = useCallback(
    (movie: TMDBMovieListItem) => navigation.navigate('MovieDetail', { movie }),
    [navigation]
  );

  const title = useMemo(() => `${results.length} Result${results.length !== 1 ? 's' : ''} Found`, [results.length]);

  const renderItem = useCallback(
    ({ item }: { item: TMDBMovieListItem }) => (
      <ResultRow item={item} onPress={() => openDetail(item)} />
    ),
    [openDetail]
  );

  const keyExtractor = useCallback((item: TMDBMovieListItem) => String(item.id), []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.backButton} hitSlop={12}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={styles.headerRight} />
      </View>
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
          ListEmptyComponent={<Text style={styles.empty}>No movies found.</Text>}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 32,
    color: colors.text,
    fontWeight: '300',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  listContent: {
    paddingVertical: spacing.sm,
    paddingBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  rowPoster: {
    width: 56,
    height: 84,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.border,
  },
  rowContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  rowGenre: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  moreIcon: {
    fontSize: 20,
    color: colors.primary,
    padding: spacing.sm,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  empty: {
    padding: spacing.lg,
    textAlign: 'center',
    color: colors.textSecondary,
  },
});
