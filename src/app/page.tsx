import { HeroSection } from "@/components/home/hero-section";
import { ServicesPreviewSection } from "@/components/home/services-preview-section";
import { WorkPreviewSection } from "@/components/home/work-preview-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-white text-black dark:bg-[#070707] dark:text-white">
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
      <ServicesPreviewSection />
      <WorkPreviewSection />
      <FinalCtaSection />
    </main>
  );
}
