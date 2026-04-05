"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSpacer} aria-hidden="true" />

      <Link href="/" className={styles.logo}>
        M
      </Link>

      <div className={styles.actions}>
        <input
          type="search"
          placeholder="Search..."
          className={styles.search}
        />
        <button className={styles.loginButton}>Login</button>
      </div>

      <button
        type="button"
        className={styles.menuButton}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav-panel"
      >
        <span className={styles.menuBar} />
        <span className={styles.menuBar} />
        <span className={styles.menuBar} />
      </button>

      <div
        id="mobile-nav-panel"
        className={`${styles.mobilePanel} ${isMenuOpen ? styles.mobilePanelOpen : ""}`}
      >
        <div className={styles.mobileActions}>
          <input
            type="search"
            placeholder="Search..."
            className={styles.search}
          />
          <button className={styles.loginButton}>Login</button>
        </div>
      </div>
    </nav>
  );
}
