import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { WatchStackParamList } from "../../../navigation/types";

export type SeatType = "regular" | "vip" | "unavailable";

export type SeatState = { type: SeatType; selected: boolean };

export type SelectedSeat = { row: number; seat: number };

export type Nav = NativeStackNavigationProp<WatchStackParamList, "SeatMap">;
export type Route = RouteProp<WatchStackParamList, "SeatMap">;
