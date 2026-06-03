'use server';

import { createClient } from '@/lib/supabase/server';
import { noteSchema, type NoteInput } from '@/lib/validations/schemas';
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
export async function getPublishedNotes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('getPublishedNotes error:', error);
    return [];
  }
  return data || [];
}

export async function getLatestNotes(limit = 3) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('getLatestNotes error:', error);
    return [];
  }
  return data || [];
}

export async function getNoteBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('getNoteBySlug error:', error);
    return null;
  }
  return data;
}

// ----------------------------------------------------
// Admin Mutations
// ----------------------------------------------------
export async function getAdminNotes() {
  const supabase = await getAdminClient();
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch admin notes: ${error.message}`);
  }
  return data || [];
}

export async function createNote(input: NoteInput) {
  const supabase = await getAdminClient();
  const validated = noteSchema.parse(input);

  // Set published_at if status changes to published and not set yet
  const insertData = {
    ...validated,
    published_at: validated.status === 'published' && !validated.published_at 
      ? new Date().toISOString() 
      : validated.published_at,
  };

  const { data, error } = await supabase
    .from('notes')
    .insert([insertData])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create note: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/notes');
  revalidatePath(`/notes/${validated.slug}`);
  return data;
}

export async function updateNote(id: string, input: NoteInput) {
  const supabase = await getAdminClient();
  const validated = noteSchema.parse(input);

  const { data, error } = await supabase
    .from('notes')
    .update(validated)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update note: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/notes');
  revalidatePath(`/notes/${validated.slug}`);
  return data;
}

export async function deleteNote(id: string, slug: string) {
  const supabase = await getAdminClient();

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete note: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/notes');
  revalidatePath(`/notes/${slug}`);
  return { success: true };
}
