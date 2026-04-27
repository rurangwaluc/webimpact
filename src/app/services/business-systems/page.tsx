import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  PackageSearch,
  Rocket,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Business Systems & Dashboard Development in Rwanda",
  description:
    "WebImpact Lab builds business systems, dashboards, inventory tools, cash tracking systems, and operational software for companies in Rwanda and East Africa.",
  alternates: {
    canonical: "/services/business-systems",
  },
  openGraph: {
    title: "Business Systems & Dashboard Development in Rwanda | WebImpact Lab",
    description:
      "Business systems and dashboards for owners who need visibility, control, reporting, and better daily operations.",
    url: "https://webimpactlab.com/services/business-systems",
    type: "website",
  },
};

const problems = [
  "You cannot clearly see sales, cash, stock, customers, or staff activity.",
  "Your team uses Excel, notebooks, WhatsApp, and scattered reports to run the business.",
  "Small mistakes become expensive because nobody sees them early enough.",
  "You depend on people’s memory instead of a system that records what happened.",
];

const builds = [
  {
    icon: BarChart3,
    title: "Owner dashboards",
    text: "Clear dashboards that help owners see sales, stock, cash, customers, staff activity, and business performance faster.",
  },
  {
    icon: PackageSearch,
    title: "Inventory systems",
    text: "Stock tracking tools that make product movement, adjustments, purchases, and availability easier to control.",
  },
  {
    icon: CreditCard,
    title: "Cash and payment tracking",
    text: "Systems that help track money in, money out, deposits, expenses, refunds, and payment movement.",
  },
  {
    icon: UsersRound,
    title: "Staff activity control",
    text: "Role-based workflows that help owners understand who did what, when, and why.",
  },
];

const outcomes = [
  "Clearer owner visibility",
  "Better stock control",
  "Cleaner cash tracking",
  "Fewer hidden mistakes",
  "Faster daily reporting",
  "Stronger staff accountability",
];

const process = [
  [
    "01",
    "Audit",
    "Find where the business is losing control, visibility, time, or money.",
  ],
  [
    "02",
    "Map",
    "Understand how sales, stock, cash, staff, customers, and reports currently move.",
  ],
  [
    "03",
    "Design",
    "Create a clear system flow that staff can use and owners can trust.",
  ],
  [
    "04",
    "Build",
    "Build the dashboard, workflows, records, and reports in focused phases.",
  ],
  [
    "05",
    "Improve",
    "Launch, watch usage, fix friction, and improve the system around real operations.",
  ],
];

export default function BusinessSystemsPage() {
  return (
    <main className="bg-white dark:bg-[#070707]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Business Systems and Dashboard Development in Rwanda",
          provider: {
            "@type": "Organization",
            name: "WebImpact Lab",
            url: "https://webimpactlab.com",
          },
          areaServed: ["Rwanda", "Kigali", "East Africa", "Africa"],
          serviceType: "Business Systems and Dashboard Development",
          url: "https://webimpactlab.com/services/business-systems",
          description:
            "Business systems and dashboard development for companies that need clearer sales, cash, stock, staff, customer, and operational visibility.",
        }}
      />

      <section className="px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
            <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-[28rem] w-[28rem] rounded-full bg-black/[0.05] blur-3xl dark:bg-white/10" />

            <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:p-12 xl:p-16">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  Business systems and dashboards in Rwanda
                </p>

                <h1 className="mt-4 max-w-4xl text-[clamp(2.05rem,5.6vw,4.35rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-black dark:text-white">
                  You cannot grow what you cannot see.
                </h1>

                <p className="mt-6 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62 sm:text-base">
                  WebImpact Lab builds business systems and dashboards for
                  companies in Kigali, Rwanda, and East Africa that need clear
                  visibility into sales, stock, cash, customers, staff, and daily
                  operations.
                </p>

                <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-black/78 dark:text-white/78">
                  We help owners replace guesswork with a system that shows what
                  is happening before small problems become expensive.
                </p>

                <div className="mt-8 flex flex-col gap-3 min-[460px]:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                  >
                    Get a systems audit
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/work/bcs"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                  >
                    View BCS case study
                  </Link>
                </div>
              </div>

              <div className="rounded-[2.25rem] border border-black/10 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-[#070707] sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                    <Building2 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-black dark:text-white">
                      Built for owners who need control
                    </p>
                    <p className="text-xs font-semibold text-black/45 dark:text-white/45">
                      Sales, cash, stock, staff, and reports.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {problems.map((item) => (
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
                    Control-first promise
                  </p>
                  <p className="mt-2 text-sm leading-6 text-black/65 dark:text-white/65">
                    If the system does not help the owner see, track, control,
                    or correct the business faster, it is not the right system.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative border-t border-black/10 px-6 py-4 text-sm font-semibold text-black/55 dark:border-white/10 dark:text-white/55 sm:px-8 lg:px-12">
              Sales → Stock → Cash → Staff → Reports → Control
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                What we build
              </p>

              <h2 className="mt-4 max-w-md text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                Systems that help owners stop guessing.
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-7 text-black/60 dark:text-white/60">
                A business system should show what is happening, where the money
                is moving, what staff are doing, and where the business needs
                attention.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {builds.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#111111]"
                  >
                    <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-[#fd5b38]/0 blur-3xl transition group-hover:bg-[#fd5b38]/15" />

                    <div className="relative">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-black/[0.03] text-[#fd5b38] transition group-hover:bg-[#fd5b38] group-hover:text-white dark:border-white/10 dark:bg-white/[0.04]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="mt-8 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-sm leading-6 text-black/60 dark:text-white/60">
                        {item.text}
                      </p>
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
          <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] p-6 text-black shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] dark:text-white sm:p-8 lg:p-12">
            <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/20 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  Business outcomes
                </p>

                <h2 className="mt-4 max-w-xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                  A good business system makes problems visible early.
                </h2>

                <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/62 dark:text-white/62">
                  Dashboards and business systems only matter when they help the
                  owner make better decisions, reduce mistakes, and control daily
                  operations with less stress.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {outcomes.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-black/10 bg-white p-4 text-sm font-bold leading-6 text-black/70 dark:border-white/10 dark:bg-white/[0.055] dark:text-white/70"
                  >
                    <CheckCircle2 className="mb-3 h-4 w-4 text-[#fd5b38]" />
                    {item}
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
                How it works
              </p>

              <h2 className="mt-4 max-w-md text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                We map the business before we build the dashboard.
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-7 text-black/60 dark:text-white/60">
                A dashboard is useless if it shows the wrong numbers. We start
                by understanding how the business actually runs.
              </p>
            </div>

            <div className="grid gap-4">
              {process.map(([number, title, text]) => (
                <article
                  key={number}
                  className="grid gap-5 rounded-[2rem] border border-black/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#111111] sm:grid-cols-[80px_1fr]"
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
                  Need a clearer way to run the business?
                </h2>

                <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/60 dark:text-white/60">
                  Tell us what you need to track, control, or understand better.
                  We will help you decide what business system should be built
                  first.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
              >
                Get a systems audit
                <Rocket className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}