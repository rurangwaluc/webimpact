import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Code2,
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

const proofSignals = ["Trust", "Control", "Speed", "Revenue clarity"];

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
    text: "Reduce repetitive steps so the team spends less time chasing information.",
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

const processSteps = [
  {
    label: "01",
    title: "Find the business leak",
    text: "We identify the manual work, weak visibility, or customer friction that is costing time and money.",
  },
  {
    label: "02",
    title: "Define the right system",
    text: "We map the workflow, user roles, core screens, data, and business rules before writing code.",
  },
  {
    label: "03",
    title: "Build for real use",
    text: "We focus on simple daily use, strong mobile layouts, clean admin control, and measurable business value.",
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
• SaaS platforms with dashboards and automation
• Internal systems for operations, staff, inventory, and reporting
• Dashboards that show real-time business performance
• AI-assisted workflows that reduce repetitive work
• Customer portals, admin systems, and scalable platforms`,
      );

  return (
    <main className="bg-[#f4f1eb] text-black dark:bg-[#050505] dark:text-white">
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

      <section className="px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pb-16 lg:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid border border-black/10 bg-white shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#0b0b0b] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-8 lg:p-10 xl:p-12">
              <div className="inline-flex max-w-full items-center gap-2 bg-black/[0.045] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-black/55 dark:bg-white/[0.07] dark:text-white/60">
                <span className="h-2 w-2 shrink-0 bg-[#fd5b38]" />
                <span className="truncate">
                  {page.hero_badge || "WebImpact Lab"}
                </span>
              </div>

              <h1 className="mt-6 max-w-4xl text-[clamp(2.45rem,7.5vw,5.35rem)] font-bold leading-[0.88] tracking-[-0.085em] text-black dark:text-white">
                {page.hero_title}
              </h1>

              <p className="mt-6 max-w-2xl text-[15px] font-semibold leading-7 text-black/62 dark:text-white/62 sm:text-base sm:leading-8">
                {page.hero_description}
              </p>

              <div className="mt-8 grid gap-2 min-[430px]:grid-cols-2 sm:max-w-xl">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-[#fd5b38] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#e84a2b]"
                >
                  Start with an audit
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/work"
                  className="group inline-flex items-center justify-center gap-2 bg-black/[0.06] px-5 py-3.5 text-sm font-black text-black transition hover:bg-black hover:text-white dark:bg-white/[0.08] dark:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  See proof
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="mt-8 grid gap-px border-t border-black/10 pt-5 dark:border-white/10 min-[560px]:grid-cols-4">
                {proofSignals.map((item) => (
                  <div
                    key={item}
                    className="bg-black/[0.025] p-3 dark:bg-white/[0.045]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#fd5b38]" />
                    <p className="mt-3 text-[12px] font-black leading-4 text-black/68 dark:text-white/68">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid border-t border-black/10 bg-[#111111] text-white dark:border-white/10 lg:border-l lg:border-t-0">
              <div className="grid gap-px bg-white/10">
                <div className="bg-[#161616] p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fd5b38]">
                        System direction
                      </p>
                      <h2 className="mt-3 max-w-md text-3xl font-bold leading-[0.96] tracking-[-0.06em]">
                        From weak visibility to operational control.
                      </h2>
                    </div>

                    <div className="grid h-11 w-11 shrink-0 place-items-center bg-[#fd5b38]">
                      <Code2 className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {processSteps.map((step) => (
                  <div key={step.label} className="grid gap-4 bg-[#111111] p-5 sm:grid-cols-[4rem_1fr] sm:p-6">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
                      {step.label}
                    </p>
                    <div>
                      <h3 className="text-base font-black text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/58">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="bg-[#fd5b38] p-5 text-white sm:p-6">
                  <div className="flex items-start gap-3">
                    <SearchCheck className="mt-0.5 h-5 w-5 shrink-0" />
                    <p className="text-sm font-black leading-6">
                      Built for buyer intent, business clarity, and serious project conversations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
                {systemCapabilities.slice(0, 4).map((item) => (
                  <div key={item} className="bg-[#0b0b0b] p-4">
                    <p className="text-[11px] font-black leading-4 text-white/72">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.7fr_0.3fr]">
          <article className="border border-black/10 bg-white p-5 shadow-xl shadow-black/[0.04] dark:border-white/10 dark:bg-[#0b0b0b] sm:p-8 lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
              What this means
            </p>

            <h2 className="mt-4 max-w-4xl text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.96] tracking-[-0.065em] text-black dark:text-white">
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

            <div className="mt-8 grid gap-px bg-black/10 dark:bg-white/10 sm:grid-cols-3">
              {outcomes.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="bg-[#f7f4ef] p-5 dark:bg-[#111111]"
                  >
                    <div className="grid h-10 w-10 place-items-center bg-[#fd5b38] text-white">
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
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-black/10 bg-white shadow-xl shadow-black/[0.04] dark:border-white/10 dark:bg-[#0b0b0b]">
              <div className="p-5">
                <div className="grid h-11 w-11 place-items-center bg-[#fd5b38] text-white">
                  <Sparkles className="h-5 w-5" />
                </div>

                <h2 className="mt-6 text-2xl font-bold leading-[1] tracking-[-0.05em] text-black dark:text-white">
                  Need this built properly?
                </h2>

                <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
                  Start with a clear audit. We identify what should be built first before you waste time on random features.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e84a2b]"
                >
                  Book audit
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="https://wa.me/250785587830"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 bg-black/[0.06] px-5 py-3 text-sm font-black text-black transition hover:bg-black hover:text-white dark:bg-white/[0.08] dark:text-white dark:hover:bg-white dark:hover:text-black"
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
                        className="border border-black/10 bg-black/[0.025] px-3 py-1.5 text-xs font-bold text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="border-t border-black/10 p-5 dark:border-white/10">
                <div className="border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-4">
                  <div className="flex gap-3">
                    <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
                    <p className="text-sm font-semibold leading-6 text-black/70 dark:text-white/70">
                      We build systems around business visibility, control, automation, and measurable growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="border border-black/10 bg-white p-5 shadow-xl shadow-black/[0.04] dark:border-white/10 dark:bg-[#0b0b0b] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.38fr_1fr] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  What we can build
                </p>

                <h2 className="mt-4 text-[clamp(2rem,5vw,3.15rem)] font-bold leading-[0.98] tracking-[-0.06em] text-black dark:text-white">
                  Software that supports how the business actually works.
                </h2>

                <p className="mt-5 text-sm leading-7 text-black/60 dark:text-white/60">
                  The right system should connect the daily work, the numbers, the customers, and the decisions that move the business.
                </p>
              </div>

              <div className="grid gap-px bg-black/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                {systemCapabilities.map((item) => (
                  <div
                    key={item}
                    className="bg-[#f7f4ef] p-5 dark:bg-[#111111]"
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
        <section className="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="border border-black/10 bg-white p-5 shadow-xl shadow-black/[0.04] dark:border-white/10 dark:bg-[#0b0b0b] sm:p-8 lg:p-10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                Questions
              </p>

              <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.35rem)] font-bold leading-[0.98] tracking-[-0.06em] text-black dark:text-white">
                Common questions before building.
              </h2>

              <div className="mt-8 grid gap-px bg-black/10 dark:bg-white/10 md:grid-cols-2">
                {faqItems.map((item) => (
                  <article
                    key={item.question}
                    className="bg-[#f7f4ef] p-5 dark:bg-[#111111]"
                  >
                    <div className="flex gap-3">
                      <CircleHelp className="mt-1 h-5 w-5 shrink-0 text-[#fd5b38]" />

                      <div>
                        <h3 className="text-lg font-bold tracking-[-0.04em] text-black dark:text-white">
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

      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="border border-white/10 bg-black p-5 text-white shadow-2xl shadow-black/[0.14] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  Start with clarity
                </p>

                <h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,3.65rem)] font-bold leading-[0.94] tracking-[-0.07em]">
                  Before you build another tool, find the business leak first.
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60">
                  We help you decide what should be built, what should be automated, what should be measured, and what should wait.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#fd5b38] px-6 py-4 text-sm font-black text-white transition hover:bg-[#e84a2b]"
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
