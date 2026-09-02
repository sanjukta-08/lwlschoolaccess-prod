/** Post-payment confirmation — polls the application row until it reads paid. */
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Check, Loader2 } from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { getPaymentStatus } from "@/lib/portal/pay.functions";
import { formatMoney } from "@/lib/portal/pricing";

export default function PaymentSuccess({ token }: { token: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["pay-status", token],
    queryFn: () => getPaymentStatus({ data: { token } }),
    enabled: !!token,
    refetchInterval: (query) =>
      query.state.data && query.state.data.paymentStatus === "paid" ? false : 4000,
  });

  const paid = data?.paymentStatus === "paid";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
          {paid ? (
            <Check className="h-9 w-9 text-primary" />
          ) : (
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          )}
        </div>
        <h1 className="font-serif text-4xl text-foreground">
          {paid ? "Payment confirmed" : isLoading ? "Checking your payment" : "Almost there"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {paid
            ? `Your place on ${data?.programName} is confirmed. A receipt and joining details are on their way by email.`
            : "We are confirming your payment with the bank. This page refreshes on its own — no need to pay again."}
        </p>

        {data ? (
          <dl className="mt-10 w-full space-y-3 rounded-2xl border border-border p-6 text-left text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Programme</dt>
              <dd className="text-foreground">{data.programName}</dd>
            </div>
            {data.studentName ? (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Student</dt>
                <dd className="text-foreground">{data.studentName}</dd>
              </div>
            ) : null}
            {data.amount !== null ? (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Amount</dt>
                <dd className="text-foreground">{formatMoney(data.amount, data.currency)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Status</dt>
              <dd className="text-foreground capitalize">{data.paymentStatus}</dd>
            </div>
          </dl>
        ) : null}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/">Explore more programmes</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={CALENDLY_BOOKING_URL} target="_blank" rel="noreferrer">
              Talk to an advisor
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
}
