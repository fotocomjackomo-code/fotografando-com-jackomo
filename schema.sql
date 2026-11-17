-- Execute este script no SQL Editor do seu projeto Supabase.
create extension if not exists pgcrypto;
create table if not exists public.galleries (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 client_name text,
 event_date date,
 slug text not null unique,
 description text,
 cover_url text,
 drive_url text,
 published boolean not null default false,
 created_at timestamptz not null default now()
);
create table if not exists public.media (
 id uuid primary key default gen_random_uuid(),
 gallery_id uuid not null references public.galleries(id) on delete cascade,
 media_type text not null check (media_type in ('image','video')),
 url text not null,
 caption text,
 created_at timestamptz not null default now()
);
alter table public.galleries enable row level security;
alter table public.media enable row level security;
-- Visitantes só podem ler galerias publicadas e seus arquivos associados.
create policy "public read published galleries" on public.galleries for select to anon, authenticated using (published = true);
create policy "public read media of published galleries" on public.media for select to anon, authenticated using (
 exists (select 1 from public.galleries g where g.id = gallery_id and g.published = true)
);
-- Somente usuários autenticados podem gerenciar conteúdo.
create policy "authenticated manage galleries" on public.galleries for all to authenticated using (true) with check (true);
create policy "authenticated manage media" on public.media for all to authenticated using (true) with check (true);
-- Recomendação: em Authentication > Users, crie manualmente o usuário administrador.
-- Não habilite cadastro público. Use senha forte e autenticação multifator se disponível.