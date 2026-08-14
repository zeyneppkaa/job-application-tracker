import { formatDate } from "../utils/formatDate.js";
import { statusColor } from "../utils/statusColors.js";

/**
 * A single job application card: company, position, applied date, and a status
 * badge. Hovering reveals an edit button.
 *
 * @param {Object} props
 * @param {import("../interfaces/application.js").Application} props.application
 * @param {(application: import("../interfaces/application.js").Application) => void} props.onEdit
 * @returns {JSX.Element}
 */
function ApplicationCard({ application, onEdit }) {
  const { company, position, status, appliedDate } = application;
  const color = statusColor(status);

  return (
    <article className="group relative rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-800">{company}</h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${color.badge}`}
        >
          {status}
        </span>
      </div>
      <p className="mt-0.5 text-sm text-slate-600">{position}</p>

      <button
        type="button"
        onClick={() => onEdit(application)}
        aria-label={`Edit ${company} application`}
        className="absolute bottom-2 right-2 rounded p-1 text-slate-400 opacity-0 transition hover:bg-slate-100 hover:text-slate-600 focus:opacity-100 group-hover:opacity-100"
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
      {appliedDate && (
        <p className="mt-2 text-xs text-slate-400">
          Applied {formatDate(appliedDate)}
        </p>
      )}
    </article>
  );
}

export default ApplicationCard;
