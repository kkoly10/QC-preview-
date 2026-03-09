# ResultRail QC — Milestones 1 & 2

This repository currently implements only:

1. **Milestone 1 — Foundation and Auth**
   - Next.js App Router foundation pages for `/login` and `/dashboard`
   - Supabase SSR auth clients (`browser`, `server`, `admin`)
   - route protection in `proxy.ts` for protected paths

2. **Milestone 2 — SQL Schema and RLS**
   - initial Supabase migration with ResultRail QC core tables
   - foreign keys, timestamps, status/severity constraints
   - row-level security enabled on all application tables
   - org-scoped read/write policies using profile organization membership

No Milestone 3+ workflow implementation is included in this revision.
