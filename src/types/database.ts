export type Status = "draft" | "published";

export type Project = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  summary: string | null;
  category: string | null;
  year: string | null;
  role: string | null;
  focus: string | null;
  status: Status;
  featured: boolean;
  stack: string[] | null;
  cover_image_url: string | null;
  gallery_images: string[] | null;
  problem: string | null;
  goal: string | null;
  my_role: string | null;
  tech_stack: string | null;
  key_features: string[] | null;
  architecture_flow: string | null;
  challenges: string | null;
  outcome: string | null;
  what_i_learned: string | null;
  live_url: string | null;
  github_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Note = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  tags: string[] | null;
  cover_image_url: string | null;
  status: Status;
  published_at: string | null;
  read_time: number | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  who_it_is_for: string | null;
  what_is_included: string[] | null;
  deliverables: string[] | null;
  status: Status;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role_or_company: string | null;
  quote: string;
  image_url: string | null;
  status: Status;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type LabItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  description: string | null;
  image_url: string | null;
  tags: string[] | null;
  status: Status;
  external_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ContactInquiry = {
  id: string;
  name: string;
  email: string;
  company_or_brand: string | null;
  phone_or_whatsapp: string | null;
  project_type: string | null;
  budget_range: string | null;
  timeline: string | null;
  existing_website_or_social_link: string | null;
  message: string;
  source: string | null;
  status: "new" | "reviewed" | "contacted" | "archived";
  is_read: boolean;
  created_at: string;
  updated_at: string;
};

export type MediaAsset = {
  id: string;
  file_name: string;
  file_path: string;
  public_url: string | null;
  bucket: string;
  mime_type: string | null;
  size_bytes: number | null;
  alt_text: string | null;
  created_at: string;
};

export type SiteSetting = {
  id: string;
  key: string;
  value: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};
