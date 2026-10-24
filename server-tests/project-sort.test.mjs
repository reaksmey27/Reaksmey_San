import test from "node:test";
import assert from "node:assert/strict";
import {
  compareProjectsByDate,
  projectSortDate,
} from "../src/utils/projectSort.js";

test("projects sort newest first by end date, falling back to start date, with undated projects last", () => {
  const projects = [
    { id: "undated", order: -999, date: {} },
    {
      id: "completed",
      order: 999,
      date: { start: "2026-01-01", end: "2026-10-24" },
    },
    {
      id: "older",
      order: -100,
      date: { start: "2025-12-31", end: "2026-02-01" },
    },
    { id: "ongoing", date: { start: "2026-09-01", end: "" } },
  ];
  assert.deepEqual(
    projects.sort(compareProjectsByDate).map((p) => p.id),
    ["completed", "ongoing", "older", "undated"],
  );
  projects.find((p) => p.id === "older").date.end = "2026-12-01";
  assert.equal(projects.sort(compareProjectsByDate)[0].id, "older");
});

test("legacy portfolio labels are sorted alongside exact dates", () => {
  const cases = {
    "Jul 3 - 30 2026": "2026-07-30",
    "Jun 19 - 30 2026": "2026-06-30",
    "May 13 - 14 2026": "2026-05-14",
    "Mar - Apr 2026": "2026-04-30",
    "Feb 2026": "2026-02-28",
    "Feb 2024": "2024-02-29",
    "Oct 20 - Nov 4 2025": "2025-11-04",
    "Dec 2025": "2025-12-31",
    "Jul 3, 2026 – Jul 30, 2026": "2026-07-30",
    "Dec 31, 2025 – Jan 2, 2026": "2026-01-02",
    "Oct 24, 2026 – Present": "2026-10-24",
    "2026-10-24": "2026-10-24",
    "Summer 2026": "",
    "Feb 30 2026": "",
  };
  for (const [label, expected] of Object.entries(cases))
    assert.equal(projectSortDate({ date: { en: label } }), expected, label);
});

test("equal dates have stable ordering and explicit dates override old labels", () => {
  const date = { start: "2026-01-01", en: "Dec 2026" };
  assert.equal(projectSortDate({ date }), "2026-01-01");
  assert.deepEqual(
    [
      { id: "10", date },
      { id: "2", date },
    ]
      .sort(compareProjectsByDate)
      .map((p) => p.id),
    ["2", "10"],
  );
  assert.equal(
    projectSortDate({ date: { end: "invalid", start: "2026-05-01" } }),
    "2026-05-01",
  );
});
