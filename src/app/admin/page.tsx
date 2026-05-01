import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  BookOpenText,
  BriefcaseBusiness,
  CheckCircle2,
  FilePlus2,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

async function signOut() {
  "use server";

  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();

  redirect("/admin/login");
}

export default async function AdminDashboardPage() {
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

  const [
    { count: totalWork },
    { count: publishedWork },
    { count: featuredWork },
    { count: totalPosts },
    { count: publishedPosts },
    { count: featuredPosts },
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
      .eq("is_featured", true),
    supabaseAdmin
      .from("blog_posts")
      .select("id", { count: "exact", head: true }),
    supabaseAdmin
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabaseAdmin
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .eq("is_featured", true),
  ]);

  const stats = [
    {
      label: "Projects added",
      value: totalWork ?? 0,
      note: `${publishedWork ?? 0} visible on the website`,
      icon: BriefcaseBusiness,
    },
    {
      label: "Homepage projects",
      value: featuredWork ?? 0,
      note: "Selected to build trust fast",
      icon: BarChart3,
    },
    {
      label: "Articles added",
      value: totalPosts ?? 0,
      note: `${publishedPosts ?? 0} visible on the website`,
      icon: BookOpenText,
    },
    {
      label: "Featured articles",
      value: featuredPosts ?? 0,
      note: "Ready for blog and homepage sections",
      icon: LayoutDashboard,
    },
  ];

  const actions = [
    {
      title: "Manage projects",
      text: "Add, edit, publish, and choose the projects visitors see when they want proof that you can build serious systems.",
      href: "/admin/work",
      icon: BriefcaseBusiness,
      cta: "Open projects",
    },
    {
      title: "Add a new project",
      text: "Add a case study with the problem, what was built, the result, screenshots, and the live project link.",
      href: "/admin/work/new",
      icon: FilePlus2,
      cta: "Add project",
    },
    {
      title: "Manage articles",
      text: "Write and update helpful articles that explain your thinking, bring visitors from Google, and build authority.",
      href: "/admin/blog",
      icon: BookOpenText,
      cta: "Open articles",
    },
    {
      title: "Write a new article",
      text: "Create a new article, save it for later, publish it, and choose whether it should be featured.",
      href: "/admin/blog/new",
      icon: FilePlus2,
      cta: "Write article",
    },
  ];

  return (
    <main className="min-h-screen bg-white px-4 py-8 dark:bg-[#070707] sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
          <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-[28rem] w-[28rem] rounded-full bg-black/[0.05] blur-3xl dark:bg-white/10" />

          <div className="relative border-b border-black/10 p-6 dark:border-white/10 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  WebImpact Lab Admin
                </p>

                <h1 className="mt-4 max-w-4xl text-[clamp(2.15rem,5.5vw,4.35rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-black dark:text-white">
                  Control what visitors see before they contact you.
                </h1>

                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62 sm:text-base">
                  Add projects, publish articles, and choose what appears on the
                  website without touching code. This is where you manage the
                  proof that helps serious business owners trust WebImpact Lab.
                </p>
              </div>

              <form action={signOut}>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </form>
            </div>
          </div>

          <div className="relative grid gap-4 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:p-10">
            {stats.map((item) => {
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
                  <p className="mt-1 text-sm font-semibold text-black/50 dark:text-white/50">
                    {item.note}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="relative grid gap-6 border-t border-black/10 p-6 dark:border-white/10 sm:p-8 lg:grid-cols-[0.38fr_1fr] lg:p-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#fd5b38]/20 bg-[#fd5b38]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#fd5b38]">
                <ShieldCheck className="h-4 w-4" />
                Owner control
              </div>

              <h2 className="mt-5 max-w-md text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                Update your website without asking a developer.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-black/60 dark:text-white/60">
                Use this area to manage work, articles, and featured content.
                The goal is simple: keep your website fresh, useful, and strong
                enough to make buyers believe you can solve their problem.
              </p>

              <div className="mt-6 rounded-[1.75rem] border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex gap-3">
                  <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
                  <div>
                    <p className="text-sm font-black text-black dark:text-white">
                      Signed in as
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold text-black/55 dark:text-white/55">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {actions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#070707]"
                  >
                    <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-[#fd5b38]/0 blur-3xl transition group-hover:bg-[#fd5b38]/15" />

                    <div className="relative">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-black/[0.03] text-[#fd5b38] transition group-hover:bg-[#fd5b38] group-hover:text-white dark:border-white/10 dark:bg-white/[0.04]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="mt-8 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                        {action.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
                        {action.text}
                      </p>

                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition group-hover:gap-3">
                        {action.cta}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="relative border-t border-black/10 px-6 py-5 dark:border-white/10 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-3 text-sm font-semibold text-black/55 dark:text-white/55 md:flex-row md:items-center md:justify-between">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#fd5b38]" />
                Next goal: add projects from here and show the best ones on the
                homepage.
              </p>

              <Link
                href="/"
                className="inline-flex items-center gap-2 font-black text-black transition hover:text-[#fd5b38] dark:text-white"
              >
                Back to website
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}