import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Globe2,
  Layers3,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type SeoPageRow = {
  id: string;
  title: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  hero_title: string | null;
  is_published: boolean | null;
  keywords: string[] | null;
  updated_at: string | null;
  created_at: string | null;
};

function formatDate(value: string | null) {
  if (!value) return "No date";

  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "No date";
  }
}

function getSeoScore(page: SeoPageRow) {
  let score = 0;

  if (page.title?.length >= 20) score += 15;
  if (page.slug?.length >= 15) score += 15;
  if ((page.meta_title || "").length >= 35) score += 20;
  if ((page.meta_description || "").length >= 120) score += 25;
  if ((page.keywords || []).length >= 4) score += 15;
  if (page.is_published) score += 10;

  return Math.min(score, 100);
}

export default async function SeoPagesAdminPage() {
  const { data, error } = await supabaseAdmin
    .from("seo_pages")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const pages = (data || []) as SeoPageRow[];
  const publishedCount = pages.filter((page) => page.is_published).length;
  const draftCount = pages.length - publishedCount;
  const averageScore =
    pages.length > 0
      ? Math.round(
          pages.reduce((total, page) => total + getSeoScore(page), 0) /
            pages.length,
        )
      : 0;

  const stats = [
    {
      label: "Total pages",
      value: pages.length,
      note: "SEO assets created",
      icon: Layers3,
    },
    {
      label: "Published",
      value: publishedCount,
      note: "Visible to visitors",
      icon: Globe2,
    },
    {
      label: "Drafts",
      value: draftCount,
      note: "Still being prepared",
      icon: Clock3,
    },
    {
      label: "Average score",
      value: `${averageScore}%`,
      note: "Content completeness",
      icon: Sparkles,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f6f7] px-4 py-6 dark:bg-[#070707] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-white shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
          <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[28rem] w-[28rem] rounded-full bg-[#fd5b38]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-220px] left-[-160px] h-[32rem] w-[32rem] rounded-full bg-black/[0.04] blur-3xl dark:bg-white/[0.07]" />

          <div className="relative border-b border-black/10 p-6 dark:border-white/10 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#fd5b38]/20 bg-[#fd5b38]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
                  <ShieldCheck className="h-4 w-4" />
                  Programmatic SEO engine
                </div>

                <h1 className="mt-5 max-w-4xl text-[clamp(2.25rem,5.6vw,4.4rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-black dark:text-white">
                  Build search pages that turn buyer intent into qualified
                  project conversations.
                </h1>

                <p className="mt-6 max-w-2xl text-[15px] leading-7 text-black/60 dark:text-white/60 sm:text-base">
                  Create focused landing pages for services, industries, cities,
                  software problems, dashboards, SaaS platforms, and automation
                  use cases — without touching code.
                </p>
              </div>

              <Link
                href="/admin/seo-pages/new"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
              >
                <Plus className="h-4 w-4" />
                Create SEO page
              </Link>
            </div>
          </div>

          <div className="relative grid gap-4 border-b border-black/10 p-4 dark:border-white/10 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-[1.75rem] border border-black/10 bg-black/[0.025] p-5 dark:border-white/10 dark:bg-white/[0.035]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#fd5b38] text-white shadow-lg shadow-[#fd5b38]/20">
                      <Icon className="h-5 w-5" />
                    </div>

                    <p className="text-3xl font-semibold tracking-[-0.055em] text-black dark:text-white">
                      {item.value}
                    </p>
                  </div>

                  <p className="mt-5 text-sm font-black text-black dark:text-white">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-black/50 dark:text-white/50">
                    {item.note}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="relative border-b border-black/10 p-4 dark:border-white/10 sm:p-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35 dark:text-white/35" />

                <input
                  type="text"
                  placeholder="Search pages later..."
                  disabled
                  className="h-12 w-full rounded-2xl border border-black/10 bg-black/[0.025] pl-11 pr-4 text-sm font-bold text-black/55 outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55"
                />
              </div>

              <p className="text-sm font-semibold text-black/50 dark:text-white/50">
                Next: add search, filters, page clusters, and bulk generation.
              </p>
            </div>
          </div>

          <div className="relative p-4 sm:p-6">
            {pages.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-black/15 bg-black/[0.02] px-6 py-16 text-center dark:border-white/15 dark:bg-white/[0.03]">
                <div className="grid h-16 w-16 place-items-center rounded-3xl bg-[#fd5b38] text-white shadow-lg shadow-[#fd5b38]/20">
                  <FileText className="h-7 w-7" />
                </div>

                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-black dark:text-white">
                  No SEO pages yet
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-7 text-black/60 dark:text-white/60">
                  Start with one strong buyer-intent page, then expand into
                  service, location, industry, and problem-specific pages.
                </p>

                <Link
                  href="/admin/seo-pages/new"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/20 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                >
                  Create first page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {pages.map((page) => {
                  const score = getSeoScore(page);
                  const keywords = page.keywords || [];

                  return (
                    <article
                      key={page.id}
                      className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#fafafa] transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.06] dark:border-white/10 dark:bg-[#0b0b0b]"
                    >
                      <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-72 w-72 rounded-full bg-[#fd5b38]/0 blur-3xl transition duration-500 group-hover:bg-[#fd5b38]/15" />

                      <div className="relative flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={
                                page.is_published
                                  ? "inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-emerald-600"
                                  : "inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-amber-600"
                              }
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {page.is_published ? "Published" : "Draft"}
                            </span>

                            <span className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-black/45 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/45">
                              /{page.slug}
                            </span>

                            <span className="rounded-full border border-[#fd5b38]/20 bg-[#fd5b38]/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#fd5b38]">
                              SEO {score}%
                            </span>
                          </div>

                          <h2 className="mt-5 max-w-4xl text-[clamp(1.55rem,3vw,2.15rem)] font-semibold leading-[1.03] tracking-[-0.05em] text-black dark:text-white">
                            {page.title}
                          </h2>

                          <p className="mt-4 max-w-3xl text-sm leading-7 text-black/60 dark:text-white/60">
                            {page.meta_description || "No meta description yet."}
                          </p>

                          <div className="mt-5 flex flex-wrap gap-2">
                            {keywords.slice(0, 6).map((keyword) => (
                              <span
                                key={keyword}
                                className="rounded-full border border-black/10 bg-black/[0.025] px-3 py-1.5 text-xs font-bold text-black/50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/50"
                              >
                                {keyword}
                              </span>
                            ))}

                            {keywords.length === 0 ? (
                              <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-500">
                                Missing keywords
                              </span>
                            ) : null}
                          </div>

                          <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-black/45 dark:text-white/45">
                            <span>Updated {formatDate(page.updated_at)}</span>
                            <span>•</span>
                            <span>
                              Search title:{" "}
                              {(page.meta_title || "").length || 0} chars
                            </span>
                            <span>•</span>
                            <span>
                              Description:{" "}
                              {(page.meta_description || "").length || 0} chars
                            </span>
                          </div>
                        </div>

                        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                          <Link
                            href={`/${page.slug}`}
                            target="_blank"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                          >
                            View page
                          </Link>

                          <Link
                            href={`/admin/seo-pages/${page.id}/edit`}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/20 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                          >
                            Edit page
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}