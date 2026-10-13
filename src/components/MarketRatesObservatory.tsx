import React, { useState } from 'react';
import { TrendingDown, HelpCircle, Activity, Landmark, ArrowRight, ShieldCheck, ExternalLink, Scale } from 'lucide-react';
import { EURIBOR_RATES, EURIRS_RATES, ECB_RATES, INSTITUTIONAL_SOURCES } from '../data/marketRates';

export const MarketRatesObservatory: React.FC<{ onSimulate: () => void }> = ({ onSimulate }) => {
  const [activeTab, setActiveTab] = useState<'euribor' | 'eurirs' | 'bce'>('euribor');
  const [customSpread, setCustomSpread] = useState<number>(0.35);
  const [selectedBenchmark, setSelectedBenchmark] = useState<number>(2.55); // IRS 25Y default

  const calculatedTan = (selectedBenchmark + customSpread).toFixed(2);

  return (
    <section id="osservatorio" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <span className="flex items-center gap-1.5 text-slate-900 font-bold">
              <Scale className="w-3.5 h-3.5 text-slate-700" />
              Fonti Ufficiali Istituzionali
            </span>
            <span aria-hidden="true">·</span>
            <span>Aggiornato a {ECB_RATES.lastUpdate}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Indicatori ufficiali del mutuo: Euribor, IRS e Tassi BCE
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Tutti i dati rilevati sono elaborati direttamente dalle fonti regolamentate ufficiali del mercato finanziario europeo e italiano: EMMI (European Money Markets Institute), ISDA, Banca Centrale Europea e Banca d'Italia.
          </p>
        </div>

        {/* Tab switcher - Functional segmented buttons (allowed by anti-slop rules) */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-slate-200/70 p-1.5 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('euribor')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'euribor'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Euribor (Tasso Variabile)
          </button>
          <button
            onClick={() => setActiveTab('eurirs')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'eurirs'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Eurirs / IRS (Tasso Fisso)
          </button>
          <button
            onClick={() => setActiveTab('bce')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'bce'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tassi Ufficiali BCE
          </button>
        </div>

        {/* Content based on Active Tab */}
        {activeTab === 'euribor' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {EURIBOR_RATES.map((item) => (
                <div
                  key={item.code}
                  className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>{item.code}</span>
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                      <TrendingDown className="w-3.5 h-3.5" />
                      {item.change}%
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 tabular-nums">
                    {item.value.toFixed(2)}%
                  </div>
                  <div className="text-sm font-semibold text-slate-800 mt-1">{item.name}</div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Informational Callout regarding Euribor */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-3">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Come funziona il tasso variabile oggi?
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Nei mutui a tasso variabile, la rata si calcola sommando l'<strong>Euribor</strong> (solitamente Euribor 1M o 3M) allo <strong>Spread</strong> pattuito con la banca (es. <span className="font-mono tabular-nums">Euribor 2.45% + Spread 0.75% = TAN 3.20%</span>). Con il ciclo di discesa dei tassi avviato dalla Banca Centrale Europea, l'Euribor è in calo progressivo, ma comporta comunque l'esposizione al rischio di futuri rialzi.
                  </p>
                </div>
              </div>

              {/* Official Source Attribution Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200/80 pt-2">
                <div>
                  <strong>Fonte Istituzionale:</strong> {INSTITUTIONAL_SOURCES.euribor.authority} · {INSTITUTIONAL_SOURCES.euribor.publicationTime}
                </div>
                <div className="font-mono text-slate-500">
                  {INSTITUTIONAL_SOURCES.euribor.legalBasis}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'eurirs' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {EURIRS_RATES.map((item) => (
                <div
                  key={item.code}
                  className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>{item.code}</span>
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                      <TrendingDown className="w-3.5 h-3.5" />
                      {item.change}%
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 tabular-nums">
                    {item.value.toFixed(2)}%
                  </div>
                  <div className="text-sm font-semibold text-slate-800 mt-1">{item.name}</div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Informational Callout regarding Eurirs */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-3">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Perché l'IRS rende il Tasso Fisso la scelta più sicura?
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    L'<strong>Eurirs</strong> rappresenta il costo del denaro a lungo termine per le banche. Nei mutui a tasso fisso, la formula è <span className="font-mono tabular-nums">Eurirs della durata prescelta + Spread della banca</span> (es. <span className="font-mono tabular-nums">IRS 25A 2.55% + Spread 0.30% = TAN 2.85%</span>). Oggi l'IRS sui 25 e 30 anni è addirittura inferiore o allineato a quello sui 10 anni: una finestra di opportunità storica per bloccare una rata costante e serena per l'intero ciclo del mutuo.
                  </p>
                </div>
              </div>

              {/* Official Source Attribution Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200/80 pt-2">
                <div>
                  <strong>Fonte Istituzionale:</strong> {INSTITUTIONAL_SOURCES.eurirs.authority} · {INSTITUTIONAL_SOURCES.eurirs.publicationTime}
                </div>
                <div className="font-mono text-slate-500">
                  {INSTITUTIONAL_SOURCES.eurirs.legalBasis}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bce' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Tasso sui Depositi BCE
                </div>
                <div className="text-4xl font-extrabold text-slate-900 mt-2 tabular-nums">
                  {ECB_RATES.depositFacility.toFixed(2)}%
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Il tasso guida principale della BCE che orienta direttamente i movimenti dell'Euribor a brevissimo termine.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Rifinanziamento Principale
                </div>
                <div className="text-4xl font-extrabold text-slate-900 mt-2 tabular-nums">
                  {ECB_RATES.refinancingRate.toFixed(2)}%
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Tasso al quale gli istituti di credito acquistano liquidità durante le operazioni settimanali dell'Eurozona.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Prestiti Marginali
                </div>
                <div className="text-4xl font-extrabold text-slate-900 mt-2 tabular-nums">
                  {ECB_RATES.marginalLending.toFixed(2)}%
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Costo per le operazioni di rifinanziamento overnight a disposizione delle banche commerciali.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-3">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Prospettive e Commento del Consulente sul Mercato
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {ECB_RATES.trend} La stabilità dell'Eurozona favorisce chi pianifica l'acquisto di una prima casa: sia i tassi fissi che le opzioni con agevolazioni statali per under 36 presentano attualmente condizioni di assoluto interesse.
                  </p>
                </div>
              </div>

              {/* Official Source Attribution Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200/80 pt-2">
                <div>
                  <strong>Fonte Istituzionale:</strong> {INSTITUTIONAL_SOURCES.ecb.authority} · {INSTITUTIONAL_SOURCES.ecb.publicationTime}
                </div>
                <div className="font-mono text-slate-500">
                  {INSTITUTIONAL_SOURCES.ecb.legalBasis}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Formula Playground: Benchmark + Spread = TAN FINITO */}
        <div className="mt-10 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Simulatore Didattico di Composizione del Tasso
              </div>
              <h3 className="text-2xl font-bold text-white">
                Come viene calcolato il tuo TAN (Tasso Annuo Nominale)?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Il tasso finale non è una decisione arbitraria della banca: è la somma esatta del <strong>parametro interbancario di riferimento</strong> (Euribor o IRS) e dello <strong>Spread</strong> (il margine della banca, che il consulente OAM negozia al ribasso per te).
              </p>
            </div>

            {/* Live interactive formula block */}
            <div className="w-full lg:w-auto bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-center justify-center">
                <div>
                  <label htmlFor="benchmark-select" className="text-xs text-slate-400 block mb-1">Parametro Base</label>
                  <select
                    id="benchmark-select"
                    value={selectedBenchmark}
                    onChange={(e) => setSelectedBenchmark(parseFloat(e.target.value))}
                    className="bg-slate-900 border border-slate-600 text-white text-sm font-semibold rounded-lg px-3 py-1.5 focus:outline-hidden"
                  >
                    <option value={2.55}>IRS 25 Anni (2.55%)</option>
                    <option value={2.49}>IRS 30 Anni (2.49%)</option>
                    <option value={2.62}>IRS 20 Anni (2.62%)</option>
                    <option value={2.45}>Euribor 3 Mesi (2.45%)</option>
                    <option value={2.38}>Euribor 1 Mese (2.38%)</option>
                  </select>
                </div>

                <div className="text-xl font-bold text-slate-400 pt-5">+</div>

                <div>
                  <label htmlFor="spread-select" className="text-xs text-slate-400 block mb-1">Spread Banca</label>
                  <select
                    id="spread-select"
                    value={customSpread}
                    onChange={(e) => setCustomSpread(parseFloat(e.target.value))}
                    className="bg-slate-900 border border-slate-600 text-white text-sm font-semibold rounded-lg px-3 py-1.5 focus:outline-hidden"
                  >
                    <option value={0.25}>0.25% (Super Green A/B)</option>
                    <option value={0.35}>0.35% (Convenzione Marianna Di Martino)</option>
                    <option value={0.55}>0.55% (Media Mercato Standard)</option>
                    <option value={0.85}>0.85% (Variabile Standard)</option>
                  </select>
                </div>

                <div className="text-xl font-bold text-slate-400 pt-5">=</div>

                <div className="bg-slate-950 px-4 py-2 rounded-lg border border-slate-700">
                  <div className="text-xs text-emerald-400 font-semibold uppercase">TAN Finito</div>
                  <div className="text-2xl font-extrabold text-white tabular-nums">
                    {calculatedTan}%
                  </div>
                </div>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={onSimulate}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>Calcola la rata con questo TAN nel calcolatore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
