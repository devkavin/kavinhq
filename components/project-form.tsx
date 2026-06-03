import { saveProject } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Field, StatusField, TextAreaField, TextField } from "@/components/admin-fields";

export function ProjectForm({ project }: { project?: any }) {
  const action = saveProject.bind(null, project?.id);

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="Title" name="title" value={project?.title} />
        <TextField label="Slug" name="slug" value={project?.slug} />
      </div>
      <TextAreaField label="One-line description" name="description" rows={3} value={project?.description} />
      <div className="grid gap-5 md:grid-cols-3">
        <TextField label="Year" name="year" value={project?.year} />
        <TextField label="Category" name="category" value={project?.category} />
        <StatusField value={project?.status} />
      </div>
      <TextField label="Image URL/path" name="image" value={project?.image} />
      <TextAreaField label="Gallery image URLs/paths" name="gallery" rows={3} value={project?.gallery} required={false} />
      <TextAreaField label="Overview" name="overview" value={project?.overview} />
      <TextAreaField label="Problem" name="problem" value={project?.problem} />
      <TextAreaField label="Goal" name="goal" value={project?.goal} />
      <TextAreaField label="What I Built" name="what_built" value={project?.what_built} />
      <TextAreaField label="Tech Stack" name="tech_stack" rows={4} value={project?.tech_stack} />
      <TextAreaField label="Key Features" name="key_features" rows={4} value={project?.key_features} />
      <TextAreaField label="Result" name="result" value={project?.result} />
      <TextAreaField label="Lessons" name="lessons" value={project?.lessons} />
      <Field label="Featured on homepage">
        <input className="h-5 w-5 accent-sky-400" defaultChecked={project?.featured} name="featured" type="checkbox" />
      </Field>
      <Button className="w-fit" type="submit">Save Project</Button>
    </form>
  );
}
