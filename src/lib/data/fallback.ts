import type { Note, Project, Service } from "@/types/database";

const now = new Date().toISOString();

export const fallbackServices: Service[] = [
  {
    id: "landing-page-development",
    title: "Landing Page Development",
    slug: "landing-page-development",
    short_description: "Focused pages built to explain one offer clearly and convert serious visitors.",
    who_it_is_for: "Founders, consultants, and small teams launching a specific offer or campaign.",
    what_is_included: ["Content structure", "Responsive design", "Next.js implementation", "Analytics-ready deployment"],
    deliverables: ["Production landing page", "Contact or quote form", "Deployment support"],
    status: "published",
    sort_order: 1,
    created_at: now,
    updated_at: now
  },
  {
    id: "business-website-development",
    title: "Business Website Development",
    slug: "business-website-development",
    short_description: "Professional websites for businesses that need trust, clarity, and room to grow.",
    who_it_is_for: "Businesses that need a strong web presence without a bloated marketing site.",
    what_is_included: ["Information architecture", "Service pages", "CMS-ready content model", "SEO foundation"],
    deliverables: ["Responsive business website", "Admin-editable content", "Launch checklist"],
    status: "published",
    sort_order: 2,
    created_at: now,
    updated_at: now
  },
  {
    id: "web-app-dashboard-development",
    title: "Web App / Dashboard Development",
    slug: "web-app-dashboard-development",
    short_description: "Internal tools and dashboards for workflows that outgrow spreadsheets and manual tracking.",
    who_it_is_for: "Teams that need authenticated systems, reporting, admin panels, and workflow screens.",
    what_is_included: ["Data model planning", "Authenticated screens", "Role-aware admin flows", "Database-backed workflows"],
    deliverables: ["Web app or dashboard", "Database schema", "Deployment documentation"],
    status: "published",
    sort_order: 3,
    created_at: now,
    updated_at: now
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    slug: "website-redesign",
    short_description: "A structured rebuild for websites that need sharper UX, stronger performance, and cleaner messaging.",
    who_it_is_for: "Businesses with an existing website that no longer matches the quality of their work.",
    what_is_included: ["UX audit", "Content cleanup", "Visual redesign", "Performance improvements"],
    deliverables: ["Redesigned website", "Migration guidance", "Before/after notes"],
    status: "published",
    sort_order: 4,
    created_at: now,
    updated_at: now
  },
  {
    id: "technical-consultation",
    title: "Technical Consultation",
    slug: "technical-consultation",
    short_description: "Practical technical direction for teams deciding what to build, fix, or simplify next.",
    who_it_is_for: "Business owners, founders, and teams that need engineering judgment before committing budget.",
    what_is_included: ["Architecture review", "Stack guidance", "Deployment review", "Implementation roadmap"],
    deliverables: ["Technical recommendation", "Prioritized action plan", "Follow-up notes"],
    status: "published",
    sort_order: 5,
    created_at: now,
    updated_at: now
  }
];

export const fallbackProjects: Project[] = [
  {
    id: "operations-dashboard-blueprint",
    title: "Operations Dashboard Blueprint",
    slug: "operations-dashboard-blueprint",
    excerpt: "A reference dashboard concept for turning scattered business activity into a clear operating view.",
    summary: "A portfolio-ready example showing how Kavin HQ approaches dashboards, metrics, and admin workflows without claiming a client result.",
    category: "Dashboard",
    year: "2026",
    role: "Product engineer",
    focus: "Workflow visibility",
    status: "published",
    featured: true,
    stack: ["Next.js", "Supabase", "PostgreSQL", "Tailwind"],
    cover_image_url: "/images/placeholders/project.svg",
    gallery_images: [],
    problem: "Small teams often track operational work across chat, spreadsheets, and disconnected tools.",
    goal: "Design a single dashboard model that can surface status, ownership, and recent activity.",
    my_role: "I shaped the product flow, data model, and interface system.",
    tech_stack: "Next.js App Router, Supabase PostgreSQL, Tailwind CSS, protected admin routes.",
    key_features: ["Status overview", "Recent activity stream", "Role-aware management screens"],
    architecture_flow: "Public site collects inquiries, admin reviews records, dashboard summarizes work queues.",
    challenges: "The challenge is keeping the interface dense enough for repeated use without making it feel heavy.",
    outcome: "A clean dashboard pattern ready to adapt to a real business workflow.",
    what_i_learned: "Dashboards work best when they answer a few operational questions very quickly.",
    live_url: null,
    github_url: null,
    sort_order: 1,
    created_at: now,
    updated_at: now
  }
];

export const fallbackNotes: Note[] = [
  {
    id: "how-i-think-about-business-websites",
    title: "How I Think About Business Websites",
    slug: "how-i-think-about-business-websites",
    excerpt: "A business website should make the offer clear, reduce doubt, and give the visitor a practical next step.",
    content: "## Clarity before decoration\n\nA business website is not a gallery. It is a decision surface.\n\n## Systems thinking\n\nThe useful parts are content structure, speed, trust, conversion paths, and maintenance.",
    category: "Websites",
    tags: ["websites", "ux", "business"],
    cover_image_url: "/images/placeholders/note.svg",
    status: "published",
    published_at: now,
    read_time: 4,
    seo_title: "How I Think About Business Websites",
    seo_description: "A practical note on clear business website systems.",
    created_at: now,
    updated_at: now
  }
];
