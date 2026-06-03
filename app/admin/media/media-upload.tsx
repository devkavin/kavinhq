"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient, isSupabaseConfigured } from "@/lib/supabase";

export function MediaUpload() {
  const [status, setStatus] = useState("Choose an image to upload to Supabase Storage.");

  async function upload(file: File | null) {
    if (!file) return;
    if (!isSupabaseConfigured) {
      setStatus("Configure Supabase environment variables before uploading.");
      return;
    }
    const supabase = createClient();
    const path = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false });
    if (error) {
      setStatus(error.message);
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setStatus(`Uploaded: ${data.publicUrl}`);
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/35 p-6">
      <div className="flex items-center gap-3">
        <Upload className="text-sky-400" size={20} />
        <h2 className="text-lg font-semibold text-white">Upload Media</h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Images uploaded from admin use Supabase Storage. Store returned URLs or paths in project and note records.
      </p>
      <label className="mt-6 inline-flex h-11 cursor-pointer items-center justify-center rounded-md border border-slate-700/80 bg-slate-900/60 px-5 text-sm font-medium text-slate-100 transition hover:border-sky-300/45 hover:bg-slate-900">
        <input
          accept="image/*"
          className="sr-only"
          onChange={(event) => upload(event.target.files?.[0] ?? null)}
          type="file"
        />
        Select Image
      </label>
      <p className="mt-4 break-words text-sm text-slate-400">{status}</p>
    </div>
  );
}
