import React, { useCallback, useMemo, useState } from "react";
import { View, StyleSheet, ScrollView, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors, spacing } from "../../../constants/theme";
import type { SeatState } from "../utils/types";
import { Nav, Route } from "../utils/types";
import {
  createInitialGrid,
  getSelectedList,
  getTotalPrice,
  createToggleSeat,
  createRemoveSeat,
  createGoBack,
  getMapScale,
} from "../utils/callbacks";
import { SeatMapHeader } from "./SeatMapHeader";
import { ScreenIndicator } from "./ScreenIndicator";
import { SeatGrid } from "./SeatGrid";
import { ZoomControls } from "./ZoomControls";
import { SeatLegend } from "./SeatLegend";
import { SelectedSeatsChips } from "./SelectedSeatsChips";
import { SeatMapFooter } from "./SeatMapFooter";

export function SeatMapScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { movieTitle, showtime, hall, date } = route.params;
  const { width } = useWindowDimensions();

  const grid = useMemo(createInitialGrid, []);
  const [seatState, setSeatState] = useState<SeatState[][]>(grid);

  const toggleSeat = useCallback(
    createToggleSeat(seatState, setSeatState),
    [seatState]
  );
  const removeSeat = useCallback(createRemoveSeat(setSeatState), []);
  const goBack = useCallback(createGoBack(navigation), [navigation]);

  const selectedList = useMemo(
    () => getSelectedList(seatState),
    [seatState]
  );
  const totalPrice = useMemo(() => getTotalPrice(seatState), [seatState]);
  const scale = useMemo(() => getMapScale(width), [width]);

  const subtitle = `${date} | ${showtime} ${hall}`;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <SeatMapHeader
        onGoBack={goBack}
        movieTitle={movieTitle}
        subtitle={subtitle}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScreenIndicator />
        <SeatGrid
          seatState={seatState}
          onToggleSeat={toggleSeat}
          scale={scale}
        />
        <ZoomControls />
        <SeatLegend />
        <SelectedSeatsChips
          selectedList={selectedList}
          onRemoveSeat={removeSeat}
        />
      </ScrollView>
      <SeatMapFooter totalPrice={totalPrice} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    alignItems: "center",
  },
});
