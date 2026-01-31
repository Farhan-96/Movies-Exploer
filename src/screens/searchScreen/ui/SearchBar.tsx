import React from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";
import { HugeiconsIcon, Search01Icon, Cancel01Icon } from "../../../constants/icons";
import { SEARCH_PLACEHOLDER } from "../utils/constants";

type SearchBarProps = {
  query: string;
  onChangeQuery: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
};

export function SearchBar({
  query,
  onChangeQuery,
  onSubmit,
  onClear,
}: SearchBarProps) {
  return (
    <View style={styles.searchWrap}>
      <View style={styles.searchIconWrap}>
        <HugeiconsIcon
          icon={Search01Icon}
          size={20}
          color={colors.textSecondary}
          strokeWidth={1.5}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder={SEARCH_PLACEHOLDER}
        placeholderTextColor={colors.textSecondary}
        value={query}
        onChangeText={onChangeQuery}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        autoFocus
        autoCapitalize="none"
        autoCorrect={false}
      />
      {query.length > 0 ? (
        <Pressable onPress={onClear} style={styles.clearButton} hitSlop={8}>
          <HugeiconsIcon
            icon={Cancel01Icon}
            size={20}
            color={colors.textSecondary}
            strokeWidth={1.5}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    minHeight: 48,
  },
  searchIconWrap: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text,
    paddingVertical: spacing.sm,
  },
  clearButton: {
    padding: spacing.xs,
  },
});
