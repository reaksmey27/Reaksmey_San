const KHMER_MONTHS = [
  "មករា",
  "កុម្ភៈ",
  "មីនា",
  "មេសា",
  "ឧសភា",
  "មិថុនា",
  "កក្កដា",
  "សីហា",
  "កញ្ញា",
  "តុលា",
  "វិច្ឆិកា",
  "ធ្នូ",
];
const khmerNumber = (value) =>
  String(value).replace(/\d/g, (digit) => "០១២៣៤៥៦៧៨៩"[Number(digit)]);

export function validDate(value) {
  if (typeof value !== "string") return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith("0000"))
    return false;
  const parsed = new Date(`${value}T12:00:00Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

export function projectDateError(date = {}) {
  const { start = "", end = "" } = date;
  if ((start && !validDate(start)) || (end && !validDate(end)))
    return "Choose valid start and end dates.";
  if (start && end && end < start)
    return "End date must be on or after the start date.";
  return "";
}

export function prepareProjectDates(date = {}) {
  const error = projectDateError(date);
  if (error) throw new Error(error);
  const { start = "", end = "" } = date;
  if (!start && !end)
    return {
      start,
      end,
      en: date.en?.trim() || "",
      km: date.km?.trim() || date.en?.trim() || "",
    };
  const localized = Object.fromEntries(
    ["en", "km"].map((language) => {
      const format = (value) => {
        if (language === "km") {
          const [year, month, day] = value.split("-");
          return `${khmerNumber(Number(day))} ${KHMER_MONTHS[Number(month) - 1]} ${khmerNumber(year)}`;
        }
        return new Intl.DateTimeFormat("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(`${value}T12:00:00Z`));
      };
      const label =
        start && end
          ? start === end
            ? format(start)
            : `${format(start)} – ${format(end)}`
          : start
            ? `${format(start)} – ${language === "km" ? "បច្ចុប្បន្ន" : "Present"}`
            : format(end);
      return [language, label];
    }),
  );
  return { start, end, ...localized };
}
