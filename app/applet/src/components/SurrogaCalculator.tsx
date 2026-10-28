import React, { useState, useMemo } from 'react';
import { RefreshCw, PiggyBank, ArrowDownRight, ShieldCheck, Info, ArrowRight } from 'lucide-react';
import { parseRate, parseCurrency } from '../utils/numberFormatters';

interface SurrogaCalculatorProps {
  onPrefeasibilityRequest: (data: { loanAmount: number; duration: number; currentRate: number; newRate: number }) => void;
}

export const SurrogaCalculator: React.FC<SurrogaCalculatorProps> = ({ onPrefeasibilityRequest }) => {
  // Input states
  const [surrogaResidualDebtInput, setSurrogaResidualDebtInput] = useState<string>('135000');
  const [surrogaPropertyValueInput, setSurrogaPropertyValueInput] = useState<string>('200000');
  const [surrogaCurrentRateInput, setSurrogaCurrentRateInput] = useState<string>('4.60');
  const [surrogaRemainingYears, setSurrogaRemainingYears] = useState<number>(20);
  const [surrogaNewRateInput, setSurrogaNewRateInput] = useState<string>('2.80');
  const [surrogaNewYears, setSurrogaNewYears] = useState<number>(20);

  const surrogaResidualDebt = parseCurrency(surrogaResidualDebtInput, 135000);
  const surrogaPropertyValue = parseCurrency(surrogaPropertyValueInput, 200000);
  const surrogaCurrentRate = parseRate(surrogaCurrentRateInput, 4.60);
  const surrogaNewRate = parseRate(surrogaNewRateInput, 2.80);

  // Calcolo Risparmio Surroga Mutuo
  const surrogaCalculation = useMemo(() => {
    const oldMonthlyRate = surrogaCurrentRate / 100 / 12;
    const oldMonths = surrogaRemainingYears * 12;
    let oldMonthlyInstallment = 0;

    if (oldMonthlyRate > 0 && surrogaResidualDebt > 0 && oldMonths > 0) {
      oldMonthlyInstallment =
        (surrogaResidualDebt * (oldMonthlyRate * Math.pow(1 + oldMonthlyRate, oldMonths))) /
        (Math.pow(1 + oldMonthlyRate, oldMonths) - 1);
    }

    const newMonthlyRate = surrogaNewRate / 100 / 12;
    const newMonths = surrogaNewYears * 12;
    let newMonthlyInstallment = 0;

    if (newMonthlyRate > 0 && surrogaResidualDebt > 0 && newMonths > 0) {
      newMonthlyInstallment =
        (surrogaResidualDebt * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newMonths))) /
        (Math.pow(1 + newMonthlyRate, newMonths) - 1);
    }

    const monthlySavings = Math.max(0, oldMonthlyInstallment - newMonthlyInstallment);
    const annualSavings = monthlySavings * 12;

    const oldTotalRepaid = oldMonthlyInstallment * oldMonths;
    const newTotalRepaid = newMonthlyInstallment * newMonths;
    const totalInterestSavings = Math.max(0, oldTotalRepaid - newTotalRepaid);

    return {
      oldMonthlyInstallment: Math.round(oldMonthlyInstallment),
      newMonthlyInstallment: Math.round(newMonthlyInstallment),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      totalInterestSavings: Math.round(totalInterestSavings)
    };
  }, [surrogaResidualDebt, surrogaCurrentRate, surrogaRemainingYears, surrogaNewRate, surrogaNewYears]);

  return (
    <section id="calcolatore-surroga" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <RefreshCw className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Portabilità Mutuo Gratuita (Legge Bersani)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Simulatore Surroga: Abbassa la Rata del Tuo Mutuo Attuale
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Hai aperto un mutuo negli anni scorsi con un tasso elevato? Trasferiscilo a costo zero presso una delle banche convenzionate Kìron Partner e riduci la rata ogni mese.
          </p>
        </div>

        {/* Input & Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Form */}
          <div className="lg:col-span-7 bg-white p-4 sm:p-7 rounded-2xl border border-slate-200 space-y-6 shadow-xs">
            
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Dati del Tuo Mutuo Attuale
            </div>

            {/* Debito Residuo */}
            <div>
              <label htmlFor="surroga-residual" className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                Debito Residuo da Trasferire (€)
              </label>

              <div className="relative">
                <input
                  id="surroga-residual"
                  type="text"
                  value={surrogaResidualDebtInput}
                  onChange={(e) => setSurrogaResidualDebtInput(e.target.value)}
                  onBlur={() => setSurrogaResidualDebtInput(surrogaResidualDebt.toString())}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base sm:text-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <span className="absolute right-3.5 top-2.5 text-sm font-bold text-slate-400">€</span>
              </div>
            </div>

            {/* Valore Immobile */}
            <div>
              <label htmlFor="surroga-property" className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
                Valore Attuale dell'Immobile (€)
              </label>

              <div className="relative">
                <input
                  id="surroga-property"
                  type="text"
                  value={surrogaPropertyValueInput}
                  onChange={(e) => setSurrogaPropertyValueInput(e.target.value)}
                  onBlur={() => setSurrogaPropertyValueInput(surrogaPropertyValue.toString())}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base sm:text-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <span className="absolute right-3.5 top-2.5 text-sm font-bold text-slate-400">€</span>
              </div>
            </div>

            {/* Tassi a Confronto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="bg-rose-50/60 p-3.5 rounded-xl border border-rose-200">
                <label htmlFor="surroga-old-rate" className="block text-xs font-bold text-rose-900 mb-1">
                  Tasso Attuale Che Paghi (%)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    id="surroga-old-rate"
                    type="text"
                    value={surrogaCurrentRateInput}
                    onChange={(e) => setSurrogaCurrentRateInput(e.target.value)}
                    onBlur={() => setSurrogaCurrentRateInput(surrogaCurrentRate.toFixed(2))}
                    className="w-full bg-white border border-rose-300 rounded-lg px-3 py-2 text-base font-extrabold text-rose-950 font-mono focus:outline-none"
                  />
                  <span className="text-sm font-bold text-rose-900">%</span>
                </div>
              </div>

              <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200">
                <label htmlFor="surroga-new-rate" className="block text-xs font-bold text-emerald-900 mb-1">
                  Nuovo Tasso Proposto Kìron (%)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    id="surroga-new-rate"
                    type="text"
                    value={surrogaNewRateInput}
                    onChange={(e) => setSurrogaNewRateInput(e.target.value)}
                    onBlur={() => setSurrogaNewRateInput(surrogaNewRate.toFixed(2))}
                    className="w-full bg-white border border-emerald-300 rounded-lg px-3 py-2 text-base font-extrabold text-emerald-950 font-mono focus:outline-none"
                  />
                  <span className="text-sm font-bold text-emerald-900">%</span>
                </div>
              </div>
            </div>

            {/* Durate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="surroga-old-years" className="block text-xs font-semibold text-slate-700 mb-1">
                  Anni Residui da Pagare
                </label>
                <select
                  id="surroga-old-years"
                  value={surrogaRemainingYears}
                  onChange={(e) => {
                    const yrs = parseInt(e.target.value, 10);
                    setSurrogaRemainingYears(yrs);
                    setSurrogaNewYears(yrs);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-base sm:text-sm font-semibold text-slate-800 focus:outline-none"
                >
                  <option value={10}>10 Anni residui</option>
                  <option value={15}>15 Anni residui</option>
                  <option value={20}>20 Anni residui</option>
                  <option value={25}>25 Anni residui</option>
                  <option value={30}>30 Anni residui</option>
                </select>
              </div>

              <div>
                <label htmlFor="surroga-new-years" className="block text-xs font-semibold text-slate-700 mb-1">
                  Nuova Durata Desiderata
                </label>
                <select
                  id="surroga-new-years"
                  value={surrogaNewYears}
                  onChange={(e) => setSurrogaNewYears(parseInt(e.target.value, 10))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-base sm:text-sm font-semibold text-slate-800 focus:outline-none"
                >
                  <option value={10}>10 Anni (Riduci anni)</option>
                  <option value={15}>15 Anni</option>
                  <option value={20}>20 Anni (Mettessi uguale)</option>
                  <option value={25}>25 Anni (Allunga)</option>
                  <option value={30}>30 Anni</option>
                </select>
              </div>
            </div>

          </div>

          {/* Right: Results Box */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Risparmio Rata Box */}
            <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-7 shadow-md space-y-4 border border-emerald-900">
              <div className="flex items-center justify-between text-xs uppercase tracking-wider text-emerald-300 font-bold">
                <span>Risultato Surroga</span>
                <PiggyBank className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-emerald-900">
                <div>
                  <span className="text-[11px] text-emerald-300/80 block">Vecchia Rata:</span>
                  <strong className="text-lg sm:text-xl font-bold text-rose-300 font-mono line-through">
                    {surrogaCalculation.oldMonthlyInstallment} €/m
                  </strong>
                </div>

                <div>
                  <span className="text-[11px] text-emerald-300/80 block">Nuova Rata:</span>
                  <strong className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                    {surrogaCalculation.newMonthlyInstallment} €/m
                  </strong>
                </div>
              </div>

              {/* Risparmio Evidenziato */}
              <div className="bg-emerald-900/80 p-4 rounded-xl border border-emerald-800 text-center space-y-1">
                <div className="text-xs uppercase text-emerald-300 font-bold tracking-wider flex items-center justify-center gap-1">
                  <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                  Risparmio Sulla Rata Mensile
                </div>

                <div className="text-3xl font-extrabold text-emerald-300 font-mono tabular-nums">
                  -{surrogaCalculation.monthlySavings} € <span className="text-xs font-normal text-emerald-200">/mese</span>
                </div>

                <div className="text-xs text-emerald-200 font-medium">
                  Risparmi <strong className="font-mono text-white">-{surrogaCalculation.annualSavings.toLocaleString('it-IT')} €</strong> ogni anno!
                </div>
              </div>

              <div className="pt-2 text-xs text-emerald-200 flex justify-between items-center">
                <span>Risparmio Interessi Futuri:</span>
                <strong className="text-base sm:text-lg font-bold text-emerald-300 font-mono tabular-nums">
                  -{surrogaCalculation.totalInterestSavings.toLocaleString('it-IT')} €
                </strong>
              </div>
            </div>

            {/* Zero Cost Guarantee Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <h4 className="font-bold text-slate-900 text-sm">Surroga Mutuo 100% Gratuita per Legge</h4>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Spese Istruttoria:</span>
                  <strong className="text-emerald-700 font-mono font-bold">0 € (Gratis)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Perizia Immobile:</span>
                  <strong className="text-emerald-700 font-mono font-bold">0 € (Gratis)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Notaio Atto Surroga:</span>
                  <strong className="text-emerald-700 font-mono font-bold">0 € (A carico della banca)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Penali Estinzione:</span>
                  <strong className="text-emerald-700 font-mono font-bold">0 € (Vietate)</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onPrefeasibilityRequest({ loanAmount: surrogaResidualDebt, duration: surrogaNewYears, currentRate: surrogaCurrentRate, newRate: surrogaNewRate })}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer mt-1 shadow-sm"
              >
                <span>Richiedi Verifica Surroga Gratuita</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
