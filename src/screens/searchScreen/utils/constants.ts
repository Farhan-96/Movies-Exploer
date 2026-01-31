export const SEARCH_PLACEHOLDER = "TV shows, movies and more";
export const SECTION_TITLE = "Top Results";
export const MIN_SEARCH_LENGTH = 3;

/** Genre cards for initial grid (id matches TMDB where applicable). */
export const GENRE_GRID_ITEMS = [
  { id: 35, name: "Comedies" },
  { id: 80, name: "Crime" },
  { id: 10751, name: "Family" },
  { id: 99, name: "Documentaries" },
  { id: 18, name: "Dramas" },
  { id: 14, name: "Fantasy" },
  { id: -1, name: "Holidays" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
] as const;
