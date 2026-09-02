import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import CheckoutExperience from "@/components/pay/CheckoutExperience";
import PaymentSuccess from "@/components/pay/PaymentSuccess";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";
import { getPayOffer } from "@/lib/portal/pay.functions";

type PaySearch = { token?: string };

export const Route = createFileRoute("/pay/$param")({
  validateSearch: (search: Record<string, unknown>): PaySearch =>
    typeof search["token"] === "string" ? { token: search["token"] } : {},
  head: () => ({
    meta: [
      { title: "Secure checkout — Learn with Leaders" },
      {
        name: "description",
        content:
          "Complete your Learn with Leaders enrolment on a secure, encrypted checkout. Confirm your cohort, apply a promo code and pay in full or in instalments.",
      },
      { property: "og:title", content: "Secure checkout — Learn with Leaders" },
      {
        property: "og:description",
        content: "Confirm your cohort and complete your Learn with Leaders enrolment payment securely.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PayRoute,
  errorComponent: () => <PayFallback title="Checkout unavailable" />,
  notFoundComponent: () => <PayFallback title="This payment link was not found" />,
});

function PayFallback({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
        <h1 className="font-serif text-4xl text-foreground">{title}</h1>
        <p className="mt-4 text-muted-foreground">
          The link may have expired or the programme may no longer be open. An advisor can send you a fresh
          link in minutes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <a href={CALENDLY_BOOKING_URL} target="_blank" rel="noreferrer">
              Talk to an advisor
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Browse programmes</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

function PayRoute() {
  const { param } = Route.useParams();
  const { token } = Route.useSearch();
  const navigate = useNavigate();

  if (param === "success") {
    if (!token) {
      void navigate({ to: "/" });
      return null;
    }
    return <PaymentSuccess token={token} />;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pay-offer", param],
    queryFn: () => getPayOffer({ data: { param } }),
    staleTime: 60_000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="flex flex-col items-center justify-center py-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Loading your checkout
          </p>
        </main>
      </div>
    );
  }

  if (isError || !data) return <PayFallback title="This payment link is no longer available" />;

  return <CheckoutExperience offer={data} />;
}
