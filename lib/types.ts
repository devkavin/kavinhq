export type Status = "draft" | "published";

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  overview: string;
  problem: string;
  goal: string;
  whatBuilt: string;
  techStack: string[];
  keyFeatures: string[];
  result: string;
  lessons: string;
  image: string;
  gallery: string[];
  year: string;
  category: string;
  status: Status;
  featured: boolean;
};

export type Note = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  status: Status;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  details: string;
  icon: string;
  status: Status;
  sortOrder: number;
};

export type ContactInquiry = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  timeline: string;
  link?: string;
  message: string;
};
