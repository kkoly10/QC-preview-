# ResultRail QC — Milestones 1 & 2

This repository currently implements only:

1. **Milestone 1 — Foundation and Auth**
   - Next.js App Router pages for `/login` and `/dashboard`
   - Supabase SSR auth clients (`browser`, `server`, `admin`)
   - route protection in `proxy.ts` and `middleware.ts`

2. **Milestone 2 — SQL Schema and RLS**
   - initial Supabase migration with ResultRail QC core tables
   - foreign keys, timestamps, status/severity constraints
   - row-level security enabled on all application tables
   - org-scoped read/write policies using profile organization membership

## Deploying on Vercel

This repo now includes a proper Next.js project manifest (`package.json`) so Vercel can detect and run `next build`.

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

No Milestone 3+ workflow implementation is included in this revision.
