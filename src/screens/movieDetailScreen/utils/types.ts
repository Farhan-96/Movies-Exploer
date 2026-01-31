import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { WatchStackParamList } from "../../../navigation/types";

export type Nav = NativeStackNavigationProp<
  WatchStackParamList,
  "MovieDetail"
>;
export type Route = RouteProp<WatchStackParamList, "MovieDetail">;
