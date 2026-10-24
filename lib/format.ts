/** Formats a price the way it is shown in the Figma design: €11,000.00 */
export function formatPrice(price: number): string {
  return `€${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Turns API values such as "semi_integrated" into "Semi integrated" */
export function formatLabel(value?: string | null): string {
  if (!value) return "";
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
