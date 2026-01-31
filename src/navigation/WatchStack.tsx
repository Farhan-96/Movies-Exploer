import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { WatchStackParamList } from "./types";
import { MovieListScreen } from "../screens/movieListScreen/ui/MovieListScreen";
import { MovieDetailScreen } from "../screens/movieDetailScreen/ui/MovieDetailScreen";
import TrailerScreen from "../screens/trailerScreeen/ui/TrailerScreen";
import { SearchScreen } from "../screens/searchScreen/ui/SearchScreen";
import { SearchResultsScreen } from "../screens/searchResultsScreen/ui/SearchResultsScreen";
import ShowtimeSelectionScreen from "../screens/showTimeSelectionScreen/ui/ShowtimeSelectionScreen";
import { SeatMapScreen } from "../screens/seatMapScreen/ui/SeatMapScreen";

const Stack = createNativeStackNavigator<WatchStackParamList>();

export function WatchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="MovieList" component={MovieListScreen} />
      <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
      <Stack.Screen
        name="Trailer"
        component={TrailerScreen}
        options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen
        name="ShowtimeSelection"
        component={ShowtimeSelectionScreen}
      />
      <Stack.Screen name="SeatMap" component={SeatMapScreen} />
    </Stack.Navigator>
  );
}
