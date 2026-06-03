import { Upload } from "lucide-react";
import { uploadMedia } from "@/lib/admin-actions";
import { Input } from "@/components/ui/input";

export function MediaUpload() {
  return (
    <form action={uploadMedia} className="rounded-lg border border-slate-800 bg-slate-950/35 p-6">
      <div className="flex items-center gap-3">
        <Upload className="text-sky-400" size={20} />
        <h2 className="text-lg font-semibold text-white">Upload Media</h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Images uploaded from admin use Supabase Storage. Store returned URLs or paths in project and note records.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <label className="grid gap-2 text-sm text-slate-300">
          Image
          <Input accept="image/*" name="file" required type="file" />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Alt text
          <Input name="alt" placeholder="Short description" />
        </label>
        <button className="h-11 rounded-md border border-sky-400/35 bg-sky-400 px-5 text-sm font-medium text-slate-950 transition hover:bg-sky-300" type="submit">
          Upload
        </button>
      </div>
    </form>
  );
}
