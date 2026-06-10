// Articoli della Newsletter FC (ex blog). Testo integrale fornito da Fabio,
// convertito in Markdown e renderizzato con react-markdown.
// Ordine: dal più recente (#08) al più vecchio (#01).

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string; // ISO
  dateLabel: string;
  readingTime: string;
  badge?: string;
  heroImage?: string; // es. "/img/articles/<slug>-hero.jpg"
  heroAlt?: string; // testo alternativo (SEO/accessibilità)
  excerpt: string;
  body: string;
  // Versione inglese (opzionale): se assente, l'articolo resta solo italiano.
  en?: {
    title: string;
    description: string;
    excerpt: string;
    body: string;
    category?: string;
    dateLabel?: string;
    heroAlt?: string;
  };
};

export const articles: Article[] = [
  {
    slug: "putellas-end-of-an-era-fc26",
    title: "Putellas End of an Era FC 26: la carta tributo 96, stats ufficiali",
    description:
      "FUT Sheriff ha leakato la SBC End of an Era di Alexia Putellas in EA FC 26: stats ufficiali 96 CM, cosa fa la carta e l'ondata di EOAE in arrivo.",
    category: "SBC",
    date: "2026-06-10",
    dateLabel: "10 Giugno 2026",
    readingTime: "5 min",
    badge: "LEAK",
    heroImage: "/img/articles/putellas-end-of-an-era-fc26-hero.jpg",
    heroAlt:
      "Carta End of an Era di Putellas in stile EA FC: una centrocampista che alza un trofeo tra schegge viola e luce dorata",
    excerpt:
      "Putellas End of an Era leakata: stats ufficiali 96 CM (96 DRI, 95 PAS, 89 DEF), 4 PlayStyle+, più tutta l'ondata di SBC EOAE in arrivo.",
    body: `FUT Sheriff ha sganciato una delle carte più emozionanti di questo EA FC 26: la **Alexia Putellas End of an Era**, un tributo da 96 alla regista che ha appena chiuso la sua era al Barcellona. Le stat sono ufficiali, e sono da regista totale. Ti spiego cos'è, quanto è forte e cosa aspettarti dalla SBC.

## Cos'è una carta End of an Era

Le **End of an Era** (EOAE) sono carte speciali che celebrano un giocatore che chiude un capitolo importante: lascia il club dopo anni, oppure si avvicina alla fine della carriera. Di solito arrivano come **SBC** (le sfide creazione rosa) ed escono nella fase finale della stagione di Ultimate Team, quando EA omaggia le leggende. Sono carte da collezione, spesso non scambiabili, pensate più per il cuore (e per la rosa) che per il trading.

## Putellas EOAE: le stat ufficiali

![Carta End of an Era di Putellas in stile FUT: 96 a centrocampo con quattro PlayStyle+](/img/articles/putellas-end-of-an-era-fc26-1.jpg)

FUT Sheriff l'ha mostrata con la dicitura **OFFICIAL STATS**. Ecco i numeri:

- **96 OVR, centrocampista centrale (CM)**, Spagna, Liga F, Barcellona
- **PAC 91 · SHO 95 · PAS 95 · DRI 96 · DEF 89 · PHY 88**
- **4 PlayStyle+**

È il profilo della **regista totale**: 96 di dribbling e 95 di passaggio per dettare il gioco, 95 al tiro per andare in gol da fuori, e una difesa da 89 che per un centrocampo è roba seria (recupera palloni e regge il pressing). Con 4 PlayStyle+ può fare la differenza in mezzo al campo in tutte le fasi.

> 💡 **Perché è speciale:** un CM con dribbling 96, passaggio 95 e difesa 89 è un profilo completo, raro da trovare in un'unica carta. Per chi gioca con la costruzione dal basso e il possesso, è oro.

## Una carta che è un addio

Il senso dell'End of an Era qui è forte: **Putellas ha lasciato il Barcellona dopo 14 stagioni**, da due volte Pallone d'Oro e simbolo del calcio femminile moderno. La carta tributo arriva proprio per chiudere quel capitolo blaugrana. È uno di quei contenuti che vanno oltre il rating: chi segue il calcio femminile, o chi vuole una leggenda in rosa, qui ha pane per i suoi denti.

## Non è sola: l'ondata End of an Era

![Schermata SBC in stile Ultimate Team con una squadra di carte End of an Era](/img/articles/putellas-end-of-an-era-fc26-2.jpg)

La Putellas non è un caso isolato. In questa fase sono leakate diverse **EOAE** in arrivo come SBC, tra cui nomi grossi: **Salah** (la più alta, intorno al 95), **Bernardo Silva**, **John Stones**, **Griezmann**, **Robertson**, **Goretzka**, e un altro tributo blaugrana, **Jordi Alba**. Tradotto: siamo nella stagione degli addii, e nelle prossime settimane di SBC ne vedremo parecchie.

> ⚠️ **Sul mercato:** le ondate di SBC EOAE bruciano tanto **fodder** (le carte da scambio per completare le sfide). Se prevedi di farne più di una, tieni d'occhio i prezzi degli 84-88: tendono a salire quando escono SBC pesanti una dietro l'altra.

## Quanto costa e conviene farla?

Qui serve onestà: **requisiti e costo della SBC non sono ancora stati svelati**. Appena escono aggiorniamo. In generale, le End of an Era sono SBC da collezione, non scambiabili, da valutare su due cose:

1. **ti serve per la rosa?** Un CM da 96 con questo profilo è utilissimo in mezzo al campo;
2. **la vuoi per il valore affettivo o da collezione?** Per i fan è un pezzo da tenere.

Se la SBC sarà cara (tante rose), valuta se quel CM ti cambia davvero la squadra rispetto ad alternative più economiche sul mercato.

> ✔ **Da tenere d'occhio:** appena EA pubblica la SBC, controlla il costo in coins, la scadenza e se è ripetibile. Le EOAE di solito sono uno-e-via.

## Riepilogo

> **✓ DA FARE**
> — Segnarti le stat: 96 CM, PAC 91 / SHO 95 / PAS 95 / DRI 96 / DEF 89 / PHY 88, 4 PlayStyle+
> — Valutarla come regista totale per la costruzione dal basso e il possesso
> — Tenere da parte fodder 84-88: in questa fase escono tante SBC EOAE
> — Aspettare i requisiti ufficiali prima di decidere
>
> **✕ DA EVITARE**
> — Dare per certi costo e requisiti: non sono ancora usciti (è un leak sulle stat)
> — Bruciare tutto il fodder sulla prima EOAE se ne vuoi fare altre
> — Farla solo per l'hype se non ti serve un CM e non sei un collezionista`,
    en: {
      title: "Putellas End of an Era FC 26: the 96 Tribute Card, Official Stats",
      description:
        "FUT Sheriff leaked Alexia Putellas' End of an Era SBC in EA FC 26: official 96 CM stats, what the card does and the wider EOAE wave to come.",
      excerpt:
        "Putellas End of an Era leaked: official 96 CM stats (96 DRI, 95 PAS, 89 DEF), 4 PlayStyle+, plus the whole EOAE SBC wave coming next.",
      category: "SBC",
      dateLabel: "10 June 2026",
      heroAlt:
        "Putellas End of an Era card in EA FC style: a midfielder lifting a trophy among purple shards and golden light",
      body: `FUT Sheriff has dropped one of the most emotional cards of this EA FC 26: the **Alexia Putellas End of an Era**, a 96-rated tribute to the playmaker who's just closed her era at Barcelona. The stats are official, and they're pure midfield general. Here's what it is, how strong it is and what to expect from the SBC.

## What an End of an Era Card Is

**End of an Era** (EOAE) cards celebrate a player closing an important chapter: leaving a club after years, or nearing the end of their career. They usually arrive as **SBCs** (Squad Building Challenges) in the final stretch of the Ultimate Team season, when EA pays tribute to the legends. They're collector cards, often untradeable, built more for the heart (and your squad) than for trading.

## Putellas EOAE: the Official Stats

![Putellas End of an Era card in FUT style: a 96-rated central midfielder with four PlayStyle+](/img/articles/putellas-end-of-an-era-fc26-1.jpg)

FUT Sheriff showed it off with the **OFFICIAL STATS** tag. Here are the numbers:

- **96 OVR, central midfielder (CM)**, Spain, Liga F, Barcelona
- **PAC 91 · SHO 95 · PAS 95 · DRI 96 · DEF 89 · PHY 88**
- **4 PlayStyle+**

This is the **complete midfield general**: 96 dribbling and 95 passing to dictate the game, 95 shooting to score from range, and an 89 defending that's genuinely serious for a midfielder (wins the ball, holds up under pressure). With 4 PlayStyle+ she can swing the midfield in every phase.

> 💡 **Why it's special:** a CM with 96 dribbling, 95 passing and 89 defending is a complete profile, rare to find on a single card. If you play possession football and build from the back, this is gold.

## A Card That's a Goodbye

The End of an Era meaning hits hard here: **Putellas left Barcelona after 14 seasons**, a two-time Ballon d'Or winner and a symbol of the modern women's game. The tribute card lands exactly to close that Blaugrana chapter. It's the kind of content that goes beyond the rating: if you follow the women's game, or want a legend in your squad, this one's for you.

## She's Not Alone: the End of an Era Wave

![Ultimate Team style SBC screen with a full squad of End of an Era cards](/img/articles/putellas-end-of-an-era-fc26-2.jpg)

Putellas isn't a one-off. Several **EOAE** cards have leaked as upcoming SBCs, including big names: **Salah** (the highest, around 95), **Bernardo Silva**, **John Stones**, **Griezmann**, **Robertson**, **Goretzka**, and another Blaugrana tribute, **Jordi Alba**. Translated: we're in goodbye season, and the next few weeks of SBCs will be packed with them.

> ⚠️ **On the market:** EOAE SBC waves burn a lot of **fodder** (the cards you use to complete challenges). If you plan to do more than one, keep an eye on 84-88 prices: they tend to rise when heavy SBCs drop back to back.

## How Much Does It Cost & Is It Worth It?

Time for honesty: the **SBC requirements and cost haven't been revealed yet**. We'll update as soon as they're out. In general, End of an Era cards are collector SBCs, untradeable, worth weighing on two things:

1. **do you need it for your squad?** A 96 CM with this profile is hugely useful in midfield;
2. **do you want it for the sentiment or the collection?** For fans it's a keeper.

If the SBC turns out expensive (lots of squads), think about whether that CM really changes your team versus cheaper alternatives on the market.

> ✔ **Keep an eye out:** as soon as EA posts the SBC, check the coin cost, the expiry and whether it's repeatable. EOAE cards are usually one-and-done.

## Summary

> **✓ DO**
> — Note the stats: 96 CM, PAC 91 / SHO 95 / PAS 95 / DRI 96 / DEF 89 / PHY 88, 4 PlayStyle+
> — Consider her as a complete playmaker for possession and build-up
> — Save 84-88 fodder: lots of EOAE SBCs are dropping in this window
> — Wait for the official requirements before deciding
>
> **✕ DON'T**
> — Treat the cost and requirements as confirmed: they're not out yet (this is a stats leak)
> — Burn all your fodder on the first EOAE if you want to do others
> — Do it just for the hype if you don't need a CM and aren't a collector`,
    },
  },
  {
    slug: "evo-gettoni-week1-fc26",
    title: "EA FC 26: i nuovi EVO da fare e l'ultimo giorno per i gettoni",
    description:
      "I nuovi EVO di EA FC 26 (Continental Cannon, Final Preparations), perché oggi è l'ultimo giorno per i gettoni Week 1 e come conservarli per la prossima.",
    category: "EVO",
    date: "2026-06-10",
    dateLabel: "10 Giugno 2026",
    readingTime: "7 min",
    badge: "GUIDA",
    heroImage: "/img/articles/evo-gettoni-week1-fc26-hero.jpg",
    heroAlt:
      "Schermata EVO in stile EA FC Ultimate Team: una carta FUT che sale di statistiche tra monete dorate e icone PlayStyle+",
    excerpt:
      "Continental Cannon, Final Preparations e Free Kick Mastery: quali EVO valgono. Più la strategia gettoni Week 1 prima del reset di domani.",
    body: `Giornata densa su EA FC 26. Da una parte è l'ultimo giorno per macinare i gettoni della Week 1 prima del reset, dall'altra stanno uscendo nuovi EVO interessanti, con un pezzo grosso in arrivo venerdì. Ti spiego cosa conta davvero e cosa fare oggi, senza perdere tempo (e gettoni).

## Ultimo giorno per i gettoni Week 1

Oggi è l'ultimo giorno utile per accumulare i gettoni della prima settimana: il limite settimanale è di **1000 gettoni** e si azzera domani, ai Rivals Rewards. Se vuoi arrivare in fondo, oggi tocca giocare: evento Live, Rush e Squad Battles danno gettoni, quindi è la giornata da sfruttare.

C'è però un dettaglio che ha fatto storcere il naso a tutti: EA ha tolto dallo store i due EVO premio più ghiotti. Il **Main Event**, quello che porta Neymar a 97 con 97 di passo e 97 al tiro, e il **Gold Standard** da 500 gettoni, che dà il design National Pride da personalizzare con i tuoi PlayStyle+. EA ha detto solo che torneranno "più avanti", senza spiegare perché.

Il problema è di tempismo: con quei premi spariti, chi sta grindando si ritroverà presto fino a **2000 gettoni** da spendere per il Main Event EVO, forse già da domani. Se quei premi non rientrano in tempo, è lecito aspettarsi un po' di frustrazione.

![Gettoni FUT con conto alla rovescia e scala premi: l'ultimo giorno per accumulare i token Week 1](/img/articles/evo-gettoni-week1-fc26-1.jpg)

> ⚠️ **Sul reset:** sia lo store settimanale sia lo store Champions si azzerano domani ai Rivals Rewards. Controlla cosa ti serve davvero prima che cambi tutto.

## Conservare i gettoni: la strategia furba

La cosa più importante da sapere: i gettoni si portano avanti, puoi tenerli per la Week 2 e partire avvantaggiato.

Occhio però a non sprecarli contro il tetto dei 1000. Esempio concreto: se sei a 830 gettoni e riscatti un premio da 400, te ne contano solo **170** (quelli che ti portano a 1000), gli altri 230 vanno persi. Se sei vicino al limite, tipo a 980, conviene **non** riscattare subito quel premio Rivals o Squad Battles: lascialo lì e prendilo la settimana prossima, così i 300 o 400 gettoni interi finiscono nella Week 2 invece di bruciarsi.

Lo stesso vale per i gettoni Champions: puoi metterne da parte un bel po' (c'è chi ne tiene 100 in vista delle ricompense della prossima settimana). Non si azzerano: il limite settimanale riparte da zero, ma i gettoni restano.

> 💡 **Perché è furbo:** se punti ai 1000 gettoni, non bruciare l'eccesso oggi. Portare i premi non riscattati nella settimana nuova ti fa arrivare al traguardo molto più facilmente.

## I nuovi EVO: Final Preparations e Free Kick Mastery

Ieri sono usciti due EVO gratis, molto diversi tra loro.

**Final Preparations** è quello che interessa a tutti: +2 a ogni statistica di base, **5 stelle di skill** e **5 stelle di piede debole**, con tetto a 90 di overall. C'è da aspettare un paio di giorni per completarlo, ma il risultato è una carta 5★/5★ con statistiche niente male. Tanti lo stanno usando per costruire attaccanti con 95 in passo, tiro, passaggio e dribbling. È perfetto come EVO di chiusura di una catena, o come base da far evolvere ancora.

**Free Kick Mastery** è molto più di nicchia. È gratis e ripetibile due volte, porta la precisione sui calci piazzati fino a 99 (se parti da almeno 79) e regala il PlayStyle+ Palla Inattiva, con un piccolo boost al tiro. Il punto è che alza l'overall di +1, quindi è più un EVO da catena. Ha senso solo se ci tieni davvero a Palla Inattiva+ o vuoi uno specialista delle punizioni: altrimenti occupa uno slot PlayStyle+ prezioso per poco.

> ⚠️ **Attenzione agli slot:** Free Kick Mastery "consuma" un PlayStyle+ importante. Se non punti alle punizioni, lascia perdere e tieni lo slot per qualcosa di più utile.

## Continental Cannon: l'EVO obiettivo da non perdere

![Concept dell'EVO Continental Cannon: tiro potentissimo, statistica SHO a 99 e PlayStyle+ Power Shot](/img/articles/evo-gettoni-week1-fc26-2.jpg)

Questo è il pezzo forte, e arriva venerdì. Si chiama **Continental Cannon** ed è un EVO **obiettivo**, non un premio a scelta: lo prendono tutti semplicemente giocando con certi giocatori. Nessun dilemma "questo o quello", è per chiunque.

I numeri sono assurdi: carta fino a **91 di overall**, **3 PlayStyle+** e un boost al tiro enorme, con potenza di tiro, compostezza e finalizzazione che salgono fino a **96**, più il piede debole a 5 stelle. La cosa migliore: **non alza l'overall** della carta. Tradotto, è l'EVO perfetto per le catene e per spremere il tiro senza mandare fuori scala il rating.

E qui torna Neymar, la carta del momento. Se lo tieni a 91 di overall (ha la posizione da attaccante), questo EVO gli calza: 96 al tiro è un upgrade pazzesco partendo da 91 o 92. L'unica accortezza: se invece hai in programma di metterlo nel Main Event EVO da 2000 gettoni (quello da 97 al tiro), non ha senso fare entrambi, vai di 97 e basta. Scegline uno.

> 💡 **Perché è speciale:** è un EVO obiettivo gratuito che non tocca l'overall, quindi lo puoi mettere su mezza rosa per alzare il tiro. Roba che in questo gioco non capitava da un po'.

## Uno sguardo veloce al mercato

Due parole sul mercato, perché si muove parecchio.

Le carte TOTS sono richieste come fodder e viaggiano sui **35.000 crediti**: il fodder in generale tiene bene, con i 90 sugli 11-12.000, gli 89 sopra i 4.000 e perfino gli 88 vicini ai 2.000.

Le carte **Path to Glory**, invece, stanno scendendo. Due motivi: si chiude la Weekend League (finiscono i pacchetti scambiabili che le immettevano sul mercato) e diverse di queste carte vengono usate come "coin transfer", il che ne abbassa artificialmente il prezzo. Niente panico da vendita: queste carte sono un investimento a lungo termine, sono rare, sono live e si aggiorneranno. Chi le ha (un De Bruyne, un Pulisic, un Dias) fa bene a tenerle.

Sul fronte opposto, le carte dei vincitori di Champions League stanno volando: roba super rara che ogni giorno sale. E il trading classico, comprare basso e vendere alto, continua a funzionare benissimo.

> 💡 **SBC da non perdere:** c'è un player pick "uno di tre" a tema vincitori UEFA e TOTS, da sole 3 rose (87, 88, 89), in cui possono uscire le Road to the Final 96 e le TOTS 93+. Le probabilità del colpo grosso sono basse, ma costa poco, è divertente e non si rigenera (è uno-e-via): vale la pena farlo, fosse solo per il gusto di provarci.

> ⚠️ **Oggi (mercoledì):** come durante il TOTS, è molto probabile un pacchetto o un player pick Path to Glory garantito. E siamo a un giorno dalla modalità Mondiale: occhio a un possibile SBC pre-Mondiale e alle sfide Showdown, che hanno il tempo che scorre.

## Riepilogo

> **✓ DA FARE**
> • Sfruttare oggi (Live, Rush, Squad Battles) per chiudere i gettoni Week 1 prima del reset di domani
> • Conservare i gettoni per la Week 2: non bruciare l'eccesso oltre il tetto dei 1000
> • Fare Final Preparations per una carta 5★/5★ con +2 ovunque (ottimo fine catena)
> • Tenersi pronti al Continental Cannon di venerdì: gratis, +3 PlayStyle+, fino a 96 al tiro, non alza l'overall
> • Tenere le carte Path to Glory: è un hold a lungo termine, niente panic sell
>
> **✕ DA EVITARE**
> • Riscattare un premio gettoni quando sei vicino a 1000: l'eccesso va perso
> • Fare Free Kick Mastery se non ti serve Palla Inattiva+: spreca uno slot PlayStyle+
> • Mettere Neymar sia nel Continental Cannon sia nel Main Event EVO: scegline uno
> • Vendere in panico le Path to Glory solo perché sono scese`,
    en: {
      title: "EA FC 26: The New EVOs to Do & the Last Day for Week 1 Tokens",
      description:
        "The new EA FC 26 EVOs (Continental Cannon, Final Preparations), why today is the last day to grind Week 1 tokens and how to hoard them for next week.",
      excerpt:
        "Continental Cannon, Final Preparations and Free Kick Mastery: which EVOs are worth it, plus the Week 1 token strategy before tomorrow's reset.",
      category: "EVO",
      dateLabel: "10 June 2026",
      heroAlt:
        "EA FC Ultimate Team style EVO screen: a FUT card climbing in stats among golden coins and PlayStyle+ icons",
      body: `Busy day on EA FC 26. On one side it's the last day to grind your Week 1 tokens before the reset, on the other there are fresh EVOs dropping, with a big one landing Friday. Let me break down what actually matters and what to do today, without wasting time (or tokens).

## Last Day for Week 1 Tokens

Today is your final chance to stack up first-week tokens: the weekly limit is **1000 tokens** and it resets tomorrow at Rivals Rewards. If you want to max it out, today means playing: the Live event, Rush and Squad Battles all hand out tokens, so this is the day to grind.

There's one thing that's annoyed everyone though: EA pulled the two juiciest reward EVOs from the store. The **Main Event**, the one that takes Neymar to a 97 with 97 pace and 97 shooting, and the **Gold Standard** at 500 tokens, which gives the National Pride design you customise with your own PlayStyle+. EA only said they'll be back "at a later time", with no reason given.

The problem is the timing: with those rewards gone, anyone grinding will soon be sitting on up to **2000 tokens** to spend on the Main Event EVO, maybe as soon as tomorrow. If those rewards aren't back in time, expect some frustration.

![FUT tokens with a countdown and reward ladder: the last day to stack up Week 1 tokens](/img/articles/evo-gettoni-week1-fc26-1.jpg)

> ⚠️ **On the reset:** both the weekly store and the Champions store reset tomorrow at Rivals Rewards. Check what you actually need before everything swaps over.

## Hoard Your Tokens: the Smart Play

The key thing to know: tokens carry over, you can take them into Week 2 and start ahead.

But be careful not to waste them against the 1000 cap. Concrete example: if you're on 830 tokens and claim a 400 reward, only **170** of them count (the ones that get you to 1000), the other 230 are gone. If you're near the limit, say on 980, it's better **not** to claim that Rivals or Squad Battles reward right now: leave it and grab it next week, so the full 300 or 400 tokens land in Week 2 instead of burning.

Same goes for Champs tokens: you can stash a good chunk (some people are saving 100 ahead of next week's rewards). They don't reset: the weekly limit starts from zero again, but the tokens stay.

> 💡 **Why it's smart:** if you're chasing 1000 tokens, don't burn the overflow today. Carrying unclaimed rewards into the new week gets you to the finish line far more easily.

## The New EVOs: Final Preparations and Free Kick Mastery

Two free EVOs dropped yesterday, very different from each other.

**Final Preparations** is the one everyone's into: +2 to every base stat, **five-star skills** and a **five-star weak foot**, capped at 90 overall. You have to wait a couple of days to finish it, but the payoff is a 5★/5★ card with some seriously nice stats. A lot of people are using it to build attackers with 95 in pace, shooting, passing and dribbling. It's perfect as a chain-ending EVO, or as a base to evolve further.

**Free Kick Mastery** is far more niche. It's free and repeatable twice, takes free kick accuracy up to 99 (if you start from at least 79) and gives the Dead Ball+ PlayStyle, with a small shooting boost. The catch is it bumps the overall by +1, so it's more of a chain evo. It only makes sense if you genuinely want Dead Ball+ or a free-kick specialist: otherwise it eats an important PlayStyle+ slot for very little.

> ⚠️ **Mind the slots:** Free Kick Mastery "uses up" an important PlayStyle+. If you're not after free kicks, skip it and save the slot for something more useful.

## Continental Cannon: the Objective EVO Not to Miss

![Continental Cannon EVO concept: a huge shot, the SHO stat at 99 and the Power Shot+ PlayStyle](/img/articles/evo-gettoni-week1-fc26-2.jpg)

This is the big one, and it lands Friday. It's called **Continental Cannon** and it's an **objective** EVO, not a reward choice: everyone gets it just by playing with certain players. No "this or that" dilemma, it's for everyone.

The numbers are ridiculous: a card up to **91 overall**, **3 PlayStyle+** and a massive shooting boost, with shot power, composure and finishing climbing to **96**, plus a five-star weak foot. The best part: it **doesn't raise the overall**. Translated, it's the perfect EVO for chains and for cranking up shooting without sending the rating out of range.

And here comes Neymar, the card of the moment. If you keep him at 91 overall (he has the striker position), this EVO fits him: 96 shooting is an insane upgrade from 91 or 92. The one thing to watch: if you're planning to put him in the 2000-token Main Event EVO (the 97 shooting one), there's no point doing both, just go 97 and be done. Pick one.

> 💡 **Why it's special:** it's a free objective EVO that doesn't touch the overall, so you can slap it on half your squad to boost shooting. That's the kind of content this game hasn't had for a while.

## A Quick Look at the Market

A couple of words on the market, because it's moving a lot.

TOTS cards are in demand as fodder and are sitting around **35,000 coins**: fodder in general is holding up well, with 90s at 11-12,000, 89s above 4,000 and even 88s near 2,000.

**Path to Glory** cards, on the other hand, are slipping. Two reasons: Weekend League is wrapping up (the tradeable packs that fed them onto the market are ending) and several of these cards are being used as "coin transfer" cards, which drags their price down artificially. No panic selling: these are a long-term investment, they're rare, they're live and they'll upgrade. If you're holding (a De Bruyne, a Pulisic, a Dias) you're right to sit tight.

On the flip side, the Champions League winner cards are flying: super rare stuff that climbs every day. And classic trading, buy low and sell high, keeps working a treat.

> 💡 **SBC not to miss:** there's a "one of three" player pick built around UEFA winners and TOTS, just 3 squads (87, 88, 89), where the 96-rated Road to the Final cards and 93+ TOTS can drop. The odds of the big hit are low, but it's cheap, it's fun and it doesn't refresh (it's one-and-done): worth doing, if only for the thrill of trying.

> ⚠️ **Today (Wednesday):** like during TOTS, a guaranteed Path to Glory pack or player pick is very likely. And we're one day from the World Cup mode: keep an eye out for a possible pre-World Cup SBC and the Showdown challenges, which are time-sensitive.

## Summary

> **✓ DO**
> • Grind today (Live, Rush, Squad Battles) to finish your Week 1 tokens before tomorrow's reset
> • Hoard tokens for Week 2: don't burn the overflow past the 1000 cap
> • Do Final Preparations for a 5★/5★ card with +2 everywhere (great chain ender)
> • Get ready for Friday's Continental Cannon: free, +3 PlayStyle+, up to 96 shooting, no overall boost
> • Hold your Path to Glory cards: it's a long-term hold, no panic selling
>
> **✕ DON'T**
> • Claim a token reward when you're close to 1000: the overflow is lost
> • Do Free Kick Mastery if you don't need Dead Ball+: it wastes a PlayStyle+ slot
> • Put Neymar in both the Continental Cannon and the Main Event EVO: pick one
> • Panic sell your Path to Glory cards just because they've dropped`,
    },
  },
  {
    slug: "fut-champions-store-gettoni-fc26",
    title: "Store FUT Champions FC 26: come funziona e quali premi scegliere",
    description:
      "Come funziona lo store FUT Champions di EA FC 26: gettoni separati dai Rivals, premi per fascia, scambiabile o no e quando conviene conservare i token.",
    category: "Guida",
    date: "2026-06-10",
    dateLabel: "10 Giugno 2026",
    readingTime: "6 min",
    badge: "GUIDA",
    heroImage: "/img/articles/fut-champions-store-gettoni-fc26-hero.jpg",
    heroAlt:
      "Store FUT Champions di EA FC 26: gettoni e pacchetti su sfondo nero e oro",
    excerpt:
      "Store FUT Champions: gettoni a parte dai Rivals, premi per fascia (200→1000), scambiabile o no e quando conviene conservare i token invece di spenderli.",
    body: `Dopo lo store dei gettoni "normali" dei Rivals, è il turno dello **store FUT Champions**. Funziona in modo molto simile, ma ci sono un paio di cose che devi capire bene per non sprecare i tuoi token, soprattutto le **scadenze** e la scelta tra carte **scambiabili e non**. Ti spiego come muoverti.

## Due Store Separati: Champions e Rivals

La prima cosa da chiarire, perché genera confusione: i gettoni dello store Champions **sembrano identici** a quelli dei Rivals, ma sono **separati**. Hai due negozi distinti:

- lo **store settimanale** (Rivals, Live, Squad Battles, SBC e così via);
- lo **store FUT Champions**, alimentato dai gettoni che guadagni in Weekend League.

Oltre allo store, i premi a livelli della Weekend League ti danno comunque crediti, gettoni e, solo al **livello 1**, anche dei pacchetti e fino a 300.000 crediti. Dagli altri livelli arrivano principalmente crediti e gettoni, che poi spendi nello store.

## I Premi per Fascia: da 200 a 1000 Gettoni

Le ricompense vanno da **200 fino a 1000 gettoni**. Quest'anno EA ha cambiato approccio: i pacchetti hanno **meno carte ma di qualità più alta**. Tradotto: meno riempitivo, più sostanza. Ecco le fasce di questa settimana.

![Scala dei premi dello store a gettoni, dalle fasce basse alle alte](/img/articles/fut-champions-store-gettoni-fc26-1.jpg)

- **200 gettoni** → un pacchetto da 3 giocatori **92+ Path to Glory** (non scambiabile, max 2 a settimana). In alternativa, 4 oggetti giocatore **Path to Glory Squad 1 scambiabili**, senza limite di valutazione: questi puoi rivenderli.
- **300 gettoni** → un pick da 5, **93+ Path to Glory** (fino a 5 acquistabili, cioè 1500 gettoni in palio).
- **400 gettoni** → pacchi più corposi, intorno alle 50 carte, con pick e fodder garantito **85+/86+**. Ci sono versioni scambiabili e non, più un'opzione interessante: un **pick 2 di 8, 93+ Path to Glory** scambiabile.
- **600 gettoni** (≈ 10 vittorie) → carte **Orgoglio Nazionale** (tipo Dani Olmo) che puoi **buildare scegliendo tu i PlayStyle**, 3 PS oro e 8 PS base da personalizzare.

> 💡 **Riferimento vittorie → gettoni:** orientativamente 8 win valgono ~400 gettoni, 10 win ~600, 13 win ~1100. Per arrivare ai premi da 1000 servono prestazioni da 15 vittorie: se non ci arrivi, concentrati sulle fasce 200–400, che restano ottime.

Nelle fasce alte (**650+**) trovi i pacchetti migliori: il più ghiotto è un **14x Path to Glory 91+ con 4 garantiti 93+**. C'è anche un **Pick Icon 93+**, ma è più una questione di gusti, se non vai matto per le Icon, è skippabile.

## Scambiabile o Non Scambiabile?

Questa è la vera decisione dello store, più ancora di quale fascia scegliere.

![La scelta tra carte scambiabili e non scambiabili nello store a gettoni](/img/articles/fut-champions-store-gettoni-fc26-2.jpg)

- **Scambiabile:** puoi rivendere quello che packi sul mercato. Ottimo se cerchi coins o se vuoi monetizzare la fortuna.
- **Non scambiabile:** non rivendibile, ma spesso questi pacchetti **danno di più** a parità di gettoni.

Non esiste una scelta giusta in assoluto: dipende da cosa ti serve. Se vuoi costruire coins, vai sullo scambiabile. Se cerchi il colpo grosso da tenere in squadra, il non scambiabile di solito "scula" di più. Personalmente, quando voglio provare la fortuna preferisco il **non scambiabile**.

## Cosa Scade e Cosa No

Qui sta la differenza più importante rispetto allo store Rivals, ed è facile farsi fregare:

> ⚠️ **I gettoni NON scadono, i premi sì.** I gettoni puoi tenerli e spenderli le settimane successive. Ma molti **pacchetti dello store scadono** e vengono sostituiti la settimana dopo. E lo store Champions è più **dinamico** di quello Rivals: cambia più in fretta. Controlla sempre le scadenze prima di rimandare un acquisto.

Alcuni premi (specie gli oggetti estetici e i pacchettini minori da 25–50 gettoni) sono trascurabili: utili solo per smaltire gettoni avanzati dopo una combo, ma niente di cui preoccuparsi.

## Spendere o Conservare: la Strategia

Dato che i gettoni non scadono, hai due strade:

1. **Spendere ora** se i premi della settimana ti convincono.
2. **Conservare** per partire la settimana prossima con un tesoretto, se questa settimana non c'è niente che ti esalta.

La mossa intelligente è non bruciarli tutti per forza. Se hai, per esempio, 1100 gettoni, puoi prenderne uno da 1000 e **mettere da parte il resto** invece di forzare un secondo acquisto mediocre. Oppure puntare tutto su un singolo pacchetto top non scambiabile e sperare nel colpo. Valuta in base a quanto ti senti fortunato e a cosa ti serve davvero: coins o carte per la rosa.

## Riepilogo

> **✓ DA FARE**
> • Ricordare che store Champions e Rivals hanno gettoni separati
> • Decidere prima la cosa più importante: scambiabile (coins) o non scambiabile (di più)
> • Controllare le scadenze: lo store Champions cambia in fretta
> • Conservare i gettoni se i premi della settimana non convincono
> • Nelle fasce basse (200–400) c'è ottimo valore anche senza fare 15 win
>
> **✕ DA EVITARE**
> • Spendere tutti i gettoni per forza: meglio un tesoretto che un acquisto mediocre
> • Rimandare un pacchetto che sta per scadere pensando "tanto resta lì"
> • Inseguire il Pick Icon se non ti servono Icon: spesso è skippabile`,
    en: {
      title: "FUT Champions Store FC 26: How It Works & Which Rewards to Pick",
      description: "How the EA FC 26 FUT Champions store works: tokens separate from Rivals, rewards by tier, tradeable or untradeable, and when it's worth hoarding your tokens.",
      excerpt: "FUT Champions store: tokens kept apart from Rivals, rewards by tier (200→1000), tradeable or untradeable, and when hoarding tokens beats spending them.",
      category: "Guide",
      dateLabel: "10 June 2026",
      heroAlt: "EA FC 26 FUT Champions store: tokens and packs on a black and gold background",
      body: `After the "regular" Rivals token store, it's the **FUT Champions store**'s turn. It works much the same way, but there are a couple of things you really need to nail down so you don't waste your tokens, above all the **expiry dates** and the choice between **tradeable and untradeable** cards. Here's how to play it.

## Two Separate Stores: Champions and Rivals

First thing to clear up, because it causes confusion: the Champions store tokens **look identical** to the Rivals ones, but they're **separate**. You've got two distinct shops:

- the **weekly store** (Rivals, Live, Squad Battles, SBCs and so on);
- the **FUT Champions store**, fuelled by the tokens you grind out in Weekend League.

On top of the store, the Weekend League tiered rewards still hand you coins, tokens and, only at **rank 1**, packs as well, plus up to 300,000 coins. The other ranks mainly drop coins and tokens, which you then spend in the store.

## Rewards by Tier: from 200 to 1000 Tokens

Rewards run from **200 all the way to 1000 tokens**. This year EA switched things up: packs have **fewer cards but higher quality**. Translated: less filler, more substance. Here are this week's tiers.

![The token store reward ladder, from the lower tiers up to the top](/img/articles/fut-champions-store-gettoni-fc26-1.jpg)

- **200 tokens** → a 3-player **92+ Path to Glory** pack (untradeable, max 2 per week). Alternatively, 4 **tradeable Path to Glory Squad 1** player items with no rating cap: these you can flip on the market.
- **300 tokens** → a 5-player **93+ Path to Glory** player pick (up to 5 claimable, i.e. 1500 tokens on the table).
- **400 tokens** → chunkier packs, around 50 cards, with a pick and guaranteed **85+/86+ fodder**. There are tradeable and untradeable versions, plus a tasty option: a tradeable **2-of-8 93+ Path to Glory** pick.
- **600 tokens** (≈ 10 wins) → **National Pride** cards (think Dani Olmo) that you can **build by choosing your own PlayStyles**, 3 gold PS and 8 base PS to customise.

> 💡 **Wins → tokens reference:** roughly speaking 8 wins are worth ~400 tokens, 10 wins ~600, 13 wins ~1100. To reach the 1000-token rewards you need 15-win form: if you're not getting there, focus on the 200–400 tiers, which are still excellent.

In the higher tiers (**650+**) you'll find the best packs: the juiciest is a **14x Path to Glory 91+ with 4 guaranteed 93+**. There's also a **93+ Icon Pick**, but that's more down to taste, if you're not big on Icons, it's skippable.

## Tradeable or Untradeable?

This is the real decision in the store, even more than which tier to pick.

![The choice between tradeable and untradeable cards in the token store](/img/articles/fut-champions-store-gettoni-fc26-2.jpg)

- **Tradeable:** you can sell whatever you pack on the market. Great if you're after coins or want to cash in on a lucky pull.
- **Untradeable:** can't be sold on, but these packs often **give more** for the same token cost.

There's no universally right call: it depends on what you need. If you want to build coins, go tradeable. If you're chasing a big hit to keep in your squad, untradeable usually **pulls** better. Personally, when I want to roll the dice I prefer **untradeable**.

## What Expires and What Doesn't

This is the biggest difference from the Rivals store, and it's easy to get caught out:

> ⚠️ **Tokens DON'T expire, the rewards do.** You can hold tokens and spend them in later weeks. But a lot of **store packs expire** and get swapped out the following week. And the Champions store is more **dynamic** than the Rivals one: it changes faster. Always check the expiry dates before putting off a purchase.

Some rewards (especially cosmetic items and the smaller 25–50 token packs) are negligible: only useful for burning off leftover tokens after a combo, but nothing to lose sleep over.

## Spend or Hoard: the Strategy

Since tokens don't expire, you've got two routes:

1. **Spend now** if this week's rewards convince you.
2. **Hoard** to start next week with a stockpile, if there's nothing this week that excites you.

The smart move is not to blow them all just for the sake of it. If you've got, say, 1100 tokens, you can grab a 1000 one and **set the rest aside** instead of forcing a second mediocre purchase. Or go all in on a single top untradeable pack and pray for the hit. Weigh it up based on how lucky you feel and what you actually need: coins or cards for the squad.

## Summary

> **✓ DO**
> • Remember the Champions and Rivals stores have separate tokens
> • Decide the most important thing first: tradeable (coins) or untradeable (more value)
> • Check the expiry dates: the Champions store changes fast
> • Hoard your tokens if the week's rewards don't convince you
> • In the lower tiers (200–400) there's great value even without hitting 15 wins
>
> **✕ DON'T**
> • Spend every token just because: a stockpile beats a mediocre purchase
> • Put off a pack that's about to expire thinking "it'll stay there anyway"
> • Chase the Icon Pick if you don't need Icons: it's often skippable`,
    },
  },
  {
    slug: "path-to-glory-team-2-fc26",
    title: "Path to Glory Team 2 FC 26: i giocatori leakati e quando esce",
    description:
      "FUT Sheriff ha svelato i nomi del Path to Glory Team 2 di EA FC 26: da Marquinhos a Laporte. Quando esce, come funzionano gli upgrade e se vale i pacchetti.",
    category: "News",
    date: "2026-06-09",
    dateLabel: "9 Giugno 2026",
    readingTime: "6 min",
    badge: "LEAK",
    heroImage: "/img/articles/path-to-glory-team-2-fc26-hero.jpg",
    heroAlt:
      "Path to Glory Team 2 su EA FC 26: reveal di un giocatore in stile World Cup su sfondo verde e oro",
    excerpt:
      "FUT Sheriff svela il Path to Glory Team 2: da Marquinhos a Laporte. Quando esce, come funzionano gli upgrade World Cup e se vale aprire pacchetti.",
    body: `Il **Path to Glory Team 2** è alle porte e i primi nomi sono già in giro grazie ai leak di **FUT Sheriff**. È la seconda ondata della promo che apre il Festival of Football: carte legate al Mondiale che si potenziano da sole man mano che le nazionali avanzano. Marquinhos in copertina, ma la vera domanda è un'altra, **vale la pena risparmiare pacchetti per questo team?** Ti dico cosa sappiamo e come muoverti.

> ⚠️ **Attenzione:** nomi e statistiche qui sotto sono **leak e predizioni** (fonte FUT Sheriff), non ufficiali EA. Possono cambiare fino al rilascio. Niente è confermato finché non esce in gioco.

## I Giocatori Leakati del Team 2

Questi sono i nomi trapelati finora per il PTG Team 2:

![Schieramento di carte Path to Glory Team 2 in stile Ultimate Team](/img/articles/path-to-glory-team-2-fc26-1.jpg)

> ✔ **Difesa:** Marquinhos (Brasile), Laporte (Spagna), Martínez (Argentina), Antonee Robinson (Inghilterra)
> ✔ **Centrocampo:** Çalhanoğlu (Turchia), Xhaka (Svizzera), Kessié (Costa d'Avorio)
> ✔ **Attacco:** Isak (Svezia), Iñaki Williams (Spagna), Džeko (Bosnia), Aktürkoğlu (Turchia), Jordan Ayew (Ghana)

Il volto del team è **Marquinhos**, dato in copertina come **95 DC**: stat predette di 94 passo, **96 di difesa**, 91 di fisico, 88 dribbling e 87 passaggio. Un profilo da difensore centrale tutto solidità, perfetto per chi cerca un muro dietro, ma ricorda, sono numeri predetti.

Rispetto al Team 1, quello dei pezzi grossi tipo Vini Jr., De Bruyne e Saka, qui i nomi pesano oggettivamente meno. Ci sono giocatori validi, ma il livello hype non è lo stesso.

## Come Funzionano gli Upgrade World Cup

Questa è la parte che devi capire bene, perché cambia tutto il ragionamento sul valore delle carte.

![Carta Path to Glory che sale di rating con gli upgrade del Mondiale](/img/articles/path-to-glory-team-2-fc26-2.jpg)

Le carte Path to Glory sono **dinamiche**: escono con un boost base, poi **si potenziano automaticamente ogni volta che la nazionale del giocatore avanza** nel Mondiale. Più la squadra va avanti, più la carta cresce, overall, PlayStyle+, fino a versioni che possono toccare il **99** e arrivare a 5 stelle skill / 5 stelle piede debole se la nazionale vince tutto.

> 💡 **Il concetto chiave:** non stai comprando solo la carta di oggi, stai scommettendo su quanto andrà lontano la sua nazionale. Un giocatore di una nazionale favorita ha un potenziale di crescita enorme; uno di una nazionale che esce ai gironi resta com'è.

Tieni anche presente una regola della promo: **le carte del Team 1 non si trasferiscono nel Team 2.** Sono due ondate separate, ognuna disponibile nella propria settimana.

## Quando Esce il Team 2

Il **Path to Glory Team 2 esce venerdì 12 giugno 2026**, intorno alle **18:00 ora UK (le 19:00 italiane)**. La promo complessiva va dal **5 al 19 giugno**, quindi questo è il secondo e ultimo team del Path to Glory prima che il Festival of Football vada avanti con altri contenuti.

## Vale la Pena Risparmiare Pacchetti?

Qui sono diretto: **per come si presenta sulla carta, il Team 1 era più forte.** Se stavi tenendo da parte pacchetti sperando in nomi clamorosi nel Team 2, dai leak attuali non sembra il momento di puntarci tutto. Salvo sorprese dai prossimi leak, **non stravolgerei la mia strategia** per questo team.

Detto questo, un paio di carte meritano attenzione vera, e il motivo è proprio il meccanismo degli upgrade:

> 💡 **Su chi terrei gli occhi:**
> • **Marquinhos e Laporte** → difensori già solidi, con nazionali (Brasile e Spagna) tra le favorite: tanto margine di upgrade.
> • **Iñaki Williams e Isak** → attaccanti rapidi, profili che in questo meta funzionano sempre.
> • **Çalhanoğlu** → qualità nei piedi (passaggio e tiro) per chi costruisce a centrocampo.

Il filo conduttore è uno solo: **scegli le carte in base alla nazionale.** Brasile, Spagna, Inghilterra, Argentina hanno il potenziale per arrivare in fondo e far esplodere la carta. Su nazionali meno quotate stai comprando un bel design e poco upside, il rischio che la carta resti ferma è alto.

## Riepilogo

> **✓ DA FARE**
> • Segnare la data: Team 2 venerdì 12 giugno, ore 19:00 italiane
> • Puntare su carte di nazionali favorite (Brasile, Spagna, Inghilterra) per gli upgrade
> • Valutare Marquinhos o Laporte se ti serve un difensore con margine di crescita
> • Trattare nomi e stat come leak finché EA non li ufficializza
>
> **✕ DA EVITARE**
> • Risparmiare pacchetti a tutti i costi: dai leak il Team 1 era più forte
> • Investire su carte di nazionali a rischio eliminazione ai gironi
> • Dare per certe le statistiche predette: possono cambiare al rilascio`,
    en: {
      title: "Path to Glory Team 2 FC 26: Leaked Players and Release Date",
      description: "FUT Sheriff leaked the EA FC 26 Path to Glory Team 2 names: from Marquinhos to Laporte. Release date, how the World Cup upgrades work, and if it's pack-worthy.",
      excerpt: "FUT Sheriff leaks Path to Glory Team 2: from Marquinhos to Laporte. Release date, how the World Cup upgrades work, and whether it's worth ripping packs.",
      category: "News",
      dateLabel: "9 June 2026",
      heroAlt: "Path to Glory Team 2 on EA FC 26: a World Cup-style player reveal on a green and gold background",
      body: `The **Path to Glory Team 2** is right around the corner and the first names are already floating around thanks to **FUT Sheriff** leaks. It's the second drop of the promo that kicks off the Festival of Football: World Cup-themed cards that upgrade themselves as nations advance. Marquinhos on the cover, but the real question is something else, **is it worth saving packs for this team?** Here's what we know and how to play it.

> ⚠️ **Heads up:** the names and stats below are **leaks and predictions** (source: FUT Sheriff), not official EA info. They can change before release. Nothing is confirmed until it drops in-game.

## The Leaked Players of Team 2

These are the names that have leaked so far for PTG Team 2:

![Path to Glory Team 2 card lineup in Ultimate Team style](/img/articles/path-to-glory-team-2-fc26-1.jpg)

> ✔ **Defense:** Marquinhos (Brazil), Laporte (Spain), Martínez (Argentina), Antonee Robinson (England)
> ✔ **Midfield:** Çalhanoğlu (Turkey), Xhaka (Switzerland), Kessié (Ivory Coast)
> ✔ **Attack:** Isak (Sweden), Iñaki Williams (Spain), Džeko (Bosnia), Aktürkoğlu (Turkey), Jordan Ayew (Ghana)

The face of the team is **Marquinhos**, listed on the cover as a **95 CB**: predicted stats of 94 pace, **96 defending**, 91 physical, 88 dribbling and 87 passing. A rock-solid center-back profile, perfect for anyone after a wall at the back, but remember, these are predicted numbers.

Compared to Team 1, the one with the big hitters like Vini Jr., De Bruyne and Saka, the names here carry objectively less weight. There are solid players, but the hype level isn't the same.

## How the World Cup Upgrades Work

This is the part you really need to understand, because it changes the whole conversation around the cards' value.

![Path to Glory card climbing in rating with World Cup upgrades](/img/articles/path-to-glory-team-2-fc26-2.jpg)

Path to Glory cards are **dynamic**: they launch with a base boost, then **upgrade automatically every time the player's nation advances** in the World Cup. The further the team goes, the more the card grows, overall, PlayStyle+, all the way up to versions that can hit **99** and reach 5-star skills / 5-star weak foot if the nation wins it all.

> 💡 **The key concept:** you're not just buying today's card, you're betting on how far the nation will go. A player from a favored nation has massive upgrade potential; one from a nation that crashes out in the group stage stays exactly as is.

Also keep one promo rule in mind: **Team 1 cards do not carry over into Team 2.** They're two separate drops, each available in its own week.

## When Team 2 Drops

The **Path to Glory Team 2 drops on Friday, 12 June 2026**, around **6 PM UK time (7 PM CET)**. The overall promo runs from **5 to 19 June**, so this is the second and final Path to Glory team before the Festival of Football moves on to other content.

## Is It Worth Saving Packs?

I'll be straight with you: **on paper, Team 1 was stronger.** If you've been hoarding packs hoping for blockbuster names in Team 2, the current leaks don't make this look like the moment to go all in. Barring surprises from the next leaks, **I wouldn't blow up my strategy** for this team.

That said, a couple of cards deserve genuine attention, and the reason is exactly the upgrade mechanic:

> 💡 **Who I'd keep an eye on:**
> • **Marquinhos and Laporte** → already solid defenders, with nations (Brazil and Spain) among the favorites: tons of upgrade headroom.
> • **Iñaki Williams and Isak** → quick strikers, profiles that always work in this meta.
> • **Çalhanoğlu** → quality on the ball (passing and shooting) for anyone building through midfield.

There's one common thread: **pick your cards based on the nation.** Brazil, Spain, England, Argentina have the potential to go deep and make the card pop off. On lower-rated nations you're buying a nice design and little upside, the risk the card stays frozen is high.

## Summary

> **✓ DO**
> • Mark the date: Team 2 Friday 12 June, 7 PM CET
> • Target cards from favored nations (Brazil, Spain, England) for the upgrades
> • Consider Marquinhos or Laporte if you need a defender with room to grow
> • Treat names and stats as leaks until EA makes them official
>
> **✕ DON'T**
> • Save packs at all costs: from the leaks, Team 1 was stronger
> • Invest in cards from nations at risk of going out in the group stage
> • Take the predicted stats as gospel: they can change at release`,
    },
  },
  {
    slug: "neymar-ritorno-fc26",
    title: "Neymar torna su FC 26: l'oro 83 da 200K che tutti vogliono evolvere",
    description:
      "Neymar è tornato su EA FC 26 come oro 83 ed è estinto a 200K perché tutti lo vogliono evolvere. Come packarlo, l'EVO da 2000 token e le mosse sul mercato.",
    category: "News",
    date: "2026-06-09",
    dateLabel: "9 Giugno 2026",
    readingTime: "7 min",
    badge: "NUOVO",
    heroImage: "/img/articles/neymar-ritorno-fc26-hero.jpg",
    heroAlt:
      "Neymar torna in EA FC 26: carta in stile Ultimate Team su sfondo nero e oro",
    excerpt:
      "Neymar è tornato su FC 26 come oro 83 ed è estinto a 200K: tutti lo vogliono per l'EVO. Come packarlo gratis e le mosse sul mercato del weekend.",
    body: `C'è un solo giocatore che questa settimana sta muovendo l'intero mercato di EA FC 26, e non è un TOTS né una carta speciale: è un comune **oro 83**, estinto a **200.000 coins**. Il motivo? **Neymar è finalmente tornato nel gioco**, e tutta la community lo vuole per una cosa sola: evolverlo. Ti spiego cosa sta succedendo davvero e come muoverti senza buttare coins.

## Neymar è tornato: perché un oro 83 vale 200K

È la prima carta di Neymar dell'anno su FC 26. Rating e statistiche le conoscevamo già da settimane, ma una cosa è saperlo, un'altra è vederlo finalmente nel gioco. E il risultato è una follia: un **oro 83 estinto a 200K**, una cifra che normalmente non vedi nemmeno per una carta speciale di metà stagione.

Il meccanismo è tutto psicologico. La supply è bassissima, l'hype è alle stelle, e la gente non lo compra per giocarci da 83, lo compra per **metterlo nelle EVO**. Ho visto giocatori scartare walkout da 89 in un player pick perché nel pick c'era Neymar, e quella era l'unica carta che volevano. Roba mai vista per una carta a rating così basso.

Insieme a lui EA ha rimesso in pacchetto anche l'oro di **Memphis Depay** e **Thiago Silva**. Differenza chiave: i loro prezzi stanno già scendendo. Quello di Neymar reggerà ancora un po' per l'hype, ma non illuderti, resta pur sempre un oro 83.

> ⚠️ **Controlla il club:** sulla web/companion app Neymar potrebbe comparire come *"Samo"*, senza nome né foto. È la stessa identica carta. Magari ce l'hai già e l'hai saltata senza accorgertene.

## Come Packarlo (e Perché Non Devi Comprarlo a 200K)

Questo è il punto che la maggior parte sbaglia: **non comprarlo a 200K**. È un oro 83, non salirà, anzi, man mano che ne escono di più il prezzo crollerà. Il modo giusto è packarlo.

![Apertura pack e player pick a caccia della carta in Ultimate Team](/img/articles/neymar-ritorno-fc26-1.jpg)

I **player pick 82+** e i **player pick 83+ Summer Nations** danno chance reali di tirarlo fuori. Attenzione però alla varianza: c'è chi l'ha packato al quinto pick, e c'è chi, come tanti creator, ne ha aperti più di 50 senza vederlo. È un grind, non una garanzia. Ma è comunque un ottimo posto dove scaricare i tuoi gold rare e gold common, soprattutto adesso che EA non ha ancora rilasciato un crafting upgrade SBC.

> 💡 **Mossa da trader:** se hai pacchetti tradeable in giro (tipo Prime Electrum da SBC vari), aprili ora. Se packi Neymar, lo vendi a ~200K e ci fai profitto netto. Finché l'hype regge, è coins facili.

> ✔ Player pick 82+ e 83+ Summer: chance reali su Neymar
> ✔ Ottimo modo per smaltire gold common/rare in eccesso
> ✔ Packato lo vendi a 200K o lo evolvi, decidi tu

## L'EVO da 2000 Token e le Chain: Cosa Puoi Farne

Qui c'è un equivoco da chiarire. Su Footbin vedi in giro Neymar evoluti a **97 di rating**: per ora **non sono possibili**. La famosa **EVO da 2000 token**, quella che sblocca le versioni più assurde, EA l'ha tolta dal token store e non l'ha ancora rimessa. Quei 97 sono solo simulazioni.

Quello che puoi fare **già adesso** sono le chain di EVO normali e da obiettivo (tipo Street Slick): ti portano Neymar intorno al **92**, che è comunque meglio di quasi qualsiasi carta speciale che EA potrebbe rilasciargli. Apri il **builder di Footbin** e guarda le catene disponibili prima di bruciare le EVO a caso. Ti segnalo anche la nuova **EVO Hawkeye**, uscita ieri, che dà un bel boost a passo/tiro/dribbling più un enorme upgrade fisico (fino a 95) e play style come Quick Step+ e Finesse+.

> 💡 **Trucco token per la prossima settimana:** una volta raggiunti i 1.000 token della week 1, se hai ancora l'obiettivo bonus da completare, **completalo ma NON riscattarlo**. Aspetta dopo i rewards Rivals di giovedì, poi riscatta: quei token slittano nella week 2. In pratica puoi ritrovarti fino a **1.800 token**, oro colato se stai risparmiando per l'EVO da 2000.

Nessuna fretta comunque: durante il Mondiale è quasi certo che arrivi una **carta promo di Neymar** (sperabilmente un SBC, non solo in pacchetto). Tienine conto prima di investire troppo.

## Tuesday Upgrade: Addio 86x2, Arriva l'87x5? (Rumor)

Da mesi siamo bloccati nello stesso ciclo del martedì: l'upgrade pack che alterna **86x2** e **85x3**. Sempre uguale, settimana dopo settimana, fin dal Team of the Year.

La voce che gira ora, lanciata da **FIFA Trading Romania**, è che stia arrivando un **87x5 upgrade**, "prima di quanto pensiate". Sarebbe un cambio enorme: chance molto più alte di packare carte promo e fodder alto da infilare nei player SBC che valgono sempre (Ødegaard, Gakpo e simili).

> ⚠️ **È un rumor, non un leak confermato.** La speranza è che i requisiti restino bassi (gold rare o squadre 82–83), non che ti chiedano 84x10. Prendilo per quello che è finché EA non lo droppa ufficialmente.

## Path to Glory Team 2: i Leak (e Perché Non Risparmiare Pack)

Sono trapelati i primi nomi del **Team 2 di Path to Glory** (senza statistiche ufficiali, solo nomi): tra gli altri **Eze** (probabile elite a 4 play style plus), un secondo **Iñaki Williams**, **Emi Martinez**, **Laporte** e **Kessié** in versione promo, **Antonee Robinson** e altri.

Il verdetto, però, è netto: **il Team 1 è nettamente più forte di quello in arrivo venerdì.** Salvo sorprese dalle prossime fughe di notizie, **non ha senso risparmiare pacchetti** per il Team 2. Semmai, **Laporte** può essere un investimento interessante (spagnolo + margine di upgrade).

> 💡 **Sulle carte PTG:** Team 1 esce dai pacchetti per primo, sono i nomi più hype, e con la Weekend League che finisce la supply tradeable si abbassa. Le carte PTG di valore (come Laporte) hanno spazio per salire, comprare sui cali resta una buona giocata a medio termine.

## Come Fare Coins Questo Weekend

Il mercato è in forma smagliante grazie all'hype Mondiale: tanta gente sta rientrando nel gioco e i prezzi salgono. Tradurre: ci sono soldi da fare.

![Mercato Ultimate Team: coins, prezzi e trading del weekend](/img/articles/neymar-ritorno-fc26-2.jpg)

**I bid restano i re.** Le carte rare di fascia alta ballano ogni giorno: una Bruno Fernandes che tocca 1.2M sul minimo e risale a 1.3M nelle ore di punta è il pane quotidiano. Mettiti sui transfer target, snipa sui bid nei momenti morti, rivendi sui picchi. Le carte Team of the Season da Ultimate TOTS e le Road to the Final da 96 sono perfette per il trading.

**Fodder TOTW e TOTS.** Comprare un TOTW o un TOTS sul mercato non conviene: il **TOTW SBC** costa circa 8K e di 84 ne hai a bizzeffe se grindi i pacchetti. I TOTS invece sono schizzati, il più economico è sui **33K** perché EA non li ha riforniti come previsto. Sta quasi diventando sensato aprire il **pack TOTS Provisions** in store: 75K per tre TOTW, contro gli oltre 95K che spenderesti comprandoli singolarmente.

> ✔ Bid sulle carte rare ad alta liquidità (TOTS, Road to the Final 96)
> ✔ Per gli inform: TOTW SBC a ~8K invece di comprarli
> ✔ TOTS Provisions pack solo se ti serve davvero fodder TOTS

## Riepilogo

> **✓ DA FARE**
> • Packare Neymar coi player pick 82+/83+, non comprarlo a 200K
> • Aprire i pacchetti tradeable ora: packato, lo vendi a 200K con profitto
> • Pianificare le chain di Neymar sul builder di Footbin (target ~92)
> • Sfruttare il trucco token per portarne fino a 1.800 nella week 2
> • Bid sulle carte rare e flip durante l'hype Mondiale
>
> **✕ DA EVITARE**
> • Comprare Neymar a 200K: è un oro 83, il prezzo scenderà
> • Inseguire i Neymar 97 su Footbin: l'EVO da 2000 token non c'è ancora
> • Risparmiare pacchetti per il PTG Team 2: il Team 1 è più forte
> • Comprare TOTW/TOTS sul mercato quando l'SBC costa molto meno`,
    en: {
      title: "Neymar Is Back on FC 26: the 83 Gold at 200K Everyone Wants to Evo",
      description:
        "Neymar is back on EA FC 26 as an 83 gold and he's extinct at 200K because everyone wants to evo him. How to pack him, the 2000-token EVO and the market moves.",
      excerpt:
        "Neymar is back on FC 26 as an 83 gold, extinct at 200K: everyone wants him for the EVO. How to pack him for free and the smart market moves this weekend.",
      category: "News",
      dateLabel: "9 June 2026",
      heroAlt:
        "Neymar returns in EA FC 26: Ultimate Team style card on a black and gold background",
      body: `There's one single player moving the entire EA FC 26 market this week, and it's not a TOTS or a special card: it's a plain **83-rated gold**, extinct at **200,000 coins**. The reason? **Neymar is finally back in the game**, and the whole community wants him for one thing only: to evo him. Here's what's really going on and how to move without wasting coins.

## Neymar Is Back: Why an 83 Gold Is Worth 200K

It's Neymar's first card of the year on FC 26. We'd known the rating and stats for weeks, but knowing it is one thing, actually seeing him in the game is another. And the result is madness: an **83 gold extinct at 200K**, a number you don't normally see even for a mid-season special.

The whole thing is psychological. Supply is rock-bottom, the hype is through the roof, and people aren't buying him to play an 83, they're buying him to **drop him into EVOs**. I've seen players bin an 89 walkout in a player pick because Neymar was in the pick, and he was the only card they wanted. Unheard of for a card at such a low rating.

Alongside him, EA also put the **Memphis Depay** and **Thiago Silva** golds back in packs. Key difference: their prices are already dropping. Neymar's will hold a bit longer on the hype, but don't kid yourself, he's still an 83 gold.

> ⚠️ **Check your club:** on the web/companion app Neymar might show up as *"Samo"*, with no name and no photo. It's the exact same card. You might already have him and skipped him without noticing.

## How to Pack Him (and Why You Shouldn't Buy Him at 200K)

This is where most people get it wrong: **don't buy him at 200K**. He's an 83 gold, he won't go up, in fact, the more that come out, the harder the price crashes. The right way is to pack him.

![Opening packs and player picks hunting the card in Ultimate Team](/img/articles/neymar-ritorno-fc26-1.jpg)

The **82+ player picks** and the **83+ Summer Nations player picks** give you real chances of pulling him. Watch the variance though: some pulled him on their fifth pick, others, like plenty of creators, opened 50+ without seeing him. It's a grind, not a guarantee. But it's still a great place to dump your gold rares and gold commons, especially now that EA hasn't dropped a crafting upgrade SBC yet.

> 💡 **Trader move:** if you've got tradeable packs lying around (like Prime Electrum from various SBCs), open them now. If you pack Neymar, you sell him at ~200K for clean profit. As long as the hype holds, it's easy coins.

> ✔ 82+ and 83+ Summer player picks: real chances at Neymar
> ✔ Great way to clear excess gold commons/rares
> ✔ Once packed, sell him at 200K or evo him, your call

## The 2000-Token EVO and the Chains: What You Can Actually Do

There's a misunderstanding to clear up here. On Footbin you'll see Neymar evos at **97 rating**: right now **they're not possible**. The famous **2000-token EVO**, the one that unlocks the most absurd versions, EA pulled from the token store and hasn't put back. Those 97s are just simulations.

What you **can** do right now are the normal and objective EVO chains (like Street Slick): they take Neymar to around **92**, which is still better than almost any special EA could give him. Open the **Footbin builder** and look at the available chains before burning EVOs at random. Also worth flagging the new **Hawkeye EVO**, out yesterday, which gives a nice pace/shooting/dribbling boost plus a huge physical upgrade (up to 95) and play styles like Quick Step+ and Finesse+.

> 💡 **Token trick for next week:** once you hit week 1's 1,000 tokens, if you still have the bonus objective to complete, **complete it but DON'T claim it**. Wait until after Thursday's Rivals rewards, then claim: those tokens roll into week 2. In practice you can end up with up to **1,800 tokens**, gold dust if you're saving for the 2000 EVO.

No rush either way: during the World Cup it's almost certain a **Neymar promo card** will arrive (hopefully an SBC, not just in packs). Keep that in mind before investing too much.

## Tuesday Upgrade: Goodbye 86x2, Hello 87x5? (Rumor)

For months we've been stuck in the same Tuesday cycle: the upgrade pack alternating **86x2** and **85x3**. Same thing, week after week, ever since Team of the Year.

The word going around now, started by **FIFA Trading Romania**, is that an **87x5 upgrade** is coming, "sooner than you think." That would be a huge change: much higher chances of packing promo cards and high fodder to throw into the player SBCs that always hold value (Ødegaard, Gakpo and the like).

> ⚠️ **It's a rumor, not a confirmed leak.** The hope is the requirements stay low (gold rares or 82–83 squads), not 84x10. Take it for what it is until EA actually drops it.

## Path to Glory Team 2: the Leaks (and Why Not to Save Packs)

The first names of **Path to Glory Team 2** have leaked (no official stats, just names): among others **Eze** (likely an elite with 4 play style plus), a second **Iñaki Williams**, **Emi Martinez**, **Laporte** and **Kessié** in promo versions, **Antonee Robinson** and more.

The verdict, though, is clear: **Team 1 is noticeably stronger than the one coming Friday.** Barring surprises from the next leaks, **there's no point saving packs** for Team 2. If anything, **Laporte** could be an interesting investment (Spanish + upgrade headroom).

> 💡 **On PTG cards:** Team 1 hits packs first, they're the most hyped names, and as the Weekend League ends the tradeable supply drops. Valuable PTG cards (like Laporte) have room to rise, buying the dips is still a solid medium-term play.

## How to Make Coins This Weekend

The market is in great shape thanks to the World Cup hype: lots of people are coming back to the game and prices are climbing. Translation: there's money to be made.

![Ultimate Team market: coins, prices and weekend trading](/img/articles/neymar-ritorno-fc26-2.jpg)

**Bids are still king.** High-end rares swing every day: a Bruno Fernandes touching 1.2M at the floor and bouncing back to 1.3M at peak hours is the daily bread. Sit on the transfer targets, snipe bids in the dead hours, resell on the peaks. Team of the Season cards from Ultimate TOTS and the 96 Road to the Final are perfect for trading.

**TOTW and TOTS fodder.** Buying a TOTW or TOTS on the market isn't worth it: the **TOTW SBC** costs around 8K and you've got 84s everywhere if you grind packs. TOTS, on the other hand, have spiked, the cheapest is around **33K** because EA didn't restock them as expected. It's almost becoming sensible to open the **TOTS Provisions pack** in the store: 75K for three TOTWs, versus the 95K+ you'd spend buying them individually.

> ✔ Bid on high-liquidity rares (TOTS, 96 Road to the Final)
> ✔ For informs: TOTW SBC at ~8K instead of buying them
> ✔ TOTS Provisions pack only if you genuinely need TOTS fodder

## Summary

> **✓ DO**
> • Pack Neymar with the 82+/83+ player picks, don't buy him at 200K
> • Open your tradeable packs now: if packed, sell him at 200K for profit
> • Plan Neymar's chains on the Footbin builder (target ~92)
> • Use the token trick to carry up to 1,800 into week 2
> • Bid on rares and flip during the World Cup hype
>
> **✕ DON'T**
> • Buy Neymar at 200K: he's an 83 gold, the price will drop
> • Chase the 97 Neymars on Footbin: the 2000-token EVO isn't here yet
> • Save packs for PTG Team 2: Team 1 is stronger
> • Buy TOTW/TOTS on the market when the SBC costs far less`,
    },
  },
  {
    slug: "evo-portieri-pack-weight-fc26",
    title: "EVO Portieri Storica, Pack Weight alle Stelle e Mercato del Weekend",
    description:
      "Per la prima volta in FUT i portieri ricevono +25 Reactions. Osimhen Rapid+QuickStep, player pick che danno blues e come muoversi sul mercato.",
    category: "Mercato",
    date: "2026-05-10",
    dateLabel: "10 Maggio 2026",
    readingTime: "6 min",
    badge: "NUOVO",
    excerpt:
      "Per la prima volta in FUT i portieri ricevono +25 Reactions. Osimhen Rapid+QuickStep e come muoversi sul mercato del weekend.",
    body: `Questo weekend di EA FC 26 ha portato due cose che non ti aspettavi: un'EVO portieri che fa storia e un pack weight che non si vedeva da settimane. Ti spiego tutto quello che conta davvero.

## L'EVO Portieri che Cambia la Storia di FUT

Da quando esiste Ultimate Team, e parliamo di anni, i portieri hanno sempre ricevuto boost a ogni statistica tranne una: le **Reactions**. La stat più importante per un portiere in EA FC. Mai aggiornata, mai toccata, nemmeno nelle EVO.

Questa EVO, chiamata Cat-like Reflexes, cambia tutto per la prima volta: **+25 alle Reactions**. Se hai Vicario evolvibile in club, sai già cosa fare, è uno dei portieri più forti del gioco e con questo boost diventa ancora più dominante. Matt Turner, ad esempio, passa da 71 a 93 di Reactions con questa EVO. Numeri che parlano da soli.

> ✔ Prima EVO in assoluto a boostare le Reactions dei portieri
> ✔ +25 Reactions garantite
> ✔ Include boost al piede debole (+1 stella)
> ✔ Gratuita, da completare obbligatoriamente

> ⚠️ **Sul mercato:** I portieri TOTS stanno crollando, Buffon da 690K a 520K, il portiere Bundesliga TOTS da 280K a 230K. Sono investimenti interessanti. Come già successo con le EVO portieri passate, i prezzi rimbalzano sempre quando l'hype iniziale si spegne. I portieri con 3 Play Style Plus rimangono i migliori del gioco, compra nel panico, vendi nella calma.

## Osimhen SBC: Rapid + Quick Step su un Giocatore Lengthy

L'SBC più interessante del momento è **Osimhen**. La combinazione che lo rende unico: Rapid+, Quick Step+ e accelerazione Lengthy. 97 di passo. In sprint su un pallone in profondità sarà devastante, il Rapid+ su un giocatore Lengthy con quella velocità di base è qualcosa che si vede raramente.

Le statistiche completano il quadro: 97 forza, 98 elevazione, 99 precisione di testa, tiro eccellente, First Touch, Pinged Pass, Finesse, Low Driven e Technical. Costa circa 220.000 coins, tre squad tra 87 e 90 rated con qualche TOTW. Non economico, ma giustificato dal profilo della carta.

> 💡 **Perché è speciale:** Rapid+ su Lengthy con 97 passo significa che in fase di sprint su palloni filtranti è praticamente impossibile da raggiungere. Non è una carta per il possesso, è una carta per distruggere le difese in verticale.

## Pack Weight: Sta Succedendo Qualcosa di Diverso

I player pick 82+ stanno dando blues a un ritmo che non si vedeva da settimane. Le red pick del weekend sono state eccezionali. Barcola a 500.000 coins era packabile, poi sceso a 200K ma comunque un pull significativo. Škriniar, Stiller, duplicati utili per l'SBC grind.

Il meccanismo è semplice: **gold commons → crafting upgrade → gold rares → player pick 82+**. Ogni ciclo ti dà chances reali su TOTS. Fintanto che il pack weight rimane così, questa è la priorità assoluta rispetto a tenere coins ferme.

> 💡 **Endrick a 500K minimo:** Il price range è sbagliato, EA lo correggerà verso il basso. Se ce l'hai, listalo a 501K adesso finché il range non viene aggiornato.

## Come Fare Coins Questo Weekend

**85 e 86 rated.** Comprali su bid a 1.7K, listali a 2.500+ al momento del content drop. Il pattern si ripete ogni weekend, non cambia.

**TOTS out-of-packs.** Tah, Ryerson, i Bundesliga e Premier League TOTS che escono dai pack fluttuano in modo prevedibile: salgono la sera, scendono di notte, risalgono durante i rewards. Compra nei cali, vendi nei picchi. Margini di 30-50K per carta, senza rischio.

**TOTS League One in calo.** Nuno Mendes da 1.2M a 830K, Pacho a 1.1M, Sangaré giù, Asensio da oltre 1M a 669K, Leroy Sané a 375K. I prezzi si stanno normalizzando dopo il lancio, se vuoi una di queste carte per la squadra, il momento per comprarle è adesso, non venerdì scorso.

## Riepilogo

> **✓ DA FARE**
> • EVO Cat-like Reflexes: completala, è gratuita e fa storia
> • Player pick 82+: continua il grind finché il pack weight regge
> • Comprare portieri TOTS in calo come investimento a medio termine
> • 85-86 rated su bid a 1.7K, lista al content drop
> • Osimhen SBC se vuoi un attaccante fisico e veloce diverso dal solito
>
> **✕ DA EVITARE**
> • Tenere Endrick sopra i 500K senza listarlo, il price range calerà
> • Comprare TOTS League One ai prezzi di venerdì, ora sono molto più bassi
> • Ignorare il pack weight attuale: è uno dei migliori momenti dell'anno`,
    en: {
      title: "Historic GK EVO, Pack Weight Spikes and the Weekend Market",
      description: "For the first time in FUT, keepers get +25 Reactions. Osimhen Rapid+Quick Step, player picks dropping blues and how to work the weekend market.",
      excerpt: "For the first time in FUT, keepers get +25 Reactions. Osimhen Rapid+Quick Step and how to work the weekend market.",
      category: "Market",
      dateLabel: "10 May 2026",
      body: `This EA FC 26 weekend dropped two things you didn't see coming: a GK EVO for the history books and pack weight we haven't seen in weeks. Here's everything that actually matters.

## The Keeper EVO That Changes FUT History

For as long as Ultimate Team has existed, and we're talking years, goalkeepers have always gotten boosts to every stat except one: **Reactions**. The single most important stat for a keeper in EA FC. Never touched, never upgraded, not even in EVOs.

This EVO, called Cat-like Reflexes, changes everything for the first time: **+25 Reactions**. If you've got an evolvable Vicario in your club, you already know what to do, he's one of the best keepers in the game and this boost makes him even more dominant. Matt Turner, for example, jumps from 71 to 93 Reactions with this EVO. The numbers speak for themselves.

> ✔ First EVO ever to boost keeper Reactions
> ✔ Guaranteed +25 Reactions
> ✔ Includes a weak foot boost (+1 star)
> ✔ Free, an absolute must-complete

> ⚠️ **On the market:** TOTS keepers are tanking, Buffon from 690K to 520K, the Bundesliga TOTS keeper from 280K to 230K. These are interesting buys. Just like with past keeper EVOs, prices always bounce back once the initial hype dies down. Keepers with 3 PlayStyle+ stay the best in the game, buy the panic, sell the calm.

## Osimhen SBC: Rapid + Quick Step on a Lengthy Player

The most interesting SBC right now is **Osimhen**. The combo that makes him unique: Rapid+, Quick Step+ and Lengthy AcceleRATE. 97 Pace. Sprinting onto a through ball he'll be devastating, Rapid+ on a Lengthy player with that base pace is something you rarely see.

The rest of the card fills out the picture: 97 Strength, 98 Jumping, 99 Heading Accuracy, elite shooting, First Touch, Pinged Pass, Finesse, Low Driven and Technical. Costs around 220,000 coins, three squads between 87 and 90 rated with some TOTW. Not cheap, but justified by the card's profile.

> 💡 **Why he's special:** Rapid+ on Lengthy with 97 Pace means that when he sprints onto a through ball he's basically impossible to catch. This isn't a possession card, it's a card built to rip defenses apart in behind.

## Pack Weight: Something Different Is Going On

The 82+ player picks are dropping blues at a rate we haven't seen in weeks. The weekend's red picks have been exceptional. Barcola at 500,000 coins was packable, then he dropped to 200K but still a serious pull. Škriniar, Stiller, useful dupes for the SBC grind.

The mechanic is simple: **gold commons → crafting upgrades → gold rares → 82+ player picks**. Every cycle gives you real TOTS chances. As long as the pack weight stays like this, this is the top priority over sitting on coins.

> 💡 **Endrick at 500K minimum:** The price range is wrong, EA will correct it downward. If you've got him, list him at 501K right now before the range gets updated.

## How to Make Coins This Weekend

**85 and 86 rated.** Bid on them at 1.7K, list at 2,500+ when the content drops. The pattern repeats every weekend, it doesn't change.

**Out-of-packs TOTS.** Tah, Ryerson, the Bundesliga and Premier League TOTS coming out of packs move predictably: up in the evening, down overnight, back up during rewards. Buy the dips, sell the spikes. 30-50K margins per card, risk-free.

**League One TOTS sliding.** Nuno Mendes from 1.2M to 830K, Pacho at 1.1M, Sangaré down, Asensio from over 1M to 669K, Leroy Sané at 375K. Prices are normalizing after launch, if you want one of these for your squad, now is the time to buy, not last Friday.

## Summary

> **✓ DO**
> • Cat-like Reflexes EVO: complete it, it's free and it's historic
> • 82+ player picks: keep grinding while the pack weight holds
> • Buy sliding TOTS keepers as a medium-term investment
> • 85-86 rated bids at 1.7K, list at the content drop
> • Osimhen SBC if you want a quick, physical striker that's different from the usual
>
> **✕ DON'T**
> • Hold Endrick above 500K without listing him, the price range will drop
> • Buy League One TOTS at Friday's prices, they're much lower now
> • Sleep on the current pack weight: it's one of the best windows of the year`,
    },
  },
  {
    slug: "league-one-tots-kvaraskhelia-sbc-fc26",
    title: "League One TOTS: Kvaraskhelia vale la pena? SBC, Mercato e Coins coi Rewards",
    description:
      "Il grande SBC della settimana è Kvaraskhelia. Le carte in packs hanno statistiche interessanti, ma EA sta perdendo un'occasione. Intanto il mercato si muove coi rewards.",
    category: "TOTS",
    date: "2026-05-07",
    dateLabel: "7 Maggio 2026",
    readingTime: "6 min",
    excerpt:
      "Il grande SBC della settimana è Kvaraskhelia. Statistiche interessanti, ma EA perde un'occasione. E il mercato si muove coi rewards.",
    body: `Settimana di League One TOTS, non la più esaltante dell'anno, ma ci sono cose concrete da analizzare: il grande SBC di venerdì, qualche carta interessante in packs e il modo più semplice per fare coins coi rewards di oggi.

## Kvaraskhelia: il Grande SBC della Settimana

L'SBC di punta questa settimana è **Kvaraskhelia**. Le statistiche ufficiali: 94 passo, 94 dribbling, 92 tiro, 91 passaggio, Rapid, Finesse e Game Changer. Cinque stelle skill, cinque stelle piede debole, sempre.

La carta è buona. Non ho dubbi su quello. Ma guardando dove siamo nella TOTS, dopo settimane di SBC simili come Di Maria, Marco Reus, Hundman Sun, non mi esalta quanto dovrebbe. Le statistiche non saltano fuori dal monitor in modo unico. È una carta forte, ma non diversa da quello che abbiamo già visto.

> 💡 **Il punto sul prezzo:** Kvaraskhelia in versione normale vale circa 900K sul mercato. Se EA la rende accessibile, come ha fatto con Leonard Carl a ~400K, vale assolutamente la pena completarla. Se costa quanto la versione tradeable, ci penso due volte.

## Le Carte in Packs: Dove Sta il Valore Vero

Questa settimana ci sono **tre carte da 97 rating con 4 Play Style Plus** in packs contemporaneamente, una cosa mai vista prima in una singola settimana TOTS. Chawinga NWSL, Chawinga D1 Arkema e Vitinha PSG. Le statistiche di alcune carte del team sono oggettivamente forti.

**Dembélé Super League** merita un discorso a parte. Con Quick Step, Finesse e Technical a 95 rated, c'è chi sostiene sia paragonabile alla sua carta Team of the Year da 97. Stesso passo e tiro, un punto in più nel dribbling, tre in più nel fisico. La differenza è il rating complessivo, ma in campo la distanza potrebbe essere minima. Se la packi, non buttarla via.

> ⚠️ **Il problema degli SBC secondari:** Osimhen e Yilmaz arrivano come SBC Super League con statistiche deludenti per questa fase della TOTS, 89 tiro e 88 passaggio su Yilmaz, 89 dribbling su Osimhen. Carte con nomi interessanti ma numeri che non danno un motivo concreto per usarle. EA ha il potenziale per fare SBC creativi e non lo sfrutta.

## UCL: PSG in Finale, Cosa Fare con Musiala

Il PSG ha eliminato il Bayern (1-1, passano agli aggregati) e vola in finale UCL. **Dembélé e Barcola** riceveranno +1 overall e un terzo Play Style Plus, le loro carte salgono.

**Musiala** è crollato da 1,5 milioni a circa 500K dopo l'eliminazione. Prende comunque +1 overall per il pareggio nel secondo tempo supplementare. A 500K è una delle carte più forti del gioco a quel prezzo, chi la compra oggi per usarla in squadra fa un affare. Chi la compra per rivenderla deve capire fino a dove scende prima di entrare.

> 💡 **Strategia UCL finale:** Le carte live come Hincapié, Dembélé e Vicky Lopez (attualmente esaurita a 420K) rimarranno gonfiate fino alla finale UCL. La logica è sempre la stessa, vendi durante la partita o appena prima, non dopo l'upgrade.

## Come Fare Coins Oggi coi Rewards Division Rivals

Il giorno dei rewards è uno dei momenti più prevedibili e sfruttabili del mercato. Ecco cosa funziona concretamente:

**85 e 86 rated.** Nei giorni di rewards scendono fino a 1.200–1.500 coins su bid. La sera, quando esce il contenuto, risalgono a 2.000–2.800, in alcuni casi 3.000. Compra in mattinata, lista nel tardo pomeriggio.

**89 rated.** Con il Player Pick 91+ TOTS che si refresha oggi (struttura 86+87+87), la domanda di fodder 89 sale. Se li trovi sotto i 5.000–6.000 coins su bid, sono interessanti.

**Carte TOTS delle settimane precedenti.** Premier League, Serie A, con la coin injection dei rewards la gente compra. Le carte che erano ferme si muovono. Studia i grafici delle ultime due settimane nei giovedì di rewards: il pattern si ripete.

## Riepilogo

> **✓ DA FARE**
> • Comprare 85–86 rated su bid stamattina, listare stasera
> • Completare il Player Pick 91+ TOTS con il fodder del club
> • Monitorare Musiala: se scende sotto 450K, è un affare per l'uso
> • Valutare Kvaraskhelia solo se il costo SBC è accessibile
>
> **✕ DA EVITARE**
> • Completare SBC Osimhen/Yilmaz: statistiche non giustificano il costo
> • Tenere carte live UCL dopo la finale senza pianificare l'uscita`,
    en: {
      title: "League One TOTS: Is Kvaratskhelia Worth It? SBC, Market & Coins",
      description: "This week's big SBC is Kvaratskhelia. The packable cards have interesting stats, but EA is missing a trick. Meanwhile, the market moves on rewards day.",
      excerpt: "This week's big SBC is Kvaratskhelia. Interesting stats, but EA misses a trick. And the market's moving on rewards day.",
      category: "TOTS",
      dateLabel: "7 May 2026",
      body: `League One TOTS week, not the most exciting promo of the year, but there's real stuff to break down: Friday's big SBC, a few interesting cards in packs, and the easiest way to make coins off today's rewards.

## Kvaratskhelia: This Week's Big SBC

The headline SBC this week is **Kvaratskhelia**. The official stats: 94 pace, 94 dribbling, 92 shooting, 91 passing, Rapid, Finesse and Game Changer. Five-star skills, five-star weak foot, as always.

The card is good. No doubt about that. But looking at where we are in TOTS, after weeks of similar SBCs like Di Maria, Marco Reus, Hundman Sun, it doesn't hype me the way it should. The stats don't jump off the screen in any unique way. It's a strong card, but it's nothing different from what we've already seen.

> 💡 **The price angle:** Kvaratskhelia's tradeable version sits at around 900K on the market. If EA makes it accessible, like they did with Leonard Carl at ~400K, it's absolutely worth completing. If it costs as much as the tradeable version, I'm thinking twice.

## The Cards in Packs: Where the Real Value Is

This week there are **three 97-rated cards with 4 PlayStyle+ each** in packs at the same time, something we've never seen in a single TOTS week before. Chawinga NWSL, Chawinga D1 Arkema and Vitinha PSG. The stats on some of the squad's cards are objectively strong.

**Dembélé Super League** deserves its own mention. With Quick Step, Finesse and Technical at 95 rated, some argue it's comparable to his 97-rated Team of the Year card. Same pace and shooting, one point more in dribbling, three more in physical. The difference is the overall rating, but on the pitch the gap could be minimal. If you pack it, don't quick-sell it.

> ⚠️ **The problem with the secondary SBCs:** Osimhen and Yilmaz drop as Super League SBCs with underwhelming stats for this stage of TOTS, 89 shooting and 88 passing on Yilmaz, 89 dribbling on Osimhen. Cards with interesting names but numbers that give you no real reason to run them. EA has the potential to make creative SBCs and just isn't using it.

## UCL: PSG Into the Final, What to Do With Musiala

PSG knocked out Bayern (1-1, through on aggregate) and are off to the UCL final. **Dembélé and Barcola** will get +1 overall and a third PlayStyle+, their cards go up.

**Musiala** has crashed from 1.5 million to around 500K after the elimination. He still picks up +1 overall for the equaliser in the second half of extra time. At 500K he's one of the strongest cards in the game at that price, anyone buying him today to use in their squad is getting a steal. Anyone buying to flip needs to work out how far he drops before jumping in.

> 💡 **UCL final strategy:** Live cards like Hincapié, Dembélé and Vicky Lopez (currently extinct at 420K) will stay inflated until the UCL final. The logic is always the same, sell during the match or just before, not after the upgrade.

## How to Make Coins Today With Division Rivals Rewards

Rewards day is one of the most predictable and exploitable moments on the market. Here's what actually works:

**85 and 86 rated.** On rewards days they drop as low as 1,200–1,500 coins on bids. In the evening, when the content drops, they climb back to 2,000–2,800, in some cases 3,000. Buy in the morning, list in the late afternoon.

**89 rated.** With the 91+ TOTS Player Pick refreshing today (86+87+87 structure), demand for 89 fodder goes up. If you can snipe them under 5,000–6,000 coins on bids, they're worth it.

**TOTS cards from previous weeks.** Premier League, Serie A, with the coin injection from rewards, people buy. Cards that were sitting still start moving. Study the graphs from the last two rewards Thursdays: the pattern repeats.

## Summary

> **✓ DO**
> • Bid on 85–86 rated this morning, list tonight
> • Complete the 91+ TOTS Player Pick with club fodder
> • Watch Musiala: if he drops under 450K, he's a steal to use
> • Only consider Kvaratskhelia if the SBC cost is accessible
>
> **✕ DON'T**
> • Complete the Osimhen/Yilmaz SBCs: the stats don't justify the cost
> • Hold UCL live cards past the final without planning your exit`,
    },
  },
  {
    slug: "tots-evo-difensori-centrali-fc26",
    title: "EA FC 26 TOTS: La Mega EVO Difensori, Come Fare Coins e Tutta la Meta",
    description:
      "La mega EVO max 90 per i difensori centrali arriva venerdì. Come muoversi sul mercato, come fare coins con i 93 TOTS e cosa aspettarsi dalla League One.",
    category: "TOTS",
    date: "2026-05-06",
    dateLabel: "6 Maggio 2026",
    readingTime: "8 min",
    excerpt:
      "La mega EVO max 90 per i difensori centrali arriva venerdì. Mercato, coins con i 93 TOTS e cosa aspettarsi dalla League One.",
    body: `Siamo nel pieno della TOTS e questa settimana ha più roba da gestire del solito: una **EVO importante in arrivo venerdì**, aggiornamenti UCL che muovono il mercato e qualche opportunità concreta per fare coins senza rischiare. Ti dico quello che conta davvero.

## EVO Difensori Centrali Max 90: Requisiti e Cosa Aspettarsi

Venerdì arriva la prima EVO dell'anno dedicata ai difensori centrali con questi requisiti:

> ✔ **Posizione:** Difensore Centrale · **Overall massimo:** 90
> ✔ **Play Style Plus massimi:** 2 · **Play Style base minimi:** 10
> **Risultato atteso: 3 Play Style Plus + boost statistiche**

È la prima EVO max 90 per i DC a dare 3 PS+, e i requisiti sono abbastanza aperti da includere anche carte con posizioni aggiuntive come CDM o terzino. Carte come **Micky van de Ven** (già 94 passo) o **Patrick Vieira Winter Wild Card** rientrano perfettamente. I PS+ probabili: **Intercept+, Bruiser, Quick Step**. Se confermato Intercept+, Hincapié, già a prezzo massimo, diventa uno dei migliori DC del gioco.

> ⚠️ **Sul mercato:** Vendi i DC tradeable di valore **prima di venerdì**, Tah, Jacob Ramon TOTS, Bremer TOTS. Quando questa EVO uscirà, chi ha carte evolvibili in club smette di comprare quelle sul mercato. I prezzi scendono. Di converso, i DC 88–90 overall con ≤ 2 PS+ stanno già salendo per speculazione, se ne hai, tienili.

## Come Fare Coins Questa Settimana

**Carte 93 TOTS su bid.** In questo momento si trovano a 20.000 coins su bid. Nelle ore di punta salgono a 23–24K, e senza i rewards Weekend League la supply è più bassa del solito. La logica è semplice: compra a 20K, lista a 25K, esci pulito.

**Fodder 85–86 rated.** Sono risaliti sopra i 2.000 coins e nei giorni di rewards Division Rivals toccano picchi di 2.200–2.300. Lista oggi, non domani, dopo i rewards la supply si allarga e i prezzi calano.

**Player Pick 91+ TOTS ogni due giorni.** Costa ~99.000 coins sul cartellino, ma costruendolo con il fodder del club (86x2 + 83x14) il costo reale si abbassa molto. Le probabilità non sono garantite, ma è comunque il miglior utilizzo possibile per il fodder in eccesso rispetto a tenerlo fermo nel club.

> 💡 **Principio base:** Il fodder che non usi è coins bloccati. Fallo girare, SBC, player pick, non importa. Un 84 rated fermo nel club vale zero.

## UCL: Arsenal in Finale, Cosa Cambia sul Mercato

Arsenal ha eliminato l'Atletico Madrid (2-1 aggregato) e conquista la finale UCL. Conseguenza diretta: le carte live Arsenal, **Hincapié e Eze**, riceveranno presto +1 overall e un terzo Play Style Plus. I prezzi delle carte Arsenal sono già saliti in attesa dell'upgrade. Le carte Atletico (Sorloth, Molina) sono crollate immediatamente dopo l'eliminazione.

> ⚠️ **PSG-Bayern stasera:** Dembélé vale 4,2M, Musiala 1,4M. Chi perde vede la carta dimezzarsi in poche ore. Se hai una di queste in squadra e non sei sicuro di tenerla, vendi prima del fischio d'inizio.

## TOTS League One: Le Carte da Tenere d'Occhio

Non è la settimana più hype della TOTS, ma ci sono carte con statistiche già confermate che meritano attenzione. Le più forti: **Vitinha** (98 dribbling, 4 PS+), **Sangaré** (96 dribbling e passo, Intercept+), **Nuno Mendes** (Intercept+, Bruiser, Rapid), **Aubameyang** (Quick, Rapid, sarà uno dei più veloci del gioco). Tieni d'occhio eventuali SBC di giocatori non inclusi nel team base: Hakimi, Dway e Jon Neves sono i nomi più attesi.

## Riepilogo

> **✓ DA FARE**
> • Vendere DC tradeable di valore prima di venerdì
> • Comprare 93 TOTS su bid a ~20K, uscire a 25K
> • Listare i 85–86 rated oggi, prima dei rewards
> • Tenere in club i DC 88–90 con ≤ 2 PS+ per l'EVO
>
> **✕ DA EVITARE**
> • Comprare DC top sul mercato ora, scenderanno venerdì
> • Tenere Dembélé o Musiala live se non ne sei convinto
> • Lasciare il fodder fermo nel club senza usarlo`,
    en: {
      title: "EA FC 26 TOTS: The Mega CB EVO, How to Make Coins & the Full Meta",
      description: "The max 90 mega EVO for centre-backs drops Friday. How to play the market, make coins flipping 93 TOTS cards, and what to expect from League One.",
      excerpt: "The max 90 mega EVO for centre-backs drops Friday. Market moves, coins with 93 TOTS, and what to expect from League One.",
      category: "TOTS",
      dateLabel: "6 May 2026",
      body: `We're deep into TOTS and this week has more to juggle than usual: a **big EVO dropping Friday**, UCL upgrades shaking up the market, and a few solid, low-risk ways to make coins. Here's what actually matters.

## Max 90 Centre-Back EVO: Requirements & What to Expect

Friday brings the first EVO of the year built for centre-backs, with these requirements:

> ✔ **Position:** Centre Back · **Max overall:** 90
> ✔ **Max PlayStyle Plus:** 2 · **Min base PlayStyles:** 10
> **Expected result: 3 PlayStyle Plus + stat boosts**

It's the first max 90 CB EVO to hand out 3 PS+, and the requirements are open enough to include cards with extra positions like CDM or full-back. Cards like **Micky van de Ven** (already 94 pace) or **Patrick Vieira Winter Wildcard** fit perfectly. Likely PS+: **Intercept+, Bruiser, Quick Step**. If Intercept+ is confirmed, Hincapié, already maxed out in price, becomes one of the best CBs in the game.

> ⚠️ **On the market:** Sell your valuable tradeable CBs **before Friday**, Tah, Jacob Ramon TOTS, Bremer TOTS. Once this EVO goes live, anyone sitting on evolvable cards in their club stops buying off the market. Prices drop. On the flip side, 88–90 rated CBs with ≤ 2 PS+ are already climbing on speculation, if you've got them, hold.

## How to Make Coins This Week

**93 TOTS cards on bids.** Right now they're going for 20,000 coins on bids. They climb to 23–24K at peak hours, and with no Weekend League rewards out, supply is lower than usual. The play is simple: snipe at 20K, list at 25K, walk away clean.

**85–86 rated fodder.** It's bounced back above 2,000 coins, and on Division Rivals rewards days it spikes to 2,200–2,300. List today, not tomorrow, once rewards drop, supply floods and prices tank.

**91+ TOTS Player Pick every two days.** It costs ~99,000 coins on the price tag, but building it with club fodder (86x2 + 83x14) brings the real cost way down. The odds aren't guaranteed, but it's still the best possible use for your excess fodder versus letting it rot in the club.

> 💡 **Core principle:** Fodder you don't use is locked-up coins. Keep it moving, SBC, Player Pick, doesn't matter. An 84 rated sitting in your club is worth zero.

## UCL: Arsenal in the Final, What Shifts on the Market

Arsenal knocked out Atletico Madrid (2-1 on aggregate) to reach the UCL final. Direct knock-on: the Arsenal live cards, **Hincapié and Eze**, will soon get +1 overall and a third PlayStyle Plus. Arsenal card prices have already climbed ahead of the upgrade. The Atletico cards (Sorloth, Molina) crashed the moment they went out.

> ⚠️ **PSG-Bayern tonight:** Dembélé is worth 4.2M, Musiala 1.4M. Whoever loses watches their card get cut in half within hours. If you've got one of these in your squad and you're not sure about keeping it, sell before kickoff.

## TOTS League One: Cards to Keep an Eye On

It's not the most hyped TOTS week, but there are cards with already-confirmed stats worth watching. The standouts: **Vitinha** (98 dribbling, 4 PS+), **Sangaré** (96 dribbling and pace, Intercept+), **Nuno Mendes** (Intercept+, Bruiser, Rapid), **Aubameyang** (Quick, Rapid, he'll be one of the fastest in the game). Keep an eye out for any SBCs of players left out of the base team: Hakimi, Dway and Jon Neves are the most anticipated names.

## Summary

> **✓ DO**
> • Sell valuable tradeable CBs before Friday
> • Snipe 93 TOTS on bids at ~20K, exit at 25K
> • List your 85–86 rated today, ahead of rewards
> • Hold 88–90 CBs with ≤ 2 PS+ in your club for the EVO
>
> **✕ DON'T**
> • Buy top CBs off the market now, they'll drop Friday
> • Hold Dembélé or Musiala live if you're not sold on them
> • Leave fodder sitting in your club unused`,
    },
  },
  {
    slug: "migliori-giocatori-per-ruolo-fc26",
    title: "Migliori giocatori per ruolo su FC 26: la guida completa per 100K, 500K e 1 milione",
    description:
      "Da portiere ad attaccante, le carte più forti della meta attuale divise per budget. Quale squadra puoi costruire con quello che hai?",
    category: "Guide",
    date: "2026-05-02",
    dateLabel: "2 Maggio 2026",
    readingTime: "8 min",
    excerpt:
      "Da portiere ad attaccante, le carte più forti della meta divise per budget: 100K, 500K e 1 milione. Quale squadra puoi costruire?",
    body: `Con la TOTS in pieno svolgimento il mercato di FC 26 si è completamente trasformato. Nuove carte ovunque, prezzi che cambiano ogni giorno, e la domanda che tutti si fanno è sempre la stessa: **con quello che ho, cosa compro?** Ho analizzato ogni ruolo per tre fasce di budget diverse, 100K, 500K e 1 milione, per darti una risposta concreta. Partiamo.

> 🎯 **Cosa cercare in ogni carta:** prima di tutto i play style. Le caratteristiche più importanti in questo meta sono: **Lengthy** per difensori e ali, **Finesse Shot + Incisive Pass + Tiki-Taka** per centrocampisti e attaccanti, **Quick Step** praticamente ovunque. Con questi play style una carta da 50K può battere una da 500K nelle mani sbagliate.

## Portieri

Per il portiere le due caratteristiche che contano davvero sono **Footwork** e **Far Reach**. Se una carta le ha entrambe più una statura decente, sei già sulla strada giusta.

**100K →** Manuel. L'ho visto in campo e fa soffrire, copre la porta in modo fastidioso e sorprende. A quel prezzo è un affare.
**500K →** Icon CDM. Affidabile, nessuna sorpresa negativa, prezzo giusto.
**1M+ →** Donnarumma Team of the Year. Ancora lui, ancora il migliore. La versione TOTY ha play style superiori alla TOTS, non farti ingannare dal numero sulla carta.

## Terzino Destro

La parola chiave qui è **Lengthy**. Un terzino lungo in fascia fa la differenza ogni partita, recupera posizione, chiude le azioni avversarie, e in fase offensiva spinge con continuità.

**100K →** Kama (circa 40K). Gioca nel campionato francese, è 192 cm, può essere Lengthy con la chimica giusta. Ha play style offensivi e difensivi. Carta completa a prezzo ridicolo.
**500K →** Pestra (circa 75K, sì, costa molto meno del budget). Probabilmente il miglior terzino destro del gioco in questo momento.
**1M+ →** Kasparai. L'upgrade su Lucy Bronze che era il riferimento della posizione prima della TOTS.

## Difensori Centrali

Oltre ai soliti intercept e anticipate, c'è un play style spesso sottovalutato che fa la differenza nei centrali: **Quick Step**. Un difensore con Quick Step recupera molto più facilmente sugli attaccanti veloci.

**100K →** Kwan (circa 100K). Intercept, anticipate e Quick Step silver. Solido, affidabile, non ti tradisce.
**500K →** Jakob Boram (circa 200K, il miglior centrale del gioco a quel prezzo). 196 cm, contrasta tutto, fisicamente impossibile da spostare.
**1M+ →** Bremer. Sempre tra i migliori, non sbaglia mai. Se hai già Bremer non cambiare.

## Terzino Sinistro

**100K →** Reach (circa 34K). Lengthy con la chimica giusta, Quick Step, Intercept. L'unica cosa che manca è Bruiser, ma a 34K non puoi lamentarti.
**500K →** Stout (circa 40K). Non è Lengthy, ma velocità e qualità difensiva fuori categoria.
**1M+ →** Nico O'Reilly. SBC completabile, 192-193 cm, Lengthy con la chimica giusta, Bruiser. Tiranneggia ogni ala avversaria.

## Centrocampisti Centrali

**100K →** Sano. Uno dei centrocampisti più veloci palla al piede che abbia usato. Si muove come un attaccante o un'ala pur giocando in mezzo.
**500K →** Heckney (circa 312K). 96 di fisico, può giocare sia da CAM che da CDM, four star skills, five star weak foot, 178 cm.
**1M+ →** McTominay TOTS. Ti sembra di giocare con 12 giocatori in campo. Bruiser in pressing, fisico brutale, recupera palle dappertutto.

## Trequartista (CAM)

**100K →** Aander (circa 120K). Finesse shot, game changer, Tiki-Taka, incisive pass. Se giocasse in Premier League costerebbe 500-600K.
**500K →** Bachel (circa 300K). Finesse, Tiki-Taka, low driven, incisive. Ha qualcosa di speciale palla al piede.
**1M+ →** Mariona TOTS. La migliore CAM del gioco in questo momento. Meglio della versione TOTY.

## Ala Destra

**100K →** Ryer (circa 50K). Play style di passaggio completi, finesse shot, game changer. Impossibile sbagliare.
**500K →** Tripic. Probabilmente la scoperta della stagione. Gioca in Norvegia, sconosciuto prima di questa TOTS, ma è diventato uno dei terzini più usati del gioco.
**1M+ →** Embu (SBC). Quick Step e Rapid insieme, combinazione devastante. Probabilmente la miglior ala destra del gioco.

## Ala Sinistra

**100K →** Alik Begoic (esattamente 100K). Game changer, quick step, technical, finesse, low driven, incisive, rapid. 185 cm quindi forte fisicamente.
**500K →** PZ o similare con Pink play style. Il Pink sul lato sinistro è fondamentale per tagliare dentro.
**1M+ →** Shelling (o simile top tier). Semplicemente la carta più veloce del gioco.

## Attaccante

I cinque play style che cerco sempre in un centravanti: **Incisive Pass, Tiki-Taka, Game Changer, Low Driven, Finesse Shot**. Chi li ha tutti è una carta da prendere a prescindere dal nome.

**100K →** Shah Pedro (circa 45K). Li ha tutti e cinque. Se sei a budget, questa è la scelta da fare subito.
**500K →** Mateo Fantasy FC, 99 tiro, incisive, finesse, tutto quello che serve. Finalizza tutto.
**1M+ →** Salma Paloulo. 99 tiro, velocità estrema, difficile da togliere palla. Con la chimica Sniper o Architect diventa Lengthy.

> 💡 **La cosa che mi colpisce di questa meta:** alcune delle carte più forti del gioco costano meno di 100K. Kama, Pestra, Stout, Shah Pedro, Ryer, tutte carte eccellenti a prezzi ridicoli. Su FC 26 il nome non conta: contano i play style. E questi li hanno tutti.`,
    en: {
      title: "Best Players by Position in FC 26: Full Guide for 100K, 500K and 1 Million",
      description: "From keeper to striker, the strongest meta cards split by budget. What squad can you build with what you've got? Budget-by-budget breakdown.",
      excerpt: "From keeper to striker, the strongest meta cards split by budget: 100K, 500K and 1 million. What squad can you actually build?",
      category: "Guide",
      dateLabel: "2 May 2026",
      body: `With TOTS in full swing the FC 26 market has completely flipped. New cards everywhere, prices shifting by the day, and everyone's asking the same question: **with what I've got, what do I buy?** I've broken down every position across three budget tiers, 100K, 500K and 1 million, to give you a straight answer. Let's go.

> 🎯 **What to look for in every card:** PlayStyles first. The ones that matter most in this meta are: **Lengthy** for defenders and wingers, **Finesse Shot + Incisive Pass + Tiki-Taka** for midfielders and attackers, and **Quick Step** basically everywhere. With these PlayStyles a 50K card can out-perform a 500K one in the wrong hands.

## Goalkeepers

For keepers the two traits that actually matter are **Footwork** and **Far Reach**. If a card has both plus a decent frame, you're already on the right track.

**100K →** Manuel. I've used him on the pitch and he's a menace, covers the goal in an annoying way and pulls off saves you don't expect. At that price he's a steal.
**500K →** Icon CDM. Reliable, no nasty surprises, fair price.
**1M+ →** Donnarumma Team of the Year. Still him, still the best. The TOTY version has better PlayStyles than the TOTS, don't let the number on the card fool you.

## Right Back

The keyword here is **Lengthy**. A lengthy fullback out wide makes a difference every game, recovers position, shuts down attacks down the flank, and pushes forward non-stop going the other way.

**100K →** Kama (around 40K). Plays in the French league, he's 192 cm, can be Lengthy with the right chemistry. Has both attacking and defending PlayStyles. Complete card at a ridiculous price.
**500K →** Pestra (around 75K, yeah, way under budget). Probably the best right back in the game right now.
**1M+ →** Kasparai. The upgrade on Lucy Bronze, who was the benchmark for the position before TOTS.

## Center Backs

Beyond the usual Intercept and Anticipate, there's one PlayStyle that's often slept on but makes a real difference for center backs: **Quick Step**. A CB with Quick Step recovers far more easily against pacey attackers.

**100K →** Kwan (around 100K). Intercept, Anticipate and Quick Step (silver). Solid, reliable, won't let you down.
**500K →** Jakob Boram (around 200K, the best CB in the game at that price). 196 cm, wins everything, physically impossible to shift.
**1M+ →** Bremer. Always among the best, never puts a foot wrong. If you already have Bremer, don't change.

## Left Back

**100K →** Reach (around 34K). Lengthy with the right chemistry, Quick Step, Intercept. The only thing missing is Bruiser, but at 34K you can't complain.
**500K →** Stout (around 40K). Not Lengthy, but the pace and defensive quality are out of this league.
**1M+ →** Nico O'Reilly. Completable SBC, 192-193 cm, Lengthy with the right chemistry, Bruiser. Bullies every winger he faces.

## Central Midfielders

**100K →** Sano. One of the fastest midfielders on the ball I've used. Moves like a striker or a winger despite playing in the middle.
**500K →** Heckney (around 312K). 96 physical, can play both CAM and CDM, four star skills, five star weak foot, 178 cm.
**1M+ →** McTominay TOTS. Feels like you've got 12 players on the pitch. Bruiser in the press, brutal physicality, wins the ball back everywhere.

## Attacking Midfielder (CAM)

**100K →** Aander (around 120K). Finesse Shot, Game Changer, Tiki-Taka, Incisive Pass. If he played in the Premier League he'd cost 500-600K.
**500K →** Bachel (around 300K). Finesse, Tiki-Taka, Low Driven, Incisive. Something special on the ball.
**1M+ →** Mariona TOTS. The best CAM in the game right now. Better than the TOTY version.

## Right Wing

**100K →** Ryer (around 50K). Full passing PlayStyles, Finesse Shot, Game Changer. Impossible to get wrong.
**500K →** Tripic. Probably the find of the season. Plays in Norway, a complete unknown before this TOTS, but he's become one of the most used wingers in the game.
**1M+ →** Embu (SBC). Quick Step and Rapid together, a devastating combo. Probably the best right winger in the game.

## Left Wing

**100K →** Alik Begoic (exactly 100K). Game Changer, Quick Step, Technical, Finesse, Low Driven, Incisive, Rapid. 185 cm so he holds up physically too.
**500K →** PZ or similar with the Pink PlayStyle. Pink on the left side is essential for cutting inside.
**1M+ →** Shelling (or a similar top tier). Simply the fastest card in the game.

## Striker

The five PlayStyles I always want in a striker: **Incisive Pass, Tiki-Taka, Game Changer, Low Driven, Finesse Shot**. Anyone who has all five is a buy regardless of the name.

**100K →** Shah Pedro (around 45K). Has all five. If you're on a budget, this is the one to grab right away.
**500K →** Mateo Fantasy FC, 99 shooting, Incisive, Finesse, everything you need. Finishes everything.
**1M+ →** Salma Paloulo. 99 shooting, extreme pace, hard to dispossess. With Sniper or Architect chemistry she turns Lengthy.

> 💡 **What strikes me about this meta:** some of the strongest cards in the game cost less than 100K. Kama, Pestra, Stout, Shah Pedro, Ryer, all excellent cards at ridiculous prices. On FC 26 the name doesn't matter: the PlayStyles do. And these cards have them all.`,
    },
  },
  {
    slug: "bundesliga-tots-migliori-carte-fc26",
    title: "Bundesliga TOTS FC 26: chi comprare e chi evitare secondo me",
    description:
      "Da Taw e Schlotterbeck in difesa a Mika Elise ala destra, Kane e Ronaldo in attacco: la guida completa alle migliori carte meta della Bundesliga TOTS.",
    category: "TOTS",
    date: "2026-04-29",
    dateLabel: "29 Aprile 2026",
    readingTime: "7 min",
    excerpt:
      "Da Taw e Schlotterbeck a Mika Elise, Kane e Ronaldo: la guida completa alle migliori carte meta della Bundesliga TOTS.",
    body: `La Bundesliga TOTS è arrivata e il mercato si è scatenato. Prezzi che crollano, carte che esplodono, e la solita domanda che mi arriva ogni giorno in DM: **"Fabio, cosa compro?"**. Ho analizzato tutto ruolo per ruolo, con gli occhi di chi questo gioco lo conosce dal di dentro. Ecco la mia guida completa, senza giri di parole.

> ⚡ **Regola d'oro sul mercato TOTS:** se pacchi una carta forte il venerdì del drop, vendila subito. 24-48 ore dopo puoi ricomprarla al 40-50% del prezzo di vendita. Vale sempre, ogni promo, ogni anno.

## Portieri, Nessuna Rivoluzione

In porta la situazione è stabile. Kubul rimane una delle scelte più solide e il suo prezzo è sceso rispetto ai giorni scorsi, buon momento per prenderlo se ti manca. Buffon, Yashin e Suvenov completano un reparto dove la qualità non manca, ma le novità neanche. Se hai già un portiere che funziona, non c'è urgenza di cambiare.

## Difensori Centrali, La Coppia del Momento

Qui si inizia a parlare sul serio. La combo **Tahw + Schlotterbeck** è attualmente tra le migliori coppie di centrali che puoi mettere in campo su FC 26. Entrambi hanno tutti i play style che cerchi: 90 pace per Taw, 88 per Schlotterbeck, 95 e 96 di difesa, 94 di fisico entrambi.

Se il budget non ti permette questa coppia, scendi di prezzo con Yan Couat. Sul budget medio Van Dijk e Puyol restano scelte solide. Se vuoi il meglio del meglio, **Saliba e Gabriel** sono ancora i re assoluti della posizione, ma preparati a spendere.

## Terzini, Serve Varietà

A sinistra tante scelte già note: Grimaldo è la novità della Bundesliga TOTS e merita attenzione. Cucurella, Cole, Theo Hernandez, De Marco restano tra i migliori, e i prezzi stanno scendendo.

A destra la storia è simile: prezzi in calo grazie all'abbondanza di carte. Se giochi una squadra italiana, il duello tra Mhan e il TOTS Palmero è interessante. Sul budget alto, Cafù e i due Tam sono le scelte premium.

## Centrocampisti Difensivi, Kimmich è un Must Buy

Per la Liga vai su Tchouaméni, per la Premier League Declan Rice o Raven Barrick. Ma il vero acquisto da fare adesso, se costruisci una squadra tedesca, è **Joshua Kimmich**. Costa circa 1.4 milioni, ha anticipazione e pink paws, e in mezzo al campo fa la differenza ogni partita.

## Mezzali e Trequartisti, Joao Felix è il Nuovo Re

In mezzo al campo la qualità non manca. Tony Cruz e Marks formano una coppia con visione e fisico. Locatelli è ottima per chi gioca Serie A, McTominay continua a essere affidabile, e Bellingham resta forte.

Ma la carta da tenere d'occhio è **Joao Felix**. Meta rating 95.2, finesse shot, quick step, passaggio incisivo, 90 pace, 96 tiro e dribbling, five star five star. È semplicemente la carta più completa in quella zona di campo adesso.

Da segnalare anche **Juan Ma**, novità assoluta: 91 pace, 96 passaggi, finesse shot, dribbling incisivo. Spesso sottovalutata perché meno conosciuta.

## Ala Destra, Mika Elise è il Re del Meta

Parliamo chiaro: **Mika Elise è attualmente la migliore ala destra del gioco**. La sua carta TOTS parla da sola: 96 pace, 97 dribbling, 96 passaggi, 94 tiro, five star four star, con finesse shot, quick step e passaggio incisivo.

Sul budget medio Matsala, Vinicius Junior e Jamal restano scelte solide. Tra le opzioni economiche, Tripic, sconosciuto fino a poche settimane fa, sta diventando una delle carte più usate del gioco.

## Ala Sinistra, Bou o Luis Diaz?

Qui c'è una cosa che mi fa storcere il naso, e la dico chiaramente: **Bou è meglio di Luis Diaz** su FC 26. Dal punto di vista del gioco è così, i numeri lo confermano. Ma da appassionato di calcio vero, trovo difficile accettarlo.

Questo è esattamente uno dei problemi di FC 26: il legame tra prestazioni reali e valore virtuale si rompe quando EA decide di spingere certe carte. Se hai una squadra del Bayern, prendi Bou. Altrimenti, Luis Diaz resta di altissimo livello. Sul budget medio Doku, Gordon e Williams sono eccellenti.

## Attaccanti, Kane o Ronaldo?

Il confronto più atteso. **Harry Kane** costa circa 11.4 milioni, ha finesse shot, low driven shot, power shot e technical dribbling. 91 pace, uno dei più lenti, ma 98 di tiro, il migliore in assoluto nel gioco.

**Cristiano Ronaldo** costa circa 6 milioni. Quick step, low driven shot, finesse shot, tre play style plus. 93 pace e dribbling, 96 tiro. Five star five star, e questo per molti è decisivo.

> ⚖️ **Il mio verdetto:** Kane è il giocatore più completo dei due su carta. Ronaldo ha il five star five star e costa la metà. Se giochi molto in area con un attaccante fisso, Kane. Se vuoi flessibilità e skill moves, Ronaldo.

## Il Punto sul Mercato

I prezzi delle carte Bundesliga TOTS stanno scendendo rapidamente, come sempre dopo il drop. Non comprare di fretta il venerdì: **aspetta 48-72 ore**, i prezzi calano sempre. L'unica eccezione sono le carte con utility immediata per SBC o EVO in corso.`,
    en: {
      title: "Bundesliga TOTS FC 26: Who to Buy and Who to Skip",
      description: "From Taw and Schlotterbeck at the back to Mika Elise on the right wing, Kane and Ronaldo up top: the complete guide to the best meta cards of Bundesliga TOTS.",
      excerpt: "From Taw and Schlotterbeck to Mika Elise, Kane and Ronaldo: the complete guide to the best Bundesliga TOTS meta cards.",
      category: "TOTS",
      dateLabel: "29 April 2026",
      body: `Bundesliga TOTS has dropped and the market has gone wild. Prices crashing, cards popping off, and the same question hitting my DMs every single day: **"Fabio, what do I buy?"**. I broke it all down position by position, with the eyes of someone who knows this game inside out. Here's my full guide, no fluff.

> ⚡ **Golden rule for the TOTS market:** if you pack a strong card on drop Friday, sell it right away. 24-48 hours later you can re-buy it at 40-50% of what you sold it for. Works every time, every promo, every year.

## Goalkeepers, No Revolution

Between the sticks things are stable. Kubul is still one of the most solid picks and his price has dropped over the last few days, good moment to grab him if you're missing one. Buffon, Yashin and Suvenov round out a position where quality isn't lacking, but neither is anything new. If you already have a keeper that works, there's no rush to switch.

## Center Backs, The Pairing of the Moment

Now we're talking. The **Tahw + Schlotterbeck** combo is currently one of the best CB pairings you can put on the pitch in FC 26. Both have every play style you're after: 90 pace for Taw, 88 for Schlotterbeck, 95 and 96 defending, 94 physical on both.

If the budget won't stretch to that pairing, drop down to Yan Couat. On a mid budget Van Dijk and Puyol are still solid picks. If you want the best of the best, **Saliba and Gabriel** are still the absolute kings of the position, but be ready to spend.

## Full Backs, You Need Variety

On the left there are plenty of familiar names: Grimaldo is the fresh Bundesliga TOTS card and deserves attention. Cucurella, Cole, Theo Hernandez, De Marco are still among the best, and prices are dropping.

On the right it's a similar story: prices falling thanks to the flood of cards. If you run an Italian side, the battle between Mhan and the TOTS Palmero is interesting. On the high budget, Cafu and the two Tam are the premium picks.

## Defensive Midfielders, Kimmich is a Must Buy

For La Liga go Tchouameni, for the Premier League Declan Rice or Raven Barrick. But the real buy to make right now, if you're building a German side, is **Joshua Kimmich**. He goes for around 1.4 million, has anticipate and pink paws, and he makes the difference in midfield every single game.

## Box-to-Box and CAMs, Joao Felix is the New King

In the middle of the park there's no shortage of quality. Tony Cruz and Marks form a pairing with vision and physicality. Locatelli is great if you run Serie A, McTominay keeps being reliable, and Bellingham is still strong.

But the card to keep an eye on is **Joao Felix**. 95.2 meta rating, finesse shot, quick step, incisive pass, 90 pace, 96 shooting and dribbling, five star five star. He's simply the most complete card in that area of the pitch right now.

Worth flagging too is **Juan Ma**, a complete newcomer: 91 pace, 96 passing, finesse shot, incisive dribbling. Often slept on because he's less well known.

## Right Wing, Mika Elise is the King of the Meta

Let's be clear: **Mika Elise is currently the best right winger in the game**. Her TOTS card speaks for itself: 96 pace, 97 dribbling, 96 passing, 94 shooting, five star four star, with finesse shot, quick step and incisive pass.

On a mid budget Matsala, Vinicius Junior and Jamal are still solid picks. Among the cheaper options, Tripic, a nobody until a few weeks ago, is becoming one of the most used cards in the game.

## Left Wing, Bou or Luis Diaz?

Here's something that rubs me the wrong way, and I'll say it straight: **Bou is better than Luis Diaz** in FC 26. From a gameplay standpoint that's just the truth, the numbers back it up. But as someone who loves real football, I find it hard to accept.

This is exactly one of FC 26's problems: the link between real-life performance and virtual value breaks down when EA decides to push certain cards. If you have a Bayern side, get Bou. Otherwise, Luis Diaz is still top tier. On a mid budget Doku, Gordon and Williams are excellent.

## Strikers, Kane or Ronaldo?

The most anticipated head-to-head. **Harry Kane** costs around 11.4 million, with finesse shot, low driven shot, power shot and technical dribbling. 91 pace, one of the slowest, but 98 shooting, the best in the entire game.

**Cristiano Ronaldo** costs around 6 million. Quick step, low driven shot, finesse shot, three play style plus. 93 pace and dribbling, 96 shooting. Five star five star, and for a lot of people that's the dealbreaker.

> ⚖️ **My verdict:** Kane is the more complete player of the two on paper. Ronaldo has five star five star and costs half as much. If you play a lot inside the box with a fixed striker, Kane. If you want flexibility and skill moves, Ronaldo.

## The State of the Market

Bundesliga TOTS card prices are dropping fast, like always after the drop. Don't panic-buy on Friday: **wait 48-72 hours**, prices always come down. The only exception is cards with immediate utility for an ongoing SBC or EVO.`,
    },
  },
  {
    slug: "come-difendere-attaccare-fc26",
    title: "Come imparare a difendere e attaccare su FC 26: la guida completa",
    description:
      "Distanze, switching, aggressione, inserimenti e player lock: tutto quello che devi sapere per passare dalla Divisione 10 all'Elite. Con video.",
    category: "Guide",
    date: "2026-04-24",
    dateLabel: "24 Aprile 2026",
    readingTime: "10 min",
    excerpt:
      "Distanze, switching, aggressione, inserimenti e player lock: tutto per passare dalla Divisione 10 all'Elite. Con video.",
    body: `Questo articolo raccoglie tutto quello che devi sapere per migliorare davvero su EA FC 26, dalla Divisione 10 fino all'Elite. **Non teorie generiche: concetti precisi, applicabili da subito**, frutto di anni di competizioni internazionali, due Mondiali FIFA e centinaia di sessioni di coaching.

▶ Guarda il video completo (50 minuti di coaching gratuito): https://www.youtube.com/watch?v=VoccWsVV5mU

Struttura semplice: prima la **fase difensiva** (distanze, switching, aggressione, temporeggio), poi la **fase offensiva** (inserimenti, protezione palla, player lock, filtranti), e infine i **3 errori che fanno quasi tutti**.

## 1. L'importanza delle Distanze

Il primo concetto che devi interiorizzare è quello delle **distanze**. La distanza è lo spazio tra il portatore di palla avversario e il tuo giocatore più vicino. Sembra banale, ma è la base di tutto.

L'errore classico dei giocatori di Divisione 6-10 è andare addosso al portatore di palla con qualsiasi giocatore, anche con la punta. Il risultato? Un movimento del corpo, una X al terzino, e sei già superato. **Se il tuo avversario ha più opzioni di passaggio, non devi aggredire, devi coprire.**

> 📐 **La regola delle distanze:** distanze larghe = temporeggia e marca le linee di passaggio. Distanze strette (gabbia) = aggredisci col giocatore dietro la linea della palla. Mai con quello davanti.

Con le punte devi marcare **i mediani**, non i difensori centrali. Quando un giocatore imposta, il primo passaggio va quasi sempre al terzino o al mediano. Se blocchi quella linea, lo costringi a giocare sul terzino, più gestibile per te.

## 2. Lo Switching: Analogico Destro e L1

Saper cambiare giocatore velocemente, lo **switching**, è la skill che più di ogni altra separa un buon difensore da uno scarso. Due modi:

**Analogico destro** → usalo nella fase di copertura. Muovi l'analogico nella direzione del giocatore che vuoi prendere. È il metodo più preciso perché sei tu a scegliere chi prendere.

**L1** → usalo per aggredire. Quando l'avversario è in gabbia, L1 ti darà il giocatore più vicino al portatore. Ma attenzione: **se ti dà il giocatore di fronte, non aggredire con quello**. Switcha con l'analogico destro e prendi quello dietro la linea della palla.

## 3. Aggressione vs Temporeggio

**Temporeggio:** L2 + R2 tenuti premuti, rimani in posizione. Non cammini indietro, stai fermo sulla linea del passaggio. Il temporeggio è un muro: lui viene addosso, tu intercetti.

**Aggressione:** quando l'avversario è in gabbia, corri addosso con R2 e fai il contrasto col tasto del tiro (cerchio/B). **Non usare la X per aggredire**, la X in difesa avanzata si usa solo spalla a spalla sulla fascia con giocatori fisici.

> ⚡ **Il passaggio chiave:** prima corro per prendere posizione sulla linea del passaggio, poi temporeggio. Non temporeggiare mai da lontano.

Regola d'oro: **non fare mai l'aggressione coi difensori centrali**. Se sbagli il contrasto con un centrale, l'attaccante si trova davanti alla porta con spazio libero. Aggredisci sempre con mediani, esterni o attaccanti.

## 4. Gli Inserimenti: smetti di correre, fai correre gli altri

L'errore numero uno in attacco è prendere la palla e correre. **Su FC 26 non devi correre tu, devi far correre i giocatori senza palla.** Più sei fermo con la palla e più l'avversario non riesce a switchare i difensori, creando buchi.

**L1 + direzione** → manda il giocatore più vicino in profondità nella direzione che indichi con l'analogico sinistro.
**L1 + X** → inserimento standard del giocatore davanti a te.

> 🏃 **Attenzione:** se fai L1 verso un giocatore e poi L1 verso un altro, il primo torna in posizione. Aspetta che il primo raggiunga la posizione offensiva, poi inserisci il secondo per creare superiorità numerica in area.

## 5. Protezione della Palla

Concetto fisico semplicissimo: se metti il corpo davanti alla palla, l'avversario non può rubartela. **Analogico sinistro sempre in protezione**, orientato in modo che il tuo corpo faccia da scudo tra l'avversario e il pallone. Quando vuoi prendere velocità senza perdere il controllo, usa **R1 (technical dribbling)** invece della corsa normale.

## 6. Player Lock: l'arma dei pro in contropiede

Il **player lock** va attivato nelle impostazioni (Aggancia giocatori → Sì). Premendo entrambi gli analogici puoi muovere liberamente un giocatore specifico, indipendentemente da dove sia la palla.

Quando usarlo: principalmente nei **contropiedi**, quando la difesa avversaria è alta. Mandi in profondità il giocatore con player lock, poi gli fai il filtrante. Serve un giocatore con play style **Tiki-Taka e Triangolo**, senza quei due play style, il filtrante di prima non viene eseguito correttamente anche con 99 di passaggio.

## I 3 Errori che Fanno Quasi Tutti

**Errore 1, Correre troppo in attacco.** La corsa normale stacca la palla dai piedi. Cammina, usa i movimenti di corpo con l'analogico sinistro, usa R1 per prendere velocità. Corri solo quando hai già superato l'avversario.

**Errore 2, Usare il triangolo nei passaggi normali.** Il triangolo non è un passaggio normale, è un filtrante in profondità. Si usa solo dopo L1, quando hai già mandato un giocatore in profondità.

**Errore 3, Tiro assistito attivo.** Il tiro assistito lascia alla CPU il controllo dell'angolo e della potenza. **Disattiva il tiro assistito**: più controllo, più gol.`,
    en: {
      title: "How to Defend and Attack on FC 26: The Complete Guide",
      description: "Distances, switching, jockeying, runs and player lock: everything you need to climb from Division 10 to Elite on EA FC 26. Video included.",
      excerpt: "Distances, switching, jockeying, runs and player lock: everything to climb from Division 10 to Elite. Video included.",
      category: "Guide",
      dateLabel: "24 April 2026",
      body: `This article pulls together everything you need to actually get better at EA FC 26, from Division 10 all the way to Elite. **No generic theory: precise, ready-to-use concepts**, built from years of international competition, two FIFA World Cups and hundreds of coaching sessions.

▶ Watch the full video (50 minutes of free coaching): https://www.youtube.com/watch?v=VoccWsVV5mU

Simple structure: first the **defensive phase** (distances, switching, jockeying, containing), then the **attacking phase** (runs, shielding, player lock, through balls), and finally the **3 mistakes almost everyone makes**.

## 1. Why Distances Matter

The first concept you need to internalize is **distances**. Distance is the gap between the opponent on the ball and your nearest player. It sounds obvious, but it's the foundation of everything.

The classic Division 6-10 mistake is charging the ball carrier with any player, even your striker. The result? A body feint, an X on the full-back, and you're already beaten. **If your opponent has more passing options, don't press, cover.**

> 📐 **The distance rule:** wide distances = jockey and mark the passing lanes. Tight distances (the cage) = press with the player behind the ball line. Never with the one in front.

With your strikers you mark **the midfielders**, not the center-backs. When a player builds up, the first pass almost always goes to the full-back or the holding midfielder. Block that lane and you force him onto the full-back, much easier for you to handle.

## 2. Switching: Right Stick and L1

Switching players quickly is the single skill that separates a good defender from a bad one. Two ways:

**Right stick** → use it in the covering phase. Flick the stick toward the player you want to grab. It's the most precise method because you decide who you take.

**L1** → use it to press. When your opponent is in the cage, L1 gives you the player nearest to the ball carrier. But watch out: **if it gives you the player in front, don't press with him**. Switch with the right stick and take the one behind the ball line.

## 3. Pressing vs Jockeying

**Jockeying:** hold L2 + R2, stay in position. You don't backpedal, you hold your ground on the passing lane. Jockeying is a wall: he comes at you, you intercept.

**Pressing:** when your opponent is in the cage, charge in with R2 and tackle with the shoot button (circle/B). **Don't use X to press**, in advanced defending, X is only for shoulder-to-shoulder battles down the wing with physical players.

> ⚡ **The key step:** first I run to get position on the passing lane, then I jockey. Never jockey from a distance.

Golden rule: **never press with your center-backs**. Miss a tackle with a center-back and the striker is through on goal with open space. Always press with midfielders, wingers or forwards.

## 4. Runs: Stop Sprinting, Make Others Run

The number one mistake in attack is grabbing the ball and sprinting. **On FC 26 you shouldn't run, you make your off-the-ball players run.** The more you stay still on the ball, the harder it is for your opponent to switch defenders, which opens up gaps.

**L1 + direction** → sends the nearest player on a run in the direction you point with the left stick.
**L1 + X** → standard run from the player ahead of you.

> 🏃 **Watch out:** if you L1 toward one player and then L1 toward another, the first one returns to position. Wait for the first to reach the attacking spot, then trigger the second to create an overload in the box.

## 5. Shielding the Ball

Dead-simple physical concept: put your body in front of the ball and your opponent can't take it. **Left stick always in shield position**, angled so your body screens the opponent off the ball. When you want to pick up pace without losing control, use **R1 (technical dribbling)** instead of a normal sprint.

## 6. Player Lock: The Pros' Counter-Attack Weapon

**Player lock** has to be turned on in the settings (Player Lock → On). Click both sticks and you can freely move a specific player, no matter where the ball is.

When to use it: mainly on **counter-attacks**, when the opponent's defense is high. You send the player-locked man in behind, then thread the through ball. You need a player with the **Tiki Taka and Trivela** PlayStyles, without those two, the first-time through ball won't fire properly even with 99 passing.

## The 3 Mistakes Almost Everyone Makes

**Mistake 1, Sprinting too much in attack.** A normal sprint knocks the ball off your feet. Walk, use body feints with the left stick, use R1 to pick up pace. Only sprint once you've already beaten your man.

**Mistake 2, Using triangle for normal passes.** Triangle isn't a normal pass, it's a through ball in behind. You only use it after L1, once you've already sent a player on a run.

**Mistake 3, Assisted shooting on.** Assisted shooting hands the CPU control over angle and power. **Turn off assisted shooting**: more control, more goals.`,
    },
  },
  {
    slug: "como-gaming-club-campione-eserie-a-2026",
    title: "Como Gaming Club campione d'Italia: Vejrgang domina la eSerie A 2026",
    description:
      "Al Comicon di Napoli il Como Gaming Club conquista il titolo trascinato da Anders Vejrgang. Finale epica contro il Torino FC Esports: 9-5.",
    category: "eSports",
    date: "2026-04-18",
    dateLabel: "18 Aprile 2026",
    readingTime: "5 min",
    excerpt:
      "Al Comicon di Napoli il Como Gaming Club conquista il titolo trascinato da Anders Vejrgang. Finale epica contro il Torino: 9-5.",
    body: `Al Comicon di Napoli 2026, sotto i riflettori dell'Esports Stage, si è scritta una pagina di storia per il calcio virtuale italiano. Il **Como Gaming Club** si è laureato Campione d'Italia della sesta edizione della eSerie A Goleador, il campionato virtuale ufficiale della Lega Calcio Serie A. Il protagonista assoluto? **Anders Vejrgang**, considerato tra i migliori pro player del mondo su EA Sports FC.

Un torneo che ha coinvolto i team eSports di 16 club della massima serie italiana, concluso con una finale da brividi: **9-5 contro il Torino FC Esports**, campione in carica.

## Una Stagione da Manuale

La sesta edizione della eSerie A Goleador è stata probabilmente la più combattuta di sempre. Una regular season invernale intensa ha selezionato le migliori squadre, sfidatesi poi nella fase finale di Napoli con un format a eliminazione diretta.

Le semifinali hanno regalato spettacolo: **Sassuolo eSports contro Torino FC Esports** da un lato, **Como Gaming Club contro Hellas Verona FC** dall'altro.

> 🎮 **Curiosità tattica:** la finale Como-Torino ha riproposto esattamente lo stesso incrocio con cui le due squadre avevano aperto la Regular Season. Un cerchio perfetto.

## Vejrgang: Quando il Talento Non Ha Spiegazioni

Se il Como Gaming Club ha alzato la coppa, il merito è in larga parte di **Anders Vejrgang**. Dopo un primo tempo equilibrato, il danese ha alzato il livello in maniera devastante nella ripresa. Il risultato finale di **9-5** racconta solo in parte la superiorità: tecnica sopraffina, lettura del gioco avanzata, capacità di sfruttare ogni minima lacuna difensiva.

Per chi studia il gioco come me, da ex pro player e coach, vedere Vejrgang in finale è stato un master class. **Non si tratta solo di skill meccaniche**: è la capacità di mantenere la lucidità tattica sotto pressione che separa i campioni dai buoni giocatori.

## Cosa Significa per l'eSports Italiano

La vittoria va oltre il trofeo. È la dimostrazione che il modello eSports legato ai club di calcio professionistici funziona. Luigi De Siervo, AD della Lega Calcio Serie A, ha sottolineato come portare la finale al Comicon sia stata "la mossa giusta" per raggiungere la Gen Z.

## Proiezione Internazionale

Grazie all'accesso alle semifinali, quattro club, **Sassuolo, Torino, Como e Hellas Verona**, hanno staccato il pass per la **League Phase della eChampions League** (15-16 maggio 2026). Sassuolo e Torino, come finalisti, si sono qualificati anche per il **EA Sports FC Pro World Championship** (22-26 luglio 2026).

> 🇮🇹 **Il punto di vista di un ex pro:** vedere squadre italiane qualificate alla eChampions League e al Mondiale è qualcosa che fino a qualche anno fa sembrava lontano. Il livello del nostro movimento eSports è cresciuto enormemente.

## Il Livello Sale: Cosa Devi Fare Tu

Guardare una finale come questa dovrebbe farti riflettere: **il gap tra un giocatore medio e un pro player non è genetico**. È fatto di ore di studio, di metodo, di analisi degli errori. Vejrgang non è arrivato in finale per fortuna, ci è arrivato perché ogni giorno lavora su aspetti specifici del proprio gioco.`,
    en: {
      title: "Como Gaming Club Crowned Italian Champion: Vejrgang Rules eSerie A 2026",
      description: "At Naples Comicon, Como Gaming Club claims the title, carried by Anders Vejrgang. An epic grand final against Torino FC Esports: 9-5.",
      excerpt: "At Naples Comicon, Como Gaming Club claims the title, carried by Anders Vejrgang. An epic grand final against Torino: 9-5.",
      category: "eSports",
      dateLabel: "18 April 2026",
      body: `At Naples Comicon 2026, under the lights of the Esports Stage, a new page was written in the history of Italian virtual football. The **Como Gaming Club** was crowned Italian Champion of the sixth edition of the eSerie A Goleador, the official virtual league of the Lega Calcio Serie A. The undisputed star of the show? **Anders Vejrgang**, regarded as one of the best pro players in the world on EA Sports FC.

A tournament that brought together the esports teams of 16 clubs from Italy's top flight, capped off by a thrilling grand final: **9-5 against Torino FC Esports**, the defending champions.

## A Textbook Season

The sixth edition of the eSerie A Goleador was arguably the most fiercely contested ever. An intense winter regular season filtered out the best teams, who then faced off in the Naples finals stage with a single-elimination format.

The semifinals delivered drama: **Sassuolo eSports against Torino FC Esports** on one side, **Como Gaming Club against Hellas Verona FC** on the other.

> 🎮 **Tactical trivia:** the Como-Torino final was an exact rematch of the very fixture that opened the Regular Season for both teams. A perfect full circle.

## Vejrgang: When Talent Defies Explanation

If Como Gaming Club lifted the trophy, much of the credit goes to **Anders Vejrgang**. After a balanced first half, the Dane raised his level in devastating fashion in the second. The final scoreline of **9-5** tells only part of the story of his dominance: sublime technique, advanced game reading, and an ability to exploit the slightest defensive gap.

For someone who studies the game like I do, as a former pro player and coach, watching Vejrgang in the final was a masterclass. **It is not just about mechanical skill**: it is the ability to keep tactical composure under pressure that separates champions from good players.

## What It Means for Italian Esports

This win goes beyond the trophy. It is proof that the esports model tied to professional football clubs works. Luigi De Siervo, CEO of the Lega Calcio Serie A, stressed that bringing the final to Comicon was "the right move" to reach Gen Z.

## International Stage

Thanks to their semifinal runs, four clubs, **Sassuolo, Torino, Como and Hellas Verona**, punched their ticket to the **League Phase of the eChampions League** (15-16 May 2026). As finalists, Sassuolo and Torino also qualified for the **EA Sports FC Pro World Championship** (22-26 July 2026).

> 🇮🇹 **A former pro's perspective:** seeing Italian teams qualify for the eChampions League and the World Championship is something that, just a few years ago, felt out of reach. The level of our esports scene has grown enormously.

## The Bar Is Rising: What You Need to Do

Watching a final like this should make you think: **the gap between an average player and a pro is not genetic**. It is built on hours of study, on method, on analyzing your own mistakes. Vejrgang did not reach the final by luck, he got there because every single day he works on specific aspects of his own game.`,
    },
  },
  {
    slug: "fc26-sta-morendo-3-motivi",
    title: "FC 26 sta morendo? Le 3 vere ragioni",
    description:
      "Leak, promo ripetitive e play style sbilanciati: ecco perché l'hype attorno a FC 26 sta crollando e cosa dovrebbe fare EA per invertire la rotta.",
    category: "Opinione",
    date: "2026-04-12",
    dateLabel: "12 Aprile 2026",
    readingTime: "6 min",
    excerpt:
      "Leak, promo ripetitive e play style sbilanciati: perché l'hype attorno a FC 26 sta crollando e cosa dovrebbe fare EA.",
    body: `Se sei un giocatore di EA FC 26, probabilmente lo senti anche tu: **qualcosa non va**. L'hype è ai minimi storici, i creator abbandonano la scena uno dopo l'altro, e persino i più positivi tra noi faticano a nascondere la stanchezza. Ma perché?

Ho analizzato a fondo la situazione, da ex pro player Top 10 Mondiale, e ho individuato **3 ragioni precise** che stanno affossando FC 26.

## 1. I Leak Hanno Ucciso la Sorpresa

Ricordi quando aspettavi il venerdì sera senza sapere cosa sarebbe uscito? Quella sensazione è praticamente sparita. **Oggi sappiamo tutto con 48-72 ore di anticipo.**

Il problema non è solo che "sappiamo già tutto". È psicologico, e ha un nome preciso: **expectation disconfirmation**. Quando un leaker posta un concept con Dembélé a 96 pace e 95 dribbling, il tuo cervello costruisce un'aspettativa. Se la carta reale è diversa, anche solo un po', scatta la delusione automatica, indipendentemente da quanto la carta sia oggettivamente buona.

> 💡 **Il paradosso dei leak:** da un lato aiutano a pianificare investimenti e SBC. Dall'altro, ogni leak anticipato è un'occasione di sorpresa persa per sempre. EA sostiene che i leak non impattano l'engagement, i numeri reali dicono il contrario.

C'è anche un aspetto che va oltre il gioco: alcuni leaker usano queste informazioni per fare **insider trading sul mercato**, comprando carte prima che il leak diventi pubblico per rivenderle a prezzi gonfiati.

## 2. Il Ciclo delle Promo: 7 Anni Dello Stesso Schema

Era il FIFA 19 quando EA annunciò il passaggio a un modello di contenuti giornalieri. All'epoca sembrava rivoluzionario. **Sette anni dopo, quella stessa routine è diventata una prigione.**

Il ciclo è sempre identico: lunedì leak del prossimo promo, martedì-mercoledì stats ufficiali, venerdì sera drop. Ogni settimana. Ogni mese. Ogni anno. La prevedibilità totale ha trasformato l'eccitazione in obbligo. Non giochi per divertirti, giochi per non perdere il treno del contenuto.

> 📊 **Il dato che colpisce:** non è che il contenuto sia brutto. È che la cadenza non lascia mai il tempo di goderselo. Appena ti abitui a una carta, ne esce già una migliore. L'accumulo genera stanchezza, non soddisfazione.

La soluzione: **meno quantità, più qualità e sorpresa**. Contenuti unici, creativi, inaspettati.

## 3. I Play Style Hanno Rotto l'Equilibrio

Introdotti in FC 24, i play style erano un'idea brillante. Il problema è che **nel tempo sono diventati l'unico metro di giudizio** per valutare una carta.

Oggi la prima domanda non è "che stats ha?" ma "che play style plus ha?". Questo crea due distorsioni:

**Prima distorsione:** EA non può più creare giocatori unici. Se un difensore nella realtà è fisico e aggressivo, i suoi play style naturali sarebbero Enforcer e Precision Header. Ma EA sa che con quelli nessuno farebbe l'SBC, quindi gliene mette altri più "meta". Un gioco che tradisce la realtà per inseguire la competitività artificiale.

**Seconda distorsione:** i play style creano tier rigidissimi. Hai il play style giusto? Carta top. Non ce l'hai? Carta spazzatura. **La carta decide tutto, il giocatore conta sempre meno.**

> 🎮 **La speranza:** FC 24 ha dimostrato che i play style possono essere bilanciati. È possibile tornare a quell'equilibrio. EA deve solo volerlo.

## Cosa ci aspettiamo da EA

La community chiede cose semplici: **più comunicazione, più trasparenza, più coraggio nel fare scelte diverse**. "The Club is Yours" era lo slogan di FC 26. Nei primi mesi sembrava funzionare. Poi il silenzio.

FC 26 non è un gioco morto. È un gioco stanco. E un gioco stanco può ancora svegliarsi, se qualcuno decide di scuoterlo davvero.`,
    en: {
      title: "Is FC 26 Dying? The 3 Real Reasons Behind the Decline",
      description: "Leaks, repetitive promos and broken PlayStyles: here's why the hype around FC 26 is collapsing and what EA should do to turn things around.",
      excerpt: "Leaks, repetitive promos and broken PlayStyles: why the hype around FC 26 is collapsing and what EA should do about it.",
      category: "Opinion",
      dateLabel: "12 April 2026",
      body: `If you grind EA FC 26, you can probably feel it too: **something's off**. The hype is at an all-time low, creators are quitting the scene one after another, and even the most positive voices among us are struggling to hide the fatigue. But why?

I've broken down the situation in depth, as a former Top 10 World pro player, and pinned down **3 specific reasons** that are dragging FC 26 down.

## 1. Leaks Killed the Surprise

Remember when you waited for Friday night with no clue what was dropping? That feeling is basically gone. **These days we know everything 48-72 hours in advance.**

The problem isn't just that "we already know everything." It's psychological, and it has a name: **expectation disconfirmation**. When a leaker posts a concept with Dembélé at 96 pace and 95 dribbling, your brain builds an expectation. If the real card is different, even slightly, disappointment kicks in automatically, no matter how objectively good the card actually is.

> 💡 **The leak paradox:** on one hand they help you plan investments and SBCs. On the other, every leaked drop is a moment of surprise lost forever. EA claims leaks don't impact engagement, the real numbers say otherwise.

There's also a side that goes beyond the game: some leakers use this info for **insider trading on the market**, sniping cards before the leak goes public to flip them at inflated prices.

## 2. The Promo Cycle: 7 Years of the Same Pattern

It was FIFA 19 when EA announced the shift to a daily content model. Back then it felt revolutionary. **Seven years later, that same routine has become a prison.**

The cycle is always identical: Monday leak of the next promo, Tuesday-Wednesday official stats, Friday night drop. Every week. Every month. Every year. Total predictability has turned excitement into obligation. You don't play to have fun, you play so you don't miss the content train.

> 📊 **The stat that hits hard:** it's not that the content is bad. It's that the cadence never gives you time to enjoy it. The second you get used to a card, a better one already drops. The pile-up breeds fatigue, not satisfaction.

The fix: **less quantity, more quality and surprise**. Content that's unique, creative, unexpected.

## 3. PlayStyles Broke the Balance

Introduced in FC 24, PlayStyles were a brilliant idea. The problem is that **over time they became the only yardstick** for judging a card.

Today the first question isn't "what are the stats?" but "what's the PlayStyle+?". This creates two distortions:

**First distortion:** EA can no longer build unique players. If a defender is physical and aggressive in real life, his natural PlayStyles would be Enforcer and Precision Header. But EA knows nobody would grind the SBC with those, so they hand him more "meta" ones instead. A game that betrays reality to chase artificial competitiveness.

**Second distortion:** PlayStyles create rigid tiers. Got the right PlayStyle? Top card. Don't have it? Trash card. **The card decides everything, the player matters less and less.**

> 🎮 **The hope:** FC 24 proved PlayStyles can be balanced. Getting back to that balance is possible. EA just has to want it.

## What We Expect From EA

The community is asking for simple things: **more communication, more transparency, more guts to make different choices**. "The Club is Yours" was the FC 26 slogan. In the first few months it seemed to work. Then, silence.

FC 26 isn't a dead game. It's a tired game. And a tired game can still wake up, if someone decides to truly shake it.`,
    },
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Campi dell'articolo nella lingua richiesta, con fallback all'italiano. */
export function articleView(a: Article, lang: "it" | "en") {
  const en = lang === "en" ? a.en : undefined;
  return {
    title: en?.title ?? a.title,
    description: en?.description ?? a.description,
    excerpt: en?.excerpt ?? a.excerpt,
    body: en?.body ?? a.body,
    category: en?.category ?? a.category,
    dateLabel: en?.dateLabel ?? a.dateLabel,
    heroAlt: en?.heroAlt ?? a.heroAlt,
    hasEn: !!a.en, // esiste la versione inglese? (per hreflang)
  };
}
