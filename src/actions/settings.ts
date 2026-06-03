'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

async function getAdminClient() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL || 'kavindra.senanayake@gmail.com';
  
  if (!user || user.email !== adminEmail) {
    throw new Error('Access Denied: Admin authorization required.');
  }
  return supabase;
}

// ----------------------------------------------------
// Public Queries
// ----------------------------------------------------
export async function getSiteSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_settings')
    .select('*');

  if (error) {
    console.error('getSiteSettings error:', error);
    return [];
  }
  return data || [];
}

export async function getSiteSettingByKey(key: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .maybeSingle();

  if (error) {
    console.error(`getSiteSettingByKey (${key}) error:`, error);
    return null;
  }
  return data?.value || null;
}

// ----------------------------------------------------
// Admin Actions
// ----------------------------------------------------
export async function updateSiteSetting(key: string, value: any) {
  const supabase = await getAdminClient();

  const { data, error } = await supabase
    .from('site_settings')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update site setting (${key}): ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/contact');
  return data;
}
