import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Eye,
  FilePlus2,
  Filter,
  Home,
  Pencil,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { WorkFilterSelect } from "@/components/admin/work-filter-select";

type SearchParams = Promise<{
  status?: string;
  featured?: string;
  q?: string;
}>;

type WorkProject = {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  project_type: string;
  summary: string;
  status: "draft" | "published";
  is_featured: boolean;
  live_url: string | null;
  updated_at: string;
  created_at: string;
};

const statusOptions = [
  { label: "All status", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

const featuredOptions = [
  { label: "All visibility", value: "all" },
  { label: "Featured", value: "yes" },
  { label: "Not featured", value: "no" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getStatusLabel(value: string) {
  return statusOptions.find((item) => item.value === value)?.label ?? "All status";
}

function getFeaturedLabel(value: string) {
  return (
    featuredOptions.find((item) => item.value === value)?.label ??
    "All visibility"
  );
}

export default async function AdminWorkPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/admin/login");
  }

  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    throw new Error("Missing ADMIN_EMAIL in environment variables.");
  }

  if (user.email.toLowerCase() !== adminEmail.toLowerCase()) {
    redirect("/");
  }

  const status =
    params.status === "draft" || params.status === "published"
      ? params.status
      : "all";

  const featured =
    params.featured === "yes" || params.featured === "no"
      ? params.featured
      : "all";

  const q = params.q?.trim() || "";

  let query = supabaseAdmin
    .from("work_projects")
    .select(
      "id,title,slug,client_name,project_type,summary,status,is_featured,live_url,updated_at,created_at",
    )
    .order("updated_at", { ascending: false });

  if (status !== "all") {
    query = query.eq("status", status);
  }

  if (featured === "yes") {
    query = query.eq("is_featured", true);
  }

  if (featured === "no") {
    query = query.eq("is_featured", false);
  }

  if (q) {
    query = query.or(
      `title.ilike.%${q}%,client_name.ilike.%${q}%,project_type.ilike.%${q}%,summary.ilike.%${q}%`,
    );
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const projects = (data ?? []) as WorkProject[];

  const [
    { count: total },
    { count: published },
    { count: draft },
    { count: featuredCount },
  ] = await Promise.all([
    supabaseAdmin
      .from("work_projects")
      .select("id", { count: "exact", head: true }),
    supabaseAdmin
      .from("work_projects")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabaseAdmin
      .from("work_projects")
      .select("id", { count: "exact", head: true })
      .eq("status", "draft"),
    supabaseAdmin
      .from("work_projects")
      .select("id", { count: "exact", head: true })
      .eq("is_featured", true),
  ]);

  return (
    <main className="min-h-screen bg-white px-4 py-8 dark:bg-[#070707] sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
          <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-[28rem] w-[28rem] rounded-full bg-black/[0.05] blur-3xl dark:bg-white/10" />

          <div className="relative border-b border-black/10 p-6 dark:border-white/10 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition hover:gap-3"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  Back to admin
                </Link>

                <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  Work manager
                </p>

                <h1 className="mt-4 max-w-4xl text-[clamp(2.15rem,5.5vw,4.35rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-black dark:text-white">
                  Control the projects that prove you can build serious systems.
                </h1>

                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62 sm:text-base">
                  Add, review, edit, publish, and feature case studies. The best
                  projects should help serious buyers quickly understand what you
                  build, who it helps, and why it matters.
                </p>
              </div>

              <Link
                href="/admin/work/new"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
              >
                Add new project
                <FilePlus2 className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative grid gap-4 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:p-10">
            {[
              {
                label: "All projects",
                value: total ?? 0,
                icon: BriefcaseBusiness,
              },
              {
                label: "Published",
                value: published ?? 0,
                icon: Eye,
              },
              {
                label: "Drafts",
                value: draft ?? 0,
                icon: Clock3,
              },
              {
                label: "Featured",
                value: featuredCount ?? 0,
                icon: Star,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#070707]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <p className="text-3xl font-semibold tracking-[-0.05em] text-black dark:text-white">
                      {item.value}
                    </p>
                  </div>

                  <p className="mt-5 text-sm font-black text-black dark:text-white">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="relative border-t border-black/10 p-6 dark:border-white/10 sm:p-8 lg:p-10">
            <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#070707] sm:p-6">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#fd5b38]/20 bg-[#fd5b38]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#fd5b38]">
                    <Filter className="h-4 w-4" />
                    Filters
                  </div>

                  <p className="mt-3 text-sm font-semibold leading-6 text-black/55 dark:text-white/55">
                    Find projects by status, homepage visibility, or keyword.
                  </p>
                </div>

                <Link
                  href="/admin/work"
                  className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:text-white"
                >
                  Clear filters
                </Link>
              </div>

              <form className="grid gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
                <label className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35 dark:text-white/35" />
                  <input
                    name="q"
                    defaultValue={q}
                    placeholder="Search by title, client, type, or summary..."
                    className="w-full rounded-full border border-black/10 bg-black/[0.025] py-3.5 pl-11 pr-4 text-sm font-bold text-black/75 outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75 dark:placeholder:text-white/35 dark:focus:bg-white/[0.06]"
                  />
                </label>

               <WorkFilterSelect
                  filterKey="status"
                  value={status}
                  label={getStatusLabel(status)}
                  options={statusOptions}
                  status={status}
                  featured={featured}
                  q={q}
                />

                <WorkFilterSelect
                  filterKey="featured"
                  value={featured}
                  label={getFeaturedLabel(featured)}
                  options={featuredOptions}
                  status={status}
                  featured={featured}
                  q={q}
                />

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#fd5b38] dark:bg-white dark:text-black dark:hover:bg-[#fd5b38] dark:hover:text-white"
                >
                  Apply
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            <div className="mt-6">
              {projects.length === 0 ? (
                <div className="rounded-[2rem] border border-black/10 bg-white p-8 text-center dark:border-white/10 dark:bg-[#070707]">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                    <BriefcaseBusiness className="h-6 w-6" />
                  </div>

                  <h2 className="mt-6 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                    No projects found.
                  </h2>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/60 dark:text-white/60">
                    Add your first project or clear filters to see more work.
                    Your best case studies will later power the public Work page
                    and homepage section.
                  </p>

                  <Link
                    href="/admin/work/new"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                  >
                    Add first project
                    <FilePlus2 className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {projects.map((project) => (
                    <article
                      key={project.id}
                      className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#070707]"
                    >
                      <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
                        <div className="p-5 sm:p-6">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={
                                project.status === "published"
                                  ? "inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-black text-emerald-700 dark:text-emerald-300"
                                  : "inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-black text-amber-700 dark:text-amber-300"
                              }
                            >
                              {project.status === "published" ? (
                                <Eye className="h-3.5 w-3.5" />
                              ) : (
                                <Clock3 className="h-3.5 w-3.5" />
                              )}
                              {project.status === "published"
                                ? "Visible"
                                : "Draft"}
                            </span>

                            {project.is_featured ? (
                              <span className="inline-flex items-center gap-2 rounded-full border border-[#fd5b38]/20 bg-[#fd5b38]/10 px-3 py-1.5 text-xs font-black text-[#fd5b38]">
                                <Star className="h-3.5 w-3.5" />
                                Homepage
                              </span>
                            ) : null}

                            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs font-black text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
                              {project.project_type}
                            </span>
                          </div>

                          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                            {project.title}
                          </h2>

                          <p className="mt-2 text-sm font-semibold text-black/50 dark:text-white/50">
                            {project.client_name || "No client name"} • Updated{" "}
                            {formatDate(project.updated_at)}
                          </p>

                          <p className="mt-4 max-w-3xl text-sm leading-6 text-black/60 dark:text-white/60">
                            {project.summary}
                          </p>
                        </div>

                        <div className="flex flex-col justify-between gap-4 border-t border-black/10 p-5 dark:border-white/10 sm:p-6 lg:w-[280px] lg:border-l lg:border-t-0">
                          <div className="rounded-[1.5rem] border border-black/10 bg-black/[0.025] p-4 dark:border-white/10 dark:bg-white/[0.04]">
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fd5b38]">
                              Public slug
                            </p>
                            <p className="mt-2 break-all text-sm font-bold text-black/60 dark:text-white/60">
                              /work/{project.slug}
                            </p>
                          </div>

                          <div className="grid gap-2">
                            <Link
                              href={`/admin/work/${project.id}/edit`}
                              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/20 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                            >
                              Edit project
                              <Pencil className="h-4 w-4" />
                            </Link>

                            {project.status === "published" ? (
                              <Link
                                href={`/work/${project.slug}`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                              >
                                View public page
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            ) : null}

                            {project.live_url ? (
                              <Link
                                href={project.live_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-black text-black/70 transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:text-white/70"
                              >
                                Live project
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative border-t border-black/10 px-6 py-5 dark:border-white/10 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-3 text-sm font-semibold text-black/55 dark:text-white/55 md:flex-row md:items-center md:justify-between">
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#fd5b38]" />
                Admin links are only rendered after login and email check.
              </p>

              <Link
                href="/"
                className="inline-flex items-center gap-2 font-black text-black transition hover:text-[#fd5b38] dark:text-white"
              >
                <Home className="h-4 w-4" />
                Back to website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}



function buildFilterHref({
  status,
  featured,
  q,
}: {
  status: string;
  featured: string;
  q: string;
}) {
  const params = new URLSearchParams();

  if (q) params.set("q", q);
  if (status !== "all") params.set("status", status);
  if (featured !== "all") params.set("featured", featured);

  const query = params.toString();

  return query ? `/admin/work?${query}` : "/admin/work";
}