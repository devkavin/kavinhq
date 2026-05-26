import { z } from "zod";

const arrayText = z.string().transform((value) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
);

export const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().optional(),
  summary: z.string().optional(),
  category: z.string().optional(),
  year: z.string().optional(),
  role: z.string().optional(),
  focus: z.string().optional(),
  status: z.enum(["draft", "published"]),
  featured: z.coerce.boolean().default(false),
  stack: z.string().transform((value) => value.split(",").map((item) => item.trim()).filter(Boolean)),
  cover_image_url: z.string().optional(),
  gallery_images: z.string().transform((value) => value.split("\n").map((item) => item.trim()).filter(Boolean)),
  problem: z.string().optional(),
  goal: z.string().optional(),
  my_role: z.string().optional(),
  tech_stack: z.string().optional(),
  key_features: arrayText,
  architecture_flow: z.string().optional(),
  challenges: z.string().optional(),
  outcome: z.string().optional(),
  what_i_learned: z.string().optional(),
  live_url: z.string().optional(),
  github_url: z.string().optional(),
  sort_order: z.coerce.number().default(0)
});

export const noteSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  category: z.string().optional(),
  tags: z.string().transform((value) => value.split(",").map((item) => item.trim()).filter(Boolean)),
  cover_image_url: z.string().optional(),
  status: z.enum(["draft", "published"]),
  published_at: z.string().optional(),
  read_time: z.coerce.number().default(4),
  seo_title: z.string().optional(),
  seo_description: z.string().optional()
});

export const serviceSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  short_description: z.string().optional(),
  who_it_is_for: z.string().optional(),
  what_is_included: arrayText,
  deliverables: arrayText,
  status: z.enum(["draft", "published"]),
  sort_order: z.coerce.number().default(0)
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  role_or_company: z.string().optional(),
  quote: z.string().min(10),
  image_url: z.string().optional(),
  status: z.enum(["draft", "published"]),
  sort_order: z.coerce.number().default(0)
});

export const labSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().optional(),
  description: z.string().optional(),
  image_url: z.string().optional(),
  tags: z.string().transform((value) => value.split(",").map((item) => item.trim()).filter(Boolean)),
  status: z.enum(["draft", "published"]),
  external_url: z.string().optional(),
  sort_order: z.coerce.number().default(0)
});
