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
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <h1 className="text-xl font-bold text-slate-800">
        Job Application Tracker
      </h1>

      <dl className="flex items-center gap-6">
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
