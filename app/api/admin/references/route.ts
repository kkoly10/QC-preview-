import { NextResponse } from 'next/server';
import { getAdminContext } from '@/lib/admin/auth';

export async function POST(request: Request) {
  const { supabase, profile } = await getAdminContext();

  if (!supabase || !profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const references = payload.references;

  if (!Array.isArray(references)) {
    return NextResponse.json(
      { error: 'References payload must be an array.' },
      { status: 400 }
    );
  }

  const normalized = references.map((reference, index) => ({
    ref_key: reference.ref_key,
    short_label: reference.short_label,
    full_citation: reference.full_citation,
    source_url: reference.source_url ?? null,
    doi: reference.doi ?? null,
    sort_order: reference.sort_order ?? index + 1,
    is_active: reference.is_active ?? true
  }));

  const { error } = await supabase
    .from('references')
    .upsert(normalized, { onConflict: 'ref_key' });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}