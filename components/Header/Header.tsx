"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  const getHeaderBgClass = () => {
    if (pathname === "/") {
      return "bg-white";
    }
    return "bg-surface";
  };
  
  return (
    <header className={`w-full border-b border-muted-light ${getHeaderBgClass()}`}>
      <div className="page-container relative flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-[0.01em] text-main no-underline md:text-2xl"
        >
          Travel<span className="font-normal text-muted">Trucks</span>
        </Link>

        {/*
          On the Figma desktop artboard the navigation sits in the middle of the
          header. Below the tablet breakpoint there is not enough room for a
          centred menu, so it is aligned to the right instead.
        */}
        <nav className="flex items-center gap-4 text-sm font-medium md:absolute md:left-1/2 md:translate-x-[-50%] md:gap-8 md:text-base">
          <Link
            href="/"
            className="whitespace-nowrap text-main no-underline transition-colors hover:text-accent"
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className="whitespace-nowrap text-main no-underline transition-colors hover:text-accent"
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
