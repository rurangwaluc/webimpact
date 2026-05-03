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

export function WhyChooseSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
            Why WebImpact Lab
          </p>

          <h2 className="mx-auto mt-4 max-w-4xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
            Why serious businesses choose WebImpact Lab.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-black/60 dark:text-white/60">
            We do not just build websites. We help businesses find leaks, create
            control, and build digital systems that support growth.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-5 sm:grid-cols-2">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <article
                  key={reason.title}
                  className="group flex min-h-[245px] flex-col rounded-[2rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#111111] dark:hover:bg-[#151515]"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-[#fd5b38] transition duration-500 group-hover:bg-[#fd5b38] group-hover:text-white dark:border-white/10 dark:bg-white/[0.06]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="text-lg font-semibold leading-tight tracking-[-0.035em] text-black dark:text-white">
                      {reason.title}
                    </h3>
                  </div>

                  <p className="mt-5 flex-1 text-[15px] font-medium leading-7 text-black/62 dark:text-white/62">
                    {reason.text}
                  </p>

                  <div className="mt-6 flex items-center gap-2 border-t border-black/10 pt-4 dark:border-white/10">
                    <CheckCircle2 className="h-4 w-4 text-[#fd5b38]" />
                    <span className="text-xs font-black uppercase tracking-[0.14em] text-black/40 dark:text-white/40">
                      Business-first
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="relative overflow-hidden rounded-[2rem] bg-[#fd5b38] p-7 text-white shadow-2xl shadow-[#fd5b38]/20 lg:min-h-full">
            <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-white/20 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/10">
                  <ArrowRight className="h-5 w-5" />
                </div>

                <h3 className="mt-8 text-3xl font-semibold leading-[1.05] tracking-[-0.05em]">
                  Build the system your business should already be running on.
                </h3>

                <p className="mt-5 text-sm font-medium leading-7 text-white/78">
                  If your website, sales process, reporting, and operations are
                  disconnected, you are leaking money, time, and trust.
                </p>
              </div>

              <div className="mt-10">
                <div className="grid gap-3 text-sm font-bold text-white/82">
                  <p>✓ Websites that build trust</p>
                  <p>✓ Dashboards that create visibility</p>
                  <p>✓ Systems that reduce manual work</p>
                </div>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white px-5 py-4 text-sm font-black text-black transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
                >
                  Talk about your project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}