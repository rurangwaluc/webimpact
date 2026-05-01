"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  ImageIcon,
  Link2,
  Save,
  ShieldCheck,
  UploadCloud,
  X,
} from "lucide-react";
import { SubmitButton } from "@/components/ui/submit-button";

type WorkProjectFormProps = {
  action: (formData: FormData) => void | Promise<void>;
};

const inputClass =
  "w-full rounded-2xl border border-black/10 bg-black/[0.025] px-4 py-[0.95rem] text-sm font-bold text-black/78 outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/78 dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]";

const textareaClass =
  "min-h-[190px] w-full resize-none rounded-[1.75rem] border border-black/10 bg-black/[0.025] px-5 py-4 text-sm font-bold leading-7 text-black/78 outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/78 dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]";

export function WorkProjectForm({ action }: WorkProjectFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [status, setStatus] = useState("draft");
  const [featured, setFeatured] = useState("no");

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPreviewUrl("");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
  }

  function clearImage() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <form
      action={action}
      className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]"
    >
      <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/20 blur-3xl" />

      <div className="relative border-b border-black/10 p-6 dark:border-white/10 sm:p-8 lg:p-10">
        <Link
          href="/admin/work"
          className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition hover:gap-3"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to work manager
        </Link>

        <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
          Add project
        </p>

        <h1 className="mt-4 max-w-4xl text-[clamp(2.15rem,5.5vw,4.35rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-black dark:text-white">
          Add proof that makes serious buyers trust you.
        </h1>

        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62">
          Write this like a business story: what was broken, what was built, and
          why the result matters.
        </p>
      </div>

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.7fr_0.3fr] lg:p-10">
        <div className="grid gap-5">
          <SectionCard
            icon={BriefcaseBusiness}
            title="Project basics"
            text="Make the project easy to understand in a few seconds."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Project title" required>
                <input
                  name="title"
                  required
                  placeholder="Example: BCS"
                  className={inputClass}
                />
              </Field>

              <Field label="Public link name">
                <input
                  name="slug"
                  placeholder="example: bcs"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Client or brand name">
                <input
                  name="client_name"
                  placeholder="Example: Kigali Tech Store"
                  className={inputClass}
                />
              </Field>

              <Field label="Project type" required>
                <input
                  name="project_type"
                  required
                  placeholder="Example: Retail Control System"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Short summary" required>
              <textarea
                name="summary"
                required
                rows={4}
                placeholder="Explain the project in simple business language."
                className={textareaClass}
              />
            </Field>
          </SectionCard>

          <SectionCard
            icon={ShieldCheck}
            title="Case study story"
            text="This is the part that makes a buyer believe you can solve their problem."
          >
            <Field label="Problem" required>
              <textarea
                name="problem"
                required
                rows={5}
                placeholder="What was the business struggling with before the project?"
                className={textareaClass}
              />
            </Field>

            <Field label="What was built" required>
              <textarea
                name="solution"
                required
                rows={6}
                placeholder="What website, system, dashboard, or workflow was created?"
                className={textareaClass}
              />
            </Field>

            <Field label="Result" required>
              <textarea
                name="result"
                required
                rows={5}
                placeholder="What became clearer, faster, easier, safer, or more controlled?"
                className={textareaClass}
              />
            </Field>
          </SectionCard>

          <SectionCard
            icon={ImageIcon}
            title="Image and live link"
            text="Upload a strong image from your device. This is what visitors judge first."
          >
            <Field label="Project image">
              <div className="grid gap-4">
                <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-black/15 bg-black/[0.025] px-5 py-8 text-center transition hover:border-[#fd5b38]/50 hover:bg-[#fd5b38]/10 dark:border-white/15 dark:bg-white/[0.04] dark:hover:border-[#fd5b38]/50">
                  <UploadCloud className="h-8 w-8 text-[#fd5b38]" />
                  <span className="mt-4 text-sm font-black text-black dark:text-white">
                    Upload project image
                  </span>
                  <span className="mt-2 max-w-sm text-xs font-semibold leading-5 text-black/50 dark:text-white/50">
                    JPG, PNG, or WEBP. Use a full-page screenshot or strong
                    product preview. Max 5MB.
                  </span>
                  <input
                    ref={fileInputRef}
                    name="cover_image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>

                {previewUrl ? (
                  <div className="relative overflow-hidden rounded-[1.75rem] border border-black/10 bg-black dark:border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Selected project preview"
                      className="h-[340px] w-full object-cover object-top"
                    />

                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-xl transition hover:bg-[#fd5b38]"
                      aria-label="Remove selected image"
                    >
                      <X className="h-5 w-5" />
                    </button>

                    <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/60 p-4 text-white backdrop-blur-xl">
                      <p className="text-sm font-black">Image selected</p>
                      <p className="mt-1 text-xs font-semibold text-white/65">
                        This image will be uploaded when you save the project.
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </Field>

            <Field label="Live project URL">
              <input
                name="live_url"
                placeholder="https://example.com"
                className={inputClass}
              />
            </Field>
          </SectionCard>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2.25rem] border border-black/10 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-[#070707] sm:p-6">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
              <Save className="h-5 w-5" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
              Publish control
            </h2>

            <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
              Save as draft until the project is strong enough for serious
              buyers to see.
            </p>

            <div className="mt-6 grid gap-4">
              <Field label="Website visibility" required>
                <input type="hidden" name="status" value={status} />
                <PremiumSelect
                  value={status}
                  options={[
                    { value: "draft", label: "Draft - hidden" },
                    { value: "published", label: "Published - visible" },
                  ]}
                  onChange={setStatus}
                />
              </Field>

              <Field label="Show on homepage?">
                <input type="hidden" name="is_featured" value={featured} />
                <PremiumSelect
                  value={featured}
                  options={[
                    { value: "no", label: "No" },
                    { value: "yes", label: "Yes, feature it" },
                  ]}
                  onChange={setFeatured}
                />
              </Field>
            </div>

            <SubmitButton label="Save project" loadingLabel="Saving project..." />
              <ArrowRight className="h-4 w-4" />
            

            <div className="mt-6 rounded-[1.75rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-5">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
                <p className="text-sm font-bold leading-6 text-black/65 dark:text-white/65">
                  Publish only if a serious buyer would read it and think: “I
                  need this.”
                </p>
              </div>
            </div>

            <Link
              href="/work"
              className="mt-5 inline-flex items-center gap-2 text-sm font-black text-black transition hover:text-[#fd5b38] dark:text-white"
            >
              <Link2 className="h-4 w-4" />
              View public Work page
            </Link>
          </div>
        </aside>
      </div>
    </form>
  );
}

function PremiumSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const activeOption = options.find((option) => option.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        onBlur={(event) => {
          if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
            setOpen(false);
          }
        }}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-black/10 bg-black/[0.025] px-4 py-[0.95rem] text-left text-sm font-black text-black/78 outline-none transition hover:border-[#fd5b38]/40 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/78 dark:hover:border-[#fd5b38]/40 dark:focus:bg-white/[0.06]"
      >
        <span>{activeOption?.label}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-black/45 transition dark:text-white/45 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.55rem)] z-50 overflow-hidden rounded-2xl border border-black/10 bg-white p-1.5 shadow-2xl shadow-black/15 dark:border-white/10 dark:bg-[#151515]">
          {options.map((option) => {
            const isActive = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={
                  isActive
                    ? "flex w-full items-center justify-between rounded-xl bg-[#fd5b38] px-3.5 py-3 text-left text-sm font-black text-white"
                    : "flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm font-bold text-black/70 transition hover:bg-black/[0.04] hover:text-black dark:text-white/70 dark:hover:bg-white/[0.06] dark:hover:text-white"
                }
              >
                {option.label}
                {isActive ? <CheckCircle2 className="h-4 w-4" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  text,
  children,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2.25rem] border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#070707] sm:p-6">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#fd5b38] text-white">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">
            {text}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4">{children}</div>
    </section>
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
    <div className="grid gap-2">
      <span className="text-sm font-black text-black dark:text-white">
        {label}
        {required ? <span className="text-[#fd5b38]"> *</span> : null}
      </span>
      {children}
    </div>
  );
}