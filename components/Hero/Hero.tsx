"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center bg-[url('/Picture-1x.jpg')] bg-cover bg-center bg-no-repeat [@media(min-resolution:2x)]:bg-[url('/Picture-2x.jpg')] md:min-h-screen xl:min-h-screen">
      <div className="absolute inset-0 flex items-center bg-gradient-to-r from-black/80 via-black/55 to-black/30 md:from-black/75 md:via-black/45 md:to-black/20">
        <div className="page-container w-full">
          <div className="flex w-full max-w-[560px] flex-col items-start md:max-w-[640px]">
            <h1 className="mb-3 text-[32px] font-semibold leading-[1.15] text-white sm:mb-4 sm:text-4xl md:text-5xl">
              Campers of your dreams
            </h1>
            <p className="mb-6 text-base font-semibold leading-[1.33] text-white/90 sm:mb-8 sm:text-lg md:mb-10 md:text-xl xl:text-2xl">
              You can find everything you want in our catalog
            </p>
            <Link
              href="/catalog"
              className="inline-flex h-12 items-center justify-center rounded-[200px] bg-accent px-8 text-base font-medium tracking-[-0.01em] text-white no-underline transition-colors hover:bg-accent-hover md:h-14 md:px-10"
            >
              View Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
