import { colors, spacing } from "../../../constants/theme";
import { ROWS, COLS, AISLE_AFTER, SEAT_SIZE, SEAT_GAP, VIP_PRICE, REGULAR_PRICE } from "./constants";
import type { SeatType, SeatState, SelectedSeat } from "./types";

export function getSeatType(row: number, col: number): SeatType {
  if (row === ROWS - 1) return "vip";
  if (row < 2 && col < 3) return "vip";
  if (row === 2 && col >= 4 && col <= 7) return "vip";
  if ((row + col) % 5 === 0 || (row * col) % 7 === 2) return "unavailable";
  return "regular";
}

export function getSeatColor(state: SeatState): string {
  if (state.selected) return colors.seat.selected;
  if (state.type === "unavailable") return colors.seat.unavailable;
  if (state.type === "vip") return colors.seat.vip;
  return colors.seat.regular;
}

export function createInitialGrid(): SeatState[][] {
  const g: SeatState[][] = [];
  for (let r = 0; r < ROWS; r++) {
    const row: SeatState[] = [];
    for (let c = 0; c < COLS; c++) {
      row.push({ type: getSeatType(r, c), selected: false });
    }
    g.push(row);
  }
  return g;
}

export function getSelectedList(seatState: SeatState[][]): SelectedSeat[] {
  const list: SelectedSeat[] = [];
  seatState.forEach((row, r) => {
    row.forEach((seat, c) => {
      if (seat.selected) list.push({ row: r + 1, seat: c + 1 });
    });
  });
  return list;
}

export function getTotalPrice(seatState: SeatState[][]): number {
  let total = 0;
  seatState.forEach((row, r) => {
    row.forEach((seat, c) => {
      if (seat.selected) {
        total += seatState[r][c].type === "vip" ? VIP_PRICE : REGULAR_PRICE;
      }
    });
  });
  return total;
}

export function createToggleSeat(
  seatState: SeatState[][],
  setSeatState: React.Dispatch<React.SetStateAction<SeatState[][]>>
) {
  return (row: number, col: number) => {
    const type = seatState[row][col].type;
    if (type === "unavailable") return;
    setSeatState((prev) => {
      const next = prev.map((r) => r.map((s) => ({ ...s })));
      next[row][col] = { ...next[row][col], selected: !next[row][col].selected };
      return next;
    });
  };
}

export function createRemoveSeat(
  setSeatState: React.Dispatch<React.SetStateAction<SeatState[][]>>
) {
  return (row: number, seat: number) => {
    setSeatState((prev) => {
      const next = prev.map((r) => r.map((s) => ({ ...s })));
      if (next[row - 1]?.[seat - 1]) next[row - 1][seat - 1].selected = false;
      return next;
    });
  };
}

export function createGoBack(navigation: { goBack: () => void }): () => void {
  return () => navigation.goBack();
}

export function getMapScale(containerWidth: number): number {
  const mapWidth =
    COLS * (SEAT_SIZE + SEAT_GAP) + AISLE_AFTER.length * (SEAT_SIZE + SEAT_GAP);
  return Math.min(1, (containerWidth - spacing.lg * 2) / mapWidth);
}

export { ROWS, COLS, AISLE_AFTER, SEAT_SIZE, SEAT_GAP };
