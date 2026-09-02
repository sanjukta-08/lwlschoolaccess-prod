import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  Check,
  Globe,
  Loader2,
  Sparkles,
  Tent,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { RankedMultiSelect, parseRankedValue } from "@/components/apply/RankedMultiSelect";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DarkDatePicker } from "@/components/ui/DarkDatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput, isPhoneValid } from "@/components/ui/PhoneInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { openCohorts } from "@/lib/cohortFromCodes";
import { validateEmail } from "@/lib/emailValidation";
import { filterNameInput, normalizeFormData, normalizeName } from "@/lib/inputNormalizers";
import { readLinkFromTemplate, resolveLinkedCodes } from "@/lib/programCodeLinks";
import { useHydratedCatalogue } from "@/lib/catalogue";
import {
  CATEGORY_DESCRIPTIONS,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  bucketCategory,
  decodeProgramCategory,
  isPhoneField,
  parseStoredPhone,
  type MergedProgram,
} from "@/lib/portal/apply-constants";
import type { FormField, PublicFormTemplate } from "@/lib/portal/form-field";
import {
  captureApplyLead,
  getApplyTemplate,
  listApplyTemplates,
  listProgramCodes,
  submitApplication,
} from "@/lib/portal/apply.functions";
import { PROGRAMMES, TYPE_NAME } from "@/lib/programmes";
import { captureUtmParams, getStoredUtmParams } from "@/lib/utm";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  camp: Tent,
  certificate: Award,
  conference: Globe,
  competition: Trophy,
  fellowship: Sparkles,
};

const inputClass =
  "bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-primary";

const typeToCategory: Record<string, string> = {
  fel: "fellowship",
  comp: "competition",
  prog: "certificate",
};

export type ApplySearch = Record<string, string | undefined>;

export function ApplyExperience({
  formSlug = "",
  search = {},
}: {
  formSlug?: string;
  search?: ApplySearch;
}) {
  const navigate = useNavigate();
  useHydratedCatalogue();

  useEffect(() => {
    captureUtmParams();
  }, []);

  const programParam = (search.program ?? "").trim();
  const cohortParam = (search.cohort ?? "").trim();
  const refRaw = (search.ref ?? search.code ?? "").trim();
  const looksLikeCode = /^[A-Z]{2,3}-/.test(refRaw);
  const refCodeParam = looksLikeCode ? refRaw.toUpperCase() : "";
  const refSlugParam = looksLikeCode ? "" : refRaw.toLowerCase();
  const formSlugParam = (formSlug || search.form || "").trim().toLowerCase();

  const [submitted, setSubmitted] = useState(false);
  const [dormantNotice, setDormantNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedRefCode, setSelectedRefCode] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Record<string, string>>({
    program_code: "",
    cohort_code: cohortParam,
  });

  const slugToLookup = formSlugParam || refSlugParam;
  const selectedCode = form.program_code || refCodeParam || programParam;

  const { data: formTemplate, isLoading: templateLoading } = useQuery<PublicFormTemplate | null>({
    queryKey: ["apply", "template", slugToLookup, selectedCode],
    queryFn: () => getApplyTemplate({ data: { slug: slugToLookup, code: selectedCode } }),
    enabled: !!slugToLookup || !!selectedCode,
    staleTime: 5 * 60 * 1000,
  });

  const { data: publicTemplates = [] } = useQuery<PublicFormTemplate[]>({
    queryKey: ["apply", "templates"],
    queryFn: () => listApplyTemplates(),
    staleTime: 60_000,
  });

  const { data: codeCatalogue = [] } = useQuery({
    queryKey: ["apply", "program-codes"],
    queryFn: () => listProgramCodes(),
    staleTime: 60_000,
  });

  /* ── programme universe: live catalogue + published apply forms ── */
  const mergedPrograms = useMemo(() => {
    const map = new Map<string, MergedProgram>();

    for (const p of PROGRAMMES) {
      const category = typeToCategory[p.type] ?? "certificate";
      map.set(p.id, {
        code: p.id,
        slug: p.id,
        name: p.name,
        category,
        duration: p.dur,
        grades: `Grades ${p.g[0]}–${p.g[1]}`,
        deliveryMode: TYPE_NAME[p.type],
        startDate: p.cohorts[0]?.d,
      });
    }

    for (const template of publicTemplates) {
      const settings = (template.settings ?? {}) as Record<string, unknown>;
      const slug = String(template.slug ?? "").trim().toLowerCase();
      const code = String(template.program_code ?? slug).trim();
      const category = bucketCategory(
        String(settings.category ?? decodeProgramCategory(code) ?? ""),
      );
      if (!slug || !code || !category) continue;
      const entry = [...map.entries()].find(([, p]) => p.code === code || p.slug === slug);
      const key = entry?.[0] ?? code;
      const existing = entry?.[1];
      map.set(key, {
        ...existing,
        code,
        slug,
        name: String(
          existing?.name || settings.program_display_name || template.name || "Application",
        ),
        category,
        externalApplyUrl:
          typeof settings.external_apply_url === "string" ? settings.external_apply_url : undefined,
      });
    }
    return [...map.values()];
  }, [publicTemplates]);

  /* ── deep links ── */
  useEffect(() => {
    const candidate = programParam || refSlugParam;
    if (!candidate || mergedPrograms.length === 0) return;
    const found = mergedPrograms.find((p) => p.code === candidate || p.slug === candidate);
    if (!found) return;
    setForm((f) => ({ ...f, program_code: found.code }));
    setSelectedCategory(found.category);
    setShowForm(true);
  }, [mergedPrograms, programParam, refSlugParam]);

  const templateProgramCodes = useMemo(() => {
    if (!formTemplate) return [] as string[];
    const stored = readLinkFromTemplate(formTemplate as unknown as Record<string, unknown>);
    return resolveLinkedCodes(stored.ids, stored.codes, codeCatalogue).codes;
  }, [formTemplate, codeCatalogue]);

  const availableCohorts = useMemo(() => openCohorts(templateProgramCodes), [templateProgramCodes]);
  const formIsClosed = templateProgramCodes.length > 0 && availableCohorts.length === 0;

  useEffect(() => {
    if (refCodeParam && !selectedRefCode) {
      setSelectedRefCode(refCodeParam);
      return;
    }
    if (availableCohorts.length === 1 && !selectedRefCode) {
      setSelectedRefCode(availableCohorts[0].code);
    }
  }, [availableCohorts, selectedRefCode, refCodeParam]);

  const dynamicFields = useMemo(() => {
    const schema = formTemplate?.schema;
    return Array.isArray(schema) && schema.length > 0 ? schema.filter((f) => !f.hidden) : null;
  }, [formTemplate]);

  const dynamicSections = useMemo(() => {
    if (!dynamicFields) return {} as Record<string, FormField[]>;
    return dynamicFields.reduce<Record<string, FormField[]>>((acc, f) => {
      const sec = f.section || "General";
      (acc[sec] ||= []).push(f);
      return acc;
    }, {});
  }, [dynamicFields]);

  const matchedProgram = mergedPrograms.find(
    (p) => p.code === form.program_code || p.slug === form.program_code,
  );
  const hasDirectLink = !!(formSlugParam || refSlugParam || refCodeParam || programParam);
  const awaitingTemplate = hasDirectLink && templateLoading;

  const selectedProgram: MergedProgram | undefined = useMemo(() => {
    if (awaitingTemplate) return undefined;
    const settings = (formTemplate?.settings ?? {}) as Record<string, unknown>;
    const templateName =
      (settings.program_display_name as string) || (formTemplate?.name as string) || "";
    if (matchedProgram) {
      if (hasDirectLink && !formTemplate) return undefined;
      return templateName ? { ...matchedProgram, name: templateName } : matchedProgram;
    }
    const slugAny = formSlugParam || refSlugParam;
    if ((slugAny || refCodeParam) && formTemplate) {
      const code = refCodeParam || formTemplate.program_code || slugAny;
      return {
        code,
        slug: slugAny || refCodeParam,
        name: templateName || "Application",
        category:
          bucketCategory(decodeProgramCategory(code) ?? (settings.category as string)) || "camp",
      };
    }
    return undefined;
  }, [matchedProgram, formSlugParam, refSlugParam, refCodeParam, formTemplate, awaitingTemplate, hasDirectLink]);

  /* ── partner-managed programmes redirect out ── */
  const externalApplyUrl = useMemo(() => {
    const url =
      ((formTemplate?.settings ?? {}) as Record<string, unknown>).external_apply_url ??
      selectedProgram?.externalApplyUrl;
    return typeof url === "string" && /^https:\/\/\S+$/i.test(url.trim()) ? url.trim() : null;
  }, [formTemplate, selectedProgram?.externalApplyUrl]);

  const externalApplyUrlWithUtm = useMemo(() => {
    if (!externalApplyUrl) return null;
    try {
      const u = new URL(externalApplyUrl);
      Object.entries(getStoredUtmParams()).forEach(([k, v]) => {
        if (v && !u.searchParams.has(k)) u.searchParams.set(k, String(v));
      });
      return u.toString();
    } catch {
      return externalApplyUrl;
    }
  }, [externalApplyUrl]);

  useEffect(() => {
    if (!externalApplyUrlWithUtm) return;
    const t = setTimeout(() => window.location.replace(externalApplyUrlWithUtm), 500);
    return () => clearTimeout(t);
  }, [externalApplyUrlWithUtm]);

  useEffect(() => {
    if (externalApplyUrl) return;
    if ((formSlugParam || refSlugParam || refCodeParam) && formTemplate && !showForm) {
      setShowForm(true);
    }
  }, [formSlugParam, refSlugParam, refCodeParam, formTemplate, showForm, externalApplyUrl]);

  /* ── lead autosave ── */
  useEffect(() => {
    if (submitted || externalApplyUrl || awaitingTemplate) return;
    const finalProgramCode = selectedRefCode || form.program_code || null;
    const t = setTimeout(() => {
      void captureApplyLead({
        data: {
          lead: {
            program_code: finalProgramCode,
            program_name: selectedProgram?.name ?? null,
            program_category:
              decodeProgramCategory(finalProgramCode || "") || selectedProgram?.category || null,
            student_name: form.student_name || null,
            student_email: form.student_email || null,
            student_phone: form.student_mobile || form.student_phone || null,
            parent_name: form.parent_name || null,
            parent_email: form.parent_email || null,
            parent_phone: form.parent_phone || null,
            grade: form.grade || null,
            school_name: form.school_name || null,
            city: form.city || null,
            state: form.state || null,
            country: form.country || null,
            raw_data: form,
            ...getStoredUtmParams(),
          },
        },
      }).catch(() => undefined);
    }, 1800);
    return () => clearTimeout(t);
  }, [form, selectedProgram, selectedRefCode, submitted, externalApplyUrl, awaitingTemplate]);

  /* ── validation ── */
  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    const fields = dynamicFields || [];

    if (fields.length > 0) {
      for (const field of fields) {
        const val = form[field.db_column]?.trim() || "";
        if (field.required && !val) {
          errors[field.db_column] = `${field.label} is required`;
          continue;
        }
        if ((field.type === "email" || field.db_column.includes("email")) && val) {
          const r = validateEmail(val);
          if (!r.ok) errors[field.db_column] = r.error || "Invalid email";
        }
        if (isPhoneField(field) && val) {
          const { country, national } = parseStoredPhone(val);
          if (!isPhoneValid(country, national)) {
            errors[field.db_column] =
              `${country.name} numbers must be ${country.lengths.join(" or ")} digits`;
          }
        }
        if (field.type === "multiselect" && val && field.min_selections) {
          if (parseRankedValue(val).length < field.min_selections) {
            errors[field.db_column] = `Select at least ${field.min_selections} preferences`;
          }
        }
      }
    } else {
      if (!form.student_name?.trim()) errors.student_name = "Full name is required";
      if (!form.student_email?.trim()) {
        errors.student_email = "Email is required";
      } else {
        const r = validateEmail(form.student_email);
        if (!r.ok) errors.student_email = r.error || "Invalid email";
      }
      for (const k of ["parent_email", "counsellor_email"] as const) {
        if (form[k]) {
          const r = validateEmail(form[k]);
          if (!r.ok) errors[k] = r.error || "Invalid email";
        }
      }
      for (const k of ["student_mobile", "parent_phone"] as const) {
        const v = form[k];
        if (!v) continue;
        const { country, national } = parseStoredPhone(v);
        if (!isPhoneValid(country, national)) {
          errors[k] = `${country.name} numbers must be ${country.lengths.join(" or ")} digits`;
        }
      }
      if (!form.country?.trim()) errors.country = "Country is required";
      if (!form.city?.trim()) errors.city = "City is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const canSubmit = useMemo(() => {
    if (!agreed || formIsClosed) return false;
    if (availableCohorts.length > 1 && !selectedRefCode) return false;
    if (dynamicFields && dynamicFields.length > 0) {
      return dynamicFields.filter((f) => f.required).every((f) => !!form[f.db_column]?.trim());
    }
    return !!form.student_name && !!form.student_email;
  }, [agreed, form, dynamicFields, availableCohorts, selectedRefCode, formIsClosed]);

  const handleSubmit = async () => {
    if (!agreed) {
      toast.error("Please agree to the terms before submitting.");
      return;
    }
    if (!validate()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    setIsSubmitting(true);
    try {
      const utm = getStoredUtmParams();
      const finalProgramCode = selectedRefCode || form.program_code || null;
      const normalized = normalizeFormData(form, dynamicFields ?? undefined);

      const payload: Record<string, unknown> = {
        program_code: finalProgramCode,
        program_name: selectedProgram?.name ?? null,
        program_category:
          decodeProgramCategory(finalProgramCode || "") || selectedProgram?.category || null,
        form_template_id: formTemplate?.id ?? null,
        utm_source: utm.utm_source ?? null,
        utm_medium: utm.utm_medium ?? null,
        utm_campaign: utm.utm_campaign ?? null,
      };

      if (dynamicFields && dynamicFields.length > 0) {
        for (const field of dynamicFields) {
          const v = normalized[field.db_column];
          payload[field.db_column] = v === "" || v == null ? null : v;
        }
      } else {
        const keys = [
          "student_name",
          "student_email",
          "student_mobile",
          "student_dob",
          "school_name",
          "grade",
          "city",
          "state",
          "country",
          "parent_name",
          "parent_email",
          "parent_phone",
          "counsellor_name",
          "counsellor_email",
          "question1",
          "question2",
        ] as const;
        for (const k of keys) payload[k] = normalized[k] || null;
        payload.student_name = normalized.student_name || "";
        payload.student_email = normalized.student_email || "";
      }

      const result = await submitApplication({ data: { payload } });

      if (result.dormant) {
        setDormantNotice(result.message ?? null);
        setSubmitted(true);
        return;
      }

      if (result.paymentStatus === "paid" && result.submissionToken) {
        toast.success("Application updated. Your payment is already confirmed.");
        window.location.assign(`/pay/success?token=${result.submissionToken}`);
        return;
      }

      if (formTemplate?.has_payment && result.submissionToken) {
        toast.success("Application submitted! Taking you to secure checkout…");
        window.location.assign(`/pay/${result.submissionToken}`);
        return;
      }

      toast.success("Application submitted", {
        description: "We've received your application. Our team will be in touch shortly.",
      });
      setSubmitted(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── field renderer ── */
  const setField = (col: string, value: string) => {
    setForm((f) => ({ ...f, [col]: value }));
    if (fieldErrors[col]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[col];
        return next;
      });
    }
  };

  const renderField = (field: FormField) => {
    const val = form[field.db_column] || "";
    const col = field.db_column.toLowerCase();

    if (isPhoneField(field)) {
      return (
        <div className="mt-1.5">
          <PhoneInput
            value={val}
            error={!!fieldErrors[field.db_column]}
            onChange={(full) => setField(field.db_column, full)}
            placeholder={field.placeholder || field.label}
          />
        </div>
      );
    }

    if (field.type === "email" || col.includes("email")) {
      return (
        <Input
          type="email"
          value={val}
          onChange={(e) => setField(field.db_column, e.target.value)}
          placeholder={field.placeholder || field.label}
          className={`${inputClass} mt-1.5 ${fieldErrors[field.db_column] ? "border-destructive/60" : ""}`}
        />
      );
    }

    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            value={val}
            rows={3}
            onChange={(e) => setField(field.db_column, e.target.value)}
            placeholder={field.placeholder || field.label}
            className={`${inputClass} mt-1.5 min-h-[80px]`}
          />
        );
      case "select":
        return (
          <Select value={val} onValueChange={(v) => setField(field.db_column, v)}>
            <SelectTrigger className={`${inputClass} mt-1.5 h-10`}>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {(field.options || []).map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "multiselect":
        return (
          <RankedMultiSelect
            options={field.options || []}
            value={val}
            onChange={(v) => setField(field.db_column, v)}
            maxSelections={field.max_selections ?? (field.options || []).length}
            minSelections={field.min_selections ?? 1}
          />
        );
      default: {
        const isDate =
          field.type === "date" || col.includes("dob") || col.includes("birth") || col.includes("date_of_birth");
        if (isDate) {
          return (
            <div className="mt-1.5">
              <DarkDatePicker
                value={val}
                onChange={(iso) => setField(field.db_column, iso)}
                placeholder={field.placeholder || "Select date"}
              />
            </div>
          );
        }
        const isName = col.includes("name");
        return (
          <Input
            type={field.type}
            value={val}
            onChange={(e) =>
              setField(field.db_column, isName ? filterNameInput(e.target.value) : e.target.value)
            }
            onBlur={() => {
              if (isName && val) {
                const formatted = normalizeName(val);
                if (formatted !== val) setField(field.db_column, formatted);
              }
            }}
            placeholder={field.placeholder || field.label}
            className={`${inputClass} mt-1.5 ${fieldErrors[field.db_column] ? "border-destructive/60" : ""}`}
          />
        );
      }
    }
  };

  const fallbackFields: FormField[] = useMemo(
    () =>
      (
        [
          ["student_name", "Student full name", "text", true, "Student"],
          ["student_email", "Student email", "email", true, "Student"],
          ["student_mobile", "Student mobile", "tel", false, "Student"],
          ["student_dob", "Date of birth", "date", false, "Student"],
          ["grade", "Current grade", "text", false, "Student"],
          ["school_name", "School", "text", false, "Student"],
          ["country", "Country", "text", true, "Location"],
          ["state", "State / Province", "text", false, "Location"],
          ["city", "City", "text", true, "Location"],
          ["parent_name", "Parent name", "text", false, "Parent / guardian"],
          ["parent_email", "Parent email", "email", false, "Parent / guardian"],
          ["parent_phone", "Parent phone", "tel", false, "Parent / guardian"],
          ["question1", "Why this programme?", "textarea", false, "About you"],
        ] as const
      ).map(([db_column, label, type, required, section]) => ({
        id: db_column,
        db_column,
        label,
        type: type as FormField["type"],
        required,
        placeholder: "",
        help_text: "",
        section,
        options: [],
      })),
    [],
  );

  const sections = dynamicFields
    ? dynamicSections
    : fallbackFields.reduce<Record<string, FormField[]>>((acc, f) => {
        (acc[f.section] ||= []).push(f);
        return acc;
      }, {});

  /* ── submitted ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
            <Check className="h-9 w-9 text-primary" />
          </div>
          <h1 className="font-serif text-4xl text-foreground">Application received</h1>
          <p className="mt-4 text-muted-foreground">
            Thank you for applying{selectedProgram ? ` to ${selectedProgram.name}` : ""}. Our
            admissions team will be in touch shortly.
          </p>
          {dormantNotice && (
            <p className="mt-6 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
              {dormantNotice}
            </p>
          )}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button onClick={() => navigate({ to: "/finder" })}>Explore more programmes</Button>
            <Button variant="outline" onClick={() => navigate({ to: "/" })}>
              Back to home
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  /* ── main ── */
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-24">
        {externalApplyUrl ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Redirecting to partner application…
            </p>
            <a
              href={externalApplyUrlWithUtm || externalApplyUrl}
              className="mt-3 text-xs text-foreground/70 underline underline-offset-4 hover:text-primary"
            >
              Click here if you are not redirected
            </a>
          </div>
        ) : awaitingTemplate ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Loading application…
            </p>
          </div>
        ) : (
          <>
            <header className="mb-10 text-center">
              <p className="text-[11px] uppercase tracking-[0.3em] text-primary">Applications</p>
              <h1 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
                {selectedProgram ? `Apply — ${selectedProgram.name}` : "Start your application"}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {selectedProgram
                  ? "Complete the form below. Our admissions team reviews every application personally."
                  : "Choose what you are applying for, then complete a short form. It takes about five minutes."}
              </p>
            </header>

            {!showForm && (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {CATEGORY_ORDER.map((cat) => {
                    const Icon = CATEGORY_ICONS[cat];
                    const count = mergedPrograms.filter((p) => p.category === cat).length;
                    const active = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setForm((f) => ({ ...f, program_code: "" }));
                        }}
                        className={`rounded-2xl border p-5 text-left transition ${
                          active
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h2 className="mt-4 font-serif text-xl text-foreground">
                          {CATEGORY_LABELS[cat]}
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {CATEGORY_DESCRIPTIONS[cat]}
                        </p>
                        <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-primary">
                          {count} open
                        </p>
                      </button>
                    );
                  })}
                </div>

                {selectedCategory && (
                  <div className="mt-10">
                    <h3 className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Select a programme
                    </h3>
                    <div className="mt-4 grid gap-2">
                      {mergedPrograms
                        .filter((p) => p.category === selectedCategory)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((p) => (
                          <button
                            key={`${p.code}-${p.slug}`}
                            type="button"
                            onClick={() => {
                              setForm((f) => ({ ...f, program_code: p.code }));
                              setShowForm(true);
                            }}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 text-left transition hover:border-primary/60 hover:bg-primary/5"
                          >
                            <span className="font-medium text-foreground">{p.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {[p.grades, p.duration, p.deliveryMode].filter(Boolean).join(" · ")}
                            </span>
                          </button>
                        ))}
                      {mergedPrograms.filter((p) => p.category === selectedCategory).length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          No open intakes in this category right now.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {showForm && (
              <div className="rounded-3xl border border-border bg-card/60 p-6 md:p-8">
                {formIsClosed && (
                  <p className="mb-6 rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-muted-foreground">
                    Applications for this programme are closed — every listed cohort has already
                    started. Talk to an advisor about the next intake.
                  </p>
                )}

                {availableCohorts.length > 1 && (
                  <div className="mb-8">
                    <Label className="text-sm font-semibold text-foreground/75">
                      Choose your cohort
                    </Label>
                    <Select value={selectedRefCode} onValueChange={setSelectedRefCode}>
                      <SelectTrigger className={`${inputClass} mt-1.5 h-10`}>
                        <SelectValue placeholder="Select a start date" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCohorts.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {Object.entries(sections).map(([section, fields]) => (
                  <section key={section} className="mb-8">
                    <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {section}
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {fields.map((field) => (
                        <div
                          key={field.id || field.db_column}
                          className={
                            field.type === "textarea" || field.type === "multiselect"
                              ? "md:col-span-2"
                              : ""
                          }
                        >
                          <Label className="text-sm font-semibold text-foreground/75">
                            {field.label}
                            {field.required && <span className="text-primary"> *</span>}
                          </Label>
                          {renderField(field)}
                          {field.help_text && (
                            <p className="mt-1 text-xs text-muted-foreground">{field.help_text}</p>
                          )}
                          {fieldErrors[field.db_column] && (
                            <p className="mt-1 text-xs text-destructive">
                              {fieldErrors[field.db_column]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}

                <label className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/20 p-4 text-sm text-muted-foreground">
                  <Checkbox
                    checked={agreed}
                    onCheckedChange={(v) => setAgreed(v === true)}
                    className="mt-0.5"
                  />
                  <span>
                    I confirm the information above is accurate and agree to be contacted by Learn
                    with Leaders about this application.
                  </span>
                </label>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button onClick={handleSubmit} disabled={!canSubmit || isSubmitting} size="lg">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…
                      </>
                    ) : (
                      "Submit application"
                    )}
                  </Button>
                  {!formSlugParam && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowForm(false);
                        setForm((f) => ({ ...f, program_code: "" }));
                      }}
                    >
                      Choose a different programme
                    </Button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
