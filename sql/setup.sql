-- ============================================================
-- SCRIPT DE CONFIGURAÇÃO DO BANCO DE DADOS
-- Cole este script inteiro no "SQL Editor" do Supabase e clique em RUN
-- ============================================================

-- Tabela de categorias
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

-- Tabela de arquivos (metadados; o arquivo em si fica no Storage)
create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  storage_path text not null,
  type text not null check (type in ('image', 'video')),
  created_at timestamptz not null default now()
);

-- Ativa Row Level Security (garante que cada usuário só vê seus próprios dados)
alter table public.categories enable row level security;
alter table public.files enable row level security;

-- Políticas: usuário só acessa o que é dele
create policy "categorias_select_proprias" on public.categories
  for select using (auth.uid() = user_id);
create policy "categorias_insert_proprias" on public.categories
  for insert with check (auth.uid() = user_id);
create policy "categorias_delete_proprias" on public.categories
  for delete using (auth.uid() = user_id);

create policy "arquivos_select_proprios" on public.files
  for select using (auth.uid() = user_id);
create policy "arquivos_insert_proprios" on public.files
  for insert with check (auth.uid() = user_id);
create policy "arquivos_delete_proprios" on public.files
  for delete using (auth.uid() = user_id);

-- ============================================================
-- BUCKET DE ARMAZENAMENTO (fotos e vídeos)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', false)
on conflict (id) do nothing;

-- Políticas do Storage: cada usuário só acessa a própria pasta (uid/)
create policy "storage_select_proprio"
  on storage.objects for select
  using (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "storage_insert_proprio"
  on storage.objects for insert
  with check (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "storage_delete_proprio"
  on storage.objects for delete
  using (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);
