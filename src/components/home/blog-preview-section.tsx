import { getFeaturedBlogPosts } from "@/lib/cms/blog";
import { BlogPreviewSectionClient } from "@/components/home/blog-preview-section-client";

export async function BlogPreviewSection() {
  const posts = await getFeaturedBlogPosts(4);

  return <BlogPreviewSectionClient posts={posts} />;
}