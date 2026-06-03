'use client';

import * as React from 'react';
import { MailOpen, Mail, Trash2, CheckCircle2, Archive, Loader2, Calendar, MessageSquare, Phone, ExternalLink } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast';
import { updateInquiryStatus, markInquiryAsRead, deleteInquiry } from '@/actions/inquiries';
import { cn } from '@/lib/utils/cn';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company_or_brand?: string | null;
  phone_or_whatsapp?: string | null;
  project_type: string;
  budget_range?: string | null;
  timeline: string;
  existing_website_or_social_link?: string | null;
  message: string;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
  is_read: boolean;
  created_at: string;
}

export function InquiriesList({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const { toast } = useToast();
  const [inquiries, setInquiries] = React.useState<Inquiry[]>(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = React.useState<Inquiry | null>(null);
  const [isMsgOpen, setIsMsgOpen] = React.useState(false);
  const [processingId, setProcessingId] = React.useState<string | null>(null);

  // Sync state if initialInquiries change
  React.useEffect(() => {
    setInquiries(initialInquiries);
  }, [initialInquiries]);

  const handleReadToggle = async (inq: Inquiry) => {
    setProcessingId(inq.id);
    try {
      const nextRead = !inq.is_read;
      await markInquiryAsRead(inq.id, nextRead);
      
      setInquiries((prev) =>
        prev.map((i) => (i.id === inq.id ? { ...i, is_read: nextRead } : i))
      );
      toast({
        title: 'Status Updated',
        message: `Inquiry marked as ${nextRead ? 'read' : 'unread'}.`,
        type: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        message: err.message || 'Failed to update read status.',
        type: 'error',
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleStatusChange = async (id: string, nextStatus: Inquiry['status']) => {
    setProcessingId(id);
    try {
      await updateInquiryStatus(id, nextStatus);
      
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: nextStatus, is_read: true } : i))
      );
      toast({
        title: 'Status Updated',
        message: `Inquiry status changed to ${nextStatus}.`,
        type: 'success',
      });
      // Sync selected inquiry if open in modal
      if (selectedInquiry?.id === id) {
        setSelectedInquiry((prev) => prev ? { ...prev, status: nextStatus, is_read: true } : null);
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        message: err.message || 'Failed to update status.',
        type: 'error',
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry? This cannot be undone.')) return;
    setProcessingId(id);
    try {
      await deleteInquiry(id);
      
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      toast({
        title: 'Inquiry Deleted',
        message: 'The inquiry record was deleted from database.',
        type: 'success',
      });
      if (selectedInquiry?.id === id) {
        setIsMsgOpen(false);
        setSelectedInquiry(null);
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        message: err.message || 'Failed to delete inquiry.',
        type: 'error',
      });
    } finally {
      setProcessingId(null);
    }
  };

  const openInquiryReader = async (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setIsMsgOpen(true);
    
    // Automatically mark as read if it is currently unread
    if (!inq.is_read) {
      try {
        await markInquiryAsRead(inq.id, true);
        setInquiries((prev) =>
          prev.map((i) => (i.id === inq.id ? { ...i, is_read: true } : i))
        );
      } catch (err) {
        console.error('Failed to auto-mark as read:', err);
      }
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      
      <div className="border border-border/40 bg-card rounded-lg overflow-hidden glass-panel">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10%]">Read</TableHead>
              <TableHead className="w-[20%]">Sender</TableHead>
              <TableHead className="w-[25%]">Project Type</TableHead>
              <TableHead className="w-[15%]">Timeline</TableHead>
              <TableHead className="w-[15%]">Date</TableHead>
              <TableHead className="w-[15%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.length > 0 ? (
              inquiries.map((inq) => (
                <TableRow key={inq.id} className={cn(!inq.is_read && 'bg-amber-500/5 font-semibold text-foreground')}>
                  <TableCell>
                    <button
                      onClick={() => handleReadToggle(inq)}
                      disabled={processingId === inq.id}
                      className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      {inq.is_read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4 text-amber-500" />}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <span className="block text-foreground truncate max-w-[150px]">{inq.name}</span>
                      {inq.company_or_brand && (
                        <span className="block text-[10px] text-muted-foreground truncate max-w-[150px]">
                          @{inq.company_or_brand}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <span className="block text-foreground truncate max-w-[200px]">{inq.project_type}</span>
                      <span className="block text-[9px] text-muted-foreground">{inq.budget_range || 'No budget range'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={inq.timeline === 'ASAP' ? 'destructive' : 'outline'}>
                      {inq.timeline}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(inq.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openInquiryReader(inq)}
                        className="h-7 text-[10px]"
                      >
                        Read
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(inq.id)}
                        disabled={processingId === inq.id}
                        className="h-7 w-7 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-16 text-muted-foreground">
                  Inbound inquiries folder is vacant.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Inquiry Detail Modal */}
      <Dialog
        isOpen={isMsgOpen}
        onClose={() => {
          setIsMsgOpen(false);
          setSelectedInquiry(null);
        }}
        title="INQUIRY PARAMETERS REGISTER"
      >
        {selectedInquiry && (
          <div className="space-y-5 font-mono text-xs">
            
            {/* Metadata Fields */}
            <div className="grid grid-cols-2 gap-4 border-b border-border/20 pb-4">
              <div>
                <span className="block text-[10px] text-muted-foreground uppercase">Sender Name</span>
                <span className="text-foreground font-bold">{selectedInquiry.name}</span>
              </div>
              <div>
                <span className="block text-[10px] text-muted-foreground uppercase">Contact Email</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-primary hover:underline font-semibold block">
                  {selectedInquiry.email}
                </a>
              </div>
              {selectedInquiry.company_or_brand && (
                <div>
                  <span className="block text-[10px] text-muted-foreground uppercase">Company</span>
                  <span className="text-foreground font-bold">{selectedInquiry.company_or_brand}</span>
                </div>
              )}
              {selectedInquiry.phone_or_whatsapp && (
                <div>
                  <span className="block text-[10px] text-muted-foreground uppercase">Phone / WhatsApp</span>
                  <span className="text-foreground font-bold flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span>{selectedInquiry.phone_or_whatsapp}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Scope specifications */}
            <div className="grid grid-cols-3 gap-4 border-b border-border/20 pb-4">
              <div>
                <span className="block text-[10px] text-muted-foreground uppercase">Project Type</span>
                <span className="text-primary font-bold">{selectedInquiry.project_type}</span>
              </div>
              <div>
                <span className="block text-[10px] text-muted-foreground uppercase">Budget Range</span>
                <span className="text-foreground font-bold">{selectedInquiry.budget_range || 'Not specified'}</span>
              </div>
              <div>
                <span className="block text-[10px] text-muted-foreground uppercase">Timeline</span>
                <Badge variant={selectedInquiry.timeline === 'ASAP' ? 'destructive' : 'outline'}>
                  {selectedInquiry.timeline}
                </Badge>
              </div>
            </div>

            {selectedInquiry.existing_website_or_social_link && (
              <div className="border-b border-border/20 pb-4">
                <span className="block text-[10px] text-muted-foreground uppercase">Current Website / Social</span>
                <a
                  href={selectedInquiry.existing_website_or_social_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline font-bold flex items-center gap-1 text-[10px]"
                >
                  <span>{selectedInquiry.existing_website_or_social_link}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}

            {/* Message Body */}
            <div className="space-y-2">
              <span className="block text-[10px] text-muted-foreground uppercase flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Message Description</span>
              </span>
              <div className="bg-secondary/40 border border-border/40 p-4 rounded font-sans text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-wrap items-center justify-between border-t border-border/20 pt-4 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground uppercase">STATUS:</span>
                <div className="flex gap-1.5">
                  {(['new', 'reviewed', 'contacted', 'archived'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedInquiry.id, status)}
                      disabled={processingId !== null}
                      className={cn(
                        'px-2 py-0.5 text-[9px] rounded font-bold uppercase transition-all cursor-pointer border',
                        selectedInquiry.status === status
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-secondary text-muted-foreground border-border/40 hover:text-foreground'
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Logged: {formatDate(selectedInquiry.created_at)}</span>
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(selectedInquiry.id)}
                  disabled={processingId !== null}
                  className="h-7 w-7 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

          </div>
        )}
      </Dialog>

    </div>
  );
}
