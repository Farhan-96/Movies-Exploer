import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import type { TMDBMovieDetail, TMDBImagesResponse } from "../../../types/api";
import { fetchMovieDetail, fetchMovieVideos, fetchMovieImages } from "../../../api/tmdb";
import { getBackdropUrl } from "../../../constants/config";
import { colors, spacing } from "../../../constants/theme";
import { Nav, Route } from "../utils/types";
import {
  getTrailerFromVideos,
  createGoBack,
  createOpenTrailer,
  createOpenShowtime,
} from "../utils/callbacks";
import { MovieDetailHero } from "./MovieDetailHero";
import { MovieDetailGenres } from "./MovieDetailGenres";
import { MovieDetailImages } from "./MovieDetailImages";
import { MovieDetailBody } from "./MovieDetailBody";

export function MovieDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { movie: initialMovie } = route.params;
  const [detail, setDetail] = useState<TMDBMovieDetail | null>(null);
  const [trailer, setTrailer] = useState<ReturnType<typeof getTrailerFromVideos>>(null);
  const [images, setImages] = useState<TMDBImagesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const [movieRes, videosRes, imagesRes] = await Promise.all([
            fetchMovieDetail(initialMovie.id),
            fetchMovieVideos(initialMovie.id),
            fetchMovieImages(initialMovie.id),
          ]);
          if (!cancelled) {
            setDetail(movieRes);
            setTrailer(getTrailerFromVideos(videosRes.results));
            setImages(imagesRes);
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
  const genres = "genres" in movie && movie.genres ? movie.genres : [];
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
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MovieDetailHero
          backdropUri={backdropUrl}
          title={movie.title}
          releaseDate={releaseDate}
          hasTrailer={!!trailer}
          onGoBack={goBack}
          onWatchTrailer={openTrailer}
          onGetTickets={openShowtime}
        />
        <MovieDetailGenres genres={genres} />
        <MovieDetailImages
          posters={images?.posters ?? []}
          backdrops={images?.backdrops ?? []}
        />
        <MovieDetailBody
          overview={overview ?? null}
          error={error}
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
