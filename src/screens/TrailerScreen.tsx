import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { WatchStackParamList } from '../navigation/types';
import YoutubePlayer from 'react-native-youtube-iframe';
import { colors, spacing } from '../constants/theme';

type Nav = NativeStackNavigationProp<WatchStackParamList, 'Trailer'>;
type Route = RouteProp<WatchStackParamList, 'Trailer'>;

const { width, height } = Dimensions.get('window');

export function TrailerScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { videoKey } = route.params;
  const [playing, setPlaying] = useState(true);

  const close = useCallback(() => navigation.goBack(), [navigation]);

  const onStateChange = useCallback(
    (state: string) => {
      if (state === 'ended') {
        setPlaying(false);
        close();
      }
    },
    [close]
  );

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    fontWeight: '500',
  },
  playerWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
