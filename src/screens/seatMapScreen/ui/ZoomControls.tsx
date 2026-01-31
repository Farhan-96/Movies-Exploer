import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, fonts } from "../../../constants/theme";

export function ZoomControls() {
  return (
    <View style={styles.zoomWrap}>
      <Pressable style={styles.zoomBtn}>
        <Text style={styles.zoomText}>+</Text>
      </Pressable>
      <Pressable style={styles.zoomBtn}>
        <Text style={styles.zoomText}>−</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  zoomWrap: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  zoomBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  zoomText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: colors.text,
  },
});
