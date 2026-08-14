import { STATUSES } from "../interfaces/status.js";

/** Sentinel value for the "no status filter" option. */
export const ALL_STATUSES = "all";

const controlClass =
  "rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

/**
 * Search and status-filter controls for the board. Presentational — values and
 * handlers are supplied by the parent.
 *
 * @param {Object} props
 * @param {string} props.search
 * @param {(value: string) => void} props.onSearchChange
 * @param {string} props.statusFilter - A status, or ALL_STATUSES.
 * @param {(value: string) => void} props.onStatusFilterChange
 * @returns {JSX.Element}
 */
function BoardControls({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by company or position…"
        aria-label="Search applications"
        className={`${controlClass} w-full sm:w-72`}
      />
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        aria-label="Filter by status"
        className={controlClass}
      >
        <option value={ALL_STATUSES}>All statuses</option>
        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BoardControls;
