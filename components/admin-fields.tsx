import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function Field({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <label className="grid gap-2 text-sm text-slate-300">
      <span>{label}</span>
      {children}
    </label>
  );
}

export function TextField({ name, label, value = "", required = true }: { name: string; label: string; value?: string | number | null; required?: boolean }) {
  return (
    <Field label={label}>
      <Input defaultValue={value ?? ""} name={name} required={required} />
    </Field>
  );
}

export function TextAreaField({ name, label, rows = 5, value = "", required = true }: { name: string; label: string; rows?: number; value?: string | string[] | null; required?: boolean }) {
  return (
    <Field label={label}>
      <Textarea defaultValue={Array.isArray(value) ? value.join("\n") : value ?? ""} name={name} required={required} rows={rows} />
    </Field>
  );
}

export function StatusField({ value = "draft" }: { value?: string }) {
  return (
    <Field label="Status">
      <Select defaultValue={value} name="status">
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </Select>
    </Field>
  );
}
