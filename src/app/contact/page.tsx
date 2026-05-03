import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Contact WebImpact Lab",
  description:
    "Contact WebImpact Lab for websites, custom software, business systems, SaaS platforms, dashboards, and automation services in Rwanda and East Africa.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact WebImpact Lab | Software Development Company in Rwanda",
    description:
      "Start with a free audit for your website, software idea, dashboard, SaaS platform, or automation project.",
    url: "https://webimpactlab.com/contact",
    type: "website",
  },
};

const reasons = [
  "You need a website that brings serious leads.",
  "You need custom software or a business system.",
  "You need dashboards to see sales, cash, stock, or operations.",
  "You need automation to remove repetitive work.",
];

const contactOptions = [
  {
    icon: Mail,
    title: "Email",
    text: "hello@webimpactlab.com",
    href: "mailto:hello@webimpactlab.com",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    text: "Chat about your project",
    href:"https://wa.me/250785587830",
  },
  {
    icon: MapPin,
    title: "Location",
    text: "Kigali, Rwanda",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-white dark:bg-[#070707]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact WebImpact Lab",
          url: "https://webimpactlab.com/contact",
          description:
            "Contact WebImpact Lab for websites, custom software, dashboards, SaaS platforms, and automation services in Rwanda.",
        }}
      />

      <section className="px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
            <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-[28rem] w-[28rem] rounded-full bg-black/[0.05] blur-3xl dark:bg-white/10" />

            <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-12 xl:p-16">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  Contact WebImpact Lab
                </p>

                <h1 className="mt-4 max-w-4xl text-[clamp(1.5rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.05em] text-black dark:text-white">
                  Tell us what is broken. We will help you decide what to build.
                </h1>

                <p className="mt-6 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62 sm:text-base">
                  Start with a free audit. Whether you need a website, custom
                  software, business dashboard, SaaS platform, or automation, we
                  will help you turn the problem into a clear next step.
                </p>

                <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-black/78 dark:text-white/78">
                  No pressure. No vague proposal. Just clarity on what your
                  business actually needs.
                </p>

                <div className="mt-8 grid gap-3">
                  {reasons.map((reason) => (
                    <div
                      key={reason}
                      className="flex gap-3 rounded-2xl border border-black/10 bg-white p-4 text-sm font-bold leading-6 text-black/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
                      {reason}
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
                    <div>
                      <p className="text-sm font-black text-[#fd5b38]">
                        Founder-level standard
                      </p>
                      <p className="mt-2 text-sm leading-6 text-black/65 dark:text-white/65">
                        If we cannot clearly see how the project helps your
                        business get customers, save time, reduce loss, improve
                        control, or scale, we will say that before you spend
                        money.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {contactOptions.map((option) => {
              const Icon = option.icon;
              const isLocation = option.href === "#";

              const content = (
                <article className="group rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#111111]">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-black/[0.03] text-[#fd5b38] transition group-hover:bg-[#fd5b38] group-hover:text-white dark:border-white/10 dark:bg-white/[0.04]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h2 className="mt-6 text-xl font-semibold tracking-[-0.04em] text-black dark:text-white">
                    {option.title}
                  </h2>

                  <p className="mt-2 text-sm font-semibold leading-6 text-black/60 dark:text-white/60">
                    {option.text}
                  </p>

                  {!isLocation ? (
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition group-hover:gap-3">
                      Open
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  ) : null}
                </article>
              );

              return isLocation ? (
                <div key={option.title}>{content}</div>
              ) : (
                <Link key={option.title} href={option.href}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}