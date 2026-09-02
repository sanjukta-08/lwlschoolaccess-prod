/**
 * Local pricing catalogue — amounts live in `lwl_site.form_templates.settings`
 * (and in `payment_links` for negotiated offers), never in Stripe.
 * Ported from the Application Portal's shared pricing helper; browser-safe.
 */

export type PriceRow = {
  label: string;
  /** Integer minor units (cents), or null when only a legacy price id exists. */
  amountMinor: number | null;
};

export type Pricing = {
  currency: string;
  full: PriceRow | null;
  installments: PriceRow[];
  installmentsEnabled: boolean;
};

const ZERO_DECIMAL = new Set([
  "bif", "clp", "djf", "gnf", "jpy", "kmf", "krw", "mga", "pyg", "rwf",
  "ugx", "vnd", "vuv", "xaf", "xof", "xpf",
]);

export function toMinor(amountMajor: number, currency: string): number {
  const cur = (currency || "usd").toLowerCase();
  return ZERO_DECIMAL.has(cur) ? Math.round(amountMajor) : Math.round(amountMajor * 100);
}

export function toMajor(amountMinor: number, currency: string): number {
  const cur = (currency || "usd").toLowerCase();
  return ZERO_DECIMAL.has(cur) ? amountMinor : amountMinor / 100;
}

export function formatMoney(amountMajor: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: (currency || "USD").toUpperCase(),
      maximumFractionDigits: amountMajor % 1 === 0 ? 0 : 2,
    }).format(amountMajor);
  } catch {
    return `${(currency || "USD").toUpperCase()} ${amountMajor.toFixed(0)}`;
  }
}

export function formatMinor(amountMinor: number, currency: string): string {
  return formatMoney(toMajor(amountMinor, currency), currency);
}

const num = (v: unknown): number | null => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
};

const str = (v: unknown): string => (v ?? "").toString().trim();

/** Read the pricing catalogue out of a template settings blob. No network calls. */
export function readPricing(settings: Record<string, unknown> | null | undefined): Pricing {
  const s = (settings ?? {}) as Record<string, any>;
  const currency = (str(s["currency"]) || "USD").toUpperCase();

  let full: PriceRow | null = null;
  const fpRaw = s["full_price"];
  if (fpRaw && typeof fpRaw === "object") {
    const amount = num((fpRaw as Record<string, unknown>)["amount"]);
    if (amount !== null) {
      full = {
        label: str((fpRaw as Record<string, unknown>)["label"]) || "Full payment",
        amountMinor: toMinor(amount, currency),
      };
    }
  }

  const rows = Array.isArray(s["installments"]) ? (s["installments"] as unknown[]) : [];
  const installments: PriceRow[] = rows
    .map((r, i) => {
      const row = (r ?? {}) as Record<string, unknown>;
      const amount = num(row["amount"]);
      return {
        label: str(row["label"]) || `Instalment ${i + 1}`,
        amountMinor: amount !== null ? toMinor(amount, currency) : null,
      };
    })
    .filter((r) => r.amountMinor !== null);

  const installmentsEnabled = s["installments_enabled"] !== false && installments.length > 0;

  return { currency, full, installments, installmentsEnabled };
}

/** Apply a validated promo to a minor-unit amount, clamped to the list price. */
export function applyDiscount(
  amountMinor: number,
  promo: { discountType: string; discountValue: number } | null,
  currency: string,
): number {
  if (!promo || amountMinor <= 0) return amountMinor;
  const off =
    promo.discountType === "percent"
      ? Math.round((amountMinor * promo.discountValue) / 100)
      : toMinor(promo.discountValue, currency);
  return Math.max(1, Math.min(amountMinor, amountMinor - off));
}
