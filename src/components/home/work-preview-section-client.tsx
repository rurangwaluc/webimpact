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
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-8 text-center dark:border-white/10 dark:bg-[#111111] sm:p-12">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fd5b38] text-white">
              <Search className="h-6 w-6" />
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
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
  const otherProjects = featuredProjects.slice(1);

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

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.article
            initial={{ opacity: 0, y: 36, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: smoothEase }}
            className="group overflow-hidden rounded-[2.5rem] border border-black/10 bg-white shadow-2xl shadow-black/[0.06] transition duration-500 hover:-translate-y-1 hover:shadow-black/[0.12] dark:border-white/10 dark:bg-[#111111]"
          >
            <WorkImage
              project={mainProject}
              heightClass="h-[440px] sm:h-[560px] lg:h-[640px]"
              priority
              large
            />

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#fd5b38] px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-white">
                  <Star className="h-3.5 w-3.5" />
                  Featured
                </span>

                <span className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
                  {mainProject.project_type}
                </span>
              </div>

              <h3 className="mt-5 max-w-3xl text-[clamp(1.8rem,4.8vw,3.1rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-black dark:text-white">
                {mainProject.title}
              </h3>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-black/60 dark:text-white/60">
                {mainProject.summary}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

          <div className="grid gap-6">
            {otherProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                  ease: smoothEase,
                }}
                className="group grid overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#111111] sm:grid-cols-[0.95fr_1.05fr] lg:grid-cols-1 xl:grid-cols-[0.95fr_1.05fr]"
              >
                <WorkImage
                project={project}
                heightClass="h-[260px] sm:h-full lg:h-[260px] xl:h-full"
                scroll={false}
              />

                <div className="flex flex-col justify-between p-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
                        {project.project_type}
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fd5b38]/20 bg-[#fd5b38]/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#fd5b38]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Case study
                      </span>
                    </div>

                    <h3 className="mt-5 line-clamp-2 text-2xl font-semibold leading-tight tracking-[-0.045em] text-black dark:text-white">
                      {project.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/60 dark:text-white/60">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
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
                        className="inline-flex items-center gap-2 text-sm font-black text-black/70 transition hover:text-[#fd5b38] dark:text-white/70"
                      >
                        Visit
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            ))}

            {featuredProjects.length === 1 ? (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.65, ease: smoothEase }}
                className="rounded-[2rem] border border-dashed border-black/15 bg-black/[0.025] p-8 dark:border-white/15 dark:bg-white/[0.04]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
                  More featured projects are coming.
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/60 dark:text-white/60">
                  The homepage can show up to four featured projects. Add more
                  from the work manager when they are strong enough to represent
                  the brand.
                </p>

                <Link
                  href="/work"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition hover:gap-3"
                >
                  View all work
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkImage({
  project,
  heightClass,
  priority = false,
  large = false,
  scroll = true,
}: {
  project: WorkProject;
  heightClass: string;
  priority?: boolean;
  large?: boolean;
  scroll?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`View ${project.title} case study`}
      className={`relative block overflow-hidden bg-black ${heightClass}`}
    >
      <div className="absolute left-4 right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-xl sm:left-5 sm:right-auto">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-[11px] font-black uppercase tracking-[0.12em] text-white/70">
          {project.project_type}
        </span>
      </div>

      {project.cover_image_url ? (
  <div
    className={
      scroll
        ? "absolute inset-x-0 top-0 min-h-full translate-y-0 transition-transform duration-[9000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[55%]"
        : "absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
    }
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={project.cover_image_url}
      alt={`${project.title} case study preview`}
      loading={priority ? "eager" : "lazy"}
      className={
        scroll
          ? "h-auto min-h-full w-full object-cover object-top"
          : "h-full w-full object-cover object-top"
      }
    />
  </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#111111]">
          <BriefcaseBusiness className="h-16 w-16 text-white/20" />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/88 via-black/20 to-black/5 transition-opacity duration-700 group-hover:from-black/78" />

      <div className="absolute bottom-5 left-5 right-5 z-20 text-white transition duration-700 group-hover:-translate-y-1">
        <p className="text-xs font-bold text-white/65">{project.project_type}</p>
        <h3
          className={
            large
              ? "mt-2 text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[0.9] tracking-[-0.075em]"
              : "mt-1 text-2xl font-semibold tracking-[-0.055em]"
          }
        >
          {project.title}
        </h3>
      </div>

      <div className="pointer-events-none absolute right-5 top-5 z-30 hidden h-10 w-10 items-center justify-center rounded-full bg-[#fd5b38] text-white opacity-0 shadow-lg shadow-[#fd5b38]/25 transition duration-500 group-hover:opacity-100 md:flex">
        <ExternalLink className="h-4 w-4" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 opacity-0 ring-1 ring-inset ring-[#fd5b38]/40 transition duration-700 group-hover:opacity-100" />
    </Link>
  );
}