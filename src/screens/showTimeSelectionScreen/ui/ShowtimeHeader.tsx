import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, fonts } from "../../../constants/theme";
import { HugeiconsIcon, ArrowLeft01Icon } from "../../../constants/icons";

type ShowtimeHeaderProps = {
  onGoBack: () => void;
  title: string;
  subtitle?: string;
};

export function ShowtimeHeader({
  onGoBack,
  title,
  subtitle = "In Theaters December 22, 2021",
}: ShowtimeHeaderProps) {
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
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.headerSub}>{subtitle}</Text>
      </View>
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
    backgroundColor: colors.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text,
  },
  headerSub: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.primary,
    marginTop: 2,
  },
  headerRight: {
    width: 40,
  },
});
