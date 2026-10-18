"use client";
import { useState } from "react";
import styles from "./FilterSidebar.module.css";
import Icon from "../Icon/Icon";

interface FilterSidebarProps {
  onSubmit: (filters: Record<string, string>) => void;
  onClear?: () => void;
}

export default function FilterSidebar({
  onSubmit,
  onClear,
}: FilterSidebarProps) {
  const [location, setLocation] = useState("");
  const [form, setForm] = useState("");
  const [engine, setEngine] = useState("");
  const [transmission, setTransmission] = useState("");
  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ location, form, engine, transmission });
  };

  const handleClear = () => {
    setLocation("");
    setForm("");
    setEngine("");
    setTransmission("");
    if (onClear) {
      onClear();
    } else {
      onSubmit({ location: "", form: "", engine: "", transmission: "" });
    }
  };

  return (
    <aside className={styles.sidebar}>
      {" "}
      <form onSubmit={handleSearch} className={styles.filterGroup}>
        {" "}
        <div className={styles.locationGroup}>
          <label className={styles.label}>Location</label>
          <div className={styles.locationWrapper}>
            <Icon name="Map" width={20} height={20} />
            <input
              type="text"
              placeholder="City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.locationInput}
            />
          </div>
        </div>
        <h3 className={styles.title}>Filters</h3>
        {/* Camper form */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>Camper form</label>
          <div className={styles.radioList}>
            {["Alcove", "Panel Van", "Integrated", "Semi Integrated"].map(
              (item) => {
                const value = item.toLowerCase().replace(" ", "");
                return (
                  <label key={value} className={styles.radioItem}>
                    <input
                      type="radio"
                      name="form"
                      value={value}
                      checked={form === value}
                      onChange={(e) => setForm(e.target.value)}
                    />
                    {item}
                  </label>
                );
              },
            )}
          </div>
        </div>
        {/* Engine */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>Engine</label>
          <div className={styles.radioList}>
            {["Diesel", "Petrol", "Hybrid", "Electric"].map((item) => {
              const value = item.toLowerCase();
              return (
                <label key={value} className={styles.radioItem}>
                  <input
                    type="radio"
                    name="engine"
                    value={value}
                    checked={engine === value}
                    onChange={(e) => setEngine(e.target.value)}
                  />
                  {item}
                </label>
              );
            })}
          </div>
        </div>
        {/* Transmission */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>Transmission</label>
          <div className={styles.radioList}>
            {["Automatic", "Manual"].map((item) => {
              const value = item.toLowerCase();
              return (
                <label key={value} className={styles.radioItem}>
                  <input
                    type="radio"
                    name="transmission"
                    value={value}
                    checked={transmission === value}
                    onChange={(e) => setTransmission(e.target.value)}
                  />
                  {item}
                </label>
              );
            })}
          </div>
        </div>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className={styles.clearButton}
        >
          <Icon name="close" width={12} height={12} />
          Clear filters
        </button>
      </form>
    </aside>
  );
}
