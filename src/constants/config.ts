/**
 * App configuration and TMDB API settings.
 * Set EXPO_PUBLIC_TMDB_API_KEY in .env or here for development.
 */
const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY ?? "123456abcdefg";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const config = {
  tmdb: {
    apiKey: TMDB_API_KEY,
    baseUrl: TMDB_BASE_URL,
    imageBaseUrl: TMDB_IMAGE_BASE_URL,
    posterSizes: [
      "w92",
      "w154",
      "w185",
      "w342",
      "w500",
      "w780",
      "original",
    ] as const,
    backdropSizes: ["w300", "w780", "w1280", "original"] as const,
  },
} as const;

export const getPosterUrl = (
  path: string | null,
  size: "w500" | "w342" | "w185" = "w500"
): string => (path ? `${config.tmdb.imageBaseUrl}/${size}${path}` : "");

export const getBackdropUrl = (
  path: string | null,
  size: "w780" | "w1280" | "original" = "w780"
): string => (path ? `${config.tmdb.imageBaseUrl}/${size}${path}` : "");
