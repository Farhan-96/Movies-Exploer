import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";
import { SeatPreview } from "./SeatPreview";

export type ShowtimeOption = {
  time: string;
  hall: string;
  price: number;
  bonus: number;
};

type ShowtimeSectionProps = {
  showtimes: ShowtimeOption[];
  selectedShowtime: ShowtimeOption | null;
  onSelectShowtime: (showtime: ShowtimeOption) => void;
  cardWidth: number;
};

export function ShowtimeSection({
  showtimes,
  selectedShowtime,
  onSelectShowtime,
  cardWidth,
}: ShowtimeSectionProps) {
  return (
    <>
      <Text style={styles.sectionTitle}>Showtime</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.showtimeRow}
      >
        {showtimes.map((st) => {
          const isSelected =
            selectedShowtime?.time === st.time &&
            selectedShowtime?.hall === st.hall;
          return (
            <Pressable
              key={`${st.time}-${st.hall}`}
              style={[
                styles.showtimeCard,
                { width: cardWidth },
                isSelected && styles.showtimeCardSelected,
              ]}
              onPress={() => onSelectShowtime(st)}
            >
              <Text style={styles.showtimeTitle}>
                {st.time} {st.hall}
              </Text>
              <View style={styles.seatPreviewWrap}>
                <SeatPreview />
              </View>
              <Text style={styles.showtimePrice}>
                From {st.price}$ or {st.bonus} bonus
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  showtimeRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  showtimeCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
  },
  showtimeCardSelected: {
    borderColor: colors.primary,
  },
  showtimeTitle: {
    fontSize: 15,
    fontFamily: fonts.semiBold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  seatPreviewWrap: {
    alignSelf: "center",
    marginVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  showtimePrice: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
});
