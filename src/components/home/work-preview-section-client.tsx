"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  Search,
  Star,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import type { WorkProject } from "@/lib/cms/work";

const smoothEase = [0.22, 1, 0.36, 1] as const;

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

export function WorkPreviewSectionClient({
  projects,
}: {
  projects: WorkProject[];
}) {
  const featuredProjects = projects.slice(0, 4);

  if (featuredProjects.length === 0) {
    return (
      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.25rem] border border-black/10 bg-[#f7f7f7] p-8 text-center dark:border-white/10 dark:bg-[#111111] sm:p-10">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fd5b38] text-white">
              <Search className="h-6 w-6" />
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
              Featured work will appear here soon.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-black/60 dark:text-white/60">
              Once projects are marked as featured, they will appear here
              automatically.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const mainProject = featuredProjects[0];
  const otherProjects = featuredProjects.slice(1, 3);

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid gap-6 border-b border-black/10 pb-8 dark:border-white/10 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
              Selected case studies
            </p>

            <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.1rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
              Real work built for business trust, control, and growth.
            </h2>

            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-black/60 dark:text-white/60">
              A small selection of websites, systems, dashboards, and platforms
              built to solve real business problems.
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

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
          <motion.article
            initial={{ opacity: 0, y: 36, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: smoothEase }}
            className="group flex min-h-[720px] flex-col overflow-hidden rounded-[2.25rem] border border-black/10 bg-white shadow-2xl shadow-black/[0.055] transition duration-500 hover:-translate-y-1 hover:shadow-black/[0.11] dark:border-white/10 dark:bg-[#111111] lg:min-h-[620px]"
          >
            <WorkImage
              project={mainProject}
              heightClass="h-[300px] sm:h-[360px] lg:h-[360px]"
              priority
              scroll
            />

            <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#fd5b38] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                    <Star className="h-3.5 w-3.5" />
                    Featured
                  </span>

                  <span className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
                    {mainProject.project_type}
                  </span>
                </div>

                <h3 className="mt-4 max-w-3xl text-[clamp(1.55rem,3.8vw,2.35rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-black dark:text-white">
                  {mainProject.title}
                </h3>

                <p className="mt-4 line-clamp-4 max-w-3xl text-sm leading-6 text-black/60 dark:text-white/60">
                  {mainProject.summary}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/work/${mainProject.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/20 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                >
                  View case study
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {mainProject.live_url ? (
                  <Link
                    href={mainProject.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-5 py-3 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                  >
                    Visit live project
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </div>
          </motion.article>

          <div className="grid gap-5 lg:grid-rows-2">
            {otherProjects.map((project, index) => (
              <SmallWorkCard key={project.id} project={project} index={index} />
            ))}

            {otherProjects.length === 0 ? (
              <ComingSoonCard />
            ) : null}

            {otherProjects.length === 1 ? (
              <ComingSoonCard compact />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function SmallWorkCard({
  project,
  index,
}: {
  project: WorkProject;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: smoothEase,
      }}
      className="group grid min-h-[350px] overflow-hidden rounded-[1.85rem] border border-black/10 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#111111] sm:grid-cols-[0.62fr_1.38fr] lg:min-h-0"
    >
      <WorkImage
        project={project}
        heightClass="h-[150px] sm:h-full lg:h-full"
        scroll
        small
      />

      <div className="flex min-w-0 flex-col justify-between p-5 sm:p-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex max-w-full items-center truncate rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
              {project.project_type}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fd5b38]/25 bg-[#fd5b38]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#fd5b38]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Case study
            </span>
          </div>

          <h3 className="mt-4 line-clamp-2 text-[1.35rem] font-semibold leading-[1.08] tracking-[-0.045em] text-black transition group-hover:text-[#fd5b38] dark:text-white">
            {project.title}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/60 dark:text-white/55">
            {project.summary}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/10 pt-4 dark:border-white/10">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition group-hover:gap-3"
          >
            View case study
            <ArrowRight className="h-4 w-4" />
          </Link>

          {project.live_url ? (
            <Link
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] text-black/60 transition hover:border-[#fd5b38] hover:bg-[#fd5b38] hover:text-white dark:border-white/10 dark:bg-white/[0.06] dark:text-white/65"
              aria-label={`Visit ${project.title}`}
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function ComingSoonCard({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "rounded-[1.85rem] border border-dashed border-black/15 bg-black/[0.025] p-6 dark:border-white/15 dark:bg-white/[0.04]"
          : "rounded-[1.85rem] border border-dashed border-black/15 bg-black/[0.025] p-6 dark:border-white/15 dark:bg-white/[0.04]"
      }
    >
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#fd5b38] text-white">
        <BriefcaseBusiness className="h-5 w-5" />
      </div>

      <h3 className="mt-5 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
        More featured projects are coming.
      </h3>

      <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
        Add more featured projects from the work manager when they are strong
        enough to represent the brand.
      </p>

      <Link
        href="/work"
        className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition hover:gap-3"
      >
        View all work
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function WorkImage({
  project,
  heightClass,
  priority = false,
  scroll = true,
  small = false,
}: {
  project: WorkProject;
  heightClass: string;
  priority?: boolean;
  scroll?: boolean;
  small?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`View ${project.title} case study`}
      className={`relative block overflow-hidden bg-black ${heightClass}`}
    >
      {project.cover_image_url ? (
        <div
          className={
            scroll
              ? small
                ? "absolute inset-x-0 top-0 min-h-full translate-y-0 transition-transform duration-[6500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[38%]"
                : "absolute inset-x-0 top-0 min-h-full translate-y-0 transition-transform duration-[8000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[42%]"
              : "absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.cover_image_url}
            alt={`${project.title} case study preview`}
            loading={priority ? "eager" : "lazy"}
            className={
              scroll
                ? small
                  ? "h-auto min-h-full w-full object-cover object-top opacity-85 transition-opacity duration-500 group-hover:opacity-100"
                  : "h-auto min-h-full w-full object-cover object-top"
                : "h-full w-full object-cover object-top"
            }
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#111111]">
          <BriefcaseBusiness className="h-16 w-16 text-white/20" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/52 via-black/10 to-transparent transition-opacity duration-700 group-hover:from-black/40" />

      {small ? (
        <div className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white/70 backdrop-blur-xl">
          Preview
        </div>
      ) : null}

      <div className="pointer-events-none absolute right-4 top-4 z-30 hidden h-10 w-10 items-center justify-center rounded-full bg-[#fd5b38] text-white opacity-0 shadow-lg shadow-[#fd5b38]/25 transition duration-500 group-hover:opacity-100 md:flex">
        <ExternalLink className="h-4 w-4" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 opacity-0 ring-1 ring-inset ring-[#fd5b38]/40 transition duration-700 group-hover:opacity-100" />
    </Link>
  );
}