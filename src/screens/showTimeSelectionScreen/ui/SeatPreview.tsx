import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";
import { getSeatPreview } from "../utils/callbacks";
import {
  SEAT_PREVIEW_COLS,
  SEAT_PREVIEW_ROWS,
  SEAT_PREVIEW_SIZE,
} from "../utils/constants";

export const SeatPreview = () => {
  const seats = getSeatPreview();
  return (
    <View style={seatPreviewStyles.wrap}>
      {Array.from({ length: SEAT_PREVIEW_ROWS }).map((_, row) => (
        <View key={row} style={seatPreviewStyles.row}>
          {Array.from({ length: SEAT_PREVIEW_COLS }).map((_, col) => {
            const idx = row * SEAT_PREVIEW_COLS + col;
            const taken = seats[idx] === "taken";
            return (
              <View
                key={col}
                style={[
                  seatPreviewStyles.seat,
                  { width: SEAT_PREVIEW_SIZE, height: SEAT_PREVIEW_SIZE },
                  taken ? seatPreviewStyles.taken : seatPreviewStyles.available,
                ]}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const seatPreviewStyles = StyleSheet.create({
  wrap: { padding: 4 },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
    marginBottom: 2,
  },
  seat: { borderRadius: 2 },
  available: { backgroundColor: colors.seat.regular },
  taken: { backgroundColor: colors.seat.unavailable },
});
