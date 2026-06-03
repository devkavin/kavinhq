import { saveService } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { StatusField, TextAreaField, TextField } from "@/components/admin-fields";

export function ServiceForm({ service }: { service?: any }) {
  const action = saveService.bind(null, service?.id);

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="Title" name="title" value={service?.title} />
        <TextField label="Slug" name="slug" value={service?.slug} />
      </div>
      <TextAreaField label="Short description" name="description" rows={3} value={service?.description} />
      <TextAreaField label="Full details" name="details" rows={7} value={service?.details} />
      <div className="grid gap-5 md:grid-cols-3">
        <TextField label="Icon" name="icon" value={service?.icon} />
        <TextField label="Sort order" name="sort_order" value={service?.sort_order} />
        <StatusField value={service?.status} />
      </div>
      <Button className="w-fit" type="submit">Save Service</Button>
    </form>
  );
}
