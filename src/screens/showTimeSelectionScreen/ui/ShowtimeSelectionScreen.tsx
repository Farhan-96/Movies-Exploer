import React, { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors, spacing } from "../../../constants/theme";
import { DATES, SHOWTIMES } from "../utils/data";
import { Nav, Route } from "../utils/types";
import { SEAT_PREVIEW_CARD_WIDTH } from "../utils/constants";
import { createGoBack, createOpenSeatMap } from "../utils/callbacks";
import { ShowtimeHeader } from "./ShowtimeHeader";
import { DateSection } from "./DateSection";
import { ShowtimeSection } from "./ShowtimeSection";
import { ShowtimeFooter } from "./ShowtimeFooter";

const ShowtimeSelectionScreen = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { movie } = route.params;
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [selectedShowtime, setSelectedShowtime] = useState<
    (typeof SHOWTIMES)[0] | null
  >(null);

  const goBack = useCallback(createGoBack(navigation), [navigation]);
  const openSeatMap = useCallback(
    createOpenSeatMap(navigation, {
      movieTitle: movie.title,
      selectedDate,
      selectedShowtime,
      defaultShowtime: SHOWTIMES[0],
    }),
    [navigation, movie.title, selectedDate, selectedShowtime]
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ShowtimeHeader onGoBack={goBack} title={movie.title} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <DateSection
          dates={DATES}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <ShowtimeSection
          showtimes={SHOWTIMES}
          selectedShowtime={selectedShowtime}
          onSelectShowtime={setSelectedShowtime}
          cardWidth={SEAT_PREVIEW_CARD_WIDTH}
        />
      </ScrollView>
      <ShowtimeFooter onSelectSeats={openSeatMap} />
    </SafeAreaView>
  );
};

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
  },
});

export default ShowtimeSelectionScreen;
