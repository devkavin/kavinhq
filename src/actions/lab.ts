'use server';

import { createClient } from '@/lib/supabase/server';
import { labItemSchema, type LabItemInput } from '@/lib/validations/schemas';
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

// Public query
export async function getPublishedLabItems() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lab_items')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getPublishedLabItems error:', error);
    return [];
  }
  return data || [];
}

// Admin CRUD
export async function getAdminLabItems() {
  const supabase = await getAdminClient();
  const { data, error } = await supabase
    .from('lab_items')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch admin lab items: ${error.message}`);
  }
  return data || [];
}

export async function createLabItem(input: LabItemInput) {
  const supabase = await getAdminClient();
  const validated = labItemSchema.parse(input);

  const { data, error } = await supabase
    .from('lab_items')
    .insert([validated])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create lab item: ${error.message}`);
  }

  revalidatePath('/lab');
  return data;
}

export async function updateLabItem(id: string, input: LabItemInput) {
  const supabase = await getAdminClient();
  const validated = labItemSchema.parse(input);

  const { data, error } = await supabase
    .from('lab_items')
    .update(validated)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update lab item: ${error.message}`);
  }

  revalidatePath('/lab');
  return data;
}

export async function deleteLabItem(id: string) {
  const supabase = await getAdminClient();

  const { error } = await supabase
    .from('lab_items')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete lab item: ${error.message}`);
  }

  revalidatePath('/lab');
  return { success: true };
}
