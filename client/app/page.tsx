'use client';
import { useGetMediaListQuery } from "../features/api/apiSlice";
import MovieCard from "../components/MovieCard/MovieCard";
import styles from "./page.module.scss";

export default function Home() {
  const { data, isLoading, error } = useGetMediaListQuery({ resource: "movie", listType: "now_playing" });

  const movies = data?.results ?? [];

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Now Playing</h1>

      {isLoading && <p className={styles.message}>Loading now playing movies…</p>}
      {error && <p className={styles.message}>Unable to load movies.</p>}

      {!isLoading && !error && (
        <div className={styles.movieGrid}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title ?? movie.name ?? "Untitled"}
                releaseDate={movie.release_date ?? movie.first_air_date}
                posterPath={movie.poster_path}
              />
            ))
          ) : (
            <p className={styles.message}>No now playing movies found.</p>
          )}
        </div>
      )}
    </main>
  );
}