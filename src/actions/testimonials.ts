'use server';

import { createClient } from '@/lib/supabase/server';
import { testimonialSchema, type TestimonialInput } from '@/lib/validations/schemas';
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
export async function getPublishedTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('getPublishedTestimonials error:', error);
    return [];
  }
  return data || [];
}

// Admin CRUD
export async function getAdminTestimonials() {
  const supabase = await getAdminClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch admin testimonials: ${error.message}`);
  }
  return data || [];
}

export async function createTestimonial(input: TestimonialInput) {
  const supabase = await getAdminClient();
  const validated = testimonialSchema.parse(input);

  const { data, error } = await supabase
    .from('testimonials')
    .insert([validated])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create testimonial: ${error.message}`);
  }

  revalidatePath('/');
  return data;
}

export async function updateTestimonial(id: string, input: TestimonialInput) {
  const supabase = await getAdminClient();
  const validated = testimonialSchema.parse(input);

  const { data, error } = await supabase
    .from('testimonials')
    .update(validated)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update testimonial: ${error.message}`);
  }

  revalidatePath('/');
  return data;
}

export async function deleteTestimonial(id: string) {
  const supabase = await getAdminClient();

  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete testimonial: ${error.message}`);
  }

  revalidatePath('/');
  return { success: true };
}
