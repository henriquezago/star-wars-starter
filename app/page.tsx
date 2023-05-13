"use client";

import { useCallback, useState } from "react";
import Card from "./components/Card";
import styles from "./page.module.scss";
import TextInput from "./components/TextInput";
import Button from "./components/Button";
import ResultsCard, { Result } from "./components/ResultsCard";

enum SearchType {
  PEOPLE = "people",
  MOVIES = "movies",
}

export default function Home() {
  const [searchType, setSearchType] = useState<SearchType>(SearchType.PEOPLE);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);

    const searchTypeParam =
      searchType === SearchType.PEOPLE ? "people" : "movies";

    const response = await fetch(
      `/api/${searchTypeParam}?search=${searchTerm}`
    );

    const data = await response.json();
    setSearchResults(data.results);

    setIsLoading(false);
  }, [searchType, searchTerm, setIsLoading, setSearchResults]);

  return (
    <main className={styles.main}>
      <Card className={styles.filtersCard}>
        <h1 className={styles.title}>What are you searching for?</h1>
        <div className={styles.inputsContainer}>
          <input
            type="radio"
            id="people"
            name="searchType"
            value={SearchType.PEOPLE}
            checked={searchType === SearchType.PEOPLE}
            onChange={() => setSearchType(SearchType.PEOPLE)}
          />
          <label htmlFor="people">People</label>
          <input
            type="radio"
            id="movies"
            name="searchType"
            value={SearchType.MOVIES}
            checked={searchType === SearchType.MOVIES}
            onChange={() => setSearchType(SearchType.MOVIES)}
          />
          <label htmlFor="movies">Movies</label>
        </div>
        <TextInput
          fullWidth
          placeholder="e.g. Chewbacca, Yoda, Boba Fett"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          fullWidth
          disabled={searchTerm === "" || isLoading}
          onClick={handleSearch}
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </Card>
      <ResultsCard results={searchResults} isLoading />
    </main>
  );
}
