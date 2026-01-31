import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, borderRadius, fonts } from "../../../constants/theme";
import { HugeiconsIcon, ArrowLeft01Icon } from "../../../constants/icons";

type MovieDetailHeroProps = {
  backdropUri: string | null;
  title: string;
  releaseDate: string | null;
  hasTrailer: boolean;
  onGoBack: () => void;
  onWatchTrailer: () => void;
  onGetTickets: () => void;
};

export function MovieDetailHero({
  backdropUri,
  title,
  releaseDate,
  hasTrailer,
  onGoBack,
  onWatchTrailer,
  onGetTickets,
}: MovieDetailHeroProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const heroHeight = width / 0.56;
  const paddedTop = insets.top + spacing.sm;

  return (
    <View style={[styles.hero, { height: heroHeight }]}>
      {backdropUri ? (
        <Image
          source={{ uri: backdropUri }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.backdropPlaceholder]} />
      )}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.85)"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.content, { paddingTop: paddedTop }]}>
        <Pressable onPress={onGoBack} style={styles.backButton} hitSlop={12}>
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            size={28}
            color="#FFF"
            strokeWidth={1.5}
          />
        </Pressable>
        <View style={styles.textBlock}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {releaseDate ? (
            <Text style={styles.release}>
              In Theaters {releaseDate}
            </Text>
          ) : null}
          <View style={styles.actions}>
            <Pressable
              style={styles.primaryButton}
              onPress={onGetTickets}
            >
              <Text style={styles.primaryButtonText}>Get Tickets</Text>
            </Pressable>
            {hasTrailer ? (
              <Pressable
                style={styles.secondaryButton}
                onPress={onWatchTrailer}
              >
                <Text style={styles.secondaryButtonText}>Watch Trailer</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: "100%",
    overflow: "hidden",
  },
  backdropPlaceholder: {
    backgroundColor: colors.border,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textBlock: {
    gap: spacing.xs,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: "#FFF",
    marginBottom: spacing.xs,
  },
  release: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: "rgba(255,255,255,0.9)",
    marginBottom: spacing.md,
  },
  actions: {
    gap: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.9)",
  },
  secondaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
});
