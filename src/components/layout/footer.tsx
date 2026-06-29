"use client";

import Image from "next/image";
import Link from "next/link";
import { type ElementType } from "react";
import { ArrowRight, Mail, MapPin, MessageCircle } from "lucide-react";

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
  return (
    <footer className="bg-white px-4 pb-5 dark:bg-[#070707] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden bg-[#f7f7f7] dark:bg-[#111111]">
        <div className="grid gap-px bg-black/10 dark:bg-white/10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="bg-[#101010] p-5 text-white sm:p-6 lg:p-7">
            <Link
              href="/"
              aria-label="WebImpact Lab home"
              className="relative block h-10 w-[180px] overflow-hidden sm:h-12 sm:w-[220px]"
            >
              <Image
                src="/logo.webp"
                alt="WebImpact Lab - Software development company in Rwanda"
                fill
                sizes="(max-width: 640px) 180px, 220px"
                className="object-contain object-left"
              />
            </Link>

            <p className="mt-5 max-w-md text-2xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-3xl">
              Serious software for companies that need control, speed, and clarity.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e84a2b]"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-px bg-black/10 dark:bg-white/10 md:grid-cols-[1fr_1fr_1.05fr]">
            <FooterLinkGroup title="Services" items={services} />
            <FooterLinkGroup title="Company" items={company} />

            <div className="grid gap-px bg-black/10 dark:bg-white/10">
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
        </div>

        <div className="grid gap-2 bg-white px-5 py-4 text-center text-xs font-semibold text-black/45 dark:bg-[#070707] dark:text-white/45 sm:flex sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} WebImpact Lab. All rights reserved.</p>
          <p>Rwanda-first. East Africa-ready. Built like serious software.</p>
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
    <div className="bg-[#f7f7f7] p-5 dark:bg-[#111111] sm:p-6">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
        {title}
      </h3>

      <nav className="mt-4 grid gap-1" aria-label={`Footer ${title}`}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between gap-3 px-0 py-2.5 text-sm font-bold text-black/65 transition hover:text-[#fd5b38] dark:text-white/65"
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
  icon: ElementType;
  text: string;
  href?: string;
}) {
  const className =
    "flex min-w-0 items-center gap-3 bg-white px-5 py-4 text-sm font-bold text-black/62 transition hover:text-[#fd5b38] dark:bg-[#111111] dark:text-white/62";

  const content = (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center bg-[#fd5b38] text-white">
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
