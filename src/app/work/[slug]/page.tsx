import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Target,
} from "lucide-react";
import {
  getPublishedWorkProjectBySlug,
  getPublishedWorkProjects,
} from "@/lib/cms/work";
import { JsonLd } from "@/components/seo/json-ld";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = await getPublishedWorkProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedWorkProjectBySlug(slug);

  if (!project) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${project.title} Case Study`,
    description: project.summary,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} Case Study | WebImpact Lab`,
      description: project.summary,
      url: `https://webimpactlab.com/work/${project.slug}`,
      type: "article",
      images: project.cover_image_url
        ? [
            {
              url: project.cover_image_url,
              width: 1200,
              height: 630,
              alt: `${project.title} case study preview`,
            },
          ]
        : undefined,
    },
  };
}

export default async function WorkCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getPublishedWorkProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="bg-white dark:bg-[#070707]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          url: `https://webimpactlab.com/work/${project.slug}`,
          description: project.summary,
          creator: {
            "@type": "Organization",
            name: "WebImpact Lab",
            url: "https://webimpactlab.com",
          },
        }}
      />

      <section className="px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
            <div className="pointer-events-none absolute right-[-140px] top-[-140px] h-96 w-96 rounded-full bg-[#fd5b38]/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-[28rem] w-[28rem] rounded-full bg-black/[0.05] blur-3xl dark:bg-white/10" />

            <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:p-12 xl:p-16">
              <div className="flex flex-col justify-between">
                <div>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition hover:gap-3"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Back to work
                  </Link>

                  <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                    {project.project_type}
                  </p>

                  <h1 className="mt-4 max-w-4xl text-[clamp(2.1rem,5.8vw,4.65rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-black dark:text-white">
                    {project.title}
                  </h1>

                  <p className="mt-6 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62 sm:text-base">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 min-[460px]:flex-row">
                  {project.live_url ? (
                    <Link
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                    >
                      Visit project landing page
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : null}

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                  >
                    Build something like this
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="group relative min-h-[420px] overflow-hidden rounded-[2.25rem] border border-black/10 bg-black shadow-2xl dark:border-white/10 sm:min-h-[560px]">
                {project.cover_image_url ? (
                  <div className="absolute inset-x-0 top-0 min-h-full translate-y-0 transition-transform duration-[10000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[55%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.cover_image_url}
                      alt={`${project.title} case study preview`}
                      className="h-auto min-h-full w-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <BriefcaseBusiness className="h-16 w-16 text-white/20" />
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="flex flex-wrap gap-2">
                    {project.is_featured ? (
                      <span className="rounded-full bg-[#fd5b38] px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em]">
                        Featured
                      </span>
                    ) : null}

                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-white/75 backdrop-blur-xl">
                      {project.project_type}
                    </span>
                  </div>

                  {project.live_url ? (
                    <Link
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black shadow-xl transition hover:-translate-y-0.5 hover:bg-[#fd5b38] hover:text-white"
                    >
                      Open live project
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="relative border-t border-black/10 px-6 py-4 text-sm font-semibold text-black/55 dark:border-white/10 dark:text-white/55 sm:px-8 lg:px-12">
              Problem → System → Result → Trust
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <CaseBlock
            icon={Target}
            label="Problem"
            title="What needed to change"
            text={project.problem}
          />

          <CaseBlock
            icon={Lightbulb}
            label="Solution"
            title="What was built"
            text={project.solution}
          />

          <CaseBlock
            icon={ShieldCheck}
            label="Result"
            title="What improved"
            text={project.result}
          />
        </div>
      </section>

      <section className="px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8 lg:p-12">
            <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-80 w-80 rounded-full bg-[#fd5b38]/20 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                  Want this level of execution?
                </p>

                <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                  Let&apos;s build the system your business should already be
                  running on.
                </h2>

                <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/60 dark:text-white/60">
                  Tell us what you are trying to sell, control, automate, or
                  improve. We will help you decide what should be built first.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                {project.live_url ? (
                  <Link
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white"
                  >
                    Visit landing page
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                ) : null}

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fd5b38] px-6 py-4 text-sm font-black text-white shadow-lg shadow-[#fd5b38]/25 transition hover:-translate-y-0.5 hover:bg-[#e84a2b]"
                >
                  Start a project
                  <Rocket className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CaseBlock({
  icon: Icon,
  label,
  title,
  text,
}: {
  icon: React.ElementType;
  label: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-[2.25rem] border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#111111] sm:p-7">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
        <Icon className="h-5 w-5" />
      </div>

      <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
        {label}
      </p>

      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-black/60 dark:text-white/60">
        {text}
      </p>
    </article>
  );
}