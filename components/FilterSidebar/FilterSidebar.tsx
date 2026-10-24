"use client";
import { useState } from "react";
import styles from "./FilterSidebar.module.css";
import Icon from "../Icon/Icon";

interface FilterSidebarProps {
  onSubmit: (filters: Record<string, string>) => void;
  onClear?: () => void;
}

const FILTER_GROUPS = [
  {
    name: "form",
    title: "Camper form",
    options: [
      { label: "Alcove", value: "alcove" },
      { label: "Panel van", value: "panel_van" },
      { label: "Integrated", value: "integrated" },
      { label: "Semi integrated", value: "semi_integrated" },
    ],
  },
  {
    name: "engine",
    title: "Engine",
    options: [
      { label: "Diesel", value: "diesel" },
      { label: "Petrol", value: "petrol" },
      { label: "Hybrid", value: "hybrid" },
      { label: "Electric", value: "electric" },
    ],
  },
  {
    name: "transmission",
    title: "Transmission",
    options: [
      { label: "Automatic", value: "automatic" },
      { label: "Manual", value: "manual" },
    ],
  },
] as const;

export default function FilterSidebar({
  onSubmit,
  onClear,
}: FilterSidebarProps) {
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({
    form: "",
    engine: "",
    transmission: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ location, ...filters });
  };

  const handleClear = () => {
    setLocation("");
    setFilters({ form: "", engine: "", transmission: "" });
    if (onClear) {
      onClear();
    } else {
      onSubmit({ location: "", form: "", engine: "", transmission: "" });
    }
  };

  return (
    <aside className={styles.sidebar}>
      <form onSubmit={handleSearch} className={styles.form}>
        <div className={styles.locationGroup}>
          <label htmlFor="location" className={styles.locationLabel}>
            Location
          </label>
          <div className={styles.locationInputWrapper}>
            <Icon
              name="Map"
              width={20}
              height={20}
              className={styles.locationIcon}
            />
            <input
              id="location"
              type="text"
              placeholder="City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.locationInput}
            />
          </div>
        </div>

        {/*
          On the Figma artboard the filter groups are always visible next to
          the catalog. On small screens they collapse behind a toggle so the
          list of campers stays above the fold.
        */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="filter-groups"
          className={styles.toggleButton}
        >
          Filters
          <span
            aria-hidden="true"
            className={`${styles.toggleIcon} ${
              isOpen ? styles.open : styles.closed
            }`}
          />
        </button>

        <h2 className={styles.filtersTitle}>Filters</h2>

        <div
          id="filter-groups"
          className={`${isOpen ? "block" : "hidden"} lg:block`}
        >
          {FILTER_GROUPS.map((group, groupIndex) => (
            <div
              key={group.name}
              className={`mt-6 ${
                groupIndex > 0 ? "border-t border-muted-light pt-6" : ""
              }`}
            >
              <fieldset>
                <legend className={styles.legend}>{group.title}</legend>
                <ul className={styles.optionsList}>
                  {group.options.map((option) => {
                    const inputId = `${group.name}-${option.value}`;
                    return (
                      <li key={option.value}>
                        <label htmlFor={inputId} className={styles.optionLabel}>
                          <input
                            id={inputId}
                            type="radio"
                            name={group.name}
                            value={option.value}
                            checked={filters[group.name] === option.value}
                            onChange={() =>
                              setFilters((prev) => ({
                                ...prev,
                                [group.name]: option.value,
                              }))
                            }
                            className={styles.optionInput}
                          />
                          <span className={styles.optionRadio} />
                          <span className={styles.optionText}>
                            {option.label}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>
            </div>
          ))}
        </div>

        <button type="submit" className={styles.applyButton}>
          Apply
        </button>
      </form>

      <button
        type="button"
        onClick={handleClear}
        className={styles.clearButton}
      >
        <Icon
          name="close"
          width={12}
          height={12}
          className={styles.clearIcon}
        />
        Clear filters
      </button>
    </aside>
  );
}
