import { TestimonialForm } from "@/components/testimonial-form";

export default function NewTestimonialPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-white">New Testimonial</h1>
      <div className="mt-8">
        <TestimonialForm />
      </div>
    </section>
  );
}
