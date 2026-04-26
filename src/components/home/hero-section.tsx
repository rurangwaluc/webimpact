import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  Globe2,
  Layers3,
  MessageCircle,
} from "lucide-react";

const tags = [
  "Software development Rwanda",
  "Websites",
  "Dashboards",
  "SaaS",
];

const systemItems = [
  ["Weak website", "People leave before they trust you"],
  ["Manual work", "Your team wastes hours every week"],
  ["No visibility", "You cannot see what is really happening"],
  ["Scattered tools", "Sales, customers, and operations stay disconnected"],
];

export function HeroSection() {
  return (
    <section className="px-3 pb-8 pt-3 sm:px-5 lg:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-[#0b0b0b] sm:rounded-[2rem]">
          <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-[#fd5b38]/15 blur-3xl" />
          <div className="absolute bottom-[-100px] left-[-80px] h-72 w-72 rounded-full bg-black/5 blur-3xl dark:bg-white/10" />

          <div className="relative grid gap-8 px-5 py-7 sm:px-7 sm:py-9 lg:min-h-[calc(100svh-105px)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-12 lg:py-10 xl:px-14">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                Software Development Company in Rwanda
              </p>

              <h1 className="mt-4 text-[clamp(2.15rem,7vw,3.95rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-black dark:text-white">
                Your business may not need more marketing. It may need a better
                machine.
              </h1>

              <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/62 dark:text-white/68 sm:text-base">
                WebImpact Lab builds websites, dashboards, SaaS platforms, and
                business systems for companies in Rwanda and East Africa that
                want more customers, less chaos, and real visibility.
              </p>

              <p className="mt-3 max-w-xl text-[15px] font-semibold leading-7 text-black dark:text-white sm:text-base">
                We connect your website, sales process, and daily operations
                into one growth system.
              </p>

              <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e84a2b]"
                >
                  Find the Leak
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/work"
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black/[0.03] px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/15 dark:bg-white/10 dark:text-white"
                >
                  See What We Build
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/10 bg-black/[0.03] px-3.5 py-2 text-xs font-bold text-black/65 dark:border-white/15 dark:bg-white/10 dark:text-white/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-[430px] lg:mr-0">
              <div className="rounded-[1.5rem] border border-black/10 bg-black/[0.03] p-3 shadow-xl dark:border-white/10 dark:bg-white/[0.06] sm:rounded-[1.75rem]">
                <div className="rounded-[1.2rem] bg-white p-4 text-black shadow-sm dark:bg-[#111111] dark:text-white sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fd5b38]">
                        What is leaking?
                      </p>
                      <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
                        The problem is rarely one thing.
                      </h2>
                    </div>

                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fd5b38] text-white">
                      <Cpu className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2">
                    {systemItems.map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-black/[0.03] p-3 dark:border-white/10 dark:bg-white/[0.04]"
                      >
                        <div>
                          <p className="text-[11px] text-black/50 dark:text-white/45">
                            {label}
                          </p>
                          <p className="mt-0.5 text-sm font-black">{value}</p>
                        </div>
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#fd5b38]" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <MiniCard
                      icon={<Globe2 className="h-5 w-5" />}
                      label="Trust"
                    />
                    <MiniCard
                      active
                      icon={<Layers3 className="h-5 w-5" />}
                      label="Control"
                    />
                    <MiniCard
                      icon={<BarChart3 className="h-5 w-5" />}
                      label="Growth"
                    />
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-3xl border border-black/10 bg-white p-4 text-black dark:border-white/10 dark:bg-[#111111] dark:text-white">
                    <p className="text-3xl font-semibold tracking-tight">
                      Audit
                    </p>
                    <p className="mt-1 text-xs font-medium text-black/50 dark:text-white/50">
                      website, sales, and operations
                    </p>
                  </div>

                  <Link
                    href="https://wa.me/"
                    className="flex flex-col justify-between rounded-3xl bg-[#fd5b38] p-4 text-white transition hover:bg-[#e84a2b]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="mt-6 text-sm font-black">
                      Ask on WhatsApp
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative border-t border-black/10 px-5 py-4 dark:border-white/10 sm:px-7 lg:px-12">
            <div className="flex flex-col gap-2 text-sm text-black/55 dark:text-white/60 md:flex-row md:items-center md:justify-between">
              <p className="font-bold text-black dark:text-white">
                We do not build random pages. We build the parts of the machine.
              </p>
              <p>Trust → Sales → Control → Growth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniCard({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={
        active
          ? "rounded-2xl bg-[#fd5b38] p-3 text-white"
          : "rounded-2xl bg-black p-3 text-white dark:bg-white dark:text-black"
      }
    >
      <div className={active ? "text-white" : "text-[#fd5b38]"}>{icon}</div>
      <p className="mt-4 text-[11px] font-bold opacity-75">{label}</p>
    </div>
  );
}