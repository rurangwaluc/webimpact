import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const featured = {
  title: "What to Look for in a Software Development Company in Rwanda",
  description:
    "Choosing the wrong developer can cost time, money, and growth. Here is how business owners should evaluate software development companies based on outcomes, not just design or price.",
  href: "/blog/software-development-company-rwanda",
  category: "Software Development",
  image: "/blog/software-development-rwanda.webp",
  author: "WebImpact Lab",
  role: "Business Systems & Software Development",
};

const posts = [
  {
    title: "Why Businesses Need Systems, Not Just Websites",
    href: "/blog/business-systems-vs-websites",
    category: "Business Systems",
    image: "/blog/business-systems.webp",
  },
  {
    title: "How Dashboards Help Business Owners Stop Guessing",
    href: "/blog/business-dashboards-benefits",
    category: "Dashboards",
    image: "/blog/business-dashboards.webp",
  },
  {
    title: "How Automation Reduces Repetitive Work in Growing Businesses",
    href: "/blog/business-automation-benefits",
    category: "Automation",
    image: "/blog/business-automation.webp",
  },
];

export function BlogPreviewSection() {
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
            href={featured.href}
            className="group mt-12 grid overflow-hidden rounded-[2rem] border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#070707] lg:grid-cols-[0.95fr_1fr]"
          >
            <div className="relative min-h-[280px] overflow-hidden bg-black sm:min-h-[360px] lg:min-h-[430px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
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
                  {featured.description}
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-black text-black dark:text-white">
                    {featured.author}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-black/50 dark:text-white/50">
                    {featured.role}
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition group-hover:gap-3">
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.href} href={post.href} className="group">
                <article>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-black">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.05]"
                    />

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