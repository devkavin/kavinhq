import { updateInquiryStatus } from "@/lib/admin-actions";
import { adminList } from "@/lib/admin-data";

export default async function AdminInquiriesPage() {
  const inquiries = await adminList("contact_inquiries", "created_at");

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-white">Contact Inquiries</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
        Review project requests submitted through the public contact form.
      </p>
      <div className="mt-6 grid gap-4">
        {inquiries.length ? inquiries.map((inquiry: any) => {
          const action = updateInquiryStatus.bind(null, inquiry.id);
          return (
            <article className="rounded-lg border border-slate-800 bg-slate-950/35 p-5" key={inquiry.id}>
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <p className="font-semibold text-white">{inquiry.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{inquiry.email}{inquiry.phone ? ` · ${inquiry.phone}` : ""}</p>
                  <p className="mt-3 text-sm text-sky-300">{inquiry.project_type} · {inquiry.timeline}</p>
                </div>
                <form action={action} className="flex h-fit gap-2">
                  <select className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200" defaultValue={inquiry.status} name="status">
                    <option value="open">Open</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200" type="submit">Update</button>
                </form>
              </div>
              {inquiry.company ? <p className="mt-4 text-sm text-slate-400">Company: {inquiry.company}</p> : null}
              {inquiry.link ? <p className="mt-2 break-words text-sm text-slate-400">Link: {inquiry.link}</p> : null}
              <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-300">{inquiry.message}</p>
            </article>
          );
        }) : (
          <div className="rounded-lg border border-slate-800 bg-slate-950/35 p-6 text-sm text-slate-400">No inquiries yet.</div>
        )}
      </div>
    </section>
  );
}
