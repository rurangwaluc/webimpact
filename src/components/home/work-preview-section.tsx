"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const featured = {
  name: "BCS",
  slug: "bcs",
  liveUrl: "https://bcsstaff.vercel.app",
  image: "/work/bcs-full.webp",
  type: "Business Control System",
  eyebrow: "Retail software Rwanda",
  headline:
    "A business control system for retail owners who need stock, cash, sales, and staff accountability in one place.",
  problem:
    "Retail businesses lose money when inventory, sales, payments, cash deposits, refunds, credits, and staff actions are tracked manually or scattered across different tools.",
  result:
    "BCS gives owners a structured retail operating system where every sale, payment, inventory movement, and cash action leaves a traceable record.",
  tags: [
    "Retail management system",
    "Inventory software",
    "Cash control",
    "Multi-branch system",
  ],
};

const secondary = [
  {
    name: "UMURANGA",
    slug: "umuranga",
    liveUrl: "https://umuranga.com",
    image: "/work/umuranga-full.webp",
    type: "Real Estate SaaS Platform",
    eyebrow: "Real estate platform Rwanda",
    headline:
      "A Rwanda-first property marketplace for listings, media, availability, and fast search.",
    summary:
      "UMURANGA shows SaaS platform capability: listing management, property search, media pipeline, availability tracking, and Rwanda-focused real estate browsing.",
    tags: ["Real estate SaaS", "Marketplace", "Meilisearch"],
  },
  {
    name: "Gizmocean",
    slug: "gizmocean",
    liveUrl: "https://gizmocean.com",
    image: "/work/gizmocean-full.webp",
    type: "E-commerce Website",
    eyebrow: "E-commerce website Rwanda",
    headline:
      "A product-focused online store built to improve trust, product discovery, and customer conversion.",
    summary:
      "Gizmocean shows client delivery capability: clean product presentation, e-commerce structure, conversion-focused UI, and a stronger online presence.",
    tags: ["Online store", "Product catalog", "Conversion"],
  },
];

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: smoothEase,
    },
  },
};

export function WorkPreviewSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid gap-8 border-b border-black/10 pb-10 dark:border-white/10 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
              Selected case studies
            </p>

            <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
              Real websites, business systems, and SaaS platforms we have built.
            </h2>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-black/60 dark:text-white/60">
              WebImpact Lab is a software development company in Rwanda building
              business systems, dashboards, SaaS platforms, marketplaces, and
              e-commerce websites for businesses that need more than a pretty
              homepage.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
          >
            View all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <motion.article
            initial={{ opacity: 0, y: 36, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: smoothEase }}
            className="group overflow-hidden rounded-[2.25rem] border border-black/10 bg-white shadow-2xl shadow-black/[0.06] transition duration-500 hover:-translate-y-1 hover:shadow-black/[0.12] dark:border-white/10 dark:bg-[#111111]"
          >
            <ScrollPreview
              image={featured.image}
              alt={`${featured.name} retail business control system case study by WebImpact Lab`}
              heightClass="h-[420px] sm:h-[560px] lg:h-[620px]"
              label={featured.eyebrow}
              title={featured.name}
              type={featured.type}
              liveUrl={featured.liveUrl}
              featured
            />

            <div className="p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                Featured system
              </p>

              <h3 className="mt-4 max-w-3xl text-[clamp(1.55rem,4vw,2.55rem)] font-semibold leading-[1.04] tracking-[-0.052em] text-black dark:text-white">
                {featured.headline}
              </h3>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-black/10 bg-black/[0.025] p-5 dark:border-white/10 dark:bg-white/[0.035]">
                  <p className="text-sm font-black text-black dark:text-white">
                    Business problem
                  </p>
                  <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
                    {featured.problem}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-[#fd5b38]/20 bg-[#fd5b38]/10 p-5">
                  <p className="text-sm font-black text-[#fd5b38]">Result</p>
                  <p className="mt-3 text-sm leading-6 text-black/65 dark:text-white/65">
                    {featured.result}
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-2 text-xs font-bold text-black/65 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/65"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#fd5b38]" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/work/${featured.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e84a2b]"
                >
                  View BCS case study
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href={featured.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                >
                  Visit live project
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.article>

          <div className="grid gap-6">
            {secondary.map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 30, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                  ease: smoothEase,
                }}
                className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#111111]"
              >
                <ScrollPreview
                  image={project.image}
                  alt={`${project.name} ${project.type} case study by WebImpact Lab`}
                  heightClass="h-[300px] sm:h-[360px] lg:h-[330px]"
                  label={project.eyebrow}
                  title={project.name}
                  type={project.type}
                  liveUrl={project.liveUrl}
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold leading-tight tracking-[-0.04em] text-black dark:text-white">
                    {project.headline}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
                    {project.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-2 text-xs font-bold text-black/65 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/65"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#fd5b38]" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition group-hover:gap-3"
                    >
                      View case study
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-black text-black transition hover:text-[#fd5b38] dark:text-white"
                    >
                      Visit live project
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollPreview({
  image,
  alt,
  heightClass,
  label,
  title,
  type,
  liveUrl,
  featured = false,
}: {
  image: string;
  alt: string;
  heightClass: string;
  label: string;
  title: string;
  type: string;
  liveUrl: string;
  featured?: boolean;
}) {
  return (
    <Link
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit live ${title} project`}
      className={`relative block overflow-hidden bg-black ${heightClass}`}
    >
      <div className="absolute left-4 right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-xl sm:left-5 sm:right-auto">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-[11px] font-black uppercase tracking-[0.12em] text-white/70">
          {label}
        </span>
      </div>

      <div className="absolute inset-x-0 top-0 min-h-full translate-y-0 transition-transform duration-[9000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[82%]">
        <Image
          src={image}
          alt={alt}
          width={1600}
          height={4200}
          className="h-auto min-h-full w-full object-cover object-top transition duration-[1200ms] group-hover:scale-[1.015]"
          priority={featured}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/88 via-black/22 to-black/8 transition-opacity duration-700 group-hover:from-black/78" />

      <div className="absolute bottom-5 left-5 right-5 z-20 text-white transition duration-700 group-hover:-translate-y-1 sm:bottom-6 sm:left-6 sm:right-6">
        <p className="text-xs font-bold text-white/65">{type}</p>
        <h3
          className={
            featured
              ? "mt-2 text-[clamp(2.4rem,7vw,4.8rem)] font-semibold leading-[0.9] tracking-[-0.075em]"
              : "mt-1 text-3xl font-semibold tracking-[-0.06em]"
          }
        >
          {title}
        </h3>
      </div>

      <div className="pointer-events-none absolute right-5 top-5 z-30 hidden h-10 w-10 items-center justify-center rounded-full bg-[#fd5b38] text-white opacity-0 shadow-lg shadow-[#fd5b38]/25 transition duration-500 group-hover:opacity-100 md:flex">
        <ExternalLink className="h-4 w-4" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 opacity-0 ring-1 ring-inset ring-[#fd5b38]/40 transition duration-700 group-hover:opacity-100" />
    </Link>
  );
}