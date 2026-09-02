// Content del brand Denuzzo Gaming.
// In fase 3 questo file sarà (in parte) auto-generato dallo script di sync
// che copia .planning/shared/content/* . Per ora è la single source of truth locale.

export type NavItem = { label: string; href: string; active?: boolean };

export const nav: NavItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Academy", href: "/academy" },
  { label: "Coaching", href: "/coaching" },
  { label: "Newsletter", href: "/newsletter" },
];

export const social = {
  youtube: "https://www.youtube.com/@denuzzofabio",
  instagram: "https://www.instagram.com/fabio_denuzzo_/",
  twitch: "https://www.twitch.tv/fabio_denuzzo",
  tiktok: "https://www.tiktok.com/@fabio_denuzzo_",
  twitter: "https://x.com/_lionel_10_",
  whatsapp: "https://wa.me/393667142489",
};

// HERO = mini "chi sono": breve presentazione a sinistra, foto Juventus a destra.
export const hero = {
  eyebrow: "Coach EA FC · Ex Pro Player",
  name: "Fabio Denuzzo",
  intro:
    "Ex pro player per Juventus e Dsyre Esports, 2× Campione Italiano e 2× partecipante al FIFA eWorld Cup. Oggi alleno chi vuole vincere su EA FC.",
  stats: [
    { to: 2, suffix: "×", label: "FIFA eWorld Cup" },
    { to: 2, suffix: "×", label: "Campione Italiano" },
    { to: 300, suffix: "+", label: "Allievi dal 2020" },
  ],
  ctaPrimary: { label: "Prenota una sessione", href: "/coaching" },
  ctaSecondary: { label: "Guarda i video", href: "https://www.youtube.com/@denuzzofabio" },
  img: { base: "juventus", alt: "Fabio Denuzzo alla presentazione Juventus Esports" },
};

// Career deck: palmares come carte (effetto firma, scroll-driven)
export const career = [
  { year: "2013", type: "Campione", title: "Campione Italiano", sub: "FIFA 13" },
  { year: "2018", type: "Mondiale", title: "FIFA eWorld Cup", sub: "Finali · Londra" },
  { year: "2020", type: "Club", title: "AC Milan", sub: "QLASH · Pro Player" },
  { year: "2021", type: "Mondiale", title: "Top 4 Europa", sub: "eWorld Cup" },
  { year: "2023", type: "eSerie A", title: "Campione eSerie A", sub: "con la Juventus" },
  { year: "Oggi", type: "Coach", title: "Coach & Creator", sub: "EA FC 26" },
];

// Credenziali per il marquee (autorità in movimento)
export const credentials = [
  "Juventus eSports",
  "AC Milan QLASH",
  "Sampdoria",
  "FIFA eWorld Cup",
  "2× Campione Italiano",
  "Top 10 Mondiale",
];

// Sezioni della landing: testo a sinistra, foto a destra. Poco testo, molto ordine.
export const homeSections = [
  {
    id: "coaching",
    eyebrow: "Coaching 1:1",
    title: "Gioca come un pro",
    text: "Sessioni private con un 2× Campione Italiano. Tattiche META, lettura del gioco e mentalità vincente.",
    cta: { label: "Scopri il coaching", href: "/coaching" },
    img: { base: "coaching", alt: "Sessione di coaching EA FC 1:1" },
  },
  {
    id: "newsletter",
    eyebrow: "Newsletter · Gratis",
    title: "Le news che contano",
    text: "Meta, tattiche e guide su EA FC 26 nella tua inbox. Ogni settimana, zero spam.",
    cta: { label: "Iscriviti gratis", href: "/newsletter" },
    img: { base: "newsletter", alt: "Newsletter EA FC 26" },
  },
  {
    id: "community",
    eyebrow: "Community",
    title: "Vinci, insieme agli altri",
    text: "Discussioni tattiche, tornei interni e accesso diretto a me. Tutto su WhatsApp.",
    cta: { label: "Unisciti su WhatsApp", href: "https://wa.me/393667142489", external: true, whatsapp: true },
    img: { base: "community", alt: "Community Denuzzo Gaming su WhatsApp" },
  },
  {
    id: "youtube",
    eyebrow: "YouTube · 47K iscritti",
    title: "Guide e analisi, ogni settimana",
    text: "Formazioni vincenti, tattiche e gameplay da pro player.",
    cta: { label: "Vai al canale", href: "https://www.youtube.com/@denuzzofabio", external: true },
    img: { base: "youtube", alt: "Canale YouTube di Fabio Denuzzo" },
  },
] as const;

export const about = {
  label: "Chi sono",
  title: "Da pro player a coach: un percorso costruito sul campo.",
  // intro contiene un link a Juventus
  intro: {
    before: "Pro player per ",
    linkLabel: "Juventus FC",
    linkHref:
      "https://www.juventus.com/it/news/articoli/nasce-il-team-esports-juventus-dsyre",
    after:
      " e Dsyre Esports. Due partecipazioni al FIFA eWorld Cup. Oggi aiuto i giocatori a raggiungere il loro massimo potenziale su EA Sports FC.",
  },
  timeline: [
    { year: "2013", txt: "Campione Italiano FIFA 13" },
    { year: "2018", txt: "FIFA eWorld Cup, Londra" },
    { year: "2020", txt: "Pro Player Juventus FC" },
    { year: "2021", txt: "FIFA eWorld Cup, Top 4 EU" },
    { year: "2023", txt: "Campione Italiano FIFA 23" },
    { year: "Oggi", txt: "Coach & Content Creator" },
  ],
};

export const coaching = {
  label: "Coaching 1:1",
  title: "Vuoi giocare come un pro?",
  subtitle:
    "Sessioni 1‑to‑1 con un 2× Campione Italiano e partecipante eWorld Cup. Tattiche META, gestione del mercato FUT e mentalità competitiva.",
  steps: [
    { n: "01 · Prenota", h: "Scegli quando", p: "Seleziona data e orario dalla pagina coaching." },
    { n: "02 · Sessione live", h: "60 minuti 1:1", p: "Gameplay review insieme + tattica applicata al tuo stile." },
    { n: "03 · Recap + crescita", h: "Resta con un piano", p: "Ricevi un recap scritto con i punti chiave su cui lavorare." },
  ],
  trust: [
    { num: "300+", label: "Allievi dal 2020" },
    { num: "60'", label: "Per sessione" },
    { num: "1:1", label: "Sessione privata" },
  ],
  testimonials: [
    { quote: "Dopo 3 sessioni sono passato da Division 5 a Division 2. Il metodo di Fabio è concreto, niente teoria inutile.", author: "Luca R., Milano" },
    { quote: "Mi ha insegnato a leggere il mercato FUT come un pro. Ho triplicato i crediti in due settimane.", author: "Marco T., Roma" },
  ],
  cta: "Scopri il coaching",
  priceAnchor: "da €22,50 a sessione",
};

export const newsletter = {
  label: "Newsletter · Gratis per sempre",
  title: "Ogni giorno, le news che contano su EA FC 26.",
  subtitle:
    "Articoli quotidiani per imparare tattiche, gestire il mercato e restare aggiornato su ogni novità di EA Sports FC 26.",
  lead: "Iscriviti e ricevi subito: le 5 formazioni META della settimana",
  placeholder: "La tua email",
  success: "Iscrizione confermata: controlla la tua inbox.",
  tags: ["Tattiche META", "Mercato FUT", "News EA FC 26", "Guide settimanali"],
};

export const community = {
  label: "Community",
  title: "Entra nel gruppo di chi vuole giocare per vincere.",
  subtitle:
    "Discussioni tattiche, analisi di mercato, tornei interni e supporto diretto. Tutto su WhatsApp, con accesso diretto a me.",
  members: "1247",
  cta: "Unisciti su WhatsApp",
};

export const youtube = {
  label: "YouTube · 47K iscritti",
  title: "Guide META, tattiche e analisi di mercato.",
  subtitle:
    "Video settimanali su formazioni vincenti, segreti FUT e gameplay da pro player.",
  videos: [
    { id: "341K2A5psKY", title: "Il più forte giocatore di EA FC" },
    { id: "Xn6W-o1LDB8", title: "I migliori terzini" },
  ],
  cta: "Vedi tutti i video sul canale →",
};

export const finalCta = {
  title: "Pronto a migliorare?",
  subtitle: "Coaching 1:1 con un 2× Campione Italiano EA FC. Da €22,50 a sessione.",
  cta: "Prenota il coaching →",
};

/* ─────────────────────────────────────────── COACHING ── */
export const coachingPage = {
  seo: {
    title: "Coaching 1:1, Fabio Denuzzo | EA FC 26",
    description:
      "Sessioni di coaching 1:1 con Fabio Denuzzo, 2× Campione Italiano EA FC, ex pro player. Tattiche META, lettura del gioco, mentalità da pro. Da €22,50.",
    path: "/coaching",
  },
  hero: {
    eyebrow: "2× Campione Italiano · Ex Pro Player",
    title: "Coaching EA FC 1:1",
    subtitle:
      "Sessioni private 1:1 con un ex professionista. Impara le stesse tattiche che mi hanno portato ai Mondiali.",
    ctaPrimary: { label: "Scegli il tuo pacchetto", href: "#prezzi" },
    ctaWhatsapp: { label: "Hai domande? Scrivimi", href: "https://wa.me/393667142489" },
  },
  packages: [
    {
      name: "Sessione Singola",
      desc: "Perfetta per provare il metodo e ottenere un boost immediato.",
      priceFull: "€30",
      price: "€22,50",
      features: ["60 minuti 1:1 live", "Analisi gameplay personalizzata", "Piano tattico su misura", "Recap scritto post-sessione"],
      cta: "Prenota ora →",
      stripe: "https://buy.stripe.com/dRm00jbhf4Opfrv3ej4AU05",
      popular: false,
    },
    {
      name: "Percorso 4 Ore",
      desc: "Il percorso completo per scalare di livello e dominare la tua Division.",
      priceFull: "€110",
      price: "€82,50",
      features: ["4 sessioni da 60 minuti", "Percorso personalizzato completo", "Supporto WhatsApp tra le sessioni", "Analisi replay dettagliata", "Tattiche META aggiornate"],
      cta: "Scegli il percorso →",
      stripe: "https://buy.stripe.com/bJe7sL1GFgx77Z33ej4AU07",
      popular: true,
    },
    {
      name: "Trasformazione 8 Ore",
      desc: "La trasformazione totale: diventa il giocatore che hai sempre voluto essere.",
      priceFull: "€200",
      price: "€150",
      features: ["8 sessioni da 60 minuti", "Trasformazione completa del gioco", "Mentoring continuo via WhatsApp", "Accesso prioritario prenotazioni", "Analisi avversari personalizzata", "Mindset competitivo da pro"],
      cta: "Inizia la trasformazione →",
      stripe: "https://buy.stripe.com/14A28rbhf2Gh3INcOT4AU08",
      popular: false,
    },
  ],
  microcopy: "Pagamento sicuro con Stripe",
  learn: [
    { h: "Non subire più gol stupidi", p: "Posizionamento, timing tackle e pressing intelligente per blindare la tua difesa." },
    { h: "Segna da qualsiasi posizione", p: "Costruzione azione, finishing sotto pressione e skill moves che fanno la differenza." },
    { h: "Domina ogni formazione META", p: "Istruzioni personalizzate e adattamento tattico per battere qualsiasi avversario." },
    { h: "Schiera la squadra giusta", p: "Modulo, ruoli e istruzioni tattiche ottimizzati per il tuo stile di gioco." },
    { h: "Zero tilt, zero rage quit", p: "Gestisci la pressione e gioca con il mindset di un professionista in ogni partita." },
    { h: "Piano personalizzato per salire", p: "Report con analisi errori, aree di miglioramento e piano d'azione dopo ogni sessione." },
  ],
  steps: [
    { n: "01 · Prenota", h: "Scegli e paga", p: "Scegli il pacchetto e paga in sicurezza con Stripe." },
    { n: "02 · Sessione live", h: "60 minuti 1:1", p: "Gameplay review + tattica in tempo reale." },
    { n: "03 · Recap + crescita", h: "Resta con un piano", p: "Recap scritto con il piano per migliorare." },
  ],
  results: [
    { from: "Oro 3", to: "Elite 1", time: "In 1 mese · 4 sessioni", quote: "Da Oro 3 a Elite 1 in un mese. Fabio mi ha aperto gli occhi su errori che facevo da anni.", author: "Marco L." },
    { from: "Div 4", to: "Div 1", time: "In 6 settimane · 4 sessioni", quote: "Pensavo di aver raggiunto il mio limite in Div 4. Dopo 4 ore sono in Div 1 stabile.", author: "Gianluca R." },
    { from: "Principiante", to: "Platino", time: "In 2 mesi · 8 sessioni", quote: "Da principiante a Platino in 8 sessioni. Gioco con una sicurezza che non credevo possibile.", author: "Andrea S." },
  ],
  faq: [
    { q: "Come si svolge una sessione?", a: "Call privata su Discord o WhatsApp. Giochiamo insieme, analizzo il gameplay in tempo reale. Alla fine ricevi un recap scritto." },
    { q: "Serve un livello minimo?", a: "No. Alleno giocatori di ogni livello: il percorso viene personalizzato." },
    { q: "Su quali piattaforme?", a: "PlayStation, Xbox e PC: tutte le piattaforme EA Sports FC 26." },
    { q: "Quanto tempo per i risultati?", a: "Miglioramenti dalla prima sessione. Con 4 ore, il salto di Division è praticamente garantito." },
    { q: "Come funziona il pagamento?", a: "Paghi con Stripe (carta). Dopo il pagamento ti contatto su WhatsApp per fissare la sessione." },
    { q: "Come prenoto la sessione?", a: "Dopo il pagamento ti contatto su WhatsApp entro 24h per fissare insieme data e orario della sessione." },
  ],
};

/* ─────────────────────────────────────── NEWSLETTER ── */
export const newsletterPage = {
  seo: {
    title: "Newsletter FC, Fabio Denuzzo | EA FC 26",
    description:
      "Newsletter su EA FC 26: meta, tattiche, guide e analisi di Fabio Denuzzo, ex pro player Top 10 Mondiale. Gratis, zero spam.",
    path: "/newsletter",
  },
  hero: {
    eyebrow: "Fabio Denuzzo presenta",
    title: "Newsletter FC",
    subtitle: "EA FC 26 · Meta · Tattiche · Guide. Le news che contano, ogni settimana.",
  },
  lead: "Iscriviti e ricevi le analisi su meta, tattiche e gameplay direttamente nella tua inbox.",
  placeholder: "La tua email",
  cta: "Iscriviti gratis",
  success: "Iscritto! Controlla la tua casella.",
  microcopy: "Gratis · Cancellati quando vuoi · Zero spam",
  tags: ["Meta", "Tattiche", "Guide", "TOTS", "eSports"],
  value: [
    { h: "Analisi META settimanali", p: "Le formazioni e i giocatori che dominano il meta, spiegati da chi ci ha giocato." },
    { h: "Lettura del gioco", p: "Come difendere, quando attaccare e come leggere l'avversario." },
    { h: "Guide e tattiche", p: "Difesa, attacco e movimenti: guide pratiche per migliorare davvero." },
  ],
  editions: [
    { n: "#10", date: "20 Mag 2026", title: "EA vende spazio pubblicitario dentro FC26: Visa, Compost e TOTS a 15K", cat: "Mercato" },
    { n: "#09", date: "14 Mag 2026", title: "La Liga TOTS: Mbappé, Lamine Yamal, EVO CAM Max 91 e mercato", cat: "TOTS" },
    { n: "#08", date: "10 Mag 2026", title: "EVO portieri storica, pack weight alle stelle e mercato del weekend", cat: "Meta" },
  ],
  author: {
    name: "Fabio Denuzzo",
    bio: "Ex pro player Top 10 Mondiale EA FC. Ogni settimana analizzo meta, tattiche e strategie di gioco per aiutarti a migliorare.",
  },
};

/* ──────────────────────────────────────────── BLOG ── */
export const blogPage = {
  seo: {
    title: "Blog EA FC, Denuzzo Gaming",
    description:
      "News, guide, analisi meta e consigli EA FC dal pro player Fabio Denuzzo. TOTS, SBC, formazioni, tattiche e coaching.",
    path: "/blog",
  },
  hero: {
    eyebrow: "Blog",
    title: "Blog EA FC",
    subtitle: "News, guide, analisi meta e consigli dal pro player Fabio Denuzzo. Tutto su EA FC 26.",
  },
  categories: ["Tutti", "TOTS", "Guide", "Mercato", "eSports", "Opinione"],
};

/* ───────────────────────────────────────── PRIVACY ── */
export const privacyPage = {
  seo: {
    title: "Privacy Policy, Denuzzo Gaming",
    description: "Informativa sulla privacy e cookie policy di Denuzzo Gaming.",
    path: "/privacy",
  },
  title: "Privacy Policy",
  subtitle: "Come proteggiamo i tuoi dati e rispettiamo la tua privacy.",
  updated: "Ultimo aggiornamento: 26 maggio 2026",
  email: "hello@denuzzogaming.com",
  sections: [
    { h: "1. Titolare del trattamento", p: ["Il titolare del trattamento dei dati personali è Fabio Denuzzo, operante tramite il brand Denuzzo Gaming.", "Email di contatto: hello@denuzzogaming.com"] },
    { h: "2. Dati raccolti", p: ["Raccogliamo le seguenti categorie di dati:", "• Dati di navigazione: indirizzo IP, tipo di browser, pagine visitate, orari di accesso, raccolti automaticamente.", "• Dati forniti volontariamente: nome, email e altre informazioni inserite nei form di contatto, newsletter o prenotazione coaching.", "• Dati di pagamento: le transazioni sono gestite da Stripe. Non conserviamo dati di carte di credito sui nostri server."] },
    { h: "3. Finalità del trattamento", p: ["I dati personali sono trattati per: erogazione del servizio di coaching e gestione prenotazioni; invio della newsletter (previo consenso); risposta a richieste di contatto; analisi statistica anonima del traffico; adempimento di obblighi di legge."] },
    { h: "4. Base giuridica", p: ["Il trattamento si basa su: consenso dell'interessato (newsletter, cookie non tecnici), esecuzione di un contratto (coaching), legittimo interesse (analisi traffico anonima), obbligo legale (fatturazione)."] },
    { h: "5. Cookie", p: ["• Cookie tecnici: necessari al funzionamento del sito. Non richiedono consenso.", "• Cookie analitici: per analisi aggregate e anonime (es. Google Analytics, se attivato). Richiedono consenso.", "• Cookie di terze parti: YouTube, Stripe o social embed possono impostare propri cookie secondo le rispettive policy.", "Puoi gestire o disabilitare i cookie dalle impostazioni del browser in qualsiasi momento."] },
    { h: "6. Conservazione dei dati", p: ["I dati sono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti, e comunque non oltre i termini previsti dalla legge. I dati della newsletter sono conservati fino alla cancellazione dell'iscrizione."] },
    { h: "7. Condivisione con terzi", p: ["I dati possono essere condivisi con: Stripe (pagamenti), provider di email marketing (newsletter), Google Analytics (analisi traffico, se attivato). Non vendiamo né cediamo dati personali a terzi per finalità di marketing."] },
    { h: "8. Diritti dell'interessato (GDPR)", p: ["Ai sensi del Regolamento UE 2016/679 hai diritto di: accedere ai tuoi dati; richiederne rettifica o cancellazione; limitare od opporti al trattamento; richiedere la portabilità; revocare il consenso; proporre reclamo al Garante Privacy."] },
    { h: "9. Sicurezza", p: ["Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali da accessi non autorizzati, perdita o distruzione."] },
    { h: "10. Contatti", p: ["Per qualsiasi richiesta relativa alla privacy o per esercitare i tuoi diritti GDPR, scrivici a hello@denuzzogaming.com. Risponderemo entro 30 giorni come previsto dal Regolamento UE 2016/679."] },
  ],
};
