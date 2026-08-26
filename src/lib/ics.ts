// Calendar export helpers: build .ics files and Google Calendar links so a
// family can put a cohort start (and a decide-by reminder) in their own calendar.
import { dualTime, feeOf, parseISO, type Cohort, type Programme } from "./programmes";
import { slugOf } from "./programme-slug";
import { DECIDE_LEAD_DAYS, decideByISO } from "./shortlist";

const stamp = (iso: string) => iso.replace(/-/g, "");

function nextDay(iso: string): string {
  const d = parseISO(iso);
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function programmeUrl(p: Programme): string {
  const origin = typeof window === "undefined" ? "https://www.learnwithleaders.com" : window.location.origin;
  return `${origin}/programmes/${slugOf(p)}`;
}

function fold(line: string): string {
  // RFC 5545: lines wrap at 75 octets, continuation lines start with a space.
  if (line.length <= 74) return line;
  const parts: string[] = [];
  let rest = line;
  parts.push(rest.slice(0, 74));
  rest = rest.slice(74);
  while (rest.length) {
    parts.push(" " + rest.slice(0, 73));
    rest = rest.slice(73);
  }
  return parts.join("\r\n");
}

const esc = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

export function eventDescription(p: Programme, c: Cohort): string {
  const fee = feeOf(p, c);
  return [
    p.tag,
    "",
    `Live sessions: ${dualTime(p.time)}`,
    `Duration: ${p.dur}`,
    `Fee: ${fee.e}${fee.r && fee.r !== fee.e ? ` (early bird, list ${fee.r})` : ""}`,
    "",
    `Programme details: ${programmeUrl(p)}`,
    `Apply: ${p.apply}`,
  ].join("\n");
}

function vevent(opts: {
  uid: string;
  start: string;
  end: string;
  summary: string;
  description: string;
  url: string;
  alarmDaysBefore?: number;
}): string[] {
  const lines = [
    "BEGIN:VEVENT",
    `UID:${opts.uid}`,
    `DTSTAMP:${stamp(new Date().toISOString().slice(0, 10))}T000000Z`,
    `DTSTART;VALUE=DATE:${stamp(opts.start)}`,
    `DTEND;VALUE=DATE:${stamp(opts.end)}`,
    `SUMMARY:${esc(opts.summary)}`,
    `DESCRIPTION:${esc(opts.description)}`,
    `URL:${opts.url}`,
    "TRANSP:TRANSPARENT",
  ];
  if (opts.alarmDaysBefore != null) {
    lines.push(
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `TRIGGER:-P${opts.alarmDaysBefore}D`,
      `DESCRIPTION:${esc(opts.summary)}`,
      "END:VALARM",
    );
  }
  lines.push("END:VEVENT");
  return lines;
}

/** Two events per cohort: a decide-by reminder and the cohort start itself. */
export function cohortEvents(p: Programme, c: Cohort): string[] {
  const url = programmeUrl(p);
  const desc = eventDescription(p, c);
  const decide = decideByISO(c.d);
  const out: string[] = [];

  if (parseISO(decide) > parseISO(new Date().toISOString().slice(0, 10))) {
    out.push(
      ...vevent({
        uid: `lwl-decide-${p.id}-${c.d}@learnwithleaders.com`,
        start: decide,
        end: nextDay(decide),
        summary: `Decide: ${p.name} (cohort starts ${parseISO(c.d).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        })})`,
        description: `Applications should be in about ${DECIDE_LEAD_DAYS} days before the cohort starts.\n\n${desc}`,
        url,
        alarmDaysBefore: 1,
      }),
    );
  }

  out.push(
    ...vevent({
      uid: `lwl-start-${p.id}-${c.d}@learnwithleaders.com`,
      start: c.d,
      end: nextDay(c.d),
      summary: `${p.name} - cohort starts`,
      description: desc,
      url,
      alarmDaysBefore: 2,
    }),
  );

  return out;
}

export function buildIcs(entries: { p: Programme; c: Cohort }[]): string {
  const body: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Learn with Leaders//Programme Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Learn with Leaders - my dates",
  ];
  entries.forEach(({ p, c }) => body.push(...cohortEvents(p, c)));
  body.push("END:VCALENDAR");
  return body.map(fold).join("\r\n");
}

export function downloadIcs(entries: { p: Programme; c: Cohort }[], filename: string) {
  const blob = new Blob([buildIcs(entries)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function googleCalendarUrl(p: Programme, c: Cohort): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${p.name} - cohort starts`,
    dates: `${stamp(c.d)}/${stamp(nextDay(c.d))}`,
    details: eventDescription(p, c),
    location: "Online (live with mentors)",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function outlookCalendarUrl(p: Programme, c: Cohort): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: `${p.name} - cohort starts`,
    body: eventDescription(p, c),
    startdt: c.d,
    enddt: c.d,
    allday: "true",
    location: "Online (live with mentors)",
  });
  return `https://outlook.live.com/calendar/0/action/compose?${params.toString()}`;
}

export const icsFileName = (p: Programme, c: Cohort) => `lwl-${slugOf(p)}-${c.d}.ics`;
