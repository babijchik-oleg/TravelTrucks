"use client";
import { useState } from "react";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import CamperList from "@/components/CamperCatalog/CamperCatalog";
import EmptyState from "@/components/EmptyState/EmptyState";
import { fetchCampers } from "@/services/api";
import styles from "./CollectionCamper.module.css";

export default function CatalogPage() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const { data, fetchNextPage, hasNextPage, isFetching, isPending } =
    useInfiniteQuery({
      queryKey: ["campers", filters],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await fetchCampers({
          ...filters,
          page: String(pageParam),
          limit: "4",
        });

        return response;
      },

      getNextPageParam: (lastPage, allPages) => {
        const loadedCount = allPages.flatMap((p) => p.campers).length;
        return loadedCount < lastPage.total ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
      placeholderData: keepPreviousData,
    });
  const campers = data?.pages.flatMap((page) => page.campers) || [];
  const handleFilterSubmit = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
  };
  const handleResetFilters = () => {
    setFilters({});
  };
  const isTrulyEmpty = !isFetching && !isPending && campers.length === 0;

  return (
    <main className={styles.catalogPage}>
      <div className={styles.mainContent}>
        <FilterSidebar
          onSubmit={handleFilterSubmit}
          onClear={handleResetFilters}
        />

        <div className={styles.campersList}>
          {isTrulyEmpty ? (
            <EmptyState onReset={handleResetFilters} />
          ) : (
            <>
              <CamperList
                campers={campers}
                onLoadMore={() => fetchNextPage()}
                hasMore={!!hasNextPage}
              />
              {isFetching && (
                <div className={styles.loadingMore}>
                  <span className={styles.spinnerSmall} />
                  <span>Loading more campers...</span>
                </div>
              )}
            </>
          )}

          {/* Initial loading state */}
          {isPending && campers.length === 0 && (
            <div className={styles.initialLoading}>
              <span className={styles.spinnerLarge} />
              <h3 className={styles.loadingTitle}>Loading campers...</h3>
              <p className={styles.loadingText}>
                Please wait while we fetch the best travel trucks for you
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
