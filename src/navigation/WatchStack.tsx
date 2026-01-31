import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { WatchStackParamList } from "./types";
import { MovieListScreen } from "../screens/MovieListScreen";
import { MovieDetailScreen } from "../screens/MovieDetailScreen";
import { TrailerScreen } from "../screens/TrailerScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { SearchResultsScreen } from "../screens/SearchResultsScreen";
import { ShowtimeSelectionScreen } from "../screens/ShowtimeSelectionScreen";
// import { SeatMapScreen } from '../screens/SeatMapScreen';

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
      {/* <Stack.Screen name="SeatMap" component={SeatMapScreen} /> */}
    </Stack.Navigator>
  );
}
