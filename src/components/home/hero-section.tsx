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
  "Premium websites that build trust before the first call",
  "Business systems that remove manual work and owner blindness",
  "SaaS and automation foundations built for real operations",
];

const systemLayers = [
  { label: "Market", title: "Website, SEO, conversion", icon: Globe2 },
  { label: "Operations", title: "Sales, stock, staff, reports", icon: Workflow },
  { label: "Product", title: "Dashboards, portals, SaaS", icon: Layers3 },
];

const operatingSignals = ["Better leads", "Less manual work", "Faster decisions"];

export function HeroSection() {
  return (
    <section className="w-full overflow-x-hidden px-4 pb-5 pt-3 sm:px-6 lg:px-8 lg:pb-7">
      <div className="mx-auto max-w-7xl">
        <div className="grid bg-black/10 dark:bg-white/10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="bg-[#f7f4ef] p-5 dark:bg-[#080808] sm:p-7 lg:p-9 xl:p-10">
            <div className="inline-flex max-w-full items-center gap-2 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-black/60 shadow-sm dark:bg-white/[0.06] dark:text-white/65 sm:text-[11px]">
              <span className="h-2 w-2 shrink-0 bg-[#fd5b38]" />
              <span className="truncate">Rwanda-first. East Africa-ready.</span>
            </div>

            <h1 className="mt-5 max-w-3xl text-[clamp(2.45rem,7.1vw,4.55rem)] font-bold leading-[0.9] tracking-[-0.078em] text-black dark:text-white">
              Build the system your business should already be running on.
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] font-semibold leading-7 text-black/64 dark:text-white/68 sm:text-base sm:leading-8">
              WebImpact Lab builds the digital layer serious companies use to
              sell, operate, measure, and scale.
            </p>

            <div className="mt-6 grid gap-2 min-[430px]:grid-cols-2 sm:max-w-xl">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-[#fd5b38] px-5 py-3.5 text-sm font-black text-white transition duration-300 hover:bg-[#e84a2b]"
              >
                Start a project
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/work"
                className="group inline-flex items-center justify-center gap-2 bg-black/[0.055] px-5 py-3.5 text-sm font-black text-black transition duration-300 hover:bg-black hover:text-white dark:bg-white/[0.08] dark:text-white dark:hover:bg-white dark:hover:text-black"
              >
                See proof
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-6 grid gap-px border-t border-black/10 pt-5 dark:border-white/10 min-[560px]:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {proofPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-2 bg-black/[0.025] px-0 py-2 dark:bg-transparent min-[560px]:bg-transparent min-[560px]:p-0"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#fd5b38]" />
                  <p className="text-[12.5px] font-bold leading-5 text-black/70 dark:text-white/70">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-px bg-black/10 text-white dark:bg-white/10 md:grid-cols-[0.42fr_1fr]">
            <div className="grid gap-px bg-white/10 min-[500px]:grid-cols-2 md:grid-cols-1 md:content-start">
              {systemLayers.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="bg-[#191919] p-4 sm:p-5 md:min-h-[132px] lg:min-h-[148px]">
                    <div className="flex items-start gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center bg-[#fd5b38] text-white sm:h-10 sm:w-10">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#fd5b38] sm:text-[10px]">
                          {item.label} layer
                        </p>
                        <p className="mt-1 text-[13px] font-black leading-5 text-white sm:text-sm">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="bg-[#fd5b38] p-4 text-white sm:p-5 md:min-h-[132px] lg:min-h-[148px]">
                <div className="flex items-start gap-3">
                  <Database className="mt-0.5 h-5 w-5 shrink-0" />
                  <p className="text-[13px] font-black leading-6 sm:text-sm">
                    One connected layer for sales, systems, dashboards, and automation.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid bg-[#f6f6f6] text-black dark:bg-[#070707] dark:text-white">
              <div className="flex items-center justify-between gap-3 bg-white p-4 dark:bg-[#070707] sm:p-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#fd5b38]">
                    Control room
                  </p>
                  <p className="mt-1 text-base font-bold tracking-[-0.04em] sm:text-lg">
                    Business system preview
                  </p>
                </div>
                <div className="grid h-10 w-10 shrink-0 place-items-center bg-[#fd5b38] text-white">
                  <BarChart3 className="h-4 w-4" />
                </div>
              </div>

              <img
                src="/images/hero-business-systems.webp"
                alt="Business software dashboard interface preview"
                className="h-[220px] w-full object-cover object-top sm:h-[300px] md:h-[390px] lg:h-[430px] xl:h-[455px]"
              />

              <div className="grid grid-cols-3 gap-px bg-black/10 dark:bg-white/10">
                {operatingSignals.map((signal) => (
                  <div key={signal} className="bg-white p-3 dark:bg-[#111111] sm:p-4">
                    <p className="text-[11px] font-black leading-4 tracking-[-0.02em] text-black/72 dark:text-white/72 sm:text-xs">
                      {signal}
                    </p>
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
