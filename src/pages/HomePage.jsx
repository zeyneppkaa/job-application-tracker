import { useApplications } from "../hooks/useApplications.js";
import { STATUSES } from "../interfaces/status.js";
import TopBar from "../components/TopBar.jsx";
import Board from "../components/Board.jsx";

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
  const { applications } = useApplications();

  const byStatus = countByStatus(applications);
  const total = applications.length;

  return (
    <div className="flex h-full flex-col">
      <TopBar
        total={total}
        interviewing={byStatus.Interview}
        offers={byStatus.Offer}
      />
      <main className="flex flex-1 flex-col p-6">
        <Board applications={applications} />
      </main>
    </div>
  );
}

export default HomePage;
