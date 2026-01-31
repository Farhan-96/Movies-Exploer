/**
 * TMDB API response types.
 */

export interface TMDBMovieListItem {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids?: number[];
}

export interface TMDBUpcomingResponse {
  page: number;
  results: TMDBMovieListItem[];
  total_pages: number;
  total_results: number;
}

export interface TMDBMovieDetail extends TMDBMovieListItem {
  genres: { id: number; name: string }[];
  runtime: number | null;
  tagline: string | null;
  videos?: { results: TMDBVideo[] };
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface TMDBVideosResponse {
  id: number;
  results: TMDBVideo[];
}

export interface TMDBImage {
  file_path: string;
  vote_average: number;
  width: number;
  height: number;
}

export interface TMDBImagesResponse {
  id: number;
  backdrops: TMDBImage[];
  posters: TMDBImage[];
}

export interface TMDBSearchResponse {
  page: number;
  results: TMDBMovieListItem[];
  total_pages: number;
  total_results: number;
}
