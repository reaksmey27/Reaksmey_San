import test from "node:test";
import assert from "node:assert/strict";
import { prepareProject } from "../src/utils/projectForm.js";
import {
  prepareProjectDates,
  projectDateError,
} from "../src/utils/projectDates.js";

test("project date ranges persist ISO dates and produce English and Khmer labels", () => {
  const date = prepareProjectDates({ start: "2026-07-03", end: "2026-07-30" });
  assert.equal(date.start, "2026-07-03");
  assert.equal(date.end, "2026-07-30");
  assert.equal(date.en, "Jul 3, 2026 – Jul 30, 2026");
  assert.equal(date.km, "៣ កក្កដា ២០២៦ – ៣០ កក្កដា ២០២៦");
  assert.deepEqual(prepareProjectDates(date), date);
  const project = prepareProject({
    title: "Project",
    type: "web",
    image: "",
    tech: [],
    links: [],
    order: 0,
    date,
  });
  assert.deepEqual(project.date, date);
});

test("dates support ongoing projects, same-day work, end-only dates and legacy labels", () => {
  assert.equal(
    prepareProjectDates({ start: "2026-01-01" }).en,
    "Jan 1, 2026 – Present",
  );
  assert.equal(prepareProjectDates({ end: "2026-01-01" }).en, "Jan 1, 2026");
  assert.equal(
    prepareProjectDates({ start: "2026-01-01", end: "2026-01-01" }).en,
    "Jan 1, 2026",
  );
  assert.deepEqual(
    prepareProjectDates({ en: "Summer 2026", km: "Custom translation" }),
    { start: "", end: "", en: "Summer 2026", km: "Custom translation" },
  );
  assert.equal(prepareProjectDates({}).en, "");
});

test("dates reject reversed ranges and invalid calendar dates", () => {
  assert.match(
    projectDateError({ start: "2026-07-30", end: "2026-07-03" }),
    /on or after/,
  );
  for (const start of [
    "2026-02-29",
    "2026-02-30",
    "2026-13-01",
    "0000-01-01",
    "07/03/2026",
  ])
    assert.throws(() => prepareProjectDates({ start }), /valid start/);
  assert.equal(projectDateError({ start: "2024-02-29" }), "");
});

test("optional values get defaults and blank link rows are skipped", () => {
  const result = prepareProject(
    {
      title: " Minimal project ",
      type: "design",
      image: " https://example.com/cover.webp ",
      order: "",
      tech: [" React ", "", "React"],
      description: { en: " Summary ", km: "" },
      links: [
        { kind: "live", url: "   ", label: { en: "" } },
        {
          kind: "code",
          url: " https://example.com/code ",
          label: { en: "", km: "" },
        },
      ],
    },
    7,
  );
  assert.equal(result.title, "Minimal project");
  assert.equal(result.order, 7);
  assert.deepEqual(result.badge, { en: "Design", km: "Design" });
  assert.deepEqual(result.description, { en: "Summary", km: "Summary" });
  assert.deepEqual(result.longDescription, { en: "", km: "" });
  assert.deepEqual(result.tech, ["React"]);
  assert.equal(result.links.length, 1);
  assert.equal(result.links[0].label.en, "Source Code");
  assert.equal(result.links[0].url, "https://example.com/code");
});

test("editing preserves custom translations, zero order and existing link metadata", () => {
  const result = prepareProject(
    {
      title: "Project",
      type: "web",
      image: "",
      order: 0,
      tech: [],
      badge: { en: "Custom", km: "Custom translation" },
      links: [
        {
          kind: "live",
          url: "https://example.com",
          primary: true,
          label: { en: "Demo", km: "Translated demo" },
        },
      ],
    },
    -1,
  );
  assert.equal(result.order, 0);
  assert.equal(result.badge.km, "Custom translation");
  assert.equal(result.links[0].primary, true);
  assert.equal(result.links[0].label.km, "Translated demo");
});
