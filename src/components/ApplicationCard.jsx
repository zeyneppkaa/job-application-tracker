import { formatDate } from "../utils/formatDate.js";
import { statusColor } from "../utils/statusColors.js";

/**
 * A single job application card: company, position, applied date, and a status
 * badge. Hovering reveals an edit button.
 *
 * @param {Object} props
 * @param {import("../interfaces/application.js").Application} props.application
 * @param {(application: import("../interfaces/application.js").Application) => void} props.onEdit
 * @param {(application: import("../interfaces/application.js").Application) => void} props.onDelete
 * @returns {JSX.Element}
 */
function ApplicationCard({ application, onEdit, onDelete }) {
  const { company, position, status, appliedDate } = application;
  const color = statusColor(status);

  return (
    <article className="group relative rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex min-w-0 items-start justify-between gap-2">
        <h3 className="min-w-0 break-words font-semibold text-slate-800">
          {company}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${color.badge}`}
        >
          {status}
        </span>
      </div>
      <p className="mt-0.5 break-words text-sm text-slate-600">{position}</p>

      <div
        onPointerDown={(event) => event.stopPropagation()}
        className="absolute bottom-2 right-2 flex gap-1 opacity-0 transition focus-within:opacity-100 group-hover:opacity-100"
      >
        <button
          type="button"
          onClick={() => onEdit(application)}
          aria-label={`Edit ${company} application`}
          className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-8.5 8.5a2 2 0 0 1-.878.506l-3.2.914a.5.5 0 0 1-.618-.618l.914-3.2a2 2 0 0 1 .506-.878l8.5-8.5Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onDelete(application)}
          aria-label={`Delete ${company} application`}
          className="rounded p-1 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M8.5 2a1 1 0 0 0-.95.68L7.2 4H4a.75.75 0 0 0 0 1.5h.29l.7 9.13A2 2 0 0 0 6.98 16.5h6.04a2 2 0 0 0 1.99-1.87l.7-9.13H16A.75.75 0 0 0 16 4h-3.2l-.35-1.32A1 1 0 0 0 11.5 2h-3Zm4.19 3.5H7.31l.66 8.5h4.06l.66-8.5Z" />
          </svg>
        </button>
      </div>
      {appliedDate && (
        <p className="mt-2 text-xs text-slate-400">
          Applied {formatDate(appliedDate)}
        </p>
      )}
    </article>
  );
}

export default ApplicationCard;
