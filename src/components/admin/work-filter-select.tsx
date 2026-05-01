"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type FilterOption = {
  label: string;
  value: string;
};

type FilterKey = "status" | "featured";

function buildHref({
  filterKey,
  nextValue,
  status,
  featured,
  q,
}: {
  filterKey: FilterKey;
  nextValue: string;
  status: string;
  featured: string;
  q: string;
}) {
  const params = new URLSearchParams();

  if (q) params.set("q", q);

  const nextStatus = filterKey === "status" ? nextValue : status;
  const nextFeatured = filterKey === "featured" ? nextValue : featured;

  if (nextStatus !== "all") params.set("status", nextStatus);
  if (nextFeatured !== "all") params.set("featured", nextFeatured);

  const query = params.toString();

  return query ? `/admin/work?${query}` : "/admin/work";
}

export function WorkFilterSelect({
  filterKey,
  label,
  value,
  options,
  status,
  featured,
  q,
}: {
  filterKey: FilterKey;
  label: string;
  value: string;
  options: FilterOption[];
  status: string;
  featured: string;
  q: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        onBlur={(event) => {
          if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
            setOpen(false);
          }
        }}
        className="flex min-w-[180px] items-center justify-between gap-3 rounded-full border border-black/10 bg-black/[0.025] px-5 py-3.5 text-left text-sm font-black text-black/75 outline-none transition hover:border-[#fd5b38]/40 hover:bg-[#fd5b38]/10 focus:border-[#fd5b38]/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75 dark:hover:border-[#fd5b38]/40"
      >
        <span>{label}</span>
        <ArrowRight
          className={`h-4 w-4 rotate-90 text-[#fd5b38] transition ${
            open ? "-rotate-90" : ""
          }`}
        />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.55rem)] z-50 overflow-hidden rounded-2xl border border-black/10 bg-white p-1.5 shadow-2xl shadow-black/15 dark:border-white/10 dark:bg-[#151515]">
          {options.map((option) => {
            const active = option.value === value;

            return (
              <Link
                key={option.value}
                href={buildHref({
                  filterKey,
                  nextValue: option.value,
                  status,
                  featured,
                  q,
                })}
                onClick={() => setOpen(false)}
                className={
                  active
                    ? "flex items-center justify-between rounded-xl bg-[#fd5b38] px-3.5 py-3 text-sm font-black text-white"
                    : "flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold text-black/70 transition hover:bg-black/[0.04] hover:text-black dark:text-white/70 dark:hover:bg-white/[0.06] dark:hover:text-white"
                }
              >
                {option.label}
                {active ? <CheckCircle2 className="h-4 w-4" /> : null}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}