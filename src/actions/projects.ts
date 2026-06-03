'use server';

import { createClient } from '@/lib/supabase/server';
import { projectSchema, type ProjectInput } from '@/lib/validations/schemas';
import { revalidatePath } from 'next/cache';

// Helper to enforce admin authorization on mutations
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
export async function getPublishedProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getPublishedProjects error:', error);
    return [];
  }
  return data || [];
}

export async function getFeaturedProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .limit(3);

  if (error) {
    console.error('getFeaturedProjects error:', error);
    return [];
  }
  return data || [];
}

export async function getProjectBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('getProjectBySlug error:', error);
    return null;
  }
  return data;
}

// ----------------------------------------------------
// Admin Mutations
// ----------------------------------------------------
export async function getAdminProjects() {
  const supabase = await getAdminClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch admin projects: ${error.message}`);
  }
  return data || [];
}

export async function createProject(input: ProjectInput) {
  const supabase = await getAdminClient();
  const validated = projectSchema.parse(input);

  const { data, error } = await supabase
    .from('projects')
    .insert([validated])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath(`/work/${validated.slug}`);
  return data;
}

export async function updateProject(id: string, input: ProjectInput) {
  const supabase = await getAdminClient();
  const validated = projectSchema.parse(input);

  const { data, error } = await supabase
    .from('projects')
    .update(validated)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update project: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath(`/work/${validated.slug}`);
  return data;
}

export async function deleteProject(id: string, slug: string) {
  const supabase = await getAdminClient();

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath(`/work/${slug}`);
  return { success: true };
}
