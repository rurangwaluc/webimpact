import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  LineChart,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const serviceCards = [
  {
    icon: Sparkles,
    title: "Websites that sell",
  },
  {
    icon: Target,
    title: "Systems that create control",
  },
  {
    icon: LineChart,
    title: "Dashboards that show truth",
  },
];

const proofItems = ["Trust", "Sales", "Control", "Growth"];

export function HeroSection() {
  return (
    <section className="w-full overflow-x-hidden px-3 pb-8 pt-3 sm:px-5 lg:pb-10">
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroImageZoom {
          from { transform: scale(1.02); }
          to { transform: scale(1.06); }
        }

        .hero-fade-up {
          animation: heroFadeUp .8s ease both;
        }

        .hero-image {
          animation: heroImageZoom 18s ease-in-out infinite alternate;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-fade-up,
          .hero-image {
            animation: none !important;
          }
        }
          @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .hero-float {
          animation: heroFloat 6s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[1.6rem] border border-black/10 bg-white shadow-2xl shadow-black/[0.08] dark:border-white/10 dark:bg-[#0b0b0b] sm:rounded-[2.25rem]">
          <div className="pointer-events-none absolute right-[-90px] top-[-90px] h-72 w-72 rounded-full bg-[#fd5b38]/18 blur-3xl" />

          <div className="relative grid gap-8 px-4 py-7 min-[390px]:px-5 sm:px-7 sm:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10 lg:px-12 lg:py-14 xl:px-14">
            <div className="max-w-2xl">
              <div className="hero-fade-up inline-flex max-w-full items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-black/60 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/65 min-[390px]:text-[10px] sm:px-3.5 sm:text-[11px] sm:tracking-[0.18em]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#fd5b38]" />
                <span className="truncate">
                  Software Development Company in Rwanda
                </span>
              </div>

              <h1
                className="hero-fade-up mt-5 max-w-3xl text-[clamp(2rem,9.7vw,3.15rem)] font-bold leading-[0.98] tracking-[-0.058em] text-black dark:text-white sm:text-[clamp(2.7rem,6vw,4.5rem)]"
                style={{ animationDelay: "120ms" }}
              >
                Build the system your business should already be running on.
              </h1>

              <p
                className="hero-fade-up mt-5 max-w-xl text-[14px] font-medium leading-7 text-black/62 dark:text-white/68 min-[390px]:text-[15px] sm:text-base"
                style={{ animationDelay: "220ms" }}
              >
                We build websites, dashboards, SaaS platforms, and business
                systems that help serious businesses get more trust, more
                control, and clearer growth.
              </p>

              <div
                className="hero-fade-up mt-7 flex flex-col gap-3 min-[420px]:flex-row sm:mt-8 sm:flex-wrap"
                style={{ animationDelay: "320ms" }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#fd5b38]/25 transition duration-300 hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                >
                  Start a project
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black transition group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>

                <Link
                  href="/work"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-5 py-3 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/15 dark:bg-white/10 dark:text-white"
                >
                  See our work
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div
                className="hero-fade-up mt-8 border-t border-black/10 pt-6 dark:border-white/10"
                style={{ animationDelay: "420ms" }}
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#fd5b38]/10 text-[#fd5b38]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="max-w-md text-sm font-bold leading-6 text-black dark:text-white">
                      We do not build random pages. We build the parts of the
                      machine.
                    </p>

                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-black/40 dark:text-white/40">
                      Rwanda-first. Built to scale.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="hero-fade-up mx-auto w-full max-w-[660px] lg:mr-0"
              style={{ animationDelay: "220ms" }}
            >
              <div className="grid gap-3 sm:grid-cols-[150px_minmax(0,1fr)] lg:grid-cols-[160px_minmax(0,1fr)]">
                <div className="order-2 grid grid-cols-3 gap-2 min-[390px]:gap-3 sm:order-1 sm:grid-cols-1">
                  {serviceCards.map((card, index) => {
                    const Icon = card.icon;

                    return (
                      <div
                        key={card.title}
                        className="hero-fade-up rounded-[1.15rem] border border-black/10 bg-[#111827] p-3 text-white shadow-xl shadow-black/10 dark:border-white/10 min-[390px]:rounded-[1.35rem] sm:min-h-[132px] sm:p-4"
                        style={{ animationDelay: `${360 + index * 100}ms` }}
                      >
                        <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#fd5b38]/15 text-[#fd5b38] min-[390px]:h-9 min-[390px]:w-9 min-[390px]:rounded-2xl">
                          <Icon className="h-4 w-4" />
                        </div>

                        <p className="mt-4 text-[10px] font-bold leading-4 min-[390px]:text-[11px] sm:mt-5 sm:text-sm sm:leading-5">
                          {card.title}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="order-1 overflow-hidden rounded-[1.5rem] rounded-tr-[2.9rem] border border-black/10 bg-black shadow-2xl shadow-black/15 dark:border-white/10 min-[390px]:rounded-[1.75rem] min-[390px]:rounded-tr-[3.4rem] sm:order-2 sm:rounded-tr-[4.25rem]">
                  <div className="relative h-[300px] overflow-hidden min-[390px]:h-[330px] sm:h-[440px] lg:h-[500px]">
                    <img
                      src="/hero-africa-team.webp"
                      alt="African business team planning a digital growth system"
                      className="hero-image h-full w-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/16 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/32 via-transparent to-transparent" />

                    <div className="absolute right-3 top-3 max-w-[145px] rounded-[1.15rem] border border-white/15 bg-white/95 p-3 text-black shadow-2xl backdrop-blur-xl min-[390px]:right-4 min-[390px]:top-4 min-[390px]:max-w-[170px] sm:right-5 sm:top-5 sm:max-w-[210px] sm:rounded-[1.5rem] sm:p-4">
                      <div className="flex items-center gap-2">
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#fd5b38] text-white">
                          <Globe2 className="h-4 w-4" />
                        </div>

                        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#fd5b38]">
                          Africa-ready
                        </p>
                      </div>

                      <p className="mt-3 text-[12px] font-bold leading-5 text-black min-[390px]:text-[13px] sm:text-sm">
                        Systems built for local realities and serious growth.
                      </p>
                    </div>

                    <div className="hero-float absolute bottom-3 left-3 right-3 rounded-[1.25rem] border border-white/15 bg-black/68 p-3 text-white shadow-2xl backdrop-blur-xl min-[390px]:bottom-4 min-[390px]:left-4 min-[390px]:right-4 sm:bottom-5 sm:left-5 sm:right-auto sm:w-[330px] sm:rounded-[1.5rem] sm:p-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#fd5b38] sm:text-[10px]">
                        Growth system
                      </p>

                      <p className="mt-1 text-[15px] font-bold leading-5 tracking-[-0.035em] sm:text-lg">
                        Website → Sales → Dashboard → Control
                      </p>

                      <div className="mt-3 grid grid-cols-4 gap-1.5 min-[390px]:gap-2">
                        {proofItems.map((item) => (
                          <div
                            key={item}
                            className="rounded-xl border border-white/10 bg-white/10 px-1.5 py-2 text-center text-[9px] font-bold text-white/85 min-[390px]:text-[10px]"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-[1.35rem] border border-black/10 bg-white p-4 shadow-2xl shadow-black/12 dark:border-white/10 dark:bg-[#111111] sm:mx-auto sm:max-w-[520px] sm:rounded-[1.5rem]">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#fd5b38] text-white">
                    <BarChart3 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-black dark:text-white">
                      Before we build, we find the leak.
                    </p>
                    <p className="mt-1 text-xs font-semibold text-black/50 dark:text-white/50">
                      Trust, sales, visibility, operations, or growth.
                    </p>
                  </div>

                  <CheckCircle2 className="ml-auto hidden h-5 w-5 text-[#fd5b38] min-[390px]:block" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative border-t border-black/10 px-4 py-4 dark:border-white/10 sm:px-7 lg:px-12">
            <div className="flex flex-col gap-3 text-sm font-medium text-black/55 dark:text-white/60 md:flex-row md:items-center md:justify-between">
              <p className="font-bold text-black dark:text-white">
                Built for serious businesses, not decoration.
              </p>

              <div className="flex flex-wrap gap-2">
                {proofItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs font-bold text-black/60 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}