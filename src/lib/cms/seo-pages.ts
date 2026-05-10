export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoPage = {
  id: string;

  slug: string;
  title: string;

  meta_title: string;
  meta_description: string;

  hero_badge: string | null;
  hero_title: string;
  hero_description: string;

  section_title: string | null;
  section_content: string | null;

  faq: SeoFaqItem[];

  keywords: string[];

  is_published: boolean;

  created_at: string;
  updated_at: string;
};