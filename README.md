# Positioning and the Effect on Labor

A multi-page Next.js website built in this repository to present public-facing, citation-visible education about maternal positioning during labor.

## Main route
- `/move-through-labor`

## Subpages
- `/move-through-labor/evidence`
- `/move-through-labor/positions`
- `/move-through-labor/media`
- `/move-through-labor/resources`

## Editable admin routes
- `/admin/login`
- `/admin`
- `/admin/settings`
- `/admin/references`
- `/admin/pages/home`

## Current source list
- Ondeck (2019)
- Zang et al. (2020)
- Liu et al. (2025)
- Satone et al. (2023)
- Gimovsky & Berghella (2022)

## Supabase setup
1. Run the SQL migration in `supabase/migrations/20260324_editor_cms.sql`.
2. Create an editor user in Supabase Auth.
3. Insert that user into `admin_profiles` using the example comment at the bottom of the migration.
4. Add your Supabase environment variables to Vercel and local development.

## Editable CMS scope in this build
- global site settings
- global references manager
- editable Home page draft + publish flow
- public site now reads published Home content and public settings/references from Supabase when configured

## Next CMS phases
- evidence editor
- positions editor
- media editor
- resources editor
- richer preview and revision history
