"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Lightbulb,
  MonitorCog,
  Rocket,
  SearchCheck,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    number: "01",
    title: "Audit",
    label: "Find the leak",
    icon: SearchCheck,
    text: "We review your website, sales flow, customer journey, operations, tools, data, and reporting to see where the business is losing money, time, trust, or control.",
    outcome:
      "You know what is broken, what matters, and what should be fixed first.",
  },
  {
    number: "02",
    title: "Strategy",
    label: "Define the machine",
    icon: Lightbulb,
    text: "We turn the business problem into a clear execution plan: pages, workflows, dashboards, automations, integrations, data structure, and success metrics.",
    outcome:
      "You get a focused scope instead of random features and expensive guesswork.",
  },
  {
    number: "03",
    title: "Design",
    label: "Make it clear",
    icon: MonitorCog,
    text: "We design the customer-facing and business-facing experience so the system is easy to trust, easy to use, and easy to understand before development starts.",
    outcome:
      "You see the experience before we build it, reducing risk and confusion.",
  },
  {
    number: "04",
    title: "Build",
    label: "Ship in phases",
    icon: ClipboardCheck,
    text: "We build the website, dashboard, SaaS platform, business system, or automation in controlled phases so every part can be reviewed, tested, and improved.",
    outcome: "You get visible progress, cleaner execution, and fewer surprises.",
  },
  {
    number: "05",
    title: "Launch",
    label: "Go live and improve",
    icon: Rocket,
    text: "We launch, monitor, fix friction, improve performance, prepare SEO foundations, and make sure the system can support real customers and daily business use.",
    outcome:
      "Your system keeps improving after launch instead of becoming a dead project.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: smoothEase,
    },
  },
};

export function ProcessSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-visible rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] p-4 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-5 lg:p-7">
          <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-160px] left-[-140px] h-96 w-96 rounded-full bg-black/[0.04] blur-3xl dark:bg-white/10" />

          <div className="relative grid items-start gap-8 lg:grid-cols-[0.94fr_1.06fr]">
            <motion.aside
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.65, ease: smoothEase }}
              className="relative z-10 lg:sticky lg:top-28 lg:self-start"
            >
              <div className="rounded-[2.25rem] border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#070707] sm:p-8">
                <p className="inline-flex rounded-full border border-[#fd5b38]/20 bg-[#fd5b38]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#fd5b38]">
                  How it works
                </p>

                <h2 className="mt-5 max-w-xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                  A simple process that turns business chaos into working
                  software.
                </h2>

                <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/60 dark:text-white/60">
                  We do not disappear for weeks and return with random screens.
                  We diagnose the business, define the system, design the
                  experience, build in phases, launch, then improve based on real
                  usage.
                </p>

                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/20 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                >
                  Start with an audit
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="relative mt-8 overflow-hidden rounded-[2rem] bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/process-workshop.webp"
                    alt="Business strategy workshop for software project planning"
                    className="h-[320px] w-full object-cover object-center opacity-90 transition duration-700 hover:scale-[1.03] sm:h-[420px]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-black shadow-xl">
                        <ArrowRight className="h-5 w-5" />
                      </span>

                      <div>
                        <p className="text-sm font-black text-white">
                          Plan before code
                        </p>
                        <p className="mt-1 text-xs font-semibold text-white/65">
                          Less guessing. Clearer build. Better result.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>

            <div className="relative min-w-0">
              <div className="absolute left-6 top-6 hidden h-[calc(100%-48px)] w-px bg-gradient-to-b from-[#fd5b38] via-[#fd5b38]/25 to-transparent lg:block" />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-120px" }}
                className="grid gap-4"
              >
                {steps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <motion.article
                      key={step.number}
                      variants={itemVariants}
                      className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#070707]"
                    >
                      <div className="pointer-events-none absolute right-[-70px] top-[-70px] h-44 w-44 rounded-full bg-[#fd5b38]/0 blur-3xl transition duration-500 group-hover:bg-[#fd5b38]/16" />

                      <div className="relative grid gap-5 sm:grid-cols-[64px_1fr]">
                        <div>
                          <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-[#fd5b38] text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition duration-500 group-hover:scale-110">
                            {step.number}
                          </span>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fd5b38]">
                                {step.label}
                              </p>

                              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-black dark:text-white">
                                {step.title}
                              </h3>
                            </div>

                            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-black/[0.03] text-[#fd5b38] transition duration-500 group-hover:bg-[#fd5b38] group-hover:text-white dark:border-white/10 dark:bg-white/[0.06]">
                              <Icon className="h-5 w-5" />
                            </div>
                          </div>

                          <p className="mt-4 text-sm leading-6 text-black/60 dark:text-white/60">
                            {step.text}
                          </p>

                          <div className="mt-5 rounded-[1.5rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-4">
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />

                              <div>
                                <p className="text-sm font-black text-[#fd5b38]">
                                  Client outcome
                                </p>
                                <p className="mt-1 text-sm leading-6 text-black/65 dark:text-white/65">
                                  {step.outcome}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {index < steps.length - 1 ? (
                        <div className="absolute -bottom-3 left-6 hidden h-6 w-px bg-[#fd5b38]/25 lg:block" />
                      ) : null}
                    </motion.article>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}