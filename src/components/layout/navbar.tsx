"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/services",
    label: "Services",
    hint: "Websites, software, SaaS & automation",
  },
  { href: "/work", label: "Work", hint: "Real systems and case studies" },
  { href: "/about", label: "About", hint: "Who builds your systems" },
  { href: "/blog", label: "Blog", hint: "Software, SEO and growth insights" },
  {
    href: "/contact",
    label: "Contact",
    hint: "Start with a free consultation",
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeReady, setThemeReady] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setThemeReady(true);

    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const isDark = resolvedTheme === "dark";
  const logoSrc = themeReady && isDark ? "/logo.webp" : "/darkLogo.webp";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full px-3 pt-3 transition-opacity duration-300 sm:px-5",
          open ? "pointer-events-none opacity-0 lg:pointer-events-auto lg:opacity-100" : "",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border transition-all duration-300",
            scrolled
              ? "border-black/10 bg-white/82 px-3 py-2 shadow-2xl shadow-black/[0.08] backdrop-blur-2xl dark:border-white/10 dark:bg-[#070707]/82"
              : "border-black/5 bg-white/70 px-3 py-2.5 shadow-xl shadow-black/[0.04] backdrop-blur-xl dark:border-white/10 dark:bg-[#070707]/70",
          )}
        >
          <Link
            href="/"
            className="group relative block h-10 w-[160px] min-w-0 overflow-hidden sm:h-12 sm:w-[220px]"
            onClick={() => setOpen(false)}
            aria-label="WebImpact Lab home"
          >
            <Image
              src={logoSrc}
              alt="WebImpact Lab"
              fill
              priority
              sizes="(max-width: 640px) 160px, 220px"
              className="object-contain object-left transition duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-full border border-black/10 bg-black/[0.025] p-1 dark:border-white/10 dark:bg-white/[0.04] lg:flex"
            aria-label="Main navigation"
          >
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-full px-4 py-2 text-sm font-black text-black/60 transition hover:bg-white hover:text-[#fd5b38] hover:shadow-sm dark:text-white/60 dark:hover:bg-white/[0.08] dark:hover:text-[#fd5b38]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Toggle dark and light mode"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-black/[0.03] text-black shadow-sm transition hover:-translate-y-0.5 hover:border-[#fd5b38]/40 hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:text-[#fd5b38] sm:h-11 sm:w-11"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-[#fd5b38]/10 transition group-hover:scale-100" />
              {themeReady && isDark ? (
                <Sun className="relative h-[18px] w-[18px]" />
              ) : (
                <Moon className="relative h-[18px] w-[18px]" />
              )}
            </button>

            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/20 transition hover:-translate-y-0.5 hover:bg-[#e84a2b] md:inline-flex"
            >
              Book audit
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-black/[0.03] text-black shadow-sm transition hover:border-[#fd5b38]/40 hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:text-[#fd5b38] lg:hidden sm:h-11 sm:w-11"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-[#fd5b38]/10 transition group-hover:scale-100" />
              <Menu className="relative h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/45 p-3 backdrop-blur-md sm:p-5 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              className="mx-auto max-h-[calc(100svh-1.5rem)] max-w-[430px] overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-2xl shadow-black/25 dark:border-white/10 dark:bg-[#080808]"
              aria-label="Mobile menu"
            >
              <div className="relative">
                <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-[#fd5b38]/20 blur-3xl" />

                <div className="relative flex items-center justify-between gap-4 border-b border-black/10 p-5 dark:border-white/10">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="relative h-11 w-[176px] overflow-hidden"
                    aria-label="WebImpact Lab home"
                  >
                    <Image
                      src={logoSrc}
                      alt="WebImpact Lab"
                      fill
                      priority
                      sizes="176px"
                      className="object-contain object-left"
                    />
                  </Link>

                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#fd5b38] text-white shadow-lg shadow-[#fd5b38]/20"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="max-h-[calc(100svh-8.5rem)] overflow-y-auto p-3">
                  <div className="rounded-[1.5rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                      Rwanda-first systems company
                    </p>

                    <h2 className="mt-3 text-xl font-black leading-tight tracking-[-0.04em] text-black dark:text-white">
                      Websites, SaaS, dashboards and systems that create
                      business control.
                    </h2>
                  </div>

                  <nav className="mt-3 grid gap-2" aria-label="Mobile navigation">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.06 + index * 0.045,
                          duration: 0.28,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-center justify-between rounded-[1.35rem] border border-black/10 bg-black/[0.025] p-4 transition hover:border-[#fd5b38]/40 hover:bg-[#fd5b38]/10 dark:border-white/10 dark:bg-white/[0.04]"
                        >
                          <span>
                            <span className="block text-base font-black text-black dark:text-white">
                              {item.label}
                            </span>
                            <span className="mt-1 block text-xs font-semibold text-black/48 dark:text-white/48">
                              {item.hint}
                            </span>
                          </span>

                          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#fd5b38] shadow-sm transition group-hover:translate-x-1 dark:bg-white/[0.08]">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  <div className="mt-3 grid gap-3 min-[390px]:grid-cols-2">
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25"
                    >
                      Book audit
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href="https://wa.me/"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-4 text-sm font-black text-black transition hover:border-[#fd5b38]/40 hover:text-[#fd5b38] dark:border-white/10 dark:text-white"
                    >
                      WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}