import { useMemo } from "react";

import { COUNTRY_CODES, DEFAULT_COUNTRY, type CountryCode } from "@/lib/countryCodes";
import { cn } from "@/lib/utils";

export interface PhoneInputProps {
  value: string; // full E.164-style string e.g. "+919876543210"
  onChange: (full: string, parts: { dial: string; iso2: string; national: string; valid: boolean }) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  error?: boolean;
  disabled?: boolean;
}

/** Validates a national number against the lengths declared in COUNTRY_CODES. */
export function isPhoneValid(country: CountryCode, national: string): boolean {
  const digits = (national || "").replace(/\D/g, "");
  if (!digits) return false;
  return country.lengths.includes(digits.length);
}

const sortedByDial = () => [...COUNTRY_CODES].sort((a, b) => b.dial.length - a.dial.length);

function splitValue(value: string): { country: CountryCode; national: string } {
  if (!value) return { country: DEFAULT_COUNTRY, national: "" };
  const raw = String(value).trim();
  const v = raw.startsWith("+") ? raw : `+${raw.replace(/\D/g, "")}`;
  const match = sortedByDial().find((c) => v.startsWith(c.dial));
  if (match) return { country: match, national: v.slice(match.dial.length).replace(/\D/g, "") };
  return { country: DEFAULT_COUNTRY, national: v.replace(/\D/g, "") };
}

const optionKey = (c: CountryCode) => `${c.iso2}${c.dial}`;

export function PhoneInput({
  value,
  onChange,
  placeholder,
  className,
  inputClassName,
  error,
  disabled,
}: PhoneInputProps) {
  const { country, national } = useMemo(() => splitValue(value), [value]);
  const options = useMemo(
    () => [...COUNTRY_CODES].sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  const emit = (next: CountryCode, digits: string) => {
    const clean = digits.replace(/\D/g, "");
    onChange(`${next.dial}${clean}`, {
      dial: next.dial,
      iso2: next.iso2,
      national: clean,
      valid: isPhoneValid(next, clean),
    });
  };

  return (
    <div className={cn("flex w-full items-stretch gap-2", className)}>
      <select
        aria-label="Country dial code"
        disabled={disabled}
        value={optionKey(country)}
        onChange={(e) => {
          const next = options.find((c) => optionKey(c) === e.target.value) ?? DEFAULT_COUNTRY;
          emit(next, national);
        }}
        className={cn(
          "h-10 w-[7.5rem] shrink-0 rounded-md border bg-background px-2 text-sm text-foreground",
          error ? "border-destructive/60" : "border-input",
        )}
      >
        {options.map((c) => (
          <option key={optionKey(c)} value={optionKey(c)}>
            {c.iso2} {c.dial}
          </option>
        ))}
      </select>
      <input
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        disabled={disabled}
        value={national}
        onChange={(e) => emit(country, e.target.value)}
        placeholder={placeholder || "Phone number"}
        className={cn(
          "h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none",
          error ? "border-destructive/60" : "border-input",
          inputClassName,
        )}
      />
    </div>
  );
}
