'use server';

import { createClient } from '@/lib/supabase/server';
import { serviceSchema, type ServiceInput } from '@/lib/validations/schemas';
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
export async function getPublishedServices() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('getPublishedServices error:', error);
    return [];
  }
  return data || [];
}

// ----------------------------------------------------
// Admin Mutations
// ----------------------------------------------------
export async function getAdminServices() {
  const supabase = await getAdminClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch admin services: ${error.message}`);
  }
  return data || [];
}

export async function createService(input: ServiceInput) {
  const supabase = await getAdminClient();
  const validated = serviceSchema.parse(input);

  const { data, error } = await supabase
    .from('services')
    .insert([validated])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create service: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/services');
  return data;
}

export async function updateService(id: string, input: ServiceInput) {
  const supabase = await getAdminClient();
  const validated = serviceSchema.parse(input);

  const { data, error } = await supabase
    .from('services')
    .update(validated)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update service: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/services');
  return data;
}

export async function deleteService(id: string) {
  const supabase = await getAdminClient();

  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete service: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/services');
  return { success: true };
}
export async function updateServicesOrder(orders: { id: string; sort_order: number }[]) {
  const supabase = await getAdminClient();

  for (const item of orders) {
    const { error } = await supabase
      .from('services')
      .update({ sort_order: item.sort_order })
      .eq('id', item.id);
    
    if (error) {
      throw new Error(`Failed to update service ordering: ${error.message}`);
    }
  }

  revalidatePath('/');
  revalidatePath('/services');
  return { success: true };
}
