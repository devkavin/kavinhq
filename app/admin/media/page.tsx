import { MediaUpload } from "@/app/admin/media/media-upload";

export default function AdminMediaPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-white">Media</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
        Upload and manage images used by projects, notes, and public pages.
      </p>
      <div className="mt-8">
        <MediaUpload />
      </div>
    </section>
  );
}
