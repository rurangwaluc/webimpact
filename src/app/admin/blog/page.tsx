import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BookOpenText,
  Clock3,
  Eye,
  FilePlus2,
  Home,
  Pencil,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAllBlogPostsForAdmin, type BlogPost } from "@/lib/cms/blog";

function formatDate(value: string | null) {
  if (!value) return "Not published yet";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function AdminBlogPage() {
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

  const posts = await getAllBlogPostsForAdmin();

  const total = posts.length;
  const published = posts.filter((post) => post.status === "published").length;
  const draft = posts.filter((post) => post.status === "draft").length;
  const featured = posts.filter((post) => post.is_featured).length;

  return (
    <main className="min-h-screen bg-white px-4 py-8 dark:bg-[#070707] sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
          <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-[28rem] w-[28rem] rounded-full bg-black/[0.05] blur-3xl dark:bg-white/10" />

         <div className="relative border-b border-black/10 p-6 dark:border-white/10 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            
            {/* LEFT CONTENT */}
            <div>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition hover:gap-3"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to admin
              </Link>

              <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                Blog manager
              </p>

              <h1 className="mt-4 max-w-4xl text-[clamp(2.15rem,5.5vw,4.35rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-black dark:text-white">
                Publish content that brings serious buyers from search.
              </h1>

              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62 sm:text-base">
                Use blog posts to explain business problems, prove expertise,
                support programmatic SEO pages, and turn search traffic into
                leads.
              </p>
            </div>

            {/* RIGHT SIDE BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 lg:flex-nowrap">
              
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
              >
                Add new post
                <FilePlus2 className="h-4 w-4" />
              </Link>

              <Link
                href="/admin/blog/comments"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-black/10 px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:text-white"
              >
                Moderate comments
              </Link>

            </div>
          </div>
        </div>

          <div className="relative grid gap-4 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:p-10">
            {[
              {
                label: "All posts",
                value: total,
                icon: BookOpenText,
              },
              {
                label: "Published",
                value: published,
                icon: Eye,
              },
              {
                label: "Drafts",
                value: draft,
                icon: Clock3,
              },
              {
                label: "Featured",
                value: featured,
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
            {posts.length === 0 ? (
              <EmptyBlogState />
            ) : (
              <div className="grid gap-4">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          <div className="relative border-t border-black/10 px-6 py-5 dark:border-white/10 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-3 text-sm font-semibold text-black/55 dark:text-white/55 md:flex-row md:items-center md:justify-between">
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#fd5b38]" />
                Blog posts build trust. Programmatic SEO brings reach. You need
                both.
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

function EmptyBlogState() {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white p-8 text-center dark:border-white/10 dark:bg-[#070707]">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fd5b38] text-white">
        <Search className="h-6 w-6" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
        No blog posts yet.
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/60 dark:text-white/60">
        Start with posts that answer buyer questions: cost, timelines, business
        systems, dashboards, automation, and website mistakes.
      </p>

      <Link
        href="/admin/blog/new"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
      >
        Add first post
        <FilePlus2 className="h-4 w-4" />
      </Link>
    </div>
  );
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#070707]">
      <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={
                post.status === "published"
                  ? "inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-black text-emerald-700 dark:text-emerald-300"
                  : "inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-black text-amber-700 dark:text-amber-300"
              }
            >
              {post.status === "published" ? (
                <Eye className="h-3.5 w-3.5" />
              ) : (
                <Clock3 className="h-3.5 w-3.5" />
              )}
              {post.status === "published" ? "Visible" : "Draft"}
            </span>

            {post.is_featured ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-[#fd5b38]/20 bg-[#fd5b38]/10 px-3 py-1.5 text-xs font-black text-[#fd5b38]">
                <Star className="h-3.5 w-3.5" />
                Featured
              </span>
            ) : null}

            <span className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs font-black text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
              {post.category}
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
            {post.title}
          </h2>

          <p className="mt-2 text-sm font-semibold text-black/50 dark:text-white/50">
            {post.author_name} • {formatDate(post.published_at)}
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-black/60 dark:text-white/60">
            {post.excerpt}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-black/10 p-5 dark:border-white/10 sm:p-6 lg:w-[280px] lg:border-l lg:border-t-0">
          <div className="rounded-[1.5rem] border border-black/10 bg-black/[0.025] p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fd5b38]">
              Public slug
            </p>
            <p className="mt-2 break-all text-sm font-bold text-black/60 dark:text-white/60">
              /blog/{post.slug}
            </p>
          </div>

          <div className="grid gap-2">
            <Link
              href={`/admin/blog/${post.id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/20 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
            >
              Edit post
              <Pencil className="h-4 w-4" />
            </Link>

            {post.status === "published" ? (
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
              >
                View public post
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}