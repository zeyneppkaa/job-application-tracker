/**
 * The fixed, ordered list of application statuses.
 *
 * This is the single source of truth for the kanban columns — the UI maps over
 * this array to render columns. Nothing else should hardcode the status list.
 *
 * @type {readonly string[]}
 */
export const STATUSES = [
  "Applied",
  "Assessment",
  "Interview",
  "Offer",
  "Rejected",
];

/**
 * The default status assigned to a newly created application.
 *
 * @type {string}
 */
export const DEFAULT_STATUS = STATUSES[0];

/**
 * Display labels for each status. The status values are already display-ready
 * English, so labels equal the values for now. Kept as a separate map so the UI
 * can consume labels without depending on the values being human-readable.
 *
 * @type {Record<string, string>}
 */
export const STATUS_LABELS = STATUSES.reduce((labels, status) => {
  labels[status] = status;
  return labels;
}, /** @type {Record<string, string>} */ ({}));

/**
 * Check whether a given value is a valid status.
 *
 * @param {string} status
 * @returns {boolean}
 */
export function isValidStatus(status) {
  return STATUSES.includes(status);
}
