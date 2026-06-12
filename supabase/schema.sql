-- Schéma Supabase pour Attriba — à exécuter dans SQL Editor (supabase.com)

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null,
  email text not null,
  phone text,
  trade text,
  message text not null,
  source text not null default 'contact_form',
  status text not null default 'new' -- new | contacted | client | lost
);

-- RLS activée : seules les routes API (service_role) écrivent/lisent.
alter table public.leads enable row level security;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
