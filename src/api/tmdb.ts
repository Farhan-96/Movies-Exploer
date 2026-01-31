/**
 * TMDB API client: upcoming, detail, images, videos, search.
 * Centralized fetch with error handling and typed responses.
 */
import { config } from '../constants/config';
import type {
  TMDBUpcomingResponse,
  TMDBMovieDetail,
  TMDBVideosResponse,
  TMDBImagesResponse,
  TMDBSearchResponse,
} from '../types/api';

const { apiKey, baseUrl } = config.tmdb;

function buildUrl(path: string, params: Record<string, string | number> = {}): string {
  const search = new URLSearchParams({ api_key: apiKey, ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) });
  return `${baseUrl}${path}?${search.toString()}`;
}

async function get<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

/** Upcoming movies (for list screen). */
export async function fetchUpcoming(page = 1): Promise<TMDBUpcomingResponse> {
  return get<TMDBUpcomingResponse>(buildUrl('/movie/upcoming', { page }));
}

/** Movie details by id. */
export async function fetchMovieDetail(movieId: number): Promise<TMDBMovieDetail> {
  return get<TMDBMovieDetail>(buildUrl(`/movie/${movieId}`));
}

/** Movie images (posters/backdrops). */
export async function fetchMovieImages(movieId: number): Promise<TMDBImagesResponse> {
  return get<TMDBImagesResponse>(buildUrl(`/movie/${movieId}/images`));
}

/** Movie videos (trailers). */
export async function fetchMovieVideos(movieId: number): Promise<TMDBVideosResponse> {
  return get<TMDBVideosResponse>(buildUrl(`/movie/${movieId}/videos`));
}

/** Search movies by query. */
export async function searchMovies(query: string, page = 1): Promise<TMDBSearchResponse> {
  if (!query.trim()) return { page: 1, results: [], total_pages: 0, total_results: 0 };
  return get<TMDBSearchResponse>(buildUrl('/search/movie', { query: query.trim(), page }));
}
