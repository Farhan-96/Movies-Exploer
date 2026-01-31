import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from './types';
import { WatchStack } from './WatchStack';
import { colors, spacing } from '../constants/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

function PlaceholderScreen({ name }: { name: string }) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{name}</Text>
    </View>
  );
}

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const icon = label === 'Dashboard' ? '⊞' : label === 'Watch' ? '▶' : label === 'Media Library' ? '▤' : '≡';
  const color = focused ? colors.tabBarActive : colors.tabBarInactive;
  return (
    <View style={styles.tabItem}>
      <Text style={[styles.tabIcon, { color }]}>{icon}</Text>
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
    </View>
  );
}

const tabLabels: Record<keyof MainTabParamList, string> = {
  Dashboard: 'Dashboard',
  Watch: 'Watch',
  MediaLibrary: 'Media Library',
  More: 'More',
};

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => <TabIcon label={tabLabels[route.name]} focused={focused} />,
      })}
    >
      <Tab.Screen name="Dashboard" component={() => <PlaceholderScreen name="Dashboard" />} />
      <Tab.Screen name="Watch" component={WatchStack} />
      <Tab.Screen name="MediaLibrary" component={() => <PlaceholderScreen name="Media Library" />} />
      <Tab.Screen name="More" component={() => <PlaceholderScreen name="More" />} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBar,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 80,
    paddingTop: spacing.sm,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 11,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  placeholderText: {
    fontSize: 18,
    color: colors.textSecondary,
  },
});
