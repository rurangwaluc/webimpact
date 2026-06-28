import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  Layers3,
  LockKeyhole,
  MonitorSmartphone,
  Workflow,
} from "lucide-react";

const proofPoints = [
  "Revenue websites that make buyers trust you faster",
  "Internal tools that remove manual work and owner blindness",
  "SaaS foundations built for real operations, not demos",
];

const systemLayers = [
  {
    label: "Market layer",
    title: "Website, SEO, conversion",
    icon: Globe2,
  },
  {
    label: "Operations layer",
    title: "Sales, stock, staff, reports",
    icon: Workflow,
  },
  {
    label: "Product layer",
    title: "Dashboards, portals, SaaS",
    icon: Layers3,
  },
];

const dashboardStats = [
  { label: "Lead quality", value: "+41%" },
  { label: "Manual steps", value: "-62%" },
  { label: "Decision speed", value: "3.4x" },
];

export function HeroSection() {
  return (
    <section className="w-full overflow-x-hidden px-3 pb-8 pt-3 sm:px-5 lg:pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[16px] border border-black/10 bg-[#f7f4ef] shadow-2xl shadow-black/[0.08] dark:border-white/10 dark:bg-[#0a0a0a]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#fd5b38] to-transparent" />
          <div className="pointer-events-none absolute right-[-18rem] top-[-18rem] h-[38rem] w-[38rem] rounded-full bg-[#fd5b38]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-20rem] left-[-18rem] h-[34rem] w-[34rem] rounded-full bg-black/10 blur-3xl dark:bg-white/10" />

          <div className="relative grid gap-10 px-4 py-8 min-[390px]:px-5 sm:px-8 sm:py-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-12 lg:px-12 lg:py-16 xl:px-14">
            <div className="max-w-3xl">
              <div className="inline-flex max-w-full items-center gap-2 rounded-[12px] border border-black/10 bg-white/70 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-black/60 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.06] dark:text-white/65 sm:text-[11px]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#fd5b38]" />
                <span className="truncate">Rwanda-first. East Africa-ready.</span>
              </div>

              <h1 className="mt-5 max-w-4xl text-[clamp(2.45rem,10vw,5.35rem)] font-bold leading-[0.88] tracking-[-0.075em] text-black dark:text-white">
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
                  className="group inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#fd5b38] px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition duration-300 hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/work"
                  className="group inline-flex items-center justify-center gap-2 rounded-[14px] border border-black/10 bg-white/70 px-5 py-3.5 text-sm font-black text-black transition duration-300 hover:-translate-y-0.5 hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/15 dark:bg-white/[0.06] dark:text-white"
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

            <div className="min-w-0">
              <div className="relative rounded-[16px] border border-black/10 bg-[#0b0b0b] p-3 shadow-2xl shadow-black/20 dark:border-white/10">
                <div className="grid gap-3 lg:grid-cols-[0.82fr_1fr]">
                  <div className="grid gap-3">
                    {systemLayers.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className="rounded-[15px] border border-white/10 bg-white/[0.06] p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#fd5b38] text-white">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#fd5b38]">
                                {item.label}
                              </p>
                              <p className="mt-1 text-sm font-black leading-5 text-white">
                                {item.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="rounded-[15px] border border-[#fd5b38]/25 bg-[#fd5b38]/10 p-4">
                      <div className="flex items-start gap-3">
                        <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
                        <p className="text-sm font-bold leading-6 text-white/74">
                          Built with clean UX, performance foundations, SEO,
                          scalable structure, and handover your team can use.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[15px] border border-white/10 bg-[#f7f7f7] dark:bg-[#111111]">
                    <div className="flex items-center justify-between gap-3 border-b border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[#070707]">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#fd5b38]">
                          Control room
                        </p>
                        <p className="mt-1 text-lg font-bold tracking-[-0.04em] text-black dark:text-white">
                          Business system preview
                        </p>
                      </div>
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#fd5b38] text-white">
                        <BarChart3 className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="overflow-hidden rounded-[14px] border border-black/10 bg-white dark:border-white/10 dark:bg-[#070707]">
                        <img
                          src="/images/hero-business-systems.webp"
                          alt="Business software dashboard interface preview"
                          className="h-[210px] w-full object-cover object-top sm:h-[260px] lg:h-[320px]"
                        />
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {dashboardStats.map((stat) => (
                          <div
                            key={stat.label}
                            className="rounded-[13px] border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-[#070707]"
                          >
                            <p className="text-lg font-black tracking-[-0.04em] text-black dark:text-white">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
