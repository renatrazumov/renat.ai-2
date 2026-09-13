-- messages table used by the chat shell (Supabase)
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  role text not null check (role in ('user', 'assistant')),
  created_at timestamptz not null default now(),
  user_id uuid references auth.users (id) on delete cascade,
  conversation_id uuid not null
);

create index if not exists messages_conversation_id_idx
  on public.messages (conversation_id, created_at);

alter table public.messages enable row level security;

create policy "Users read own messages"
  on public.messages for select
  using (auth.uid() = user_id);

create policy "Users insert own messages"
  on public.messages for insert
  with check (auth.uid() = user_id);
