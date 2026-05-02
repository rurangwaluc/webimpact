import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import type { BlogPost } from "@/lib/cms/blog";

export function BlogPreviewSectionClient({ posts }: { posts: BlogPost[] }) {
  const featured = posts[0] ?? null;
  const secondary = posts.slice(1, 4);

  if (!featured) {
    return null;
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-5 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
              Insights
            </p>

            <h2 className="mt-4 text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
              Practical ideas on software, systems, websites, and growth.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-black/60 dark:text-white/60">
              Learn how businesses in Rwanda and East Africa can use websites,
              custom software, dashboards, SaaS platforms, and automation to
              create trust, reduce chaos, and grow with more control.
            </p>
          </div>

          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-12 grid overflow-hidden rounded-[2rem] border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#070707] lg:grid-cols-[0.95fr_1fr]"
          >
            <div className="relative min-h-[280px] overflow-hidden bg-black sm:min-h-[360px] lg:min-h-[430px]">
              {featured.cover_image_url ? (
                <Image
                  src={featured.cover_image_url}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full min-h-[280px] items-center justify-center bg-[#111111] text-white/20 sm:min-h-[360px] lg:min-h-[430px]">
                  <BookOpenText className="h-16 w-16" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>

            <div className="flex min-h-[360px] flex-col justify-between bg-[#fff3ef] p-6 dark:bg-[#160b08] sm:p-8">
              <div>
                <span className="inline-flex w-fit rounded-full bg-[#fd5b38] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                  {featured.category}
                </span>

                <h3 className="mt-6 max-w-xl text-[clamp(1.65rem,4vw,2.65rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-black dark:text-white">
                  {featured.title}
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-black/62 dark:text-white/62">
                  {featured.excerpt}
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-black text-black dark:text-white">
                    {featured.author_name}
                  </p>

                  <p className="mt-1 text-xs font-semibold text-black/50 dark:text-white/50">
                    {featured.reading_time_minutes} min read
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition group-hover:gap-3">
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>

          {secondary.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {secondary.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-black">
                      {post.cover_image_url ? (
                        <Image
                          src={post.cover_image_url}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition duration-700 group-hover:scale-[1.05]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[#111111] text-white/20">
                          <BookOpenText className="h-12 w-12" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                      <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-black text-black backdrop-blur">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="mx-auto mt-5 max-w-sm text-center text-xl font-semibold leading-tight tracking-[-0.04em] text-black transition group-hover:text-[#fd5b38] dark:text-white dark:group-hover:text-[#fd5b38]">
                      {post.title}
                    </h3>
                  </article>
                </Link>
              ))}
            </div>
          ) : null}

          <div className="mt-10 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
            >
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}