import { z } from 'zod';

// Contact Inquiry Validation
export const contactInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company_or_brand: z.string().optional(),
  phone_or_whatsapp: z.string().optional(),
  project_type: z.enum([
    'Landing Page Development',
    'Business Website Development',
    'Web App / Dashboard Development',
    'Website Redesign',
    'Technical Consultation',
    'Other',
  ]),
  budget_range: z.string().optional(),
  timeline: z.enum(['ASAP', '2-4 weeks', '1-2 months', 'Flexible']),
  existing_website_or_social_link: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  source: z.string().optional(),
  // Honeypot field for spam prevention
  website: z.string().max(0, { message: 'Spam detected' }).optional(), // should be empty
});

export type ContactInquiryInput = z.input<typeof contactInquirySchema>

// Project validation
export const projectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric and hyphens only'),
  excerpt: z.string().optional(),
  summary: z.string().optional(),
  category: z.string().min(2, 'Category must be at least 2 characters'),
  year: z.string().optional(),
  role: z.string().optional(),
  focus: z.string().optional(),
  status: z.enum(['draft', 'published']),
  featured: z.boolean().default(false),
  stack: z.array(z.string()).default([]),
  cover_image_url: z.string().optional().nullable(),
  gallery_images: z.array(z.string()).default([]),
  problem: z.string().optional(),
  goal: z.string().optional(),
  my_role: z.string().optional(),
  tech_stack: z.string().optional(),
  key_features: z.array(z.string()).default([]),
  architecture_flow: z.string().optional(),
  challenges: z.string().optional(),
  outcome: z.string().optional(),
  what_i_learned: z.string().optional(),
  live_url: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  github_url: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  sort_order: z.number().default(0),
});

export type ProjectInput = z.input<typeof projectSchema>

// Note validation
export const noteSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric and hyphens only'),
  excerpt: z.string().optional(),
  content: z.string().min(10, 'Content is required'),
  category: z.string().min(2, 'Category is required'),
  tags: z.array(z.string()).default([]),
  cover_image_url: z.string().optional().nullable(),
  status: z.enum(['draft', 'published']),
  published_at: z.string().optional().nullable(),
  read_time: z.number().optional().nullable(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
});

export type NoteInput = z.input<typeof noteSchema>

// Service validation
export const serviceSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug format invalid'),
  short_description: z.string().optional(),
  who_it_is_for: z.string().optional(),
  what_is_included: z.array(z.string()).default([]),
  deliverables: z.array(z.string()).default([]),
  sort_order: z.number().default(0),
  status: z.enum(['draft', 'published']),
});

export type ServiceInput = z.input<typeof serviceSchema>

// Testimonial validation
export const testimonialSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  role_or_company: z.string().optional(),
  quote: z.string().min(1, 'Quote is required'),
  image_url: z.string().optional().nullable(),
  status: z.enum(['draft', 'published']),
  sort_order: z.number().default(0),
});

export type TestimonialInput = z.input<typeof testimonialSchema>

// Lab Item validation
export const labItemSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug format invalid'),
  excerpt: z.string().optional(),
  description: z.string().optional(),
  image_url: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published']),
  external_url: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  sort_order: z.number().default(0),
});

export type LabItemInput = z.input<typeof labItemSchema>
