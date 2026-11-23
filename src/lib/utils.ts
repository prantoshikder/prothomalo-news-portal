const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const BN_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const BN_WEEKDAYS = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

/**
 * Fixed "current time" for the demo dataset. Using a constant (instead of
 * Date.now()) keeps every page fully prerenderable and the relative
 * timestamps stable between server and client.
 */
export const REFERENCE_NOW = "2026-11-23T12:00:00+06:00";

export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** Formats an ISO string like 2026-11-23T09:15:00+06:00 as "২৩ নভেম্বর ২০২৬, ০৯:১৫". */
export function formatBnDate(iso: string, withTime = true): string {
  const [datePart, timePart = "00:00"] = iso.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const date = `${toBn(d)} ${BN_MONTHS[m - 1]} ${toBn(y)}`;
  if (!withTime) return date;
  return `${date}, ${toBn(timePart.slice(0, 5))}`;
}

export function formatBnFullDate(date: Date): string {
  return `${BN_WEEKDAYS[date.getDay()]}, ${toBn(date.getDate())} ${
    BN_MONTHS[date.getMonth()]
  } ${toBn(date.getFullYear())}`;
}

export function timeAgo(iso: string, now: string = REFERENCE_NOW): string {
  const diffMin = Math.max(
    1,
    Math.round((Date.parse(now) - Date.parse(iso)) / 60000),
  );
  if (diffMin < 60) return `${toBn(diffMin)} মিনিট আগে`;
  const hours = Math.floor(diffMin / 60);
  if (hours < 24) return `${toBn(hours)} ঘণ্টা আগে`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${toBn(days)} দিন আগে`;
  return formatBnDate(iso, false);
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
