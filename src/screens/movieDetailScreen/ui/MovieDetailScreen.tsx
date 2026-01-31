import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import type { TMDBMovieDetail } from "../../../types/api";
import { fetchMovieDetail, fetchMovieVideos } from "../../../api/tmdb";
import { getBackdropUrl } from "../../../constants/config";
import { colors, spacing } from "../../../constants/theme";
import { Nav, Route } from "../utils/types";
import {
  getTrailerFromVideos,
  createGoBack,
  createOpenTrailer,
  createOpenShowtime,
} from "../utils/callbacks";
import { MovieDetailHeader } from "./MovieDetailHeader";
import { MovieDetailBackdrop } from "./MovieDetailBackdrop";
import { MovieDetailBody } from "./MovieDetailBody";

export function MovieDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { movie: initialMovie } = route.params;
  const { width } = useWindowDimensions();
  const [detail, setDetail] = useState<TMDBMovieDetail | null>(null);
  const [trailer, setTrailer] = useState<ReturnType<typeof getTrailerFromVideos>>(null);
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
            setTrailer(getTrailerFromVideos(videosRes.results));
          }
        } catch (e) {
          if (!cancelled)
            setError(e instanceof Error ? e.message : "Failed to load");
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [initialMovie.id])
  );

  const goBack = useCallback(createGoBack(navigation), [navigation]);
  const openTrailer = useCallback(
    trailer
      ? createOpenTrailer(navigation, initialMovie.id, trailer.key)
      : () => {},
    [navigation, trailer, initialMovie.id]
  );
  const openShowtime = useCallback(
    createOpenShowtime(navigation, initialMovie),
    [navigation, initialMovie]
  );

  if (loading && !detail) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const movie = detail ?? initialMovie;
  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const releaseDate =
    "release_date" in movie && movie.release_date
      ? new Date(movie.release_date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : null;
  const overview = "overview" in movie ? movie.overview : null;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <MovieDetailHeader onGoBack={goBack} title={movie.title} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MovieDetailBackdrop uri={backdropUrl} width={width} />
        <MovieDetailBody
          title={movie.title}
          releaseDate={releaseDate}
          overview={overview ?? null}
          error={error}
          hasTrailer={!!trailer}
          onWatchTrailer={openTrailer}
          onGetTickets={openShowtime}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
