import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  Rocket,
  Workflow,
} from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "AI & Business Automation Services in Rwanda",
  description:
    "WebImpact Lab builds AI assistants, workflow automation, reporting tools, alerts, and business automation systems for companies in Rwanda and East Africa.",
  alternates: {
    canonical: "/services/ai-automation",
  },
  openGraph: {
    title: "AI & Business Automation Services in Rwanda | WebImpact Lab",
    description:
      "Automation systems that reduce repetitive work, speed up teams, and help businesses operate with fewer bottlenecks.",
    url: "https://webimpactlab.com/services/ai-automation",
    type: "website",
  },
};

const problems = [
  "Your team repeats the same tasks every day.",
  "Important follow-ups are delayed or forgotten.",
  "Reports take too long because information is scattered.",
  "Simple daily work slows growth because everything depends on people doing it manually.",
];

const builds = [
  {
    icon: Workflow,
    title: "Workflow automation",
    text: "Simple automations that move tasks, reminders, updates, approvals, and follow-ups without your team doing everything by hand.",
  },
  {
    icon: Bot,
    title: "AI assistants",
    text: "Helpful assistants that can answer common questions, prepare replies, summarize information, or support your team’s daily work.",
  },
  {
    icon: BellRing,
    title: "Smart alerts",
    text: "Alerts that notify the right person when something important happens, gets delayed, or needs attention.",
  },
  {
    icon: ClipboardCheck,
    title: "Automated reports",
    text: "Reports that bring useful information together so owners and managers do not waste time chasing updates.",
  },
];

const outcomes = [
  "Less repeated work",
  "Faster follow-up",
  "Fewer forgotten tasks",
  "Cleaner reporting",
  "Better customer response",
  "More focused staff time",
];

const process = [
  [
    "01",
    "Find the repeated work",
    "We identify the tasks, delays, follow-ups, and reports that waste time every week.",
  ],
  [
    "02",
    "Choose what should happen automatically",
    "We focus on simple automation that saves time, reduces mistakes, or helps the team move faster.",
  ],
  [
    "03",
    "Map the workflow",
    "We define what should happen, who should be notified, and where the information should go.",
  ],
  [
    "04",
    "Build and test",
    "We build the automation, test it with real examples, and make sure it is easy for your team to understand.",
  ],
  [
    "05",
    "Improve",
    "We watch how it works, fix friction, and improve the automation as the business grows.",
  ],
];

export default function AiAutomationPage() {
  return (
    <main className="bg-white dark:bg-[#070707]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AI and Business Automation Services in Rwanda",
          provider: {
            "@type": "Organization",
            name: "WebImpact Lab",
            url: "https://webimpactlab.com",
          },
          areaServed: ["Rwanda", "Kigali", "East Africa", "Africa"],
          serviceType: "AI and Business Automation",
          url: "https://webimpactlab.com/services/ai-automation",
          description:
            "AI and automation services for businesses that need workflow automation, smart alerts, reporting tools, AI assistants, and faster operations.",
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
                  AI and business automation in Rwanda
                </p>

                <h1 className="mt-4 max-w-4xl text-[clamp(2.05rem,5.6vw,4.35rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-black dark:text-white">
                  Let your team stop repeating work software can handle.
                </h1>

                <p className="mt-6 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62 sm:text-base">
                  WebImpact Lab builds simple AI and automation systems for
                  businesses in Kigali, Rwanda, and East Africa that want faster
                  follow-up, cleaner reporting, fewer missed tasks, and less
                  repeated manual work.
                </p>

                <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-black/78 dark:text-white/78">
                  We do not add AI because it sounds trendy. We help you remove
                  the repeated work that slows your team and keeps owners chasing
                  updates.
                </p>

                <div className="mt-8 flex flex-col gap-3 min-[460px]:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                  >
                    Find what to automate
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
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                    <Bot className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-black dark:text-white">
                      Built for teams that need speed
                    </p>
                    <p className="text-xs font-semibold text-black/45 dark:text-white/45">
                      Tasks, alerts, reports, follow-ups, and support.
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
                    Automation-first promise
                  </p>
                  <p className="mt-2 text-sm leading-6 text-black/65 dark:text-white/65">
                    If automation does not save time, reduce mistakes, speed up
                    follow-up, or make work easier to track, it should not be
                    built.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative border-t border-black/10 px-6 py-4 text-sm font-semibold text-black/55 dark:border-white/10 dark:text-white/55 sm:px-8 lg:px-12">
              Repeated work → Automation → Faster follow-up → Better control
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
                Automation that removes repeated work without confusing your
                team.
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-7 text-black/60 dark:text-white/60">
                The best automation does not make the business complicated. It
                removes repeat work, speeds up decisions, and helps your team
                focus on work that actually needs human judgment.
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
                  Automation should make the business easier to run.
                </h2>

                <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/62 dark:text-white/62">
                  AI and automation only matter when they reduce delays, improve
                  response time, remove repeated work, and make the business
                  easier to manage.
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
                We fix the repeated work before adding more tools.
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-7 text-black/60 dark:text-white/60">
                Many automation projects fail because people start with the tool
                instead of the daily work. We start with the tasks that waste
                time.
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
                  What repeated work is slowing your business down?
                </h2>

                <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/60 dark:text-white/60">
                  Tell us what your team repeats, delays, forgets, or reports
                  manually. We will help you decide what should be automated
                  first.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
              >
                Get an automation audit
                <Rocket className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}