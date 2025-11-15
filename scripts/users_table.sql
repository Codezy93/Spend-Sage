create table public.users (
  id uuid primary key references auth.users(id),
  name text,
  phone text
);

create policy "Users can insert their own info"
on public.users
for insert
to authenticated
with check (
  id = auth.uid()
);

create policy "Users can read their own info"
on public.users
for select
to authenticated
using (
  id = auth.uid()
);

create policy "Users can update their own users"
on public.users
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());