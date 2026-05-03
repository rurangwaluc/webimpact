import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
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
    <main className="overflow-x-hidden bg-white dark:bg-[#070707]">
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

      <section className="px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-[#f7f7f7] shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111]">
            <div className="pointer-events-none absolute right-[-150px] top-[-150px] h-[28rem] w-[28rem] rounded-full bg-[#fd5b38]/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-180px] left-[-140px] h-[30rem] w-[30rem] rounded-full bg-black/[0.05] blur-3xl dark:bg-white/10" />

            <div className="relative grid gap-8 p-5 sm:p-7 lg:grid-cols-[0.84fr_1.16fr] lg:items-stretch lg:p-10 xl:p-12">
              <div className="flex flex-col justify-between rounded-[2.25rem] border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#070707] sm:p-8">
                <div>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 text-sm font-black text-[#fd5b38] transition hover:gap-3"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Back to work
                  </Link>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.is_featured ? (
                      <span className="inline-flex rounded-full bg-[#fd5b38] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                        Featured case study
                      </span>
                    ) : null}

                    <span className="inline-flex rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-black/55 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
                      {project.project_type}
                    </span>
                  </div>

                  <h1 className="mt-5 max-w-3xl text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-black dark:text-white">
                     {project.title}
                  </h1>

                  <p className="mt-6 max-w-2xl text-[15px] leading-7 text-black/62 dark:text-white/62 sm:text-base">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
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
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-6 py-4 text-sm font-black text-black transition hover:border-[#fd5b38] hover:text-[#fd5b38] dark:border-white/10 dark:bg-white/[0.05] dark:text-white whitespace-nowrap"
                  >
                    Build something like this
                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                  </Link>
                </div>
              </div>

              <div className="group relative min-h-[430px] overflow-hidden rounded-[2.25rem] border border-black/10 bg-black shadow-2xl dark:border-white/10 sm:min-h-[560px] lg:min-h-full">
                {project.cover_image_url ? (
                  <div className="absolute inset-x-0 top-0 min-h-full translate-y-0 transition-transform duration-[10000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[50%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.cover_image_url}
                      alt={`${project.title} case study preview`}
                      className="h-auto min-h-full w-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="flex h-full min-h-[430px] w-full items-center justify-center">
                    <BriefcaseBusiness className="h-16 w-16 text-white/20" />
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 rounded-[1.75rem] border border-white/15 bg-black/45 p-4 text-white backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fd5b38]">
                    Case study preview
                  </p>

                  <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-white/78">
                    A real project example showing how strategy, interface,
                    systems thinking, and execution turn into a business asset.
                  </p>

                  {project.live_url ? (
                    <Link
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-black text-white transition hover:text-[#fd5b38]"
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

      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3">
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
        </div>
      </section>

      <section className="px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2.5rem] border border-black/10 bg-[#f7f7f7] p-6 shadow-2xl shadow-black/[0.06] dark:border-white/10 dark:bg-[#111111] sm:p-8">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fd5b38] text-white">
                <Sparkles className="h-5 w-5" />
              </div>

              <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#fd5b38]">
                Why this matters
              </p>

              <h2 className="mt-4 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1] tracking-[-0.055em] text-black dark:text-white">
                A case study should prove execution, not just design.
              </h2>

              <p className="mt-5 text-[15px] leading-7 text-black/60 dark:text-white/60">
                A beautiful interface is not enough. The real value is whether
                the work improves trust, helps users move faster, gives the
                owner more control, and supports future growth.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Clear user journey",
                "Trust-building presentation",
                "Owner-focused control",
                "Growth-ready structure",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[2rem] border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#111111]"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#fd5b38]" />
                  <p className="mt-5 text-lg font-semibold tracking-[-0.04em] text-black dark:text-white">
                    {item}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-black/55 dark:text-white/55">
                    Built to support a real business outcome, not just fill a
                    portfolio section.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-28">
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
    <article className="flex min-h-[360px] flex-col rounded-[2.25rem] border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/[0.08] dark:border-white/10 dark:bg-[#111111] sm:p-7">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#fd5b38] text-white">
        <Icon className="h-5 w-5" />
      </div>

      <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-[#fd5b38]">
        {label}
      </p>

      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-black dark:text-white">
        {title}
      </h2>

      <div className="mt-4 max-h-[360px] overflow-y-auto pr-2">
        <p className="whitespace-pre-line text-sm leading-7 text-black/60 dark:text-white/60">
          {text}
        </p>
      </div>
    </article>
  );
}