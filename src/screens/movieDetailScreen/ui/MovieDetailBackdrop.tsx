import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { colors } from "../../../constants/theme";
import { BACKDROP_ASPECT } from "../utils/constants";

type MovieDetailBackdropProps = {
  uri: string | null;
  width: number;
};

export function MovieDetailBackdrop({ uri, width }: MovieDetailBackdropProps) {
  const height = width * BACKDROP_ASPECT;
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.backdrop, { width, height }]}
        resizeMode="cover"
      />
    );
  }
  return <View style={[styles.backdropPlaceholder, { width, height }]} />;
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.border,
  },
  backdropPlaceholder: {
    backgroundColor: colors.border,
  },
});
