-- Seed Services in exact order
insert into public.services (title, slug, short_description, who_it_is_for, what_is_included, deliverables, sort_order, status)
values
(
  'Landing Page Development',
  'landing-page-development',
  'High-converting, performance-optimized, and premium single-page layouts designed to turn traffic into pipeline.',
  'SaaS startups, product launches, and lead-generation campaigns.',
  ARRAY['Custom UI/UX styling', 'Tailwind CSS production build', 'Interactive components via Framer Motion', 'Speed and SEO optimization', 'Analytics and tracking scripts integration'],
  ARRAY['Production-ready single page website', 'Analytics dashboard setup (Vercel/Google)', 'Source code files', 'Deployment support'],
  1,
  'published'
),
(
  'Business Website Development',
  'business-website-development',
  'Executive multi-page web presence detailing your team, mission, products, and insights, built for high trust.',
  'Professional firms, agency partners, and mid-sized enterprises.',
  ARRAY['Up to 8 custom structured pages', 'Dynamic blog or resources section', 'Contact form & CRM/Supabase integration', 'Content Management Dashboard', 'SEO & metadata optimization'],
  ARRAY['Multi-page Next.js web application', 'Admin content editor portal', 'Domain setup and DNS config', 'Training documentation'],
  2,
  'published'
),
(
  'Web App / Dashboard Development',
  'web-app-dashboard-development',
  'Tailored web applications, internal tools, customer portals, and real-time interactive business dashboards.',
  'Product teams, operations managers, and data-heavy businesses.',
  ARRAY['Database design & migrations (PostgreSQL)', 'Supabase Auth & Roles integrations', 'State management & caching', 'Interactive charts and tables', 'Real-time updates & webhooks'],
  ARRAY['Custom web app or dashboard portal', 'Secure DB instance & auth schemas', 'Interactive reports & exporting features', 'API documentation'],
  3,
  'published'
),
(
  'Website Redesign',
  'website-redesign',
  'Migrate legacy systems, modernize stale visual styles, optimize page load speed, and rebuild with cutting-edge tech.',
  'Established companies with low-performance sites or outdated architectures.',
  ARRAY['Full UX audit & layout improvements', 'Legacy platform data migration', 'Performance speed optimization (100% Core Web Vitals)', 'Mobile-first rewrite in Next.js', 'Consistent link structures to retain SEO value'],
  ARRAY['Fully rebuilt web system', 'Audit report (Before/After)', 'Migration verification checklist'],
  4,
  'published'
),
(
  'Technical Consultation',
  'technical-consultation',
  'Direct guidance on product architecture, technology stack decisions, database performance, and deployment systems.',
  'Founders, technical leaders, and development teams needing external oversight.',
  ARRAY['3x Architecture review sessions', 'Database schema auditing', 'Cloud hosting recommendations (Vercel/Hetzner)', 'CI/CD pipeline planning'],
  ARRAY['Comprehensive technical blueprint document', 'Performance review report', 'Recommended codebase templates'],
  5,
  'published'
);

-- Seed Site Settings
insert into public.site_settings (key, value)
values
(
  'availability',
  '{"status": "available", "message": "Open for selected projects"}'::jsonb
),
(
  'contact_info',
  '{"email": "contact@kavinhq.com", "response_time": "Usually within 24 hours"}'::jsonb
),
(
  'social_links',
  '{"github": "https://github.com/kavinhq", "linkedin": "https://linkedin.com/in/kavin", "twitter": "https://twitter.com/kavinhq"}'::jsonb
),
(
  'homepage_hero',
  '{"headline": "I build clean, reliable digital systems for businesses, teams, and real-world workflows.", "subheadline": "Kavin HQ is the home base for my software work, case studies, technical notes, and business-focused web solutions."}'::jsonb
);

-- Seed placeholder projects
insert into public.projects (title, slug, excerpt, summary, category, year, role, focus, status, featured, stack, cover_image_url, problem, goal, my_role, tech_stack, key_features, architecture_flow, challenges, outcome, what_i_learned, sort_order)
values
(
  'Vanguard Dashboard Systems',
  'vanguard-dashboard-systems',
  'A high-performance real-time telemetry control panel for industrial logistics workflows.',
  'Vanguard Dashboard is a mission-control level application built to monitor, manage, and coordinate automated logistics fleets in real-time.',
  'Web App / Dashboard Development',
  '2025',
  'Lead Systems Engineer',
  'Real-time Telemetry & Data Visualization',
  'published',
  true,
  ARRAY['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
  '/images/placeholders/vanguard.webp',
  'Automated fleets were producing millions of logs that could not be visualised in real-time, causing bottlenecks in dispatching.',
  'To build a web-based, low-latency control interface displaying fleet statuses and allowing routing overrides within 200ms.',
  'Designed database schemas, websocket servers, and client dashboard charts.',
  'Built with Next.js, tailwind, framer motion for sleek transitions, and Supabase database indexing.',
  ARRAY['Real-time SVG fleet tracking', 'Instant dispatch overriding form', 'Historical anomaly log reports', 'Sub-200ms status streaming'],
  'Fleet Devices -> MQTT Broker -> Go Telemetry Service -> PostgreSQL -> Next.js client via Websockets.',
  'Handling rapid data inserts without locking the main transactions table.',
  'Successfully reduced latency from 1.5s to 95ms and optimized dispatch dispatching by 34%.',
  'Proper database query optimization and canvas rendering are vital for high-density UI rendering.',
  1
),
(
  'Helios Commerce Platform',
  'helios-commerce-platform',
  'An enterprise-grade headless commerce storefront optimized for core web vitals.',
  'Helios Commerce is a high-speed storefront built with Next.js App Router and Stripe, achieving sub-second loads and direct checkout pathways.',
  'Business Website Development',
  '2026',
  'Full Stack Architect',
  'Headless Storefront Speed & UX Design',
  'published',
  true,
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Docker'],
  '/images/placeholders/helios.webp',
  'The client''s existing e-commerce platform suffered from a 4.5-second load time, leading to a 38% cart abandonment rate.',
  'Re-architect the front-end to achieve perfect lighthouse performance metrics while retaining rich asset media.',
  'Full rebuild of the storefront, integration of Stripe Checkout, and static asset caching optimization.',
  'Next.js statically generated page routes with dynamic client components for active carts.',
  ARRAY['Stripe Checkout flow', 'Dynamic instant cart drawer', 'Statically generated catalogue with sub-second navigation', 'Admin stock editor integration'],
  'Next.js (Vercel) -> Headless CMS API -> Stripe Payment Webhooks.',
  'Syncing local inventory state with Stripe payment success webhooks in real-time.',
  'Brought page speed index down to 0.6 seconds and increased sales conversions by 22%.',
  'Headless web designs must balance static regeneration with instant interactive feedback mechanisms.',
  2
);

-- Seed placeholder notes
insert into public.notes (title, slug, excerpt, content, category, tags, status, published_at, read_time, seo_title, seo_description)
values
(
  'Building Mission-Critical Web Dashboards',
  'building-mission-critical-web-dashboards',
  'An engineering guide detailing architecture strategies for sub-second telemetry dashboards.',
  '# Building Mission-Critical Web Dashboards

Web dashboards are no longer simple static reports. In modern workflows, they serve as the cockpit for business operations. Here is how you can design and build them to meet rigorous real-world needs.

## Architecture Core
When dealing with streaming data, keeping your main operational database separate from your logging tables is crucial. 

1. **Decouple Ingestion from Querying**: Do not write rapid device logs directly into your web database. Use a queue like RabbitMQ or Redis Streams.
2. **Batch Inserts**: Use bulk copy or batch insertion triggers every 500ms to reduce index locking.

## Frontend Optimization
Render charts using canvas or specialized libraries like WebGL when presenting more than 10,000 data points. Avoid rendering heavy React components inside long lists; use virtualized tables.

```typescript
// Example virtual window calculation
const getVisibleRange = (scrollTop: number, itemHeight: number, total: number) => {
  const start = Math.floor(scrollTop / itemHeight);
  return {
    start,
    end: Math.min(total, start + 20)
  };
};
```

Stay tuned for part two of this series.',
  'Engineering',
  ARRAY['Architecture', 'Dashboards', 'Next.js'],
  'published',
  now(),
  6,
  'Building Mission-Critical Web Dashboards | Kavin HQ',
  'A deep technical guide on designing resilient web dashboards for real-time telemetry analytics.'
);
