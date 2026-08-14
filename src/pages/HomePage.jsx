import { useState } from "react";
import { useApplications } from "../hooks/useApplications.js";
import { STATUSES } from "../interfaces/status.js";
import TopBar from "../components/TopBar.jsx";
import Board from "../components/Board.jsx";
import Modal from "../components/Modal.jsx";
import ApplicationForm from "../components/ApplicationForm.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import BoardControls, { ALL_STATUSES } from "../components/BoardControls.jsx";

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
 * Filter applications by a case-insensitive company/position search and an
 * optional exact status. Used for display only — it never mutates the data.
 *
 * @param {import("../interfaces/application.js").Application[]} applications
 * @param {string} search
 * @param {string} statusFilter - A status, or ALL_STATUSES.
 * @returns {import("../interfaces/application.js").Application[]}
 */
function filterApplications(applications, search, statusFilter) {
  const query = search.trim().toLowerCase();

  return applications.filter((app) => {
    if (statusFilter !== ALL_STATUSES && app.status !== statusFilter) {
      return false;
    }
    if (!query) return true;
    return (
      app.company.toLowerCase().includes(query) ||
      app.position.toLowerCase().includes(query)
    );
  });
}

/**
 * Main page: owns the application data and lays out the top bar and board.
 *
 * @returns {JSX.Element}
 */
function HomePage() {
  const {
    applications,
    addApplication,
    updateApplication,
    removeApplication,
    changeStatus,
  } = useApplications();

  // The application being edited, or null when the modal is closed. `true`
  // marks add mode (open, no existing application).
  const [editing, setEditing] = useState(null);
  const isOpen = editing !== null;
  const editingApplication = editing === true ? undefined : editing;

  // The application awaiting delete confirmation, or null when none is pending.
  const [pendingDelete, setPendingDelete] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(ALL_STATUSES);

  const byStatus = countByStatus(applications);
  const total = applications.length;

  const filtered = filterApplications(applications, search, statusFilter);
  const noMatches = total > 0 && filtered.length === 0;

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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <BoardControls
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Add Application
          </button>
        </div>

        {noMatches ? (
          <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
            No applications match your search
          </div>
        ) : (
          <Board
            applications={filtered}
            onEdit={setEditing}
            onDelete={setPendingDelete}
            onChangeStatus={changeStatus}
          />
        )}
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
