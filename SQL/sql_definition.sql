create table public.recipes (
    id uuid not null default gen_random_uuid (),
    title text not null,
    description text null,
    source_url text not null,
    video_platform text null,
    language text null default 'ms'::text,
    cuisine_type text null,
    difficulty_level text null,
    prep_time_minutes integer null,
    cook_time_minutes integer null,
    total_time_minutes integer null,
    servings integer null,
    ingredients jsonb not null,
    instructions jsonb not null,
    nutrition_info jsonb null,
    tags text[] null,
    transcript text null,
    extraction_metadata jsonb null,
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    thumbnail_url text null,
    constraint recipes_pkey primary key (id),
    constraint recipes_source_url_key unique (source_url)
) TABLESPACE pg_default;

create index IF not exists idx_recipes_source_url on public.recipes using btree (source_url) TABLESPACE pg_default;

create index IF not exists idx_recipes_title on public.recipes using btree (title) TABLESPACE pg_default;

create index IF not exists idx_recipes_cuisine_type on public.recipes using btree (cuisine_type) TABLESPACE pg_default;

create index IF not exists idx_recipes_created_at on public.recipes using btree (created_at) TABLESPACE pg_default;