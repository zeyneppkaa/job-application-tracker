import { useCallback, useEffect, useState } from "react";
import { createApplication } from "../interfaces/application.js";
import { loadApplications, saveApplications } from "../utils/storage.js";

/**
 * Main data hook for the Job Application Tracker.
 *
 * Owns the list of applications, persists it to LocalStorage on every change,
 * and exposes immutable, stable-reference mutators.
 *
 * @returns {{
 *   applications: import("../interfaces/application.js").Application[],
 *   addApplication: (data?: Partial<import("../interfaces/application.js").Application>) => import("../interfaces/application.js").Application,
 *   updateApplication: (id: string, changes: Partial<import("../interfaces/application.js").Application>) => void,
 *   removeApplication: (id: string) => void,
 *   changeStatus: (id: string, status: string) => void,
 *   clearAll: () => void,
 * }}
 */
export function useApplications() {
  const [applications, setApplications] = useState(loadApplications);

  useEffect(() => {
    saveApplications(applications);
  }, [applications]);

  const addApplication = useCallback((data = {}) => {
    const application = createApplication(data);
    setApplications((prev) => [...prev, application]);
    return application;
  }, []);

  const updateApplication = useCallback((id, changes = {}) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              ...changes,
              id: app.id,
              updatedAt: new Date().toISOString(),
            }
          : app,
      ),
    );
  }, []);

  const removeApplication = useCallback((id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }, []);

  const changeStatus = useCallback(
    (id, status) => {
      updateApplication(id, { status });
    },
    [updateApplication],
  );

  const clearAll = useCallback(() => {
    setApplications([]);
  }, []);

  return {
    applications,
    addApplication,
    updateApplication,
    removeApplication,
    changeStatus,
    clearAll,
  };
}
