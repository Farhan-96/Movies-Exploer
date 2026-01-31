import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../constants/theme";
import { Nav } from "../utils/types";
import { createGoBack, createSubmit } from "../utils/callbacks";
import { SearchHeader } from "./SearchHeader";
import { SearchBar } from "./SearchBar";
import { SearchSection } from "./SearchSection";

export function SearchScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState("");

  const goBack = useCallback(createGoBack(navigation), [navigation]);
  const submit = useCallback(
    createSubmit(navigation, query),
    [navigation, query]
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <SearchHeader onGoBack={goBack} />
        <SearchBar
          query={query}
          onChangeQuery={setQuery}
          onSubmit={submit}
          onClear={() => setQuery("")}
        />
        <SearchSection />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  keyboardView: {
    flex: 1,
  },
});
