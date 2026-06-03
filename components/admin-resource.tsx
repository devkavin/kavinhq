import { Button } from "@/components/ui/button";

type ResourceItem = {
  title: string;
  description?: string;
  meta?: string;
  status?: string;
};

export function AdminResource({ title, description, items }: { title: string; description: string; items: ResourceItem[] }) {
  return (
    <section>
      <div className="flex flex-col justify-between gap-5 border-b border-slate-800 pb-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
        </div>
        <Button variant="secondary">New item</Button>
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border border-slate-800">
        {items.map((item) => (
          <div className="grid gap-3 border-b border-slate-800 bg-slate-950/30 p-5 last:border-0 md:grid-cols-[1fr_140px_100px]" key={item.title}>
            <div>
              <p className="font-medium text-white">{item.title}</p>
              {item.description ? <p className="mt-1 text-sm text-slate-400">{item.description}</p> : null}
            </div>
            <p className="text-sm text-slate-500">{item.meta}</p>
            <p className="text-sm capitalize text-sky-300">{item.status ?? "draft"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
