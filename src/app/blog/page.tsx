import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Search,
  Star,
} from "lucide-react";
import { getPublishedBlogPosts } from "@/lib/cms/blog";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical software, web development, business systems, dashboards, automation, and SaaS insights for businesses in Rwanda and East Africa.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | WebImpact Lab",
    description:
      "Practical articles about software, websites, dashboards, business systems, automation, and SaaS development.",
    url: "https://webimpactlab.com/blog",
    type: "website",
  },
};

function formatDate(value: string | null) {
  if (!value) return "Recently updated";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  const featuredPost = posts.find((post) => post.is_featured) ?? null;

  const otherPosts = featuredPost
    ? posts.filter((post) => post.id !== featuredPost.id)
    : posts;

  return (
    <main className="bg-white dark:bg-[#070707]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "WebImpact Lab Blog",
          url: "https://webimpactlab.com/blog",
          description:
            "Software, web development, business systems, automation, dashboards, and SaaS insights for businesses.",
        }}
      />

      <section className="px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
            <div className="pointer-events-none absolute right-[-160px] top-[-160px] h-[30rem] w-[30rem] rounded-full bg-[#fd5b38]/25 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-[28rem] w-[28rem] rounded-full bg-black/[0.05] blur-3xl dark:bg-white/10" />

            <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-12 xl:p-16">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  WebImpact Lab blog
                </p>

                <h1 className="mt-4 max-w-4xl text-[clamp(2.2rem,6vw,4.75rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-black dark:text-white">
                  Practical ideas for businesses that want better systems.
                </h1>

                <p className="mt-6 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62 sm:text-base">
                  Read clear, business-first articles about websites, software,
                  dashboards, automation, SaaS platforms, and digital systems
                  built for growth and control.
                </p>

                <div className="mt-8 flex flex-col gap-3 min-[460px]:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                  >
                    Start a project
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/work"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                  >
                    View case studies
                  </Link>
                </div>
              </div>

              <div className="rounded-[2.25rem] border border-black/10 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-[#070707] sm:p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                  <BookOpenText className="h-5 w-5" />
                </div>

                <h2 className="mt-6 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                  What this blog is for
                </h2>

                <div className="mt-5 grid gap-3">
                  {[
                    "Help business owners understand what software can fix.",
                    "Explain website, system, dashboard, and automation decisions.",
                    "Support SEO pages with real helpful content.",
                    "Turn search visitors into serious project conversations.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-black/10 bg-black/[0.025] p-4 text-sm font-bold leading-6 text-black/65 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/65"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative border-t border-black/10 px-6 py-4 text-sm font-semibold text-black/55 dark:border-white/10 dark:text-white/55 sm:px-8 lg:px-12">
              Helpful content → Better trust → Better leads
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-12">
              {featuredPost ? (
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                    Featured article
                  </p>

                  <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                    Start with the post that matters most.
                  </h2>

                  <div className="mt-10">
                    <FeaturedBlogCard post={featuredPost} />
                  </div>
                </div>
              ) : null}

              {otherPosts.length > 0 ? (
                <div>
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                        Latest articles
                      </p>

                      <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                        Learn how better systems create better businesses.
                      </h2>
                    </div>

                    <p className="text-sm font-bold text-black/50 dark:text-white/50">
                      {otherPosts.length}{" "}
                      {otherPosts.length === 1 ? "article" : "articles"}
                    </p>
                  </div>

                  <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {otherPosts.map((post) => (
                      <CompactBlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-8 text-center dark:border-white/10 dark:bg-[#111111] sm:p-12">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fd5b38] text-white">
        <Search className="h-6 w-6" />
      </div>

      <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
        No published articles yet.
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-black/60 dark:text-white/60">
        New articles about software, websites, business systems, dashboards, and
        automation will appear here soon.
      </p>

      <Link
        href="/contact"
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
      >
        Start a project
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function FeaturedBlogCard({
  post,
}: {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    cover_image_url: string | null;
    category: string;
    author_name: string;
    published_at: string | null;
  };
}) {
  return (
    <article className="group overflow-hidden rounded-[2.5rem] border border-black/10 bg-white shadow-2xl shadow-black/[0.06] transition duration-500 hover:-translate-y-1 hover:shadow-black/[0.12] dark:border-white/10 dark:bg-[#111111]">
      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <BlogImage post={post} large />

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fd5b38] px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-white">
                <Star className="h-3.5 w-3.5" />
                Featured
              </span>

              <span className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
                {post.category}
              </span>
            </div>

            <h3 className="mt-5 text-[clamp(1.85rem,4.5vw,3rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-black dark:text-white">
              {post.title}
            </h3>

            <p className="mt-5 text-[15px] leading-7 text-black/60 dark:text-white/60">
              {post.excerpt}
            </p>

            <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-black/45 dark:text-white/45">
              <CalendarDays className="h-4 w-4 text-[#fd5b38]" />
              {post.author_name} • {formatDate(post.published_at)}
            </p>
          </div>

          <div className="mt-8">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/20 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
            >
              Read article
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function CompactBlogCard({
  post,
}: {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    cover_image_url: string | null;
    category: string;
    author_name: string;
    published_at: string | null;
  };
}) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#111111]">
      <BlogImage post={post} />

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
            {post.category}
          </span>
        </div>

        <h3 className="mt-5 line-clamp-2 text-2xl font-semibold leading-tight tracking-[-0.045em] text-black dark:text-white">
          {post.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/60 dark:text-white/60">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center gap-2 text-xs font-bold text-black/45 dark:text-white/45">
          <CalendarDays className="h-4 w-4 text-[#fd5b38]" />
          {formatDate(post.published_at)}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition group-hover:gap-3"
        >
          Read article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function BlogImage({
  post,
  large = false,
}: {
  post: {
    title: string;
    slug: string;
    cover_image_url: string | null;
    category: string;
  };
  large?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={
        large
          ? "relative block min-h-[360px] overflow-hidden bg-black sm:min-h-[500px]"
          : "relative block h-[240px] overflow-hidden bg-black"
      }
    >
      {post.cover_image_url ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover_image_url}
            alt={`${post.title} blog cover`}
            className="h-full w-full object-cover object-center transition duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#111111]">
          <BookOpenText className="h-16 w-16 text-white/20" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      <div className="absolute bottom-4 left-4 right-4 text-white">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-white/65">
          {post.category}
        </p>
      </div>
    </Link>
  );
}