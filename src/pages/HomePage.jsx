import { useState } from "react";
import { useApplications } from "../hooks/useApplications.js";
import { STATUSES } from "../interfaces/status.js";
import TopBar from "../components/TopBar.jsx";
import Board from "../components/Board.jsx";
import Modal from "../components/Modal.jsx";
import ApplicationForm from "../components/ApplicationForm.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";

/**
 * Count applications by status, seeded with every status so absent columns
 * report 0 rather than undefined.
 *
 * @param {import("../interfaces/application.js").Application[]} applications
 * @returns {Record<string, number>}
 */
function countByStatus(applications) {
  const counts = Object.fromEntries(STATUSES.map((status) => [status, 0]));
  for (const app of applications) {
    if (app.status in counts) counts[app.status] += 1;
  }
  return counts;
}

/**
 * Main page: owns the application data and lays out the top bar and board.
 *
 * @returns {JSX.Element}
 */
function HomePage() {
  const { applications, addApplication, updateApplication, removeApplication } =
    useApplications();

  // The application being edited, or null when the modal is closed. `true`
  // marks add mode (open, no existing application).
  const [editing, setEditing] = useState(null);
  const isOpen = editing !== null;
  const editingApplication = editing === true ? undefined : editing;

  // The application awaiting delete confirmation, or null when none is pending.
  const [pendingDelete, setPendingDelete] = useState(null);

  const byStatus = countByStatus(applications);
  const total = applications.length;

  function handleSubmit(values) {
    if (editingApplication) {
      updateApplication(editingApplication.id, values);
    } else {
      addApplication(values);
    }
    setEditing(null);
  }

  function handleConfirmDelete() {
    removeApplication(pendingDelete.id);
    setPendingDelete(null);
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar
        total={total}
        interviewing={byStatus.Interview}
        offers={byStatus.Offer}
      />
      <main className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Add Application
          </button>
        </div>
        <Board
          applications={applications}
          onEdit={setEditing}
          onDelete={setPendingDelete}
        />
      </main>

      <Modal
        isOpen={isOpen}
        onClose={() => setEditing(null)}
        title={editingApplication ? "Edit Application" : "Add Application"}
      >
        <ApplicationForm
          initialValues={editingApplication}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={pendingDelete !== null}
        title="Delete Application"
        message={
          pendingDelete && (
            <>
              Delete the application for &ldquo;{pendingDelete.position}&rdquo;
              at &ldquo;{pendingDelete.company}&rdquo;? This cannot be undone.
            </>
          )
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}

export default HomePage;
