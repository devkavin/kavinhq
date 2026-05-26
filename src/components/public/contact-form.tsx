"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { createInquiry } from "@/actions/inquiries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { budgetOptions, projectTypeOptions, timelineOptions } from "@/lib/constants/site";

const initialState = { ok: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg">
      <Send className="size-4" />
      {pending ? "Sending..." : "Send Inquiry"}
    </Button>
  );
}

export function ContactForm() {
  const [state, action] = useActionState(createInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.message) return;
    if (state.ok) {
      toast.success(state.message);
      formRef.current?.reset();
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className="glass grid gap-5 rounded-lg p-6">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="source" value="contact-page" />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="company_or_brand">Company or brand</Label>
          <Input id="company_or_brand" name="company_or_brand" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone_or_whatsapp">Phone or WhatsApp</Label>
          <Input id="phone_or_whatsapp" name="phone_or_whatsapp" />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <div className="grid gap-2">
          <Label>Project type</Label>
          <Select name="project_type" required defaultValue={projectTypeOptions[0]}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{projectTypeOptions.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Budget range</Label>
          <Select name="budget_range" defaultValue={budgetOptions[0]}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{budgetOptions.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Timeline</Label>
          <Select name="timeline" required defaultValue={timelineOptions[3]}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{timelineOptions.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="existing_website_or_social_link">Existing website or social link</Label>
        <Input id="existing_website_or_social_link" name="existing_website_or_social_link" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Project notes</Label>
        <Textarea id="message" name="message" required placeholder="What are you building, improving, or trying to make clearer?" />
      </div>
      <SubmitButton />
    </form>
  );
}
