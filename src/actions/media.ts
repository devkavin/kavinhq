"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const bucket = "kavin-hq-media";

async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) redirect("/auth/access-denied");
}

export async function uploadMedia(_: unknown, formData: FormData) {
  await assertAdmin();
  const file = formData.get("file");
  const alt = String(formData.get("alt_text") || "");
  if (!(file instanceof File) || file.size === 0) return { ok: false, message: "Choose an image to upload." };
  if (!allowedTypes.includes(file.type)) return { ok: false, message: "Use JPG, PNG, WebP, or AVIF." };
  const maxMb = Number(process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE_MB || 5);
  if (file.size > maxMb * 1024 * 1024) return { ok: false, message: `Image must be ${maxMb}MB or less.` };

  const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
  const safe = slugify(file.name.replace(/\.[^/.]+$/, ""));
  const path = `uploads/${Date.now()}-${safe}.${ext}`;
  const supabase = createAdminClient();
  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false
  });
  if (uploadError) return { ok: false, message: uploadError.message };
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  const { error } = await supabase.from("media_assets").insert({
    file_name: file.name,
    file_path: path,
    public_url: data.publicUrl,
    bucket,
    mime_type: file.type,
    size_bytes: file.size,
    alt_text: alt
  });
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/media");
  return { ok: true, message: "Image uploaded." };
}
