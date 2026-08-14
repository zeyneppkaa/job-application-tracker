import { DEFAULT_STATUS } from "./status.js";

/**
 * A single job application tracked on the kanban board.
 *
 * @typedef {Object} Application
 * @property {string} id          - Unique id (crypto.randomUUID()).
 * @property {string} company     - Company name (required, free text, any language).
 * @property {string} position    - Position / role (required, free text, any language).
 * @property {string} status      - Current status; one of STATUSES.
 * @property {string} appliedDate - Date applied, ISO string (e.g. "2026-08-14").
 * @property {string} [salary]    - Optional salary, free text.
 * @property {string} [jobUrl]    - Optional link to the job posting.
 * @property {string} [notes]     - Optional free-text notes.
 * @property {string} createdAt   - Creation timestamp, ISO string.
 * @property {string} updatedAt   - Last-updated timestamp, ISO string.
 */

/**
 * Return today's date as an ISO date string (YYYY-MM-DD).
 *
 * @returns {string}
 */
function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Create a new Application from partial input data.
 *
 * - `id` is generated with crypto.randomUUID().
 * - `status` defaults to the default status ("Applied") when not provided.
 * - `createdAt` and `updatedAt` are set to the current ISO timestamp.
 * - `appliedDate` defaults to today (ISO date) when not provided.
 *
 * `company` and `position` are taken from `data` and are expected to be present.
 *
 * @param {Partial<Application>} [data] - Input values for the application.
 * @returns {Application} A new application object.
 */
export function createApplication(data = {}) {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    company: data.company ?? "",
    position: data.position ?? "",
    status: data.status ?? DEFAULT_STATUS,
    appliedDate: data.appliedDate ?? todayISODate(),
    salary: data.salary,
    jobUrl: data.jobUrl,
    notes: data.notes,
    createdAt: now,
    updatedAt: now,
  };
}
