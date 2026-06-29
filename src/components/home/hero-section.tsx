import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  Globe2,
  Layers3,
  Workflow,
} from "lucide-react";

const proofPoints = [
  "Revenue websites that make buyers trust you faster",
  "Internal systems that remove manual work and owner blindness",
  "SaaS foundations built for real operations, not demos",
];

const systemLayers = [
  { label: "Market", title: "Website, SEO, conversion", icon: Globe2 },
  { label: "Operations", title: "Sales, stock, staff, reports", icon: Workflow },
  { label: "Product", title: "Dashboards, portals, SaaS", icon: Layers3 },
];

const operatingSignals = [
  { label: "Lead quality", value: "+41%" },
  { label: "Manual steps", value: "-62%" },
  { label: "Decision speed", value: "3.4x" },
];

const buildSignals = [
  "Websites that sell",
  "Business systems",
  "Dashboards",
  "Automation",
  "SaaS platforms",
];

export function HeroSection() {
  return (
    <section className="w-full overflow-x-hidden px-3 pb-6 pt-3 sm:px-5 lg:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden bg-[#f7f4ef] shadow-2xl shadow-black/[0.08] dark:bg-[#0a0a0a]">
          <div className="grid gap-0 lg:grid-cols-[0.96fr_1.04fr]">
            <div className="border-b border-black/10 p-5 dark:border-white/10 sm:p-8 lg:border-b-0 lg:border-r lg:p-10 xl:p-12">
              <div className="inline-flex max-w-full items-center gap-2 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-black/60 shadow-sm dark:bg-white/[0.06] dark:text-white/65 sm:text-[11px]">
                <span className="h-2 w-2 shrink-0 bg-[#fd5b38]" />
                <span className="truncate">Rwanda-first. East Africa-ready.</span>
              </div>

              <h1 className="mt-5 max-w-4xl text-[clamp(2.55rem,10vw,5.5rem)] font-bold leading-[0.88] tracking-[-0.078em] text-black dark:text-white">
                Build the system your business should already be running on.
              </h1>

              <p className="mt-6 max-w-2xl text-[15px] font-semibold leading-7 text-black/64 dark:text-white/68 sm:text-base sm:leading-8">
                WebImpact Lab builds premium websites, business systems,
                dashboards, SaaS platforms, and automation for companies that
                need trust, control, and measurable business momentum.
              </p>

              <div className="mt-7 grid gap-3 min-[430px]:grid-cols-2 sm:max-w-xl">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-[#fd5b38] px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/18 transition duration-300 hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/work"
                  className="group inline-flex items-center justify-center gap-2 bg-black/[0.055] px-5 py-3.5 text-sm font-black text-black transition duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white dark:bg-white/[0.08] dark:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  See proof
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 border-t border-black/10 pt-6 dark:border-white/10">
                {proofPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#fd5b38]" />
                    <p className="text-sm font-bold leading-5 text-black/70 dark:text-white/70">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid min-w-0 bg-[#101010] p-3 text-white sm:p-4 lg:p-5">
              <div className="grid gap-3 lg:grid-cols-[0.78fr_1fr]">
                <div className="grid gap-3">
                  {systemLayers.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label} className="bg-white/[0.06] p-4">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center bg-[#fd5b38] text-white">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#fd5b38]">
                              {item.label} layer
                            </p>
                            <p className="mt-1 text-sm font-black leading-5 text-white">
                              {item.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="bg-[#fd5b38] p-4 text-white">
                    <div className="flex items-start gap-3">
                      <Database className="mt-0.5 h-5 w-5 shrink-0" />
                      <p className="text-sm font-black leading-6">
                        Built as a connected business layer: performance, SEO,
                        workflows, dashboards, and handover your team can use.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid bg-[#f6f6f6] text-black dark:bg-[#070707] dark:text-white">
                  <div className="flex items-center justify-between gap-3 border-b border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[#070707]">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#fd5b38]">
                        Control room
                      </p>
                      <p className="mt-1 text-lg font-bold tracking-[-0.04em]">
                        Business system preview
                      </p>
                    </div>
                    <div className="grid h-10 w-10 shrink-0 place-items-center bg-[#fd5b38] text-white">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="grid gap-3 p-4">
                    <img
                      src="/images/hero-business-systems.webp"
                      alt="Business software dashboard interface preview"
                      className="h-[220px] w-full object-cover object-top sm:h-[280px] lg:h-[330px]"
                    />

                    <div className="grid grid-cols-3 gap-2">
                      {operatingSignals.map((stat) => (
                        <div key={stat.label} className="bg-white p-3 dark:bg-[#111111]">
                          <p className="text-lg font-black tracking-[-0.04em]">
                            {stat.value}
                          </p>
                          <p className="mt-1 text-[10px] font-bold leading-4 text-black/48 dark:text-white/48">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden bg-white/10 min-[520px]:grid-cols-5">
                {buildSignals.map((item) => (
                  <div key={item} className="bg-[#101010] px-3 py-3 text-xs font-black uppercase tracking-[0.12em] text-white/62">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
