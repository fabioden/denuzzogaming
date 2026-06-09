// English content for the Denuzzo Gaming brand.
// English translation of index.ts. Same structure, same export names,
// except nav, social and the type definitions which live in index.ts.

// HERO = mini "about me": short intro on the left, Juventus photo on the right.
export const hero = {
  eyebrow: "EA FC Coach · Former Pro Player",
  name: "Fabio Denuzzo",
  intro:
    "Former pro player for Juventus and Dsyre Esports, 2× Italian Champion and 2× FIFA eWorld Cup competitor. Today I coach those who want to win on EA FC.",
  stats: [
    { to: 2, suffix: "×", label: "FIFA eWorld Cup" },
    { to: 2, suffix: "×", label: "Italian Champion" },
    { to: 300, suffix: "+", label: "Students since 2020" },
  ],
  ctaPrimary: { label: "Book a session", href: "/coaching" },
  ctaSecondary: { label: "Watch the videos", href: "https://www.youtube.com/@denuzzofabio" },
  img: { base: "juventus", alt: "Fabio Denuzzo at the Juventus Esports presentation" },
};

// Career deck — palmares as cards (signature effect, scroll-driven)
export const career = [
  { year: "2013", type: "Champion", title: "Italian Champion", sub: "FIFA 13" },
  { year: "2018", type: "World", title: "FIFA eWorld Cup", sub: "Finals · London" },
  { year: "2020", type: "Club", title: "AC Milan", sub: "QLASH · Pro Player" },
  { year: "2021", type: "World", title: "Top 4 Europe", sub: "eWorld Cup" },
  { year: "2023", type: "eSerie A", title: "eSerie A Champion", sub: "with Juventus" },
  { year: "Today", type: "Coach", title: "Coach & Creator", sub: "EA FC 26" },
];

// Credentials for the marquee (authority in motion)
export const credentials = [
  "Juventus eSports",
  "AC Milan QLASH",
  "Sampdoria",
  "FIFA eWorld Cup",
  "2× Italian Champion",
  "World Top 10",
];

// Landing sections: text on the left, photo on the right. Little text, lots of order.
export const homeSections = [
  {
    id: "coaching",
    eyebrow: "1:1 Coaching",
    title: "Play like a pro",
    text: "Private sessions with a 2× Italian Champion. META tactics, game reading and a winning mindset.",
    cta: { label: "Discover the coaching", href: "/coaching" },
    img: { base: "coaching", alt: "1:1 EA FC coaching session" },
  },
  {
    id: "newsletter",
    eyebrow: "Newsletter · Free",
    title: "The news that matters",
    text: "Meta, tactics and EA FC 26 guides in your inbox. Every week, zero spam.",
    cta: { label: "Subscribe for free", href: "/newsletter" },
    img: { base: "newsletter", alt: "EA FC 26 newsletter" },
  },
  {
    id: "community",
    eyebrow: "Community",
    title: "Win, together with the others",
    text: "Tactical discussions, internal tournaments and direct access to me. All on WhatsApp.",
    cta: { label: "Join on WhatsApp", href: "https://wa.me/393667142489", external: true, whatsapp: true },
    img: { base: "community", alt: "Denuzzo Gaming community on WhatsApp" },
  },
  {
    id: "youtube",
    eyebrow: "YouTube · 47K subscribers",
    title: "Guides and analysis, every week",
    text: "Winning lineups, tactics and pro-player gameplay.",
    cta: { label: "Go to the channel", href: "https://www.youtube.com/@denuzzofabio", external: true },
    img: { base: "youtube", alt: "Fabio Denuzzo's YouTube channel" },
  },
] as const;

export const about = {
  label: "About me",
  title: "From pro player to coach: a journey built on the pitch.",
  // intro contains a link to Juventus
  intro: {
    before: "Pro player for ",
    linkLabel: "Juventus FC",
    linkHref:
      "https://www.juventus.com/it/news/articoli/nasce-il-team-esports-juventus-dsyre",
    after:
      " and Dsyre Esports. Two FIFA eWorld Cup appearances. Today I help players reach their full potential on EA Sports FC.",
  },
  timeline: [
    { year: "2013", txt: "FIFA 13 Italian Champion" },
    { year: "2018", txt: "FIFA eWorld Cup — London" },
    { year: "2020", txt: "Juventus FC Pro Player" },
    { year: "2021", txt: "FIFA eWorld Cup — Top 4 EU" },
    { year: "2023", txt: "FIFA 23 Italian Champion" },
    { year: "Today", txt: "Coach & Content Creator" },
  ],
};

export const coaching = {
  label: "1:1 Coaching",
  title: "Want to play like a pro?",
  subtitle:
    "1-to-1 sessions with a 2× Italian Champion and eWorld Cup competitor. META tactics, FUT market management and a competitive mindset.",
  steps: [
    { n: "01 — Book", h: "Choose when", p: "Pick a date and time from the coaching page." },
    { n: "02 — Live session", h: "60 minutes 1:1", p: "Gameplay review together + tactics tailored to your style." },
    { n: "03 — Recap + growth", h: "Leave with a plan", p: "Get a written recap with the key points to work on." },
  ],
  trust: [
    { num: "300+", label: "Students since 2020" },
    { num: "60'", label: "Per session" },
    { num: "1:1", label: "Private session" },
  ],
  testimonials: [
    { quote: "After 3 sessions I went from Division 5 to Division 2. Fabio's method is concrete, no useless theory.", author: "Luca R. — Milan" },
    { quote: "He taught me to read the FUT market like a pro. I tripled my coins in two weeks.", author: "Marco T. — Rome" },
  ],
  cta: "Discover the coaching",
  priceAnchor: "from €22.50 per session",
};

export const newsletter = {
  label: "Newsletter · Free forever",
  title: "Every day, the news that matters on EA FC 26.",
  subtitle:
    "Daily articles to master tactics, manage the market and stay up to date on every EA Sports FC 26 update.",
  lead: "Subscribe and get instantly: the 5 META formations of the week",
  placeholder: "Your email",
  success: "Subscription confirmed — check your inbox.",
  tags: ["META Tactics", "FUT Market", "EA FC 26 News", "Weekly Guides"],
};

export const community = {
  label: "Community",
  title: "Join the group of those who play to win.",
  subtitle:
    "Tactical discussions, market analysis, internal tournaments and direct support. All on WhatsApp, with direct access to me.",
  members: "1247",
  cta: "Join on WhatsApp",
};

export const youtube = {
  label: "YouTube · 47K subscribers",
  title: "META guides, tactics and market analysis.",
  subtitle:
    "Weekly videos on winning lineups, FUT secrets and pro-player gameplay.",
  videos: [
    { id: "341K2A5psKY", title: "The strongest player in EA FC" },
    { id: "Xn6W-o1LDB8", title: "The best full-backs" },
  ],
  cta: "See all the videos on the channel →",
};

export const finalCta = {
  title: "Ready to improve?",
  subtitle: "1:1 coaching with a 2× Italian EA FC Champion. From €22.50 per session.",
  cta: "Book your coaching →",
};

/* ─────────────────────────────────────────── COACHING ── */
export const coachingPage = {
  seo: {
    title: "1:1 Coaching — Fabio Denuzzo | EA FC 26",
    description:
      "1:1 coaching sessions with Fabio Denuzzo, 2× Italian EA FC Champion and former pro player. META tactics, game reading, pro mindset. From €22.50.",
    path: "/coaching",
  },
  hero: {
    eyebrow: "2× Italian Champion · Former Pro Player",
    title: "1:1 EA FC Coaching",
    subtitle:
      "Private 1:1 sessions with a former professional. Learn the same tactics that took me to the World Cup.",
    ctaPrimary: { label: "Choose your package", href: "#prezzi" },
    ctaWhatsapp: { label: "Got questions? Message me", href: "https://wa.me/393667142489" },
  },
  packages: [
    {
      name: "Single Session",
      desc: "Perfect for trying the method and getting an immediate boost.",
      priceFull: "€30",
      price: "€22.50",
      features: ["60 minutes 1:1 live", "Personalized gameplay analysis", "Tailored tactical plan", "Written post-session recap"],
      cta: "Book now →",
      stripe: "https://buy.stripe.com/cNi3cv997gx75QV16b4AU00",
      popular: false,
    },
    {
      name: "4-Hour Program",
      desc: "The complete program to level up and dominate your Division.",
      priceFull: "€110",
      price: "€82.50",
      features: ["4 sessions of 60 minutes", "Complete personalized program", "WhatsApp support between sessions", "Detailed replay analysis", "Up-to-date META tactics"],
      cta: "Choose the program →",
      stripe: "https://buy.stripe.com/00w6oHbhfft31AF3ej4AU01",
      popular: true,
    },
    {
      name: "8-Hour Transformation",
      desc: "The total transformation: become the player you've always wanted to be.",
      priceFull: "€200",
      price: "€150",
      features: ["8 sessions of 60 minutes", "Complete game transformation", "Ongoing mentoring via WhatsApp", "Priority booking access", "Personalized opponent analysis", "Pro-level competitive mindset"],
      cta: "Start the transformation →",
      stripe: "https://buy.stripe.com/7sY7sL2KJ4Op0wBaGL4AU02",
      popular: false,
    },
  ],
  microcopy: "Secure payment with Stripe",
  learn: [
    { h: "Stop conceding silly goals", p: "Positioning, tackle timing and smart pressing to lock down your defense." },
    { h: "Score from any position", p: "Build-up play, finishing under pressure and skill moves that make the difference." },
    { h: "Dominate every META formation", p: "Custom instructions and tactical adaptation to beat any opponent." },
    { h: "Field the right team", p: "Formation, roles and tactical instructions optimized for your playstyle." },
    { h: "Zero tilt, zero rage quit", p: "Manage the pressure and play with a professional's mindset in every match." },
    { h: "A personalized plan to climb", p: "A report with error analysis, areas for improvement and an action plan after every session." },
  ],
  steps: [
    { n: "01 — Book", h: "Choose and pay", p: "Pick your package and pay securely with Stripe." },
    { n: "02 — Live session", h: "60 minutes 1:1", p: "Gameplay review + tactics in real time." },
    { n: "03 — Recap + growth", h: "Leave with a plan", p: "Written recap with the plan to improve." },
  ],
  results: [
    { from: "Gold 3", to: "Elite 1", time: "In 1 month · 4 sessions", quote: "From Gold 3 to Elite 1 in a month. Fabio opened my eyes to mistakes I'd been making for years.", author: "Marco L." },
    { from: "Div 4", to: "Div 1", time: "In 6 weeks · 4 sessions", quote: "I thought I'd hit my ceiling in Div 4. After 4 hours I'm stable in Div 1.", author: "Gianluca R." },
    { from: "Beginner", to: "Platinum", time: "In 2 months · 8 sessions", quote: "From beginner to Platinum in 8 sessions. I play with a confidence I didn't think was possible.", author: "Andrea S." },
  ],
  faq: [
    { q: "How does a session work?", a: "A private call on Discord or WhatsApp. We play together and I analyze your gameplay in real time. At the end you get a written recap." },
    { q: "Is a minimum level required?", a: "No. I coach players of every level — the program is tailored to you." },
    { q: "On which platforms?", a: "PlayStation, Xbox and PC — all EA Sports FC 26 platforms." },
    { q: "How long until results?", a: "Improvements from the very first session. With 4 hours, a Division jump is practically guaranteed." },
    { q: "How does payment work?", a: "You pay with Stripe (card). After payment I reach out to you on WhatsApp to schedule the session." },
    { q: "How do I book the session?", a: "After payment I reach out to you on WhatsApp within 24h to set the date and time of the session together." },
  ],
};

/* ─────────────────────────────────────── NEWSLETTER ── */
export const newsletterPage = {
  seo: {
    title: "FC Newsletter — Fabio Denuzzo | EA FC 26",
    description:
      "EA FC 26 newsletter: meta, tactics, guides and analysis by Fabio Denuzzo, former World Top 10 pro player. Free, zero spam.",
    path: "/newsletter",
  },
  hero: {
    eyebrow: "Fabio Denuzzo presents",
    title: "FC Newsletter",
    subtitle: "EA FC 26 · Meta · Tactics · Guides. The news that matters, every week.",
  },
  lead: "Subscribe and get analysis on meta, tactics and gameplay straight to your inbox.",
  placeholder: "Your email",
  cta: "Subscribe for free",
  success: "Subscribed! Check your inbox.",
  microcopy: "Free · Unsubscribe anytime · Zero spam",
  tags: ["Meta", "Tactics", "Guides", "TOTS", "eSports"],
  value: [
    { h: "Weekly META analysis", p: "The formations and players dominating the meta, explained by someone who's played them." },
    { h: "Reading the game", p: "How to defend, when to attack and how to read your opponent." },
    { h: "Guides and tactics", p: "Defense, attack and movement: practical guides to genuinely improve." },
  ],
  editions: [
    { n: "#10", date: "May 20, 2026", title: "EA sells ad space inside FC26: Visa, Compost and TOTS at 15K", cat: "Market" },
    { n: "#09", date: "May 14, 2026", title: "La Liga TOTS: Mbappé, Lamine Yamal, EVO CAM Max 91 and the market", cat: "TOTS" },
    { n: "#08", date: "May 10, 2026", title: "Historic goalkeeper EVO, sky-high pack weight and the weekend market", cat: "Meta" },
  ],
  author: {
    name: "Fabio Denuzzo",
    bio: "Former World Top 10 EA FC pro player. Every week I analyze meta, tactics and game strategies to help you improve.",
  },
};

/* ──────────────────────────────────────────── BLOG ── */
export const blogPage = {
  seo: {
    title: "EA FC Blog — Denuzzo Gaming",
    description:
      "News, guides, meta analysis and EA FC tips from pro player Fabio Denuzzo. TOTS, SBC, formations, tactics and coaching.",
    path: "/blog",
  },
  hero: {
    eyebrow: "Blog",
    title: "EA FC Blog",
    subtitle: "News, guides, meta analysis and tips from pro player Fabio Denuzzo. Everything on EA FC 26.",
  },
  categories: ["All", "TOTS", "Guides", "Market", "eSports", "Opinion"],
};

/* ───────────────────────────────────────── PRIVACY ── */
export const privacyPage = {
  seo: {
    title: "Privacy Policy — Denuzzo Gaming",
    description: "Denuzzo Gaming's privacy and cookie policy.",
    path: "/privacy",
  },
  title: "Privacy Policy",
  subtitle: "How we protect your data and respect your privacy.",
  updated: "Last updated: May 26, 2026",
  email: "hello@denuzzogaming.com",
  sections: [
    { h: "1. Data controller", p: ["The controller of personal data is Fabio Denuzzo, operating through the Denuzzo Gaming brand.", "Contact email: hello@denuzzogaming.com"] },
    { h: "2. Data collected", p: ["We collect the following categories of data:", "• Browsing data: IP address, browser type, pages visited, access times, collected automatically.", "• Voluntarily provided data: name, email and other information entered in contact, newsletter or coaching booking forms.", "• Payment data: transactions are handled by Stripe. We do not store credit card data on our servers."] },
    { h: "3. Purposes of processing", p: ["Personal data is processed for: delivering the coaching service and managing bookings; sending the newsletter (with prior consent); responding to contact requests; anonymous statistical traffic analysis; fulfilling legal obligations."] },
    { h: "4. Legal basis", p: ["Processing is based on: consent of the data subject (newsletter, non-technical cookies), performance of a contract (coaching), legitimate interest (anonymous traffic analysis), legal obligation (invoicing)."] },
    { h: "5. Cookies", p: ["• Technical cookies: necessary for the site to function. They do not require consent.", "• Analytics cookies: for aggregate and anonymous analysis (e.g. Google Analytics, if enabled). They require consent.", "• Third-party cookies: YouTube, Stripe or social embeds may set their own cookies according to their respective policies.", "You can manage or disable cookies from your browser settings at any time."] },
    { h: "6. Data retention", p: ["Data is kept for the time strictly necessary for the purposes for which it was collected, and in any case no longer than the terms provided by law. Newsletter data is kept until the subscription is cancelled."] },
    { h: "7. Sharing with third parties", p: ["Data may be shared with: Stripe (payments), email marketing providers (newsletter), Google Analytics (traffic analysis, if enabled). We do not sell or transfer personal data to third parties for marketing purposes."] },
    { h: "8. Rights of the data subject (GDPR)", p: ["Under EU Regulation 2016/679 you have the right to: access your data; request its rectification or erasure; restrict or object to processing; request portability; withdraw consent; lodge a complaint with the Data Protection Authority."] },
    { h: "9. Security", p: ["We adopt appropriate technical and organizational measures to protect personal data from unauthorized access, loss or destruction."] },
    { h: "10. Contact", p: ["For any privacy-related request or to exercise your GDPR rights, write to us at hello@denuzzogaming.com. We will respond within 30 days as provided by EU Regulation 2016/679."] },
  ],
};
