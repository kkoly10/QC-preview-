import { NextResponse } from 'next/server';
import { getAdminContext } from '@/lib/admin/auth';
import { defaultHomePageContent } from '@/lib/site/defaults';

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

  const { error } = await supabase.from('pages').upsert({
    slug: 'home',
    page_name: 'Home',
    draft_content: content,
    published_content: publish ? content : existing?.published_content ?? defaultHomePageContent,
    draft_updated_at: new Date().toISOString(),
    draft_updated_by: user.id,
    published_at: publish ? new Date().toISOString() : undefined,
    published_by: publish ? user.id : undefined,
  }, { onConflict: 'slug' });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
