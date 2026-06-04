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
  excerpt: string;
  body: string;
};

export const articles: Article[] = [
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

Da quando esiste Ultimate Team — e parliamo di anni — i portieri hanno sempre ricevuto boost a ogni statistica tranne una: le **Reactions**. La stat più importante per un portiere in EA FC. Mai aggiornata, mai toccata, nemmeno nelle EVO.

Questa EVO, chiamata Cat-like Reflexes, cambia tutto per la prima volta: **+25 alle Reactions**. Se hai Vicario evolvibile in club, sai già cosa fare — è uno dei portieri più forti del gioco e con questo boost diventa ancora più dominante. Matt Turner, ad esempio, passa da 71 a 93 di Reactions con questa EVO. Numeri che parlano da soli.

> ✔ Prima EVO in assoluto a boostare le Reactions dei portieri
> ✔ +25 Reactions garantite
> ✔ Include boost al piede debole (+1 stella)
> ✔ Gratuita — da completare obbligatoriamente

> ⚠️ **Sul mercato:** I portieri TOTS stanno crollando — Buffon da 690K a 520K, il portiere Bundesliga TOTS da 280K a 230K. Sono investimenti interessanti. Come già successo con le EVO portieri passate, i prezzi rimbalzano sempre quando l'hype iniziale si spegne. I portieri con 3 Play Style Plus rimangono i migliori del gioco — compra nel panico, vendi nella calma.

## Osimhen SBC: Rapid + Quick Step su un Giocatore Lengthy

L'SBC più interessante del momento è **Osimhen**. La combinazione che lo rende unico: Rapid+, Quick Step+ e accelerazione Lengthy. 97 di passo. In sprint su un pallone in profondità sarà devastante — il Rapid+ su un giocatore Lengthy con quella velocità di base è qualcosa che si vede raramente.

Le statistiche completano il quadro: 97 forza, 98 elevazione, 99 precisione di testa, tiro eccellente, First Touch, Pinged Pass, Finesse, Low Driven e Technical. Costa circa 220.000 coins — tre squad tra 87 e 90 rated con qualche TOTW. Non economico, ma giustificato dal profilo della carta.

> 💡 **Perché è speciale:** Rapid+ su Lengthy con 97 passo significa che in fase di sprint su palloni filtranti è praticamente impossibile da raggiungere. Non è una carta per il possesso — è una carta per distruggere le difese in verticale.

## Pack Weight: Sta Succedendo Qualcosa di Diverso

I player pick 82+ stanno dando blues a un ritmo che non si vedeva da settimane. Le red pick del weekend sono state eccezionali. Barcola a 500.000 coins era packabile — poi sceso a 200K ma comunque un pull significativo. Škriniar, Stiller, duplicati utili per l'SBC grind.

Il meccanismo è semplice: **gold commons → crafting upgrade → gold rares → player pick 82+**. Ogni ciclo ti dà chances reali su TOTS. Fintanto che il pack weight rimane così, questa è la priorità assoluta rispetto a tenere coins ferme.

> 💡 **Endrick a 500K minimo:** Il price range è sbagliato — EA lo correggerà verso il basso. Se ce l'hai, listalo a 501K adesso finché il range non viene aggiornato.

## Come Fare Coins Questo Weekend

**85 e 86 rated.** Comprali su bid a 1.7K, listali a 2.500+ al momento del content drop. Il pattern si ripete ogni weekend — non cambia.

**TOTS out-of-packs.** Tah, Ryerson, i Bundesliga e Premier League TOTS che escono dai pack fluttuano in modo prevedibile: salgono la sera, scendono di notte, risalgono durante i rewards. Compra nei cali, vendi nei picchi. Margini di 30-50K per carta, senza rischio.

**TOTS League One in calo.** Nuno Mendes da 1.2M a 830K, Pacho a 1.1M, Sangaré giù, Asensio da oltre 1M a 669K, Leroy Sané a 375K. I prezzi si stanno normalizzando dopo il lancio — se vuoi una di queste carte per la squadra, il momento per comprarle è adesso, non venerdì scorso.

## Riepilogo

> **✓ DA FARE**
> — EVO Cat-like Reflexes: completala, è gratuita e fa storia
> — Player pick 82+: continua il grind finché il pack weight regge
> — Comprare portieri TOTS in calo come investimento a medio termine
> — 85-86 rated su bid a 1.7K, lista al content drop
> — Osimhen SBC se vuoi un attaccante fisico e veloce diverso dal solito
>
> **✕ DA EVITARE**
> — Tenere Endrick sopra i 500K senza listarlo — il price range calerà
> — Comprare TOTS League One ai prezzi di venerdì — ora sono molto più bassi
> — Ignorare il pack weight attuale: è uno dei migliori momenti dell'anno`,
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
    body: `Settimana di League One TOTS — non la più esaltante dell'anno, ma ci sono cose concrete da analizzare: il grande SBC di venerdì, qualche carta interessante in packs e il modo più semplice per fare coins coi rewards di oggi.

## Kvaraskhelia: il Grande SBC della Settimana

L'SBC di punta questa settimana è **Kvaraskhelia**. Le statistiche ufficiali: 94 passo, 94 dribbling, 92 tiro, 91 passaggio, Rapid, Finesse e Game Changer. Cinque stelle skill, cinque stelle piede debole — sempre.

La carta è buona. Non ho dubbi su quello. Ma guardando dove siamo nella TOTS — dopo settimane di SBC simili come Di Maria, Marco Reus, Hundman Sun — non mi esalta quanto dovrebbe. Le statistiche non saltano fuori dal monitor in modo unico. È una carta forte, ma non diversa da quello che abbiamo già visto.

> 💡 **Il punto sul prezzo:** Kvaraskhelia in versione normale vale circa 900K sul mercato. Se EA la rende accessibile — come ha fatto con Leonard Carl a ~400K — vale assolutamente la pena completarla. Se costa quanto la versione tradeable, ci penso due volte.

## Le Carte in Packs: Dove Sta il Valore Vero

Questa settimana ci sono **tre carte da 97 rating con 4 Play Style Plus** in packs contemporaneamente — una cosa mai vista prima in una singola settimana TOTS. Chawinga NWSL, Chawinga D1 Arkema e Vitinha PSG. Le statistiche di alcune carte del team sono oggettivamente forti.

**Dembélé Super League** merita un discorso a parte. Con Quick Step, Finesse e Technical a 95 rated — c'è chi sostiene sia paragonabile alla sua carta Team of the Year da 97. Stesso passo e tiro, un punto in più nel dribbling, tre in più nel fisico. La differenza è il rating complessivo, ma in campo la distanza potrebbe essere minima. Se la packi, non buttarla via.

> ⚠️ **Il problema degli SBC secondari:** Osimhen e Yilmaz arrivano come SBC Super League con statistiche deludenti per questa fase della TOTS — 89 tiro e 88 passaggio su Yilmaz, 89 dribbling su Osimhen. Carte con nomi interessanti ma numeri che non danno un motivo concreto per usarle. EA ha il potenziale per fare SBC creativi e non lo sfrutta.

## UCL: PSG in Finale, Cosa Fare con Musiala

Il PSG ha eliminato il Bayern (1-1, passano agli aggregati) e vola in finale UCL. **Dembélé e Barcola** riceveranno +1 overall e un terzo Play Style Plus — le loro carte salgono.

**Musiala** è crollato da 1,5 milioni a circa 500K dopo l'eliminazione. Prende comunque +1 overall per il pareggio nel secondo tempo supplementare. A 500K è una delle carte più forti del gioco a quel prezzo — chi la compra oggi per usarla in squadra fa un affare. Chi la compra per rivenderla deve capire fino a dove scende prima di entrare.

> 💡 **Strategia UCL finale:** Le carte live come Hincapié, Dembélé e Vicky Lopez (attualmente esaurita a 420K) rimarranno gonfiate fino alla finale UCL. La logica è sempre la stessa — vendi durante la partita o appena prima, non dopo l'upgrade.

## Come Fare Coins Oggi coi Rewards Division Rivals

Il giorno dei rewards è uno dei momenti più prevedibili e sfruttabili del mercato. Ecco cosa funziona concretamente:

**85 e 86 rated.** Nei giorni di rewards scendono fino a 1.200–1.500 coins su bid. La sera, quando esce il contenuto, risalgono a 2.000–2.800, in alcuni casi 3.000. Compra in mattinata, lista nel tardo pomeriggio.

**89 rated.** Con il Player Pick 91+ TOTS che si refresha oggi (struttura 86+87+87), la domanda di fodder 89 sale. Se li trovi sotto i 5.000–6.000 coins su bid, sono interessanti.

**Carte TOTS delle settimane precedenti.** Premier League, Serie A — con la coin injection dei rewards la gente compra. Le carte che erano ferme si muovono. Studia i grafici delle ultime due settimane nei giovedì di rewards: il pattern si ripete.

## Riepilogo

> **✓ DA FARE**
> — Comprare 85–86 rated su bid stamattina, listare stasera
> — Completare il Player Pick 91+ TOTS con il fodder del club
> — Monitorare Musiala: se scende sotto 450K, è un affare per l'uso
> — Valutare Kvaraskhelia solo se il costo SBC è accessibile
>
> **✕ DA EVITARE**
> — Completare SBC Osimhen/Yilmaz: statistiche non giustificano il costo
> — Tenere carte live UCL dopo la finale senza pianificare l'uscita`,
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

È la prima EVO max 90 per i DC a dare 3 PS+ — e i requisiti sono abbastanza aperti da includere anche carte con posizioni aggiuntive come CDM o terzino. Carte come **Micky van de Ven** (già 94 passo) o **Patrick Vieira Winter Wild Card** rientrano perfettamente. I PS+ probabili: **Intercept+, Bruiser, Quick Step**. Se confermato Intercept+, Hincapié — già a prezzo massimo — diventa uno dei migliori DC del gioco.

> ⚠️ **Sul mercato:** Vendi i DC tradeable di valore **prima di venerdì** — Tah, Jacob Ramon TOTS, Bremer TOTS. Quando questa EVO uscirà, chi ha carte evolvibili in club smette di comprare quelle sul mercato. I prezzi scendono. Di converso, i DC 88–90 overall con ≤ 2 PS+ stanno già salendo per speculazione — se ne hai, tienili.

## Come Fare Coins Questa Settimana

**Carte 93 TOTS su bid.** In questo momento si trovano a 20.000 coins su bid. Nelle ore di punta salgono a 23–24K, e senza i rewards Weekend League la supply è più bassa del solito. La logica è semplice: compra a 20K, lista a 25K, esci pulito.

**Fodder 85–86 rated.** Sono risaliti sopra i 2.000 coins e nei giorni di rewards Division Rivals toccano picchi di 2.200–2.300. Lista oggi, non domani — dopo i rewards la supply si allarga e i prezzi calano.

**Player Pick 91+ TOTS ogni due giorni.** Costa ~99.000 coins sul cartellino, ma costruendolo con il fodder del club (86x2 + 83x14) il costo reale si abbassa molto. Le probabilità non sono garantite, ma è comunque il miglior utilizzo possibile per il fodder in eccesso rispetto a tenerlo fermo nel club.

> 💡 **Principio base:** Il fodder che non usi è coins bloccati. Fallo girare — SBC, player pick, non importa. Un 84 rated fermo nel club vale zero.

## UCL: Arsenal in Finale, Cosa Cambia sul Mercato

Arsenal ha eliminato l'Atletico Madrid (2-1 aggregato) e conquista la finale UCL. Conseguenza diretta: le carte live Arsenal — **Hincapié e Eze** — riceveranno presto +1 overall e un terzo Play Style Plus. I prezzi delle carte Arsenal sono già saliti in attesa dell'upgrade. Le carte Atletico (Sorloth, Molina) sono crollate immediatamente dopo l'eliminazione.

> ⚠️ **PSG-Bayern stasera:** Dembélé vale 4,2M, Musiala 1,4M. Chi perde vede la carta dimezzarsi in poche ore. Se hai una di queste in squadra e non sei sicuro di tenerla, vendi prima del fischio d'inizio.

## TOTS League One: Le Carte da Tenere d'Occhio

Non è la settimana più hype della TOTS, ma ci sono carte con statistiche già confermate che meritano attenzione. Le più forti: **Vitinha** (98 dribbling, 4 PS+), **Sangaré** (96 dribbling e passo, Intercept+), **Nuno Mendes** (Intercept+, Bruiser, Rapid), **Aubameyang** (Quick, Rapid — sarà uno dei più veloci del gioco). Tieni d'occhio eventuali SBC di giocatori non inclusi nel team base: Hakimi, Dway e Jon Neves sono i nomi più attesi.

## Riepilogo

> **✓ DA FARE**
> — Vendere DC tradeable di valore prima di venerdì
> — Comprare 93 TOTS su bid a ~20K, uscire a 25K
> — Listare i 85–86 rated oggi, prima dei rewards
> — Tenere in club i DC 88–90 con ≤ 2 PS+ per l'EVO
>
> **✕ DA EVITARE**
> — Comprare DC top sul mercato ora — scenderanno venerdì
> — Tenere Dembélé o Musiala live se non ne sei convinto
> — Lasciare il fodder fermo nel club senza usarlo`,
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
    body: `Con la TOTS in pieno svolgimento il mercato di FC 26 si è completamente trasformato. Nuove carte ovunque, prezzi che cambiano ogni giorno, e la domanda che tutti si fanno è sempre la stessa: **con quello che ho, cosa compro?** Ho analizzato ogni ruolo per tre fasce di budget diverse — 100K, 500K e 1 milione — per darti una risposta concreta. Partiamo.

> 🎯 **Cosa cercare in ogni carta:** prima di tutto i play style. Le caratteristiche più importanti in questo meta sono: **Lengthy** per difensori e ali, **Finesse Shot + Incisive Pass + Tiki-Taka** per centrocampisti e attaccanti, **Quick Step** praticamente ovunque. Con questi play style una carta da 50K può battere una da 500K nelle mani sbagliate.

## Portieri

Per il portiere le due caratteristiche che contano davvero sono **Footwork** e **Far Reach**. Se una carta le ha entrambe più una statura decente, sei già sulla strada giusta.

**100K →** Manuel. L'ho visto in campo e fa soffrire — copre la porta in modo fastidioso e sorprende. A quel prezzo è un affare.
**500K →** Icon CDM. Affidabile, nessuna sorpresa negativa, prezzo giusto.
**1M+ →** Donnarumma Team of the Year. Ancora lui, ancora il migliore. La versione TOTY ha play style superiori alla TOTS — non farti ingannare dal numero sulla carta.

## Terzino Destro

La parola chiave qui è **Lengthy**. Un terzino lungo in fascia fa la differenza ogni partita — recupera posizione, chiude le azioni avversarie, e in fase offensiva spinge con continuità.

**100K →** Kama (circa 40K). Gioca nel campionato francese, è 192 cm, può essere Lengthy con la chimica giusta. Ha play style offensivi e difensivi. Carta completa a prezzo ridicolo.
**500K →** Pestra (circa 75K — sì, costa molto meno del budget). Probabilmente il miglior terzino destro del gioco in questo momento.
**1M+ →** Kasparai. L'upgrade su Lucy Bronze che era il riferimento della posizione prima della TOTS.

## Difensori Centrali

Oltre ai soliti intercept e anticipate, c'è un play style spesso sottovalutato che fa la differenza nei centrali: **Quick Step**. Un difensore con Quick Step recupera molto più facilmente sugli attaccanti veloci.

**100K →** Kwan (circa 100K). Intercept, anticipate e Quick Step silver. Solido, affidabile, non ti tradisce.
**500K →** Jakob Boram (circa 200K — il miglior centrale del gioco a quel prezzo). 196 cm, contrasta tutto, fisicamente impossibile da spostare.
**1M+ →** Bremer. Sempre tra i migliori, non sbaglia mai. Se hai già Bremer non cambiare.

## Terzino Sinistro

**100K →** Reach (circa 34K). Lengthy con la chimica giusta, Quick Step, Intercept. L'unica cosa che manca è Bruiser — ma a 34K non puoi lamentarti.
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
**1M+ →** Embu (SBC). Quick Step e Rapid insieme — combinazione devastante. Probabilmente la miglior ala destra del gioco.

## Ala Sinistra

**100K →** Alik Begoic (esattamente 100K). Game changer, quick step, technical, finesse, low driven, incisive, rapid. 185 cm quindi forte fisicamente.
**500K →** PZ o similare con Pink play style. Il Pink sul lato sinistro è fondamentale per tagliare dentro.
**1M+ →** Shelling (o simile top tier). Semplicemente la carta più veloce del gioco.

## Attaccante

I cinque play style che cerco sempre in un centravanti: **Incisive Pass, Tiki-Taka, Game Changer, Low Driven, Finesse Shot**. Chi li ha tutti è una carta da prendere a prescindere dal nome.

**100K →** Shah Pedro (circa 45K). Li ha tutti e cinque. Se sei a budget, questa è la scelta da fare subito.
**500K →** Mateo Fantasy FC — 99 tiro, incisive, finesse, tutto quello che serve. Finalizza tutto.
**1M+ →** Salma Paloulo. 99 tiro, velocità estrema, difficile da togliere palla. Con la chimica Sniper o Architect diventa Lengthy.

> 💡 **La cosa che mi colpisce di questa meta:** alcune delle carte più forti del gioco costano meno di 100K. Kama, Pestra, Stout, Shah Pedro, Ryer — tutte carte eccellenti a prezzi ridicoli. Su FC 26 il nome non conta: contano i play style. E questi li hanno tutti.`,
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

## Portieri — Nessuna Rivoluzione

In porta la situazione è stabile. Kubul rimane una delle scelte più solide e il suo prezzo è sceso rispetto ai giorni scorsi — buon momento per prenderlo se ti manca. Buffon, Yashin e Suvenov completano un reparto dove la qualità non manca, ma le novità neanche. Se hai già un portiere che funziona, non c'è urgenza di cambiare.

## Difensori Centrali — La Coppia del Momento

Qui si inizia a parlare sul serio. La combo **Tahw + Schlotterbeck** è attualmente tra le migliori coppie di centrali che puoi mettere in campo su FC 26. Entrambi hanno tutti i play style che cerchi: 90 pace per Taw, 88 per Schlotterbeck, 95 e 96 di difesa, 94 di fisico entrambi.

Se il budget non ti permette questa coppia, scendi di prezzo con Yan Couat. Sul budget medio Van Dijk e Puyol restano scelte solide. Se vuoi il meglio del meglio, **Saliba e Gabriel** sono ancora i re assoluti della posizione — ma preparati a spendere.

## Terzini — Serve Varietà

A sinistra tante scelte già note: Grimaldo è la novità della Bundesliga TOTS e merita attenzione. Cucurella, Cole, Theo Hernandez, De Marco restano tra i migliori — e i prezzi stanno scendendo.

A destra la storia è simile: prezzi in calo grazie all'abbondanza di carte. Se giochi una squadra italiana, il duello tra Mhan e il TOTS Palmero è interessante. Sul budget alto, Cafù e i due Tam sono le scelte premium.

## Centrocampisti Difensivi — Kimmich è un Must Buy

Per la Liga vai su Tchouaméni, per la Premier League Declan Rice o Raven Barrick. Ma il vero acquisto da fare adesso, se costruisci una squadra tedesca, è **Joshua Kimmich**. Costa circa 1.4 milioni, ha anticipazione e pink paws, e in mezzo al campo fa la differenza ogni partita.

## Mezzali e Trequartisti — Joao Felix è il Nuovo Re

In mezzo al campo la qualità non manca. Tony Cruz e Marks formano una coppia con visione e fisico. Locatelli è ottima per chi gioca Serie A, McTominay continua a essere affidabile, e Bellingham resta forte.

Ma la carta da tenere d'occhio è **Joao Felix**. Meta rating 95.2, finesse shot, quick step, passaggio incisivo, 90 pace, 96 tiro e dribbling, five star five star. È semplicemente la carta più completa in quella zona di campo adesso.

Da segnalare anche **Juan Ma**, novità assoluta: 91 pace, 96 passaggi, finesse shot, dribbling incisivo. Spesso sottovalutata perché meno conosciuta.

## Ala Destra — Mika Elise è il Re del Meta

Parliamo chiaro: **Mika Elise è attualmente la migliore ala destra del gioco**. La sua carta TOTS parla da sola: 96 pace, 97 dribbling, 96 passaggi, 94 tiro, five star four star, con finesse shot, quick step e passaggio incisivo.

Sul budget medio Matsala, Vinicius Junior e Jamal restano scelte solide. Tra le opzioni economiche, Tripic — sconosciuto fino a poche settimane fa — sta diventando una delle carte più usate del gioco.

## Ala Sinistra — Bou o Luis Diaz?

Qui c'è una cosa che mi fa storcere il naso, e la dico chiaramente: **Bou è meglio di Luis Diaz** su FC 26. Dal punto di vista del gioco è così, i numeri lo confermano. Ma da appassionato di calcio vero, trovo difficile accettarlo.

Questo è esattamente uno dei problemi di FC 26: il legame tra prestazioni reali e valore virtuale si rompe quando EA decide di spingere certe carte. Se hai una squadra del Bayern, prendi Bou. Altrimenti, Luis Diaz resta di altissimo livello. Sul budget medio Doku, Gordon e Williams sono eccellenti.

## Attaccanti — Kane o Ronaldo?

Il confronto più atteso. **Harry Kane** costa circa 11.4 milioni, ha finesse shot, low driven shot, power shot e technical dribbling. 91 pace — uno dei più lenti — ma 98 di tiro, il migliore in assoluto nel gioco.

**Cristiano Ronaldo** costa circa 6 milioni. Quick step, low driven shot, finesse shot, tre play style plus. 93 pace e dribbling, 96 tiro. Five star five star — e questo per molti è decisivo.

> ⚖️ **Il mio verdetto:** Kane è il giocatore più completo dei due su carta. Ronaldo ha il five star five star e costa la metà. Se giochi molto in area con un attaccante fisso, Kane. Se vuoi flessibilità e skill moves, Ronaldo.

## Il Punto sul Mercato

I prezzi delle carte Bundesliga TOTS stanno scendendo rapidamente, come sempre dopo il drop. Non comprare di fretta il venerdì: **aspetta 48-72 ore**, i prezzi calano sempre. L'unica eccezione sono le carte con utility immediata per SBC o EVO in corso.`,
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
    body: `Questo articolo raccoglie tutto quello che devi sapere per migliorare davvero su EA FC 26 — dalla Divisione 10 fino all'Elite. **Non teorie generiche: concetti precisi, applicabili da subito**, frutto di anni di competizioni internazionali, due Mondiali FIFA e centinaia di sessioni di coaching.

▶ Guarda il video completo (50 minuti di coaching gratuito): https://www.youtube.com/watch?v=VoccWsVV5mU

Struttura semplice: prima la **fase difensiva** (distanze, switching, aggressione, temporeggio), poi la **fase offensiva** (inserimenti, protezione palla, player lock, filtranti), e infine i **3 errori che fanno quasi tutti**.

## 1. L'importanza delle Distanze

Il primo concetto che devi interiorizzare è quello delle **distanze**. La distanza è lo spazio tra il portatore di palla avversario e il tuo giocatore più vicino. Sembra banale, ma è la base di tutto.

L'errore classico dei giocatori di Divisione 6-10 è andare addosso al portatore di palla con qualsiasi giocatore, anche con la punta. Il risultato? Un movimento del corpo, una X al terzino, e sei già superato. **Se il tuo avversario ha più opzioni di passaggio, non devi aggredire — devi coprire.**

> 📐 **La regola delle distanze:** distanze larghe = temporeggia e marca le linee di passaggio. Distanze strette (gabbia) = aggredisci col giocatore dietro la linea della palla. Mai con quello davanti.

Con le punte devi marcare **i mediani**, non i difensori centrali. Quando un giocatore imposta, il primo passaggio va quasi sempre al terzino o al mediano. Se blocchi quella linea, lo costringi a giocare sul terzino — più gestibile per te.

## 2. Lo Switching: Analogico Destro e L1

Saper cambiare giocatore velocemente — lo **switching** — è la skill che più di ogni altra separa un buon difensore da uno scarso. Due modi:

**Analogico destro** → usalo nella fase di copertura. Muovi l'analogico nella direzione del giocatore che vuoi prendere. È il metodo più preciso perché sei tu a scegliere chi prendere.

**L1** → usalo per aggredire. Quando l'avversario è in gabbia, L1 ti darà il giocatore più vicino al portatore. Ma attenzione: **se ti dà il giocatore di fronte, non aggredire con quello**. Switcha con l'analogico destro e prendi quello dietro la linea della palla.

## 3. Aggressione vs Temporeggio

**Temporeggio:** L2 + R2 tenuti premuti, rimani in posizione. Non cammini indietro — stai fermo sulla linea del passaggio. Il temporeggio è un muro: lui viene addosso, tu intercetti.

**Aggressione:** quando l'avversario è in gabbia, corri addosso con R2 e fai il contrasto col tasto del tiro (cerchio/B). **Non usare la X per aggredire** — la X in difesa avanzata si usa solo spalla a spalla sulla fascia con giocatori fisici.

> ⚡ **Il passaggio chiave:** prima corro per prendere posizione sulla linea del passaggio, poi temporeggio. Non temporeggiare mai da lontano.

Regola d'oro: **non fare mai l'aggressione coi difensori centrali**. Se sbagli il contrasto con un centrale, l'attaccante si trova davanti alla porta con spazio libero. Aggredisci sempre con mediani, esterni o attaccanti.

## 4. Gli Inserimenti: smetti di correre, fai correre gli altri

L'errore numero uno in attacco è prendere la palla e correre. **Su FC 26 non devi correre tu — devi far correre i giocatori senza palla.** Più sei fermo con la palla e più l'avversario non riesce a switchare i difensori, creando buchi.

**L1 + direzione** → manda il giocatore più vicino in profondità nella direzione che indichi con l'analogico sinistro.
**L1 + X** → inserimento standard del giocatore davanti a te.

> 🏃 **Attenzione:** se fai L1 verso un giocatore e poi L1 verso un altro, il primo torna in posizione. Aspetta che il primo raggiunga la posizione offensiva, poi inserisci il secondo per creare superiorità numerica in area.

## 5. Protezione della Palla

Concetto fisico semplicissimo: se metti il corpo davanti alla palla, l'avversario non può rubartela. **Analogico sinistro sempre in protezione** — orientato in modo che il tuo corpo faccia da scudo tra l'avversario e il pallone. Quando vuoi prendere velocità senza perdere il controllo, usa **R1 (technical dribbling)** invece della corsa normale.

## 6. Player Lock: l'arma dei pro in contropiede

Il **player lock** va attivato nelle impostazioni (Aggancia giocatori → Sì). Premendo entrambi gli analogici puoi muovere liberamente un giocatore specifico, indipendentemente da dove sia la palla.

Quando usarlo: principalmente nei **contropiedi**, quando la difesa avversaria è alta. Mandi in profondità il giocatore con player lock, poi gli fai il filtrante. Serve un giocatore con play style **Tiki-Taka e Triangolo** — senza quei due play style, il filtrante di prima non viene eseguito correttamente anche con 99 di passaggio.

## I 3 Errori che Fanno Quasi Tutti

**Errore 1 — Correre troppo in attacco.** La corsa normale stacca la palla dai piedi. Cammina, usa i movimenti di corpo con l'analogico sinistro, usa R1 per prendere velocità. Corri solo quando hai già superato l'avversario.

**Errore 2 — Usare il triangolo nei passaggi normali.** Il triangolo non è un passaggio normale — è un filtrante in profondità. Si usa solo dopo L1, quando hai già mandato un giocatore in profondità.

**Errore 3 — Tiro assistito attivo.** Il tiro assistito lascia alla CPU il controllo dell'angolo e della potenza. **Disattiva il tiro assistito**: più controllo, più gol.`,
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

Per chi studia il gioco come me — da ex pro player e coach — vedere Vejrgang in finale è stato un master class. **Non si tratta solo di skill meccaniche**: è la capacità di mantenere la lucidità tattica sotto pressione che separa i campioni dai buoni giocatori.

## Cosa Significa per l'eSports Italiano

La vittoria va oltre il trofeo. È la dimostrazione che il modello eSports legato ai club di calcio professionistici funziona. Luigi De Siervo, AD della Lega Calcio Serie A, ha sottolineato come portare la finale al Comicon sia stata "la mossa giusta" per raggiungere la Gen Z.

## Proiezione Internazionale

Grazie all'accesso alle semifinali, quattro club — **Sassuolo, Torino, Como e Hellas Verona** — hanno staccato il pass per la **League Phase della eChampions League** (15-16 maggio 2026). Sassuolo e Torino, come finalisti, si sono qualificati anche per il **EA Sports FC Pro World Championship** (22-26 luglio 2026).

> 🇮🇹 **Il punto di vista di un ex pro:** vedere squadre italiane qualificate alla eChampions League e al Mondiale è qualcosa che fino a qualche anno fa sembrava lontano. Il livello del nostro movimento eSports è cresciuto enormemente.

## Il Livello Sale: Cosa Devi Fare Tu

Guardare una finale come questa dovrebbe farti riflettere: **il gap tra un giocatore medio e un pro player non è genetico**. È fatto di ore di studio, di metodo, di analisi degli errori. Vejrgang non è arrivato in finale per fortuna — ci è arrivato perché ogni giorno lavora su aspetti specifici del proprio gioco.`,
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

Ho analizzato a fondo la situazione — da ex pro player Top 10 Mondiale — e ho individuato **3 ragioni precise** che stanno affossando FC 26.

## 1. I Leak Hanno Ucciso la Sorpresa

Ricordi quando aspettavi il venerdì sera senza sapere cosa sarebbe uscito? Quella sensazione è praticamente sparita. **Oggi sappiamo tutto con 48-72 ore di anticipo.**

Il problema non è solo che "sappiamo già tutto". È psicologico, e ha un nome preciso: **expectation disconfirmation**. Quando un leaker posta un concept con Dembélé a 96 pace e 95 dribbling, il tuo cervello costruisce un'aspettativa. Se la carta reale è diversa — anche solo un po' — scatta la delusione automatica, indipendentemente da quanto la carta sia oggettivamente buona.

> 💡 **Il paradosso dei leak:** da un lato aiutano a pianificare investimenti e SBC. Dall'altro, ogni leak anticipato è un'occasione di sorpresa persa per sempre. EA sostiene che i leak non impattano l'engagement — i numeri reali dicono il contrario.

C'è anche un aspetto che va oltre il gioco: alcuni leaker usano queste informazioni per fare **insider trading sul mercato**, comprando carte prima che il leak diventi pubblico per rivenderle a prezzi gonfiati.

## 2. Il Ciclo delle Promo: 7 Anni Dello Stesso Schema

Era il FIFA 19 quando EA annunciò il passaggio a un modello di contenuti giornalieri. All'epoca sembrava rivoluzionario. **Sette anni dopo, quella stessa routine è diventata una prigione.**

Il ciclo è sempre identico: lunedì leak del prossimo promo, martedì-mercoledì stats ufficiali, venerdì sera drop. Ogni settimana. Ogni mese. Ogni anno. La prevedibilità totale ha trasformato l'eccitazione in obbligo. Non giochi per divertirti — giochi per non perdere il treno del contenuto.

> 📊 **Il dato che colpisce:** non è che il contenuto sia brutto. È che la cadenza non lascia mai il tempo di goderselo. Appena ti abitui a una carta, ne esce già una migliore. L'accumulo genera stanchezza, non soddisfazione.

La soluzione: **meno quantità, più qualità e sorpresa**. Contenuti unici, creativi, inaspettati.

## 3. I Play Style Hanno Rotto l'Equilibrio

Introdotti in FC 24, i play style erano un'idea brillante. Il problema è che **nel tempo sono diventati l'unico metro di giudizio** per valutare una carta.

Oggi la prima domanda non è "che stats ha?" ma "che play style plus ha?". Questo crea due distorsioni:

**Prima distorsione:** EA non può più creare giocatori unici. Se un difensore nella realtà è fisico e aggressivo, i suoi play style naturali sarebbero Enforcer e Precision Header. Ma EA sa che con quelli nessuno farebbe l'SBC — quindi gliene mette altri più "meta". Un gioco che tradisce la realtà per inseguire la competitività artificiale.

**Seconda distorsione:** i play style creano tier rigidissimi. Hai il play style giusto? Carta top. Non ce l'hai? Carta spazzatura. **La carta decide tutto, il giocatore conta sempre meno.**

> 🎮 **La speranza:** FC 24 ha dimostrato che i play style possono essere bilanciati. È possibile tornare a quell'equilibrio. EA deve solo volerlo.

## Cosa ci aspettiamo da EA

La community chiede cose semplici: **più comunicazione, più trasparenza, più coraggio nel fare scelte diverse**. "The Club is Yours" era lo slogan di FC 26. Nei primi mesi sembrava funzionare. Poi il silenzio.

FC 26 non è un gioco morto. È un gioco stanco. E un gioco stanco può ancora svegliarsi — se qualcuno decide di scuoterlo davvero.`,
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
