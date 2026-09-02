import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { CALENDLY_BOOKING_URL } from "@/lib/calendly";

export const Route = createFileRoute("/pay/")({
  head: () => ({
    meta: [
      { title: "Payments — Learn with Leaders enrolment checkout" },
      {
        name: "description",
        content:
          "Learn with Leaders payments are made through a personal, secure checkout link sent with your application. Start an application or talk to an advisor to receive yours.",
      },
      { property: "og:title", content: "Payments — Learn with Leaders" },
      {
        property: "og:description",
        content: "Enrolment payments are made through a secure checkout link tied to your application.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PayIndex,
});

function PayIndex() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-primary">Payments</p>
        <h1 className="mt-3 font-serif text-4xl text-foreground">You need a checkout link</h1>
        <p className="mt-4 text-muted-foreground">
          Every enrolment payment is tied to a specific student and programme, so checkout opens from the
          secure link in your application email. Start an application and the link follows straight away.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/apply">Start an application</Link>
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
