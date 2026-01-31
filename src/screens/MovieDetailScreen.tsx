import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { WatchStackParamList } from '../navigation/types';
import type { TMDBMovieDetail, TMDBVideo } from '../types/api';
import { fetchMovieDetail, fetchMovieVideos } from '../api/tmdb';
import { getBackdropUrl } from '../constants/config';
import { colors, spacing, borderRadius } from '../constants/theme';

type Nav = NativeStackNavigationProp<WatchStackParamList, 'MovieDetail'>;
type Route = RouteProp<WatchStackParamList, 'MovieDetail'>;

function getTrailerUrl(videos: TMDBVideo[]): TMDBVideo | null {
  const trailer = videos.find((v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
  return trailer ?? videos.find((v) => v.site === 'YouTube') ?? null;
}

export function MovieDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { movie: initialMovie } = route.params;
  const { width } = useWindowDimensions();
  const [detail, setDetail] = useState<TMDBMovieDetail | null>(null);
  const [trailer, setTrailer] = useState<TMDBVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const [movieRes, videosRes] = await Promise.all([
            fetchMovieDetail(initialMovie.id),
            fetchMovieVideos(initialMovie.id),
          ]);
          if (!cancelled) {
            setDetail(movieRes);
            setTrailer(getTrailerUrl(videosRes.results));
          }
        } catch (e) {
          if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load');
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [initialMovie.id])
  );

  const goBack = useCallback(() => navigation.goBack(), [navigation]);
  const openTrailer = useCallback(() => {
    if (trailer) navigation.navigate('Trailer', { movieId: initialMovie.id, videoKey: trailer.key });
  }, [navigation, trailer, initialMovie.id]);
  const openShowtime = useCallback(() => {
    navigation.navigate('ShowtimeSelection', { movie: initialMovie });
  }, [navigation, initialMovie]);

  if (loading && !detail) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const movie = detail ?? initialMovie;
  const backdropUrl = getBackdropUrl(movie.backdrop_path);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.backButton} hitSlop={12}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {movie.title}
        </Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {backdropUrl ? (
          <Image source={{ uri: backdropUrl }} style={[styles.backdrop, { width, height: width * 0.56 }]} resizeMode="cover" />
        ) : (
          <View style={[styles.backdropPlaceholder, { width, height: width * 0.56 }]} />
        )}
        <View style={styles.body}>
          <Text style={styles.title}>{movie.title}</Text>
          {'release_date' in movie && movie.release_date ? (
            <Text style={styles.release}>In Theaters {new Date(movie.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
          ) : null}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {'overview' in movie && movie.overview ? (
            <Text style={styles.overview}>{movie.overview}</Text>
          ) : null}
          <View style={styles.actions}>
            {trailer ? (
              <Pressable style={styles.primaryButton} onPress={openTrailer}>
                <Text style={styles.primaryButtonText}>Watch Trailer</Text>
              </Pressable>
            ) : null}
            <Pressable style={styles.secondaryButton} onPress={openShowtime}>
              <Text style={styles.secondaryButtonText}>Get Tickets</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: '300',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  backdrop: {
    backgroundColor: colors.border,
  },
  backdropPlaceholder: {
    backgroundColor: colors.border,
  },
  body: {
    padding: spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  release: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  overview: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  errorText: {
    color: '#c0392b',
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  actions: {
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
