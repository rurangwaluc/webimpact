import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublishedWorkProjects } from "@/lib/cms/work";

const projectSelections: Record<string, string[]> = {
  "software-development-company-rwanda": [
    "business-control-system-hardware-shop-management-software-rwanda",
    "storvex-electronics-store-management-software",
    "gizmocean-electronics-ecommerce-website-rwanda",
  ],
  "custom-business-software-rwanda": [
    "business-control-system-hardware-shop-management-software-rwanda",
    "sisters-fashion-shop-internal-management-system",
    "suparsale-store-business-management-system",
  ],
  "business-management-system-rwanda": [
    "business-control-system-hardware-shop-management-software-rwanda",
    "suparsale-store-business-management-system",
    "dispensary-inventory-management-system",
  ],
  "web-development-company-kigali": [
    "mimpex-furniture-ecommerce-website-kigali",
    "gizmocean-electronics-ecommerce-website-rwanda",
    "marvellous-technologies-electronics-ecommerce-website-kigali",
  ],
  "ecommerce-website-development-rwanda": [
    "gizmocean-electronics-ecommerce-website-rwanda",
    "grape-hardware-general-supplies-hardware-ecommerce-website-kigali",
    "inyanja-services-group-electronics-ecommerce-website-kigali",
  ],
  "saas-development-company-rwanda": [
    "storvex-electronics-store-management-software",
  ],
};

export async function SeoProjectEvidence({ seoSlug }: { seoSlug: string }) {
  const selectedSlugs = projectSelections[seoSlug];

  if (!selectedSlugs?.length) return null;

  const published = await getPublishedWorkProjects();
  const bySlug = new Map(published.map((project) => [project.slug, project]));

  const projects = selectedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((project) => project !== undefined);

  if (!projects.length) return null;

  return (
    <section className="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fd5b38]">
              Selected work
            </p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.85rem,4vw,3rem)] font-bold leading-tight tracking-[-0.05em]">
              Relevant projects we have built.
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#fd5b38]"
          >
            Explore all projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex min-w-0 flex-col border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#111111]"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#fd5b38]">
                {project.project_type}
              </p>
              <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight">
                {project.title}
              </h3>
              <p className="mt-4 line-clamp-4 text-sm leading-7 text-black/65 dark:text-white/65">
                {project.summary}
              </p>
              <Link
                href={`/work/${project.slug}`}
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-[#fd5b38]"
              >
                View project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
