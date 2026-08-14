import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { STATUSES } from "../interfaces/status.js";
import Column from "./Column.jsx";
import ApplicationCard from "./ApplicationCard.jsx";

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
 * The kanban board: one droppable column per status in STATUSES order, with
 * drag-and-drop to move a card between columns (which changes its status).
 *
 * @param {Object} props
 * @param {import("../interfaces/application.js").Application[]} props.applications
 * @param {(application: import("../interfaces/application.js").Application) => void} props.onEdit
 * @param {(application: import("../interfaces/application.js").Application) => void} props.onDelete
 * @param {(id: string, status: string) => void} props.onChangeStatus
 * @returns {JSX.Element}
 */
function Board({ applications, onEdit, onDelete, onChangeStatus }) {
  const groups = groupByStatus(applications);
  const [activeApplication, setActiveApplication] = useState(null);

  // Distance constraint so a click on edit/delete isn't read as a drag;
  // KeyboardSensor makes cards movable without a pointer.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor),
  );

  function handleDragStart(event) {
    const dragged = applications.find((app) => app.id === event.active.id);
    setActiveApplication(dragged ?? null);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveApplication(null);
    if (!over) return;

    const dragged = applications.find((app) => app.id === active.id);
    const targetStatus = over.id;
    if (dragged && dragged.status !== targetStatus) {
      onChangeStatus(dragged.id, targetStatus);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveApplication(null)}
    >
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

      <DragOverlay>
        {activeApplication ? (
          <ApplicationCard
            application={activeApplication}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Board;
