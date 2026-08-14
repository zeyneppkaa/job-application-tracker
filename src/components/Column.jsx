import { useDroppable } from "@dnd-kit/core";
import DraggableCard from "./DraggableCard.jsx";
import { statusColor } from "../utils/statusColors.js";

/**
 * One kanban column for a single status. Acts as a droppable target keyed by
 * its status and renders a draggable card per application, or an empty state
 * when there are none.
 *
 * @param {Object} props
 * @param {string} props.status - The column's status; also the droppable id.
 * @param {import("../interfaces/application.js").Application[]} props.applications
 *   Applications already filtered to this status.
 * @param {(application: import("../interfaces/application.js").Application) => void} props.onEdit
 * @param {(application: import("../interfaces/application.js").Application) => void} props.onDelete
 * @returns {JSX.Element}
 */
function Column({ status, applications, onEdit, onDelete }) {
  const color = statusColor(status);
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col rounded-lg transition ${
        isOver ? "bg-slate-200 ring-2 ring-blue-400" : "bg-slate-100"
      }`}
    >
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${color.dot}`} />
          <h2 className="text-sm font-semibold text-slate-700">{status}</h2>
        </div>
        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
          {applications.length}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2">
        {applications.length === 0 ? (
          <p className="px-1 py-4 text-center text-xs text-slate-400">
            No applications
          </p>
        ) : (
          applications.map((application) => (
            <DraggableCard
              key={application.id}
              application={application}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Column;
