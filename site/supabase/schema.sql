-- Schéma Supabase AccessiVeille — à exécuter dans SQL Editor (projet région eu-west)

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  url text not null,
  score int,
  issues jsonb,
  source text default 'scan-gratuit',
  consent_marketing boolean default false,
  created_at timestamptz not null default now()
);

create index if not exists leads_email_idx on leads (email);
create index if not exists leads_created_idx on leads (created_at desc);

-- RLS : aucune lecture/écriture publique ; seul le service_role (API serveur) accède.
alter table leads enable row level security;

-- Liste d'opposition prospection (RGPD — à conserver sans limite de durée)
create table if not exists optouts (
  email text primary key,
  created_at timestamptz not null default now()
);
alter table optouts enable row level security;

-- Journal des scans (suivi volumétrie / anti-abus)
create table if not exists scans (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  ip_hash text,
  score int,
  created_at timestamptz not null default now()
);
create index if not exists scans_created_idx on scans (created_at desc);
alter table scans enable row level security;
