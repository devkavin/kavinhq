import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Please choose a project type."),
  timeline: z.string().min(1, "Please choose a timeline."),
  link: z.string().optional(),
  message: z.string().min(10, "Please share a little more about the project.")
});
