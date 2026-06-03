import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/testimonial-form";
import { adminGet } from "@/lib/admin-data";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await adminGet("testimonials", id);
  if (!testimonial) notFound();

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-white">Edit Testimonial</h1>
      <div className="mt-8">
        <TestimonialForm testimonial={testimonial} />
      </div>
    </section>
  );
}
