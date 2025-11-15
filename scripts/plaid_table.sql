create table public.plaid_tokens (
  id uuid primary key references auth.users(id),
  token text default ''
);

create policy "Users can insert their own plaid token"
on public.plaid_tokens
for insert
to authenticated
with check (
  id = auth.uid()
);

create policy "Users can read their own plaid token"
on public.plaid_tokens
for select
to authenticated
using (
  id = auth.uid()
);

create policy "Users can update their own plaid token"
on public.plaid_tokens
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());