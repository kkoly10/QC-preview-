import { NextResponse } from 'next/server';
import { getAdminContext } from '@/lib/admin/auth';

export async function POST(request: Request) {
  const { supabase, user, profile } = await getAdminContext();

  if (!supabase || !user || !profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();

  const { error } = await supabase.from('site_settings').upsert({
    id: '00000000-0000-0000-0000-000000000001',
    site_title: payload.site_title,
    short_title: payload.short_title,
    mobile_title: payload.mobile_title,
    tagline: payload.tagline,
    monogram: payload.monogram,
    footer_title: payload.footer_title,
    footer_subtitle: payload.footer_subtitle,
    seo_title: payload.seo_title,
    seo_description: payload.seo_description,
    updated_by: user.id
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}