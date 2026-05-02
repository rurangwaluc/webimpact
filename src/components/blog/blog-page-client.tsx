"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Layers3,
  Search,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import type { BlogPost } from "@/lib/cms/blog";

const PAGE_SIZE = 10;

const FILTERS = [
  "All",
  "Software Development",
  "Web Development",
  "Business Systems",
  "Dashboards",
  "Automation",
  "SaaS",
  "SEO",
];

const SORTS = [
  {
    value: "Most recent",
    label: "Most recent",
    description: "Newest published articles first.",
  },
  {
    value: "Featured",
    label: "Featured",
    description: "Only posts selected as important.",
  },
  {
    value: "Most useful",
    label: "Most useful",
    description: "Longer practical guides first.",
  },
];

export function BlogPageClient({
  posts,
  isAdmin,
}: {
  posts: BlogPost[];
  isAdmin: boolean;
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSort, setActiveSort] = useState("Most recent");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (activeFilter !== "All") {
      result = result.filter((post) => post.category === activeFilter);
    }

    if (activeSort === "Most recent") {
      result.sort(
        (a, b) =>
          new Date(b.published_at || b.created_at).getTime() -
          new Date(a.published_at || a.created_at).getTime(),
      );
    }

    if (activeSort === "Featured") {
      result = result.filter((post) => post.is_featured);
    }

    if (activeSort === "Most useful") {
      result.sort(
        (a, b) => b.reading_time_minutes - a.reading_time_minutes,
      );
    }

    return result;
  }, [posts, activeFilter, activeSort]);

  const featuredPost =
    filteredPosts.find((post) => post.is_featured) ?? filteredPosts[0] ?? null;

  const gridPosts = featuredPost
    ? filteredPosts.filter((post) => post.id !== featuredPost.id)
    : filteredPosts;

  const visiblePosts = gridPosts.slice(0, visibleCount);
  const hasMore = visibleCount < gridPosts.length;

  function handleFilterChange(filter: string) {
    setActiveFilter(filter);
    setVisibleCount(PAGE_SIZE);
  }

  function handleSortChange(sort: string) {
    setActiveSort(sort);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <main className="w-full overflow-x-hidden bg-white px-4 py-12 dark:bg-[#070707] sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="w-full overflow-hidden rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-5 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
              Insights
            </p>

            <h1 className="mt-4 text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
              Practical ideas on software, systems, websites, and growth.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-black/60 dark:text-white/60">
              Learn how businesses in Rwanda and East Africa can use websites,
              custom software, dashboards, SaaS platforms, and automation to
              create trust, reduce chaos, and grow with more control.
            </p>

            {isAdmin ? (
              <Link
                href="/admin/blog"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
              >
                <Settings className="h-4 w-4" />
                Manage blog
              </Link>
            ) : null}
          </div>

          <section className="mt-10 w-full overflow-hidden rounded-[2rem] border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#070707] sm:p-5">
            <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                  <SlidersHorizontal className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-black text-black dark:text-white">
                    Explore articles
                  </p>
                  <p className="truncate text-xs font-semibold text-black/45 dark:text-white/45">
                    {filteredPosts.length}{" "}
                    {filteredPosts.length === 1 ? "result" : "results"} •{" "}
                    {activeFilter} • {activeSort}
                  </p>
                </div>
              </div>

              <PremiumSortDropdown
                value={activeSort}
                onChange={handleSortChange}
              />
            </div>

            <div className="mt-5 w-full overflow-x-auto overscroll-x-contain pb-1">
              <div className="flex w-max max-w-none gap-2 pr-2">
                {FILTERS.map((filter) => {
                  const active = activeFilter === filter;

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => handleFilterChange(filter)}
                      className={
                        active
                          ? "inline-flex shrink-0 items-center gap-2 rounded-full bg-[#fd5b38] px-4 py-2.5 text-xs font-black uppercase tracking-[0.1em] text-white shadow-lg shadow-[#fd5b38]/20"
                          : "inline-flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-black/[0.025] px-4 py-2.5 text-xs font-black uppercase tracking-[0.1em] text-black/55 transition hover:border-[#fd5b38] hover:bg-[#fd5b38]/10 hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55"
                      }
                    >
                      {active ? <Layers3 className="h-3.5 w-3.5" /> : null}
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {filteredPosts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {featuredPost ? (
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group mt-12 grid min-w-0 overflow-hidden rounded-[2rem] border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#070707] lg:grid-cols-[0.95fr_1fr]"
                >
                  <div className="relative min-h-[280px] overflow-hidden bg-black sm:min-h-[360px] lg:min-h-[430px]">
                    {featuredPost.cover_image_url ? (
                      <Image
                        src={featuredPost.cover_image_url}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full min-h-[280px] items-center justify-center bg-[#111111] text-white/20">
                        <Search className="h-14 w-14" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  </div>

                  <div className="flex min-h-[360px] min-w-0 flex-col justify-between bg-[#fff3ef] p-6 dark:bg-[#160b08] sm:p-8">
                    <div className="min-w-0">
                      <span className="inline-flex w-fit rounded-full bg-[#fd5b38] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                        {featuredPost.category}
                      </span>

                      <h2 className="mt-6 max-w-xl text-[clamp(1.65rem,4vw,2.65rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-black dark:text-white">
                        {featuredPost.title}
                      </h2>

                      <p className="mt-4 max-w-xl text-sm leading-7 text-black/62 dark:text-white/62">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-sm font-black text-black dark:text-white">
                          {featuredPost.author_name}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-black/50 dark:text-white/50">
                          {featuredPost.reading_time_minutes} min read
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition group-hover:gap-3">
                        Read article
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ) : null}

              <div className="mt-6 grid min-w-0 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visiblePosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group min-w-0"
                  >
                    <article className="h-full min-w-0 rounded-[2rem] border border-transparent p-2 transition hover:border-black/10 hover:bg-white hover:shadow-2xl hover:shadow-black/[0.06] dark:hover:border-white/10 dark:hover:bg-[#070707]">
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
                            <Search className="h-12 w-12" />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                        <span className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] truncate rounded-full bg-white/90 px-3 py-1 text-[11px] font-black text-black backdrop-blur">
                          {post.category}
                        </span>
                      </div>

                      <div className="min-w-0 px-2 pb-2">
                        <h3 className="mx-auto mt-5 max-w-sm text-center text-xl font-semibold leading-tight tracking-[-0.04em] text-black transition group-hover:text-[#fd5b38] dark:text-white dark:group-hover:text-[#fd5b38]">
                          {post.title}
                        </h3>

                        <p className="mx-auto mt-3 max-w-sm text-center text-xs font-semibold text-black/45 dark:text-white/45">
                          {post.reading_time_minutes} min read
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {hasMore ? (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount((current) => current + PAGE_SIZE)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-black text-black transition hover:-translate-y-0.5 hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                  >
                    Load 10 more articles
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function PremiumSortDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = SORTS.find((sort) => sort.value === value) ?? SORTS[0];

  return (
    <div className="relative min-w-0 lg:shrink-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full min-w-0 items-center justify-between gap-4 rounded-full border border-black/10 bg-black/[0.025] px-5 py-3 text-left transition hover:border-[#fd5b38]/50 dark:border-white/10 dark:bg-white/[0.04] lg:w-[260px]"
      >
        <span className="min-w-0">
          <span className="block truncate text-xs font-black uppercase tracking-[0.14em] text-black dark:text-white">
            {selected.label}
          </span>
          <span className="mt-0.5 block truncate text-xs font-semibold text-black/45 dark:text-white/45">
            {selected.description}
          </span>
        </span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-black/45 transition dark:text-white/45 ${
            open ? "rotate-180 text-[#fd5b38]" : ""
          }`}
        />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-50 overflow-hidden rounded-[1.5rem] border border-black/10 bg-white p-2 shadow-2xl shadow-black/15 dark:border-white/10 dark:bg-[#111111] lg:left-auto lg:w-[280px]">
          {SORTS.map((sort) => {
            const active = sort.value === value;

            return (
              <button
                key={sort.value}
                type="button"
                onClick={() => {
                  onChange(sort.value);
                  setOpen(false);
                }}
                className={
                  active
                    ? "w-full rounded-[1.15rem] bg-[#fd5b38] px-4 py-3 text-left text-white"
                    : "w-full rounded-[1.15rem] px-4 py-3 text-left text-black/75 transition hover:bg-black/[0.04] dark:text-white/75 dark:hover:bg-white/[0.06]"
                }
              >
                <span className="block text-sm font-black">{sort.label}</span>
                <span
                  className={
                    active
                      ? "mt-1 block text-xs font-semibold text-white/75"
                      : "mt-1 block text-xs font-semibold text-black/45 dark:text-white/45"
                  }
                >
                  {sort.description}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-12 rounded-[2rem] border border-black/10 bg-white p-10 text-center dark:border-white/10 dark:bg-[#070707]">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fd5b38] text-white">
        <Search className="h-6 w-6" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
        No articles found.
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/60 dark:text-white/60">
        Try another filter or publish a new article in this category.
      </p>
    </div>
  );
}