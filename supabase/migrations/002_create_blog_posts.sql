create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),

  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,

  cover_image_url text,
  author_name text not null default 'WebImpact Lab',
  category text not null default 'Business Systems',

  status text not null default 'draft'
    check (status in ('draft', 'published')),

  is_featured boolean not null default false,

  meta_title text,
  meta_description text,

  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_idx
on public.blog_posts (status);

create index if not exists blog_posts_slug_idx
on public.blog_posts (slug);

create index if not exists blog_posts_featured_idx
on public.blog_posts (is_featured);

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;

create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row
execute function public.set_updated_at();

alter table public.blog_posts enable row level security;

drop policy if exists "Published blog posts are public" on public.blog_posts;

create policy "Published blog posts are public"
on public.blog_posts
for select
using (status = 'published');