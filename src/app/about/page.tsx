import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Globe,
  Layers3,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "About WebImpact Lab",
  description:
    "WebImpact Lab builds high-performance websites, business systems, dashboards, and SaaS platforms for serious businesses in Rwanda and East Africa.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | WebImpact Lab",
    description:
      "We build systems that help businesses grow with clarity, control, and confidence.",
    url: "https://webimpactlab.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-white dark:bg-[#070707]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "WebImpact Lab",
          url: "https://webimpactlab.com",
          description:
            "WebImpact Lab builds websites, dashboards, SaaS platforms, and automation systems for businesses.",
        }}
      />

      {/* HERO */}
      <section className="px-4 pt-12 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
            About WebImpact Lab
          </p>

          <h1 className="mt-5 text-[clamp(2.2rem,6vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.055em] text-black dark:text-white">
            We build systems that serious businesses actually run on.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-7 text-black/60 dark:text-white/60">
            Not just websites. Not just apps. We build business systems that
            create clarity, eliminate chaos, and give owners real control.
          </p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-2xl dark:border-white/10 dark:bg-[#111111] sm:p-10">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: <Globe className="h-5 w-5" />,
                  title: "Websites",
                  desc: "High-performance websites that build trust and convert visitors into customers.",
                },
                {
                  icon: <Layers3 className="h-5 w-5" />,
                  title: "Business Systems",
                  desc: "Custom systems that replace spreadsheets, WhatsApp chaos, and manual processes.",
                },
                {
                  icon: <Sparkles className="h-5 w-5" />,
                  title: "SaaS Platforms",
                  desc: "Scalable software products built for long-term growth and real-world use.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-[2rem] border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#070707]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                    {item.icon}
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-black dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                Why we are different
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                We don’t build features. We build leverage.
              </h2>

              <p className="mt-5 text-[15px] leading-7 text-black/60 dark:text-white/60">
                Most developers build what you ask for. We build what your
                business actually needs to grow, operate, and scale.
              </p>

              <ul className="mt-6 grid gap-3">
                {[
                  "Every system is built for real-world usage",
                  "Every action leaves a trace (audit-first design)",
                  "Owner-first control and visibility",
                  "Scalable from Rwanda to global markets",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm font-semibold text-black/70 dark:text-white/70"
                  >
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-[#fd5b38]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-[#f7f7f7] p-6 dark:border-white/10 dark:bg-[#111111]">
              <div className="grid gap-4">
                {[
                  {
                    icon: <Target className="h-5 w-5" />,
                    title: "Clarity",
                    desc: "Know exactly what is happening in your business.",
                  },
                  {
                    icon: <Building2 className="h-5 w-5" />,
                    title: "Control",
                    desc: "Operate with structure instead of chaos.",
                  },
                  {
                    icon: <Sparkles className="h-5 w-5" />,
                    title: "Growth",
                    desc: "Scale without breaking your operations.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-[1.5rem] border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[#070707]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fd5b38] text-white">
                        {item.icon}
                      </div>

                      <div>
                        <p className="font-semibold text-black dark:text-white">
                          {item.title}
                        </p>
                        <p className="text-xs text-black/50 dark:text-white/50">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-8 text-center shadow-2xl dark:border-white/10 dark:bg-[#111111] sm:p-12">
            <h2 className="text-3xl font-semibold tracking-[-0.045em] text-black dark:text-white">
              Ready to build something serious?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/60 dark:text-white/60">
              If your business is growing but your systems are not, this is where
              we fix that.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
              >
                View work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}