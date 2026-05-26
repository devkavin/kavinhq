import { z } from "zod";
import { budgetOptions, projectTypeOptions, timelineOptions } from "@/lib/constants/site";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(180),
  company_or_brand: z.string().trim().max(180).optional().or(z.literal("")),
  phone_or_whatsapp: z.string().trim().max(80).optional().or(z.literal("")),
  project_type: z.enum(projectTypeOptions as [string, ...string[]]),
  budget_range: z.enum(budgetOptions as [string, ...string[]]).optional().or(z.literal("")),
  timeline: z.enum(timelineOptions as [string, ...string[]]),
  existing_website_or_social_link: z.string().trim().max(300).optional().or(z.literal("")),
  message: z.string().trim().min(20, "Share a little more about the project").max(4000),
  source: z.string().trim().max(120).optional().or(z.literal("")),
  website: z.string().max(0, "Spam check failed").optional()
});

export type InquiryInput = z.infer<typeof inquirySchema>;
