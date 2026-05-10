import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Globe2,
  Layers3,
  Lightbulb,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { SeoSubmitButton } from "@/components/admin/seo-submit-button";

export const dynamic = "force-dynamic";

function getText(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseKeywords(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseFaq(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [question, ...answerParts] = line.split("|");

      return {
        question: question?.trim() || "",
        answer: answerParts.join("|").trim(),
      };
    })
    .filter((item) => item.question && item.answer);
}

export default function NewSeoPage() {
  async function createSeoPage(formData: FormData) {
    "use server";

    const title = getText(formData, "title");
    const rawSlug = getText(formData, "slug");
    const slug = slugify(rawSlug || title);

    const metaTitle = getText(formData, "meta_title");
    const metaDescription = getText(formData, "meta_description");
    const heroBadge = getText(formData, "hero_badge") || null;
    const heroTitle = getText(formData, "hero_title");
    const heroDescription = getText(formData, "hero_description");
    const sectionTitle = getText(formData, "section_title") || null;
    const sectionContent = getText(formData, "section_content") || null;
    const keywords = parseKeywords(getText(formData, "keywords"));
    const faq = parseFaq(getText(formData, "faq"));
    const isPublished = formData.get("is_published") === "on";

    if (
      !title ||
      !slug ||
      !metaTitle ||
      !metaDescription ||
      !heroTitle ||
      !heroDescription
    ) {
      throw new Error("Missing required SEO page fields.");
    }

    const { error } = await supabaseAdmin.from("seo_pages").insert({
      title,
      slug,
      meta_title: metaTitle,
      meta_description: metaDescription,
      hero_badge: heroBadge,
      hero_title: heroTitle,
      hero_description: heroDescription,
      section_title: sectionTitle,
      section_content: sectionContent,
      keywords,
      faq,
      is_published: isPublished,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/admin/seo-pages");
    revalidatePath(`/${slug}`);
    redirect("/admin/seo-pages");
  }

  return (
    <main className="min-h-screen bg-[#f6f6f7] px-4 py-6 dark:bg-[#070707] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin/seo-pages"
          className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38]"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to SEO pages
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.42fr]">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-white p-6 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8">
            <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/18 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#fd5b38]/20 bg-[#fd5b38]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
                <FileText className="h-4 w-4" />
                Create search asset
              </div>

              <h1 className="mt-5 max-w-3xl text-[clamp(2.15rem,5.4vw,4rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-black dark:text-white">
                New programmatic SEO page built to attract serious buyers.
              </h1>

              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-black/60 dark:text-white/60">
                Build pages around real buying intent: the service, location,
                business pain, expected outcome, and next action.
              </p>

              <form action={createSeoPage} className="mt-8 grid gap-5">
                <div className="grid gap-5 md:grid-cols-[1fr_0.78fr]">
                  <Input name="title" label="Internal title" required />
                  <Input
                    name="slug"
                    label="Slug"
                    placeholder="software-development-company-in-rwanda"
                  />
                </div>

                <div className="rounded-[2rem] border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03] sm:p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                      <SearchCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-black dark:text-white">
                        Search result preview content
                      </p>
                      <p className="text-xs font-semibold text-black/45 dark:text-white/45">
                        Keep this sharp. This is what buyers see before they
                        click.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Input name="meta_title" label="Meta title" required />
                    <Input
                      name="hero_badge"
                      label="Hero badge"
                      placeholder="Software Development Rwanda"
                    />
                  </div>

                  <div className="mt-5">
                    <Textarea
                      name="meta_description"
                      label="Meta description"
                      required
                      rows={3}
                    />
                  </div>
                </div>

                <div className="rounded-[2rem] border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03] sm:p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-black dark:text-white">
                        Page hero
                      </p>
                      <p className="text-xs font-semibold text-black/45 dark:text-white/45">
                        Lead with the business outcome, not generic service
                        language.
                      </p>
                    </div>
                  </div>

                  <Input name="hero_title" label="Hero title" required />

                  <div className="mt-5">
                    <Textarea
                      name="hero_description"
                      label="Hero description"
                      required
                      rows={4}
                    />
                  </div>
                </div>

                <div className="rounded-[2rem] border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03] sm:p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                      <Layers3 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-black dark:text-white">
                        Main conversion section
                      </p>
                      <p className="text-xs font-semibold text-black/45 dark:text-white/45">
                        Explain the pain, what you build, and why it matters.
                      </p>
                    </div>
                  </div>

                  <Input name="section_title" label="Main section title" />

                  <div className="mt-5">
                    <Textarea
                      name="section_content"
                      label="Main section content"
                      rows={9}
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Textarea
                    name="keywords"
                    label="Keywords"
                    placeholder="software development Rwanda, web development Kigali, SaaS development Africa"
                    rows={5}
                  />

                  <Textarea
                    name="faq"
                    label="FAQ"
                    placeholder={
                      "How much does software development cost in Rwanda? | It depends on scope, integrations, timeline, and business complexity.\nDo you build dashboards? | Yes, we build dashboards for visibility, sales, stock, cash, and operations."
                    }
                    rows={5}
                  />
                </div>

                <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-black/[0.025] p-4 text-sm font-black text-black dark:border-white/10 dark:bg-white/[0.04] dark:text-white">
                  <input
                    name="is_published"
                    type="checkbox"
                    className="h-5 w-5 accent-[#fd5b38]"
                  />
                  Publish immediately
                </label>

                <SeoSubmitButton pendingText="Creating SEO page...">
                  Create SEO page
                </SeoSubmitButton>
              </form>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-[2.5rem] border border-black/10 bg-white shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
              <div className="border-b border-black/10 p-6 dark:border-white/10">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white shadow-lg shadow-[#fd5b38]/20">
                  <Lightbulb className="h-5 w-5" />
                </div>

                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                  Strong SEO page checklist
                </h2>

                <p className="mt-3 text-sm leading-6 text-black/58 dark:text-white/58">
                  This page should feel like a serious business solution, not a
                  keyword-stuffed article.
                </p>
              </div>

              <div className="grid gap-3 p-4">
                {[
                  "Specific buyer intent",
                  "Clear local relevance",
                  "Operational business pain",
                  "Concrete service outcome",
                  "Keywords without stuffing",
                  "FAQ formatted as Question | Answer",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl border border-black/10 bg-black/[0.025] p-4 dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#fd5b38]" />
                    <p className="text-sm font-bold text-black/70 dark:text-white/70">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-black/10 p-6 dark:border-white/10">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fd5b38]">
                  URL example
                </p>
                <p className="mt-3 break-all rounded-2xl border border-black/10 bg-black/[0.025] p-4 text-sm font-bold text-black/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60">
                  /software-development-company-in-rwanda
                </p>

                <div className="mt-5 rounded-[1.5rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-5">
                  <div className="flex gap-3">
                    <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
                    <p className="text-sm font-semibold leading-6 text-black/70 dark:text-white/70">
                      Publish only when the page is useful enough for a buyer to
                      understand the problem, trust the offer, and take action.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Input({
  name,
  label,
  placeholder,
  required = false,
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-black dark:text-white">
        {label}
      </span>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]"
      />
    </label>
  );
}

function Textarea({
  name,
  label,
  placeholder,
  rows = 5,
  required = false,
}: {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-black dark:text-white">
        {label}
      </span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="resize-none rounded-[1.5rem] border border-black/10 bg-white px-4 py-3 text-sm font-bold leading-6 text-black outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]"
      />
    </label>
  );
}