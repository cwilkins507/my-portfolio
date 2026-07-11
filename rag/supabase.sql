create extension if not exists vector with schema extensions;

create table if not exists public.blog_chunks (
  id text primary key,
  slug text not null,
  title text not null,
  url text not null check (url like 'https://collinwilkins.com/articles/%'),
  heading text not null,
  content text not null,
  chunk_index integer not null,
  content_hash text not null,
  embedding extensions.vector(1536) not null,
  updated_at timestamptz not null default now(),
  unique (slug, chunk_index)
);

-- Ingestion upserts on (slug, chunk_index), allowing existing content-derived IDs
-- from earlier deployments to migrate safely to stable position-derived IDs.

alter table public.blog_chunks enable row level security;
revoke all on public.blog_chunks from anon, authenticated;

create index if not exists blog_chunks_embedding_hnsw
  on public.blog_chunks using hnsw (embedding extensions.vector_cosine_ops);

create or replace function public.match_blog_chunks(
  query_embedding extensions.vector(1536),
  match_count integer default 6,
  similarity_threshold double precision default 0.45
)
returns table (
  id text, slug text, title text, url text, heading text, content text,
  chunk_index integer, similarity double precision
)
language sql stable security definer set search_path = public, extensions
as $$
  select b.id, b.slug, b.title, b.url, b.heading, b.content, b.chunk_index,
         1 - (b.embedding <=> query_embedding) as similarity
  from public.blog_chunks b
  where 1 - (b.embedding <=> query_embedding) >= similarity_threshold
  order by b.embedding <=> query_embedding
  limit least(match_count, 10);
$$;

revoke all on function public.match_blog_chunks(extensions.vector, integer, double precision) from public, anon, authenticated;
grant execute on function public.match_blog_chunks(extensions.vector, integer, double precision) to service_role;

create table if not exists public.blog_request_budget (
  bucket_start timestamptz primary key,
  request_count integer not null check (request_count >= 0)
);

alter table public.blog_request_budget enable row level security;
revoke all on public.blog_request_budget from public, anon, authenticated;

create or replace function public.consume_blog_request_budget(request_limit integer)
returns boolean
language plpgsql volatile security definer set search_path = public
as $$
declare
  allowed boolean;
begin
  insert into public.blog_request_budget (bucket_start, request_count)
  values (date_trunc('hour', now()), 1)
  on conflict (bucket_start) do update
    set request_count = blog_request_budget.request_count + 1
    where blog_request_budget.request_count < greatest(request_limit, 1)
  returning true into allowed;

  return coalesce(allowed, false);
end;
$$;

revoke all on function public.consume_blog_request_budget(integer) from public, anon, authenticated;
grant execute on function public.consume_blog_request_budget(integer) to service_role;
