import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

const projectInputs = [
  "What is broken today?",
  "What tools or manual work are you using now?",
  "What result would make this worth building?",
];

export function FinalCtaSection() {
  return (
    <section className="px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[16px] border border-black/10 bg-[#0b0b0b] text-white shadow-2xl shadow-black/[0.12] dark:border-white/10">
          <div className="pointer-events-none absolute right-[-160px] top-[-160px] h-[30rem] w-[30rem] rounded-full bg-[#fd5b38]/24 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-200px] left-[-180px] h-[32rem] w-[32rem] rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:p-12 xl:p-14">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                Start the right conversation
              </p>

              <h2 className="mt-4 max-w-3xl text-[clamp(2.15rem,5vw,4rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-white">
                Bring the business problem. We will define the system.
              </h2>

              <p className="mt-6 max-w-2xl text-[15px] font-medium leading-7 text-white/68 sm:text-base sm:leading-8">
                The first step is not asking for a quote. It is identifying the
                constraint, the outcome, and the simplest software path that can
                create trust, control, or growth.
              </p>

              <div className="mt-7 grid gap-3 min-[680px]:grid-cols-3">
                {projectInputs.map((input) => (
                  <div
                    key={input}
                    className="flex items-start gap-3 rounded-[14px] border border-white/10 bg-white/[0.06] p-4 text-sm font-bold leading-6 text-white/76"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#fd5b38]" />
                    {input}
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[16px] border border-white/10 bg-white p-5 text-black shadow-2xl shadow-black/20 dark:bg-[#111111] dark:text-white sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                Project intake
              </p>

              <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.045em]">
                Good projects start with sharp constraints, not vague feature
                lists.
              </h3>

              <p className="mt-4 text-sm font-medium leading-6 text-black/60 dark:text-white/60">
                Send the current problem and the outcome you want. We will help
                turn it into a focused build direction.
              </p>

              <div className="mt-6 grid gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="https://wa.me/+250785587830"
                  className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-black/10 bg-black/[0.03] px-6 py-4 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </Link>
              </div>

              <div className="mt-6 rounded-[14px] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#fd5b38]">
                  Best fit
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-black/70 dark:text-white/70">
                  Founders, owners, and operators who want software tied to a
                  serious business outcome.
                </p>
              </div>
            </aside>
          </div>

          <div className="relative border-t border-white/10 px-5 py-4 text-center text-sm font-bold text-white/54 sm:px-8">
            Rwanda-first. East Africa-ready. Built like serious software.
          </div>
        </div>
      </div>
    </section>
  );
}
