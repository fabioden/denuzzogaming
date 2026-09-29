-- ============================================================
-- Denuzzo Academy — setup Supabase
-- Ricrea il database per: registrazione + login + area membri + lista founder.
-- COME USARLO: Supabase → progetto → "SQL Editor" → New query → incolla tutto → Run.
-- (È ri-eseguibile: si può lanciare più volte senza rompere nulla.)
-- ============================================================

-- 1) Tabella profili — una riga per ogni utente registrato
create table if not exists public.profiles (
  id                 uuid primary key references auth.users(id) on delete cascade,
  subscription_status text default 'free',   -- 'active' = accesso completo ai corsi
  plan               text,                    -- 'pro_waitlist' = è nella lista founder
  current_period_end timestamptz,
  dashboard          jsonb default '{}'::jsonb,  -- dati dashboard personale (opzionale)
  season_xp          int  default 0,
  season_month       text,
  season_name        text,
  season_days        int  default 0,
  season_results     int  default 0,
  created_at         timestamptz default now()
);

-- 2) RLS: ogni utente vede e modifica SOLO la propria riga
alter table public.profiles enable row level security;

drop policy if exists profiles_select_own on public.profiles;
drop policy if exists profiles_update_own on public.profiles;
drop policy if exists profiles_insert_own on public.profiles;

create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id);
create policy profiles_insert_own on public.profiles
  for insert with check (auth.uid() = id);

-- 3) Crea in automatico la riga profilo appena uno si registra
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- FATTO. Poi: Settings → API → copia "Project URL" e la chiave "anon public",
-- e mandale a Claude per collegare l'app.
-- E: Authentication → disattiva "Confirm email" (così l'utente entra subito).
-- Per rendere qualcuno "founder attivo": profiles → metti subscription_status = 'active' sulla sua riga.
-- ============================================================
