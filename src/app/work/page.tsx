import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  FilePlus2,
  Filter,
  Search,
  Settings,
  Sparkles,
  Star,
} from "lucide-react";
import { getPublishedWorkProjects, type WorkProject } from "@/lib/cms/work";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "Explore WebImpact Lab case studies, websites, SaaS platforms, dashboards, and business systems built for real growth.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work & Case Studies | WebImpact Lab",
    description:
      "Real websites, SaaS platforms, dashboards, and business systems built for serious businesses.",
    url: "https://webimpactlab.com/work",
    type: "website",
  },
};

type SearchParams = Promise<{
  type?: string;
  visible?: string;
}>;

const PAGE_SIZE = 10;

function slugifyType(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getVisibleCount(value?: string) {
  const count = Number(value);
  if (!Number.isFinite(count)) return PAGE_SIZE;
  return Math.max(PAGE_SIZE, Math.ceil(count / PAGE_SIZE) * PAGE_SIZE);
}

function getVisibleFilters(projects: WorkProject[]) {
  const uniqueTypes = new Map<string, string>();

  projects.forEach((project) => {
    const label = project.project_type.trim();
    const value = slugifyType(label);

    if (label && value && !uniqueTypes.has(value)) {
      uniqueTypes.set(value, label);
    }
  });

  return [
    { value: "all", label: "All work" },
    ...Array.from(uniqueTypes.entries()).map(([value, label]) => ({
      value,
      label,
    })),
  ];
}

function projectMatchesType(project: WorkProject, selectedType: string) {
  if (selectedType === "all") return true;
  return slugifyType(project.project_type) === selectedType;
}

function getLoadMoreHref({
  selectedType,
  nextVisibleCount,
}: {
  selectedType: string;
  nextVisibleCount: number;
}) {
  const params = new URLSearchParams();

  if (selectedType !== "all") {
    params.set("type", selectedType);
  }

  params.set("visible", String(nextVisibleCount));

  return `/work?${params.toString()}`;
}

export default async function WorkPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const projects = await getPublishedWorkProjects();

  const visibleFilters = getVisibleFilters(projects);
  const requestedType = params.type || "all";
  const selectedType = visibleFilters.some((item) => item.value === requestedType)
    ? requestedType
    : "all";

  const filteredProjects = projects.filter((project) =>
    projectMatchesType(project, selectedType),
  );

  const visibleCount = getVisibleCount(params.visible);
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = filteredProjects.length > visibleProjects.length;
  const nextVisibleCount = visibleCount + PAGE_SIZE;

  const featuredProject =
    visibleProjects.find((project) => project.is_featured) ?? null;

  const desktopOtherProjects = featuredProject
    ? visibleProjects.filter((project) => project.id !== featuredProject.id)
    : visibleProjects;

  const activeFilterLabel =
    visibleFilters.find((item) => item.value === selectedType)?.label ||
    "All work";

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin =
    user?.email?.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();

  return (
    <main className="overflow-x-hidden bg-white dark:bg-[#070707]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "WebImpact Lab Work and Case Studies",
          url: "https://webimpactlab.com/work",
          description:
            "Case studies and work examples from WebImpact Lab, a software development company in Rwanda.",
        }}
      />

      <section className="px-3 pb-10 pt-6 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[15px] border-y border-black/10 border-l-2 border-r-2 border-l-[#fd5b38] border-r-[#fd5b38] bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-y-white/10 dark:bg-[#111111] sm:rounded-[15px]">
            <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-[28rem] w-[28rem] rounded-full bg-black/[0.05] blur-3xl dark:bg-white/10" />

            <div className="relative grid gap-6 p-4 sm:p-8 lg:grid-cols-[1.02fr_0.98fr] lg:p-12 xl:p-16">
              <div>
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#fd5b38]/20 bg-[#fd5b38]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#fd5b38] sm:text-xs sm:tracking-[0.22em]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#fd5b38]" />
                  <span className="truncate">Work and case studies</span>
                </div>

                <h1 className="mt-5 max-w-4xl text-[clamp(2.25rem,10vw,4.65rem)] font-semibold leading-[0.92] tracking-[-0.075em] text-black dark:text-white">
                  Proof that the work solves real business problems.
                </h1>

                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62 sm:text-base">
                  Explore websites, SaaS platforms, dashboards, and business
                  systems built to help companies sell, track, operate, and grow
                  with more clarity.
                </p>

                <div className="mt-7 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:flex-wrap">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b] sm:px-6 sm:py-4"
                  >
                    Start a project
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black transition group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white sm:px-6 sm:py-4"
                  >
                    View services
                  </Link>

                  {isAdmin ? (
                    <Link
                      href="/admin/work/new"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#fd5b38]/25 bg-[#fd5b38]/10 px-5 py-3 text-sm font-black text-[#fd5b38] transition hover:-translate-y-0.5 hover:bg-[#fd5b38] hover:text-white sm:px-6 sm:py-4"
                    >
                      <FilePlus2 className="h-4 w-4" />
                      Add project
                    </Link>
                  ) : null}
                </div>

                <div className="mt-8 grid gap-3 border-t border-black/10 pt-6 dark:border-white/10 sm:grid-cols-3">
                  {["Business proof", "Clear systems", "Real outcomes"].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.04]"
                      >
                        <CheckCircle2 className="h-5 w-5 text-[#fd5b38]" />
                        <p className="mt-3 text-sm font-black text-black dark:text-white">
                          {item}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[15px]  border border-black/10 bg-white p-4 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#070707] sm:rounded-[2.35rem] sm:p-5">
                <div className="pointer-events-none absolute right-[-90px] top-[-90px] h-64 w-64 rounded-full bg-[#fd5b38]/15 blur-3xl" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#fd5b38]/20 bg-[#fd5b38]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#fd5b38]">
                        <Filter className="h-3.5 w-3.5" />
                        Browse proof
                      </div>

                      <h2 className="mt-4 text-[clamp(1.45rem,4vw,2.25rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                        Find the kind of system you want to build.
                      </h2>

                      <p className="mt-3 max-w-xl text-sm leading-6 text-black/55 dark:text-white/55">
                        Filter by project type and study the work that matches
                        your business problem.
                      </p>
                    </div>

                    <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#fd5b38] text-white shadow-lg shadow-[#fd5b38]/20 sm:grid">
                      <Sparkles className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-5 rounded-[1.6rem] border border-black/10 bg-black/[0.025] p-3 dark:border-white/10 dark:bg-white/[0.04]">
                    <div className="flex items-center justify-between gap-3 rounded-[1.25rem] bg-white p-3 dark:bg-[#0b0b0b]">
                      <div className="min-w-0">
                        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-black/35 dark:text-white/35">
                          Active category
                        </p>
                        <p className="mt-1 truncate text-sm font-black text-black dark:text-white">
                          {activeFilterLabel}
                        </p>
                      </div>

                      <div className="shrink-0 rounded-full bg-[#fd5b38] px-3 py-1.5 text-xs font-black text-white">
                        {filteredProjects.length}{" "}
                        {filteredProjects.length === 1 ? "item" : "items"}
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-2 min-[390px]:grid-cols-2 sm:flex sm:flex-wrap">
                      {visibleFilters.map((filter) => {
                        const active = selectedType === filter.value;
                        const href =
                          filter.value === "all"
                            ? "/work"
                            : `/work?type=${filter.value}`;

                        return (
                          <Link
                            key={filter.value}
                            href={href}
                            className={
                              active
                                ? "inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-[#fd5b38]/20 sm:w-auto"
                                : "inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-black/60 transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60 sm:w-auto"
                            }
                          >
                            {active ? (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            ) : null}
                            {filter.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-black/10 bg-black/[0.025] p-4 dark:border-white/10 dark:bg-white/[0.04]">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#fd5b38]">
                        Auto-generated
                      </p>
                      <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">
                        New project types become filters automatically.
                      </p>
                    </div>

                    <div className="rounded-[1.5rem] border border-black/10 bg-black/[0.025] p-4 dark:border-white/10 dark:bg-white/[0.04]">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#fd5b38]">
                        Buyer-focused
                      </p>
                      <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">
                        Each case study helps prove capability before contact.
                      </p>
                    </div>
                  </div>

                  {isAdmin ? (
                    <Link
                      href="/admin/work"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-black text-white transition hover:bg-[#fd5b38] dark:bg-white dark:text-black dark:hover:bg-[#fd5b38] dark:hover:text-white"
                    >
                      <Settings className="h-4 w-4" />
                      Open work manager
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="relative border-t border-black/10 px-5 py-4 text-sm font-semibold text-black/55 dark:border-white/10 dark:text-white/55 sm:px-8 lg:px-12">
              Real problems → Clear systems → Better trust → Stronger buyers
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 py-10 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {filteredProjects.length === 0 ? (
            <EmptyState isAdmin={isAdmin} />
          ) : (
            <div className="grid gap-10">
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:hidden">
                {visibleProjects.map((project) => (
                  <CompactWorkCard key={project.id} project={project} />
                ))}
              </div>

              {featuredProject ? (
                <div className="hidden lg:block">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                    Featured case study
                  </p>

                  <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                    The project that should sell trust fastest.
                  </h2>

                  <div className="mt-10">
                    <FeaturedWorkCard project={featuredProject} />
                  </div>

                  {desktopOtherProjects.length > 0 ? (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {desktopOtherProjects.map((project) => (
                        <CompactWorkCard key={project.id} project={project} />
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="hidden gap-5 lg:grid sm:grid-cols-2 xl:grid-cols-3">
                  {visibleProjects.map((project) => (
                    <CompactWorkCard key={project.id} project={project} />
                  ))}
                </div>
              )}

              <div className="flex flex-col items-center gap-4 border-t border-black/10 pt-8 dark:border-white/10">
                <p className="text-sm font-bold text-black/50 dark:text-white/50">
                  Showing {visibleProjects.length} of {filteredProjects.length}{" "}
                  {filteredProjects.length === 1 ? "project" : "projects"}
                </p>

                {hasMoreProjects ? (
                  <Link
                    href={getLoadMoreHref({
                      selectedType,
                      nextVisibleCount,
                    })}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-black px-6 py-4 text-sm font-black text-white shadow-xl shadow-black/[0.08] transition hover:-translate-y-0.5 hover:bg-[#fd5b38] dark:border-white/10 dark:bg-white dark:text-black dark:hover:bg-[#fd5b38] dark:hover:text-white"
                  >
                    Load 10 more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function EmptyState({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="rounded-[15px]  border border-black/10 bg-[#f7f7f7] p-8 text-center dark:border-white/10 dark:bg-[#111111] sm:rounded-[2.5rem] sm:p-12">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fd5b38] text-white">
        <Search className="h-6 w-6" />
      </div>

      <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,7vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
        No projects found.
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-black/60 dark:text-white/60">
        Try another category or check back later.
      </p>

      {isAdmin ? (
        <Link
          href="/admin/work/new"
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
        >
          Add project
          <FilePlus2 className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}

function FeaturedWorkCard({ project }: { project: WorkProject }) {
  return (
    <article className="group overflow-hidden rounded-[15px] border border-black/10 bg-white shadow-2xl shadow-black/[0.06] transition duration-500 hover:-translate-y-1 hover:shadow-black/[0.12] dark:border-white/10 dark:bg-[#111111]">
      <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
        <WorkImage project={project} className="h-full min-h-[520px]" priority />

        <div className="flex flex-col justify-between p-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fd5b38] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                <Star className="h-3.5 w-3.5" />
                Featured
              </span>

              <span className="inline-flex rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
                {project.project_type}
              </span>
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#fd5b38]">
              {project.client_name || "Featured work"}
            </p>

            <h3 className="mt-3 text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
              {project.title}
            </h3>

            <p className="mt-4 text-[15px] leading-7 text-black/62 dark:text-white/62">
              {project.summary}
            </p>

            <div className="mt-6 grid gap-4">
              <MiniProofBlock label="Problem" text={project.problem} />
              <MiniProofBlock label="Result" text={project.result} accent />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 xl:flex-row">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/20 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
            >
              View case study
              <ArrowRight className="h-4 w-4" />
            </Link>

            {project.live_url ? (
              <Link
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
              >
                Visit project
                <ExternalLink className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function MiniProofBlock({
  label,
  text,
  accent = false,
}: {
  label: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-[1.5rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-4"
          : "rounded-[1.5rem] border border-black/10 bg-black/[0.025] p-4 dark:border-white/10 dark:bg-white/[0.04]"
      }
    >
      <p
        className={
          accent
            ? "text-sm font-black text-[#fd5b38]"
            : "text-sm font-black text-black dark:text-white"
        }
      >
        {label}
      </p>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-black/60 dark:text-white/60">
        {text}
      </p>
    </div>
  );
}

function CompactWorkCard({ project }: { project: WorkProject }) {
  return (
    <article className="group overflow-hidden rounded-[15px]  border border-black/10 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#111111]">
      <WorkImage project={project} className="h-[250px]" />

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          {project.is_featured ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fd5b38] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-white">
              <Star className="h-3.5 w-3.5" />
              Featured
            </span>
          ) : null}

          <span className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
            {project.project_type}
          </span>
        </div>

        <h3 className="mt-5 line-clamp-2 text-2xl font-semibold leading-tight tracking-[-0.045em] text-black dark:text-white">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/60 dark:text-white/60">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition group-hover:gap-3"
          >
            View case study
            <ArrowRight className="h-4 w-4" />
          </Link>

          {project.live_url ? (
            <Link
              href={project.live_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-black text-black/70 transition hover:text-[#fd5b38] dark:text-white/70"
            >
              Visit
              <ExternalLink className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function WorkImage({
  project,
  className,
  priority = false,
}: {
  project: WorkProject;
  className: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`View ${project.title} case study`}
      className={`relative block overflow-hidden bg-black ${className}`}
    >
      {project.cover_image_url ? (
        <div className="absolute inset-0 transition-transform duration-[9000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.cover_image_url}
            alt={`${project.title} case study preview`}
            className="h-full w-full object-cover object-top"
            loading={priority ? "eager" : "lazy"}
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#111111]">
          <BriefcaseBusiness className="h-16 w-16 text-white/20" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/72 via-black/12 to-transparent" />

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-white">
        <p className="truncate text-xs font-black uppercase tracking-[0.16em] text-white/70">
          {project.project_type}
        </p>

        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fd5b38] text-white opacity-0 shadow-lg shadow-[#fd5b38]/20 transition group-hover:opacity-100">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}