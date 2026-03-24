import { redirect } from 'next/navigation';
import { createSupabaseServerClient, isSupabaseServerConfigured } from '@/lib/supabase/server';

export type AdminProfile = {
  user_id: string;
  email: string;
  display_name: string | null;
  role: string;
  is_active: boolean;
};

export async function getAdminContext() {
  if (!isSupabaseServerConfigured()) {
    return { supabase: null, user: null, profile: null };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, profile: null };
  }

  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('user_id, email, display_name, role, is_active')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!profile || !profile.is_active) {
    return { supabase, user, profile: null };
  }

  return { supabase, user, profile: profile as AdminProfile };
}

export async function requireAdmin() {
  const context = await getAdminContext();

  if (!context.user || !context.profile) {
    redirect('/admin/login');
  }

  return context;
}
