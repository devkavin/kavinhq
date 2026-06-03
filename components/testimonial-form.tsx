import { saveTestimonial } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { StatusField, TextAreaField, TextField } from "@/components/admin-fields";

export function TestimonialForm({ testimonial }: { testimonial?: any }) {
  const action = saveTestimonial.bind(null, testimonial?.id);

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-5 md:grid-cols-2">
        <TextField label="Name" name="name" value={testimonial?.name} />
        <TextField label="Company" name="company" required={false} value={testimonial?.company} />
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <TextField label="Role" name="role" required={false} value={testimonial?.role} />
        <TextField label="Sort order" name="sort_order" value={testimonial?.sort_order} />
        <StatusField value={testimonial?.status} />
      </div>
      <TextAreaField label="Quote" name="quote" rows={7} value={testimonial?.quote} />
      <Button className="w-fit" type="submit">Save Testimonial</Button>
    </form>
  );
}
