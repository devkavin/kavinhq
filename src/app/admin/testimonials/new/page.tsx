import { ContentForm } from "@/components/admin/content-form";

export default function NewTestimonialPage() {
  return <div><h1 className="mb-6 font-[var(--font-space)] text-3xl font-semibold text-white">Create Testimonial</h1><ContentForm table="testimonials" /></div>;
}
