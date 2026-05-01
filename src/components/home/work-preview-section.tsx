import { getFeaturedWorkProjects } from "@/lib/cms/work";
import { WorkPreviewSectionClient } from "@/components/home/work-preview-section-client";

export async function WorkPreviewSection() {
  const projects = await getFeaturedWorkProjects(3);

  return <WorkPreviewSectionClient projects={projects} />;
}