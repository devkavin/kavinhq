import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdminCounts, listTable } from "@/lib/data/admin";
import type { ContactInquiry, Note, Project } from "@/types/database";
import { formatDate } from "@/lib/utils";

export default async function AdminHome() {
  const [counts, inquiries, projects, notes] = await Promise.all([
    getAdminCounts(),
    listTable<ContactInquiry>("contact_inquiries"),
    listTable<Project>("projects"),
    listTable<Note>("notes")
  ]);
  const cards = [
    ["Total projects", counts.projects],
    ["Published projects", counts.publishedProjects],
    ["Draft notes", counts.draftNotes],
    ["Contact inquiries", counts.inquiries],
    ["Unread inquiries", counts.unread]
  ];
  return (
    <div>
      <h1 className="font-[var(--font-space)] text-3xl font-semibold text-white">Command Overview</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {cards.map(([label, value]) => <Card key={label} className="p-5"><p className="text-sm text-slate-400">{label}</p><p className="mt-3 text-3xl font-semibold text-white">{value}</p></Card>)}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-semibold text-white">Recent inquiries</h2>
          <Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Type</TableHead><TableHead>Date</TableHead></TableRow></TableHeader><TableBody>{inquiries.slice(0, 5).map((item) => <TableRow key={item.id}><TableCell>{item.name}</TableCell><TableCell>{item.project_type}</TableCell><TableCell>{formatDate(item.created_at)}</TableCell></TableRow>)}</TableBody></Table>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold text-white">Recent content</h2>
          <Table><TableHeader><TableRow><TableHead>Item</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{[...projects.slice(0, 3), ...notes.slice(0, 3)].map((item) => <TableRow key={item.id}><TableCell>{item.title}</TableCell><TableCell>{item.status}</TableCell></TableRow>)}</TableBody></Table>
        </Card>
      </div>
    </div>
  );
}
