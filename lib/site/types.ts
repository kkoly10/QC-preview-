export type SiteSettings = {
  id?: string;
  site_title: string;
  short_title: string;
  mobile_title: string;
  tagline: string;
  monogram: string;
  footer_title: string;
  footer_subtitle: string;
  seo_title: string;
  seo_description: string;
};

export type ReferenceRecord = {
  id?: string;
  ref_key: string;
  short_label: string;
  full_citation: string;
  source_url?: string | null;
  doi?: string | null;
  sort_order: number;
  is_active?: boolean;
  number?: number;
};

export type CitationEntry = {
  number: number;
  label: string;
  citation: string;
  sourceUrl?: string | null;
  doi?: string | null;
};

export type ReferenceMap = Record<string, CitationEntry>;

export type ContentLink = {
  label: string;
  href: string;
};

export type ContentBullet = {
  text: string;
  citations?: string[];
};

export type ContentCard = {
  label?: string;
  eyebrow?: string;
  title: string;
  text: string;
  citations?: string[];
};

export type HomePageContent = {
  hero: {
    eyebrow: string;
    subline: string;
    title: string;
    lead: string;
    primaryCta: ContentLink;
    secondaryCta: ContentLink;
  };
  heroCards: ContentCard[];
  heroSidebar: {
    eyebrow: string;
    title: string;
    bullets: ContentBullet[];
  };
  featuredReferenceKeys: string[];
  overview: {
    eyebrow: string;
    title: string;
    description: string;
    cards: ContentCard[];
  };
  takeaways: {
    eyebrow: string;
    title: string;
    description: string;
    cards: ContentCard[];
  };
  audienceBox: {
    eyebrow: string;
    title: string;
    body1: string;
    body2: string;
    cta: ContentLink;
  };
};
