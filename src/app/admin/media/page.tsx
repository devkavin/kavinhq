import Image from "next/image";
import { uploadMedia } from "@/actions/media";
import { ActionForm } from "@/components/admin/action-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { listTable } from "@/lib/data/admin";
import type { MediaAsset } from "@/types/database";

export default async function MediaPage() {
  const assets = await listTable<MediaAsset>("media_assets");
  return (
    <div>
      <h1 className="font-[var(--font-space)] text-3xl font-semibold text-white">Media</h1>
      <Card className="mt-6 p-5">
        <ActionForm action={uploadMedia}>
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div className="grid gap-2"><Label htmlFor="file">Image</Label><Input id="file" name="file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" required /></div>
            <div className="grid gap-2"><Label htmlFor="alt_text">Alt text</Label><Input id="alt_text" name="alt_text" /></div>
            <Button type="submit">Upload</Button>
          </div>
        </ActionForm>
      </Card>
      <div className="mt-8 grid gap-5 md:grid-cols-3 lg:grid-cols-4">
        {assets.map((asset) => (
          <Card key={asset.id} className="overflow-hidden">
            {asset.public_url ? <div className="relative aspect-square"><Image src={asset.public_url} alt={asset.alt_text || ""} fill className="object-cover" /></div> : null}
            <div className="p-4">
              <p className="truncate text-sm text-slate-100">{asset.file_name}</p>
              <p className="mt-2 break-all text-xs text-slate-500">{asset.public_url}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
