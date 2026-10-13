import React, { useState, useMemo } from 'react';
import { RefreshCw, ArrowRight, ShieldCheck, CheckCircle2, TrendingDown, PiggyBank, Sparkles, AlertCircle, Info, Calculator, ChevronDown, ChevronUp, Landmark, Shield, FileText } from 'lucide-react';
import { parseRate, parseCurrency } from '../utils/numberFormatters';

interface SurrogaCalculatorProps {
  onPrefeasibilityRequest?: (data: { loanAmount: number; duration: number; currentRate: number; newRate: number }) => void;
}

export const SurrogaCalculator: React.FC<SurrogaCalculatorProps> = ({ onPrefeasibilityRequest }) => {
  // Input states (stored as string inputs so backspace / clear / free writing works smoothly)
  const [propertyValueInput, setPropertyValueInput] = useState<string>('250000');
  const [residualDebtInput, setResidualDebtInput] = useState<string>('135000');
  const [currentRateInput, setCurrentRateInput] = useState<string>('4.60');
  const [remainingYears, setRemainingYears] = useState<number>(20);
  const [newDurationYears, setNewDurationYears] = useState<number>(20);
  const [sameDuration, setSameDuration] = useState<boolean>(true);
  const [rateType, setRateType] = useState<'fisso' | 'variabile'>('fisso');
  
  // Ancillary recurring costs (Incasso rata & Polizza)
  const [includeFees, setIncludeFees] = useState<boolean>(true);
  const [currentMonthlyFee, setCurrentMonthlyFee] = useState<number>(2.50); // Spesa incasso rata attuale
  const [currentInsuranceMonthly, setCurrentInsuranceMonthly] = useState<number>(18.00); // Polizza incendio attuale
  const [newMonthlyFee, setNewMonthlyFee] = useState<number>(1.50); // Spesa incasso rata nuova banca
  const [newInsuranceMonthly, setNewInsuranceMonthly] = useState<number>(12.00); // Polizza incendio nuova banca

  // UI state for detailed breakdown table
  const [showAmortizationTable, setShowAmortizationTable] = useState<boolean>(false);

  // Market rate benchmark options (Kìron Partner top market rates updated)
  const marketRates = {
    fisso: 2.75, // Miglior tasso fisso surroga di mercato
    variabile: 3.10 // Miglior tasso variabile surroga
  };

  const [customNewRateInput, setCustomNewRateInput] = useState<string>('2.75');
  const [useCustomNewRate, setUseCustomNewRate] = useState<boolean>(false);

  // Derived parsed numbers for calculations
  const propertyValue = parseCurrency(propertyValueInput, 250000);
  const residualDebt = parseCurrency(residualDebtInput, 135000);
  const currentRate = parseRate(currentRateInput, 4.60);
  const customNewRate = parseRate(customNewRateInput, 2.75);

  // Effective new rate used for calculations
  const effectiveNewRate = useCustomNewRate ? customNewRate : marketRates[rateType];

  // Effective duration for the new mortgage
  const effectiveNewYears = sameDuration ? remainingYears : newDurationYears;

  // Loan to Value ratio calculation
  const ltvRatio = useMemo(() => {
    if (!propertyValue || propertyValue <= 0) return 0;
    return Math.min(100, Math.round((residualDebt / propertyValue) * 100));
  }, [residualDebt, propertyValue]);

  // French Amortization Calculation Formula
  const calculation = useMemo(() => {
    const currentMonths = remainingYears * 12;
    const newMonths = effectiveNewYears * 12;

    // Monthly interest rates (TAN / 100 / 12)
    const currentMonthlyRate = currentRate / 100 / 12;
    const newMonthlyRate = effectiveNewRate / 100 / 12;

    // Current Monthly Base Pure Installment (Rata Pura Capitale + Interessi)
    let currentPureInstallment = 0;
    if (currentMonthlyRate > 0 && residualDebt > 0 && currentMonths > 0) {
      currentPureInstallment =
        (residualDebt * (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentMonths))) /
        (Math.pow(1 + currentMonthlyRate, currentMonths) - 1);
    } else if (residualDebt > 0 && currentMonths > 0) {
      currentPureInstallment = residualDebt / currentMonths;
    }

    // New Monthly Base Pure Installment
    let newPureInstallment = 0;
    if (newMonthlyRate > 0 && residualDebt > 0 && newMonths > 0) {
      newPureInstallment =
        (residualDebt * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newMonths))) /
        (Math.pow(1 + newMonthlyRate, newMonths) - 1);
    } else if (residualDebt > 0 && newMonths > 0) {
      newPureInstallment = residualDebt / newMonths;
    }

    // Monthly fees addition
    const currentTotalMonthlyFees = includeFees ? (currentMonthlyFee + currentInsuranceMonthly) : 0;
    const newTotalMonthlyFees = includeFees ? (newMonthlyFee + newInsuranceMonthly) : 0;

    const currentTotalInstallment = currentPureInstallment + currentTotalMonthlyFees;
    const newTotalInstallment = newPureInstallment + newTotalMonthlyFees;

    // Monthly savings
    const monthlySaving = currentTotalInstallment - newTotalInstallment;

    // Total Repayments
    const currentTotalRepaid = (currentPureInstallment * currentMonths) + (currentTotalMonthlyFees * currentMonths);
    const newTotalRepaid = (newPureInstallment * newMonths) + (newTotalMonthlyFees * newMonths);

    // Total Interest & Fees
    const currentTotalInterest = Math.max(0, (currentPureInstallment * currentMonths) - residualDebt);
    const newTotalInterest = Math.max(0, (newPureInstallment * newMonths) - residualDebt);

    const currentTotalFeesOverTime = currentTotalMonthlyFees * currentMonths;
    const newTotalFeesOverTime = newTotalMonthlyFees * newMonths;

    const totalInterestSaving = Math.max(0, currentTotalInterest - newTotalInterest);
    const netTotalSavingOverTime = currentTotalRepaid - newTotalRepaid;

    const percentageReduction = currentTotalInterest > 0
      ? Math.round((totalInterestSaving / currentTotalInterest) * 100)
      : 0;

    // Indicative TAEG estimation
    const currentTaegIndicative = currentRate + (includeFees ? ((currentTotalMonthlyFees * 12) / residualDebt) * 100 : 0);
    const newTaegIndicative = effectiveNewRate + (includeFees ? ((newTotalMonthlyFees * 12) / residualDebt) * 100 : 0);

    // Year by Year Amortization Projection for detailed breakdown
    const yearlyProjection = [];
    const maxYearsToProject = Math.max(remainingYears, effectiveNewYears);
    
    let currentBalance = residualDebt;
    let newBalance = residualDebt;
    let currentCumulInterest = 0;
    let newCumulInterest = 0;

    for (let yr = 1; yr <= maxYearsToProject; yr++) {
      let yrCurrentInterest = 0;
      let yrNewInterest = 0;

      // 12 months for current loan
      for (let m = 1; m <= 12; m++) {
        if (currentBalance > 0 && yr <= remainingYears) {
          const interestMonth = currentBalance * currentMonthlyRate;
          const principalMonth = Math.min(currentBalance, currentPureInstallment - interestMonth);
          yrCurrentInterest += interestMonth;
          currentBalance = Math.max(0, currentBalance - principalMonth);
        }
      }

      // 12 months for new loan
      for (let m = 1; m <= 12; m++) {
        if (newBalance > 0 && yr <= effectiveNewYears) {
          const interestMonth = newBalance * newMonthlyRate;
          const principalMonth = Math.min(newBalance, newPureInstallment - interestMonth);
          yrNewInterest += interestMonth;
          newBalance = Math.max(0, newBalance - principalMonth);
        }
      }

      currentCumulInterest += yrCurrentInterest;
      newCumulInterest += yrNewInterest;

      yearlyProjection.push({
        year: yr,
        currentBalance: Math.round(currentBalance),
        newBalance: Math.round(newBalance),
        yrCurrentInterest: Math.round(yrCurrentInterest),
        yrNewInterest: Math.round(yrNewInterest),
        cumulSaving: Math.round(currentCumulInterest - newCumulInterest)
      });
    }

    return {
      currentPureInstallment: Math.round(currentPureInstallment),
      newPureInstallment: Math.round(newPureInstallment),
      currentTotalInstallment: Math.round(currentTotalInstallment),
      newTotalInstallment: Math.round(newTotalInstallment),
      monthlySaving: Math.round(monthlySaving),
      currentTotalInterest: Math.round(currentTotalInterest),
      newTotalInterest: Math.round(newTotalInterest),
      totalInterestSaving: Math.round(totalInterestSaving),
      netTotalSavingOverTime: Math.round(netTotalSavingOverTime),
      percentageReduction,
      currentTotalFeesOverTime: Math.round(currentTotalFeesOverTime),
      newTotalFeesOverTime: Math.round(newTotalFeesOverTime),
      currentTaegIndicative: Number(currentTaegIndicative.toFixed(2)),
      newTaegIndicative: Number(newTaegIndicative.toFixed(2)),
      yearlyProjection
    };
  }, [
    residualDebt,
    currentRate,
    remainingYears,
    effectiveNewRate,
    effectiveNewYears,
    includeFees,
    currentMonthlyFee,
    currentInsuranceMonthly,
    newMonthlyFee,
    newInsuranceMonthly
  ]);

  const handleConsultation = () => {
    if (onPrefeasibilityRequest) {
      onPrefeasibilityRequest({
        loanAmount: residualDebt,
        duration: effectiveNewYears,
        currentRate,
        newRate: effectiveNewRate
      });
    } else {
      const el = document.getElementById('contatto');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="calcolatore-surroga" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative ambient lighting backdrop */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            <span>Simulatore Ufficiale Surroga Mutuo</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300 font-normal">Legge Bersani (L. 40/2007)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Quanto puoi risparmiare surrogando il tuo mutuo?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Simulatore finanziario avanzato basato sul <strong>Piano d&apos;Ammortamento alla Francese</strong>. Calcola al centesimo il risparmio sulla rata mensile, l&apos;impatto delle spese accessorie e l&apos;abbattimento totale degli interessi residui.
          </p>
        </div>

        {/* Main Grid: Inputs (Left) & Results/Comparison (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 bg-slate-800/90 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-400" />
                Parametri del Mutuo Attuale
              </h3>
              <span className="text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700">
                Calcolo Certificato
              </span>
            </div>

            {/* Input 1: Valore Immobile & LTV Indicator */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="property-val-input" className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-emerald-400" />
                  Valore Stimato dell&apos;Immobile
                </label>
                <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 focus-within:border-emerald-500">
                  <span className="text-xs text-slate-400 font-bold">€</span>
                  <input
                    id="property-val-input"
                    type="text"
                    inputMode="numeric"
                    value={propertyValueInput}
                    onChange={(e) => setPropertyValueInput(e.target.value)}
                    onBlur={() => {
                      if (!propertyValueInput.trim()) setPropertyValueInput('250000');
                    }}
                    className="w-32 bg-transparent text-white font-mono font-bold text-right text-base focus:outline-none"
                    placeholder="250000"
                  />
                </div>
              </div>

              <input
                type="range"
                min={50000}
                max={800000}
                step={10000}
                value={propertyValue || 0}
                onChange={(e) => setPropertyValueInput(e.target.value)}
                className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Input 2: Debito Residuo & LTV Badge */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <label htmlFor="residual-debt-input" className="font-semibold text-slate-200">
                    Debito Residuo da Surrogare
                  </label>
                  {ltvRatio > 0 && (
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      ltvRatio <= 60 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : ltvRatio <= 80 
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      LTV: {ltvRatio}% {ltvRatio <= 60 ? '⚡ Tasso Ottimale' : ltvRatio <= 80 ? '✓ Standard' : '⚠️ LTV Alto'}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 focus-within:border-emerald-500">
                  <span className="text-xs text-slate-400 font-bold">€</span>
                  <input
                    id="residual-debt-input"
                    type="text"
                    inputMode="numeric"
                    value={residualDebtInput}
                    onChange={(e) => setResidualDebtInput(e.target.value)}
                    onBlur={() => {
                      if (!residualDebtInput.trim()) setResidualDebtInput('135000');
                    }}
                    className="w-28 bg-transparent text-white font-mono font-bold text-right text-base focus:outline-none"
                    placeholder="135000"
                  />
                </div>
              </div>

              <input
                type="range"
                min={20000}
                max={500000}
                step={5000}
                value={residualDebt || 0}
                onChange={(e) => setResidualDebtInput(e.target.value)}
                className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
              />

              {/* Quick Presets for Residual Debt */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[80000, 120000, 135000, 160000, 220000, 300000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setResidualDebtInput(preset.toString())}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      residualDebt === preset
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    € {preset.toLocaleString('it-IT')}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Tasso Attuale (% TAN) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="current-rate-input" className="font-semibold text-slate-200">
                  Tasso Attuale (% TAN Nominale)
                </label>
                <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 focus-within:border-emerald-500">
                  <input
                    id="current-rate-input"
                    type="text"
                    inputMode="decimal"
                    value={currentRateInput}
                    onChange={(e) => setCurrentRateInput(e.target.value)}
                    onBlur={() => {
                      if (!currentRateInput.trim()) setCurrentRateInput('4.60');
                    }}
                    className="w-20 bg-transparent text-white font-mono font-bold text-right text-base focus:outline-none"
                  />
                  <span className="text-xs text-slate-400 font-bold">%</span>
                </div>
              </div>

              <input
                type="range"
                min={1.0}
                max={7.5}
                step={0.05}
                value={currentRate || 0}
                onChange={(e) => setCurrentRateInput(e.target.value)}
                className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
              />

              {/* Quick Presets for Current Rate */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[2.60, 2.85, 3.20, 3.80, 4.20, 4.60].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setCurrentRateInput(preset.toString())}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      currentRate === preset
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {preset.toFixed(2)}% TAN
                  </button>
                ))}
              </div>

              {/* Informative Note for Late 2025 / Promo Contracts (e.g. ING) */}
              <div className="text-[11px] text-slate-300 bg-slate-900/90 border border-slate-700/80 p-2.5 rounded-lg flex items-start gap-2 mt-2">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Hai stipulato a fine 2025 (es. con ING o banche in promo)?</strong> I mutui stipulati a fine 2025 beneficiavano già di tassi molto bassi (~2.50% - 2.85%). Se il tuo tasso rientra in questi valori, inseriscilo qui per confrontarlo con le migliori offerte di surroga attuali.
                </span>
              </div>
            </div>

            {/* Input 4: Durata Rimanente & Nuova Durata Option */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="remaining-years-input" className="font-semibold text-slate-200">
                  Durata Rimanente Attuale (Anni / Mesi)
                </label>
                <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 focus-within:border-emerald-500">
                  <input
                    id="remaining-years-input"
                    type="number"
                    min={3}
                    max={30}
                    step={1}
                    value={remainingYears}
                    onChange={(e) => {
                      const val = Math.max(1, Number(e.target.value));
                      setRemainingYears(val);
                      if (sameDuration) setNewDurationYears(val);
                    }}
                    className="w-16 bg-transparent text-white font-mono font-bold text-right text-base focus:outline-none"
                  />
                  <span className="text-xs text-slate-400 font-bold">Anni</span>
                </div>
              </div>

              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={remainingYears}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setRemainingYears(val);
                  if (sameDuration) setNewDurationYears(val);
                }}
                className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
              />

              {/* Same Duration vs Change Duration Option */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/80 space-y-2 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Vuoi mantenere la stessa durata o modificarla?</span>
                  <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                    <button
                      type="button"
                      onClick={() => {
                        setSameDuration(true);
                        setNewDurationYears(remainingYears);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                        sameDuration ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Stessa Durata ({remainingYears}a)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSameDuration(false)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                        !sameDuration ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Nuova Durata
                    </button>
                  </div>
                </div>

                {!sameDuration && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <span className="text-emerald-400 font-semibold">Durata per il Nuovo Mutuo:</span>
                    <div className="flex items-center gap-2">
                      <select
                        value={newDurationYears}
                        onChange={(e) => setNewDurationYears(Number(e.target.value))}
                        className="bg-slate-800 text-white font-mono font-bold px-3 py-1 rounded border border-slate-600 focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        {[5, 10, 12, 15, 18, 20, 22, 25, 28, 30].map((yr) => (
                          <option key={yr} value={yr}>
                            {yr} Anni ({yr * 12} rate)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Benchmark / Custom Target Rate Selection */}
            <div className="pt-4 border-t border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  Tasso di Mercato Proposto per la Surroga
                </span>
                <button
                  type="button"
                  onClick={() => setUseCustomNewRate(!useCustomNewRate)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 underline font-medium cursor-pointer"
                >
                  {useCustomNewRate ? 'Usa Tasso di Mercato Kìron' : 'Personalizza Tasso Target'}
                </button>
              </div>

              {!useCustomNewRate ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRateType('fisso')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      rateType === 'fisso'
                        ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-900/60 border-slate-700/80 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-xs text-slate-400 font-medium">Top Tasso Fisso Surroga</div>
                    <div className="text-2xl font-extrabold font-mono text-emerald-400 mt-1">
                      {marketRates.fisso.toFixed(2)}% <span className="text-xs font-normal text-slate-300">TAN</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Aggiornato alle convenzioni Kìron</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRateType('variabile')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      rateType === 'variabile'
                        ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-900/60 border-slate-700/80 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-xs text-slate-400 font-medium">Top Tasso Variabile Surroga</div>
                    <div className="text-2xl font-extrabold font-mono text-emerald-400 mt-1">
                      {marketRates.variabile.toFixed(2)}% <span className="text-xs font-normal text-slate-300">TAN</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Indicizzato Euribor 1M/3M</div>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-700">
                  <label htmlFor="custom-new-rate-input" className="text-xs text-slate-300 font-medium">Nuovo Tasso Proposto (% TAN):</label>
                  <input
                    id="custom-new-rate-input"
                    type="text"
                    inputMode="decimal"
                    value={customNewRateInput}
                    onChange={(e) => setCustomNewRateInput(e.target.value)}
                    onBlur={() => {
                      if (!customNewRateInput.trim()) setCustomNewRateInput('2.75');
                    }}
                    className="w-20 bg-slate-800 text-emerald-400 font-mono font-bold text-center px-2 py-1.5 rounded border border-slate-700"
                  />
                  <span className="text-xs text-slate-400 font-mono">% TAN</span>
                </div>
              )}
            </div>

            {/* Ancillary Costs Toggle (Incasso rata & Polizza Incendio) */}
            <div className="pt-4 border-t border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-200">
                  <input
                    type="checkbox"
                    checked={includeFees}
                    onChange={(e) => setIncludeFees(e.target.checked)}
                    className="rounded accent-emerald-500 w-4 h-4 cursor-pointer"
                  />
                  <span>Includi Spese Accessorie Ricorrenti (Spesa Incasso Rata + Polizza Incendio)</span>
                </label>
              </div>

              {includeFees && (
                <div className="grid grid-cols-2 gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-700/80 text-xs">
                  <div className="space-y-1.5">
                    <span className="text-slate-400 font-semibold block">Spese Mutuo Attuale:</span>
                    <div className="flex justify-between items-center text-[11px] text-slate-300">
                      <span>Incasso Rata:</span>
                      <span className="font-mono text-white">€{currentMonthlyFee.toFixed(2)}/m</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-slate-300">
                      <span>Polizza Incendio:</span>
                      <span className="font-mono text-white">€{currentInsuranceMonthly.toFixed(2)}/m</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 border-l border-slate-700/80 pl-3">
                    <span className="text-emerald-400 font-semibold block">Spese Nuova Banca:</span>
                    <div className="flex justify-between items-center text-[11px] text-slate-300">
                      <span>Incasso Rata:</span>
                      <span className="font-mono text-emerald-400">€{newMonthlyFee.toFixed(2)}/m</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-slate-300">
                      <span>Polizza Incendio:</span>
                      <span className="font-mono text-emerald-400">€{newInsuranceMonthly.toFixed(2)}/m</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Calculated Savings Summary Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Result Spotlight Box */}
            <div className="bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
              
              {/* Highlight Badge */}
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Risultato Simulazione
                </span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-semibold px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  0 € Spese Notarili
                </span>
              </div>

              {/* Monthly Savings Big Number or Current Low Rate Notice */}
              {calculation.monthlySaving > 0 ? (
                <>
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                      Risparmio Effettivo Sulla Rata Mensile
                    </div>
                    <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono tracking-tight flex items-baseline justify-center sm:justify-start gap-2">
                      <span>- {calculation.monthlySaving.toLocaleString('it-IT')} €</span>
                      <span className="text-sm font-sans font-normal text-slate-300">/ mese</span>
                    </div>
                    <div className="text-xs text-slate-400 pt-1">
                      Pari a un risparmio annuo di <strong className="text-emerald-300">€ {(calculation.monthlySaving * 12).toLocaleString('it-IT')}</strong>
                    </div>
                  </div>

                  {/* Total Interest Savings Box */}
                  <div className="bg-emerald-950/50 border border-emerald-500/30 rounded-xl p-4 space-y-1.5">
                    <div className="text-xs text-emerald-300 font-medium flex items-center gap-1.5">
                      <PiggyBank className="w-4 h-4 text-emerald-400" />
                      <span>Risparmio Totale Interessi in {effectiveNewYears} Anni</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                      + {calculation.totalInterestSaving.toLocaleString('it-IT')} €
                    </div>
                    <div className="text-xs text-emerald-400/90 flex items-center justify-between">
                      <span>Abbattimento interessi residui:</span>
                      <strong className="text-white text-sm">-{calculation.percentageReduction}%</strong>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-blue-950/60 border border-blue-500/40 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>Tasso Attuale Già Ottimale ({currentRate.toFixed(2)}%)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Complimenti! Il tuo tasso attuale (<strong>{currentRate.toFixed(2)}% TAN</strong>) è già inferiore o allineato al miglior tasso di surroga di mercato attuale (<strong>{effectiveNewRate.toFixed(2)}% TAN</strong>).
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Se hai stipulato il mutuo a <strong>fine 2025 (es. con ING o altre banche in promozione)</strong>, ti sei già assicurato una delle condizioni più basse del mercato recente. In questo momento la surroga non porterebbe un risparmio sulla rata.
                  </p>
                  <div className="pt-2 border-t border-blue-800/60 text-xs text-blue-200 font-medium flex justify-between items-center">
                    <span>Differenza rata stimata:</span>
                    <span className="font-mono font-bold text-white">
                      {calculation.monthlySaving === 0 ? '0 €/mese (Pari merito)' : `+${Math.abs(calculation.monthlySaving).toLocaleString('it-IT')} €/m con surroga`}
                    </span>
                  </div>
                </div>
              )}

              {/* Comparison Table Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs border-t border-b border-slate-700/80 py-4">
                <div className="space-y-1.5 pr-2 border-r border-slate-700/80">
                  <div className="text-slate-400 font-semibold">Mutuo Attuale</div>
                  <div className="text-base font-bold text-slate-200 font-mono">
                    {calculation.currentTotalInstallment.toLocaleString('it-IT')} €<span className="text-[11px] text-slate-400 font-sans">/m</span>
                  </div>
                  <div className="text-slate-400">TAN {currentRate.toFixed(2)}% {includeFees && <span className="text-[10px] text-slate-500">(TAEG ~{calculation.currentTaegIndicative}%)</span>}</div>
                  <div className="text-slate-400">Interessi tot: €{calculation.currentTotalInterest.toLocaleString('it-IT')}</div>
                </div>

                <div className="space-y-1.5 pl-2">
                  <div className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span>Nuovo Mutuo Surroga</span>
                    <TrendingDown className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-base font-bold text-emerald-400 font-mono">
                    {calculation.newTotalInstallment.toLocaleString('it-IT')} €<span className="text-[11px] text-slate-400 font-sans">/m</span>
                  </div>
                  <div className="text-slate-300">TAN {effectiveNewRate.toFixed(2)}% {includeFees && <span className="text-[10px] text-emerald-400">(TAEG ~{calculation.newTaegIndicative}%)</span>}</div>
                  <div className="text-slate-300">Interessi tot: €{calculation.newTotalInterest.toLocaleString('it-IT')}</div>
                </div>
              </div>

              {/* Toggle detailed year-by-year amortization table */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowAmortizationTable(!showAmortizationTable)}
                  className="w-full flex items-center justify-between text-xs text-slate-300 bg-slate-900/90 border border-slate-700/80 px-3.5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer font-medium"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>{showAmortizationTable ? 'Nascondi Prospetto Dettagliato' : 'Mostra Prospetto Anno per Anno'}</span>
                  </span>
                  {showAmortizationTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showAmortizationTable && (
                  <div className="mt-3 bg-slate-950 p-3 rounded-xl border border-slate-800 overflow-x-auto text-[11px] max-h-60 overflow-y-auto">
                    <table className="w-full text-left font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="pb-1.5">Anno</th>
                          <th className="pb-1.5">Debito Att.</th>
                          <th className="pb-1.5">Debito Nuov.</th>
                          <th className="pb-1.5 text-right">Risp. Cumulato</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {calculation.yearlyProjection.map((row) => (
                          <tr key={row.year} className="hover:bg-slate-900/50">
                            <td className="py-1 font-sans text-slate-400">Anno {row.year}</td>
                            <td className="py-1">€{row.currentBalance.toLocaleString('it-IT')}</td>
                            <td className="py-1 text-emerald-400">€{row.newBalance.toLocaleString('it-IT')}</td>
                            <td className="py-1 text-right font-bold text-emerald-400">
                              +€{row.cumulSaving.toLocaleString('it-IT')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Zero-Cost Statutory Guarantee (Legge Bersani) */}
              <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Garanzia di Gratuità Legge Bersani (Art. 120-quater TUB)
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Nessuna penale di estinzione anticipata, nessun costo notarile, nessun costo di perizia o istruttoria. La surroga è un diritto gratuito del consumatore sancito dalla legge italiana.
                </p>
              </div>

              {/* Disclaimer Notice on Calculation Veracity & Estimates */}
              <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Trasparenza sui Dati:</strong> Le simulazioni e i calcoli del risparmio sono stime orientative basate sulle condizioni di mercato attuali. I tassi definitivi e le condizioni contrattuali saranno confermati dall'istituto di credito in sede di istruttoria.
                </p>
              </div>

              {/* Primary Call To Action */}
              <button
                type="button"
                onClick={handleConsultation}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/20 text-sm sm:text-base cursor-pointer"
              >
                <span>
                  {calculation.monthlySaving > 0
                    ? 'Richiedi Fattibilità Surroga Gratuita con Marianna'
                    : 'Attiva il Monitoraggio Gratuito Tassi Futuri con Marianna'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-slate-400 leading-tight">
                Consulenza svolta da Marianna Di Martino per Kìron Partner S.p.A. - Mediatore Creditizio iscritto OAM n. M39.
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
