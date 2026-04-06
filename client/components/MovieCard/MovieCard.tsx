'use client';

import styles from "./MovieCard.module.scss";

type MovieCardProps = {
  title: string;
  releaseDate?: string;
  posterPath?: string | null;
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

const MovieCard = ({ title, releaseDate, posterPath }: MovieCardProps) => {
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : null;
  const yearLabel = Number.isFinite(releaseYear) ? releaseYear : null;
  const posterUrl = posterPath ? `${IMAGE_BASE_URL}${posterPath}` : null;

  return (
    <article className={styles.movieCard}>
      <div className={styles.movieCardImage}>
        {posterUrl ? (
          <img src={posterUrl} alt={title} loading="lazy" />
        ) : (
          <div className={styles.movieCardPlaceholder}>No image available</div>
        )}

        <div className={styles.movieCardInfo}>
          <div className={styles.movieCardTitle}>
            <h2>{title}</h2>
          </div>
          <p className={styles.movieCardYear}>{yearLabel ?? "Unknown year"}</p>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
