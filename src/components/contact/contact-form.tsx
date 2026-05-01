"use client";

import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
} from "lucide-react";

const serviceOptions = [
  "Website",
  "Custom software",
  "Dashboard / business system",
  "SaaS platform",
  "AI / automation",
  "Not sure yet",
];

const budgetOptions = [
  "Not sure yet",
  "Under RWF 500,000",
  "RWF 500,000 - RWF 1,500,000",
  "RWF 1,500,000 - RWF 5,000,000",
  "RWF 5,000,000+",
];

const timelineOptions = [
  "Immediately",
  "This month",
  "1 - 3 months",
  "Just exploring",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  budget: string;
  timeline: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  budget: "Not sure yet",
  timeline: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      form.email.trim().includes("@") &&
      form.phone.trim().length >= 7 &&
      form.service.trim().length > 0 &&
      form.message.trim().length >= 10 &&
      form.timeline.trim().length > 0
    );
  }, [form]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus("idle");
    setError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setStatus("idle");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong.");
      }

      setForm(initialForm);
      setStatus("success");
    } catch (caughtError) {
      setStatus("error");
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2.25rem] border border-black/10 bg-white p-5 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-6 lg:p-8"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
          Free consultation
        </p>

        <h2 className="mt-4 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
          Tell us what you want to build or fix.
        </h2>

        <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
          Share the problem, the goal, and when you want to start. We will reply
          with the next clear step.
        </p>
      </div>

      <div className="mt-7 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" required>
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className="input-field"
            />
          </Field>

          <Field label="Work email" required>
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              className="input-field"
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone / WhatsApp" required>
            <input
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="+250 785 587 830"
              autoComplete="tel"
              className="input-field"
            />
          </Field>

          <Field label="What do you need?" required>
            <CustomSelect
              value={form.service}
              placeholder="Choose one"
              options={serviceOptions}
              onChange={(value) => updateField("service", value)}
            />
          </Field>
        </div>

        <Field label="What problem do you want to solve?" required>
          <textarea
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Example: We need a website that brings leads, or a system to track stock, cash, staff, and reports."
            rows={5}
            className="input-field resize-none"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Estimated budget">
            <CustomSelect
              value={form.budget}
              placeholder="Choose budget"
              options={budgetOptions}
              onChange={(value) => updateField("budget", value)}
            />
          </Field>

          <Field label="When do you want to start?" required>
            <CustomSelect
              value={form.timeline}
              placeholder="Choose one"
              options={timelineOptions}
              onChange={(value) => updateField("timeline", value)}
            />
          </Field>
        </div>
      </div>

      {status === "success" ? (
        <div className="mt-5 flex gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-bold leading-6 text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          Got it. We will review your request and get back to you soon.
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-bold leading-6 text-red-700 dark:text-red-300">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={!canSubmit || isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending request...
          </>
        ) : (
          <>
            Get a free audit
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="mt-4 text-xs font-semibold leading-5 text-black/45 dark:text-white/45">
        No pressure. We only reply with a clear next step if we believe we can
        help.
      </p>
    </form>
  );
}

function CustomSelect({
  value,
  placeholder,
  options,
  onChange,
}: {
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        onBlur={(event) => {
          if (!wrapperRef.current?.contains(event.relatedTarget as Node)) {
            setOpen(false);
          }
        }}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-black/10 bg-black/[0.025] px-4 py-[0.95rem] text-left text-sm font-bold text-black/78 outline-none transition hover:border-[#fd5b38]/40 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/78 dark:hover:border-[#fd5b38]/40 dark:focus:bg-white/[0.06]"
      >
        <span className={value ? "" : "text-black/35 dark:text-white/35"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-black/45 transition dark:text-white/45 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl border border-black/10 bg-white p-1.5 shadow-2xl shadow-black/15 dark:border-white/10 dark:bg-[#151515]">
          {options.map((option) => {
            const active = option === value;

            return (
              <button
                key={option}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={
                  active
                    ? "flex w-full items-center justify-between rounded-xl bg-[#fd5b38] px-3.5 py-3 text-left text-sm font-black text-white"
                    : "flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm font-bold text-black/70 transition hover:bg-black/[0.04] hover:text-black dark:text-white/70 dark:hover:bg-white/[0.06] dark:hover:text-white"
                }
              >
                {option}
                {active ? <CheckCircle2 className="h-4 w-4" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-black dark:text-white">
        {label}
        {required ? <span className="text-[#fd5b38]"> *</span> : null}
      </span>
      {children}
    </label>
  );
}