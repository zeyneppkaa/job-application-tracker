import { createApplication } from "../interfaces/application.js";

/**
 * Build a set of realistic example applications spread across every status, for
 * populating the demo on explicit user request. Each entry goes through
 * createApplication so ids and timestamps are valid.
 *
 * @returns {import("../interfaces/application.js").Application[]}
 */
export function getSampleApplications() {
  return [
    createApplication({
      company: "Trendyol",
      position: "Frontend Developer",
      status: "Applied",
      appliedDate: "2026-08-10",
      jobUrl: "https://example.com/jobs/trendyol-frontend",
    }),
    createApplication({
      company: "Getir",
      position: "React Native Developer",
      status: "Applied",
      appliedDate: "2026-08-08",
      salary: "₺110k/ay",
    }),
    createApplication({
      company: "Spotify",
      position: "Software Engineer, Web",
      status: "Assessment",
      appliedDate: "2026-08-01",
      notes: "Take-home assignment due Aug 18.",
    }),
    createApplication({
      company: "Monzo",
      position: "Full-Stack Engineer",
      status: "Interview",
      appliedDate: "2026-07-25",
      salary: "£75k",
      jobUrl: "https://example.com/jobs/monzo-fullstack",
      notes: "Second round (system design) scheduled.",
    }),
    createApplication({
      company: "Yemeksepeti",
      position: "Kıdemli Önyüz Geliştirici",
      status: "Offer",
      appliedDate: "2026-07-15",
      salary: "₺140k/ay",
      notes: "Teklif geldi, pazarlık aşamasında.",
    }),
    createApplication({
      company: "Figma",
      position: "Product Engineer",
      status: "Rejected",
      appliedDate: "2026-07-05",
      notes: "Rejected after final round — strong feedback, reapply later.",
    }),
  ];
}
