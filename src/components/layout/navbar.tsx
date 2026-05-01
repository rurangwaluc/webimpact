"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
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
  {
    href: "/industries",
    label: "Industries",
    hint: "Rwanda and East Africa businesses",
  },
  { href: "/about", label: "About", hint: "Who builds your systems" },
  { href: "/blog", label: "Blog", hint: "Software, SEO and growth insights" },
  {
    href: "/contact",
    label: "Contact",
    hint: "Start with a free consultation",
  },
];

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrollSnapshot() {
  return window.scrollY > 10;
}

function getServerSnapshot() {
  return false;
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerSnapshot,
  );

  const { resolvedTheme, setTheme } = useTheme();
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setThemeReady(true));
    return () => cancelAnimationFrame(id);
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

  // dark mode uses logo.webp, light mode uses darkLogo.webp
  // before theme is ready, use darkLogo.webp to avoid hydration mismatch.
  const logoSrc = themeReady && isDark ? "/logo.webp" : "/darkLogo.webp";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-black/10 bg-white/80 shadow-lg shadow-black/5 backdrop-blur-2xl dark:border-white/10 dark:bg-[#070707]/80"
            : "border-b border-transparent bg-white dark:bg-[#070707]",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 transition-all duration-300 sm:px-5",
            scrolled ? "py-2.5" : "py-4",
          )}
        >
          <Link
            href="/"
            className="group relative block h-11 w-[172px] min-w-0 overflow-hidden sm:h-14 sm:w-[250px]"
            onClick={() => setOpen(false)}
            aria-label="WebImpact Lab software development company in Rwanda"
          >
            <Image
              src={logoSrc}
              alt="WebImpact Lab - Software development company in Rwanda"
              fill
              priority
              sizes="(max-width: 640px) 172px, 250px"
              className="object-contain object-left transition duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm font-bold text-black/65 transition hover:text-[#fd5b38] dark:text-white/65 dark:hover:text-[#fd5b38]"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-[#fd5b38] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Toggle dark and light mode"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-black/[0.03] text-black shadow-sm transition hover:-translate-y-0.5 hover:border-[#fd5b38]/40 hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:text-[#fd5b38]"
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
              className="hidden rounded-full bg-[#fd5b38] px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/20 transition hover:-translate-y-0.5 hover:bg-[#e84a2b] md:inline-flex"
            >
              Free Consultation
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className={cn(
                "group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border shadow-sm transition lg:hidden",
                open
                  ? "border-[#fd5b38] bg-[#fd5b38] text-white"
                  : "border-black/10 bg-black/[0.03] text-black hover:border-[#fd5b38]/40 hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:text-[#fd5b38]",
              )}
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-[#fd5b38]/10 transition group-hover:scale-100" />
              {open ? (
                <X className="relative h-5 w-5" />
              ) : (
                <Menu className="relative h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/35 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      />

      <aside
        className={cn(
          "fixed bottom-0 right-0 top-0 z-50 w-[88%] max-w-[390px] border-l border-black/10 bg-white shadow-2xl shadow-black/20 transition-transform duration-300 dark:border-white/10 dark:bg-[#070707] lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Mobile menu"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="relative h-11 w-[178px] overflow-hidden"
              aria-label="WebImpact Lab home"
            >
              <Image
                src={logoSrc}
                alt="WebImpact Lab - Software development company in Rwanda"
                fill
                priority
                sizes="178px"
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

          <div className="flex-1 overflow-y-auto px-5 py-6">
            <div className="rounded-[1.75rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#fd5b38]">
                Software Development Rwanda
              </p>
              <h2 className="mt-3 text-2xl font-black leading-tight text-black dark:text-white">
                Websites, systems, SaaS and automation for businesses that want
                growth and control.
              </h2>
              <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
                We help companies in Rwanda and East Africa replace weak online
                presence and manual workflows with digital systems that sell,
                track and scale.
              </p>
            </div>

            <nav className="mt-6 grid gap-3" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-3xl border border-black/10 bg-black/[0.02] p-4 transition hover:border-[#fd5b38]/40 hover:bg-[#fd5b38]/10 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <span>
                    <span className="block text-base font-black text-black dark:text-white">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-black/50 dark:text-white/50">
                      {item.hint}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#fd5b38] transition group-hover:translate-x-1" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t border-black/10 p-5 dark:border-white/10">
            <div className="grid gap-3">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25"
              >
                Book a Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="https://wa.me/"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-4 text-sm font-black text-black transition hover:border-[#fd5b38]/40 hover:text-[#fd5b38] dark:border-white/10 dark:text-white"
              >
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}