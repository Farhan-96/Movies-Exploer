import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, fonts } from "../../../constants/theme";
import { HugeiconsIcon, ArrowLeft01Icon } from "../../../constants/icons";

type SearchResultsHeaderProps = {
  onGoBack: () => void;
  title: string;
};

export function SearchResultsHeader({
  onGoBack,
  title,
}: SearchResultsHeaderProps) {
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
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.headerRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.text,
    textAlign: "center",
  },
  headerRight: {
    width: 40,
  },
});
