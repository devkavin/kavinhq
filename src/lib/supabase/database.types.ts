export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type RowBase = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type SiteSettingRow = RowBase & {
  key: string;
  value: Json;
};

export type ServiceRow = RowBase & {
  title: string;
  slug: string;
  short_description: string | null;
  who_it_is_for: string | null;
  what_is_included: string[];
  deliverables: string[];
  sort_order: number;
  status: string;
};

export type ProjectRow = RowBase & {
  title: string;
  slug: string;
  excerpt: string | null;
  summary: string | null;
  category: string;
  year: string | null;
  role: string | null;
  focus: string | null;
  status: string;
  featured: boolean;
  stack: string[];
  cover_image_url: string | null;
  gallery_images: string[];
  problem: string | null;
  goal: string | null;
  my_role: string | null;
  tech_stack: string | null;
  key_features: string[];
  architecture_flow: string | null;
  challenges: string | null;
  outcome: string | null;
  what_i_learned: string | null;
  live_url: string | null;
  github_url: string | null;
  sort_order: number;
};

export type NoteRow = RowBase & {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  tags: string[];
  cover_image_url: string | null;
  status: string;
  published_at: string | null;
  read_time: number | null;
  seo_title: string | null;
  seo_description: string | null;
};

export type TestimonialRow = RowBase & {
  name: string;
  role_or_company: string | null;
  quote: string;
  image_url: string | null;
  status: string;
  sort_order: number;
};

export type LabItemRow = RowBase & {
  title: string;
  slug: string;
  excerpt: string | null;
  description: string | null;
  image_url: string | null;
  tags: string[];
  status: string;
  external_url: string | null;
  sort_order: number;
};

export type ContactInquiryRow = {
  id: string;
  name: string;
  email: string;
  company_or_brand: string | null;
  phone_or_whatsapp: string | null;
  project_type: string;
  budget_range: string | null;
  timeline: string;
  existing_website_or_social_link: string | null;
  message: string;
  source: string | null;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
  is_read: boolean;
  is_spam: boolean;
  created_at: string;
  updated_at: string;
};

export type MediaAssetRow = {
  id: string;
  file_name: string;
  file_path: string;
  public_url: string;
  bucket: string;
  mime_type: string;
  size_bytes: number;
  uploaded_by: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: { email: string; created_at: string };
        Insert: { email: string; created_at?: string };
        Update: { email?: string; created_at?: string };
        Relationships: [];
      };
      site_settings: {
        Row: SiteSettingRow;
        Insert: Partial<RowBase> & Pick<SiteSettingRow, 'key' | 'value'>;
        Update: Partial<SiteSettingRow>;
        Relationships: [];
      };
      services: {
        Row: ServiceRow;
        Insert: Partial<RowBase> & Pick<ServiceRow, 'title' | 'slug'> & Partial<Omit<ServiceRow, keyof RowBase | 'title' | 'slug'>>;
        Update: Partial<ServiceRow>;
        Relationships: [];
      };
      projects: {
        Row: ProjectRow;
        Insert: Partial<RowBase> & Pick<ProjectRow, 'title' | 'slug' | 'category'> & Partial<Omit<ProjectRow, keyof RowBase | 'title' | 'slug' | 'category'>>;
        Update: Partial<ProjectRow>;
        Relationships: [];
      };
      notes: {
        Row: NoteRow;
        Insert: Partial<RowBase> & Pick<NoteRow, 'title' | 'slug' | 'content' | 'category'> & Partial<Omit<NoteRow, keyof RowBase | 'title' | 'slug' | 'content' | 'category'>>;
        Update: Partial<NoteRow>;
        Relationships: [];
      };
      testimonials: {
        Row: TestimonialRow;
        Insert: Partial<RowBase> & Pick<TestimonialRow, 'name' | 'quote'> & Partial<Omit<TestimonialRow, keyof RowBase | 'name' | 'quote'>>;
        Update: Partial<TestimonialRow>;
        Relationships: [];
      };
      lab_items: {
        Row: LabItemRow;
        Insert: Partial<RowBase> & Pick<LabItemRow, 'title' | 'slug'> & Partial<Omit<LabItemRow, keyof RowBase | 'title' | 'slug'>>;
        Update: Partial<LabItemRow>;
        Relationships: [];
      };
      contact_inquiries: {
        Row: ContactInquiryRow;
        Insert: Pick<ContactInquiryRow, 'name' | 'email' | 'project_type' | 'timeline' | 'message'> & Partial<Omit<ContactInquiryRow, 'id' | 'created_at' | 'updated_at'>>;
        Update: Partial<ContactInquiryRow>;
        Relationships: [];
      };
      media_assets: {
        Row: MediaAssetRow;
        Insert: Pick<MediaAssetRow, 'file_name' | 'file_path' | 'public_url' | 'bucket' | 'mime_type' | 'size_bytes'> & Partial<Pick<MediaAssetRow, 'id' | 'uploaded_by' | 'created_at'>>;
        Update: Partial<MediaAssetRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
