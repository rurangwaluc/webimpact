import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  Globe2,
  Layers3,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const tags = [
  "Software development Rwanda",
  "Websites",
  "Dashboards",
  "SaaS",
];

const systemItems = [
  ["Weak website", "Visitors leave before they trust you"],
  ["Manual work", "Your team loses hours every week"],
  ["No visibility", "You cannot see what is really happening"],
  ["Scattered tools", "Sales and operations stay disconnected"],
];

export function HeroSection() {
  return (
    <section className="w-full overflow-x-hidden px-3 pb-7 pt-3 sm:px-5 lg:pb-10">
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes heroGlow {
          0%, 100% { opacity: .42; transform: scale(1); }
          50% { opacity: .82; transform: scale(1.08); }
        }

        @keyframes heroImageZoom {
          from { transform: scale(1.03); }
          to { transform: scale(1.08); }
        }

        .hero-fade-up {
          animation: heroFadeUp .8s ease both;
        }

        .hero-float {
          animation: heroFloat 6s ease-in-out infinite;
        }

        .hero-glow {
          animation: heroGlow 5s ease-in-out infinite;
        }

        .hero-image {
          animation: heroImageZoom 16s ease-in-out infinite alternate;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-fade-up,
          .hero-float,
          .hero-glow,
          .hero-image {
            animation: none !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[1.6rem] border border-black/10 bg-white shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-[#0b0b0b] sm:rounded-[2rem]">
          <div className="hero-glow pointer-events-none absolute right-[-90px] top-[-90px] h-64 w-64 rounded-full bg-[#fd5b38]/25 blur-3xl sm:h-72 sm:w-72" />
          <div className="pointer-events-none absolute bottom-[-110px] left-[-90px] h-72 w-72 rounded-full bg-black/5 blur-3xl dark:bg-white/10 sm:h-80 sm:w-80" />

          <div className="relative grid gap-7 px-4 py-6 sm:gap-9 sm:px-7 sm:py-10 lg:min-h-[calc(100svh-105px)] lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-12 lg:py-12 xl:px-14">
            <div className="max-w-2xl">
              <div className="hero-fade-up inline-flex max-w-full items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/60 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/65 sm:px-3.5 sm:text-[11px] sm:tracking-[0.18em]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#fd5b38]" />
                <span className="truncate">
                  Software Development Company in Rwanda
                </span>
              </div>

               <h1
                  className="hero-fade-up mt-5 text-[clamp(1.75rem,5vw,3rem)] font-bold leading-[0.96] tracking-[-0.055em] text-black dark:text-white"
                style={{ animationDelay: "120ms" }}
                >
                Your Business May Not Need More Marketing. It May Need A Better Machine.
                </h1>

              <p
                className="hero-fade-up mt-5 max-w-xl text-[15px] font-medium leading-7 text-black/62 dark:text-white/68 sm:mt-6 sm:text-base"
                style={{ animationDelay: "220ms" }}
              >
                WebImpact Lab builds websites, dashboards, SaaS platforms, and
                business systems for companies in Rwanda and East Africa that
                want more customers, less chaos, and real visibility.
              </p>

              <p
                className="hero-fade-up mt-3 max-w-xl text-[15px] font-bold leading-7 text-black dark:text-white sm:mt-4 sm:text-base"
                style={{ animationDelay: "300ms" }}
              >
                We connect your website, sales process, and daily operations
                into one growth system.
              </p>

              <div
                className="hero-fade-up mt-7 flex flex-col gap-3 min-[420px]:flex-row sm:mt-8 sm:flex-wrap"
                style={{ animationDelay: "380ms" }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#fd5b38]/25 transition duration-300 hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                >
                  Find the Leak
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black transition group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/work"
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black/[0.03] px-5 py-3 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/15 dark:bg-white/10 dark:text-white"
                >
                  See What We Build
                </Link>
              </div>

              <div
                className="hero-fade-up mt-7 flex gap-2 overflow-x-auto pb-1 sm:mt-8 sm:flex-wrap sm:overflow-visible sm:pb-0"
                style={{ animationDelay: "460ms" }}
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="shrink-0 rounded-full border border-black/10 bg-black/[0.03] px-3.5 py-2 text-xs font-bold text-black/65 dark:border-white/15 dark:bg-white/10 dark:text-white/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-[610px] lg:mr-0">
              <div
                className="hero-fade-up relative overflow-hidden rounded-[1.5rem] border border-black/10 bg-black shadow-2xl shadow-black/20 dark:border-white/10 sm:min-h-[620px] sm:rounded-[2rem]"
                style={{ animationDelay: "220ms" }}
              >
                <div className="relative h-[220px] sm:absolute sm:inset-0 sm:h-full">
                  <img
                    src="/hero-workspace.webp"
                    alt="Business team working with laptops and digital systems"
                    className="hero-image h-full w-full object-cover opacity-95"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-black/0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />

                  <div className="absolute left-3 top-3 z-10 max-w-[calc(100%-4.5rem)] rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white shadow-xl backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:py-2 sm:text-xs">
                    <span className="line-clamp-1">
                      Business systems that create control
                    </span>
                  </div>

                  <div className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-black/30 text-white shadow-xl backdrop-blur-md sm:right-5 sm:top-5 sm:h-11 sm:w-11 sm:rounded-2xl">
                    <Cpu className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>

                <div className="relative z-10 p-3 sm:absolute sm:bottom-5 sm:left-5 sm:right-5 sm:p-0">
                  <div className="rounded-[1.35rem] border border-white/15 bg-black/72 p-3 text-white shadow-2xl shadow-black/35 backdrop-blur-xl sm:rounded-[1.75rem] sm:bg-black/55 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#fd5b38] sm:text-[10px]">
                          What is leaking?
                        </p>

                        <h2 className="mt-1 text-lg font-bold tracking-[-0.04em] text-white sm:text-2xl">
                          The problem is rarely one thing.
                        </h2>
                      </div>

                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fd5b38] text-white sm:h-10 sm:w-10">
                        <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                    </div>

                    <div className="mt-3 grid gap-2 sm:mt-4">
                      {systemItems.map(([label, value], index) => (
                        <div
                          key={label}
                          className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/8 p-2.5 text-white transition duration-300 hover:border-[#fd5b38]/50 hover:bg-[#fd5b38]/12 sm:p-3"
                          style={{
                            animation: "heroFadeUp .7s ease both",
                            animationDelay: `${520 + index * 120}ms`,
                          }}
                        >
                          <div className="min-w-0">
                            <p className="text-[10px] font-semibold text-white/45 sm:text-[11px]">
                              {label}
                            </p>
                            <p className="mt-0.5 text-xs font-bold leading-5 sm:text-sm">
                              {value}
                            </p>
                          </div>

                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#fd5b38] sm:h-5 sm:w-5" />
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <MiniCard
                        icon={<Globe2 className="h-4 w-4 sm:h-5 sm:w-5" />}
                        label="Trust"
                      />
                      <MiniCard
                        active
                        icon={<Layers3 className="h-4 w-4 sm:h-5 sm:w-5" />}
                        label="Control"
                      />
                      <MiniCard
                        icon={<BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />}
                        label="Growth"
                      />
                    </div>

                    <div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div className="rounded-2xl border border-white/10 bg-white/8 px-3 py-2.5 sm:px-4 sm:py-3">
                        <p className="text-[10px] font-bold text-white/45 sm:text-xs">
                          Audit focus
                        </p>
                        <p className="text-xs font-bold text-white sm:text-sm">
                          Website → Sales → Operations
                        </p>
                      </div>

                      <Link
                        href="https://wa.me/"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#fd5b38] px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative border-t border-black/10 px-4 py-4 dark:border-white/10 sm:px-7 lg:px-12">
            <div className="flex flex-col gap-2 text-sm font-medium text-black/55 dark:text-white/60 md:flex-row md:items-center md:justify-between">
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
          ? "rounded-2xl bg-[#fd5b38] p-2.5 text-white transition duration-300 hover:-translate-y-0.5 sm:p-3"
          : "rounded-2xl border border-white/10 bg-white/92 p-2.5 text-black transition duration-300 hover:-translate-y-0.5 sm:p-3"
      }
    >
      <div className={active ? "text-white" : "text-[#fd5b38]"}>{icon}</div>
      <p className="mt-3 text-[10px] font-bold opacity-75 sm:mt-4 sm:text-[11px]">
        {label}
      </p>
    </div>
  );
}