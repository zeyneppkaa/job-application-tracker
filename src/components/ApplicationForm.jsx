import { useState } from "react";
import { STATUSES, DEFAULT_STATUS } from "../interfaces/status.js";

/** Today as an ISO date string (YYYY-MM-DD), for the date input default. */
function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Build the form's initial field state from an existing application, or empty
 * defaults when adding.
 *
 * @param {Partial<import("../interfaces/application.js").Application>} [initialValues]
 * @returns {Record<string, string>}
 */
function initialFields(initialValues) {
  return {
    company: initialValues?.company ?? "",
    position: initialValues?.position ?? "",
    status: initialValues?.status ?? DEFAULT_STATUS,
    appliedDate: initialValues?.appliedDate ?? todayISODate(),
    salary: initialValues?.salary ?? "",
    jobUrl: initialValues?.jobUrl ?? "",
    notes: initialValues?.notes ?? "",
  };
}

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

/**
 * Controlled form for creating or editing an application. Handles its own field
 * state and validation; submits values via onSubmit rather than a native form
 * submit.
 *
 * @param {Object} props
 * @param {Partial<import("../interfaces/application.js").Application>} [props.initialValues]
 *   Existing application when editing; undefined when adding.
 * @param {(values: Record<string, string>) => void} props.onSubmit
 * @param {() => void} props.onCancel
 * @returns {JSX.Element}
 */
function ApplicationForm({ initialValues, onSubmit, onCancel }) {
  const [fields, setFields] = useState(() => initialFields(initialValues));
  const [errors, setErrors] = useState({});

  function setField(name, value) {
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!fields.company.trim()) nextErrors.company = "Company is required.";
    if (!fields.position.trim()) nextErrors.position = "Position is required.";
    return nextErrors;
  }

  function handleSubmit() {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    // Trim required text; leave optional fields as entered.
    onSubmit({
      ...fields,
      company: fields.company.trim(),
      position: fields.position.trim(),
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Field label="Company" required error={errors.company}>
        <input
          type="text"
          value={fields.company}
          onChange={(e) => setField("company", e.target.value)}
          className={inputClass}
          autoFocus
        />
      </Field>

      <Field label="Position" required error={errors.position}>
        <input
          type="text"
          value={fields.position}
          onChange={(e) => setField("position", e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="flex gap-3">
        <Field label="Status" className="flex-1">
          <select
            value={fields.status}
            onChange={(e) => setField("status", e.target.value)}
            className={inputClass}
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Applied date" className="flex-1">
          <input
            type="date"
            value={fields.appliedDate}
            onChange={(e) => setField("appliedDate", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Salary">
        <input
          type="text"
          value={fields.salary}
          onChange={(e) => setField("salary", e.target.value)}
          className={inputClass}
          placeholder="e.g. $120k"
        />
      </Field>

      <Field label="Job URL">
        <input
          type="text"
          value={fields.jobUrl}
          onChange={(e) => setField("jobUrl", e.target.value)}
          className={inputClass}
          placeholder="https://…"
        />
      </Field>

      <Field label="Notes">
        <textarea
          value={fields.notes}
          onChange={(e) => setField("notes", e.target.value)}
          className={`${inputClass} min-h-[80px] resize-y`}
        />
      </Field>

      <div className="mt-1 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}

/**
 * Labeled field wrapper with an optional required marker and error message.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {boolean} [props.required]
 * @param {string} [props.error]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
function Field({ label, required, error, className = "", children }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

export default ApplicationForm;
