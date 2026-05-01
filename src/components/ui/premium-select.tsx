"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type PremiumSelectOption = {
  value: string;
  label: string;
  description?: string;
};

type PremiumSelectProps = {
  name: string;
  defaultValue: string;
  options: PremiumSelectOption[];
  placeholder?: string;
};

export function PremiumSelect({
  name,
  defaultValue,
  options,
  placeholder = "Select option",
}: PremiumSelectProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const selected =
    options.find((option) => option.value === value) || options[0] || null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input type="hidden" name={name} value={selected?.value || ""} />

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-black/10 bg-black/[0.025] px-4 py-[0.95rem] text-left text-sm font-black text-black/78 outline-none transition hover:border-[#fd5b38]/40 focus:border-[#fd5b38]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/78 dark:focus:bg-white/[0.06]"
      >
        <span className="min-w-0">
          <span className="block truncate">
            {selected?.label || placeholder}
          </span>

          {selected?.description ? (
            <span className="mt-1 block truncate text-xs font-semibold text-black/45 dark:text-white/45">
              {selected.description}
            </span>
          ) : null}
        </span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-black/45 transition dark:text-white/45 ${
            open ? "rotate-180 text-[#fd5b38]" : ""
          }`}
        />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-[1.5rem] border border-black/10 bg-white p-2 shadow-2xl shadow-black/15 dark:border-white/10 dark:bg-[#111111]">
          <div className="grid max-h-72 gap-1 overflow-y-auto">
            {options.map((option) => {
              const active = option.value === selected?.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setValue(option.value);
                    setOpen(false);
                  }}
                  className={
                    active
                      ? "flex w-full items-start justify-between gap-3 rounded-[1.15rem] bg-[#fd5b38] px-4 py-3 text-left text-white"
                      : "flex w-full items-start justify-between gap-3 rounded-[1.15rem] px-4 py-3 text-left text-black/75 transition hover:bg-black/[0.04] dark:text-white/75 dark:hover:bg-white/[0.06]"
                  }
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-black">
                      {option.label}
                    </span>

                    {option.description ? (
                      <span
                        className={
                          active
                            ? "mt-1 block text-xs font-semibold leading-5 text-white/75"
                            : "mt-1 block text-xs font-semibold leading-5 text-black/45 dark:text-white/45"
                        }
                      >
                        {option.description}
                      </span>
                    ) : null}
                  </span>

                  {active ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}