import { Badge } from "@/components/ui/badge";

export function HqStatus() {
  return (
    <div className="glass rounded-lg p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">HQ status</p>
        <Badge variant="success">Online</Badge>
      </div>
      <dl className="mt-5 grid gap-4 text-sm">
        <div>
          <dt className="text-slate-500">Current focus</dt>
          <dd className="mt-1 text-slate-100">Business websites, dashboards, and product systems</dd>
        </div>
        <div>
          <dt className="text-slate-500">Availability</dt>
          <dd className="mt-1 text-slate-100">Open for selected projects</dd>
        </div>
        <div>
          <dt className="text-slate-500">Response</dt>
          <dd className="mt-1 text-slate-100">Usually within 24 hours</dd>
        </div>
      </dl>
    </div>
  );
}
