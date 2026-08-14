/**
 * Application header: title on the left, summary counters on the right.
 *
 * Presentational only — it receives already-computed counts and never touches
 * the data hook.
 *
 * @param {Object} props
 * @param {number} props.total - Total number of applications.
 * @param {number} props.interviewing - Applications with status "Interview".
 * @param {number} props.offers - Applications with status "Offer".
 * @returns {JSX.Element}
 */
function TopBar({ total, interviewing, offers }) {
  const counters = [
    { label: "Total", value: total },
    { label: "Interviewing", value: interviewing },
    { label: "Offers", value: offers },
  ];

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6 sm:py-4">
      <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
        Job Application Tracker
      </h1>

      <dl className="flex flex-wrap items-center gap-x-6 gap-y-1">
        {counters.map(({ label, value }) => (
          <div key={label} className="flex items-baseline gap-2">
            <dt className="text-sm text-slate-500">{label}</dt>
            <dd className="text-lg font-semibold text-slate-800">{value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

export default TopBar;
