import Image from "next/image";
import styles from "./EmptyState.module.css";
interface EmptyStateProps {
  onReset: () => void;
}
export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className={styles.wrapper}>
      {" "}
      {/* Ілюстрація з кемпером і лупою з public/image 1.jpg */}{" "}
      <div className={styles.imageContainer}>
        {" "}
        <Image
          src="/image 1.jpg"
          alt="No campers found"
          width={840}
          height={320}
          priority
          className={styles.image}
        />{" "}
      </div>
      <h3 className={styles.title}>No campers found</h3>
      <p className={styles.subtitle}>
        We couldn`t find any campers that match your filters.
        <br />
        Try adjusting your search or clearing some filters.
      </p>
      {/* Дві кнопки, як на макеті Figma */}
      <div className={styles.buttonsGroup}>
        <button type="button" onClick={onReset} className={styles.clearBtn}>
          <span className={styles.crossIcon}>✕</span> Clear filters
        </button>
        <button type="button" onClick={onReset} className={styles.viewAllBtn}>
          View all campers
        </button>
      </div>
    </div>
  );
}
