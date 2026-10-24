import { validDate } from "./projectDates.js";

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
function isoDate(year, month, day) {
  const value = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return validDate(value) ? value : "";
}

// Read the existing English date labels without relying on browser Date.parse.
// Month-only labels sort at the end of that month, without inventing saved dates.
function legacyDate(label) {
  if (typeof label !== "string") return "";
  const text = label
    .trim()
    .replace(/,/g, "")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ");
  if (validDate(text)) return text;
  const monthNames =
    "(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)";
  const monthNumber = (value) =>
    MONTHS.indexOf(value.toLowerCase().slice(0, 3)) + 1;
  const full = text.match(
    new RegExp(
      `^${monthNames} (\\d{1,2})(?: (\\d{4}))? - ${monthNames} (\\d{1,2}) (\\d{4})$`,
      "i",
    ),
  );
  if (full) return isoDate(full[6], monthNumber(full[4]), full[5]);
  const sameMonth = text.match(
    new RegExp(`^${monthNames} \\d{1,2} - (\\d{1,2}) (\\d{4})$`, "i"),
  );
  if (sameMonth)
    return isoDate(sameMonth[3], monthNumber(sameMonth[1]), sameMonth[2]);
  const single = text.match(
    new RegExp(`^${monthNames} (\\d{1,2}) (\\d{4})(?: - Present)?$`, "i"),
  );
  if (single) return isoDate(single[3], monthNumber(single[1]), single[2]);
  const monthRange = text.match(
    new RegExp(`^(?:${monthNames} - )?${monthNames} (\\d{4})$`, "i"),
  );
  if (monthRange) {
    const month = monthNumber(monthRange[2]);
    const year = monthRange[3];
    const lastDay = new Date(
      `${year}-${String(month).padStart(2, "0")}-01T12:00:00Z`,
    );
    lastDay.setUTCMonth(lastDay.getUTCMonth() + 1, 0);
    return isoDate(year, month, lastDay.getUTCDate());
  }
  return "";
}

export function projectSortDate(project) {
  const date = project.date;
  if (validDate(date?.end)) return date.end;
  if (validDate(date?.start)) return date.start;
  return legacyDate(typeof date === "string" ? date : date?.en);
}

export function compareProjectsByDate(a, b) {
  return (
    projectSortDate(b).localeCompare(projectSortDate(a)) ||
    String(a.id).localeCompare(String(b.id), "en", { numeric: true })
  );
}
