-- ============================================================
-- Denuzzo Academy — aggancio Stripe alla tabella profili
-- COME USARLO: Supabase -> progetto -> "SQL Editor" -> New query -> incolla -> Run.
-- (Ri-eseguibile: si puo' lanciare piu' volte senza rompere nulla.)
-- ============================================================

-- Colonna che collega il profilo al customer Stripe.
-- Serve al webhook per ritrovare l'utente ai rinnovi/disdette.
alter table public.profiles add column if not exists stripe_customer_id text;

-- Indice per cercare velocemente per customer Stripe.
create index if not exists profiles_stripe_customer_idx on public.profiles (stripe_customer_id);

-- Nota: il webhook scrive con la chiave "service_role", che bypassa la RLS.
-- Non serve nessuna policy aggiuntiva. L'utente continua a vedere solo la propria riga.
