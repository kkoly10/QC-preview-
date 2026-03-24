import { NextResponse } from 'next/server';
import { getAdminContext } from '@/lib/admin/auth';

const defaultHomePageContent = {
  hero: {
    eyebrow: 'Evidence-informed birth education',
    subline: 'Maternal positioning, mobility, and delivery outcomes',
    title: 'Positioning and the Effect on Labor',
    lead:
      'Positioning during labor is not just a comfort preference. The literature selected for this project consistently points to the value of walking, changing positions, and using upright or non-supine options when clinically appropriate.',
    primaryCta: {
      label: 'Explore the evidence',
      href: '/move-through-labor/evidence'
    },
    secondaryCta: {
      label: 'Compare labor positions',
      href: '/move-through-labor/positions'
    }
  }
};

export async function POST(request: Request) {
  const { supabase, user, profile } = await getAdminContext();

  if (!supabase || !user || !profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const publish = Boolean(payload.publish);
  const content = payload.content ?? defaultHomePageContent;

  const { data: existing } = await supabase
    .from('pages')
    .select('published_content')
    .eq('slug', 'home')
    .maybeSingle();

  const { error } = await supabase.from('pages').upsert(
    {
      slug: 'home',
      page_name: 'Home',
      draft_content: content,
      published_content: publish
        ? content
        : existing?.published_content ?? content,
      draft_updated_at: new Date().toISOString(),
      draft_updated_by: user.id,
      published_at: publish ? new Date().toISOString() : undefined,
      published_by: publish ? user.id : undefined
    },
    { onConflict: 'slug' }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}