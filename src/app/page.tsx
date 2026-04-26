import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { HeroSection } from "@/components/home/hero-section";
import { LeakSection } from "@/components/home/leak-section";
import { ServicesPreviewSection } from "@/components/home/services-preview-section";
import { WorkPreviewSection } from "@/components/home/work-preview-section";
import { WhyChooseSection } from "@/components/home/why-choose-section";
import { ProcessSection } from "@/components/home/process-section";
import { BlogPreviewSection } from "@/components/home/blog-preview-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <main className="bg-white dark:bg-[#070707]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "WebImpact Lab",
          url: "https://webimpactlab.com",
          description:
            "Software development company in Rwanda building websites, SaaS platforms, business systems, dashboards, and automation tools.",
          areaServed: ["Rwanda", "East Africa", "Africa"],
          sameAs: [],
        }}
      />

      <HeroSection />
      <LeakSection />
      <ServicesPreviewSection />
      <WorkPreviewSection />
      <WhyChooseSection />
      <ProcessSection />
      <BlogPreviewSection />
      <FinalCtaSection />

    </main>
  );
}