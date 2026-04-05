"use client";
import { useState } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import AuthForm from "../AuthForm/AuthForm";

const Navbar = () => {
  const auth = useAppSelector((state) => state.auth);

  const [authModal, setAuthModal] = useState<boolean>(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">MediaBoxD</Link>
        </div>

        <div className={styles.navRight}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search movies & TV shows..."
              className={styles.searchInput}
            />
          </div>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>

          {auth.user ? (
            <Link href="/account" className={styles.navLink}>
              Account
            </Link>
          ) : (
            <button
              className={styles.navLink}
              onClick={() => setAuthModal(!authModal)}
            >
              Register/Login
            </button>
          )}
        </div>
      </nav>
      {authModal && <AuthForm onClose={() => setAuthModal(false)} />}
    </>
  );
};

export default Navbar;
