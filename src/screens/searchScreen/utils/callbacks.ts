export function createGoBack(
  navigation: { goBack: () => void }
): () => void {
  return () => navigation.goBack();
}

export function createSubmit(
  navigation: {
    replace: (
      name: "SearchResults",
      params: { query: string }
    ) => void;
  },
  query: string
): () => void {
  return () => {
    const q = query.trim();
    if (q) navigation.replace("SearchResults", { query: q });
  };
}
