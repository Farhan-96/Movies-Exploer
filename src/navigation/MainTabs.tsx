import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { MainTabParamList } from "./types";
import { WatchStack } from "./WatchStack";
import {
  TabPlaceholderScreen,
  TabIcon,
  tabBarStyles,
  TAB_LABELS,
} from "./tabs";

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: tabBarStyles.tabBar,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon
            routeName={route.name}
            label={TAB_LABELS[route.name]}
            focused={focused}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={() => <TabPlaceholderScreen name="Dashboard" />}
      />
      <Tab.Screen name="Watch" component={WatchStack} />
      <Tab.Screen
        name="MediaLibrary"
        component={() => <TabPlaceholderScreen name="Media Library" />}
      />
      <Tab.Screen
        name="More"
        component={() => <TabPlaceholderScreen name="More" />}
      />
    </Tab.Navigator>
  );
}
