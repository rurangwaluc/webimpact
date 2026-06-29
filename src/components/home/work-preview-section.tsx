import { WorkPreviewSectionClient } from "@/components/home/work-preview-section-client";
import { getPublishedWorkProjects } from "@/lib/cms/work";

export async function WorkPreviewSection() {
  const projects = await getPublishedWorkProjects();

  const visualProjects = projects
    .filter((project) => Boolean(project.cover_image_url))
    .slice(0, 5);

  return <WorkPreviewSectionClient projects={visualProjects} />;
}
