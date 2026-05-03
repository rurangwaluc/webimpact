import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  LayoutDashboard,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Software Development Services in Rwanda",
  description:
    "WebImpact Lab provides software development, web development, business systems, dashboards, SaaS platforms, and automation services for companies in Rwanda and East Africa.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Software Development Services in Rwanda | WebImpact Lab",
    description:
      "Websites, custom software, dashboards, SaaS platforms, and automation for businesses that need trust, control, visibility, and growth.",
    url: "https://webimpactlab.com/services",
    type: "website",
  },
};

const services = [
  {
    icon: Code2,
    title: "Software Development",
    href: "/services/software-development",
    keyword: "custom software development in Rwanda",
    description:
      "For businesses that are done running serious operations through Excel, WhatsApp, notebooks, and disconnected tools.",
    outcomes: ["Internal systems", "Customer portals", "Operations tools"],
  },
  {
    icon: Search,
    title: "Web Development",
    href: "/services/web-development",
    keyword: "web development company in Rwanda",
    description:
      "For companies whose website does not explain the offer, build trust, rank on Google, or turn visitors into leads.",
    outcomes: ["Business websites", "Landing pages", "SEO-ready pages"],
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards & Systems",
    href: "/services/business-systems",
    keyword: "dashboard development services Rwanda",
    description:
      "For owners who cannot clearly see sales, cash, stock, customers, staff activity, or business performance.",
    outcomes: ["Sales dashboards", "Inventory tracking", "Cash reports"],
  },
  {
    icon: ShoppingBag,
    title: "SaaS Platforms",
    href: "/services/saas-development",
    keyword: "SaaS development Rwanda",
    description:
      "For founders and businesses turning repeatable workflows into scalable products, marketplaces, portals, or platforms.",
    outcomes: ["Marketplaces", "Subscriptions", "Payment workflows"],
  },
  {
    icon: Bot,
    title: "AI & Automation",
    href: "/services/ai-automation",
    keyword: "business automation Rwanda",
    description:
      "For teams wasting hours on repetitive work that software, AI workflows, and automation should already handle.",
    outcomes: ["AI assistants", "Smart alerts", "Workflow automation"],
  },
];

const leaks = [
  "Your website gets visitors, but does not create enough trust or leads.",
  "Your team wastes time repeating work software should handle.",
  "You cannot see sales, cash, stock, customers, or staff activity clearly.",
  "Your tools do not connect, so the business leaks money quietly.",
];

const seoClusters = [
  {
    title: "By service",
    items: [
      "software development company in Rwanda",
      "web development company in Rwanda",
      "dashboard development services Rwanda",
      "business automation Rwanda",
    ],
  },
  {
    title: "By location",
    items: [
      "software development company in Kigali",
      "web development company in Kigali",
      "custom software Rwanda",
      "SaaS development East Africa",
    ],
  },
  {
    title: "By industry",
    items: [
      "retail software Rwanda",
      "real estate platform Rwanda",
      "e-commerce website Rwanda",
      "business systems for SMEs",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white dark:bg-[#070707]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Software Development Services in Rwanda",
          provider: {
            "@type": "Organization",
            name: "WebImpact Lab",
            url: "https://webimpactlab.com",
          },
          areaServed: ["Rwanda", "Kigali", "East Africa", "Africa"],
          serviceType: [
            "Software Development",
            "Web Development",
            "Dashboard Development",
            "SaaS Development",
            "Business Automation",
          ],
          url: "https://webimpactlab.com/services",
          description:
            "WebImpact Lab builds websites, custom software, dashboards, SaaS platforms, and automation systems for businesses in Rwanda and East Africa.",
        }}
      />

      <section className="px-4 pb-12 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
            <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-[28rem] w-[28rem] rounded-full bg-black/[0.05] blur-3xl dark:bg-white/10" />

            <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-12 xl:p-16">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  Software development services in Rwanda
                </p>

                <h1 className="mt-4 max-w-4xl text-[clamp(1.5rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.05em] uppercase text-black dark:text-white">
                  Your business is leaking money in places better software can fix.
                </h1>

                <p className="mt-6 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62 sm:text-base">
                  WebImpact Lab is a software development company in Rwanda
                  helping businesses in Kigali, Rwanda, and East Africa replace
                  weak websites, manual work, disconnected tools, and unclear
                  numbers with systems that sell, track, and scale.
                </p>

                <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-black/78 dark:text-white/78">
                  We do not sell “just code.” We find the leak, then build the
                  website, dashboard, SaaS platform, or automation that closes
                  it.
                </p>

                <div className="mt-8 flex flex-col gap-3 min-[460px]:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                  >
                    Find the business leak
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="#services"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                  >
                    Explore services
                  </Link>
                </div>
              </div>

              <div className="rounded-[2.25rem] border border-black/10 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-[#070707] sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-black dark:text-white">
                      What we fix first
                    </p>
                    <p className="text-xs font-semibold text-black/45 dark:text-white/45">
                      Because more features do not fix a broken machine.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {leaks.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-2xl border border-black/10 bg-black/[0.025] p-4 text-sm font-bold leading-6 text-black/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.75rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-5">
                  <p className="text-sm font-black text-[#fd5b38]">
                    Systems-first promise
                  </p>
                  <p className="mt-2 text-sm leading-6 text-black/65 dark:text-white/65">
                    Every service must answer one question: will this help the
                    business get customers, save time, reduce loss, improve
                    visibility, or scale?
                  </p>
                </div>
              </div>
            </div>

            <div className="relative border-t border-black/10 px-6 py-4 text-sm font-semibold text-black/55 dark:border-white/10 dark:text-white/55 sm:px-8 lg:px-12">
              Website trust → Operational control → Business visibility → Growth
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                Core services
              </p>

              <h2 className="mt-4 max-w-md text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                Pick the part of the business machine you need to fix first.
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-7 text-black/60 dark:text-white/60">
                Each service is built around a direct business outcome: more
                trust, more leads, clearer operations, better data, less manual
                work, or stronger scalability.
              </p>
            </div>

            <div className="grid gap-4">
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.href}
                    className="group overflow-hidden rounded-[2.15rem] border border-black/10 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#111111]"
                  >
                    <div className="grid gap-0 lg:grid-cols-[0.82fr_1fr]">
                      <div className="relative border-b border-black/10 p-6 dark:border-white/10 lg:border-b-0 lg:border-r">
                        <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-[#fd5b38]/0 blur-3xl transition group-hover:bg-[#fd5b38]/15" />

                        <div className="relative">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-black text-[#fd5b38]">
                              0{index + 1}
                            </span>

                            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-black/[0.03] text-[#fd5b38] transition group-hover:bg-[#fd5b38] group-hover:text-white dark:border-white/10 dark:bg-white/[0.04]">
                              <Icon className="h-5 w-5" />
                            </div>
                          </div>

                          <h3 className="mt-8 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                            {service.title}
                          </h3>

                          <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[#fd5b38]">
                            {service.keyword}
                          </p>

                          <p className="mt-4 text-sm leading-6 text-black/60 dark:text-white/60">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between p-6">
                        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                          {service.outcomes.map((outcome) => (
                            <div
                              key={outcome}
                              className="rounded-2xl border border-black/10 bg-black/[0.025] p-4 text-sm font-bold leading-6 text-black/65 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/65"
                            >
                              <CheckCircle2 className="mb-3 h-4 w-4 text-[#fd5b38]" />
                              {outcome}
                            </div>
                          ))}
                        </div>

                        <Link
                          href={service.href}
                          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition group-hover:gap-3 hover:bg-[#e84a2b]"
                        >
                          See how it works
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-black p-6 text-white shadow-2xl shadow-black/15 dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-12">
            <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/25 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  Built for how customers search
                </p>

                <h2 className="mt-4 max-w-xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em]">
                  People search for the exact problem they have. Your website
                  should be ready for that.
                </h2>

                <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/62">
                  The main services page explains what we do. The next layer is
                  targeted SEO pages for the way real buyers search: by service,
                  by location, by industry, and by the problem they need solved.
                </p>

                <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-white/78">
                  That is how WebImpact Lab can grow beyond one homepage and
                  rank for searches like software development company in Rwanda,
                  web development company in Kigali, retail software Rwanda, and
                  business automation Rwanda.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {seoClusters.map((cluster) => (
                  <div
                    key={cluster.title}
                    className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5"
                  >
                    <p className="text-sm font-black text-white">
                      {cluster.title}
                    </p>

                    <div className="mt-5 grid gap-3">
                      {cluster.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-xs font-bold leading-5 text-white/65"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                How projects start
              </p>

              <h2 className="mt-4 max-w-md text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                We reduce risk before we write code.
              </h2>
            </div>

            <div className="grid gap-4">
              {[
                ["01", "Audit", "Find the business leak first."],
                [
                  "02",
                  "Scope",
                  "Define the right pages, workflows, dashboards, data, and success metrics.",
                ],
                [
                  "03",
                  "Build",
                  "Ship in focused phases with clear review points and no feature chaos.",
                ],
                [
                  "04",
                  "Improve",
                  "Launch, measure, fix friction, and prepare the system for growth.",
                ],
              ].map(([number, title, text]) => (
                <article
                  key={number}
                  className="grid gap-5 rounded-[2rem] border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#111111] sm:grid-cols-[80px_1fr]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fd5b38] text-sm font-black text-white">
                    {number}
                  </span>

                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-black dark:text-white">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">
                      {text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-12">
            <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#fd5b38]/20 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  Start here
                </p>
                <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                  Tell us what is broken. We will help you decide what to build.
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/60 dark:text-white/60">
                  Whether you need a website, custom software, dashboard, SaaS
                  platform, or automation system, start with clarity before you
                  spend money on the wrong solution.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
              >
                Get a free audit
                <Rocket className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}