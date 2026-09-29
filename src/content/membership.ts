// FONTE UNICA dei contenuti della membership PRO (v1).
//
// Per ora i dati sono HARDCODED qui: la dashboard legge SOLO da questo file.
// Quando passeremo al reale, questi stessi dati arriveranno da Supabase o da un
// pannello, con la STESSA forma: la dashboard non cambierà di una riga.
//
// Cosa contiene la v1:
//   1) weeklyDrop  -> il "drop" del meta di questa settimana (video + squadra)
//   2) courses     -> i corsi video di coaching (2-3 per partire)
//   3) pastDrops   -> l'archivio dei drop passati (le copertine in stile Netflix)
//
// I video sono YouTube "non in elenco": basta l'ID del video (la parte dopo
// v=... nel link). Per ora sono dei placeholder da sostituire con i tuoi reali.

export type Lesson = {
  id: string;
  title: string;
  durationMin: number;
  youtubeId?: string; // (legacy) ID YouTube non in elenco. Usa streamUid per i video protetti.
  streamUid?: string; // UID Cloudflare Stream (video protetto, riproducibile solo sul dominio)
  free?: boolean; // true = anteprima gratis, visibile anche ai non abbonati
};

// Sottodominio Cloudflare Stream dell'account (per l'embed dei video protetti).
export const STREAM_DOMAIN = "customer-wkaamnvo04oubidk.cloudflarestream.com";

export type CourseCategory = "Intro" | "Impostazioni di gioco" | "Costruzione squadra" | "Difesa" | "Attacco" | "Mentalità";

// Ordine fisso con cui mostrare le sezioni nella dashboard (Intro e Impostazioni per primi).
export const categoryOrder: CourseCategory[] = ["Intro", "Impostazioni di gioco", "Difesa", "Costruzione squadra", "Attacco", "Mentalità"];

// Titolo "modulo" del percorso per ogni tema (il percorso e' ordinato come categoryOrder).
export const categoryTitle: Record<CourseCategory, string> = {
  Intro: "Parti da qui",
  "Impostazioni di gioco": "Le impostazioni giuste",
  "Costruzione squadra": "Costruisci la rosa perfetta",
  Difesa: "Difendi come un muro",
  Attacco: "Diventa una macchina da gol",
  Mentalità: "Testa da campione",
};

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  level: "Base" | "Intermedio" | "Avanzato";
  category: CourseCategory;
  cover: string; // immagine in /public/img/... (se manca, la tessera mostra una copertina disegnata)
  lessons: Lesson[];
};

// Una lezione e' "live" quando ha un video vero (Cloudflare Stream o YouTube reale, non placeholder).
export const lessonIsLive = (l: Lesson) => !!l.streamUid || (!!l.youtubeId && !l.youtubeId.startsWith("PLACEHOLDER"));
// Un corso e' "disponibile ora" se ha almeno una lezione live; altrimenti esce durante la stagione.
export const courseIsLive = (c: Course) => c.lessons.some(lessonIsLive);
export const liveLessonCount = (c: Course) => c.lessons.filter(lessonIsLive).length;

export type TopPlayer = {
  name: string;
  role: string; // es. "Ala sinistra"
  note: string; // perche puntarci
};

export type Sbc = {
  name: string;
  worthIt: boolean; // conviene farla?
  note: string;
};

export type WeeklyDrop = {
  episode: number;
  dateLabel: string; // es. "Settimana del 14 giugno 2026"
  objective: string; // obiettivo della settimana
  title: string;
  youtubeId: string; // il video del meta
  cover: string;
  formation: string;
  lineupNote: string; // la formazione reale la dai tu ogni settimana
  topPlayers: TopPlayer[];
  gem: { name: string; price: string; note: string };
  sbc: Sbc[];
};

// ----------------------------------------------------------------------------
// 0) PROMO DELLA SETTIMANA (il TEMA che veste la dashboard)
//    Ogni venerdi EA FC cambia promo: qui si aggiornano nome, colori e immagini,
//    e tutta la dashboard si "veste" a tema. La struttura (carte, oro) resta base.
// ----------------------------------------------------------------------------
export type Promo = {
  name: string;
  accent: string; // colore accento della promo
  bgTop: string; // colore alone in alto
  bgBottom: string; // colore alone in basso
  card: string; // key art "carta" (sfondo billboard)
  banner: string; // key art orizzontale (logo + carta)
  poster: string; // key art verticale (logo)
};

export const promo: Promo = {
  name: "Greats of the Game",
  accent: "#27e0a0",
  bgTop: "#3a1c74",
  bgBottom: "#0f5a52",
  card: "",
  banner: "/img/promo/greats-design.png", // solo design, senza scritta
  poster: "/img/promo/greats-design.png", // sfondo dashboard, senza scritta
};

// ----------------------------------------------------------------------------
// 1) IL DROP DI QUESTA SETTIMANA
//    (contenuti d'esempio: l'obiettivo, la gemma e i top li dai tu ogni settimana)
// ----------------------------------------------------------------------------
export const weeklyDrop: WeeklyDrop = {
  episode: 5,
  dateLabel: "Settimana del 14 giugno 2026",
  objective: "Nord America",
  title: "La squadra meta per l'obiettivo Nord America",
  youtubeId: "PLACEHOLDER_VIDEO_META",
  cover: "",
  formation: "4-4-1-1",
  lineupNote: "La formazione completa (11 titolari, PlayStyle, istruzioni) la trovi nel video e nella scheda scaricabile.",
  topPlayers: [
    {
      name: "Neymar (evoluzione)",
      role: "Trequartista / seconda punta",
      note: "Con l'evoluzione giusta diventa devastante negli ultimi 20 metri.",
    },
    {
      name: "Lucas Paquetá",
      role: "Centrocampista centrale",
      note: "Equilibrio e inserimenti: cuce gioco e segna.",
    },
  ],
  gem: {
    name: "Julián Álvarez",
    price: "circa 14k crediti",
    note: "La gemma low budget della settimana: rende come carte molto piu costose.",
  },
  sbc: [
    { name: "Upgrade giocatore Nord America", worthIt: true, note: "Costo basso, utile proprio per l'obiettivo di questa settimana." },
    { name: "SBC scambio rari", worthIt: false, note: "Conviene solo se hai tanti doppioni inutili, altrimenti lasciala." },
  ],
};

// ----------------------------------------------------------------------------
// 2) ALLENAMENTI = libreria di ESERCIZI (video brevi 2-3 min, "come allenarti").
//    1 esercizio GRATIS per area (l'assaggio), gli altri PRO (lucchetto -> abbonamento).
//    I "corsi" sono i moduli del percorso; le "lessons" sono i singoli esercizi.
// ----------------------------------------------------------------------------
export const courses: Course[] = [
  {
    id: "intro",
    title: "Parti da qui",
    subtitle: "Il benvenuto al videocorso: cosa imparerai e come sfruttarlo al meglio.",
    level: "Base",
    category: "Intro",
    cover: "",
    lessons: [
      { id: "intro-1", title: "Introduzione al videocorso", durationMin: 1, streamUid: "2408fa76d12f4e7b851b664d9c723368", free: true },
    ],
  },
  {
    id: "impostazioni",
    title: "Le impostazioni giuste",
    subtitle: "Le impostazioni di gioco che uso io: controller, telecamera e menu, una per una.",
    level: "Base",
    category: "Impostazioni di gioco",
    cover: "",
    lessons: [
      { id: "imp-1", title: "Le impostazioni di gioco", durationMin: 6, streamUid: "345555860354a5a1cb65d3da8fe7ce46", free: true },
    ],
  },
  {
    id: "squadra-meta",
    title: "Costruisci la rosa perfetta",
    subtitle: "Esercizi pratici su moduli, PlayStyle e istruzioni: la squadra giusta anche con pochi crediti.",
    level: "Base",
    category: "Costruzione squadra",
    cover: "/img/academy/thumb-squadra-meta.jpg",
    lessons: [
      { id: "sq-1", title: "I 3 moduli che dominano il meta", durationMin: 3, youtubeId: "PLACEHOLDER_SQ_1", free: true },
      { id: "sq-2", title: "I PlayStyle che cambiano la partita", durationMin: 3, youtubeId: "PLACEHOLDER_SQ_2" },
      { id: "sq-3", title: "Le istruzioni che usano i pro", durationMin: 2, youtubeId: "PLACEHOLDER_SQ_3" },
    ],
  },
  {
    id: "difesa",
    title: "Difendi come un muro",
    subtitle: "Il percorso completo per difendere: dalla teoria al temporeggiare, il cambio giocatore, i PlayStyle difensivi e il pressing. Guardali in ordine o scegli il video che ti serve.",
    level: "Intermedio",
    category: "Difesa",
    cover: "/img/academy/thumb-difesa.jpg",
    lessons: [
      { id: "di-1", title: "Come si difende: la teoria", durationMin: 7, streamUid: "215eb27c2392473283698bbfa1af084a", free: true },
      { id: "di-2", title: "Impara a temporeggiare", durationMin: 4, streamUid: "33c56404cd546334e3f90c7ed2172651" },
      { id: "di-3", title: "Temporeggiare: esempio pratico", durationMin: 8, streamUid: "3e809b508b21943d0574426535e24263" },
      { id: "di-4", title: "Temporeggiare: il recap veloce", durationMin: 1, streamUid: "c0094b5b4cba7efd24be89e9e848f9fb" },
      { id: "di-5", title: "Cambiare giocatore al momento giusto", durationMin: 7, streamUid: "bd3fb62a6f4be328bf23fb9c8cccceb8" },
      { id: "di-6", title: "I PlayStyle difensivi che contano", durationMin: 6, streamUid: "fb2d260330093be307e3ec2091b438b2" },
      { id: "di-7", title: "Difendere: test in partita reale", durationMin: 5, streamUid: "844cf69a2a68415b372b9caa94d1ff11" },
      { id: "di-8", title: "Raddoppio e pressing: come usarli", durationMin: 5, streamUid: "e82b8cf459d5d6c1bfedf931e8a5a219" },
    ],
  },
  {
    id: "palle-inattive",
    title: "Palle inattive: difendere e segnare",
    subtitle: "Esercizi su corner e punizioni: non prenderle mai e farne un'arma.",
    level: "Intermedio",
    category: "Difesa",
    cover: "/img/academy/thumb-palle-inattive.jpg",
    lessons: [
      { id: "pi-1", title: "Non prendere più gol da corner", durationMin: 2, youtubeId: "PLACEHOLDER_PI_1" },
      { id: "pi-2", title: "La punizione che entra sempre", durationMin: 3, youtubeId: "PLACEHOLDER_PI_2" },
    ],
  },
  {
    id: "attacco",
    title: "Diventa una macchina da gol",
    subtitle: "Esercizi sulle giocate che funzionano, il dribbling utile e la finalizzazione.",
    level: "Intermedio",
    category: "Attacco",
    cover: "/img/academy/thumb-attacco.jpg",
    lessons: [
      { id: "at-1", title: "Le 3 giocate che spaccano ogni difesa", durationMin: 3, youtubeId: "PLACEHOLDER_AT_1", free: true },
      { id: "at-2", title: "Il dribbling che salta l'uomo davvero", durationMin: 2, youtubeId: "PLACEHOLDER_AT_2" },
      { id: "at-3", title: "Segna freddo, ogni volta", durationMin: 2, youtubeId: "PLACEHOLDER_AT_3" },
    ],
  },
  {
    id: "fasce",
    title: "Cross e gioco sulle fasce",
    subtitle: "Esercizi su quando allargare, il cross giusto e come attaccare l'area.",
    level: "Avanzato",
    category: "Attacco",
    cover: "/img/academy/thumb-fasce.jpg",
    lessons: [
      { id: "fa-1", title: "Distruggi le difese sulle fasce", durationMin: 2, youtubeId: "PLACEHOLDER_FA_1" },
      { id: "fa-2", title: "Il cross che è gol assicurato", durationMin: 3, youtubeId: "PLACEHOLDER_FA_2" },
    ],
  },
  {
    id: "pressione",
    title: "Testa da campione",
    subtitle: "Esercizi per restare lucido sotto pressione e non sbroccare nei momenti decisivi.",
    level: "Base",
    category: "Mentalità",
    cover: "/img/academy/thumb-pressione.jpg",
    lessons: [
      { id: "pr-1", title: "Non crollare dopo un gol subito", durationMin: 2, youtubeId: "PLACEHOLDER_PR_1", free: true },
      { id: "pr-2", title: "Vinci gli ultimi 10 minuti", durationMin: 2, youtubeId: "PLACEHOLDER_PR_2" },
    ],
  },
  {
    id: "vantaggio",
    title: "Gestire vantaggio e rimonta",
    subtitle: "Esercizi per chiudere la partita quando sei avanti e non mollare quando sei sotto.",
    level: "Intermedio",
    category: "Mentalità",
    cover: "/img/academy/thumb-vantaggio.jpg",
    lessons: [
      { id: "va-1", title: "Chiudi la partita e porta a casa i 3 punti", durationMin: 3, youtubeId: "PLACEHOLDER_VA_1" },
      { id: "va-2", title: "Rimonta anche da 2-0 sotto", durationMin: 2, youtubeId: "PLACEHOLDER_VA_2" },
    ],
  },
];

// Prossimo drop: data del prossimo numero (il countdown si calcola da qui).
export const nextDrop = {
  dateISO: "2026-06-18",
  teaser: "Nuovo obiettivo, nuova squadra meta e le SBC che conviene fare.",
};

// ----------------------------------------------------------------------------
// COLLEZIONI PER OBIETTIVO (curatela stile Netflix).
// Ogni riga e' un traguardo del giocatore, non un "tema": pesca i corsi per id,
// e uno stesso corso puo' comparire in piu' righe.
// ----------------------------------------------------------------------------
export type Collection = {
  id: string;
  title: string; // l'obiettivo, accattivante
  hint?: string;
  courseIds: string[];
};

export const collections: Collection[] = [
  {
    id: "risali",
    title: "Risali di divisione",
    hint: "il percorso per salire",
    courseIds: ["difesa", "attacco", "squadra-meta", "pressione"],
  },
  {
    id: "budget",
    title: "Vinci spendendo pochi crediti",
    hint: "forte anche senza soldi",
    courseIds: ["squadra-meta", "fasce", "palle-inattive"],
  },
  {
    id: "weekend-league",
    title: "Prepara la Weekend League",
    hint: "pronto per il weekend",
    courseIds: ["pressione", "vantaggio", "difesa", "palle-inattive", "attacco"],
  },
];

// ----------------------------------------------------------------------------
// 3) ARCHIVIO DEI DROP PASSATI (le copertine in stile Netflix)
// ----------------------------------------------------------------------------
export const pastDrops = [
  { episode: 4, objective: "Inghilterra", cover: "/img/academy/drop-4.png" },
  { episode: 3, objective: "Bundesliga", cover: "/img/academy/drop-3.png" },
  { episode: 2, objective: "Serie A", cover: "/img/academy/drop-2.png" },
  { episode: 1, objective: "La Liga", cover: "/img/academy/drop-1.png" },
];
