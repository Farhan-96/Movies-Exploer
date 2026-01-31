import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { TMDBMovieListItem } from "../../../types/api";
import { searchMovies } from "../../../api/tmdb";
import { colors } from "../../../constants/theme";
import { Nav } from "../utils/types";
import { createGoBack, createSubmit } from "../utils/callbacks";
import { MIN_SEARCH_LENGTH } from "../utils/constants";
import { SearchHeader } from "./SearchHeader";
import { SearchBar } from "./SearchBar";
import { SearchSection } from "./SearchSection";

const DEBOUNCE_MS = 400;

export function SearchScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TMDBMovieListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelledRef = useRef(false);

  useEffect(() => {
    const q = query.trim();
    if (q.length < MIN_SEARCH_LENGTH) {
      setResults([]);
      setLoading(false);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(() => {
      cancelledRef.current = false;
      searchMovies(q)
        .then((res) => {
          if (!cancelledRef.current) {
            setResults(res.results);
            setLoading(false);
          }
        })
        .catch(() => {
          if (!cancelledRef.current) {
            setResults([]);
            setLoading(false);
          }
        });
      debounceRef.current = null;
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      cancelledRef.current = true;
    };
  }, [query]);

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
        <SearchSection
          query={query}
          results={results}
          loading={loading}
          onOpenDetail={(movie) =>
            navigation.navigate("MovieDetail", { movie })
          }
        />
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
