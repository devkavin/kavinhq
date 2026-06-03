"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitInquiry } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { inquirySchema } from "@/lib/validation";

const projectTypes = [
  "Landing Page Development",
  "Business Website Development",
  "Web App / Dashboard Development",
  "Website Redesign",
  "Technical Consultation",
  "Other"
];

type InquiryForm = z.infer<typeof inquirySchema>;

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      projectType: "",
      timeline: "",
      link: "",
      message: ""
    }
  });

  function onSubmit(values: InquiryForm) {
    startTransition(async () => {
      const result = await submitInquiry(values);
      setMessage(result.message);
      if (result.ok) reset();
    });
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 md:grid-cols-2">
        <Field error={errors.name?.message} label="Name">
          <Input placeholder="Your name" {...register("name")} />
        </Field>
        <Field error={errors.email?.message} label="Email">
          <Input placeholder="name@email.com" type="email" {...register("email")} />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Company/brand">
          <Input placeholder="Your company or brand" {...register("company")} />
        </Field>
        <Field label="Phone/WhatsApp optional">
          <Input placeholder="+94..." {...register("phone")} />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field error={errors.projectType?.message} label="Project type">
          <Select {...register("projectType")}>
            <option value="">Select project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </Field>
        <Field error={errors.timeline?.message} label="Timeline">
          <Select {...register("timeline")}>
            <option value="">Select timeline</option>
            <option value="ASAP">ASAP</option>
            <option value="2-4 weeks">2-4 weeks</option>
            <option value="1-2 months">1-2 months</option>
            <option value="Flexible">Flexible</option>
          </Select>
        </Field>
      </div>
      <Field label="Existing website/social link optional">
        <Input placeholder="https://example.com" {...register("link")} />
      </Field>
      <Field error={errors.message?.message} label="Message">
        <Textarea placeholder="Tell me about your project..." {...register("message")} />
      </Field>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button disabled={isPending} type="submit">
          {isPending ? "Sending..." : "Send Message"}
        </Button>
        {message ? <p className="text-sm text-slate-400">{message}</p> : null}
      </div>
    </form>
  );
}

function Field({ children, error, label }: { children: React.ReactNode; error?: string; label: string }) {
  return (
    <label className="grid gap-2 text-sm text-slate-300">
      <span>{label}</span>
      {children}
      {error ? <span className="text-xs text-sky-300">{error}</span> : null}
    </label>
  );
}
