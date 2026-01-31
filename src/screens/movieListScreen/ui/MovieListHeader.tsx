import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, fonts } from "../../../constants/theme";
import { HugeiconsIcon, Search01Icon } from "../../../constants/icons";
import { HEADER_TITLE } from "../utils/constants";

type MovieListHeaderProps = {
  onSearch: () => void;
};

export function MovieListHeader({ onSearch }: MovieListHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{HEADER_TITLE}</Text>
      <Pressable onPress={onSearch} style={styles.searchButton} hitSlop={12}>
        <HugeiconsIcon
          icon={Search01Icon}
          size={24}
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
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    paddingTop: spacing.lg,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.text,
  },
  searchButton: {
    padding: spacing.sm,
  },
});
