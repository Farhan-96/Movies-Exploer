import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";
import { colors, spacing, fonts } from "../../../constants/theme";
import { Nav, Route } from "../utils/types";
import { height, width } from "../../../constants/dimensions";

const TrailerScreen = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { videoKey } = route.params;
  const [playing, setPlaying] = useState(true);

  const close = useCallback(() => navigation.goBack(), [navigation]);

  const onStateChange = useCallback(
    (state: string) => {
      if (state === "ended") {
        setPlaying(false);
        close();
      }
    },
    [close]
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={close} style={styles.doneButton} hitSlop={12}>
          <Text style={styles.doneText}>Done</Text>
        </Pressable>
      </View>
      <View style={styles.playerWrap}>
        <YoutubePlayer
          height={height * 0.5}
          width={width}
          videoId={videoKey}
          play={playing}
          onChangeState={onStateChange}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  doneButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  doneText: {
    color: colors.primary,
    fontSize: 17,
    fontFamily: fonts.medium,
  },
  playerWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TrailerScreen;
