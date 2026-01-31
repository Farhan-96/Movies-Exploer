import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { colors, spacing } from "../../../constants/theme";
import { HugeiconsIcon, ArrowLeft01Icon } from "../../../constants/icons";

type SearchHeaderProps = {
  onGoBack: () => void;
};

export function SearchHeader({ onGoBack }: SearchHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onGoBack} style={styles.backButton} hitSlop={12}>
        <HugeiconsIcon
          icon={ArrowLeft01Icon}
          size={28}
          color={colors.text}
          strokeWidth={1.5}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
});
