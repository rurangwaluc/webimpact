import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Globe2,
  Lightbulb,
  Save,
  SearchCheck,
  Trash2,
} from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { SeoSubmitButton } from "@/components/admin/seo-submit-button";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

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

function faqToText(faq: unknown) {
  if (!Array.isArray(faq)) return "";

  return faq
    .map((item) => {
      if (
        item &&
        typeof item === "object" &&
        "question" in item &&
        "answer" in item
      ) {
        return `${String(item.question)} | ${String(item.answer)}`;
      }

      return "";
    })
    .filter(Boolean)
    .join("\n");
}

function getSeoScore(page: {
  title?: string | null;
  slug?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  keywords?: string[] | null;
  is_published?: boolean | null;
}) {
  let score = 0;

  if ((page.title || "").length >= 20) score += 15;
  if ((page.slug || "").length >= 15) score += 15;
  if ((page.meta_title || "").length >= 35) score += 20;
  if ((page.meta_description || "").length >= 120) score += 25;
  if ((page.keywords || []).length >= 4) score += 15;
  if (page.is_published) score += 10;

  return Math.min(score, 100);
}

export default async function EditSeoPage({ params }: PageProps) {
  const { id } = await params;

  const { data: page, error } = await supabaseAdmin
    .from("seo_pages")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !page) {
    notFound();
  }

  async function updateSeoPage(formData: FormData) {
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

    const { error: updateError } = await supabaseAdmin
      .from("seo_pages")
      .update({
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
      })
      .eq("id", id);

    if (updateError) {
      throw new Error(updateError.message);
    }

    revalidatePath("/admin/seo-pages");
    revalidatePath(`/${slug}`);
    redirect("/admin/seo-pages");
  }

  async function deleteSeoPage() {
    "use server";

    const { error: deleteError } = await supabaseAdmin
      .from("seo_pages")
      .delete()
      .eq("id", id);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    revalidatePath("/admin/seo-pages");
    revalidatePath(`/${page.slug}`);
    redirect("/admin/seo-pages");
  }

  const score = getSeoScore(page);

  return (
    <main className="min-h-screen bg-[#f6f6f7] px-4 py-6 dark:bg-[#070707] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/admin/seo-pages"
            className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38]"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to SEO pages
          </Link>

          <Link
            href={`/${page.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm font-black text-black transition hover:text-[#fd5b38] dark:text-white"
          >
            View live page
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.42fr]">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-white p-6 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8">
            <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/18 blur-3xl" />

            <div className="relative">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#fd5b38]/20 bg-[#fd5b38]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
                    <SearchCheck className="h-4 w-4" />
                    Edit search asset
                  </div>

                  <h1 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.65rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-black dark:text-white">
                    {page.title}
                  </h1>

                  <p className="mt-4 text-sm font-semibold text-black/50 dark:text-white/50">
                    /{page.slug}
                  </p>
                </div>

                <form action={deleteSeoPage}>
                  <SeoSubmitButton pendingText="Deleting..." variant="danger">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </SeoSubmitButton>
                </form>
              </div>

              <form action={updateSeoPage} className="mt-8 grid gap-5">
                <div className="grid gap-5 md:grid-cols-[1fr_0.78fr]">
                  <Input
                    name="title"
                    label="Internal title"
                    defaultValue={page.title}
                    required
                  />
                  <Input
                    name="slug"
                    label="Slug"
                    defaultValue={page.slug}
                    required
                  />
                </div>

                <div className="rounded-[2rem] border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03] sm:p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                      <Globe2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-black dark:text-white">
                        Search result content
                      </p>
                      <p className="text-xs font-semibold text-black/45 dark:text-white/45">
                        Tighten the title and description before publishing.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Input
                      name="meta_title"
                      label="Meta title"
                      defaultValue={page.meta_title}
                      required
                    />
                    <Input
                      name="hero_badge"
                      label="Hero badge"
                      defaultValue={page.hero_badge || ""}
                    />
                  </div>

                  <div className="mt-5">
                    <Textarea
                      name="meta_description"
                      label="Meta description"
                      defaultValue={page.meta_description}
                      required
                      rows={3}
                    />
                  </div>
                </div>

                <Input
                  name="hero_title"
                  label="Hero title"
                  defaultValue={page.hero_title}
                  required
                />

                <Textarea
                  name="hero_description"
                  label="Hero description"
                  defaultValue={page.hero_description}
                  required
                  rows={4}
                />

                <Input
                  name="section_title"
                  label="Main section title"
                  defaultValue={page.section_title || ""}
                />

                <Textarea
                  name="section_content"
                  label="Main section content"
                  defaultValue={page.section_content || ""}
                  rows={9}
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <Textarea
                    name="keywords"
                    label="Keywords"
                    defaultValue={(page.keywords || []).join(", ")}
                    rows={5}
                  />

                  <Textarea
                    name="faq"
                    label="FAQ"
                    defaultValue={faqToText(page.faq)}
                    rows={5}
                  />
                </div>

                <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-black/[0.025] p-4 text-sm font-black text-black dark:border-white/10 dark:bg-white/[0.04] dark:text-white">
                  <input
                    name="is_published"
                    type="checkbox"
                    defaultChecked={Boolean(page.is_published)}
                    className="h-5 w-5 accent-[#fd5b38]"
                  />
                  Published
                </label>

                <SeoSubmitButton pendingText="Saving changes...">
                  <Save className="h-4 w-4" />
                  Save changes
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
                  SEO quality score
                </h2>

                <div className="mt-5 rounded-[2rem] border border-black/10 bg-black/[0.025] p-5 dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-5xl font-semibold tracking-[-0.08em] text-black dark:text-white">
                      {score}%
                    </p>
                    <p className="pb-2 text-xs font-black uppercase tracking-[0.16em] text-[#fd5b38]">
                      Completeness
                    </p>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#fd5b38]"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 p-4">
                {[
                  "Meta title should feel clickable",
                  "Description should sell the outcome",
                  "Hero should mention business pain",
                  "Content should prove expertise",
                  "FAQ should match buyer objections",
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
                  Live URL
                </p>
                <Link
                  href={`/${page.slug}`}
                  target="_blank"
                  className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-black/[0.025] p-4 text-sm font-bold text-black/60 transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60"
                >
                  <span className="min-w-0 truncate">/{page.slug}</span>
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </Link>
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
  defaultValue,
  placeholder,
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: string;
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
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]"
      />
    </label>
  );
}

function Textarea({
  name,
  label,
  defaultValue,
  placeholder,
  rows = 5,
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: string;
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
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="resize-none rounded-[1.5rem] border border-black/10 bg-white px-4 py-3 text-sm font-bold leading-6 text-black outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]"
      />
    </label>
  );
}