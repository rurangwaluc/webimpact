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
      <div className="px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.05] dark:border-white/10 dark:bg-[#111111] sm:rounded-[2.5rem]">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative border-b border-black/10 p-5 dark:border-white/10 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#fd5b38]/15 blur-3xl" />

                <div className="relative">
                  <Link
                    href="/"
                    aria-label="WebImpact Lab home"
                    className="relative block h-11 w-[190px] overflow-hidden sm:h-14 sm:w-[245px]"
                  >
                    <Image
                      src={logoSrc}
                      alt="WebImpact Lab - Software development company in Rwanda"
                      fill
                      sizes="(max-width: 640px) 190px, 245px"
                      className="object-contain object-left"
                    />
                  </Link>

                  <h2 className="mt-7 max-w-xl text-[clamp(1.9rem,8vw,3.4rem)] font-semibold leading-[1] tracking-[-0.06em] text-black dark:text-white">
                    Build the system your business should already be running on.
                  </h2>

                  <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/62 dark:text-white/62">
                    WebImpact Lab builds websites, business systems, dashboards,
                    SaaS platforms, and automation tools for businesses that
                    need customers, control, and growth.
                  </p>

                  <div className="mt-7 grid gap-3 min-[430px]:grid-cols-2">
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

              <div className="grid">
                <div className="grid gap-0 min-[520px]:grid-cols-2">
                  <FooterLinkGroup title="Services" items={services} />
                  <FooterLinkGroup title="Company" items={company} />
                </div>

                <div className="border-t border-black/10 p-5 dark:border-white/10 sm:p-8 lg:p-10">
                  <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
                        Reach us
                      </h3>

                      <div className="mt-5 grid gap-3">
                        <ContactItem icon={MapPin} text="Kigali, Rwanda" />

                        <ContactItem
                          icon={Mail}
                          href="mailto:hello@webimpactlab.com"
                          text="hello@webimpactlab.com"
                        />

                        <ContactItem
                          icon={MessageCircle}
                          href="https://wa.me/+250785587830"
                          text="WhatsApp consultation"
                        />
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04] sm:rounded-[1.75rem]">
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

            <div className="border-t border-black/10 px-5 py-5 dark:border-white/10 sm:px-8">
              <div className="grid gap-2 text-center text-xs font-semibold text-black/45 dark:text-white/45 sm:flex sm:items-center sm:justify-between sm:text-left">
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

function FooterLinkGroup({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="border-b border-black/10 p-5 dark:border-white/10 min-[520px]:border-b-0 min-[520px]:border-r min-[520px]:last:border-r-0 sm:p-8 lg:p-10">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
        {title}
      </h3>

      <nav className="mt-5 grid gap-2" aria-label={`Footer ${title}`}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-transparent bg-transparent px-3 py-3 text-sm font-bold text-black/65 transition hover:border-[#fd5b38]/20 hover:bg-[#fd5b38]/10 hover:text-[#fd5b38] dark:text-white/65"
          >
            <span>{item.label}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-45 transition group-hover:translate-x-1 group-hover:opacity-100" />
          </Link>
        ))}
      </nav>
    </div>
  );
}

function ContactItem({
  icon: Icon,
  text,
  href,
}: {
  icon: React.ElementType;
  text: string;
  href?: string;
}) {
  const className =
    "flex min-w-0 items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-bold text-black/62 transition hover:border-[#fd5b38]/30 hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/62";

  const content = (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fd5b38]/10 text-[#fd5b38]">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 truncate">{text}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <p className={className}>{content}</p>;
}