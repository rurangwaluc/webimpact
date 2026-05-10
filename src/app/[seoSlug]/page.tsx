import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Code2,
  Cpu,
  Gauge,
  Globe2,
  LineChart,
  LockKeyhole,
  MessageCircle,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import {
  getAllPublishedSeoPages,
  getPublishedSeoPageBySlug,
} from "@/lib/cms/seo-pages-service";
import { JsonLd } from "@/components/seo/json-ld";

type PageProps = {
  params: Promise<{
    seoSlug: string;
  }>;
};

type FaqItem = {
  question: string;
  answer: string;
};

type ContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    };

export const dynamicParams = true;

const outcomes = [
  {
    icon: ShieldCheck,
    title: "More control",
    text: "Replace scattered work with systems that show what is happening inside the business.",
  },
  {
    icon: LineChart,
    title: "Clearer numbers",
    text: "Turn sales, stock, cash, customers, tasks, and reporting into usable visibility.",
  },
  {
    icon: Workflow,
    title: "Less manual work",
    text: "Automate repetitive steps so your team spends less time chasing information.",
  },
];

const systemCapabilities = [
  "Custom business systems",
  "Dashboards and reporting",
  "SaaS platforms",
  "Internal tools",
  "Workflow automation",
  "Customer portals",
  "Admin panels",
  "Business data visibility",
];

const trustCards = [
  {
    icon: Target,
    title: "Built around the business problem",
    text: "The page is not just targeting a keyword. It explains the pain, the system needed, and the business outcome.",
  },
  {
    icon: Cpu,
    title: "Focused on operational control",
    text: "The offer is positioned around visibility, automation, decision-making, and reducing expensive business leaks.",
  },
  {
    icon: Gauge,
    title: "Designed for serious buyers",
    text: "The structure guides visitors from problem awareness to proof, process, trust, and a clear next action.",
  },
];

export async function generateStaticParams() {
  const pages = await getAllPublishedSeoPages();

  return pages.map((page) => ({
    seoSlug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { seoSlug } = await params;
  const page = await getPublishedSeoPageBySlug(seoSlug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.meta_title,
    description: page.meta_description,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page.meta_title,
      description: page.meta_description,
      url: `https://webimpactlab.com/${page.slug}`,
      type: "website",
      siteName: "WebImpact Lab",
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta_title,
      description: page.meta_description,
    },
  };
}

export default async function SeoLandingPage({ params }: PageProps) {
  const { seoSlug } = await params;
  const page = await getPublishedSeoPageBySlug(seoSlug);

  if (!page) {
    notFound();
  }

  const faqItems = normalizeFaq(page.faq);
  const keywords = Array.isArray(page.keywords) ? page.keywords : [];
  const contentBlocks = page.section_content
    ? splitParagraphs(page.section_content)
    : splitParagraphs(
        `Most businesses do not lose money because they lack effort.

They lose money because their systems are weak, disconnected, or invisible. WebImpact Lab helps businesses replace manual work, scattered communication, weak websites, and disconnected operations with structured software systems built for growth.

We design and develop:

• Business websites that increase trust and conversion
• SaaS platforms with subscriptions, dashboards, and automation
• Internal systems for operations, staff, inventory, and reporting
• Dashboards that show real-time business performance
• AI-assisted workflows that reduce repetitive work
• Customer portals, admin systems, and scalable platforms`,
      );

  return (
    <main className="bg-white dark:bg-[#070707]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.title,
          url: `https://webimpactlab.com/${page.slug}`,
          description: page.meta_description,
          publisher: {
            "@type": "Organization",
            name: "WebImpact Lab",
            url: "https://webimpactlab.com",
          },
        }}
      />

      {faqItems.length > 0 ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }}
        />
      ) : null}

      <section className="px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:rounded-[2.75rem]">
            <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[30rem] w-[30rem] rounded-full bg-[#fd5b38]/22 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-220px] left-[-180px] h-[34rem] w-[34rem] rounded-full bg-black/[0.05] blur-3xl dark:bg-white/[0.08]" />

            <div className="relative grid gap-10 p-5 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:p-12 xl:p-16">
              <div>
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#fd5b38]/20 bg-[#fd5b38]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#fd5b38] sm:text-xs">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#fd5b38]" />
                  <span className="truncate">
                    {page.hero_badge || "WebImpact Lab"}
                  </span>
                </div>

                <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,7vw,5rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-black dark:text-white">
                  {page.hero_title}
                </h1>

                <p className="mt-6 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62 sm:text-base">
                  {page.hero_description}
                </p>

                <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                  >
                    Start with an audit
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black transition group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>

                  <Link
                    href="/work"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                  >
                    See proof
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 border-t border-black/10 pt-6 dark:border-white/10 sm:grid-cols-3">
                  {["Trust", "Visibility", "Growth"].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <CheckCircle2 className="h-5 w-5 text-[#fd5b38]" />
                      <p className="mt-3 text-sm font-black text-black dark:text-white">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-[2.5rem] bg-[#fd5b38]/10 blur-2xl" />

                <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-3 shadow-2xl shadow-black/[0.08] dark:border-white/10 dark:bg-[#070707] sm:p-4">
                  <div className="rounded-[1.65rem] border border-black/10 bg-[#0b0b0b] p-4 text-white dark:border-white/10 sm:p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fd5b38]">
                          Business system map
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em]">
                          From scattered work to operational control.
                        </h2>
                      </div>

                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                        <Code2 className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3">
                      {trustCards.map((card) => {
                        const Icon = card.icon;

                        return (
                          <div
                            key={card.title}
                            className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4"
                          >
                            <div className="flex gap-4">
                              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#fd5b38]/15 text-[#fd5b38]">
                                <Icon className="h-5 w-5" />
                              </div>

                              <div>
                                <h3 className="text-sm font-black text-white">
                                  {card.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-white/55">
                                  {card.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 rounded-[1.5rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-4">
                      <div className="flex items-start gap-3">
                        <SearchCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
                        <div>
                          <p className="text-sm font-black text-white">
                            Built for search intent and buyer confidence.
                          </p>
                          <p className="mt-1 text-sm leading-6 text-white/55">
                            The goal is not traffic alone. The goal is qualified
                            visitors who understand the value and take action.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {systemCapabilities.slice(0, 4).map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-black/10 bg-black/[0.025] p-3 text-center text-[11px] font-black text-black/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative border-t border-black/10 px-5 py-4 dark:border-white/10 sm:px-8 lg:px-12">
              <div className="flex flex-col gap-3 text-sm font-semibold text-black/55 dark:text-white/55 md:flex-row md:items-center md:justify-between">
                <p className="font-black text-black dark:text-white">
                  Built for serious businesses, not decoration.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["Audit", "Strategy", "Build", "Improve"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-black text-black/50 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.72fr_0.28fr]">
          <article className="relative overflow-hidden rounded-[2.35rem] border border-black/10 bg-white p-6 shadow-xl shadow-black/[0.04] dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/10 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                What this means
              </p>

              <h2 className="mt-4 max-w-4xl text-[clamp(2rem,5vw,3.45rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-black dark:text-white">
                {page.section_title || page.title}
              </h2>

              <div className="mt-8 space-y-5">
                {contentBlocks.map((block, index) => {
                  if (block.type === "list") {
                    return (
                      <ul key={index} className="grid gap-3">
                        {block.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[15px] leading-7 text-black/65 dark:text-white/65"
                          >
                            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#fd5b38]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p
                      key={index}
                      className="max-w-4xl text-[15px] leading-8 text-black/65 dark:text-white/65"
                    >
                      {block.text}
                    </p>
                  );
                })}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {outcomes.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[1.65rem] border border-black/10 bg-black/[0.025] p-5 dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="mt-5 text-base font-black text-black dark:text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-black/55 dark:text-white/55">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#f7f7f7] shadow-xl shadow-black/[0.04] dark:border-white/10 dark:bg-[#111111]">
              <div className="p-5">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                  <Sparkles className="h-5 w-5" />
                </div>

                <h2 className="mt-6 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                  Need this built?
                </h2>

                <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
                  Start with a clear audit. We identify what should be built
                  first before you waste time on random features.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                >
                  Book audit
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="https://wa.me/+250785587830"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                >
                  WhatsApp
                  <MessageCircle className="h-4 w-4" />
                </Link>
              </div>

              {keywords.length > 0 ? (
                <div className="border-t border-black/10 p-5 dark:border-white/10">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-black/35 dark:text-white/35">
                    Related focus
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {keywords.slice(0, 10).map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-bold text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="border-t border-black/10 p-5 dark:border-white/10">
                <div className="rounded-[1.5rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-4">
                  <div className="flex gap-3">
                    <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
                    <p className="text-sm font-semibold leading-6 text-black/70 dark:text-white/70">
                      We build systems around business visibility, control,
                      automation, and measurable growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  What we can build
                </p>

                <h2 className="mt-4 text-[clamp(2rem,5vw,3.15rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                  Software that supports how the business actually works.
                </h2>

                <p className="mt-5 text-sm leading-7 text-black/60 dark:text-white/60">
                  The right system should connect the daily work, the numbers,
                  the customers, and the decisions that move the business.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {systemCapabilities.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#070707]"
                  >
                    <Globe2 className="h-5 w-5 text-[#fd5b38]" />
                    <p className="mt-5 text-sm font-black text-black dark:text-white">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {faqItems.length > 0 ? (
        <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                Questions
              </p>

              <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                Common questions before building.
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {faqItems.map((item) => (
                  <article
                    key={item.question}
                    className="rounded-[1.75rem] border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#070707]"
                  >
                    <div className="flex gap-3">
                      <CircleHelp className="mt-1 h-5 w-5 shrink-0 text-[#fd5b38]" />

                      <div>
                        <h3 className="text-lg font-semibold tracking-[-0.035em] text-black dark:text-white">
                          {item.question}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-black/60 dark:text-white/60">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-black p-6 text-white shadow-2xl shadow-black/[0.12] dark:border-white/10 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-96 w-96 rounded-full bg-[#fd5b38]/25 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  Start with clarity
                </p>

                <h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,3.65rem)] font-semibold leading-[0.96] tracking-[-0.065em]">
                  Before you build another tool, find the business leak first.
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60">
                  We help you decide what should be built, what should be
                  automated, what should be measured, and what should wait.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
              >
                Book an audit
                <Rocket className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function normalizeFaq(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (
        item &&
        typeof item === "object" &&
        "question" in item &&
        "answer" in item
      ) {
        return {
          question: String(item.question || "").trim(),
          answer: String(item.answer || "").trim(),
        };
      }

      return null;
    })
    .filter((item): item is FaqItem => Boolean(item?.question && item?.answer));
}

function splitParagraphs(value: string): ContentBlock[] {
  const lines = value
    .replace(/\u200B|\u200C|\u200D|\u2060/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: ContentBlock[] = [];
  let listItems: string[] = [];
  let paragraphLines: string[] = [];

  function flushParagraph() {
    if (paragraphLines.length === 0) return;

    blocks.push({
      type: "paragraph",
      text: paragraphLines.join(" "),
    });

    paragraphLines = [];
  }

  function flushList() {
    if (listItems.length === 0) return;

    blocks.push({
      type: "list",
      items: listItems,
    });

    listItems = [];
  }

  for (const line of lines) {
    const isListItem = /^[-•*]\s+/.test(line);

    if (isListItem) {
      flushParagraph();
      listItems.push(line.replace(/^[-•*]\s+/, "").trim());
      continue;
    }

    flushList();
    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}