import { STATUSES } from "../interfaces/status.js";
import Column from "./Column.jsx";

/**
 * Group applications by their status.
 *
 * @param {import("../interfaces/application.js").Application[]} applications
 * @returns {Record<string, import("../interfaces/application.js").Application[]>}
 */
function groupByStatus(applications) {
  const groups = Object.fromEntries(STATUSES.map((status) => [status, []]));
  for (const app of applications) {
    if (app.status in groups) groups[app.status].push(app);
  }
  return groups;
}

/**
 * The kanban board: one column per status in STATUSES order, laid out
 * horizontally with overflow scroll.
 *
 * @param {Object} props
 * @param {import("../interfaces/application.js").Application[]} props.applications
 * @param {(application: import("../interfaces/application.js").Application) => void} props.onEdit
 * @param {(application: import("../interfaces/application.js").Application) => void} props.onDelete
 * @returns {JSX.Element}
 */
function Board({ applications, onEdit, onDelete }) {
  const groups = groupByStatus(applications);

  return (
    <div className="flex flex-1 gap-4 overflow-x-auto pb-2">
      {STATUSES.map((status) => (
        <Column
          key={status}
          status={status}
          applications={groups[status]}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default Board;
