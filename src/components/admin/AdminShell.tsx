import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  ClipboardList,
  CreditCard,
  FileText,
  GraduationCap,
  KeyRound,
  LayoutDashboard,
  Link2,
  Loader2,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Radio,
  Tent,
  Ticket,
  UserPlus,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import { cn } from "@/lib/utils";

type NavItem = { label: string; to: string; icon: LucideIcon; ready?: boolean };

/**
 * Same information architecture as the live portal so admins are not retrained.
 * `ready: false` items are on the roadmap for later phases of the replica.
 */
export const ADMIN_NAV: { label: string; items: NavItem[] }[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard, ready: true },
      { label: "Applications", to: "/admin/applications", icon: ClipboardList, ready: true },
      { label: "UTM Analytics", to: "/admin/utm-analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Programmes",
    items: [
      { label: "Form Builder", to: "/admin/form-builder", icon: FileText },
      { label: "Program Codes", to: "/admin/program-codes", icon: KeyRound },
      { label: "Promo Codes", to: "/admin/promo-codes", icon: Ticket },
      { label: "Payments", to: "/admin/payments", icon: CreditCard, ready: true },
      { label: "Payment Links", to: "/admin/payment-links", icon: Link2 },
      { label: "Mentors", to: "/admin/mentors", icon: Users, ready: true },
      { label: "Student Leads", to: "/admin/manage-students", icon: GraduationCap },
      { label: "Captured Leads", to: "/admin/captured-leads", icon: UserPlus, ready: true },
    ],
  },
  {
    label: "Automation",
    items: [
      { label: "Automated Emails", to: "/admin/automated-emails", icon: Mail },
      { label: "Camp Automation", to: "/admin/camp-automation", icon: Tent },
      { label: "WhatsApp", to: "/admin/automated-whatsapp", icon: MessageCircle },
      { label: "Broadcasts", to: "/admin/whatsapp-broadcasts", icon: Radio },
    ],
  },
];

function Sidebar({ onNavigate, onSignOut, name, roleLabel }: {
  onNavigate?: () => void;
  onSignOut: () => void;
  name: string;
  roleLabel: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="flex h-full w-[248px] flex-col border-r border-border bg-card">
      <div className="border-b border-border px-4 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Learn with Leaders
        </p>
        <p className="mt-1 font-serif text-lg leading-tight text-foreground">{roleLabel} Console</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {ADMIN_NAV.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="px-2 pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {section.label}
            </p>
            {section.items.map((item) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
              const classes = cn(
                "mb-0.5 flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              );
              return item.ready ? (
                <Link key={item.to} to={item.to} onClick={onNavigate} className={classes}>
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              ) : (
                <span
                  key={item.to}
                  title="Arriving in a later phase of this replica"
                  className={cn(classes, "cursor-default opacity-50")}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </span>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-border px-3 py-3">
        <p className="truncate text-sm font-medium text-foreground">{name}</p>
        <div className="mt-2 flex items-center gap-3">
          <Link
            to="/admin/profile-settings"
            onClick={onNavigate}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            My profile
          </Link>
          <button
            onClick={onSignOut}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}

/**
 * Guard + chrome for every admin screen. The guard is client-side because the
 * Supabase session lives in browser storage; admin routes therefore run with
 * `ssr: false`.
 */
export function AdminShell({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { loading, session, isAdmin, isSuperAdmin, fullName, user, writeMode, signOut } =
    useAdminAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/admin/login", replace: true });
  }, [loading, session, navigate]);

  if (loading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-2xl text-foreground">No console access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {user?.email} is signed in but has no admin role on this workspace. Ask a super admin to
            grant access.
          </p>
          <button
            onClick={signOut}
            className="mt-6 rounded-md border border-input px-4 py-2 text-sm hover:bg-accent"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  const name = fullName || user?.email?.split("@")[0] || "Admin";
  const roleLabel = isSuperAdmin ? "Super Admin" : "Admin";

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-background text-foreground">
      <div className="hidden lg:flex">
        <Sidebar name={name} roleLabel={roleLabel} onSignOut={signOut} />
      </div>

      <div
        className={cn("fixed inset-0 z-40 lg:hidden", mobileOpen ? "" : "pointer-events-none")}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-foreground/40 transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute left-0 top-0 h-full transition-transform",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <Sidebar
            name={name}
            roleLabel={roleLabel}
            onSignOut={signOut}
            onNavigate={() => setMobileOpen(false)}
          />
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="absolute right-2 top-2 rounded-md p-1.5 text-muted-foreground hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
          <h1 className="min-w-0 flex-1 truncate font-serif text-xl text-foreground">{title}</h1>
          {writeMode === "dormant" && (
            <span className="hidden shrink-0 rounded-full border border-border bg-muted px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:inline">
              Dormant replica · read only
            </span>
          )}
          {actions}
        </header>
        <div className="flex-1 overflow-y-auto px-4 py-5">{children}</div>
      </main>
    </div>
  );
}
