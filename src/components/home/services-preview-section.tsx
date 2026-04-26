"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Service = {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  fixes: string[];
  outcome: string;
  seoLine: string;
  proof: string;
  href: string;
};

const services: Service[] = [
  {
    id: "software",
    number: "01",
    title: "Software Development",
    short: "Custom business software for companies that need control.",
    description:
      "We build custom software for businesses that are tired of running operations through Excel, WhatsApp, notebooks, and disconnected tools.",
    fixes: ["Manual processes", "Operational mistakes", "Disconnected data"],
    outcome:
      "A structured software system that helps owners track operations, customers, staff, performance, and business activity in one place.",
    seoLine:
      "Custom software development in Rwanda for growing businesses across Kigali, Rwanda, and East Africa.",
    proof:
      "Ideal for retail, real estate, service businesses, and operations-heavy companies that need real visibility.",
    href: "/services/software-development",
  },
  {
    id: "web",
    number: "02",
    title: "Web Development",
    short: "Websites that explain, sell, and build trust fast.",
    description:
      "We build business websites that make your offer clear, make your company look serious, and help visitors take the next step.",
    fixes: ["Weak positioning", "Low trust", "Poor conversion"],
    outcome:
      "A professional website built for trust, SEO, lead generation, and customer conversion, not just decoration.",
    seoLine:
      "Web development company in Rwanda building business websites for companies that want more serious leads.",
    proof:
      "Built for businesses that need more than a pretty homepage they need a website that supports sales.",
    href: "/services/web-development",
  },
  {
    id: "systems",
    number: "03",
    title: "Dashboards & Business Systems",
    short: "Stop guessing. See the numbers that run the business.",
    description:
      "We build dashboards and internal systems that replace manual tracking with real-time visibility into sales, cash, stock, customers, and operations.",
    fixes: ["No visibility", "Manual reporting", "Scattered workflows"],
    outcome:
      "Clear dashboards and workflows that show what is happening inside the business before small problems become expensive.",
    seoLine:
      "Business systems and dashboard development services for companies in Rwanda and East Africa.",
    proof:
      "Built from real business-control patterns used in systems like BCS and Storvex.",
    href: "/services/business-systems",
  },
  {
    id: "saas",
    number: "04",
    title: "SaaS Platforms",
    short: "Turn a repeatable workflow into a scalable product.",
    description:
      "We build SaaS platforms for marketplaces, portals, subscriptions, media, payments, search, and multi-tenant business models.",
    fixes: ["Manual delivery", "No product engine", "Limited scale"],
    outcome:
      "A real product foundation that can support users, payments, automation, search, content, and recurring revenue.",
    seoLine:
      "SaaS development for founders and businesses building scalable platforms in Rwanda, East Africa, and Africa.",
    proof:
      "Designed for founders and businesses turning workflows into scalable digital products.",
    href: "/services/saas-development",
  },
  {
    id: "automation",
    number: "05",
    title: "AI & Automation",
    short: "Remove repetitive work before it slows growth.",
    description:
      "We build automation and AI-assisted workflows that reduce repetitive tasks, speed up execution, and make teams more efficient.",
    fixes: ["Slow tasks", "Human bottlenecks", "Repetitive workflows"],
    outcome:
      "A leaner business where common tasks, alerts, reports, and follow-ups happen faster with fewer manual mistakes.",
    seoLine:
      "Business automation and AI workflow development for companies that want faster execution and fewer bottlenecks.",
    proof:
      "Useful when your team is spending too much time doing work software should handle.",
    href: "/services/ai-automation",
  },
];

export function ServicesPreviewSection() {
  const [active, setActive] = useState<Service>(services[0]);
  const detailRef = useRef<HTMLDivElement | null>(null);

  function handleServiceClick(service: Service) {
    if (service.id === active.id) return;

    setActive(service);

    window.setTimeout(() => {
      if (window.matchMedia("(max-width: 1023px)").matches) {
        detailRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 120);
  }

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.46fr_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
              Services
            </p>

            <h2 className="mt-4 max-w-md text-[clamp(1.85rem,4vw,2.85rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-black dark:text-white">
              Software development services built around real business growth.
            </h2>

            <p className="mt-5 max-w-md text-[15px] leading-7 text-black/60 dark:text-white/60">
              WebImpact Lab is a software development company in Rwanda helping
              businesses in Kigali, Rwanda, and East Africa build websites,
              business systems, dashboards, SaaS platforms, and automation tools
              that connect sales, operations, and growth.
            </p>

            <p className="mt-4 max-w-md text-sm font-semibold leading-6 text-black/75 dark:text-white/75">
              The goal is simple: more trust, better systems, clearer numbers,
              and fewer expensive leaks.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
              >
                View all services
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e84a2b]"
              >
                Get a free audit
              </Link>
            </div>
          </div>

          <div className="relative rounded-[2.25rem] border border-black/10 bg-[#f5f5f5] p-2 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
            <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] bg-[radial-gradient(circle_at_70%_0%,rgba(253,91,56,0.14),transparent_36%)]" />

            <div className="relative grid gap-2 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="rounded-[1.8rem] border border-black/5 bg-white p-2 dark:border-white/10 dark:bg-[#070707]">
                {services.map((service) => {
                  const isActive = active.id === service.id;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceClick(service)}
                      className={[
                        "group relative flex w-full items-start gap-4 overflow-hidden rounded-[1.35rem] p-4 text-left transition-colors duration-300",
                        isActive
                          ? "text-white"
                          : "text-black hover:bg-black/[0.04] dark:text-white dark:hover:bg-white/[0.05]",
                      ].join(" ")}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="activeServiceBackground"
                          className="absolute inset-0 rounded-[1.35rem] bg-[#fd5b38] shadow-xl shadow-[#fd5b38]/25"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                        />
                      ) : null}

                      <span
                        className={[
                          "relative z-10 mt-1 text-xs font-black transition-colors",
                          isActive ? "text-white/70" : "text-[#fd5b38]",
                        ].join(" ")}
                      >
                        {service.number}
                      </span>

                      <span className="relative z-10 min-w-0">
                        <span className="block text-base font-black tracking-[-0.02em]">
                          {service.title}
                        </span>
                        <span
                          className={[
                            "mt-1 block text-sm leading-6 transition-colors",
                            isActive
                              ? "text-white/78"
                              : "text-black/55 dark:text-white/55",
                          ].join(" ")}
                        >
                          {service.short}
                        </span>
                      </span>

                      {isActive ? (
                        <motion.span
                          layoutId="activeServiceLine"
                          className="absolute bottom-0 left-0 z-10 h-1 w-full rounded-full bg-white/35"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              <div
                ref={detailRef}
                className="scroll-mt-24 overflow-hidden rounded-[1.8rem] border border-black/5 bg-white dark:border-white/10 dark:bg-[#070707]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 18, scale: 0.985, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, scale: 0.99, filter: "blur(6px)" }}
                    transition={{
                      duration: 0.42,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex min-h-[520px] flex-col p-6 sm:p-8"
                  >
                    <div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08, duration: 0.35 }}
                          className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]"
                        >
                          {active.number} / {active.title}
                        </motion.p>

                        <motion.span
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.12, duration: 0.35 }}
                          className="w-fit rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-[11px] font-black text-black/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60"
                        >
                          Growth infrastructure
                        </motion.span>
                      </div>

                      <motion.h3
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.14, duration: 0.42 }}
                        className="mt-6 max-w-xl text-[clamp(1.35rem,2.6vw,2.05rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-black dark:text-white"
                      >
                        {active.description}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18, duration: 0.38 }}
                        className="mt-4 max-w-xl text-sm leading-6 text-black/58 dark:text-white/58"
                      >
                        {active.seoLine}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22, duration: 0.42 }}
                        className="mt-8 grid gap-4 sm:grid-cols-2"
                      >
                        <div className="rounded-[1.35rem] border border-black/10 bg-black/[0.025] p-5 dark:border-white/10 dark:bg-white/[0.035]">
                          <p className="text-sm font-black text-black dark:text-white">
                            What it fixes
                          </p>

                          <ul className="mt-4 space-y-3">
                            {active.fixes.map((fix) => (
                              <li
                                key={fix}
                                className="flex gap-3 text-sm leading-6 text-black/60 dark:text-white/60"
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#fd5b38]" />
                                {fix}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-[1.35rem] border border-black/10 bg-black/[0.025] p-5 dark:border-white/10 dark:bg-white/[0.035]">
                          <p className="text-sm font-black text-black dark:text-white">
                            What you get
                          </p>

                          <p className="mt-4 text-sm leading-6 text-black/60 dark:text-white/60">
                            {active.outcome}
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.28, duration: 0.42 }}
                        className="mt-5 rounded-[1.35rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-5"
                      >
                        <p className="text-sm font-black text-[#fd5b38]">
                          Why it matters
                        </p>
                        <p className="mt-2 text-sm leading-6 text-black/65 dark:text-white/65">
                          {active.proof}
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.32, duration: 0.4 }}
                      className="mt-auto pt-8"
                    >
                      <div className="border-t border-black/10 pt-5 dark:border-white/10">
                        <p className="max-w-xl text-sm font-semibold leading-6 text-black/55 dark:text-white/55">
                          Built for serious business owners who want systems,
                          not decoration.
                        </p>

                        <Link
                          href={active.href}
                          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e84a2b]"
                        >
                          Learn more about {active.title}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}