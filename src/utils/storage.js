import { isValidStatus } from "../interfaces/status.js";

/**
 * The single, fixed LocalStorage key under which all applications are stored.
 *
 * @type {string}
 */
export const STORAGE_KEY = "job-application-tracker:applications";

/**
 * Load all applications from LocalStorage.
 *
 * Never throws: on a missing key, invalid JSON, or non-array payload it returns
 * an empty array. Entries with an invalid status are filtered out so corrupt or
 * out-of-date data can't break the board.
 *
 * @returns {import("../interfaces/application.js").Application[]}
 */
export function loadApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (app) => app && typeof app === "object" && isValidStatus(app.status),
    );
  } catch {
    return [];
  }
}

/**
 * Persist all applications to LocalStorage.
 *
 * Wrapped in try/catch so a storage failure (e.g. quota exceeded, disabled
 * storage) doesn't crash the app.
 *
 * @param {import("../interfaces/application.js").Application[]} applications
 * @returns {void}
 */
export function saveApplications(applications) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch {
    // Ignore write failures — persistence is best-effort.
  }
}
