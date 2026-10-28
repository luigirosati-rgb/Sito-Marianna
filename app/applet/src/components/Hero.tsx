import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Landmark, MapPin, Building2 } from 'lucide-react';
import heroImage from '../assets/images/hero_home_mortgage_1791820378640.jpg';

interface HeroProps {
  onStartSimulation: () => void;
  onExploreRates: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartSimulation, onExploreRates }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Proposition & Copy */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* OAM Kìron Badge Strip */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                Marianna Di Martino · Kìron Partner
              </span>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 text-[11px] font-mono">
                OAM N. M39
              </span>
            </div>

            {/* Display Headline optimized for mobile viewports */}
            <h1 className="text-2xl sm:text-4xl lg:text-[3.25rem] font-extrabold tracking-tight text-slate-900 leading-[1.18] sm:leading-[1.12]">
              Il tuo mutuo casa senza sorprese, con una guida esperta al tuo fianco.
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Acquistare casa è una scelta fondamentale. Confronto per te oltre 20 istituti bancari convenzionati, negocio il tasso migliore e ti accompagno dall’analisi reddituale fino al rogito notarile.
            </p>

            {/* Key benefits list - Card grid on mobile for high readability */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 text-xs sm:text-sm text-slate-800">
              <div className="flex items-start gap-2.5 bg-slate-50 p-3 sm:p-2.5 rounded-xl border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Consulenza 100% Gratuita</strong> e senza alcun costo</span>
              </div>
              <div className="flex items-start gap-2.5 bg-slate-50 p-3 sm:p-2.5 rounded-xl border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Nessun vincolo né obbligo</strong> per la persona</span>
              </div>
              <div className="flex items-start gap-2.5 bg-slate-50 p-3 sm:p-2.5 rounded-xl border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Convenzioni esclusive con 20+ banche</span>
              </div>
              <div className="flex items-start gap-2.5 bg-slate-50 p-3 sm:p-2.5 rounded-xl border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>In Sede a Napoli</strong> oppure <strong>100% Online</strong></span>
              </div>
            </div>

            {/* Address Banner on Mobile */}
            <div className="flex items-center gap-2 p-3 bg-emerald-950 text-emerald-100 rounded-xl text-xs border border-emerald-900">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <strong>Sede Agenzia Napoli:</strong> Via Nuova Poggioreale, 43 - 80143 Napoli (NA)
              </div>
            </div>

            {/* Primary Actions - Full width stacked on smartphone */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onStartSimulation}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-xl shadow-md transition-colors cursor-pointer w-full sm:w-auto"
              >
                <span>Richiedi Consulenza Gratuita</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
              
              <button
                onClick={onExploreRates}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-colors cursor-pointer w-full sm:w-auto border border-slate-200"
              >
                <Landmark className="w-4 h-4 text-slate-600" />
                <span>Consulta Tassi Euribor & IRS</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Image */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-4/3 sm:aspect-16/10 lg:aspect-16/11 bg-slate-100">
              <img
                src={heroImage}
                alt="Consulenza compravendita casa e mutuo con Marianna Di Martino"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Dark overlay with key highlights */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-emerald-400 font-extrabold flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  Kìron Partner S.p.A. · Agenzia Napoli
                </div>
                <div className="text-base sm:text-lg font-bold mt-0.5 leading-snug">
                  Marianna Di Martino · Consulente del Credito
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-tight">
                  Consulenza in presenza in Via Nuova Poggioreale 43 oppure Online · Senza alcun impegno
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Proof Strip - 2x2 grid on smartphones for mobile clarity */}
        <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-200 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">20+</div>
            <div className="text-xs font-medium text-slate-600 mt-0.5">Banche Convenzionate</div>
          </div>
          <div className="bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-200 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">0 €</div>
            <div className="text-xs font-medium text-slate-600 mt-0.5">Costo Prima Analisi</div>
          </div>
          <div className="bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-200 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">98%</div>
            <div className="text-xs font-medium text-slate-600 mt-0.5">Pratiche Deliberate</div>
          </div>
          <div className="bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-200 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">100%</div>
            <div className="text-xs font-medium text-slate-600 mt-0.5">Fondo Consap Under 36</div>
          </div>
        </div>

      </div>
    </section>
  );
};
