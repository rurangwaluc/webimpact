"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function BlogCTAInline({
  title = "Need help implementing this?",
  description = "We build systems, dashboards, websites, and automation tools for businesses that want real control and growth.",
  primaryLabel = "Start a project",
  primaryHref = "/contact",
  secondaryLabel = "View our work",
  secondaryHref = "/work",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="my-14">
      <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8">
        {/* Glow */}
        <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-72 w-72 rounded-full bg-[#fd5b38]/20 blur-3xl" />

        <div className="relative">
          {/* Icon */}
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
            <Sparkles className="h-5 w-5" />
          </div>

          {/* Content */}
          <h3 className="mt-5 max-w-xl text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
            {title}
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-6 text-black/60 dark:text-white/60">
            {description}
          </p>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}