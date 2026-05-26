import { deleteInquiry, updateInquiry } from "@/actions/admin";
import { ActionForm } from "@/components/admin/action-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { listTable } from "@/lib/data/admin";
import { formatDate } from "@/lib/utils";
import type { ContactInquiry } from "@/types/database";

export default async function InquiriesPage() {
  const rows = await listTable<ContactInquiry>("contact_inquiries");
  return (
    <div>
      <h1 className="font-[var(--font-space)] text-3xl font-semibold text-white">Contact Inquiries</h1>
      <Card className="mt-6 p-3">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Project</TableHead><TableHead>Message</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {rows.map((item) => (
              <TableRow key={item.id}>
                <TableCell><p>{item.name}</p><p className="text-xs text-slate-500">{item.email}</p></TableCell>
                <TableCell>{item.project_type}</TableCell>
                <TableCell className="max-w-sm"><p className="line-clamp-3">{item.message}</p></TableCell>
                <TableCell><Badge variant={item.is_read ? "secondary" : "default"}>{item.status}</Badge></TableCell>
                <TableCell>{formatDate(item.created_at)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <ActionForm action={async (_s, fd) => updateInquiry(item.id, fd)}>
                      <input type="hidden" name="status" value={item.status === "new" ? "reviewed" : item.status} />
                      <input type="hidden" name="is_read" value="on" />
                      <Button size="sm" variant="secondary">Mark read</Button>
                    </ActionForm>
                    <ActionForm action={async () => deleteInquiry(item.id)} confirm="Delete inquiry?">
                      <Button size="sm" variant="destructive">Delete</Button>
                    </ActionForm>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
