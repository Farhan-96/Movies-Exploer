import type { TMDBMovieListItem } from "../../../types/api";
import { GENRE_MAP } from "./constants";

export function getGenreName(genreIds: number[] | undefined): string {
  return (
    genreIds?.map((id) => GENRE_MAP[id]).filter(Boolean).join(", ") || "Movie"
  );
}

export function createGoBack(
  navigation: { goBack: () => void }
): () => void {
  return () => navigation.goBack();
}

export function createOpenDetail(
  navigation: {
    navigate: (name: "MovieDetail", params: { movie: TMDBMovieListItem }) => void;
  }
) {
  return (movie: TMDBMovieListItem) =>
    navigation.navigate("MovieDetail", { movie });
}

export function getResultsTitle(count: number): string {
  return `${count} Result${count !== 1 ? "s" : ""} Found`;
}
