import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { WatchStackParamList } from "../../../navigation/types";

export type Nav = NativeStackNavigationProp<WatchStackParamList, "Trailer">;
export type Route = RouteProp<WatchStackParamList, "Trailer">;
