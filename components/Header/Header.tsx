"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const getHeaderBgClass = () => {
    if (pathname === "/") {
      return styles.home;
    }
    return styles.other;
  };

  return (
    <header className={`${styles.header} ${getHeaderBgClass()}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Travel<span className={styles.logoSpan}>Trucks</span>
        </Link>

        {/* On the Figma desktop artboard the navigation sits in the middle of the
          header. Below the tablet breakpoint there is not enough room for a
          centred menu, so it is aligned to the right instead. */}
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/catalog" className={styles.navLink}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
