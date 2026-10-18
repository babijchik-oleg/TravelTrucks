"use client";
import { useState } from "react";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar";
import CamperList from "@/components/CamperCatalog/CamperCatalog";
import EmptyState from "@/components/EmptyState/EmptyState";
import { fetchCampers } from "@/services/api";
import styles from "./CatalogPage.module.css";

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
      placeholderData: keepPreviousData, // Зберігає список кемперів на фоні при повторному пошуку
    });
  const campers = data?.pages.flatMap((page) => page.campers) || [];
  const handleFilterSubmit = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
  };
  const handleResetFilters = () => {
    setFilters({});
  };
  // Перевіряємо, чи завантаження повністю завершилося і чи результатів дійсно немає
  const isTrulyEmpty = !isFetching && !isPending && campers.length === 0;
  return (
    <main className={styles.catalogPage}>
      <div className={styles.container}>
        <FilterSidebar onSubmit={handleFilterSubmit} />
        <div className={styles.contentWrapper}>
          {isTrulyEmpty ? (
            <EmptyState onReset={handleResetFilters} />
          ) : (
            <CamperList
              campers={campers}
              onLoadMore={() => fetchNextPage()}
              hasMore={!!hasNextPage}
            />
          )}

          {/* Модальний лоадер поверху наявного списку */}
          {isFetching && (
            <div className={styles.loaderOverlay}>
              <div className={styles.loaderModal}>
                <div className={styles.spinner}></div>
                <h3>Loading tracks...</h3>
                <p>Please wait while we fetch the best travel trucks for you</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
