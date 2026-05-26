"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { upsertContent } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LabItem, Note, Project, Service, Testimonial } from "@/types/database";

type Table = "projects" | "notes" | "services" | "testimonials" | "lab_items";
type Content = Partial<Project & Note & Service & Testimonial & LabItem>;

export function ContentForm({ table, item }: { table: Table; item?: Content }) {
  const [state, action] = useActionState(
    async (_state: { ok: boolean; message: string }, formData: FormData) => upsertContent(table, item?.id || null, formData),
    { ok: false, message: "" }
  );
  useEffect(() => {
    if (!state.message) return;
    if (state.ok) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);
  return (
    <form action={action} className="grid gap-5 rounded-lg border border-slate-800 bg-slate-950/40 p-5">
      <Grid>
        <Field name="title" label="Title" value={item?.title} required />
        <Field name="slug" label="Slug" value={item?.slug} required />
      </Grid>
      {table !== "testimonials" ? <Field name="excerpt" label="Excerpt" value={item?.excerpt} /> : null}
      {table === "projects" ? <ProjectFields item={item} /> : null}
      {table === "notes" ? <NoteFields item={item} /> : null}
      {table === "services" ? <ServiceFields item={item} /> : null}
      {table === "testimonials" ? <TestimonialFields item={item} /> : null}
      {table === "lab_items" ? <LabFields item={item} /> : null}
      <Grid>
        <SelectStatus value={item?.status || "draft"} />
        <Field name="sort_order" label="Sort order" type="number" value={item?.sort_order ?? 0} />
      </Grid>
      <Button type="submit">Save</Button>
    </form>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>;
}

function Field({ name, label, value, type = "text", required = false }: { name: string; label: string; value?: unknown; type?: string; required?: boolean }) {
  return <div className="grid gap-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} type={type} required={required} defaultValue={String(value ?? "")} /></div>;
}

function Area({ name, label, value, rows = 4 }: { name: string; label: string; value?: unknown; rows?: number }) {
  return <div className="grid gap-2"><Label htmlFor={name}>{label}</Label><Textarea id={name} name={name} rows={rows} defaultValue={Array.isArray(value) ? value.join("\n") : String(value ?? "")} /></div>;
}

function SelectStatus({ value }: { value: string }) {
  return <div className="grid gap-2"><Label htmlFor="status">Status</Label><select id="status" name="status" defaultValue={value} className="h-11 rounded-md border border-slate-700 bg-slate-950 px-3 text-sm"><option value="draft">draft</option><option value="published">published</option></select></div>;
}

function ProjectFields({ item }: { item?: Content }) {
  return (
    <>
      <Area name="summary" label="Summary" value={item?.summary} />
      <Grid><Field name="category" label="Category" value={item?.category} /><Field name="year" label="Year" value={item?.year} /></Grid>
      <Grid><Field name="role" label="Role" value={item?.role} /><Field name="focus" label="Focus" value={item?.focus} /></Grid>
      <Grid><Field name="stack" label="Stack tags comma-separated" value={item?.stack?.join(", ")} /><Field name="cover_image_url" label="Cover image URL" value={item?.cover_image_url} /></Grid>
      <label className="flex items-center gap-2 text-sm text-slate-200"><input type="checkbox" name="featured" defaultChecked={Boolean(item?.featured)} /> Featured</label>
      <Area name="gallery_images" label="Gallery image URLs, one per line" value={item?.gallery_images} />
      {["problem", "goal", "my_role", "tech_stack", "key_features", "architecture_flow", "challenges", "outcome", "what_i_learned"].map((name) => <Area key={name} name={name} label={name.replaceAll("_", " ")} value={(item as Record<string, unknown>)?.[name]} />)}
      <Grid><Field name="live_url" label="Live URL" value={item?.live_url} /><Field name="github_url" label="GitHub URL" value={item?.github_url} /></Grid>
    </>
  );
}

function NoteFields({ item }: { item?: Content }) {
  return (
    <>
      <Area name="content" label="Markdown content" value={item?.content} rows={10} />
      <Grid><Field name="category" label="Category" value={item?.category} /><Field name="tags" label="Tags comma-separated" value={item?.tags?.join(", ")} /></Grid>
      <Grid><Field name="cover_image_url" label="Cover image URL" value={item?.cover_image_url} /><Field name="read_time" label="Read time" type="number" value={item?.read_time ?? 4} /></Grid>
      <Grid><Field name="published_at" label="Published at" value={item?.published_at} /><Field name="seo_title" label="SEO title" value={item?.seo_title} /></Grid>
      <Area name="seo_description" label="SEO description" value={item?.seo_description} />
    </>
  );
}

function ServiceFields({ item }: { item?: Content }) {
  return <><Area name="short_description" label="Short description" value={item?.short_description} /><Area name="who_it_is_for" label="Who it is for" value={item?.who_it_is_for} /><Area name="what_is_included" label="What is included, one per line" value={item?.what_is_included} /><Area name="deliverables" label="Deliverables, one per line" value={item?.deliverables} /></>;
}

function TestimonialFields({ item }: { item?: Content }) {
  return <><Field name="role_or_company" label="Role or company" value={item?.role_or_company} /><Area name="quote" label="Quote" value={item?.quote} /><Field name="image_url" label="Image URL" value={item?.image_url} /></>;
}

function LabFields({ item }: { item?: Content }) {
  return <><Area name="description" label="Description" value={item?.description} /><Grid><Field name="image_url" label="Image URL" value={item?.image_url} /><Field name="external_url" label="External URL" value={item?.external_url} /></Grid><Field name="tags" label="Tags comma-separated" value={item?.tags?.join(", ")} /></>;
}
