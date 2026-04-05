"use client";
import * as React from "react";
import { useState } from "react";
import styles from "./AuthForm.module.scss";

interface IAuthFormProps {
  formType?: "login" | "signup";
  onClose?: () => void;
}

const AuthForm: React.FunctionComponent<IAuthFormProps> = ({
  formType: initialFormType = "login",
  onClose,
}) => {
  const [formType, setFormType] = useState(initialFormType);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log("Form submitted:", { formType, email, password });
  };

  const toggleFormType = () => {
    setFormType(formType === "login" ? "signup" : "login");
    // Reset fields when switching
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.authModal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <div className={styles.authForm}>
          <h2 className={styles.title}>
            {formType === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className={styles.subtitle}>
            {formType === "login"
              ? "Sign in to continue to MediaBoxD"
              : "Sign up to start watching"}
          </p>

          <form onSubmit={handleSubmit}>
            {formType === "signup" && (
              <div className={styles.formGroup}>
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {formType === "signup" && (
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            {formType === "login" && (
              <div className={styles.forgotPassword}>
                <a href="#">Forgot password?</a>
              </div>
            )}

            <button type="submit" className={styles.submitButton}>
              {formType === "login" ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <div className={styles.socialAuth}>
            <button className={styles.socialButton}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <div className={styles.toggleForm}>
            <p>
              {formType === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button type="button" onClick={toggleFormType}>
                {formType === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
