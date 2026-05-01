import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  Rocket,
} from "lucide-react";
import {
  getPublishedBlogPostBySlug,
  getPublishedBlogPosts,
} from "@/lib/cms/blog";
import { JsonLd } from "@/components/seo/json-ld";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.meta_title || `${post.title} | WebImpact Lab`,
      description: post.meta_description || post.excerpt,
      url: `https://webimpactlab.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at || undefined,
      authors: [post.author_name],
      images: post.cover_image_url
        ? [
            {
              url: post.cover_image_url,
              width: 1200,
              height: 630,
              alt: `${post.title} blog cover`,
            },
          ]
        : undefined,
    },
  };
}

function formatDate(value: string | null) {
  if (!value) return "Recently updated";

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function renderContent(content: string) {
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, index) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="mt-10 text-3xl font-semibold leading-tight tracking-[-0.045em] text-black dark:text-white"
        >
          {block.replace("## ", "")}
        </h2>
      );
    }

    if (block.startsWith("### ")) {
      return (
        <h3
          key={index}
          className="mt-8 text-2xl font-semibold tracking-[-0.04em] text-black dark:text-white"
        >
          {block.replace("### ", "")}
        </h3>
      );
    }

    if (block.startsWith("- ")) {
      const items = block
        .split("\n")
        .map((item) => item.replace(/^- /, "").trim())
        .filter(Boolean);

      return (
        <ul key={index} className="mt-5 grid gap-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-2xl border border-black/10 bg-black/[0.025] p-4 text-sm font-bold leading-6 text-black/65 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/65"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p
        key={index}
        className="mt-5 text-[15px] leading-8 text-black/68 dark:text-white/68"
      >
        {block}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="bg-white dark:bg-[#070707]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: post.cover_image_url || undefined,
          datePublished: post.published_at || post.created_at,
          dateModified: post.updated_at,
          author: {
            "@type": "Organization",
            name: post.author_name,
          },
          publisher: {
            "@type": "Organization",
            name: "WebImpact Lab",
            url: "https://webimpactlab.com",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://webimpactlab.com/blog/${post.slug}`,
          },
        }}
      />

      <section className="px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
            <div className="pointer-events-none absolute right-[-160px] top-[-160px] h-[30rem] w-[30rem] rounded-full bg-[#fd5b38]/25 blur-3xl" />

            <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:p-12 xl:p-16">
              <div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition hover:gap-3"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  Back to blog
                </Link>

                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#fd5b38] px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white">
                    Article
                  </span>

                  <span className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-black/55 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/55">
                    {post.category}
                  </span>
                </div>

                <h1 className="mt-5 max-w-4xl text-[clamp(2.25rem,6vw,5rem)] font-semibold leading-[0.9] tracking-[-0.078em] text-black dark:text-white">
                  {post.title}
                </h1>

                <p className="mt-6 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62 sm:text-base">
                  {post.excerpt}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-bold text-black/50 dark:text-white/50">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-[#fd5b38]" />
                    {formatDate(post.published_at)}
                  </span>

                  <span>•</span>

                  <span>{post.author_name}</span>
                </div>
              </div>

              <div className="relative min-h-[360px] overflow-hidden rounded-[2.35rem] border border-black/10 bg-black shadow-2xl shadow-black/20 dark:border-white/10 sm:min-h-[520px]">
                {post.cover_image_url ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.cover_image_url}
                      alt={`${post.title} blog cover`}
                      className="h-full w-full object-cover object-center"
                    />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <BookOpenText className="h-16 w-16 text-white/20" />
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-6 sm:left-6 sm:right-6">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/60">
                    WebImpact Lab insight
                  </p>
                  <h2 className="mt-2 text-[clamp(2rem,5vw,3.8rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
                    {post.category}
                  </h2>
                </div>
              </div>
            </div>

            <div className="relative border-t border-black/10 px-6 py-4 text-sm font-semibold text-black/55 dark:border-white/10 dark:text-white/55 sm:px-8 lg:px-12">
              Useful insight → Better decisions → Stronger systems
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_0.28fr]">
          <article className="rounded-[2.5rem] border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-10">
            <div className="prose-none">{renderContent(post.content)}</div>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2.25rem] border border-black/10 bg-[#f7f7f7] p-5 shadow-xl dark:border-white/10 dark:bg-[#111111] sm:p-6">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                <Rocket className="h-5 w-5" />
              </div>

              <h2 className="mt-6 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                Need this solved in your business?
              </h2>

              <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
                WebImpact Lab builds websites, business systems, dashboards,
                SaaS platforms, and automation tools for businesses that need
                control and growth.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/work"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
              >
                View case studies
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}