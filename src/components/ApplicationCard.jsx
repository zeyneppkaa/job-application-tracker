import { formatDate } from "../utils/formatDate.js";
import { statusColor } from "../utils/statusColors.js";

/**
 * A single job application card: company, position, applied date, and a status
 * badge.
 *
 * @param {Object} props
 * @param {import("../interfaces/application.js").Application} props.application
 * @returns {JSX.Element}
 */
function ApplicationCard({ application }) {
  const { company, position, status, appliedDate } = application;
  const color = statusColor(status);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-800">{company}</h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${color.badge}`}
        >
          {status}
        </span>
      </div>
      <p className="mt-0.5 text-sm text-slate-600">{position}</p>
      {appliedDate && (
        <p className="mt-2 text-xs text-slate-400">
          Applied {formatDate(appliedDate)}
        </p>
      )}
    </article>
  );
}

export default ApplicationCard;
