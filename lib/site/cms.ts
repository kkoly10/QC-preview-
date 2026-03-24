import { getAdminContext } from '@/lib/admin/auth';
import {
  defaultHomePageContent,
  defaultReferences,
  defaultSiteSettings,
} from '@/lib/site/defaults';
import type { HomePageContent, ReferenceMap, ReferenceRecord, SiteSettings } from '@/lib/site/types';
import { createSupabasePublicClient, isSupabaseConfigured } from '@/lib/supabase/public';

export function buildReferenceMap(references: ReferenceRecord[]): ReferenceMap {
  return Object.fromEntries(
    references.map((reference, index) => [
      reference.ref_key,
      {
        number: index + 1,
        label: reference.short_label,
        citation: reference.full_citation,
        sourceUrl: reference.source_url,
        doi: reference.doi,
      },
    ])
  );
}

export async function getPublicSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) {
    return defaultSiteSettings;
  }

  const supabase = createSupabasePublicClient();

  try {
    const { data, error } = await supabase!
      .from('site_settings_public')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return defaultSiteSettings;
    }

    return { ...defaultSiteSettings, ...data };
  } catch {
    return defaultSiteSettings;
  }
}

export async function getPublicReferences(): Promise<ReferenceRecord[]> {
  if (!isSupabaseConfigured()) {
    return defaultReferences;
  }

  const supabase = createSupabasePublicClient();

  try {
    const { data, error } = await supabase!
      .from('references_public')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultReferences;
    }

    return data.map((reference: ReferenceRecord, index: number) => ({
      ...reference,
      number: index + 1,
    }));
  } catch {
    return defaultReferences;
  }
}

export async function getPublicHomePage(): Promise<HomePageContent> {
  if (!isSupabaseConfigured()) {
    return defaultHomePageContent;
  }

  const supabase = createSupabasePublicClient();

  try {
    const { data, error } = await supabase!
      .from('pages_public')
      .select('published_content')
      .eq('slug', 'home')
      .maybeSingle();

    if (error || !data?.published_content) {
      return defaultHomePageContent;
    }

    return data.published_content as HomePageContent;
  } catch {
    return defaultHomePageContent;
  }
}

export async function getAdminSettings(): Promise<SiteSettings> {
  const { supabase } = await getAdminContext();

  if (!supabase) {
    return defaultSiteSettings;
  }

  const { data } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();

  return data ? { ...defaultSiteSettings, ...data } : defaultSiteSettings;
}

export async function getAdminReferences(): Promise<ReferenceRecord[]> {
  const { supabase } = await getAdminContext();

  if (!supabase) {
    return defaultReferences;
  }

  const { data } = await supabase
    .from('references')
    .select('*')
    .order('sort_order', { ascending: true });

  return data && data.length > 0 ? (data as ReferenceRecord[]) : defaultReferences;
}

export async function getAdminHomePageDraft() {
  const { supabase } = await getAdminContext();

  if (!supabase) {
    return {
      slug: 'home',
      page_name: 'Home',
      draft_content: defaultHomePageContent,
      published_content: defaultHomePageContent,
      draft_updated_at: null,
      published_at: null,
    };
  }

  const { data } = await supabase
    .from('pages')
    .select('slug, page_name, draft_content, published_content, draft_updated_at, published_at')
    .eq('slug', 'home')
    .maybeSingle();

  if (!data) {
    return {
      slug: 'home',
      page_name: 'Home',
      draft_content: defaultHomePageContent,
      published_content: defaultHomePageContent,
      draft_updated_at: null,
      published_at: null,
    };
  }

  return {
    ...data,
    draft_content: (data.draft_content as HomePageContent) ?? defaultHomePageContent,
    published_content: (data.published_content as HomePageContent) ?? defaultHomePageContent,
  };
}
