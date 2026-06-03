import { MediaUpload } from "@/app/admin/media/media-upload";
import { deleteMedia } from "@/lib/admin-actions";
import { adminList } from "@/lib/admin-data";

export default async function AdminMediaPage() {
  const media = await adminList("media_assets", "created_at");

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-white">Media</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
        Upload and manage images used by projects, notes, and public pages.
      </p>
      <div className="mt-8">
        <MediaUpload />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {media.map((asset: any) => {
          const remove = deleteMedia.bind(null, asset.id, asset.path);
          return (
            <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/35" key={asset.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={asset.alt ?? ""} className="aspect-[1.5] w-full object-cover" src={asset.public_url} />
              <div className="p-4">
                <p className="break-words text-sm text-slate-300">{asset.alt ?? asset.path}</p>
                <p className="mt-2 break-words text-xs text-slate-500">{asset.public_url}</p>
                <form action={remove} className="mt-4">
                  <button className="rounded-md border border-slate-800 px-3 py-2 text-sm text-slate-400 transition hover:border-red-300/35 hover:text-white" type="submit">Delete</button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
