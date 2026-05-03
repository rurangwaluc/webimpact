import Link from "next/link";
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";

const bullets = [
  "Website, system, or SaaS idea",
  "Manual work slowing your business",
  "No visibility on sales, cash, or operations",
  "Need to automate or scale what already works",
];

export function FinalCtaSection() {
  return (
    <section className="px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#0b0b0b] dark:shadow-black/20">
          {/* glow accents */}
          <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-[28rem] w-[28rem] rounded-full bg-black/[0.05] blur-3xl dark:bg-white/10" />

          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:p-14 xl:p-16">
            {/* LEFT — MESSAGE */}
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                Start here
              </p>

              <h2 className="mt-4 max-w-2xl text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1] tracking-[-0.06em] text-black dark:text-white">
                Your business already has the problem.
                <br className="hidden sm:block" />
                Let’s build the system that fixes it.
              </h2>

              <p className="mt-6 max-w-xl text-[15px] leading-7 text-black/65 dark:text-white/65">
                WebImpact Lab is a software development company in Rwanda helping
                businesses turn websites, dashboards, SaaS platforms, and
                automation into real systems that drive sales, visibility, and
                control.
              </p>

              <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-black/80 dark:text-white/80">
                You don’t need more ideas. You need a system that works.
              </p>

              {/* BULLETS */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {bullets.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white p-4 text-sm font-bold text-black/75 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#fd5b38]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — ACTION PANEL */}
            <div className="rounded-[2.25rem] border border-black/10 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#111111] sm:p-8">
              <div className="flex flex-col justify-between gap-8">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                    Free consultation
                  </p>

                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                    Tell us what you’re trying to build or fix.
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-black/60 dark:text-white/60">
                    We’ll help you break it down into a clear system, scope, and
                    next steps, before you spend money on the wrong solution.
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                  >
                    Start a project
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="https://wa.me/+250785587830"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-6 py-4 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </Link>
                </div>

                {/* TRUST NOTE */}
                <p className="text-center text-xs font-semibold text-black/45 dark:text-white/45">
                  No pressure. Just clarity on what your business actually needs.
                </p>
              </div>
            </div>
          </div>

          {/* bottom subtle strip */}
          <div className="border-t border-black/10 px-6 py-4 text-center text-sm font-semibold text-black/55 dark:border-white/10 dark:text-white/55 sm:px-10">
            Websites → Systems → Control → Growth
          </div>
        </div>
      </div>
    </section>
  );
}