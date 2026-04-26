import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Layers3,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "We find the business leak first",
    text: "Before writing code, we look at where your company is losing trust, leads, sales, time, control, or visibility.",
  },
  {
    icon: Layers3,
    title: "We build systems, not decoration",
    text: "A pretty website is not enough. We build websites, dashboards, SaaS platforms, and automation around business outcomes.",
  },
  {
    icon: TrendingUp,
    title: "We think like operators",
    text: "Your software should help you sell, track, report, follow up, reduce mistakes, and make better decisions.",
  },
  {
    icon: CircleDollarSign,
    title: "We build for ROI",
    text: "Every feature should earn its place by helping the business get customers, save time, reduce loss, or scale better.",
  },
];

const proofItems = [
  "Software development company in Rwanda",
  "Web development for business growth",
  "Dashboards, SaaS platforms, and automation",
  "Built for Rwanda and East Africa first",
];

export function WhyChooseSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] text-black shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#080808] dark:text-white dark:shadow-black/20">
          <div className="absolute right-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#fd5b38]/18 blur-3xl" />
          <div className="absolute bottom-[-140px] left-[-100px] h-96 w-96 rounded-full bg-black/[0.04] blur-3xl dark:bg-white/10" />

          <div className="relative grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-black/10 p-6 sm:p-8 dark:border-white/10 lg:border-b-0 lg:border-r lg:p-10 xl:p-12">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                Why WebImpact Lab
              </p>

              <h2 className="mt-4 max-w-xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em]">
                Most developers build what you ask for. We help you build what
                the business actually needs.
              </h2>

              <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/62 dark:text-white/62">
                WebImpact Lab is a software development company in Rwanda
                helping businesses replace weak websites, scattered tools,
                manual work, and unclear numbers with digital systems built for
                trust, sales, control, and growth.
              </p>

              <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-black/75 dark:text-white/75">
                The goal is not “launch a website.” The goal is to build a
                machine that helps the business get customers, track operations,
                and scale with fewer expensive mistakes.
              </p>

              <div className="mt-8 grid gap-3">
                {proofItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white p-4 text-sm font-bold text-black/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#fd5b38]" />
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e84a2b]"
              >
                Talk about your project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid p-3 sm:p-4">
              <div className="grid gap-3 md:grid-cols-2">
                {reasons.map((reason, index) => {
                  const Icon = reason.icon;

                  return (
                    <article
                      key={reason.title}
                      className="group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-black/10 bg-white p-6 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-white/[0.045] dark:hover:bg-white/[0.075]"
                    >
                      <div className="absolute right-[-45px] top-[-45px] h-36 w-36 rounded-full bg-[#fd5b38]/0 blur-2xl transition duration-500 group-hover:bg-[#fd5b38]/18 dark:group-hover:bg-[#fd5b38]/25" />

                      <div className="relative flex h-full flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-black text-[#fd5b38]">
                              0{index + 1}
                            </span>

                            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-black/[0.03] text-[#fd5b38] transition duration-500 group-hover:bg-[#fd5b38] group-hover:text-white dark:border-white/10 dark:bg-white/[0.06]">
                              <Icon className="h-5 w-5" />
                            </div>
                          </div>

                          <h3 className="mt-8 max-w-sm text-2xl font-semibold leading-tight tracking-[-0.04em]">
                            {reason.title}
                          </h3>

                          <p className="mt-4 text-sm leading-6 text-black/58 dark:text-white/58">
                            {reason.text}
                          </p>
                        </div>

                        <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-4 dark:border-white/10">
                          <span className="text-xs font-black uppercase tracking-[0.18em] text-black/35 dark:text-white/35">
                            Business-first
                          </span>

                          <ArrowRight className="h-4 w-4 text-[#fd5b38] transition duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}