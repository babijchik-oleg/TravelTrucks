/** Formats a price the way it is shown in the Figma design: €11,000.00 */
export function formatPrice(price: number): string {
  return `€${price.toLocaleString("en-US", {
    maximumFractionDigits: 0,
    useGrouping: false,
  })}`;
}


/** Turns API values into human-readable labels according to Figma design */ export function formatLabel(
  value?: string | null,
): string {
  if (!value) return "";
  // Карта явных соответствий для API-значений

  const labelMap: Record<string, string> = {
    panel_van: "Panel truck",
    fully_integrated: "Fully Integrated",
    integrated: "Panel truck",
    semi_integrated: "Semi-Integrated",
    alcove: "Alcove",
    // Трансмиссия и Двигатель
    automatic: "Automatic",
    manual: "Manual",
    petrol: "Petrol",
    diesel: "Diesel",
    hybrid: "Hybrid",
    electric: "Electric",

    // Удобства (Amenities)
    ac: "AC",
    bathroom: "Bathroom",
    kitchen: "Kitchen",
    tv: "TV",
    radio: "Radio",
    refrigerator: "Refrigerator",
    microwave: "Microwave",
    gas: "Gas",
    water: "Water",
  };
  // Если значение есть в карте — возвращаем его, иначе форматируем по умолчанию
  if (labelMap[value]) {
    return labelMap[value];
  }
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
