import type { TMDBMovieListItem } from '../types/api';

export type RootStackParamList = {
  MainTabs: undefined;
};

export type WatchStackParamList = {
  MovieList: undefined;
  MovieDetail: { movie: TMDBMovieListItem };
  Trailer: { movieId: number; videoKey: string };
  Search: undefined;
  SearchResults: { query: string };
  ShowtimeSelection: { movie: TMDBMovieListItem };
  SeatMap: { movieTitle: string; showtime: string; hall: string; date: string };
};

export type MainTabParamList = {
  Dashboard: undefined;
  Watch: undefined;
  MediaLibrary: undefined;
  More: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface WatchParamList extends WatchStackParamList {}
  }
}
