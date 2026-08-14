/**
 * Format an ISO date string as en-US (e.g. "Aug 14, 2026").
 *
 * Returns "" for empty or unparseable input so the UI can render it directly.
 *
 * @param {string} [iso] - ISO date or timestamp string.
 * @returns {string}
 */
export function formatDate(iso) {
  if (!iso) return "";

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
