'use client';

import * as React from 'react';
import { Upload, Copy, Check, Trash2, Loader2, ImageIcon, Link2, FileImage } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { uploadMedia, deleteMediaAsset } from '@/actions/media';

interface MediaAsset {
  id: string;
  file_name: string;
  file_path: string;
  public_url: string;
  mime_type: string;
  size_bytes: number;
  created_at: string;
}

export function MediaManager({ initialAssets }: { initialAssets: MediaAsset[] }) {
  const { toast } = useToast();
  const [assets, setAssets] = React.useState<MediaAsset[]>(initialAssets);
  const [isUploading, setIsUploading] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Sync state if initialAssets changes
  React.useEffect(() => {
    setAssets(initialAssets);
  }, [initialAssets]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const newAsset = await uploadMedia(formData);
      setAssets((prev) => [newAsset, ...prev]);

      toast({
        title: 'Upload Successful',
        message: `${file.name} uploaded and registered.`,
        type: 'success',
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      toast({
        title: 'Upload Failed',
        message: err.message || 'An error occurred during file upload.',
        type: 'error',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyLink = (asset: MediaAsset) => {
    navigator.clipboard.writeText(asset.public_url || '');
    setCopiedId(asset.id);
    toast({
      title: 'Link Copied',
      message: 'Media asset public URL copied to clipboard.',
      type: 'success',
    });
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleDelete = async (asset: MediaAsset) => {
    if (!confirm(`Delete "${asset.file_name}"? This will remove it from Supabase Storage and database.`)) return;

    setDeletingId(asset.id);

    try {
      await deleteMediaAsset(asset.id, asset.file_path);
      setAssets((prev) => prev.filter((a) => a.id !== asset.id));
      toast({
        title: 'Asset Removed',
        message: `${asset.file_name} was deleted successfully.`,
        type: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Deletion Failed',
        message: err.message || 'An error occurred during asset deletion.',
        type: 'error',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 1;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8 font-mono text-xs">
      
      {/* Upload Zone */}
      <Card className="border-dashed border-border/60 bg-card/40 flex flex-col items-center justify-center p-8 hover:bg-card/60 transition-colors relative glass-panel">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />

        <div className="text-center space-y-4 max-w-sm">
          <div className="mx-auto rounded p-3 bg-secondary/80 border border-border/40 text-primary w-fit">
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            ) : (
              <Upload className="h-6 w-6 text-primary" />
            )}
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-foreground">
              {isUploading ? 'UPLOADING ASSET...' : 'UPLOAD MEDIA IMAGE'}
            </h4>
            <p className="text-[10px] text-muted-foreground">
              SUPPORTED: JPG, PNG, WEBP, AVIF, GIF. MAX SIZE: 5MB.
            </p>
          </div>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="text-[10px] h-8 font-mono"
          >
            SELECT IMAGE FILE
          </Button>
        </div>
      </Card>

      {/* Grid of assets */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-foreground border-b border-border/20 pb-2 flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-primary" />
          <span>UPLOADED MEDIA ASSETS INDEX ({assets.length})</span>
        </h3>

        {assets.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {assets.map((asset) => {
              const isCopied = copiedId === asset.id;
              const isDeleting = deletingId === asset.id;

              return (
                <Card key={asset.id} className="border-border/40 bg-card/60 overflow-hidden flex flex-col justify-between glass-card relative group">
                  
                  {/* Aspect ratio box for image preview */}
                  <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden border-b border-border/25">
                    {asset.public_url ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${asset.public_url})` }}
                      />
                    ) : (
                      <FileImage className="h-8 w-8 text-muted-foreground/30" />
                    )}
                    
                    {/* Copy/Delete hover action block overlay */}
                    <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleCopyLink(asset)}
                        className="h-8 w-8"
                        title="Copy Public URL"
                      >
                        {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(asset)}
                        disabled={isDeleting}
                        className="h-8 w-8 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20"
                        title="Delete Asset"
                      >
                        {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                      </Button>
                    </div>
                  </div>

                  {/* Asset Metadata */}
                  <CardContent className="p-3 space-y-1">
                    <span className="block text-[10px] text-foreground font-bold truncate" title={asset.file_name}>
                      {asset.file_name}
                    </span>
                    <div className="flex justify-between items-center text-[8px] text-muted-foreground">
                      <span>{formatSize(asset.size_bytes)}</span>
                      <span className="uppercase">{asset.mime_type.split('/')[1] || 'image'}</span>
                    </div>
                  </CardContent>

                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border/40 rounded-lg text-muted-foreground font-mono text-xs">
            Media registry is vacant. Upload images to populate this library.
          </div>
        )}
      </div>

    </div>
  );
}
