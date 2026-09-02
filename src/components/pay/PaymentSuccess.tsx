/**
 * Post-payment confirmation — polls the application row until it reads paid and
 * then hands the family straight to the prefilled application form (the
 * payment-first flow used by the Application Portal).
 */
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { getPaymentStatus } from "@/lib/portal/pay.functions";
import { formatMoney } from "@/lib/portal/pricing";

export default function PaymentSuccess({ token }: { token: string }) {
  const [redirecting, setRedirecting] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["pay-status", token],
    queryFn: () => getPaymentStatus({ data: { token } }),
    enabled: !!token,
    refetchInterval: (query) =>
      query.state.data && query.state.data.paymentStatus === "paid" ? false : 4000,
  });

  const paid = data?.paymentStatus === "paid";
  const externalApply = data?.externalApplyUrl ?? null;
  /* Only send them onward when the full application form is still outstanding. */
  const applyPath = data && !data.applicationComplete ? data.applyPath : null;
  const applyTarget = externalApply || applyPath;

  useEffect(() => {
    if (!paid || !applyTarget) return;
    setRedirecting(true);
    const t = setTimeout(() => {
      if (externalApply) window.location.assign(externalApply);
      else if (applyPath) window.location.assign(applyPath);
    }, 3500);
    return () => clearTimeout(t);
  }, [paid, applyTarget, externalApply, applyPath]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:py-28">
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10 sm:h-20 sm:w-20">
          {paid ? (
            <Check className="h-8 w-8 text-primary sm:h-9 sm:w-9" />
          ) : (
            <Loader2 className="h-7 w-7 animate-spin text-primary sm:h-8 sm:w-8" />
          )}
        </div>
        <h1 className="font-serif text-3xl text-foreground sm:text-4xl">
          {paid ? "Payment confirmed" : isLoading ? "Checking your payment" : "Almost there"}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          {paid
            ? `Your place on ${data?.programName} is confirmed. A receipt and joining details are on their way by email.`
            : "We are confirming your payment with the bank. This page refreshes on its own — no need to pay again."}
        </p>

        {data ? (
          <dl className="mt-8 w-full space-y-3 rounded-2xl border border-border p-5 text-left text-sm sm:mt-10 sm:p-6">
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">Programme</dt>
              <dd className="text-foreground">{data.programName}</dd>
            </div>
            {data.studentName ? (
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                <dt className="text-muted-foreground">Student</dt>
                <dd className="text-foreground">{data.studentName}</dd>
              </div>
            ) : null}
            {data.amount !== null ? (
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                <dt className="text-muted-foreground">Amount</dt>
                <dd className="text-foreground">{formatMoney(data.amount, data.currency)}</dd>
              </div>
            ) : null}
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">Status</dt>
              <dd className="text-foreground capitalize">{data.paymentStatus}</dd>
            </div>
          </dl>
        ) : null}

        {paid && applyTarget ? (
          <div className="mt-8 w-full rounded-2xl border border-primary/30 bg-primary/5 p-5 text-left sm:p-6">
            <p className="text-[11px] uppercase tracking-[0.25em] text-primary">One last step</p>
            <h2 className="mt-2 font-serif text-xl text-foreground sm:text-2xl">
              Complete your application details
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your payment is done. We just need the student’s full details to confirm the seat — the form is
              already prefilled with what you entered at checkout.
              {redirecting ? " Taking you there now…" : ""}
            </p>
            <div className="mt-4">
              {externalApply ? (
                <Button asChild className="w-full sm:w-auto">
                  <a href={externalApply} rel="noreferrer">
                    Complete your application <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ) : (
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => {
                    if (applyPath) window.location.assign(applyPath);
                  }}
                >
                  Complete your application <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <Button asChild variant={paid && applyTarget ? "outline" : "default"}>
            <Link to="/finder" search={{} as never}>
              Explore more programmes
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href={CALENDLY_BOOKING_URL} target="_blank" rel="noreferrer">
              Talk to an advisor
            </a>
          </Button>
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Link to="/pay/$param" params={{ param: token }}>
              View payment plan
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
