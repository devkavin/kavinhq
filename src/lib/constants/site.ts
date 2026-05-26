import {
  Blocks,
  Compass,
  FileText,
  Home,
  Layers3,
  Mail,
  MessageSquare,
  Settings,
  Sparkles,
  Wrench
} from "lucide-react";

export const brand = {
  name: "Kavin HQ",
  domain: "kavinhq.com",
  adminEmail: process.env.ADMIN_EMAIL || "kavindra.senanayake@gmail.com"
};

export const publicNav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const stackChips = [
  "Laravel",
  "ASP.NET Core",
  "React",
  "Next.js",
  "PostgreSQL",
  "SQL Server",
  "Docker",
  "Vercel",
  "Supabase"
];

export const processSteps = ["Discover", "Plan", "Design", "Build", "Test", "Deploy", "Improve"];

export const serviceTitles = [
  "Landing Page Development",
  "Business Website Development",
  "Web App / Dashboard Development",
  "Website Redesign",
  "Technical Consultation"
];

export const adminNav = [
  { href: "/admin", label: "Overview", icon: Home },
  { href: "/admin/projects", label: "Projects", icon: Layers3 },
  { href: "/admin/notes", label: "Notes", icon: FileText },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/lab", label: "Lab Items", icon: Sparkles },
  { href: "/admin/inquiries", label: "Inquiries", icon: Mail },
  { href: "/admin/media", label: "Media", icon: Blocks },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/", label: "Public Site", icon: Compass }
];

export const projectTypeOptions = [...serviceTitles, "Other"];

export const budgetOptions = ["Not sure yet", "Small project", "Medium project", "Larger system"];

export const timelineOptions = ["ASAP", "2-4 weeks", "1-2 months", "Flexible"];
