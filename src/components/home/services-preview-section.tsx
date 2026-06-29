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
    description:
      "Positioning, pages, SEO foundations, conversion paths, and trust signals for serious companies.",
    result: "Better first impression. Better lead quality.",
    href: "/services/web-development",
    icon: MonitorSmartphone,
  },
  {
    title: "Business systems",
    description:
      "Sales, stock, cash, customers, staff, documents, workflows, dashboards, and reports in one controlled flow.",
    result: "Less manual work. More owner visibility.",
    href: "/services/business-systems",
    icon: LayoutDashboard,
  },
  {
    title: "SaaS & automation",
    description:
      "Product platforms, portals, subscriptions, marketplaces, AI-assisted workflows, alerts, and integrations.",
    result: "Repeatable work becomes scalable software.",
    href: "/services/saas-development",
    icon: Bot,
  },
];

const decisionChecks = [
  "What problem must the system remove?",
  "What manual work should disappear?",
  "What should the owner see faster?",
  "What outcome makes the build worth it?",
];

export function ServicesPreviewSection() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-px overflow-hidden bg-black/10 dark:bg-white/10 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="bg-[#101010] p-5 text-white sm:p-7 lg:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
              What we build
            </p>

            <h2 className="mt-4 max-w-xl text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
              Fewer services. Stronger business outcomes.
            </h2>

            <p className="mt-5 max-w-xl text-[15px] font-medium leading-7 text-white/64">
              We build the digital layers that help a serious business sell,
              operate, measure, and scale.
            </p>

            <div className="mt-7 grid gap-px overflow-hidden bg-white/10">
              {decisionChecks.map((check) => (
                <div key={check} className="bg-[#181818] p-3 text-sm font-bold leading-5 text-white/74">
                  {check}
                </div>
              ))}
            </div>

            <Link
              href="/services"
              className="mt-7 inline-flex items-center justify-center gap-2 bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
            >
              View services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-px bg-black/10 dark:bg-white/10">
            {buildLanes.map((lane, index) => {
              const Icon = lane.icon;

              return (
                <Link
                  key={lane.title}
                  href={lane.href}
                  className="group grid gap-px bg-black/10 transition hover:bg-[#fd5b38]/45 dark:bg-white/10 sm:grid-cols-[86px_1fr_0.75fr]"
                >
                  <div className="flex items-center justify-between bg-[#f7f7f7] p-4 dark:bg-[#111111] sm:block sm:p-5">
                    <div className="grid h-12 w-12 place-items-center bg-[#fd5b38] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-black text-black/30 dark:text-white/30 sm:mt-5 sm:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="bg-[#f7f7f7] p-4 dark:bg-[#111111] sm:p-5">
                    <h3 className="text-2xl font-semibold leading-tight tracking-[-0.05em] text-black dark:text-white">
                      {lane.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-black/60 dark:text-white/58">
                      {lane.description}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between bg-white p-4 dark:bg-[#070707] sm:p-5">
                    <div>
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
                  </div>
                </Link>
              );
            })}

            <div className="grid gap-px bg-black/10 dark:bg-white/10 min-[620px]:grid-cols-[0.82fr_1.18fr]">
              <div className="bg-white p-5 dark:bg-[#111111]">
                <Code2 className="h-5 w-5 text-[#fd5b38]" />
                <p className="mt-4 text-xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                  We cut scope before we write code.
                </p>
                <p className="mt-3 text-sm font-medium leading-6 text-black/58 dark:text-white/58">
                  Premium execution is not more features. It is building the
                  few things that actually move the business.
                </p>
              </div>

              <img
                src="/hero-africa-team.webp"
                alt="Software team reviewing business system work"
                className="h-[220px] w-full object-cover min-[620px]:h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
