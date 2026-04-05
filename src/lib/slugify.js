/**
 * Converts a string to a URL-friendly slug.
 * Removes accents, special characters, and replaces spaces with hyphens.
 */
export function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/-+/g, "-"); // collapse repeated hyphens
}
