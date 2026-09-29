-- ============================================================
-- Denuzzo — blinda il paywall: l'utente NON può auto-sbloccarsi.
-- Problema: la RLS permette all'utente di aggiornare la propria riga
-- su QUALSIASI colonna, incluso subscription_status -> si sbloccherebbe da solo.
-- Soluzione: permessi a livello di COLONNA. L'utente può aggiornare solo i
-- dati della sua dashboard/classifica; subscription_status, plan, scadenza e
-- stripe_customer_id li tocca SOLO il webhook (service_role, che bypassa tutto).
-- COME USARLO: Supabase (progetto ECOSISTEMA DENUZZOGAMING) -> SQL Editor -> Run.
-- ============================================================

-- Togli l'update "su tutto" a chi è loggato (e all'anonimo).
revoke update on public.profiles from authenticated;
revoke update on public.profiles from anon;

-- Ridai l'update SOLO sulle colonne sicure (quelle che il sito scrive davvero).
grant update (dashboard, season_xp, season_month, season_name, season_days, season_results)
  on public.profiles to authenticated;

-- Nota: la policy RLS "profiles_update_own" resta (l'utente agisce solo sulla PROPRIA riga).
-- Ora però, anche sulla propria riga, non può cambiare lo stato abbonamento.
-- Il webhook usa la chiave service_role, che ignora questi limiti: continua a funzionare.
