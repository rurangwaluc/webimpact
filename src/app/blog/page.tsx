import type { Metadata } from "next";
import { getPublishedBlogPosts } from "@/lib/cms/blog";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogPageClient } from "@/components/blog/blog-page-client";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical software, web development, business systems, dashboards, automation, and SaaS insights for businesses in Rwanda and East Africa.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | WebImpact Lab",
    description:
      "Practical articles about software, websites, dashboards, business systems, automation, and SaaS development.",
    url: "https://webimpactlab.com/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin =
    user?.email?.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();

  return (
    <main className="w-full max-w-full overflow-x-hidden">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "WebImpact Lab Blog",
          url: "https://webimpactlab.com/blog",
          description:
            "Software, web development, business systems, automation, dashboards, and SaaS insights for businesses.",
        }}
      />

      <BlogPageClient posts={posts} isAdmin={Boolean(isAdmin)} />
    </main>
  );
}