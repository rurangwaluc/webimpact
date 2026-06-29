import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  Code2,
  LayoutDashboard,
  MonitorSmartphone,
} from "lucide-react";

type BuildLane = {
  title: string;
  description: string;
  result: string;
  href: string;
  icon: LucideIcon;
};

const buildLanes: BuildLane[] = [
  {
    title: "Premium websites",
    description: "Positioning, pages, SEO foundations, conversion paths, and trust signals.",
    result: "Better first impression. Better lead quality.",
    href: "/services/web-development",
    icon: MonitorSmartphone,
  },
  {
    title: "Business systems",
    description: "Sales, stock, cash, customers, staff, documents, workflows, dashboards, and reports.",
    result: "Less manual work. More owner visibility.",
    href: "/services/business-systems",
    icon: LayoutDashboard,
  },
  {
    title: "SaaS & automation",
    description: "Product platforms, portals, subscriptions, marketplaces, AI-assisted workflows, and integrations.",
    result: "Repeatable work becomes scalable software.",
    href: "/services/saas-development",
    icon: Bot,
  },
];

const decisionChecks = [
  "What problem disappears?",
  "What work becomes faster?",
  "What should the owner see?",
  "What result makes it worth it?",
];

export function ServicesPreviewSection() {
  return (
    <section className="px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-px bg-black/10 dark:bg-white/10 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="bg-[#101010] p-5 text-white sm:p-7 lg:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
              What we build
            </p>

            <h2 className="mt-4 max-w-xl text-[clamp(2rem,5vw,3.1rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
              Fewer services. Stronger business outcomes.
            </h2>

            <p className="mt-4 max-w-xl text-[15px] font-medium leading-7 text-white/64">
              Visitors should understand the offer, the proof, and the next
              step without reading a long agency page.
            </p>

            <div className="mt-5 grid gap-px bg-white/10 min-[520px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {decisionChecks.map((check) => (
                <div
                  key={check}
                  className="bg-[#181818] p-3 text-[13px] font-bold leading-5 text-white/74"
                >
                  {check}
                </div>
              ))}
            </div>

            <Link
              href="/services"
              className="mt-5 inline-flex items-center justify-center gap-2 bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e84a2b]"
            >
              View services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-px bg-black/10 dark:bg-white/10 md:grid-cols-3">
            {buildLanes.map((lane, index) => {
              const Icon = lane.icon;

              return (
                <Link
                  key={lane.title}
                  href={lane.href}
                  className="group bg-white p-5 transition hover:bg-[#f8f8f8] dark:bg-[#111111] dark:hover:bg-[#151515] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center bg-[#fd5b38] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-black text-black/24 dark:text-white/24">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.05em] text-black dark:text-white">
                    {lane.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-black/60 dark:text-white/58">
                    {lane.description}
                  </p>

                  <div className="mt-5 bg-[#f7f7f7] p-4 dark:bg-white/[0.04]">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#fd5b38]">
                      Business result
                    </p>
                    <p className="mt-2 text-sm font-black leading-6 text-black/72 dark:text-white/72">
                      {lane.result}
                    </p>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition group-hover:gap-3">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}

            <div className="bg-white p-5 dark:bg-[#111111] sm:p-6 md:col-span-3">
              <div className="grid gap-5 md:grid-cols-[0.72fr_1.28fr] md:items-center">
                <div>
                  <Code2 className="h-5 w-5 text-[#fd5b38]" />
                  <p className="mt-4 text-xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                    We cut scope before we write code.
                  </p>
                  <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-black/58 dark:text-white/58">
                    Premium execution is building the few things that move trust,
                    control, speed, and revenue.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-px bg-black/10 dark:bg-white/10 sm:grid-cols-4">
                  {["Trust", "Control", "Speed", "Revenue"].map((item) => (
                    <div
                      key={item}
                      className="bg-[#f7f7f7] px-4 py-5 text-sm font-black text-black/70 dark:bg-white/[0.04] dark:text-white/70"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
