import { saveSetting } from "@/lib/admin-actions";
import { adminList } from "@/lib/admin-data";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminSettingsPage() {
  const settings = await adminList("site_settings", "key", true);

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-white">Settings</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
        Store JSON settings for brand, contact, or site-level configuration.
      </p>
      <div className="mt-8 grid gap-6">
        <form action={saveSetting} className="rounded-lg border border-slate-800 bg-slate-950/35 p-5">
          <label className="grid gap-2 text-sm text-slate-300">
            Key
            <input className="h-11 rounded-md border border-slate-700 bg-slate-950/35 px-3 text-sm text-slate-100" name="key" placeholder="brand" required />
          </label>
          <label className="mt-4 grid gap-2 text-sm text-slate-300">
            JSON value
            <Textarea name="value" placeholder='{"name":"Kavin HQ"}' required rows={8} />
          </label>
          <button className="mt-5 rounded-md border border-sky-400/35 bg-sky-400 px-5 py-2 text-sm font-medium text-slate-950" type="submit">
            Save Setting
          </button>
        </form>
        <div className="overflow-hidden rounded-lg border border-slate-800">
          {settings.map((setting: any) => (
            <div className="border-b border-slate-800 bg-slate-950/30 p-5 last:border-0" key={setting.id}>
              <p className="font-medium text-white">{setting.key}</p>
              <pre className="mt-3 overflow-auto rounded-md bg-slate-950 p-4 text-xs leading-6 text-slate-400">{JSON.stringify(setting.value, null, 2)}</pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
