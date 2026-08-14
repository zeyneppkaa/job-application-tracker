/**
 * Subtle Tailwind accent classes per status, used for column headers and card
 * badges. Falls back to slate for any unknown status.
 *
 * @type {Record<string, { badge: string, dot: string }>}
 */
export const STATUS_COLORS = {
  Applied: { badge: "bg-slate-100 text-slate-700", dot: "bg-slate-400" },
  Assessment: { badge: "bg-amber-100 text-amber-700", dot: "bg-amber-400" },
  Interview: { badge: "bg-blue-100 text-blue-700", dot: "bg-blue-400" },
  Offer: { badge: "bg-green-100 text-green-700", dot: "bg-green-500" },
  Rejected: { badge: "bg-red-100 text-red-700", dot: "bg-red-400" },
};

const FALLBACK = { badge: "bg-slate-100 text-slate-700", dot: "bg-slate-400" };

/**
 * Get the accent classes for a status.
 *
 * @param {string} status
 * @returns {{ badge: string, dot: string }}
 */
export function statusColor(status) {
  return STATUS_COLORS[status] ?? FALLBACK;
}
