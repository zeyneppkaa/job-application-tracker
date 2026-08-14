import { useDraggable } from "@dnd-kit/core";
import ApplicationCard from "./ApplicationCard.jsx";

/**
 * Wraps an ApplicationCard as a draggable item keyed by application id. The
 * original dims while dragging; the moving visual is rendered by the board's
 * DragOverlay.
 *
 * @param {Object} props
 * @param {import("../interfaces/application.js").Application} props.application
 * @param {(application: import("../interfaces/application.js").Application) => void} props.onEdit
 * @param {(application: import("../interfaces/application.js").Application) => void} props.onDelete
 * @returns {JSX.Element}
 */
function DraggableCard({ application, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: application.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`cursor-grab touch-none rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <ApplicationCard
        application={application}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

export default DraggableCard;
