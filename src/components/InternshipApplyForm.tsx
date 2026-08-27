"use client";

import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ROLES, ROLE_BY_ID } from "@/lib/internships";
import { CheckCircle2, Send } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  roleId: string;
  linkedin: string;
  cv: string;
  message: string;
};

function initialState(roleId?: string): FormState {
  return {
    name: "",
    email: "",
    phone: "",
    roleId: roleId && ROLE_BY_ID.has(roleId) ? roleId : ROLES[0]!.id,
    linkedin: "",
    cv: "",
    message: "",
  };
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function InternshipApplyForm({ preselectRole }: { preselectRole?: string }) {
  const [form, setForm] = useState<FormState>(() => initialState(preselectRole));
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedRole = ROLE_BY_ID.get(form.roleId) ?? ROLES[0]!;

  const errors = useMemo(() => {
    const list: string[] = [];
    if (!form.name.trim()) list.push("Full name is required.");
    if (!form.email.trim()) list.push("Email is required.");
    else if (!isEmail(form.email)) list.push("Please enter a valid email address.");
    if (!form.message.trim()) list.push("Cover message is required.");
    return list;
  }, [form]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (errors.length) return;

    const subject = encodeURIComponent(`Application for ${selectedRole.title}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.phone ? `Phone: ${form.phone}` : "",
        `Role: ${selectedRole.title}`,
        form.linkedin ? `LinkedIn / profile: ${form.linkedin}` : "",
        form.cv ? `CV / resume link: ${form.cv}` : "",
        "",
        "Cover message:",
        form.message,
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.href = `mailto:careers@learnwithleaders.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-[22px] border border-gold-line bg-gold-soft/40 px-6 py-10 text-center sm:px-10">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
        <h3 className="mt-4 font-serif text-[1.4rem] font-semibold">Application ready</h3>
        <p className="mx-auto mt-2 max-w-[34em] text-[0.92rem] text-ink-soft">
          Your email app should open with the details pre-filled. Send it and we will get back to
          you within two business days.
        </p>
        <Link
          to="/internships"
          className="mt-6 inline-block rounded-full bg-crimson px-6 py-3 text-[0.92rem] font-bold text-paper no-underline transition-colors hover:bg-crimson-deep"
        >
          Back to internships
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[22px] border border-line bg-paper p-6 shadow-soft sm:p-8 md:p-10"
      noValidate
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name *</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your full name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn / profile URL</Label>
          <Input
            id="linkedin"
            type="url"
            value={form.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/yourname"
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Label>Role you are applying for *</Label>
        <RadioGroup
          value={form.roleId}
          onValueChange={(value) => update("roleId", value)}
          className="grid gap-3 sm:grid-cols-2"
        >
          {ROLES.map((role) => (
            <label
              key={role.id}
              htmlFor={role.id}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                form.roleId === role.id
                  ? "border-crimson bg-crimson/5"
                  : "border-line bg-paper hover:bg-wash"
              }`}
            >
              <RadioGroupItem value={role.id} id={role.id} className="mt-0.5" />
              <div>
                <span className="block text-[0.92rem] font-semibold text-ink">{role.title}</span>
                <span className="block text-[0.8rem] text-ink-soft">{role.type}</span>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>

      <div className="mt-6 space-y-2">
        <Label htmlFor="cv">CV / resume link</Label>
        <Input
          id="cv"
          type="url"
          value={form.cv}
          onChange={(e) => update("cv", e.target.value)}
          placeholder="Link to Google Drive, Dropbox, portfolio, etc."
        />
        <p className="text-[0.78rem] text-ink-faint">
          Paste a shareable link. We do not accept file uploads yet.
        </p>
      </div>

      <div className="mt-6 space-y-2">
        <Label htmlFor="message">Cover message *</Label>
        <Textarea
          id="message"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us why you want to join and what you would bring to the competitions team."
          rows={5}
        />
      </div>

      {touched && errors.length ? (
        <div className="mt-5 rounded-xl border border-crimson/25 bg-crimson/5 px-4 py-3 text-[0.85rem] text-crimson">
          <ul className="list-disc space-y-1 pl-4">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          className="rounded-full bg-crimson px-7 py-3 text-[0.95rem] font-bold text-paper shadow-lift transition-colors hover:bg-crimson-deep"
        >
          <Send className="h-4 w-4" />
          Send application
        </Button>
        <span className="text-[0.82rem] text-ink-faint">
          Applications go to careers@learnwithleaders.com
        </span>
      </div>
    </form>
  );
}
