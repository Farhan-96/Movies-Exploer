import React from "react";
import { View, Text } from "react-native";
import { tabBarStyles } from "./tabBarStyles";

type TabPlaceholderScreenProps = {
  name: string;
};

export function TabPlaceholderScreen({ name }: TabPlaceholderScreenProps) {
  return (
    <View style={tabBarStyles.placeholder}>
      <Text style={tabBarStyles.placeholderText}>{name}</Text>
    </View>
  );
}
