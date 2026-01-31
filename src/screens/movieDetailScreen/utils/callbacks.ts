import type { TMDBMovieListItem } from "../../../types/api";
import type { TMDBVideo } from "../../../types/api";

export function getTrailerFromVideos(
  videos: TMDBVideo[]
): TMDBVideo | null {
  const trailer = videos.find(
    (v) =>
      v.site === "YouTube" &&
      (v.type === "Trailer" || v.type === "Teaser")
  );
  return trailer ?? videos.find((v) => v.site === "YouTube") ?? null;
}

export function createGoBack(
  navigation: { goBack: () => void }
): () => void {
  return () => navigation.goBack();
}

export function createOpenTrailer(
  navigation: {
    navigate: (
      name: "Trailer",
      params: { movieId: number; videoKey: string }
    ) => void;
  },
  movieId: number,
  videoKey: string
): () => void {
  return () => navigation.navigate("Trailer", { movieId, videoKey });
}

export function createOpenShowtime(
  navigation: {
    navigate: (
      name: "ShowtimeSelection",
      params: { movie: TMDBMovieListItem }
    ) => void;
  },
  movie: TMDBMovieListItem
): () => void {
  return () => navigation.navigate("ShowtimeSelection", { movie });
}
