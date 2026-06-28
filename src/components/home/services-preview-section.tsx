import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  Code2,
  LayoutDashboard,
  MonitorSmartphone,
  Sparkles,
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
      "Positioning, pages, SEO foundations, conversion paths, and trust signals for companies that need buyers to take them seriously.",
    result: "Better first impression. Better lead quality.",
    href: "/services/web-development",
    icon: MonitorSmartphone,
  },
  {
    title: "Business systems",
    description:
      "Sales, stock, cash, customers, staff, documents, branches, workflows, dashboards, and reports in one controlled flow.",
    result: "Less manual work. More owner visibility.",
    href: "/services/business-systems",
    icon: LayoutDashboard,
  },
  {
    title: "SaaS & automation",
    description:
      "Product platforms, portals, subscriptions, marketplaces, AI-assisted workflows, alerts, reporting, and integrations.",
    result: "Turn repeatable work into scalable software.",
    href: "/services/saas-development",
    icon: Bot,
  },
];

const decisionChecks = [
  "What business problem must this solve?",
  "What should the software replace?",
  "What will the owner see that they cannot see today?",
  "What must happen for the project to pay for itself?",
];

export function ServicesPreviewSection() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[16px] border border-black/10 bg-[#0b0b0b] p-5 text-white shadow-2xl shadow-black/[0.1] dark:border-white/10 sm:p-7 lg:p-8">
            <div className="pointer-events-none absolute right-[-10rem] top-[-12rem] h-96 w-96 rounded-full bg-[#fd5b38]/25 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                What we build
              </p>

              <h2 className="mt-4 max-w-xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
                Fewer services. Stronger business outcomes.
              </h2>

              <p className="mt-5 max-w-xl text-[15px] font-medium leading-7 text-white/64">
                WebImpact Lab is not trying to sell everything. We build the
                digital layers that help a serious business sell, operate,
                measure, and scale.
              </p>

              <div className="mt-7 overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.05]">
                <div className="border-b border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] bg-[#fd5b38] text-white">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/45">
                        Before we build
                      </p>
                      <p className="mt-1 text-lg font-black tracking-[-0.04em]">
                        The decision filter
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2 p-3">
                  {decisionChecks.map((check) => (
                    <div
                      key={check}
                      className="rounded-[13px] border border-white/10 bg-black/25 p-3 text-sm font-bold leading-5 text-white/72"
                    >
                      {check}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/services"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
              >
                View services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {buildLanes.map((lane, index) => {
              const Icon = lane.icon;

              return (
                <Link
                  key={lane.title}
                  href={lane.href}
                  className="group grid gap-4 rounded-[16px] border border-black/10 bg-[#f7f7f7] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#fd5b38]/35 hover:bg-white hover:shadow-2xl hover:shadow-black/[0.07] dark:border-white/10 dark:bg-[#111111] dark:hover:bg-[#151515] sm:grid-cols-[72px_1fr_0.76fr] sm:p-5"
                >
                  <div className="flex items-center gap-3 sm:block">
                    <div className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#fd5b38] text-white shadow-lg shadow-[#fd5b38]/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-black text-black/30 dark:text-white/30 sm:mt-4 sm:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold leading-tight tracking-[-0.05em] text-black dark:text-white">
                      {lane.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-black/60 dark:text-white/58">
                      {lane.description}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between rounded-[14px] border border-[#fd5b38]/20 bg-white p-4 dark:bg-[#070707]">
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

            <div className="grid gap-3 min-[620px]:grid-cols-2">
              <div className="rounded-[16px] border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#111111]">
                <Code2 className="h-5 w-5 text-[#fd5b38]" />
                <p className="mt-4 text-xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                  We cut scope before we write code.
                </p>
                <p className="mt-3 text-sm font-medium leading-6 text-black/58 dark:text-white/58">
                  Premium execution is not more features. It is building the
                  few things that actually move the business.
                </p>
              </div>

              <div className="overflow-hidden rounded-[16px] border border-black/10 bg-[#0b0b0b] dark:border-white/10">
                <img
                  src="/hero-africa-team.webp"
                  alt="Software team reviewing business system work"
                  className="h-full min-h-[220px] w-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
