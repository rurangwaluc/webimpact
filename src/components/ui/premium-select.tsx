"use client";

import { useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

export type PremiumSelectOption = {
  value: string;
  label: string;
  description?: string;
};

export function PremiumSelect({
  name,
  options,
  defaultValue,
  placeholder = "Select option",
  searchable = true,
}: {
  name: string;
  options: PremiumSelectOption[];
  defaultValue?: string;
  placeholder?: string;
  searchable?: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const fallbackValue = defaultValue || options[0]?.value || "";
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(fallbackValue);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const selected = options.find((option) => option.value === value);

  const filteredOptions = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();

    if (!cleanQuery) return options;

    return options.filter((option) => {
      return (
        option.label.toLowerCase().includes(cleanQuery) ||
        option.value.toLowerCase().includes(cleanQuery) ||
        (option.description || "").toLowerCase().includes(cleanQuery)
      );
    });
  }, [options, query]);

  const safeActiveIndex =
    filteredOptions.length === 0
      ? 0
      : Math.min(activeIndex, filteredOptions.length - 1);

  function openDropdown() {
    setOpen(true);
    setActiveIndex(0);

    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
  }

  function closeDropdown() {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }

  function selectOption(option: PremiumSelectOption) {
    setValue(option.value);
    closeDropdown();
  }

  function handleTriggerClick() {
    if (open) {
      closeDropdown();
      return;
    }

    openDropdown();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!open && ["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      openDropdown();
      return;
    }

    if (!open) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeDropdown();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) =>
        current >= filteredOptions.length - 1 ? 0 : current + 1,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        current <= 0 ? Math.max(filteredOptions.length - 1, 0) : current - 1,
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      const option = filteredOptions[safeActiveIndex];

      if (option) {
        selectOption(option);
      }
    }
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  return (
    <div
      ref={wrapperRef}
      className="relative min-w-0"
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeDropdown();
        }
      }}
    >
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        onClick={handleTriggerClick}
        className="flex w-full min-w-0 items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white px-4 py-3 text-left text-sm font-bold text-black outline-none transition hover:border-[#fd5b38]/50 focus:border-[#fd5b38]/60 focus:shadow-[0_0_0_4px_rgb(253_91_56_/_0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate">
            {selected?.label || placeholder}
          </span>

          {selected?.description ? (
            <span className="mt-1 block truncate text-xs font-semibold text-black/50 dark:text-white/50">
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
        <div className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-50 w-full max-w-full overflow-hidden rounded-[1.5rem] border border-black/10 bg-white p-2 shadow-2xl shadow-black/15 dark:border-white/10 dark:bg-[#111111]">
          {searchable ? (
            <div className="relative mb-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35 dark:text-white/35" />
              <input
                ref={searchInputRef}
                value={query}
                onChange={(event) => handleQueryChange(event.target.value)}
                placeholder="Search options..."
                className="w-full min-w-0 rounded-[1rem] border border-black/10 bg-black/[0.025] py-3 pl-9 pr-3 text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:border-[#fd5b38]/50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35"
              />
            </div>
          ) : null}

          <div role="listbox" className="grid max-h-80 gap-1 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const isSelected = option.value === value;
                const isActive = index === safeActiveIndex;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      selectOption(option);
                    }}
                    className={
                      isSelected
                        ? "flex w-full min-w-0 items-start justify-between gap-3 rounded-[1.15rem] bg-[#fd5b38] px-4 py-3 text-left text-white"
                        : isActive
                          ? "flex w-full min-w-0 items-start justify-between gap-3 rounded-[1.15rem] bg-[#fd5b38]/10 px-4 py-3 text-left text-black transition dark:text-white"
                          : "flex w-full min-w-0 items-start justify-between gap-3 rounded-[1.15rem] px-4 py-3 text-left text-black/75 transition hover:bg-[#fd5b38]/10 dark:text-white/75"
                    }
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-black">
                        {option.label}
                      </span>

                      {option.description ? (
                        <span
                          className={
                            isSelected
                              ? "mt-1 block line-clamp-2 text-xs font-semibold leading-5 text-white/75"
                              : "mt-1 block line-clamp-2 text-xs font-semibold leading-5 text-black/45 dark:text-white/45"
                          }
                        >
                          {option.description}
                        </span>
                      ) : null}
                    </span>

                    {isSelected ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : null}
                  </button>
                );
              })
            ) : (
              <div className="rounded-[1.15rem] border border-dashed border-black/10 bg-black/[0.025] px-4 py-5 text-center text-sm font-bold text-black/45 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/45">
                No matching option.
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}