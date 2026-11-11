"use client";

import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <h1 className={styles.title}>Campers of your dreams</h1>
            <p className={styles.description}>
              You can find everything you want in our catalog
            </p>
            <Link href="/catalog" className={styles.ctaButton}>
              View Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
