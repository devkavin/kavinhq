import Link from "next/link";
import { deleteRecord } from "@/lib/admin-actions";
import type { AdminTable } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";

export type AdminRow = {
  id: string;
  title: string;
  description?: string;
  meta?: string;
  status?: string;
};

export function AdminTable({
  description,
  editBasePath,
  newPath,
  rows,
  table,
  title
}: {
  description: string;
  editBasePath: string;
  newPath?: string;
  rows: AdminRow[];
  table: AdminTable;
  title: string;
}) {
  return (
    <section>
      <div className="flex flex-col justify-between gap-5 border-b border-slate-800 pb-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
        </div>
        {newPath ? <Button href={newPath} variant="secondary">New item</Button> : null}
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border border-slate-800">
        {rows.length ? (
          rows.map((row) => {
            const remove = deleteRecord.bind(null, table, row.id, editBasePath);
            return (
              <div className="grid gap-4 border-b border-slate-800 bg-slate-950/30 p-5 last:border-0 md:grid-cols-[1fr_140px_100px_160px]" key={row.id}>
                <div>
                  <p className="font-medium text-white">{row.title}</p>
                  {row.description ? <p className="mt-1 text-sm text-slate-400">{row.description}</p> : null}
                </div>
                <p className="text-sm text-slate-500">{row.meta}</p>
                <p className="text-sm capitalize text-sky-300">{row.status}</p>
                <div className="flex gap-2 md:justify-end">
                  <Link className="rounded-md border border-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:border-sky-300/35 hover:text-white" href={`${editBasePath}/${row.id}`}>
                    Edit
                  </Link>
                  <form action={remove}>
                    <button className="rounded-md border border-slate-800 px-3 py-2 text-sm text-slate-400 transition hover:border-red-300/35 hover:text-white" type="submit">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-slate-950/30 p-6 text-sm text-slate-400">No records yet.</div>
        )}
      </div>
    </section>
  );
}
