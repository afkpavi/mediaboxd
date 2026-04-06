'use client';

import { useState } from "react";
import { useGetMediaListQuery } from "../features/api/apiSlice";
import MovieCard from "../components/MovieCard/MovieCard";
import styles from "./page.module.scss";

type ActiveTab = "movies" | "tv";

type MediaItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
};

type ListType = "now_playing" | "airing_today" | "popular";

const tabConfig = {
  movies: {
    label: "Movies",
    listTypes: {
      now_playing: {
        label: "Now Playing",
        heading: "Now Playing Movies",
        loadingText: "Loading movies…",
        emptyText: "No now playing movies found.",
        errorText: "Unable to load movies.",
      },
      popular: {
        label: "Popular",
        heading: "Popular Movies",
        loadingText: "Loading popular movies…",
        emptyText: "No popular movies found.",
        errorText: "Unable to load movies.",
      },
    },
  },
  tv: {
    label: "TV Shows",
    listTypes: {
      airing_today: {
        label: "Airing Today",
        heading: "TV Airing Today",
        loadingText: "Loading TV shows…",
        emptyText: "No TV shows available right now.",
        errorText: "Unable to load TV shows.",
      },
      popular: {
        label: "Popular",
        heading: "Popular TV Shows",
        loadingText: "Loading popular TV shows…",
        emptyText: "No popular TV shows available right now.",
        errorText: "Unable to load TV shows.",
      },
    },
  },
} as const;

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("movies");
  const [activeListType, setActiveListType] = useState<{
    movies: "now_playing" | "popular";
    tv: "airing_today" | "popular";
  }>({
    movies: "now_playing",
    tv: "airing_today",
  });

  const currentListType = activeTab === "movies" ? activeListType.movies : activeListType.tv;
  const activeQuery = useGetMediaListQuery({
    resource: activeTab === "movies" ? "movie" : "tv",
    listType: currentListType,
  });

  const activeItems: MediaItem[] = activeQuery.data?.results ?? [];
  const config = activeTab === "movies"
    ? tabConfig.movies.listTypes[activeListType.movies]
    : tabConfig.tv.listTypes[activeListType.tv];
  const availableListTypes = activeTab === "movies"
    ? tabConfig.movies.listTypes
    : tabConfig.tv.listTypes;
  const isLoading = activeQuery.isLoading;
  const hasError = Boolean(activeQuery.error);

  return (
    <main className={styles.main}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Trending Now</h1>

        <div className={styles.controls}>
          <div className={styles.toggleGroup}>
            <span
              className={styles.toggleSlider}
              style={{ transform: activeTab === "movies" ? "translateX(0)" : "translateX(100%)" }}
            />

            {(["movies", "tv"] as ActiveTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`${styles.toggleButton} ${activeTab === tab ? styles.active : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tabConfig[tab].label}
              </button>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <span
              className={styles.filterSlider}
              style={{ transform: currentListType === "popular" ? "translateX(100%)" : "translateX(0)" }}
            />
            {Object.entries(availableListTypes).map(([listType, listInfo]) => (
              <button
                key={listType}
                type="button"
                className={`${styles.toggleButton} ${currentListType === listType ? styles.active : ""}`}
                onClick={() => setActiveListType((prev) => ({
                  ...prev,
                  [activeTab]: listType as typeof prev[typeof activeTab],
                }))}
              >
                {listInfo.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{config.heading}</h2>

        {isLoading && <p className={styles.message}>{config.loadingText}</p>}
        {hasError && <p className={styles.message}>{config.errorText}</p>}

        {!isLoading && !hasError && (
          <div className={styles.movieGrid}>
            {activeItems.length > 0 ? (
              activeItems.map((item) => (
                <MovieCard
                  key={`${activeTab}-${item.id}`}
                  title={item.title ?? item.name ?? "Untitled"}
                  releaseDate={item.release_date ?? item.first_air_date}
                  posterPath={item.poster_path}
                />
              ))
            ) : (
              <p className={styles.message}>{config.emptyText}</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}