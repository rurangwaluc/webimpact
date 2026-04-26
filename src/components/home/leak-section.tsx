import Link from "next/link";
import { ArrowRight } from "lucide-react";

const leaks = [
  {
    number: "01",
    title: "Your offer is unclear",
    pain: "People visit your website, but they do not quickly understand what you do, why it matters, or why they should trust you.",
    fix: "We turn your message into a clear business offer that makes buying easier.",
  },
  {
    number: "02",
    title: "Your sales process leaks leads",
    pain: "Customers message you on WhatsApp, call, email, or visit — but there is no proper follow-up system.",
    fix: "We build connected websites, dashboards, and business systems that track every lead and move them toward a sale.",
  },
  {
    number: "03",
    title: "Your operations depend on memory",
    pain: "Stock, staff work, orders, payments, and reports are handled manually, which creates mistakes and hidden losses.",
    fix: "We build custom software and internal systems that show what is happening in real time.",
  },
  {
    number: "04",
    title: "Your decisions are based on guessing",
    pain: "If you cannot see your numbers clearly, you cannot know what to fix, scale, or stop.",
    fix: "We create reporting systems that show sales, customers, cash, performance, and growth signals.",
  },
];

export function LeakSection() {
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="border-y border-black/10 py-10 dark:border-white/10 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                Business diagnostic
              </p>

              <h2 className="mt-4 max-w-md text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                Before we build anything, we find where the money is leaking.
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-7 text-black/60 dark:text-white/60">
                Most businesses in Rwanda and East Africa do not need more
                marketing first, they need better systems. As a software
                development company in Rwanda, we look at your website, sales
                flow, operations, and data, then build what actually drives
                customers, control, and growth.
              </p>

              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e84a2b]"
              >
                Get the diagnostic
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="divide-y divide-black/10 dark:divide-white/10">
              {leaks.map((item) => (
                <article
                  key={item.number}
                  className="grid gap-5 py-7 first:pt-0 last:pb-0 sm:grid-cols-[88px_1fr]"
                >
                  <div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-sm font-black text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04]">
                      {item.number}
                    </span>
                  </div>

                  <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-black dark:text-white">
                      {item.title}
                    </h3>

                    <div>
                      <p className="text-sm leading-6 text-black/60 dark:text-white/60">
                        <span className="font-black text-black dark:text-white">
                          Leak:
                        </span>{" "}
                        {item.pain}
                      </p>

                      <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
                        <span className="font-black text-[#fd5b38]">Fix:</span>{" "}
                        {item.fix}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}