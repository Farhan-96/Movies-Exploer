import { spacing } from "../../../constants/theme";
import { Dimensions } from "react-native";

const size = 6;
const rows = 4;
const cols = 8;
const seats: ("available" | "taken")[] = [];

const width = Dimensions.get("window").width;
export const SEAT_PREVIEW_SIZE = size;
export const SEAT_PREVIEW_ROWS = rows;
export const SEAT_PREVIEW_COLS = cols;
export const SEAT_PREVIEW_SEATS = seats;
export const SEAT_PREVIEW_CARD_WIDTH = Math.min(width - spacing.md * 2, 320);
