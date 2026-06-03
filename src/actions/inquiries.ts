'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { contactInquirySchema, type ContactInquiryInput } from '@/lib/validations/schemas';
import type { Database } from '@/lib/supabase/database.types';
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

function hasConfiguredServiceRoleKey() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(key && key !== 'YOUR_SERVICE_ROLE_KEY' && !key.includes('...'));
}

// ----------------------------------------------------
// Public Mutations
// ----------------------------------------------------
export async function submitContactInquiry(input: ContactInquiryInput) {
  // 1. Zod Validation
  const validated = contactInquirySchema.parse(input);

  // 2. Honeypot check (spam filter)
  if (validated.website) {
    // Return fake success for bots
    return { success: true, message: 'Inquiry received. Thank you!' };
  }

  const supabase = hasConfiguredServiceRoleKey()
    ? createAdminClient()
    : await createClient();

  // 3. Database-driven rate limit (1 submission per email per 5 minutes)
  if (hasConfiguredServiceRoleKey()) {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: existing, error: checkError } = await supabase
      .from('contact_inquiries')
      .select('id')
      .eq('email', validated.email)
      .gt('created_at', fiveMinutesAgo)
      .limit(1);

    if (checkError) {
      console.error('Rate limit check error:', checkError);
    }

    if (existing && existing.length > 0) {
      return {
        success: false,
        error: 'You have submitted an inquiry recently. Please wait a few minutes before sending another.',
      };
    }
  }

  // 4. Save into database
  const insertData: Database['public']['Tables']['contact_inquiries']['Insert'] = {
    name: validated.name,
    email: validated.email,
    company_or_brand: validated.company_or_brand,
    phone_or_whatsapp: validated.phone_or_whatsapp,
    project_type: validated.project_type,
    budget_range: validated.budget_range,
    timeline: validated.timeline,
    existing_website_or_social_link: validated.existing_website_or_social_link,
    message: validated.message,
    source: validated.source,
  };

  const { error } = await supabase
    .from('contact_inquiries')
    .insert([insertData]);

  if (error) {
    console.error('Database insert inquiry error:', error);
    return {
      success: false,
      error: 'Failed to submit inquiry. Please try again or contact us directly.',
    };
  }

  return { success: true, message: 'Inquiry received. Kavin HQ will review this shortly.' };
}

// ----------------------------------------------------
// Admin Actions
// ----------------------------------------------------
export async function getAdminInquiries() {
  const supabase = await getAdminClient();
  const { data, error } = await supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch inquiries: ${error.message}`);
  }
  return data || [];
}

export async function updateInquiryStatus(id: string, status: 'new' | 'reviewed' | 'contacted' | 'archived') {
  const supabase = await getAdminClient();

  const { data, error } = await supabase
    .from('contact_inquiries')
    .update({ status, is_read: true })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update inquiry status: ${error.message}`);
  }

  revalidatePath('/admin');
  revalidatePath('/admin/inquiries');
  return data;
}

export async function markInquiryAsRead(id: string, is_read: boolean) {
  const supabase = await getAdminClient();

  const { data, error } = await supabase
    .from('contact_inquiries')
    .update({ is_read })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to mark inquiry as read: ${error.message}`);
  }

  revalidatePath('/admin');
  revalidatePath('/admin/inquiries');
  return data;
}

export async function deleteInquiry(id: string) {
  const supabase = await getAdminClient();

  const { error } = await supabase
    .from('contact_inquiries')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete inquiry: ${error.message}`);
  }

  revalidatePath('/admin');
  revalidatePath('/admin/inquiries');
  return { success: true };
}
