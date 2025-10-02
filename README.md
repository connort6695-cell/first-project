This is a Next.js 15 app with Tailwind CSS, DaisyUI, and Supabase SSR ready for Vercel.

## Getting Started

Quick start

1. Install dependencies
   npm install

2. Configure environment
   Copy env.example to .env.local and fill values:
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   RATE_LIMIT_TOKEN=dev-token

3. Run locally
   npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

UI uses DaisyUI components; add new components under `src/components`. SSR Supabase utilities live in `src/lib/supabase`.

## Deploy on Vercel

- Push to a Git repo and import in Vercel
- Set environment variables in Vercel Project Settings
- App Router and API routes require no special configuration
