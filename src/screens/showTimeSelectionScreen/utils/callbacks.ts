import {
  SEAT_PREVIEW_ROWS,
  SEAT_PREVIEW_COLS,
  SEAT_PREVIEW_SEATS,
} from "./constants";

export const getSeatPreview = () => {
  for (let i = 0; i < SEAT_PREVIEW_ROWS * SEAT_PREVIEW_COLS; i++) {
    SEAT_PREVIEW_SEATS.push(
      i % 7 === 3 || i % 11 === 2 ? "taken" : "available"
    );
  }
  return SEAT_PREVIEW_SEATS;
};

export type ShowtimeOption = { time: string; hall: string };
export type DateOption = { date: string };

export function createGoBack(
  navigation: { goBack: () => void }
): () => void {
  return () => navigation.goBack();
}

export function createOpenSeatMap(
  navigation: {
    navigate: (
      name: "SeatMap",
      params: { movieTitle: string; showtime: string; hall: string; date: string }
    ) => void;
  },
  args: {
    movieTitle: string;
    selectedDate: DateOption;
    selectedShowtime: ShowtimeOption | null;
    defaultShowtime: ShowtimeOption;
  }
): () => void {
  return () => {
    const st = args.selectedShowtime ?? args.defaultShowtime;
    navigation.navigate("SeatMap", {
      movieTitle: args.movieTitle,
      showtime: st.time,
      hall: st.hall,
      date: args.selectedDate.date,
    });
  };
}
