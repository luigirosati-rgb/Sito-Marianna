import { BankOffer, MarketRateItem } from '../types/mortgage';

// Fonti Istituzionali Ufficiali di Riferimento
export const INSTITUTIONAL_SOURCES = {
  euribor: {
    authority: 'EMMI (European Money Markets Institute)',
    website: 'emmi-benchmarks.eu',
    publicationTime: 'Fixing quotidiano ufficiale ore 11:00 CET',
    legalBasis: 'Regolamento UE 2016/1011 (Benchmark Regulation BMR)'
  },
  eurirs: {
    authority: 'ISDA (International Swaps and Derivatives Association) / EMMI',
    website: 'isda.org',
    publicationTime: 'Fixing giornaliero tassi Interest Rate Swap (Euro Swap Rate 360/360)',
    legalBasis: 'Parametro ufficiale di riferimento per i mutui ipotecari a tasso fisso'
  },
  ecb: {
    authority: 'BCE (Banca Centrale Europea) & Banca d\'Italia',
    website: 'ecb.europa.eu / bancaditalia.it',
    publicationTime: 'Decisioni ufficiali del Consiglio Direttivo BCE',
    legalBasis: 'Tassi guida di politica monetaria dell\'Eurozona e TEGM anti-usura'
  }
};

// Dati Trasparenza Banche Partner Kìron Partner S.p.A.
export const KIRON_TRANSPARENCY_INFO = {
  networkName: 'Kìron Partner S.p.A. - Gruppo Tecnocasa',
  oamRegistration: 'Albo Mediatori Creditizi OAM N. M39',
  officialUrl: 'https://www.kiron.it/it/trasparenza/banche-partner',
  updateFrequency: 'Verifica e aggiornamento settimanale dell\'elenco convenzioni attive',
  disclaimer: 'Elenco istituti bancari convenzionati Kìron Partner S.p.A. rilevato e monitorato periodicamente dal portale trasparenza Kìron.'
};

export const KIRON_ALL_PARTNER_BANKS = [
  { name: 'Crédit Agricole Italia', type: 'Banca Nazionale', isTop5: true, rank: 1, tan: 2.79, taeg: 2.98, highlight: 'Miglior Tasso Fisso Green & Under 36' },
  { name: 'Banco BPM', type: 'Banca Nazionale', isTop5: true, rank: 2, tan: 2.82, taeg: 3.01, highlight: 'Miglior Offerta Consap 100%' },
  { name: 'Intesa Sanpaolo', type: 'Banca Nazionale', isTop5: true, rank: 3, tan: 2.85, taeg: 3.02, highlight: 'Sospensione Rata e Flessibilità' },
  { name: 'ING Bank', type: 'Banca Digitale', isTop5: true, rank: 4, tan: 2.88, taeg: 3.05, highlight: 'Istruttoria Digitale & Zero Spese Incasso' },
  { name: 'BNL Gruppo BNP Paribas', type: 'Banca Nazionale', isTop5: true, rank: 5, tan: 2.89, taeg: 3.08, highlight: 'Tasso Fisso Garantito & Surroghe' },
  { name: 'UniCredit', type: 'Banca Nazionale', isTop5: false, rank: 6, tan: 2.92, taeg: 3.12, highlight: 'Taglia Rata e Opzione Sosta Rata' },
  { name: 'BPER Banca', type: 'Banca Nazionale', isTop5: false, rank: 7, tan: 3.25, taeg: 3.48, highlight: 'Spread Variabile Competitivo' },
  { name: 'CheBanca! / Mediobanca Premier', type: 'Banca Specialistica', isTop5: false, rank: 8, tan: 2.95, taeg: 3.15, highlight: 'Soluzioni Riservate & Advisory' },
  { name: 'Banca Monte dei Paschi di Siena (MPS)', type: 'Banca Nazionale', isTop5: false, rank: 9, tan: 2.98, taeg: 3.18, highlight: 'Convenzioni Territoriali' },
  { name: 'Banca Mediolanum', type: 'Banca Digitale', isTop5: false, rank: 10, tan: 3.20, taeg: 3.44, highlight: 'Tasso Variabile con Tetto CAP' },
  { name: 'Banca di Sardegna', type: 'Banca Regionale', isTop5: false, rank: 11, tan: 3.05, taeg: 3.28, highlight: 'Presidio Territoriale Regionale' },
  { name: 'CR Asti (Cassa di Risparmio di Asti)', type: 'Banca Territoriale', isTop5: false, rank: 12, tan: 3.10, taeg: 3.32, highlight: 'Condizioni Agevolate Locali' },
  { name: 'Extrabanca', type: 'Banca Specialistica', isTop5: false, rank: 13, tan: 3.15, taeg: 3.38, highlight: 'Soluzioni Flessibili per Nuovi Residenti' },
  { name: 'Carifermo', type: 'Banca Territoriale', isTop5: false, rank: 14, tan: 3.12, taeg: 3.35, highlight: 'Convenzione Promozionale Mutui' }
];

// Tassi Euribor aggiornati (base 360)
export const EURIBOR_RATES: MarketRateItem[] = [
  {
    name: 'Euribor 1 Mese',
    code: 'EUR1M',
    value: 2.38,
    previousValue: 2.42,
    change: -0.04,
    period: 'Ottobre 2026',
    description: 'Riferimento per mutui variabili a revisione mensile. Molto reattivo ai tagli BCE.'
  },
  {
    name: 'Euribor 3 Mesi',
    code: 'EUR3M',
    value: 2.45,
    previousValue: 2.50,
    change: -0.05,
    period: 'Ottobre 2026',
    description: 'Il parametro più utilizzato dalle banche italiane per i mutui a tasso variabile trimestrali.'
  },
  {
    name: 'Euribor 6 Mesi',
    code: 'EUR6M',
    value: 2.52,
    previousValue: 2.59,
    change: -0.07,
    period: 'Ottobre 2026',
    description: 'Impiegato per mutui variabili con rata o parametro aggiornato ogni sei mesi.'
  },
  {
    name: 'Euribor 12 Mesi',
    code: 'EUR12M',
    value: 2.61,
    previousValue: 2.68,
    change: -0.07,
    period: 'Ottobre 2026',
    description: 'Tasso interbancario a 1 anno, anticipa le aspettative di politica monetaria a medio termine.'
  }
];

// Tassi IRS / Eurirs (Interest Rate Swap) per mutui a tasso fisso
export const EURIRS_RATES: MarketRateItem[] = [
  {
    name: 'Eurirs 10 Anni',
    code: 'IRS10Y',
    value: 2.48,
    previousValue: 2.52,
    change: -0.04,
    period: 'Ottobre 2026',
    description: 'Parametro base per mutui fissi con durata di ammortamento decennale.'
  },
  {
    name: 'Eurirs 15 Anni',
    code: 'IRS15Y',
    value: 2.58,
    previousValue: 2.63,
    change: -0.05,
    period: 'Ottobre 2026',
    description: 'Utilizzato per piani di ammortamento a tasso fisso a 15 anni.'
  },
  {
    name: 'Eurirs 20 Anni',
    code: 'IRS20Y',
    value: 2.62,
    previousValue: 2.66,
    change: -0.04,
    period: 'Ottobre 2026',
    description: 'La scadenza più gettonata per mutui acquisto prima casa tra le famiglie italiane.'
  },
  {
    name: 'Eurirs 25 Anni',
    code: 'IRS25Y',
    value: 2.55,
    previousValue: 2.59,
    change: -0.04,
    period: 'Ottobre 2026',
    description: 'Curva leggermente invertita/piatta: durata ideale per abbassare la rata mensile.'
  },
  {
    name: 'Eurirs 30 Anni',
    code: 'IRS30Y',
    value: 2.49,
    previousValue: 2.53,
    change: -0.04,
    period: 'Ottobre 2026',
    description: 'Scadenza a lungo termine, ideale per giovani under 36 con mutui estesi a 30 anni.'
  }
];

// Dati Banca Centrale Europea
export const ECB_RATES = {
  depositFacility: 2.50,
  refinancingRate: 2.65,
  marginalLending: 2.90,
  lastUpdate: 'Settembre / Ottobre 2026',
  trend: 'In fase di graduale discesa con inflazione europea stabilizzata al 2%. Ottimo timing per acquisto casa e surroghe.'
};

// Offerte realistiche delle banche con convenzioni creditizie
export const BANK_OFFERS: BankOffer[] = [
  {
    id: 'intesa-domus',
    bankName: 'Intesa Sanpaolo',
    productName: 'Mutuo Domus Fisso Giovani & Prima Casa',
    logoText: 'ISP',
    logoBg: 'bg-emerald-950 text-white',
    rateType: 'fisso',
    tan: 2.85,
    taeg: 3.02,
    spread: 0.35,
    benchmark: 'IRS 20Y / 25Y',
    maxLtv: 95,
    category: ['prima_casa', 'giovani_consap', 'green'],
    investigationFee: 900,
    appraisalFee: 320,
    minDuration: 10,
    maxDuration: 30,
    highlights: [
      'Opzione sospensione rate gratuita fino a 3 volte',
      'Condizioni agevolate per Under 36',
      'Sconto -0.15% per immobili in classe energetica A o B'
    ],
    notes: 'Accesso facilitato anche con garante o fondo Consap statale.'
  },
  {
    id: 'credit-agricole-greenback',
    bankName: 'Crédit Agricole',
    productName: 'Mutuo CA Greenback & Prima Casa Promo',
    logoText: 'CA',
    logoBg: 'bg-teal-900 text-white',
    rateType: 'fisso',
    tan: 2.79,
    taeg: 2.98,
    spread: 0.30,
    benchmark: 'IRS 25Y',
    maxLtv: 80,
    category: ['prima_casa', 'green', 'surroga'],
    investigationFee: 850,
    appraisalFee: 300,
    minDuration: 10,
    maxDuration: 30,
    highlights: [
      'TAN più competitivo del mercato su classe energetica elevata',
      'Bonus riqualificazione: cash back sulla rata se migliori la classe',
      'Zero spese di incasso rata su conto dedicato'
    ],
    notes: 'Ottima soluzione per chi compra nuove costruzioni o ristrutturati ad alta efficienza.'
  },
  {
    id: 'unicredit-sostenibile',
    bankName: 'UniCredit',
    productName: 'Mutuo UniCredit Sostenibile',
    logoText: 'UC',
    logoBg: 'bg-rose-950 text-white',
    rateType: 'fisso',
    tan: 2.92,
    taeg: 3.12,
    spread: 0.40,
    benchmark: 'IRS 20Y / 30Y',
    maxLtv: 80,
    category: ['prima_casa', 'seconda_casa', 'surroga'],
    investigationFee: 1000,
    appraisalFee: 350,
    minDuration: 10,
    maxDuration: 30,
    highlights: [
      'Taglia Rata: possibilità di ridurre limporto della rata',
      'Polizza incendio e scoppio gratuita per i primi 12 mesi',
      'Procedura telematica rapida con delibera reddituale anticipata'
    ],
    notes: 'Istruttoria molto veloce e canali prioritari per mediatori creditizi convenzionati.'
  },
  {
    id: 'bnl-spensierato',
    bankName: 'BNL Gruppo BNP Paribas',
    productName: 'Mutuo Spensierato Fisso',
    logoText: 'BNL',
    logoBg: 'bg-emerald-900 text-white',
    rateType: 'fisso',
    tan: 2.89,
    taeg: 3.08,
    spread: 0.38,
    benchmark: 'IRS 20Y',
    maxLtv: 80,
    category: ['prima_casa', 'seconda_casa'],
    investigationFee: 950,
    appraisalFee: 300,
    minDuration: 10,
    maxDuration: 30,
    highlights: [
      'Certezza della rata costante per tutta la durata del piano',
      'Flessibilità cambio durata in corso dopera',
      'Assistenza notarile convenzionata'
    ],
    notes: 'Storica affidabilità con perizie tempestive in tutta Italia.'
  },
  {
    id: 'banco-bpm-promo',
    bankName: 'Banco BPM',
    productName: 'Mutuo Promo Casa Green & Under 36',
    logoText: 'BPM',
    logoBg: 'bg-cyan-950 text-white',
    rateType: 'fisso',
    tan: 2.82,
    taeg: 3.01,
    spread: 0.32,
    benchmark: 'IRS 25Y',
    maxLtv: 100,
    category: ['prima_casa', 'giovani_consap', 'green'],
    investigationFee: 800,
    appraisalFee: 320,
    minDuration: 15,
    maxDuration: 30,
    highlights: [
      'Aderente al Fondo Garanzia Prima Casa Consap fino al 100% LTV',
      'Zero penali di estinzione anticipata',
      'Consulenza specialistica su fabbisogno assicurativo casa'
    ],
    notes: 'La scelta privilegiata per chi desidera finanziare oltre l80% del valore di acquisto.'
  },
  {
    id: 'bper-in-rete',
    bankName: 'BPER Banca',
    productName: 'Mutuo BPER Prima Casa Facile',
    logoText: 'BPER',
    logoBg: 'bg-blue-950 text-white',
    rateType: 'variabile',
    tan: 3.25,
    taeg: 3.48,
    spread: 0.80,
    benchmark: 'Euribor 3M + Spread 0.80%',
    maxLtv: 80,
    category: ['prima_casa', 'seconda_casa', 'surroga'],
    investigationFee: 750,
    appraisalFee: 280,
    minDuration: 10,
    maxDuration: 30,
    highlights: [
      'Spread molto competitivo sul variabile',
      'Possibilità di passaggio al tasso fisso con opzione Switch',
      'Spese di istruttoria tra le più basse del settore'
    ],
    notes: 'Ottimo se si prevede un ulteriore allentamento dei tassi interbancari nel prossimo biennio.'
  },
  {
    id: 'ing-arancio',
    bankName: 'ING',
    productName: 'Mutuo Arancio Acquisto & Surroga',
    logoText: 'ING',
    logoBg: 'bg-amber-900 text-white',
    rateType: 'fisso',
    tan: 2.88,
    taeg: 3.05,
    spread: 0.36,
    benchmark: 'IRS 20Y / 25Y',
    maxLtv: 80,
    category: ['prima_casa', 'surroga'],
    investigationFee: 700,
    appraisalFee: 250,
    minDuration: 10,
    maxDuration: 30,
    highlights: [
      'Gestione 100% digitale e trasparente',
      'Sconto con accredito dello stipendio sul conto',
      'Zero spese di incasso rata e gestione pratica chiara'
    ],
    notes: 'Pratiche veloci con caricamento documenti online e supporto dedicato.'
  },
  {
    id: 'mediolanum-freedom',
    bankName: 'Banca Mediolanum',
    productName: 'Mutuo Mediolanum Riparti Italia',
    logoText: 'BM',
    logoBg: 'bg-indigo-950 text-white',
    rateType: 'variabile',
    tan: 3.20,
    taeg: 3.44,
    spread: 0.75,
    benchmark: 'Euribor 3M + Spread 0.75%',
    maxLtv: 85,
    category: ['prima_casa', 'green'],
    investigationFee: 850,
    appraisalFee: 310,
    minDuration: 10,
    maxDuration: 30,
    highlights: [
      'Opzione tasso con CAP massimo a tutela del cliente',
      'Accompagnamento personalizzato nel tempo',
      'Servizio di consulenza sul patrimonio familiare'
    ],
    notes: 'Consigliato a chi vuole un variabile ma desidera un tetto massimo protettivo (CAP).'
  }
];

// Domande frequenti per chi acquista casa e mutuo
export const FAQ_LIST = [
  {
    question: 'Che differenza cè tra rivolgersi a un Mediatore Creditizio OAM e andare direttamente in banca?',
    answer: 'La singola filiale bancaria può proporti esclusivamente i propri prodotti, con i propri parametri e le proprie condizioni rigide. Marianna Di Martino, in quanto consulente del credito iscritta regolarmente all’OAM, analizza in modo imparziale il tuo profilo reddituale e lo confronta con oltre 20 istituti bancari convenzionati. Trova l’istituto che valuta meglio il tuo reddito, negozia lo spread e le spese di istruttoria, e ti assiste dall’analisi di prefattibilità fino all’atto notarile, facendoti risparmiare tempo e migliaia di euro di interessi.'
  },
  {
    question: 'Conviene di più il Tasso Fisso o il Tasso Variabile in questo momento?',
    answer: 'Allo stato attuale, l’Eurirs (parametro del tasso fisso) si trova su valori molto interessanti (attorno al 2.50% - 2.60%), permettendo di ottenere mutui a tasso fisso finito tra il 2.75% e il 2.95%. Il tasso variabile (agganciato all’Euribor) è in fase discendente grazie ai tagli della BCE, ma il fisso offre oggi la massima sicurezza psicologica e finanziaria a un costo già storicamente molto conveniente. Con la nostra consulenza valutiamo la tua tolleranza al rischio e l’orizzonte temporale del debito.'
  },
  {
    question: 'Cosa si intende per LTV (Loan to Value) e posso ottenere un mutuo al 100%?',
    answer: 'Il LTV è il rapporto percentuale tra limporto del mutuo concesso e il valore di perizia dellimmobile (o prezzo di acquisto, se inferiore). Solitamente le banche finanziano fino all80%. Tuttavia, grazie al Fondo di Garanzia Prima Casa Consap per giovani under 36 (e categorie prioritarie) o ad accordi con specifici istituti di credito, è possibile ottenere mutui fino al 95% o 100% del valore dellimmobile. Verifichiamo subito insieme la tua ammissibilità.'
  },
  {
    question: 'Quali sono i costi accessori totali per acquistare casa oltre al prezzo dellimmobile?',
    answer: 'Chi compra casa deve considerare: 1) Imposte (imposta di registro al 2% sul valore catastale per prima casa tra privati, oppure IVA al 4% se si acquista da impresa costruttrice; per seconda casa registro al 9% o IVA al 10%); 2) Parcella notarile (per atto di compravendita e atto di mutuo); 3) Imposta sostitutiva sul mutuo (0.25% per prima casa, 2.0% per seconda casa); 4) Spese di perizia (250€-350€) e istruttoria bancaria (600€-1.000€); 5) Eventuale provvigione dellagenzia immobiliare (3-4% + IVA). Nel nostro calcolatore avanzato trovi il riepilogo voce per voce.'
  },
  {
    question: 'Che cosè la delibera reddituale preventiva (o voucher mutuo) e perché è fondamentale?',
    answer: 'È la pre-approvazione formale con cui la banca certifica la tua capacità reddituale di ottenere un mutuo per una determinata cifra prima ancora che tu abbia trovato limmobile. Questo ti dà una forza contrattuale straordinaria nelle trattative con il venditore, ti protegge da rifiuti e ti consente di formulare proposte dacquisto decise e competitive senza rischiare la caparra.'
  },
  {
    question: 'Cosa si intende per clausola sospensiva mutuo nella proposta di acquisto?',
    answer: 'È una clausola di tutela contrattuale inserita nella proposta dacquisto che subordina lefficacia della proposta (e lincasso della caparra confirmatoria da parte del venditore) allesito positivo della delibera del mutuo da parte della banca. Se la banca non concede il mutuo, la proposta si scioglie senza penali e lintera caparra ti viene restituita.'
  }
];
