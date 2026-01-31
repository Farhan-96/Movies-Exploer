import type { TMDBMovieListItem } from "../../../types/api";

export function createGoBack(
  navigation: { goBack: () => void }
): () => void {
  return () => navigation.goBack();
}

export function createOpenSearch(
  navigation: { navigate: (name: "Search") => void }
): () => void {
  return () => navigation.navigate("Search");
}

export function createOpenDetail(
  navigation: {
    navigate: (name: "MovieDetail", params: { movie: TMDBMovieListItem }) => void;
  }
) {
  return (movie: TMDBMovieListItem) =>
    navigation.navigate("MovieDetail", { movie });
}
