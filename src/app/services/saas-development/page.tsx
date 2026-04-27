import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Layers3,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "SaaS Development in Rwanda",
  description:
    "WebImpact Lab builds SaaS platforms, marketplaces, subscription systems, and online products for businesses and founders in Rwanda and East Africa.",
  alternates: {
    canonical: "/services/saas-development",
  },
  openGraph: {
    title: "SaaS Development in Rwanda | WebImpact Lab",
    description:
      "SaaS platforms, marketplaces, portals, and subscription systems built to scale.",
    url: "https://webimpactlab.com/services/saas-development",
    type: "website",
  },
};

const problems = [
  "You have an idea, but no clear system to turn it into a real product.",
  "Your process works manually, but it cannot scale to more users.",
  "You want recurring revenue, but you do not have a proper platform.",
  "You are using tools that were not built for your business model.",
];

const builds = [
  {
    icon: Layers3,
    title: "SaaS platforms",
    text: "Platforms where users can sign up, use your product, manage their account, and come back again.",
  },
  {
    icon: Users,
    title: "Marketplaces",
    text: "Systems that connect buyers, sellers, listings, requests, payments, and activity in one place.",
  },
  {
    icon: CreditCard,
    title: "Subscriptions and payments",
    text: "Plans, recurring payments, billing flows, and clear control over how your product makes money.",
  },
  {
    icon: ShieldCheck,
    title: "User roles and control",
    text: "Clear access levels for owners, admins, staff, sellers, customers, and other user groups.",
  },
];

const outcomes = [
  "Recurring revenue",
  "Scalable product",
  "Clear user management",
  "Automated workflows",
  "Better data visibility",
  "Stronger business control",
];

const process = [
  ["01", "Clarify", "Turn your idea into a clear product with real users and use cases."],
  ["02", "Structure", "Define features, user roles, payments, and how the platform should work."],
  ["03", "Design", "Plan the product so it feels simple and clear for users."],
  ["04", "Build", "Develop in phases with testing, feedback, and clean delivery."],
  ["05", "Grow", "Launch, track usage, improve, and prepare the platform to scale."],
];

export default function SaaSDevelopmentPage() {
  return (
    <main className="bg-white dark:bg-[#070707]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "SaaS Development in Rwanda",
          provider: {
            "@type": "Organization",
            name: "WebImpact Lab",
            url: "https://webimpactlab.com",
          },
          areaServed: ["Rwanda", "Kigali", "East Africa", "Africa"],
          serviceType: "SaaS Development",
          url: "https://webimpactlab.com/services/saas-development",
          description:
            "SaaS development for founders and businesses that need platforms, marketplaces, portals, subscriptions, payments, and scalable user systems.",
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
                  SaaS development in Rwanda
                </p>

                <h1 className="mt-4 max-w-4xl text-[clamp(2.05rem,5.6vw,4.35rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-black dark:text-white">
                  Turn your idea into a platform people can actually use and pay
                  for.
                </h1>

                <p className="mt-6 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62 sm:text-base">
                  WebImpact Lab builds SaaS platforms, marketplaces, portals,
                  and subscription systems for founders and businesses in
                  Kigali, Rwanda, and East Africa that want to scale beyond
                  manual work.
                </p>

                <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-black/78 dark:text-white/78">
                  We do not just build features. We help shape the product,
                  users, workflow, payments, and growth path before writing the
                  code.
                </p>

                <div className="mt-8 flex flex-col gap-3 min-[460px]:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                  >
                    Discuss your SaaS idea
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
                    <Layers3 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-black dark:text-white">
                      Built for products that need to scale
                    </p>
                    <p className="text-xs font-semibold text-black/45 dark:text-white/45">
                      Users, payments, workflows, and control.
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
                    Product-first promise
                  </p>
                  <p className="mt-2 text-sm leading-6 text-black/65 dark:text-white/65">
                    If the platform does not help users get value and help the
                    business earn or scale, it is not ready.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative border-t border-black/10 px-6 py-4 text-sm font-semibold text-black/55 dark:border-white/10 dark:text-white/55 sm:px-8 lg:px-12">
              Idea → Product → Users → Payments → Growth
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
                SaaS platforms built around real users, not random features.
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-7 text-black/60 dark:text-white/60">
                A SaaS product must be clear enough for users to understand,
                useful enough for them to return, and structured enough for the
                business to grow.
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
                  SaaS should create a real business, not just a product.
                </h2>

                <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/62 dark:text-white/62">
                  SaaS development only makes sense when the platform helps
                  users get value, helps the business earn money, and creates a
                  system that can keep improving.
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
                We shape the product before we build the platform.
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-7 text-black/60 dark:text-white/60">
                Most SaaS projects fail because people build features before
                they understand the user, the offer, and the business model.
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
                  Have a SaaS idea that needs a real product plan?
                </h2>

                <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/60 dark:text-white/60">
                  Tell us what you want to build, who it is for, and how it
                  should make money. We will help you decide what should be
                  built first.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
              >
                Get a SaaS audit
                <Rocket className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}