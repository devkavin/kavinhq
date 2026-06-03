import * as React from 'react';
import Link from 'next/link';
import {
  FolderGit2,
  FileText,
  Mail,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Inbox,
  AlertCircle,
} from 'lucide-react';
import { getAdminProjects } from '@/actions/projects';
import { getAdminNotes } from '@/actions/notes';
import { getAdminInquiries } from '@/actions/inquiries';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function AdminDashboardPage() {
  // Fetch dashboard stats (catch database errors gracefully)
  const projects = await getAdminProjects().catch(() => []);
  const notes = await getAdminNotes().catch(() => []);
  const inquiries = await getAdminInquiries().catch(() => []);

  // Aggregate metrics
  const totalProjects = projects.length;
  const publishedProjects = projects.filter((p) => p.status === 'published').length;
  
  const totalNotes = notes.length;
  const draftNotes = notes.filter((n) => n.status === 'draft').length;

  const totalInquiries = inquiries.length;
  const unreadInquiries = inquiries.filter((i) => !i.is_read).length;

  const recentInquiries = inquiries.slice(0, 4);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border/40 pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-mono text-primary mb-2 uppercase">
            <span>ADMINISTRATIVE PORTAL // COMMAND SECURE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Systems Overview
          </h1>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground bg-secondary/35 border border-border/40 p-2 rounded">
          <ShieldCheck className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>STATUS: ALL SYSTEMS SECURED</span>
        </div>
      </div>

      {/* Grid metrics stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Projects */}
        <Card className="border-border/40 bg-card/60 relative overflow-hidden">
          <CardContent className="p-5 flex items-center gap-4 relative">
            <div className="rounded p-2 bg-primary/10 border border-primary/20 text-primary">
              <FolderGit2 className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase text-muted-foreground">Total Projects</span>
              <span className="text-xl font-extrabold text-foreground">{totalProjects}</span>
              <span className="block text-[9px] font-mono text-muted-foreground mt-0.5">
                ({publishedProjects} published)
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Draft Notes */}
        <Card className="border-border/40 bg-card/60 relative overflow-hidden">
          <CardContent className="p-5 flex items-center gap-4 relative">
            <div className="rounded p-2 bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase text-muted-foreground">Blog Notes</span>
              <span className="text-xl font-extrabold text-foreground">{totalNotes}</span>
              <span className="block text-[9px] font-mono text-muted-foreground mt-0.5">
                ({draftNotes} drafts pending)
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Unread Inquiries */}
        <Card className={`border-border/40 bg-card/60 relative overflow-hidden ${unreadInquiries > 0 ? 'border-amber-500/20 bg-amber-950/5' : ''}`}>
          <CardContent className="p-5 flex items-center gap-4 relative">
            <div className={`rounded p-2 ${unreadInquiries > 0 ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400' : 'bg-secondary border border-border/40 text-muted-foreground'}`}>
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase text-muted-foreground">Inquiries</span>
              <span className="text-xl font-extrabold text-foreground">{totalInquiries}</span>
              <span className={`block text-[9px] font-mono mt-0.5 ${unreadInquiries > 0 ? 'text-amber-400 font-bold animate-pulse' : 'text-muted-foreground'}`}>
                ({unreadInquiries} unread logs)
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Rapid Actions */}
        <Card className="border-primary/20 bg-primary/5 relative overflow-hidden">
          <CardContent className="p-5 flex items-center gap-4 relative">
            <div className="rounded p-2 bg-primary/20 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1 font-mono text-[10px]">
              <span className="block text-[9px] uppercase text-muted-foreground mb-1">COMMAND SHORTCUTS</span>
              <div className="flex gap-2">
                <Link href="/admin/projects?action=new" className="text-primary hover:underline font-bold">
                  [+PROJECT]
                </Link>
                <Link href="/admin/notes?action=new" className="text-primary hover:underline font-bold">
                  [+NOTE]
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Main Grid: inquiries vs recent actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Recent Inquiries List (Cols 1-8) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center border-b border-border/20 pb-2">
            <h3 className="font-mono text-sm font-bold text-foreground flex items-center gap-2">
              <Inbox className="h-4 w-4 text-primary" />
              <span>RECENT CONTACT INQUIRIES</span>
            </h3>
            <Link href="/admin/inquiries" className="text-xs font-mono text-primary hover:underline flex items-center gap-1">
              <span>ALL INBOX INQUIRIES</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {recentInquiries.length > 0 ? (
              recentInquiries.map((inq) => (
                <Card key={inq.id} className={`border-border/40 bg-card/40 ${!inq.is_read ? 'border-amber-500/20 bg-amber-950/5' : ''}`}>
                  <CardContent className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-bold text-sm">{inq.name}</span>
                        {inq.company_or_brand && (
                          <span className="text-muted-foreground text-[10px] bg-secondary px-1.5 py-0.5 rounded">
                            @{inq.company_or_brand}
                          </span>
                        )}
                        {!inq.is_read && (
                          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                        )}
                      </div>
                      <p className="text-muted-foreground text-[11px] font-sans line-clamp-1">{inq.message}</p>
                    </div>

                    <div className="flex sm:flex-col items-start sm:items-end justify-between border-t sm:border-0 border-border/20 pt-2 sm:pt-0 gap-1 shrink-0 text-[10px] text-muted-foreground">
                      <span className="text-primary font-bold uppercase">{inq.project_type}</span>
                      <span>{formatDate(inq.created_at)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 border border-dashed border-border/40 rounded-lg text-muted-foreground font-mono text-xs">
                Inbound inquiries folder is vacant.
              </div>
            )}
          </div>
        </div>

        {/* Quick System Settings summary (Cols 9-12) */}
        <div className="lg:col-span-4 space-y-4 font-mono text-xs text-muted-foreground">
          <div className="flex items-center border-b border-border/20 pb-2">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-primary" />
              <span>SYSTEM DIAGNOSTICS</span>
            </h3>
          </div>
          
          <Card className="border-border/40 bg-card/40">
            <CardContent className="p-4 space-y-4">
              <div>
                <span className="block text-[10px] uppercase text-muted-foreground mb-1">Database Provider</span>
                <span className="text-foreground font-semibold">Supabase PostgreSQL 15</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-muted-foreground mb-1">API Key Mode</span>
                <span className="text-foreground font-semibold">Row-Level Security Enabled</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-muted-foreground mb-1">Storage Bucket</span>
                <span className="text-foreground font-semibold">kavin-hq-media (Public reads)</span>
              </div>
              <div className="border-t border-border/20 pt-3 flex justify-between items-center text-[10px]">
                <span>ADMIN LINK:</span>
                <span className="text-emerald-400 font-bold uppercase">AUTHORIZED</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}
