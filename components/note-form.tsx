import { saveNote } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { StatusField, TextAreaField, TextField } from "@/components/admin-fields";

export function NoteForm({ note }: { note?: any }) {
  const action = saveNote.bind(null, note?.id);

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="Title" name="title" value={note?.title} />
        <TextField label="Slug" name="slug" value={note?.slug} />
      </div>
      <TextAreaField label="Excerpt" name="excerpt" rows={3} value={note?.excerpt} />
      <div className="grid gap-5 md:grid-cols-3">
        <TextField label="Date" name="date" value={note?.date} />
        <TextField label="Read time" name="read_time" value={note?.read_time} />
        <StatusField value={note?.status} />
      </div>
      <TextField label="Category" name="category" value={note?.category} />
      <TextField label="Image URL/path" name="image" value={note?.image} />
      <TextAreaField label="Content" name="content" rows={12} value={note?.content} />
      <Button className="w-fit" type="submit">Save Note</Button>
    </form>
  );
}
