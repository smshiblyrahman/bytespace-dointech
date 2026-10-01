const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });

const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 3600],
  ["month", 30 * 24 * 3600],
  ["week", 7 * 24 * 3600],
  ["day", 24 * 3600],
  ["hour", 3600],
  ["minute", 60],
];

/** "a year ago"-style label, matching the Figma review cards. */
export function timeAgo(iso: string, now = Date.now()) {
  const seconds = (new Date(iso).getTime() - now) / 1000;
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) {
      const label = rtf.format(Math.round(seconds / size), unit);
      return label.replace(/^1 (\w+) ago$/, "a $1 ago");
    }
  }
  return "just now";
}
