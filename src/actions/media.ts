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

export async function uploadMedia(formData: FormData) {
  const supabase = await getAdminClient();
  
  const file = formData.get('file') as File;
  if (!file) {
    throw new Error('No file provided in the upload request.');
  }

  // Basic image validations
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Unsupported image format. Allowed: JPG, PNG, WEBP, AVIF, GIF.');
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('Image size exceeds 5MB limit.');
  }

  // Convert file to ArrayBuffer and upload
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${Date.now()}_${cleanFileName}`;

  const { error: uploadError } = await supabase.storage
    .from('kavin-hq-media')
    .upload(filePath, fileBuffer, {
      contentType: file.type,
      cacheControl: '31536000',
      upsert: true
    });

  if (uploadError) {
    throw new Error(`Supabase Storage upload error: ${uploadError.message}`);
  }

  // Get public url
  const { data: { publicUrl } } = supabase.storage
    .from('kavin-hq-media')
    .getPublicUrl(filePath);

  // Write metadata record in media_assets table
  const { data: asset, error: dbError } = await supabase
    .from('media_assets')
    .insert([
      {
        file_name: file.name,
        file_path: filePath,
        public_url: publicUrl,
        bucket: 'kavin-hq-media',
        mime_type: file.type,
        size_bytes: file.size,
      }
    ])
    .select()
    .single();

  if (dbError) {
    // Attempt clean up of uploaded file on DB fail
    await supabase.storage.from('kavin-hq-media').remove([filePath]);
    throw new Error(`Media metadata logging failed: ${dbError.message}`);
  }

  revalidatePath('/admin/media');
  return asset;
}

export async function getMediaAssets() {
  const supabase = await getAdminClient();

  const { data, error } = await supabase
    .from('media_assets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to retrieve media assets: ${error.message}`);
  }
  return data || [];
}

export async function deleteMediaAsset(id: string, filePath: string) {
  const supabase = await getAdminClient();

  // 1. Delete from storage bucket
  const { error: storageError } = await supabase.storage
    .from('kavin-hq-media')
    .remove([filePath]);

  if (storageError) {
    console.error(`Warning: Failed to delete ${filePath} from storage bucket:`, storageError.message);
  }

  // 2. Delete database entry
  const { error: dbError } = await supabase
    .from('media_assets')
    .delete()
    .eq('id', id);

  if (dbError) {
    throw new Error(`Failed to remove media database entry: ${dbError.message}`);
  }

  revalidatePath('/admin/media');
  return { success: true };
}
