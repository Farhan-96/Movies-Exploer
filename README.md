# Movies App (Expo)

A React Native (Expo) app for browsing upcoming movies, watching trailers, searching, and selecting seats (UI).

## Features

- **Movie List** – Upcoming movies from [TMDB](https://www.themoviedb.org/) with poster and title
- **Movie Detail** – Details, “Watch Trailer” (full-screen YouTube), “Get Tickets”
- **Trailer** – Full-screen player; auto-closes when finished or via “Done”
- **Search** – Search movies and open detail from results
- **Showtime Selection** – Date and showtime cards with seat preview (UI)
- **Seat Map** – Theater layout, legend, selected seats, total price, “Proceed to pay” (UI only)

## Setup

1. **API key**  
   Get a free key at [TMDB API Settings](https://www.themoviedb.org/settings/api).

2. **Environment**  
   Copy `.env.example` to `.env` and set your key:

   ```bash
   cp .env.example .env
   ```

   In `.env`:

   ```
   EXPO_PUBLIC_TMDB_API_KEY=your_actual_key
   ```

   Or set `EXPO_PUBLIC_TMDB_API_KEY` in `src/constants/config.ts` for quick local testing (do not commit real keys).

3. **Install and run**

   ```bash
   npm install
   npx expo start
   ```

   Then run on iOS simulator, Android emulator, or device (Expo Go).

## Scripts

- `npm start` – Start Expo dev server
- `npm run ios` – Run on iOS
- `npm run android` – Run on Android
- `npm run web` – Run in web browser

## Project structure

- `src/api/` – TMDB API client (upcoming, detail, images, videos, search)
- `src/constants/` – Config (API key, image URLs), theme (colors, spacing)
- `src/navigation/` – Root, tabs, Watch stack and param types
- `src/screens/` – MovieList, MovieDetail, Trailer, Search, SearchResults, ShowtimeSelection, SeatMap
- `src/types/` – TMDB response types

Seat mapping and showtime selection are UI-only (no backend); ticket flow ends at “Proceed to pay”.
