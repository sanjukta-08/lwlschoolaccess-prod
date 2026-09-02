/**
 * Checkout — replica of the Application Portal's /pay page.
 * Two columns: programme + applicant on the left, sticky payment panel right.
 * All pricing comes from the server; the browser never sends an amount.
 */
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Check,
  GraduationCap,
  Loader2,
  Lock,
  ShieldCheck,
  Tag,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/SiteHeader";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { decodeCohorts } from "@/lib/cohortFromCodes";
import { isValidEmail } from "@/lib/emailValidation";
import { filterNameInput, normalizeEmail, normalizeName } from "@/lib/inputNormalizers";
import { getStoredUtmParams } from "@/lib/utm";
import {
  startCheckout,
  validatePayPromo,
  type CheckoutResult,
  type PayOffer,
} from "@/lib/portal/pay.functions";
import { applyDiscount, formatMinor } from "@/lib/portal/pricing";

const LABEL = "text-[10px] uppercase tracking-[0.22em] text-muted-foreground";
const FIELD = "mt-1.5 h-11 rounded-lg text-base sm:text-sm";

type FormState = {
  studentName: string;
  studentEmail: string;
  parentName: string;
  parentEmail: string;
  schoolName: string;
  cohortCode: string;
};

type Promo = { code: string; discountType: "percent" | "fixed"; discountValue: number };

export default function CheckoutExperience({ offer }: { offer: PayOffer }) {
  const runCheckout = useServerFn(startCheckout);
  const checkPromo = useServerFn(validatePayPromo);

  const cohorts = useMemo(
    () => decodeCohorts(offer.cohortCodes).filter((c) => !c.isPast),
    [offer.cohortCodes],
  );

  const [form, setForm] = useState<FormState>({
    studentName: offer.applicant?.studentName ?? "",
    studentEmail: offer.applicant?.studentEmail ?? "",
    parentName: offer.applicant?.parentName ?? "",
    parentEmail: offer.applicant?.parentEmail ?? "",
    schoolName: offer.applicant?.schoolName ?? "",
    cohortCode: offer.applicant?.cohortCode || (cohorts[0]?.code ?? ""),
  });
  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const [planIndex, setPlanIndex] = useState(0);
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<Promo | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoChecking, setPromoChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<CheckoutResult | null>(null);

  const { pricing } = offer;
  const plans = pricing.installmentsEnabled ? pricing.installments : pricing.full ? [pricing.full] : [];
  const plan = plans[Math.min(planIndex, Math.max(plans.length - 1, 0))] ?? null;
  const listMinor = plan?.amountMinor ?? null;
  const dueMinor = listMinor === null ? null : applyDiscount(listMinor, promo, pricing.currency);
  const paid = offer.paymentStatus === "paid";

  async function onPromo() {
    if (!promoInput.trim()) return;
    setPromoChecking(true);
    setPromoError(null);
    try {
      const res = await checkPromo({
        data: {
          code: promoInput,
          programCode: offer.programCode ?? "",
          programName: offer.programName,
        },
      });
      if (res.ok) {
        setPromo({ code: res.code, discountType: res.discountType, discountValue: res.discountValue });
      } else {
        setPromo(null);
        setPromoError(res.error);
      }
    } catch {
      setPromoError("We could not check that code. Please try again.");
    } finally {
      setPromoChecking(false);
    }
  }

  async function onPay() {
    setError(null);
    if (!offer.locked) {
      if (!form.studentName.trim() || !isValidEmail(form.studentEmail)) {
        setError("Please add the student's full name and a valid email.");
        return;
      }
      if (!form.parentName.trim() || !isValidEmail(form.parentEmail)) {
        setError("Please add a parent or guardian name and a valid email.");
        return;
      }
      if (!form.schoolName.trim()) {
        setError("Please add the school name.");
        return;
      }
      if (cohorts.length > 1 && !form.cohortCode) {
        setError("Please choose a cohort.");
        return;
      }
    }
    setSubmitting(true);
    try {
      const res = await runCheckout({
        data: {
          param: offer.token ?? offer.slug ?? "",
          planIndex,
          promoCode: promo?.code ?? "",
          applicant: {
            studentName: normalizeName(form.studentName),
            studentEmail: normalizeEmail(form.studentEmail),
            parentName: normalizeName(form.parentName),
            parentEmail: normalizeEmail(form.parentEmail),
            schoolName: form.schoolName.trim(),
            cohortCode: form.cohortCode || offer.programCode || "",
          },
          utm: getStoredUtmParams() as Record<string, string | null | undefined>,
        },
      });
      setResult(res);
      if (res.clientSecret && res.token) {
        window.location.href = `/pay/success?token=${res.token}`;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-24">
        <header className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary">Secure checkout</p>
          <h1 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">{offer.programName}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Confirm the enrolment details and complete payment. Your place is held once payment is received.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
          {/* -------- left: programme + applicant -------- */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-border p-6">
              <h2 className="font-serif text-xl text-foreground">Programme</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className={LABEL}>Programme</dt>
                  <dd className="mt-1 flex items-center gap-2 text-foreground">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    {offer.programName}
                  </dd>
                </div>
                {offer.programCategory ? (
                  <div>
                    <dt className={LABEL}>Category</dt>
                    <dd className="mt-1 text-foreground">{offer.programCategory}</dd>
                  </div>
                ) : null}
                {cohorts.length > 0 ? (
                  <div className="sm:col-span-2">
                    <dt className={LABEL}>Cohort</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {cohorts.map((c) => {
                        const active = form.cohortCode === c.code;
                        return offer.locked || cohorts.length === 1 ? (
                          <span
                            key={c.code}
                            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-sm text-foreground"
                          >
                            <Calendar className="h-3.5 w-3.5 text-primary" />
                            {c.label}
                          </span>
                        ) : (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => set("cohortCode", c.code)}
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                              active
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border text-muted-foreground hover:border-primary/50"
                            }`}
                          >
                            <Calendar className="h-3.5 w-3.5 text-primary" />
                            {c.label}
                          </button>
                        );
                      })}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </section>

            <section className="rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl text-foreground">
                  {offer.locked ? "Applicant" : "Applicant details"}
                </h2>
                {offer.locked ? (
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <Lock className="h-3 w-3" /> From your application
                  </span>
                ) : null}
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {(
                  [
                    ["studentName", "Student name", "text"],
                    ["studentEmail", "Student email", "email"],
                    ["parentName", "Parent / guardian name", "text"],
                    ["parentEmail", "Parent / guardian email", "email"],
                    ["schoolName", "School", "text"],
                  ] as const
                ).map(([key, label, type]) => (
                  <div key={key} className={key === "schoolName" ? "sm:col-span-2" : undefined}>
                    <Label htmlFor={key} className={LABEL}>
                      {label}
                    </Label>
                    <Input
                      id={key}
                      type={type}
                      className={FIELD}
                      value={form[key]}
                      disabled={offer.locked}
                      onChange={(e) =>
                        set(
                          key,
                          type === "email" ? e.target.value : filterNameInput(e.target.value),
                        )
                      }
                      onBlur={(e) =>
                        set(key, type === "email" ? normalizeEmail(e.target.value) : e.target.value)
                      }
                      placeholder={label}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* -------- right: payment panel -------- */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-2xl border border-primary/30 bg-card p-6">
              <h2 className="font-serif text-xl text-foreground">Payment</h2>

              {plans.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  Pricing for this programme is confirmed with an advisor.
                </p>
              ) : (
                <>
                  {pricing.installmentsEnabled && plans.length > 1 ? (
                    <div className="mt-4 space-y-2">
                      <p className={LABEL}>Choose a plan</p>
                      {plans.map((p, i) => (
                        <button
                          key={p.label + i}
                          type="button"
                          onClick={() => setPlanIndex(i)}
                          className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                            i === planIndex
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          <span>{p.label}</span>
                          <span className="font-medium text-foreground">
                            {formatMinor(p.amountMinor ?? 0, pricing.currency)}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {offer.promoAllowed ? (
                    <div className="mt-5">
                      <p className={LABEL}>Promo code</p>
                      <div className="mt-1.5 flex gap-2">
                        <Input
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                          placeholder="Enter code"
                          className="h-11 rounded-lg text-base sm:text-sm"
                          disabled={!!promo}
                        />
                        {promo ? (
                          <Button
                            type="button"
                            variant="outline"
                            className="h-11"
                            onClick={() => {
                              setPromo(null);
                              setPromoInput("");
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button type="button" variant="outline" className="h-11" onClick={onPromo}>
                            {promoChecking ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Tag className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </div>
                      {promo ? (
                        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-primary">
                          <Check className="h-3.5 w-3.5" /> {promo.code} applied
                        </p>
                      ) : null}
                      {promoError ? (
                        <p className="mt-2 text-xs text-destructive">{promoError}</p>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>{plan?.label ?? "Amount"}</span>
                      <span>{formatMinor(listMinor ?? 0, pricing.currency)}</span>
                    </div>
                    {promo && dueMinor !== null && listMinor !== null && dueMinor < listMinor ? (
                      <div className="flex justify-between text-primary">
                        <span>Discount</span>
                        <span>-{formatMinor(listMinor - dueMinor, pricing.currency)}</span>
                      </div>
                    ) : null}
                    <div className="flex items-baseline justify-between pt-2">
                      <span className="text-foreground">Due now</span>
                      <span className="font-serif text-3xl text-foreground">
                        {formatMinor(dueMinor ?? 0, pricing.currency)}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {paid ? (
                <p className="mt-6 rounded-lg border border-primary/40 bg-primary/5 px-4 py-3 text-sm text-foreground">
                  This enrolment is already paid. Nothing further is due.
                </p>
              ) : null}

              {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

              {result?.dormant ? (
                <div className="mt-6 rounded-lg border border-primary/40 bg-primary/5 px-4 py-4">
                  <p className="inline-flex items-center gap-2 text-sm text-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" /> Checkout verified
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{result.message}</p>
                  <p className="mt-3 text-sm text-foreground">
                    Amount that would be charged:{" "}
                    <strong>{formatMinor(result.amountMinor, result.currency)}</strong> ({result.label})
                  </p>
                </div>
              ) : null}

              {!paid && plans.length > 0 ? (
                <Button
                  type="button"
                  className="mt-6 h-12 w-full"
                  onClick={onPay}
                  disabled={submitting}
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Continue to payment <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : null}

              <p className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <Lock className="h-3 w-3" /> Encrypted, PCI-compliant payment
              </p>

              <div className="mt-5 flex flex-wrap gap-3 text-xs">
                <a
                  href={CALENDLY_BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground/70 underline underline-offset-4 hover:text-primary"
                >
                  Talk to an advisor
                </a>
                {offer.formSlug ? (
                  <Link
                    to="/apply/$formSlug"
                    params={{ formSlug: offer.formSlug }}
                    className="text-foreground/70 underline underline-offset-4 hover:text-primary"
                  >
                    Back to the application
                  </Link>
                ) : null}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
