import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import FloatingAdminButton from "@/components/admin/FloatingAdminButton";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Software Development Company in Rwanda | WebImpact Lab",
    template: "%s | WebImpact Lab",
  },
  description:
    "WebImpact Lab is a software development company in Rwanda building websites, business systems, SaaS platforms, dashboards, e-commerce systems, and automation tools for companies in Rwanda, East Africa, and Africa.",
  icons: { icon: "/siteIcon.webp" },
  keywords: [
    "software development company in Rwanda",
    "web development company in Rwanda",
    "custom software Rwanda",
    "website development Kigali",
    "SaaS development Africa",
    "business automation Rwanda",
    "dashboard development services",
    "business systems Rwanda",
  ],
  metadataBase: new URL("https://webimpactlab.com"),
  openGraph: {
    title: "Software Development Company in Rwanda | WebImpact Lab",
    description:
      "WebImpact Lab builds websites, business systems, SaaS platforms, dashboards, and automation tools for serious businesses.",
    url: "https://webimpactlab.com",
    siteName: "WebImpact Lab",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Company in Rwanda | WebImpact Lab",
    description:
      "Websites, systems, SaaS platforms, dashboards, and automation for businesses in Rwanda and East Africa.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={quicksand.variable}>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <FloatingAdminButton />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}