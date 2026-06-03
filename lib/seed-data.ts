import type { Note, Project, Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: "1",
    slug: "landing-page-development",
    title: "Landing Page Development",
    description: "Focused pages that communicate clearly and move people to act.",
    details: "For launches, campaigns, service offers, and focused conversion pages. I turn the core offer into a clean page with sharp copy structure, responsive UI, and reliable deployment.",
    icon: "PanelTop",
    status: "published",
    sortOrder: 1
  },
  {
    id: "2",
    slug: "business-website-development",
    title: "Business Website Development",
    description: "Professional websites that build trust and explain your business well.",
    details: "For companies that need a practical, polished website with clear navigation, service pages, contact flows, and content that can grow over time.",
    icon: "Building2",
    status: "published",
    sortOrder: 2
  },
  {
    id: "3",
    slug: "web-app-dashboard-development",
    title: "Web App / Dashboard Development",
    description: "Internal tools and dashboards shaped around real workflows.",
    details: "For teams replacing spreadsheets, manual handoffs, or scattered tools. I build usable interfaces, clean data flows, and secure admin experiences.",
    icon: "LayoutDashboard",
    status: "published",
    sortOrder: 3
  },
  {
    id: "4",
    slug: "website-redesign",
    title: "Website Redesign",
    description: "Modernize an existing website without losing what already works.",
    details: "For sites that feel dated, unclear, or hard to maintain. I improve structure, interface quality, performance, and the path from visitor to inquiry.",
    icon: "RefreshCw",
    status: "published",
    sortOrder: 4
  },
  {
    id: "5",
    slug: "technical-consultation",
    title: "Technical Consultation",
    description: "Clear technical direction before you commit time and budget.",
    details: "For founders and teams who need help scoping a build, choosing a stack, reviewing an existing system, or turning a rough idea into a buildable plan.",
    icon: "MessagesSquare",
    status: "published",
    sortOrder: 5
  }
];

export const projects: Project[] = [
  {
    id: "1",
    slug: "real-estate-platform",
    title: "Real Estate Platform",
    description: "Property listings, lead capture, and agent workflow tools.",
    overview: "A responsive web platform for a property business that needed a clearer way to publish listings, capture inquiries, and manage follow-ups.",
    problem: "Listings and customer conversations were scattered across manual channels, which made updates slower and lead tracking inconsistent.",
    goal: "Create a polished public experience and a simple operating layer for managing properties and inquiries.",
    whatBuilt: "I designed the listing flow, property detail pages, inquiry capture, admin management views, and reporting basics.",
    techStack: ["Next.js", "Laravel", "PostgreSQL", "Tailwind CSS"],
    keyFeatures: ["Searchable property listings", "Lead capture forms", "Admin listing management", "Inquiry tracking"],
    result: "The business gained a clearer web presence and a more reliable path from visitor interest to follow-up.",
    lessons: "Operational tools work best when the public experience and back-office flow are designed together.",
    image: "/images/project-real-estate.svg",
    gallery: ["/images/project-real-estate.svg", "/images/project-dashboard.svg"],
    year: "2026",
    category: "Web Applications",
    status: "published",
    featured: true
  },
  {
    id: "2",
    slug: "task-management-system",
    title: "Task Management System",
    description: "A team workspace for tasks, ownership, and reporting.",
    overview: "A web system for a small team that needed better visibility across task progress, deadlines, and responsibilities.",
    problem: "Work was moving through chat and spreadsheets, making it difficult to see ownership and priorities.",
    goal: "Build a clean dashboard that keeps daily work visible without making the interface feel heavy.",
    whatBuilt: "I built task boards, status views, filters, role-based access, and summary reporting.",
    techStack: ["Next.js", "ASP.NET Core", "SQL Server", "Tailwind CSS"],
    keyFeatures: ["Task assignment", "Status filters", "Team dashboards", "Role-based access"],
    result: "The team moved recurring work into one place and reduced manual status checking.",
    lessons: "A good dashboard should reduce questions, not create a new layer of work.",
    image: "/images/project-task.svg",
    gallery: ["/images/project-task.svg", "/images/project-dashboard.svg"],
    year: "2025",
    category: "Dashboards",
    status: "published",
    featured: true
  },
  {
    id: "3",
    slug: "fleetops-dashboard",
    title: "FleetOps Dashboard",
    description: "Fleet and asset management with real-time reporting views.",
    overview: "A dashboard concept for monitoring operational assets, maintenance states, and high-priority exceptions.",
    problem: "Operational teams needed a faster way to understand asset status and identify items needing attention.",
    goal: "Create an interface that makes exceptions obvious while keeping the main views calm and readable.",
    whatBuilt: "I built overview metrics, asset tables, detail views, and status-driven filtering.",
    techStack: ["React", "Supabase", "PostgreSQL", "Tailwind CSS"],
    keyFeatures: ["Asset status overview", "Maintenance tracking", "Filtered tables", "Activity summaries"],
    result: "The dashboard made routine checks faster and gave the team a clearer source of truth.",
    lessons: "Operational interfaces need hierarchy first; decoration comes much later.",
    image: "/images/project-dashboard.svg",
    gallery: ["/images/project-dashboard.svg", "/images/project-task.svg"],
    year: "2025",
    category: "Dashboards",
    status: "published",
    featured: true
  },
  {
    id: "4",
    slug: "restaurant-website",
    title: "Restaurant Website",
    description: "A refined website for menus, reservations, and private events.",
    overview: "A calm business website for a restaurant that needed a polished public presence and easy contact paths.",
    problem: "The existing web presence did not reflect the venue quality or make inquiries simple.",
    goal: "Design a premium, mobile-first website with clear menu and booking flows.",
    whatBuilt: "I created the homepage, menu pages, event inquiry flow, and responsive content structure.",
    techStack: ["Next.js", "Tailwind CSS", "Vercel"],
    keyFeatures: ["Menu pages", "Reservation CTA", "Private event inquiry", "Responsive layout"],
    result: "The site became easier to browse and better aligned with the business identity.",
    lessons: "For hospitality websites, visual restraint can make the actual venue feel more premium.",
    image: "/images/project-restaurant.svg",
    gallery: ["/images/project-restaurant.svg"],
    year: "2024",
    category: "Websites",
    status: "published",
    featured: false
  }
];

export const notes: Note[] = [
  {
    id: "1",
    slug: "building-scalable-web-applications",
    title: "Building Scalable Web Applications",
    excerpt: "A practical look at the decisions that keep a web system maintainable as it grows.",
    content: "Scalable web applications are not created by adding complexity early. They come from clear boundaries, thoughtful data models, predictable interfaces, and a habit of making tradeoffs explicit. The best systems are understandable enough for a team to operate and flexible enough to adapt when the workflow changes.",
    date: "2026-05-12",
    readTime: "6 min read",
    category: "Engineering",
    image: "/images/note-workspace.svg",
    status: "published"
  },
  {
    id: "2",
    slug: "designing-dashboards-that-teams-use",
    title: "Designing Dashboards That Teams Use",
    excerpt: "Useful dashboards are quiet, focused, and built around decisions.",
    content: "A dashboard should help someone decide what to do next. That means fewer decorative metrics, stronger grouping, and a clear distinction between overview, exceptions, and detail. When the interface respects the way the team already thinks, adoption becomes much easier.",
    date: "2026-04-28",
    readTime: "5 min read",
    category: "Design",
    image: "/images/note-code.svg",
    status: "published"
  },
  {
    id: "3",
    slug: "planning-before-writing-code",
    title: "How I Plan a Project Before Writing Code",
    excerpt: "The questions I use to turn a rough idea into a buildable scope.",
    content: "Planning is not about creating a perfect document. It is about reducing avoidable uncertainty. I start with the outcome, the users, the workflow, the content, and the data that needs to move through the system. Once those are clear, the build becomes much more grounded.",
    date: "2026-04-15",
    readTime: "4 min read",
    category: "Process",
    image: "/images/note-planning.svg",
    status: "published"
  }
];
