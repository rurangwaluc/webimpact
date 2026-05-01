create extension if not exists pgcrypto;

create table if not exists public.work_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  client_name text,
  project_type text not null,
  summary text not null,
  problem text not null,
  solution text not null,
  result text not null,
  cover_image_url text,
  live_url text,
  is_featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  cover_image_url text,
  category text,
  is_featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists work_projects_status_idx
on public.work_projects (status);

create index if not exists work_projects_featured_idx
on public.work_projects (is_featured);

create index if not exists blog_posts_status_idx
on public.blog_posts (status);

create index if not exists blog_posts_featured_idx
on public.blog_posts (is_featured);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_work_projects_updated_at on public.work_projects;
create trigger set_work_projects_updated_at
before update on public.work_projects
for each row
execute function public.set_updated_at();

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row
execute function public.set_updated_at();

alter table public.work_projects enable row level security;
alter table public.blog_posts enable row level security;

create policy "Published work projects are public"
on public.work_projects
for select
using (status = 'published');

create policy "Published blog posts are public"
on public.blog_posts
for select
using (status = 'published');