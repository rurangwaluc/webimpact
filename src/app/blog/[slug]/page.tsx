import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import {
  getPublishedBlogPostBySlug,
  getPublishedBlogPosts,
} from "@/lib/cms/blog";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogEngagementPanel } from "@/components/blog/blog-engagement-panel";
import { ArticleShareActions } from "@/components/blog/article-share-actions";
import { BlogCTAInline } from "@/components/blog/blog-cta-inline";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ApprovedComment = {
  id: string;
  name: string;
  comment: string;
  created_at: string;
};

type BlogReactionRow = {
  liked: boolean;
  rating: number | null;
};

type MarkdownBlock =
  | { type: "h2"; content: string; id: string }
  | { type: "h3"; content: string; id: string }
  | { type: "paragraph"; content: string }
  | { type: "quote"; content: string }
  | { type: "image"; alt: string; url: string }
  | { type: "list"; items: string[] };

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
      title: "Blog Post Not Found",
    };
  }

  const title = post.seo_title || post.meta_title || post.title;
  const description =
    post.seo_description || post.meta_description || post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: post.canonical_url || `/blog/${post.slug}`,
    },
    robots: {
      index: !post.noindex,
      follow: !post.noindex,
    },
    openGraph: {
      title: post.og_title || title,
      description: post.og_description || description,
      url: `https://webimpactlab.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at,
      authors: [post.author_name],
      images: post.cover_image_url
        ? [
            {
              url: post.cover_image_url,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.og_title || title,
      description: post.og_description || description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

async function getBlogEngagement(blogPostId: string) {
  const [{ data: reactions, error: reactionError }, { data: comments, error }] =
    await Promise.all([
      supabaseAdmin
        .from("blog_post_reactions")
        .select("liked,rating")
        .eq("blog_post_id", blogPostId),
      supabaseAdmin
        .from("blog_post_comments")
        .select("id,name,comment,created_at")
        .eq("blog_post_id", blogPostId)
        .eq("status", "approved")
        .order("created_at", { ascending: false }),
    ]);

  if (reactionError) {
    throw new Error(reactionError.message);
  }

  if (error) {
    throw new Error(error.message);
  }

  const reactionRows = (reactions ?? []) as BlogReactionRow[];
  const ratingRows = reactionRows.filter(
    (reaction) => typeof reaction.rating === "number",
  );

  const likeCount = reactionRows.filter((reaction) => reaction.liked).length;
  const ratingCount = ratingRows.length;
  const averageRating =
    ratingCount > 0
      ? ratingRows.reduce((sum, reaction) => sum + (reaction.rating || 0), 0) /
        ratingCount
      : 0;

  return {
    likeCount,
    ratingCount,
    averageRating,
    comments: (comments ?? []) as ApprovedComment[],
  };
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const maybePost = await getPublishedBlogPostBySlug(slug);

  if (!maybePost) {
    notFound();
  }

  const post = maybePost;
  const engagement = await getBlogEngagement(post.id);
  const allPosts = await getPublishedBlogPosts();
  const articleUrl = `https://webimpactlab.com/blog/${post.slug}`;

  const parts = post.content.split("\n\n");
  const mid = Math.max(1, Math.floor(parts.length / 2));

  const blocks = parseMarkdownBlocks(post.content);
  const tableOfContents = blocks.filter(
    (block): block is Extract<MarkdownBlock, { type: "h2" | "h3" }> =>
      block.type === "h2" || block.type === "h3",
  );

  const relatedPosts = allPosts
    .filter(
      (item) =>
        item.id !== post.id &&
        (item.category === post.category || item.is_featured),
    )
    .slice(0, 3);

  async function likeArticle(formData: FormData) {
    "use server";

    const visitorKey = getText(formData, "visitor_key");

    if (!visitorKey) {
      throw new Error("Missing visitor key.");
    }

    const { data: existing, error: existingError } = await supabaseAdmin
      .from("blog_post_reactions")
      .select("id,liked")
      .eq("blog_post_id", post.id)
      .eq("visitor_key", visitorKey)
      .maybeSingle();

    if (existingError) {
      throw new Error(existingError.message);
    }

    const liked = existing ? !existing.liked : true;

    const { error } = await supabaseAdmin.from("blog_post_reactions").upsert(
      {
        blog_post_id: post.id,
        visitor_key: visitorKey,
        liked,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "blog_post_id,visitor_key",
      },
    );

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath(`/blog/${post.slug}`);
  }

  async function rateArticle(formData: FormData) {
    "use server";

    const visitorKey = getText(formData, "visitor_key");
    const rating = Number(getText(formData, "rating"));

    if (!visitorKey) {
      throw new Error("Missing visitor key.");
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5.");
    }

    const { error } = await supabaseAdmin.from("blog_post_reactions").upsert(
      {
        blog_post_id: post.id,
        visitor_key: visitorKey,
        rating,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "blog_post_id,visitor_key",
      },
    );

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath(`/blog/${post.slug}`);
  }

  async function submitComment(formData: FormData) {
    "use server";

    const name = getText(formData, "name");
    const email = getText(formData, "email") || null;
    const comment = getText(formData, "comment");

    if (!name || !comment) {
      throw new Error("Name and comment are required.");
    }

    const { error } = await supabaseAdmin.from("blog_post_comments").insert({
      blog_post_id: post.id,
      name,
      email,
      comment,
      status: "pending",
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath(`/blog/${post.slug}`);
  }

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
            "@id": articleUrl,
          },
        }}
      />

      <section className="px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
        <div className="mx-auto max-w-7xl">
          <div className="relative rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] p-3 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-4">
            <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-96 w-96 rounded-full bg-[#fd5b38]/15 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-140px] right-[-140px] h-96 w-96 rounded-full bg-black/[0.05] blur-3xl dark:bg-white/10" />

            <div className="relative grid gap-0 rounded-[2.35rem] bg-white dark:bg-[#070707] lg:grid-cols-[320px_minmax(0,1fr)]">
              <aside className="hidden border-r border-black/10 bg-black/[0.015] p-6 dark:border-white/10 dark:bg-white/[0.025] lg:block">
                <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition hover:gap-3"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Back to blog
                  </Link>

                  {tableOfContents.length > 0 ? (
                    <div className="mt-10">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                        Table of contents
                      </p>

                      <nav className="mt-4 grid gap-2">
                        {tableOfContents.slice(0, 9).map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={
                              item.type === "h3"
                                ? "rounded-xl px-3 py-2 pl-6 text-sm font-bold leading-5 text-black/42 transition hover:bg-[#fd5b38]/10 hover:text-[#fd5b38] dark:text-white/42"
                                : "rounded-xl px-3 py-2 text-sm font-black leading-5 text-black/62 transition hover:bg-[#fd5b38]/10 hover:text-[#fd5b38] dark:text-white/62"
                            }
                          >
                            {item.content}
                          </a>
                        ))}
                      </nav>
                    </div>
                  ) : null}

                  <div className="mt-8 rounded-[1.75rem] border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[#111111]">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fd5b38]">
                      Share this article
                    </p>

                    <div className="mt-4">
                      <ArticleShareActions url={articleUrl} title={post.title} />
                    </div>
                  </div>
                </div>
              </aside>

              <article className="min-w-0 overflow-hidden rounded-r-[2.35rem]">
                <div className="relative overflow-hidden rounded-t-[2.35rem] bg-black lg:rounded-tl-none lg:rounded-tr-[2.35rem]">
                  {post.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover_image_url}
                      alt={`${post.title} cover`}
                      className="h-[280px] w-full object-cover object-center sm:h-[420px] lg:h-[520px]"
                    />
                  ) : (
                    <div className="flex h-[280px] items-center justify-center bg-[#0d0d0d] text-white/20 sm:h-[420px] lg:h-[520px]">
                      <BookOpenText className="h-20 w-20" />
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                  <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2 sm:left-7 sm:top-7">
                    <span className="inline-flex rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-black backdrop-blur">
                      {post.category}
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-white/80 backdrop-blur-xl">
                      <Clock3 className="h-3.5 w-3.5" />
                      {post.reading_time_minutes} min read
                    </span>
                  </div>
                </div>

                <header className="border-b border-black/10 px-6 py-8 dark:border-white/10 sm:px-8 lg:px-12 lg:py-12">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition hover:gap-3 lg:hidden"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Back to blog
                  </Link>

                  <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold text-black/45 dark:text-white/45 lg:mt-0">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#fd5b38]" />
                      {formatDate(post.published_at || post.created_at)}
                    </span>

                    <span>•</span>

                    <span>{post.author_name}</span>
                  </div>

                  <h1 className="mt-5 max-w-4xl text-[clamp(1.6rem,3.6vw,3rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-black dark:text-white">
                    {post.title}
                  </h1>

                  <p className="mt-6 max-w-2xl text-[16px] leading-8 text-black/62 dark:text-white/62">
                    {post.excerpt}
                  </p>

                  <div className="mt-7">
                    <ArticleShareActions
                      url={articleUrl}
                      title={post.title}
                      compact
                    />
                  </div>
                </header>

                <div className="bg-white px-6 py-10 dark:bg-[#070707] sm:px-8 lg:px-12 lg:py-14">
                  <div className="mx-auto max-w-[760px]">
                    <BlogMarkdown content={parts.slice(0, mid).join("\n\n")} />

                    <BlogCTAInline />

                    <BlogMarkdown content={parts.slice(mid).join("\n\n")} />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  Need this solved?
                </p>

                <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                  Build the system your business should already be running on.
                </h2>

                <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/60 dark:text-white/60">
                  WebImpact Lab builds websites, dashboards, SaaS platforms,
                  automation tools, and business systems for serious businesses.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:w-[320px] lg:grid-cols-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/work"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                >
                  View case studies
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
              <Sparkles className="h-5 w-5" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
              Reading signals
            </h2>

            <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
              Like, rate, or comment below so the best articles become easier to
              improve.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <BlogEngagementPanel
            likeCount={engagement.likeCount}
            averageRating={engagement.averageRating}
            ratingCount={engagement.ratingCount}
            comments={engagement.comments}
            likeAction={likeArticle}
            ratingAction={rateArticle}
            commentAction={submitComment}
          />
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-10">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                    Keep reading
                  </p>

                  <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                    Related articles for better business systems.
                  </h2>
                </div>

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition hover:gap-3"
                >
                  View all articles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedPosts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="group"
                  >
                    <article className="h-full rounded-[2rem] border border-black/10 bg-white p-3 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#070707]">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-tr-[15px] rounded-[1.5rem] bg-black">
                        {item.cover_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.cover_image_url}
                          alt={item.title}
                          className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.05] rounded-tr-[15px]"
                        />
                        ) : (
                          <div className="flex h-full items-center justify-center text-white/20">
                            <BookOpenText className="h-12 w-12" />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-black text-black backdrop-blur">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="mt-5 px-2 text-[35px]  font-semibold leading-tight tracking-[-0.04em] text-black transition group-hover:text-[#fd5b38] dark:text-white dark:group-hover:text-[#fd5b38]">
                        {item.title}
                      </h3>

                      <p className="mt-3 px-2 pb-2 text-sm leading-6 text-black/55 dark:text-white/55">
                        {item.excerpt}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function BlogMarkdown({ content }: { content: string }) {
  const blocks = parseMarkdownBlocks(content);
  return (
    <div>
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              id={block.id}
              key={index}
              className="scroll-mt-28 pt-10 text-[clamp(1rem,2vw,1.4rem)] font-semibold leading-[1.05] tracking-[-0.052em] text-black first:pt-0 dark:text-white"
            >
              {block.content}
            </h2>
          );
        }

        if (block.type === "h3") {
          return (
            <h3
              id={block.id}
              key={index}
              className="scroll-mt-28 pt-8 text-lg font-semibold tracking-[-0.045em] text-black dark:text-white"
            >
              {block.content}
            </h3>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={index} className="my-10 overflow-hidden rounded-[2rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.url}
                alt={block.alt || "Blog image"}
                className="w-full bg-black object-cover"
              />

              {block.alt ? (
                <figcaption className="bg-black/[0.03] px-5 py-3 text-xs font-semibold text-black/45 dark:bg-white/[0.04] dark:text-white/45">
                  {block.alt}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="mt-6 grid gap-2.5">
              {block.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex gap-3 rounded-2xl border border-black/10 bg-black/[0.025] p-4 text-[15px] font-semibold leading-7 text-black/68 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/68"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#fd5b38]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="my-8 rounded-[2rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-6 text-xl font-semibold leading-8 tracking-[-0.035em] text-black dark:text-white"
            >
              {block.content}
            </blockquote>
          );
        }

        return (
          <p
            key={index}
            className="mt-5 text-[17px] leading-8 text-black/70 dark:text-white/70"
          >
            {block.content}
          </p>
        );
      })}
    </div>
  );
}

function parseMarkdownBlocks(content: string): MarkdownBlock[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  function flushParagraph() {
    if (paragraph.length > 0) {
      blocks.push({
        type: "paragraph",
        content: paragraph.join(" ").trim(),
      });
      paragraph = [];
    }
  }

  function flushList() {
    if (list.length > 0) {
      blocks.push({
        type: "list",
        items: list,
      });
      list = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);

    if (imageMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "image",
        alt: imageMatch[1],
        url: imageMatch[2],
      });
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      const contentValue = line.replace(/^###\s+/, "");
      blocks.push({
        type: "h3",
        content: contentValue,
        id: slugify(contentValue),
      });
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      const contentValue = line.replace(/^##\s+/, "");
      blocks.push({
        type: "h2",
        content: contentValue,
        id: slugify(contentValue),
      });
      continue;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "quote",
        content: line.replace(/^>\s+/, ""),
      });
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.replace(/^-\s+/, ""));
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}