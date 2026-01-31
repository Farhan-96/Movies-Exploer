import { StyleSheet } from "react-native";
import { colors, spacing, fonts } from "../../constants/theme";

export const tabBarStyles = StyleSheet.create({
  tabBar: {
    height: 84,
    backgroundColor: colors.tabBar,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.tabBarBorder,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // borderColor: "red",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    width: 100,
  },
  iconWrap: {
    marginBottom: 4,
    minHeight: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconBg: {
    backgroundColor: colors.tabBarActiveBg,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: fonts.regular,
  },
  tabLabelActive: {
    fontFamily: fonts.bold,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  placeholderText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
});
