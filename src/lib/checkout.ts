// Configurazione pagamenti Academy (Stripe Payment Links, prezzo pieno di lancio).
// I link portano al checkout Stripe; l'aggancio all'account avviene passando
// client_reference_id (id utente Supabase) + email, che il webhook usa per attivare.

export const CHECKOUT = {
  mensile: "https://buy.stripe.com/7sY8wP3ON6Wxdjn16b4AU09",
  annuale: "https://buy.stripe.com/00w5kD1GF1Cdenr9CH4AU0a",
  // "Percorso Elite": abbonamento annuale €135 che sblocca il Corso per la stagione
  // E regala 4 ore di coaching 1:1 (il Worker le carica da solo all'acquisto).
  // Dev'essere un link ABBONAMENTO (come l'annuale), non un pagamento una-tantum.
  bundle: "https://buy.stripe.com/dRmdR9clj3Kl4MR6qv4AU0b",
};

export const PRICING = {
  mensile: { price: "€12,99", period: "/mese" },
  annuale: { price: "€99", period: "", hint: "per tutta la stagione EA FC 27" },
  bundle: { price: "€135", priceFull: "€181", period: "", hint: "Corso per tutta la stagione + 4 ore 1:1 con Fabio" },
};

// Aggiunge id utente + email al link Stripe, così il webhook collega l'acquisto all'account.
export function checkoutUrl(base: string, user?: { id?: string; email?: string | null } | null): string {
  if (!base) return "";
  try {
    const u = new URL(base);
    if (user?.id) u.searchParams.set("client_reference_id", user.id);
    if (user?.email) u.searchParams.set("prefilled_email", user.email);
    return u.toString();
  } catch {
    return base;
  }
}
