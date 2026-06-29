import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import type { WorkProject } from "@/lib/cms/work";

export function WorkPreviewSectionClient({
  projects,
}: {
  projects: WorkProject[];
}) {
  const visualProjects = projects
    .filter((project) => Boolean(project.cover_image_url))
    .slice(0, 5);

  if (visualProjects.length === 0) {
    return <EmptyWorkState />;
  }

  const mainProject = visualProjects[0];
  const sideProjects = visualProjects.slice(1, 5);

  return (
    <section className="px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-y border-black/10 py-6 dark:border-white/10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#fd5b38]">
              Proof
            </p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-black dark:text-white">
              Real systems. Real interfaces. Real business use.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] font-medium leading-7 text-black/60 dark:text-white/58">
              Visual proof first. Full context stays inside the case studies.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex w-full items-center justify-center gap-2 bg-black/[0.055] px-5 py-3 text-sm font-black text-black transition hover:bg-black hover:text-white dark:bg-white/[0.08] dark:text-white dark:hover:bg-white dark:hover:text-black sm:w-auto"
          >
            View all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 grid items-start gap-px bg-black/10 dark:bg-white/10 xl:grid-cols-[1.06fr_0.94fr]">
          <FeaturedWorkCard project={mainProject} />

          {sideProjects.length > 0 ? (
            <aside className="grid gap-px bg-black/10 dark:bg-white/10 sm:grid-cols-2">
              {sideProjects.map((project, index) => (
                <CompactWorkCard
                  key={project.id}
                  project={project}
                  className={index > 1 ? "hidden lg:grid" : ""}
                />
              ))}

              <Link
                href="/work"
                className="group flex items-center justify-between gap-4 bg-[#101010] p-5 text-white transition hover:bg-[#161616] sm:col-span-2"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center bg-[#fd5b38] text-white">
                    <BriefcaseBusiness className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black leading-5">
                      See the full proof library
                    </span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-white/52">
                      More real projects with screenshots and case studies.
                    </span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#fd5b38] transition group-hover:translate-x-1" />
              </Link>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function FeaturedWorkCard({ project }: { project: WorkProject }) {
  return (
    <article className="grid bg-white dark:bg-[#111111] lg:grid-cols-[0.98fr_1.02fr] xl:block">
      <WorkImage
        project={project}
        heightClass="h-[210px] sm:h-[280px] lg:h-full xl:h-[330px]"
        priority
      />

      <div className="flex min-h-full flex-col justify-between p-5 sm:p-6 lg:p-7">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 bg-[#fd5b38] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-white">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Featured proof
            </span>
            <span className="inline-flex bg-black/[0.055] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-black/55 dark:bg-white/[0.08] dark:text-white/55">
              {project.project_type}
            </span>
          </div>

          <h3 className="mt-5 max-w-3xl text-[clamp(1.65rem,4vw,2.35rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-black dark:text-white">
            {project.title}
          </h3>

        </div>

        <div className="mt-6 grid gap-px bg-black/10 dark:bg-white/10 min-[720px]:grid-cols-3">
          <ProofBlock label="Problem" text={project.problem} />
          <ProofBlock label="System" text={project.solution} />
          <ProofBlock label="Result" text={project.result} />
        </div>

        <div className="mt-6 flex flex-col gap-3 min-[430px]:flex-row">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center justify-center gap-2 bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e84a2b]"
          >
            Read case study
            <ArrowRight className="h-4 w-4" />
          </Link>

          {project.live_url ? (
            <Link
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-black/[0.055] px-5 py-3 text-sm font-black text-black transition hover:bg-black hover:text-white dark:bg-white/[0.08] dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              Live project
              <ExternalLink className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function CompactWorkCard({
  project,
  className = "",
}: {
  project: WorkProject;
  className?: string;
}) {
  return (
    <article
      className={`group grid bg-white transition hover:bg-[#f8f8f8] dark:bg-[#111111] dark:hover:bg-[#151515] ${className}`}
    >
      <WorkImage
        project={project}
        heightClass="h-[145px] sm:h-[165px] xl:h-[170px]"
        small
      />

      <div className="grid min-h-[145px] content-between p-5">
        <div>
          <span className="inline-flex max-w-full bg-black/[0.055] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-black/55 dark:bg-white/[0.08] dark:text-white/55">
            {project.project_type}
          </span>

          <h3 className="mt-4 line-clamp-2 text-xl font-semibold leading-[1.05] tracking-[-0.05em] text-black transition group-hover:text-[#fd5b38] dark:text-white sm:text-2xl">
            {project.title}
          </h3>

        </div>

        <Link
          href={`/work/${project.slug}`}
          className="mt-5 inline-flex items-center gap-2 border-t border-black/10 pt-4 text-sm font-black text-[#fd5b38] transition group-hover:gap-3 dark:border-white/10"
        >
          Read case study
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function ProofBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="bg-[#f7f7f7] p-4 dark:bg-white/[0.04]">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#fd5b38]">
        {label}
      </p>
      <p className="mt-2 line-clamp-2 text-sm font-bold leading-6 text-black/66 dark:text-white/66">
        {text}
      </p>
    </div>
  );
}

function WorkImage({
  project,
  heightClass,
  priority = false,
  small = false,
}: {
  project: WorkProject;
  heightClass: string;
  priority?: boolean;
  small?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`View ${project.title} case study`}
      className={`relative block overflow-hidden bg-black ${heightClass}`}
    >
      {project.cover_image_url ? (
        <img
          src={project.cover_image_url}
          alt={`${project.title} case study preview`}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover object-top opacity-95 transition duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#111111]">
          <BriefcaseBusiness className="h-16 w-16 text-white/20" />
        </div>
      )}

      {small ? (
        <div className="absolute left-4 top-4 bg-black/60 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white/72 backdrop-blur-xl">
          Proof
        </div>
      ) : null}
    </Link>
  );
}

function EmptyWorkState() {
  return (
    <section className="px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-px bg-black/10 dark:bg-white/10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[#f7f7f7] p-5 dark:bg-[#111111] sm:p-8">
            <div className="grid h-14 w-14 place-items-center bg-[#fd5b38] text-white">
              <BriefcaseBusiness className="h-6 w-6" />
            </div>
            <h2 className="mt-6 max-w-2xl text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
              Add visual published work to power this section.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/60 dark:text-white/60">
              The homepage should sell with real screenshots. Publish work
              projects with cover images and they will appear here.
            </p>
          </div>

          <img
            src="/work/bcs-full.webp"
            alt="Business system case study preview"
            className="h-[260px] w-full object-cover object-top sm:h-[340px] lg:h-full"
          />
        </div>
      </div>
    </section>
  );
}
