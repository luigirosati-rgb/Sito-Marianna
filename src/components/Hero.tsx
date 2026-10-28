import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Landmark } from 'lucide-react';
import heroImage from '../assets/images/hero_home_mortgage_1791820378640.jpg';

interface HeroProps {
  onStartSimulation: () => void;
  onExploreRates: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartSimulation, onExploreRates }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-white border-b border-slate-200">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition & Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed clean metadata kicker (anti-slop rule: no static pills) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Consulente Mutui Kìron Partner S.p.A.
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Mediatore Creditizio OAM N. M39</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>D.Lgs. 141/2010</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Il tuo mutuo casa senza sorprese, con una guida esperta al tuo fianco.
            </h1>

            {/* Subheading */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Acquistare casa è una delle scelte più importanti della vita. Confronto per te le condizioni di oltre 20 istituti bancari, negocio il tasso migliore e ti accompagno dall’analisi reddituale fino alla firma del rogito notarile.
            </p>

            {/* Key benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Consulenza 100% Gratuita</strong> e senza alcun costo</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Nessun vincolo né obbligo</strong> per la persona</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Accesso alle convenzioni con oltre 20 banche</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Consulenza In Presenza a Napoli o 100% Online</span>
              </div>
            </div>

            {/* Primary Action Points */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onStartSimulation}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <span>Verifica Prefattibilità Gratuita</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreRates}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <Landmark className="w-4 h-4 text-slate-600" />
                <span>Consulta Tassi Euribor & IRS</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-4/3 lg:aspect-16/11 bg-slate-100">
              <img
                src={heroImage}
                alt="Consulenza compravendita casa e mutuo con Marianna Di Martino"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle gradient overlay at bottom for clarity */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <div className="text-xs uppercase tracking-wider text-slate-200 font-semibold">
                  Compravendita & Finanziamento
                </div>
                <div className="text-lg font-bold">
                  La sicurezza di comprare casa al giusto tasso
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Trasparenza bancaria certificata · Iscritta Organismo Agenti e Mediatori
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width proof strip below hero */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">20+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Banche e Istituti Convenzionati</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">0€</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Costo Prima Analisi e Studio</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">98%</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Pratiche deliberate con successo</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">100%</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Consap Under 36 gestito</div>
          </div>
        </div>
      </div>
    </section>
  );
};
