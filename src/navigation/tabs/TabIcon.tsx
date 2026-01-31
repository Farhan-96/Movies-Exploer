import React from "react";
import { View, Text } from "react-native";
import type { MainTabParamList } from "../types";
import { colors } from "../../constants/theme";
import { HugeiconsIcon } from "../../constants/icons";
import { TAB_ICONS } from "./tabConfig";
import { tabBarStyles } from "./tabBarStyles";

type TabIconProps = {
  routeName: keyof MainTabParamList;
  label: string;
  focused: boolean;
};

export function TabIcon({ routeName, label, focused }: TabIconProps) {
  const IconComponent = TAB_ICONS[routeName];
  const iconColor = focused ? colors.tabBarActive : colors.tabBarInactive;
  const textColor = focused ? colors.tabBarActive : colors.tabBarInactive;

  return (
    <View style={tabBarStyles.tabItem}>
      <View style={tabBarStyles.iconWrap}>
        {focused ? (
          <View style={tabBarStyles.activeIconBg}>
            <HugeiconsIcon
              icon={IconComponent}
              size={22}
              color={colors.primary}
              strokeWidth={2}
            />
          </View>
        ) : (
          <HugeiconsIcon
            icon={IconComponent}
            size={24}
            color={iconColor}
            strokeWidth={1.5}
          />
        )}
      </View>
      <Text
        style={[
          tabBarStyles.tabLabel,
          { color: textColor },
          focused && tabBarStyles.tabLabelActive,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}
