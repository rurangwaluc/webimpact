"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useTheme } from "next-themes";

const services = [
  { label: "Software Development", href: "/services/software-development" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Business Systems", href: "/services/business-systems" },
  { label: "SaaS Platforms", href: "/services/saas-development" },
  { label: "AI & Automation", href: "/services/ai-automation" },
];

const company = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const { resolvedTheme } = useTheme();
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setThemeReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isDark = resolvedTheme === "dark";
  const logoSrc = themeReady && isDark ? "/logo.webp" : "/darkLogo.webp";

  return (
    <footer className="border-t border-black/10 bg-white dark:border-white/10 dark:bg-[#070707]">
      <div className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.05] dark:border-white/10 dark:bg-[#111111] sm:rounded-[2.5rem]">
            <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
              <div className="relative border-b border-black/10 p-6 dark:border-white/10 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#fd5b38]/15 blur-3xl" />

                <div className="relative">
                  <Link
                    href="/"
                    aria-label="WebImpact Lab home"
                    className="relative block h-12 w-[210px] overflow-hidden sm:h-14 sm:w-[245px]"
                  >
                    <Image
                      src={logoSrc}
                      alt="WebImpact Lab - Software development company in Rwanda"
                      fill
                      sizes="(max-width: 640px) 210px, 245px"
                      className="object-contain object-left"
                    />
                  </Link>

                  <h2 className="mt-8 max-w-xl text-[clamp(2rem,8vw,3.4rem)] font-semibold leading-[1] tracking-[-0.06em] text-black dark:text-white">
                    Build the system your business should already be running on.
                  </h2>

                  <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/62 dark:text-white/62">
                    WebImpact Lab is a software development company in Rwanda
                    building websites, business systems, dashboards, SaaS
                    platforms, and automation tools for businesses that need
                    customers, control, and growth.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/20 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                    >
                      Start a project
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href="https://wa.me/+250785587830"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid gap-0 sm:grid-cols-2">
                <div className="border-b border-black/10 p-6 dark:border-white/10 sm:border-r sm:p-8 lg:p-10">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
                    Services
                  </h3>

                  <nav className="mt-5 grid gap-2" aria-label="Footer services">
                    {services.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center justify-between rounded-2xl px-0 py-2 text-sm font-bold text-black/65 transition hover:text-[#fd5b38] dark:text-white/65"
                      >
                        {item.label}
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="border-b border-black/10 p-6 dark:border-white/10 sm:p-8 lg:p-10">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
                    Company
                  </h3>

                  <nav className="mt-5 grid gap-2" aria-label="Footer company">
                    {company.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center justify-between rounded-2xl px-0 py-2 text-sm font-bold text-black/65 transition hover:text-[#fd5b38] dark:text-white/65"
                      >
                        {item.label}
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="p-6 sm:col-span-2 sm:p-8 lg:p-10">
                  <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
                        Reach us
                      </h3>

                      <div className="mt-5 grid gap-4 text-sm font-semibold text-black/62 dark:text-white/62">
                        <p className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 shrink-0 text-[#fd5b38]" />
                          Kigali, Rwanda
                        </p>

                        <Link
                          href="mailto:hello@webimpactlab.com"
                          className="flex items-center gap-3 break-all transition hover:text-[#fd5b38]"
                        >
                          <Mail className="h-4 w-4 shrink-0 text-[#fd5b38]" />
                          hello@webimpactlab.com
                        </Link>

                        <Link
                          href="https://wa.me/+250785587830"
                          className="flex items-center gap-3 transition hover:text-[#fd5b38]"
                        >
                          <MessageCircle className="h-4 w-4 shrink-0 text-[#fd5b38]" />
                          WhatsApp consultation
                        </Link>
                      </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
                      <div className="flex items-center gap-2 text-[#fd5b38]">
                        <Sparkles className="h-4 w-4" />
                        <p className="text-xs font-black uppercase tracking-[0.18em]">
                          Positioning
                        </p>
                      </div>

                      <p className="mt-4 text-xl font-semibold leading-tight tracking-[-0.04em] text-black dark:text-white">
                        Rwanda-first. East Africa-ready. Built like serious
                        software.
                      </p>

                      <p className="mt-3 text-sm leading-6 text-black/55 dark:text-white/55">
                        Websites, systems, SaaS platforms, and automation for
                        business owners who want more than decoration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-black/10 px-6 py-5 dark:border-white/10 sm:px-8">
              <div className="flex flex-col gap-3 text-xs font-semibold text-black/45 dark:text-white/45 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  © {new Date().getFullYear()} WebImpact Lab. All rights
                  reserved.
                </p>
                <p>Software development company in Rwanda.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}