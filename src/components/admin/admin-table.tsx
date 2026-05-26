import Link from "next/link";
import { deleteContent } from "@/actions/admin";
import { ActionForm } from "@/components/admin/action-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Row = { id: string; title?: string; name?: string; slug?: string; status?: string; created_at?: string };
type TableName = "projects" | "notes" | "services" | "testimonials" | "lab_items";

export function AdminTable({ rows, table, basePath }: { rows: Row[]; table: TableName; basePath: string }) {
  return (
    <Table>
      <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead>Slug</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.title || row.name}</TableCell>
            <TableCell><Badge variant={row.status === "published" ? "success" : "secondary"}>{row.status || "draft"}</Badge></TableCell>
            <TableCell>{row.slug || "—"}</TableCell>
            <TableCell className="flex justify-end gap-2">
              <Button asChild variant="secondary" size="sm"><Link href={`${basePath}/${row.id}`}>Edit</Link></Button>
              <ActionForm action={async () => deleteContent(table, row.id)} confirm="Delete this item?"><Button type="submit" variant="destructive" size="sm">Delete</Button></ActionForm>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
