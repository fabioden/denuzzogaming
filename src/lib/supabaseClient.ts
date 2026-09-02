import { createClient } from "@supabase/supabase-js";

// Connessione a Supabase (login + database utenti della membership PRO).
// La chiave "publishable" è PUBBLICA per natura: sta nel frontend, la sicurezza la
// garantisce la Row Level Security sul database (ogni utente vede solo i suoi dati).
const SUPABASE_URL = "https://ufdyjzafpurhxfkpdvse.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_b_IU6vh3HPLZ8ru57s11cg_3HnfgkAC";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
