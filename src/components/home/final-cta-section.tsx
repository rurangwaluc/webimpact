import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

const projectInputs = [
  "What is broken today?",
  "What manual work slows you down?",
  "What result makes the system worth it?",
];

export function FinalCtaSection() {
  return (
    <section className="px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-18 lg:pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-px overflow-hidden bg-black/10 text-white dark:bg-white/10 lg:grid-cols-[1fr_0.78fr]">
          <div className="bg-[#101010] p-5 sm:p-8 lg:p-10 xl:p-12">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
              Start the right conversation
            </p>

            <h2 className="mt-4 max-w-3xl text-[clamp(2.15rem,5vw,4rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
              Bring the business problem. We will define the system.
            </h2>

            <p className="mt-6 max-w-2xl text-[15px] font-medium leading-7 text-white/68 sm:text-base sm:leading-8">
              The first step is identifying the constraint, the outcome, and
              the simplest software path that can create trust, control, or growth.
            </p>

            <div className="mt-7 grid gap-px overflow-hidden bg-white/10 sm:grid-cols-3">
              {projectInputs.map((input) => (
                <div key={input} className="bg-[#181818] p-4">
                  <p className="text-sm font-black leading-5 text-white/78">
                    {input}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-[#f7f4ef] p-5 text-black dark:bg-[#111111] dark:text-white sm:p-7 lg:p-8">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#fd5b38]">
              Project intake
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em]">
              Good projects start with sharp constraints, not vague feature lists.
            </h3>
            <p className="mt-4 text-sm font-medium leading-6 text-black/62 dark:text-white/62">
              Send the business problem and the outcome you want. We will tell
              you if it is a good build direction.
            </p>

            <div className="mt-6 grid gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="https://wa.me/+250785587830"
                className="inline-flex items-center justify-center gap-2 bg-black/[0.06] px-5 py-3 text-sm font-black text-black transition hover:bg-black hover:text-white dark:bg-white/[0.08] dark:text-white dark:hover:bg-white dark:hover:text-black"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </Link>
            </div>

            <div className="mt-6 bg-[#fd5b38] p-4 text-white">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/70">
                Best fit
              </p>
              <p className="mt-2 text-sm font-black leading-6">
                Founders, owners, and operators who want software tied to a
                serious business outcome.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
