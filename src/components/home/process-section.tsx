"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    number: "01",
    title: "Audit",
    label: "Find the leak",
    text: "We review your website, sales flow, customer journey, operations, tools, data, and reporting to see where the business is losing money, time, trust, or control.",
    outcome: "You know what is broken, what matters, and what should be fixed first.",
  },
  {
    number: "02",
    title: "Strategy",
    label: "Define the machine",
    text: "We turn the business problem into a clear execution plan: pages, workflows, dashboards, automations, integrations, data structure, and success metrics.",
    outcome: "You get a focused scope instead of random features and expensive guesswork.",
  },
  {
    number: "03",
    title: "Design",
    label: "Make it clear",
    text: "We design the customer-facing and business-facing experience so the system is easy to trust, easy to use, and easy to understand before development starts.",
    outcome: "You see the experience before we build it, reducing risk and confusion.",
  },
  {
    number: "04",
    title: "Build",
    label: "Ship in phases",
    text: "We build the website, dashboard, SaaS platform, business system, or automation in controlled phases so every part can be reviewed, tested, and improved.",
    outcome: "You get visible progress, cleaner execution, and fewer surprises.",
  },
  {
    number: "05",
    title: "Launch",
    label: "Go live and improve",
    text: "We launch, monitor, fix friction, improve performance, prepare SEO foundations, and make sure the system can support real customers and daily business use.",
    outcome: "Your system keeps improving after launch instead of becoming a dead project.",
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
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.65, ease: smoothEase }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
              Our process
            </p>

            <h2 className="mt-4 max-w-md text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
              A clear process that turns business chaos into working software.
            </h2>

            <p className="mt-5 max-w-md text-[15px] leading-7 text-black/60 dark:text-white/60">
              We do not disappear for weeks and return with random screens. We
              diagnose the business, define the system, design the experience,
              build in phases, launch, then improve based on real usage.
            </p>

            <p className="mt-4 max-w-md text-sm font-semibold leading-6 text-black/75 dark:text-white/75">
              The goal is simple: less risk, faster clarity, and software that
              actually supports sales, operations, and growth.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e84a2b]"
            >
              Start with an audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.1, ease: smoothEase }}
              className="absolute left-5 top-6 hidden h-[calc(100%-48px)] w-px origin-top bg-gradient-to-b from-[#fd5b38] via-black/15 to-black/0 dark:via-white/15 sm:block"
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              className="grid gap-4"
            >
              {steps.map((step, index) => (
                <motion.article
                  key={step.number}
                  variants={itemVariants}
                  className="group relative rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#111111]"
                >
                  <div className="grid gap-5 sm:grid-cols-[72px_1fr]">
                    <div className="relative">
                      <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#fd5b38] text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition duration-500 group-hover:scale-110">
                        {step.number}
                      </span>
                    </div>

                    <div className="grid gap-5 xl:grid-cols-[0.68fr_1fr]">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
                          {step.label}
                        </p>

                        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-black dark:text-white">
                          {step.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
                          {step.text}
                        </p>
                      </div>

                      <div className="rounded-[1.5rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-5">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />

                          <div>
                            <p className="text-sm font-black text-[#fd5b38]">
                              Client outcome
                            </p>
                            <p className="mt-2 text-sm leading-6 text-black/65 dark:text-white/65">
                              {step.outcome}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <span className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 ring-1 ring-inset ring-[#fd5b38]/30 transition duration-500 group-hover:opacity-100" />

                  {index < steps.length - 1 ? (
                    <div className="absolute -bottom-3 left-5 hidden h-6 w-px bg-[#fd5b38]/25 sm:block" />
                  ) : null}
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}