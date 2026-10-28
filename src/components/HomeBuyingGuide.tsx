import React, { useState } from 'react';
import { CheckCircle2, AlertOctagon, HelpCircle, ChevronRight, FileText } from 'lucide-react';
import propertyImage from '../assets/images/home_property_architecture_1791820404456.jpg';

const STEPS = [
  {
    step: '01',
    title: 'Prefattibilità Reddituale Preventiva',
    subtitle: 'Prima ancora di visitare gli immobili',
    summary: 'Scopri con esattezza il budget massimo erogabile dalle banche in base ai tuoi redditi e uscite.',
    details: 'Molti acquirenti commettono l\'errore di innamorarsi di una casa e firmare proposte prima di sapere se la banca concederà il finanziamento. Con la nostra prefattibilità preventiva sai subito quanto puoi richiedere, evitando rifiuti o delusioni.',
    trapToAvoid: 'Non firmare mai una proposta impegnativa senza aver prima calcolato il limite del 30-35% di rapporto rata/reddito.'
  },
  {
    step: '02',
    title: 'Verifica Conformità Urbanistica e Catastale',
    subtitle: 'Analisi documentale dell\'immobile',
    summary: 'Controllo della planimetria catastale, dell\'agibilità e dei titoli edilizi depositati in Comune.',
    details: 'Se l\'immobile presenta difformità edilizie (es. tramezzi spostati senza CILA o verande abusive), il perito della banca bloccherà la concessione del mutuo. Verifichiamo i documenti in anticipo per richiedere la sanatoria al venditore prima della perizia.',
    trapToAvoid: 'Attenzione alle provenienze da donazione: molte banche non concedono mutui se l\'immobile è stato donato negli ultimi 20 anni senza polizza donazione sicura.'
  },
  {
    step: '03',
    title: 'Proposta d\'Acquisto con Clausola Sospensiva',
    subtitle: 'La blindatura della caparra confirmatoria',
    summary: 'Inserimento della formula contrattuale che tutela i tuoi risparmi in caso di mancata delibera bancaria.',
    details: 'La clausola sospensiva subordina la validità della proposta e il passaggio della caparra all\'effettiva delibera del mutuo. Se per qualsiasi motivo la banca dovesse respingere la pratica, non perdi un solo euro e la caparra ti viene restituita per intero.',
    trapToAvoid: 'Non accettare proposte d\'acquisto senza data termine precisa per la delibera (solitamente 45-60 giorni lavorativi).'
  },
  {
    step: '04',
    title: 'Istruttoria Bancaria & Delibera Reddituale',
    subtitle: 'Emissione del PIES europeo',
    summary: 'La banca analizza le buste paga, i CUD o i Modelli Unico ed emette il parere favorevole sul richiedente.',
    details: 'In questa fase la banca esamina il merito creditizio e rilascia il PIES (Prospetto Informativo Europeo Standardizzato), che fissa tutte le condizioni contrattuali: tasso, spread, spese e importo erogabile.',
    trapToAvoid: 'Evita di aprire nuovi finanziamenti o richiedere prestiti personali (es. per arredamento o auto) durante l\'istruttoria del mutuo.'
  },
  {
    step: '05',
    title: 'Perizia Tecnica e Relazione Notarile',
    subtitle: 'Sopralluogo del perito e relazione ventennale',
    summary: 'Il perito valuta il valore reale di mercato della casa e il notaio redige la Relazione Notarile Preliminare.',
    details: 'La banca nomina un perito abilitato che effettua il sopralluogo per verificare che il valore dell\'immobile sia congruo con l\'importo finanziato (LTV). Contemporaneamente, il notaio controlla che non vi siano ipoteche o pignoramenti pendenti.',
    trapToAvoid: 'Assicurati che la planimetria depositata in catasto corrisponda al millimetro allo stato reale dei luoghi al momento della visita del perito.'
  },
  {
    step: '06',
    title: 'Rogito Notarile e Consegna delle Chiavi',
    subtitle: 'La conclusione dell\'acquisto casa',
    summary: 'Firma contestuale dell\'atto di compravendita e dell\'atto di mutuo, con erogazione dell\'assegno o bonifico.',
    details: 'Davanti al notaio si stipulano l\'atto di acquisto e l\'atto di mutuo ipotecario. La banca trasferisce i fondi al venditore e tu ricevi formalmente le chiavi della tua nuova casa, diventandone l\'unico legittimo proprietario.',
    trapToAvoid: 'Richiedi la bozza (minuta) dell\'atto al notaio almeno 48 ore prima della firma per leggere con calma tutte le clausole.'
  }
];

export const HomeBuyingGuide: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const active = STEPS[selectedStep];

  return (
    <section id="guida" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <span>Guida Operativa</span>
            <span aria-hidden="true">·</span>
            <span>Zero Sorprese</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            I 6 passi per acquistare casa in totale sicurezza
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Dalla definizione del budget fino alla consegna delle chiavi: ecco il percorso completo per proteggere i tuoi risparmi e ottenere il miglior mutuo senza rischiare caparre.
          </p>
        </div>

        {/* 2-Column Split: Steps list vs Detailed preview card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {STEPS.map((s, idx) => {
              const isSelected = selectedStep === idx;
              return (
                <button
                  key={s.step}
                  onClick={() => setSelectedStep(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-white border-slate-900 shadow-xs ring-1 ring-slate-900'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-extrabold font-mono tabular-nums px-2 py-1 rounded-md ${
                        isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {s.step}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{s.title}</div>
                      <div className="text-xs text-slate-500">{s.subtitle}</div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-slate-900 translate-x-1' : 'text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                  FASE {active.step} DI 06
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  {active.title}
                </h3>
                <div className="text-xs text-slate-500 font-medium">{active.subtitle}</div>
              </div>
            </div>

            {/* Summary callout */}
            <p className="text-base text-slate-700 leading-relaxed font-medium">
              {active.summary}
            </p>

            <div className="text-sm text-slate-600 leading-relaxed">
              {active.details}
            </div>

            {/* Trap to avoid box */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase">
                <AlertOctagon className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Errore frequente da evitare:</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                {active.trapToAvoid}
              </p>
            </div>

            {/* Architectural visual anchor in active view */}
            <div className="pt-2">
              <div className="relative rounded-xl overflow-hidden aspect-16/7 bg-slate-100 border border-slate-200">
                <img
                  src={propertyImage}
                  alt="Acquisto casa residenziale in Italia"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4 text-white text-xs font-medium">
                  Supporto e verifica tecnica con periti e notai convenzionati
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
