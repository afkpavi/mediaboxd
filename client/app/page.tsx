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

const tabConfig: Record<ActiveTab, {
  label: string;
  heading: string;
  loadingText: string;
  emptyText: string;
  errorText: string;
}> = {
  movies: {
    label: "Movies",
    heading: "Now Playing Movies",
    loadingText: "Loading movies…",
    emptyText: "No now playing movies found.",
    errorText: "Unable to load movies.",
  },
  tv: {
    label: "TV Shows",
    heading: "TV Airing Today",
    loadingText: "Loading TV shows…",
    emptyText: "No TV shows available right now.",
    errorText: "Unable to load TV shows.",
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("movies");
  const moviesQuery = useGetMediaListQuery({ resource: "movie", listType: "now_playing" });
  const tvQuery = useGetMediaListQuery({ resource: "tv", listType: "airing_today" });

  const activeQuery = activeTab === "movies" ? moviesQuery : tvQuery;
  const activeItems: MediaItem[] = activeTab === "movies"
    ? moviesQuery.data?.results ?? []
    : tvQuery.data?.results ?? [];

  const config = tabConfig[activeTab];
  const isLoading = activeQuery.isLoading;
  const hasError = Boolean(activeQuery.error);

  return (
    <main className={styles.main}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Trending Now</h1>

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