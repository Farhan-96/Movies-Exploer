import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, fonts } from "../../../constants/theme";
import { HugeiconsIcon, ArrowLeft01Icon } from "../../../constants/icons";

type MovieDetailHeaderProps = {
  onGoBack: () => void;
  title: string;
};

export function MovieDetailHeader({
  onGoBack,
  title,
}: MovieDetailHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onGoBack} style={styles.backButton} hitSlop={12}>
        <HugeiconsIcon
          icon={ArrowLeft01Icon}
          size={28}
          color="#FFF"
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: "#FFF",
    textAlign: "center",
  },
  headerRight: {
    width: 40,
  },
});
