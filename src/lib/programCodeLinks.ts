// Program-code links: stable-id linking between a form template and the shared
// LWL programme-code catalogue (`lwl.program_codes`, surfaced here as the
// `program_codes` view).
//
// Why ids: a programme code string embeds its cohort start date
// (e.g. ZL-HSA-FD01-141126). When LWL Console updates a cohort's date the
// `ref_code` text changes, but the catalogue row keeps the same `id`. So the
// link of record is the row **id**, stored on the template as
// `settings["program_code_ids"]`. The human-readable codes stay alongside in
// `settings["program_codes"]` (and `form_templates.program_code` for the primary)
// as a resolved snapshot, so every downstream consumer — /pay, /apply, Stripe
// metadata, reconciliation, emails, other platforms — keeps reading plain text.
//
// `resolveLinkedCodes` is the single place that turns (ids, snapshot, catalogue)
// into the live truth, and reports whether the stored snapshot drifted.

export interface CatalogueCode {
  id: string;
  ref_code: string;
}

export interface CodeLink {
  /** Catalogue row id, or null for a legacy text-only link. */
  id: string | null;
  /** Live ref_code, or null when the catalogue row vanished. */
  code: string | null;
}

export interface LinkedCodes {
  /** Ordered id/code pairs — use this when you need the pairing. */
  links: CodeLink[];
  /** Catalogue row ids — the link of record, in display order. */
  ids: string[];
  /** Live ref_code for each linked row, in the same order. */
  codes: string[];
  /** True when the stored snapshot no longer matches the catalogue. */
  changed: boolean;
}

export function resolveLinkedCodes(
  storedIds: unknown,
  storedCodes: unknown,
  catalogue: CatalogueCode[] | null | undefined,
): LinkedCodes {
  const idList = (Array.isArray(storedIds) ? storedIds : []).filter(Boolean).map(String);
  const codeList = (Array.isArray(storedCodes) ? storedCodes : []).filter(Boolean).map(String);

  // Catalogue unavailable (offline / failed fetch): never rewrite anything.
  if (!catalogue || catalogue.length === 0) {
    return {
      links: idList.length === codeList.length
        ? idList.map((id, i) => ({ id, code: codeList[i] ?? null }))
        : [
            ...idList.map((id) => ({ id, code: null as string | null })),
            ...codeList.map((code) => ({ id: null as string | null, code })),
          ],
      ids: idList,
      codes: codeList,
      changed: false,
    };
  }

  const codeById = new Map<string, string>();
  const idByCode = new Map<string, string>();
  for (const row of catalogue) {
    if (!row?.id || !row?.ref_code) continue;
    codeById.set(String(row.id), String(row.ref_code));
    idByCode.set(String(row.ref_code), String(row.id));
  }

  const links: CodeLink[] = [];
  const push = (id: string | null, code: string | null) => {
    if (id && links.some((l) => l.id === id)) return;
    if (code && links.some((l) => l.code === code)) return;
    if (!id && !code) return;
    links.push({ id, code });
  };

  // 1. Linked ids win: each resolves to the catalogue's current ref_code.
  for (let i = 0; i < idList.length; i++) {
    const id = idList[i] ?? '';
    const live = codeById.get(id);
    if (live) {
      push(id, live);
      continue;
    }
    // Row no longer in the catalogue: keep the link and its last known text.
    const fallback = codeList.length === idList.length ? (codeList[i] ?? null) : null;
    push(id, fallback ?? null);
  }

  // 2. Legacy text-only links: adopt the catalogue id so future renames follow.
  for (const code of codeList) {
    const id = idByCode.get(code) ?? null;
    if (id && idList.includes(id)) continue; // already handled above (renamed code)
    push(id, code);
  }

  const ids = links.map((l) => l.id).filter(Boolean) as string[];
  const codes = links.map((l) => l.code).filter(Boolean) as string[];
  const changed = ids.join('|') !== idList.join('|') || codes.join('|') !== codeList.join('|');
  return { links, ids, codes, changed };
}

/** Read the stored link pair off a form_templates row. */
export function readLinkFromTemplate(template: any): { ids: string[]; codes: string[] } {
  const settings = (template?.settings || {}) as Record<string, unknown>;
  const ids = Array.isArray(settings["program_code_ids"]) ? (settings["program_code_ids"] as string[]) : [];
  const codes = Array.isArray(settings["program_codes"]) && (settings["program_codes"] as string[]).length
    ? (settings["program_codes"] as string[])
    : (template?.program_code ? [String(template.program_code)] : []);
  return { ids: ids.filter(Boolean).map(String), codes: codes.filter(Boolean).map(String) };
}
