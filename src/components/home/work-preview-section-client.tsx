import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  Search,
} from "lucide-react";
import type { WorkProject } from "@/lib/cms/work";

export function WorkPreviewSectionClient({
  projects,
}: {
  projects: WorkProject[];
}) {
  const featuredProjects = projects.slice(0, 5);

  if (featuredProjects.length === 0) {
    return (
      <section className="px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px bg-black/10 dark:bg-white/10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="bg-[#f7f7f7] p-5 dark:bg-[#111111] sm:p-8">
              <div className="grid h-14 w-14 place-items-center bg-[#fd5b38] text-white">
                <Search className="h-6 w-6" />
              </div>
              <h2 className="mt-6 max-w-2xl text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                Featured work will appear here soon.
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/60 dark:text-white/60">
                The homepage should only show proof strong enough to sell trust.
                Mark the strongest published projects as featured from the work
                manager.
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

  const mainProject = featuredProjects[0];
  const otherProjects = featuredProjects.slice(1, 5);

  return (
    <section className="px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 border-y border-black/10 py-6 dark:border-white/10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
              Proof
            </p>

            <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-black dark:text-white">
              Real work built for business trust, control, and growth.
            </h2>

            <p className="mt-4 max-w-2xl text-[15px] font-medium leading-7 text-black/60 dark:text-white/60">
              Enough examples to understand the standard. Not a long gallery.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center justify-center gap-2 bg-black/[0.055] px-5 py-3 text-sm font-black text-black transition hover:bg-black hover:text-white dark:bg-white/[0.08] dark:text-white dark:hover:bg-white dark:hover:text-black"
          >
            View all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-px bg-black/10 dark:bg-white/10 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          <article className="self-start bg-white dark:bg-[#111111]">
            <WorkImage
              project={mainProject}
              heightClass="h-[220px] sm:h-[300px] lg:h-[340px]"
              priority
            />

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 bg-[#fd5b38] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Featured proof
                </span>

                <span className="inline-flex items-center bg-black/[0.055] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-black/55 dark:bg-white/[0.08] dark:text-white/55">
                  {mainProject.project_type}
                </span>
              </div>

              <h3 className="mt-5 max-w-3xl text-[clamp(1.55rem,4vw,2.35rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-black dark:text-white">
                {mainProject.title}
              </h3>

              <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-black/60 dark:text-white/60">
                {mainProject.summary}
              </p>

              <div className="mt-5 grid gap-px bg-black/10 dark:bg-white/10 min-[700px]:grid-cols-3">
                <ProofBlock label="Problem" text={mainProject.problem} />
                <ProofBlock label="Built" text={mainProject.solution} />
                <ProofBlock label="Result" text={mainProject.result} />
              </div>

              <div className="mt-5 flex flex-col gap-3 min-[430px]:flex-row">
                <Link
                  href={`/work/${mainProject.slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#fd5b38] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e84a2b]"
                >
                  Read case study
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {mainProject.live_url ? (
                  <Link
                    href={mainProject.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-black/[0.055] px-5 py-3 text-sm font-black text-black transition hover:bg-black hover:text-white dark:bg-white/[0.08] dark:text-white dark:hover:bg-white dark:hover:text-black"
                  >
                    Visit live project
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </div>
          </article>

          <div className="grid gap-px bg-black/10 dark:bg-white/10 md:grid-cols-2 xl:self-start">
            {otherProjects.map((project, index) => (
              <SmallWorkCard
                key={project.id}
                project={project}
                className={index > 1 ? "hidden sm:grid" : ""}
              />
            ))}

            <Link
              href="/work"
              className="group flex items-center justify-between gap-4 bg-[#101010] p-5 text-white transition hover:bg-[#161616] md:col-span-2 xl:col-span-2"
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
                    Projects with problem, system, and result.
                  </span>
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-[#fd5b38] transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SmallWorkCard({
  project,
  className = "",
}: {
  project: WorkProject;
  className?: string;
}) {
  return (
    <article className={`group grid bg-white transition hover:bg-[#f8f8f8] dark:bg-[#111111] dark:hover:bg-[#151515] ${className}`}>
      <WorkImage
        project={project}
        heightClass="h-[180px] sm:h-[210px] lg:h-[230px] xl:h-[210px]"
        small
      />

      <div className="flex min-w-0 flex-col justify-between p-5">
        <div>
          <span className="inline-flex max-w-full bg-black/[0.055] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-black/55 dark:bg-white/[0.08] dark:text-white/55">
            {project.project_type}
          </span>

          <h3 className="mt-4 line-clamp-2 text-xl font-semibold leading-[1.05] tracking-[-0.05em] text-black transition group-hover:text-[#fd5b38] dark:text-white sm:text-2xl">
            {project.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-black/60 dark:text-white/55">
            {project.summary}
          </p>
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
      <p className="mt-2 line-clamp-3 text-sm font-bold leading-6 text-black/66 dark:text-white/66">
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
          className="h-full w-full object-cover object-top opacity-92 transition duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#111111]">
          <BriefcaseBusiness className="h-16 w-16 text-white/20" />
        </div>
      )}

      {small ? (
        <div className="absolute left-4 top-4 bg-black/55 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white/70 backdrop-blur-xl">
          Proof
        </div>
      ) : null}
    </Link>
  );
}
