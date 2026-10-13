import React, { useState, useMemo } from 'react';
import { Calculator, ShieldAlert, CheckCircle, AlertTriangle, ArrowRight, RefreshCw, PiggyBank, ArrowDownRight, ShieldCheck, Info, Landmark } from 'lucide-react';
import { parseRate, parseCurrency } from '../utils/numberFormatters';

interface MortgageCalculatorProps {
  onPrefeasibilityRequest: (data: { propertyValue: number; loanAmount: number; duration: number; selectedBank?: any }) => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ onPrefeasibilityRequest }) => {
  // Mode: 'purchase' (Acquisto Casa) vs 'surroga' (Surroga / Rottamazione Mutuo)
  const [calcMode, setCalcMode] = useState<'purchase' | 'surroga'>('purchase');

  // --- ACQUISTO CASA INPUT STATES (Stringhe per permettere cancellazione libera e digitazione esatta) ---
  const [propertyPriceInput, setPropertyPriceInput] = useState<string>('220000');
  const [downPaymentInput, setDownPaymentInput] = useState<string>('50000');
  const [durationYears, setDurationYears] = useState<number>(25);
  const [annualRateInput, setAnnualRateInput] = useState<string>('2.85'); // Standard fixed TAN
  const [rateType, setRateType] = useState<'fisso' | 'variabile'>('fisso');
  const [isFirstHome, setIsFirstHome] = useState<boolean>(true);
  const [isFromBuilder, setIsFromBuilder] = useState<boolean>(false);
  const [includeAgency, setIncludeAgency] = useState<boolean>(true);
  const [monthlyIncomeInput, setMonthlyIncomeInput] = useState<string>('2800');
  const [existingDebtsInput, setExistingDebtsInput] = useState<string>('0');

  // --- SURROGA INPUT STATES ---
  const [surrogaResidualDebtInput, setSurrogaResidualDebtInput] = useState<string>('135000');
  const [surrogaPropertyValueInput, setSurrogaPropertyValueInput] = useState<string>('200000');
  const [surrogaCurrentRateInput, setSurrogaCurrentRateInput] = useState<string>('4.60');
  const [surrogaRemainingYears, setSurrogaRemainingYears] = useState<number>(20);
  const [surrogaNewRateInput, setSurrogaNewRateInput] = useState<string>('2.80');
  const [surrogaNewYears, setSurrogaNewYears] = useState<number>(20);

  // Valori numerici calcolati in tempo reale dai campi di testo
  const propertyPrice = parseCurrency(propertyPriceInput, 220000);
  const downPayment = parseCurrency(downPaymentInput, 50000);
  const annualRate = parseRate(annualRateInput, 2.85);
  const monthlyIncome = parseCurrency(monthlyIncomeInput, 2800);
  const existingDebts = parseCurrency(existingDebtsInput, 0);

  const surrogaResidualDebt = parseCurrency(surrogaResidualDebtInput, 135000);
  const surrogaPropertyValue = parseCurrency(surrogaPropertyValueInput, 200000);
  const surrogaCurrentRate = parseRate(surrogaCurrentRateInput, 4.60);
  const surrogaNewRate = parseRate(surrogaNewRateInput, 2.80);

  // Calcolo importo mutuo e LTV per Acquisto
  const loanAmount = Math.max(0, propertyPrice - downPayment);
  const ltv = propertyPrice > 0 ? (loanAmount / propertyPrice) * 100 : 0;

  // Calcolo Rata mensile Acquisto (Ammortamento alla Francese)
  const purchaseCalculation = useMemo(() => {
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = durationYears * 12;

    let monthlyInstallment = 0;
    if (monthlyRate > 0 && loanAmount > 0) {
      monthlyInstallment =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else if (loanAmount > 0 && totalMonths > 0) {
      monthlyInstallment = loanAmount / totalMonths;
    }

    const totalRepaid = monthlyInstallment * totalMonths;
    const totalInterest = Math.max(0, totalRepaid - loanAmount);

    // Stress test per Tasso Variabile (+1.5% Euribor)
    const stressedRate = annualRate + 1.5;
    const stressedMonthlyRate = stressedRate / 100 / 12;
    const stressedInstallment =
      stressedMonthlyRate > 0 && loanAmount > 0
        ? (loanAmount * (stressedMonthlyRate * Math.pow(1 + stressedMonthlyRate, totalMonths))) /
          (Math.pow(1 + stressedMonthlyRate, totalMonths) - 1)
        : monthlyInstallment;

    // Debt to income ratio (Rapporto Rata/Reddito)
    const totalMonthlyCommitment = monthlyInstallment + existingDebts;
    const dtiRatio = monthlyIncome > 0 ? (totalMonthlyCommitment / monthlyIncome) * 100 : 0;

    let sustainability: 'ottimale' | 'accettabile' | 'critico' = 'ottimale';
    if (dtiRatio > 35) {
      sustainability = 'critico';
    } else if (dtiRatio > 30) {
      sustainability = 'accettabile';
    }

    return {
      monthlyInstallment: Math.round(monthlyInstallment),
      totalRepaid: Math.round(totalRepaid),
      totalInterest: Math.round(totalInterest),
      stressedInstallment: Math.round(stressedInstallment),
      dtiRatio: Math.round(dtiRatio),
      sustainability
    };
  }, [loanAmount, durationYears, annualRate, monthlyIncome, existingDebts]);

  // Calcolo dei Costi Accessori Acquisto Casa in Italia
  const ancillaryCosts = useMemo(() => {
    const estimatedCadastralValue = propertyPrice * 0.55;
    let purchaseTax = 0;
    if (isFromBuilder) {
      purchaseTax = propertyPrice * (isFirstHome ? 0.04 : 0.10) + 600;
    } else {
      purchaseTax = Math.max(1000, estimatedCadastralValue * (isFirstHome ? 0.02 : 0.09)) + 100;
    }

    const substituteTax = loanAmount * (isFirstHome ? 0.0025 : 0.02);
    let notaryFee = 2400;
    if (propertyPrice > 250000) notaryFee = 2900;
    if (propertyPrice > 350000) notaryFee = 3500;

    const bankFees = 850 + 320;
    const agencyFee = includeAgency ? propertyPrice * 0.03 * 1.22 : 0;

    const totalAncillary = Math.round(purchaseTax + substituteTax + notaryFee + bankFees + agencyFee);
    const totalCashNeeded = Math.round(downPayment + totalAncillary);

    return {
      purchaseTax: Math.round(purchaseTax),
      substituteTax: Math.round(substituteTax),
      notaryFee: Math.round(notaryFee),
      bankFees: Math.round(bankFees),
      agencyFee: Math.round(agencyFee),
      totalAncillary,
      totalCashNeeded
    };
  }, [propertyPrice, downPayment, loanAmount, isFirstHome, isFromBuilder, includeAgency]);

  // --- CALCOLO SIMULATORE SURROGA ---
  const surrogaCalculation = useMemo(() => {
    const oldMonthlyRate = surrogaCurrentRate / 100 / 12;
    const oldTotalMonths = surrogaRemainingYears * 12;
    let oldMonthlyInstallment = 0;
    if (oldMonthlyRate > 0 && surrogaResidualDebt > 0 && oldTotalMonths > 0) {
      oldMonthlyInstallment =
        (surrogaResidualDebt * (oldMonthlyRate * Math.pow(1 + oldMonthlyRate, oldTotalMonths))) /
        (Math.pow(1 + oldMonthlyRate, oldTotalMonths) - 1);
    }
    const oldTotalRepayment = oldMonthlyInstallment * oldTotalMonths;
    const oldTotalInterest = Math.max(0, oldTotalRepayment - surrogaResidualDebt);

    const newMonthlyRate = surrogaNewRate / 100 / 12;
    const newTotalMonths = surrogaNewYears * 12;
    let newMonthlyInstallment = 0;
    if (newMonthlyRate > 0 && surrogaResidualDebt > 0 && newTotalMonths > 0) {
      newMonthlyInstallment =
        (surrogaResidualDebt * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newTotalMonths))) /
        (Math.pow(1 + newMonthlyRate, newTotalMonths) - 1);
    }
    const newTotalRepayment = newMonthlyInstallment * newTotalMonths;
    const newTotalInterest = Math.max(0, newTotalRepayment - surrogaResidualDebt);

    const monthlySavings = Math.round(oldMonthlyInstallment - newMonthlyInstallment);
    const annualSavings = Math.round(monthlySavings * 12);
    const totalInterestSavings = Math.round(oldTotalInterest - newTotalInterest);

    const surrogaLtv = surrogaPropertyValue > 0 ? (surrogaResidualDebt / surrogaPropertyValue) * 100 : 0;

    return {
      oldMonthlyInstallment: Math.round(oldMonthlyInstallment),
      newMonthlyInstallment: Math.round(newMonthlyInstallment),
      monthlySavings,
      annualSavings,
      totalInterestSavings,
      oldTotalInterest: Math.round(oldTotalInterest),
      newTotalInterest: Math.round(newTotalInterest),
      surrogaLtv: Math.round(surrogaLtv)
    };
  }, [surrogaResidualDebt, surrogaPropertyValue, surrogaCurrentRate, surrogaRemainingYears, surrogaNewRate, surrogaNewYears]);

  return (
    <section id="calcolatore" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <span>Strumento Finanziario Avanzato</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-bold">Stime Indicative Ufficiali</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simula il tuo Mutuo: Scrivi la tua Cifra o usa il Cursore
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Digita liberamente qualsiasi importo nel campo di testo (es. <strong>135.000 €</strong>, <strong>180.000 €</strong>) oppure fai scorrere i cursori. Cancellando il testo puoi inserire qualsiasi cifra senza vincoli.
          </p>
        </div>

        {/* Calculator Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 mb-10 bg-slate-200/80 p-1.5 rounded-2xl w-fit">
          <button
            type="button"
            onClick={() => setCalcMode('purchase')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer ${
              calcMode === 'purchase'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4 text-slate-700" />
            <span>Nuovo Mutuo Acquisto Casa</span>
          </button>

          <button
            type="button"
            onClick={() => setCalcMode('surroga')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer ${
              calcMode === 'surroga'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            <span>Simulatore Surroga & Risparmio (Costo Zero)</span>
          </button>
        </div>

        {/* --- MODE 1: ACQUISTO CASA --- */}
        {calcMode === 'purchase' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Input Controls Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-slate-700" />
                  1. Dati Immobile e Finanziamento
                </span>
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-semibold">
                  Scrittura Libera Attiva
                </span>
              </h3>

              {/* Prezzo Immobile con Campo Input Editabile e Libero */}
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <label htmlFor="property-price-input" className="font-semibold text-slate-800">
                    Valore dell'Immobile (€)
                  </label>
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1 focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900">
                    <span className="text-xs text-slate-500 font-bold">€</span>
                    <input
                      id="property-price-input"
                      type="text"
                      inputMode="numeric"
                      value={propertyPriceInput}
                      onChange={(e) => setPropertyPriceInput(e.target.value)}
                      onBlur={() => {
                        if (!propertyPriceInput.trim()) setPropertyPriceInput('220000');
                      }}
                      className="w-32 bg-transparent text-slate-900 font-mono font-bold text-right text-base focus:outline-none"
                      placeholder="es. 135000"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={30000}
                  max={800000}
                  step={5000}
                  value={propertyPrice || 0}
                  onChange={(e) => setPropertyPriceInput(e.target.value)}
                  className="w-full accent-slate-900 cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[120000, 135000, 180000, 220000, 300000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setPropertyPriceInput(amt.toString())}
                      className={`px-2 py-0.5 text-xs rounded border transition-colors cursor-pointer ${
                        propertyPrice === amt
                          ? 'bg-slate-900 text-white font-bold border-slate-900'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                      }`}
                    >
                      € {amt.toLocaleString('it-IT')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Anticipo Disponibile con Campo Input Editabile */}
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <label htmlFor="down-payment-input" className="font-semibold text-slate-800">
                    Anticipo / Risparmi Iniziali (€)
                  </label>
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1 focus-within:border-slate-900 focus-within:ring-1 focus-within:ring-slate-900">
                    <span className="text-xs text-slate-500 font-bold">€</span>
                    <input
                      id="down-payment-input"
                      type="text"
                      inputMode="numeric"
                      value={downPaymentInput}
                      onChange={(e) => setDownPaymentInput(e.target.value)}
                      onBlur={() => {
                        if (!downPaymentInput.trim()) setDownPaymentInput('0');
                      }}
                      className="w-28 bg-transparent text-slate-900 font-mono font-bold text-right text-base focus:outline-none"
                      placeholder="es. 50000"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={Math.max(propertyPrice, 100000)}
                  step={5000}
                  value={downPayment || 0}
                  onChange={(e) => setDownPaymentInput(e.target.value)}
                  className="w-full accent-slate-900 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0 € (Mutuo 100% Consap)</span>
                  <span>LTV Richiesto: <strong className="font-mono text-slate-800">{ltv.toFixed(1)}%</strong></span>
                </div>
              </div>

              {/* Importo Mutuo & Durata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-medium">Importo Mutuo Calcolato</div>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">
                    {loanAmount.toLocaleString('it-IT')} €
                  </div>
                </div>

                <div>
                  <label htmlFor="duration-select" className="block text-xs font-semibold text-slate-700 mb-1">Durata Ammortamento</label>
                  <select
                    id="duration-select"
                    value={durationYears}
                    onChange={(e) => setDurationYears(parseInt(e.target.value, 10))}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value={10}>10 Anni (120 rate)</option>
                    <option value={15}>15 Anni (180 rate)</option>
                    <option value={20}>20 Anni (240 rate)</option>
                    <option value={25}>25 Anni (300 rate)</option>
                    <option value={30}>30 Anni (360 rate)</option>
                  </select>
                </div>
              </div>

              {/* Tipo di Tasso & Tasso Annuo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tipologia Tasso</label>
                  <div className="flex p-1 bg-slate-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setRateType('fisso');
                        setAnnualRateInput('2.85');
                      }}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                        rateType === 'fisso' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Fisso (IRS)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRateType('variabile');
                        setAnnualRateInput('3.20');
                      }}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                        rateType === 'variabile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Variabile (Euribor)
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="tan-rate-input" className="block text-xs font-semibold text-slate-700 mb-1">Tasso Annuo Nominale (TAN %)</label>
                  <div className="flex items-center gap-2">
                    <input
                      id="tan-rate-input"
                      type="text"
                      inputMode="decimal"
                      value={annualRateInput}
                      onChange={(e) => setAnnualRateInput(e.target.value)}
                      onBlur={() => {
                        if (!annualRateInput.trim()) setAnnualRateInput('2.85');
                      }}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-900 font-mono tabular-nums focus:outline-none"
                    />
                    <span className="text-sm font-bold text-slate-600">%</span>
                  </div>
                </div>
              </div>

              {/* Sezione Parametri Fiscali */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Parametri Fiscali e Costi Notarili</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input
                      type="radio"
                      name="homeType"
                      checked={isFirstHome}
                      onChange={() => setIsFirstHome(true)}
                      className="text-slate-900"
                    />
                    <span>Prima Casa (Agevolata)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input
                      type="radio"
                      name="homeType"
                      checked={!isFirstHome}
                      onChange={() => setIsFirstHome(false)}
                      className="text-slate-900"
                    />
                    <span>Seconda Casa</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={includeAgency}
                      onChange={(e) => setIncludeAgency(e.target.checked)}
                      className="text-slate-900 rounded-xs"
                    />
                    <span>Con Agenzia Imm. (3%)</span>
                  </label>
                </div>
              </div>

              {/* Sezione Verifica Reddito */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-sm font-bold text-slate-900">2. Verifica Sostenibilità Rata / Reddito</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="monthly-income-input" className="block text-xs font-semibold text-slate-700 mb-1">Reddito Netto Mensile Nucleo</label>
                    <div className="relative">
                      <input
                        id="monthly-income-input"
                        type="text"
                        inputMode="numeric"
                        value={monthlyIncomeInput}
                        onChange={(e) => setMonthlyIncomeInput(e.target.value)}
                        onBlur={() => {
                          if (!monthlyIncomeInput.trim()) setMonthlyIncomeInput('2800');
                        }}
                        className="w-full bg-white border border-slate-300 rounded-lg pl-3 pr-8 py-2 text-sm font-bold text-slate-900 font-mono tabular-nums focus:outline-none"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-semibold">€/mese</span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="existing-debts-input" className="block text-xs font-semibold text-slate-700 mb-1">Altri Finanziamenti Attivi</label>
                    <div className="relative">
                      <input
                        id="existing-debts-input"
                        type="text"
                        inputMode="numeric"
                        value={existingDebtsInput}
                        onChange={(e) => setExistingDebtsInput(e.target.value)}
                        onBlur={() => {
                          if (!existingDebtsInput.trim()) setExistingDebtsInput('0');
                        }}
                        className="w-full bg-white border border-slate-300 rounded-lg pl-3 pr-8 py-2 text-sm font-bold text-slate-900 font-mono tabular-nums focus:outline-none"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-semibold">€/mese</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Synthesis Results & Costs Breakdown */}
            <div className="lg:col-span-5 space-y-6">
              {/* Box Rata & Sostenibilità */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-sm">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  <span>Rata Mensile Stimata</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[11px] px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                    Stima Indicativa
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono tabular-nums">
                    {purchaseCalculation.monthlyInstallment} €
                  </span>
                  <span className="text-sm text-slate-400">/ al mese</span>
                </div>

                {/* Stress test warning for variable rate */}
                {rateType === 'variabile' && (
                  <div className="mt-3 p-3 bg-slate-800 rounded-xl text-xs text-slate-300 border border-slate-700">
                    <div className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Stress Test Tasso Variabile (+1.5% Euribor):
                    </div>
                    La rata salirebbe a circa <strong className="text-white font-mono">{purchaseCalculation.stressedInstallment} €/mese</strong> (+{purchaseCalculation.stressedInstallment - purchaseCalculation.monthlyInstallment} €).
                  </div>
                )}

                {/* DTI Indicator */}
                <div className="mt-5 pt-4 border-t border-slate-800">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-300 font-medium">Rapporto Rata / Reddito:</span>
                    <span className="font-bold text-white font-mono tabular-nums">
                      {purchaseCalculation.dtiRatio}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        purchaseCalculation.sustainability === 'ottimale'
                          ? 'bg-emerald-500'
                          : purchaseCalculation.sustainability === 'accettabile'
                          ? 'bg-amber-400'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, purchaseCalculation.dtiRatio * 2)}%` }}
                    />
                  </div>

                  <div className="mt-2 text-xs flex items-center gap-1.5">
                    {purchaseCalculation.sustainability === 'ottimale' && (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-emerald-300">Ottima sostenibilità: parametri in linea con le banche.</span>
                      </>
                    )}
                    {purchaseCalculation.sustainability === 'accettabile' && (
                      <>
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="text-amber-300">Fascia 30-35%: fattibile, consigliato allungare durata.</span>
                      </>
                    )}
                    {purchaseCalculation.sustainability === 'critico' && (
                      <>
                        <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                        <span className="text-rose-300">Supera il 35%: la banca potrebbe richiedere garante.</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-400 block">Totale Rimborsato:</span>
                    <strong className="text-white font-mono tabular-nums">{purchaseCalculation.totalRepaid.toLocaleString('it-IT')} €</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Totale Interessi:</span>
                    <strong className="text-white font-mono tabular-nums">{purchaseCalculation.totalInterest.toLocaleString('it-IT')} €</strong>
                  </div>
                </div>
              </div>

              {/* Box Costi Totali Acquisto Casa */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm">Liquidità Totale Necessaria</h4>
                  <div className="text-lg font-extrabold text-slate-900 font-mono tabular-nums">
                    {ancillaryCosts.totalCashNeeded.toLocaleString('it-IT')} €
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Anticipo da versare al venditore:</span>
                    <span className="font-semibold text-slate-800 font-mono tabular-nums">{downPayment.toLocaleString('it-IT')} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Imposta di Registro / Fiscale:</span>
                    <span className="font-semibold text-slate-800 font-mono tabular-nums">{ancillaryCosts.purchaseTax.toLocaleString('it-IT')} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Imposta Sostitutiva Mutuo:</span>
                    <span className="font-semibold text-slate-800 font-mono tabular-nums">{ancillaryCosts.substituteTax.toLocaleString('it-IT')} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Parcella Notaio stimata (due atti):</span>
                    <span className="font-semibold text-slate-800 font-mono tabular-nums">{ancillaryCosts.notaryFee.toLocaleString('it-IT')} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spese Istruttoria e Perizia Bancaria:</span>
                    <span className="font-semibold text-slate-800 font-mono tabular-nums">{ancillaryCosts.bankFees.toLocaleString('it-IT')} €</span>
                  </div>
                  {includeAgency && (
                    <div className="flex justify-between">
                      <span>Provvigione Agenzia Immobiliare (IVA inc.):</span>
                      <span className="font-semibold text-slate-800 font-mono tabular-nums">{ancillaryCosts.agencyFee.toLocaleString('it-IT')} €</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between text-xs font-bold text-slate-900">
                  <span>Totale Spese Accessorie:</span>
                  <span className="font-mono tabular-nums">{ancillaryCosts.totalAncillary.toLocaleString('it-IT')} €</span>
                </div>

                {/* Explicit Veracity Disclaimer */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nota di Trasparenza sui Dati:</strong> I calcoli sopra riportati costituiscono stime orientative per scopi informativi. I tassi effettivi (TAN/TAEG) e le spese definitive saranno confermati in sede di delibera della banca.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onPrefeasibilityRequest({ propertyValue: propertyPrice, loanAmount, duration: durationYears })}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer mt-2"
                >
                  <span>Richiedi Prefattibilità Gratuita per Questa Simulazione</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- MODE 2: SIMULATORE SURROGA DEL MUTUO --- */}
        {calcMode === 'surroga' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Surroga Inputs */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-emerald-600" />
                  1. Dati del tuo Mutuo Attuale
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Legge Bersani 40/2007: 0 € Costi
                </span>
              </div>

              {/* Debito Residuo Attuale con Campo Editabile Libero */}
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <label htmlFor="surroga-debt-input" className="font-semibold text-slate-800">
                    Debito Residuo Attuale da Surrogare (€)
                  </label>
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1 focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600">
                    <span className="text-xs text-slate-500 font-bold">€</span>
                    <input
                      id="surroga-debt-input"
                      type="text"
                      inputMode="numeric"
                      value={surrogaResidualDebtInput}
                      onChange={(e) => setSurrogaResidualDebtInput(e.target.value)}
                      onBlur={() => {
                        if (!surrogaResidualDebtInput.trim()) setSurrogaResidualDebtInput('135000');
                      }}
                      className="w-32 bg-transparent text-slate-900 font-mono font-bold text-right text-base focus:outline-none"
                      placeholder="es. 135000"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={20000}
                  max={500000}
                  step={5000}
                  value={surrogaResidualDebt || 0}
                  onChange={(e) => setSurrogaResidualDebtInput(e.target.value)}
                  className="w-full accent-slate-900 cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[80000, 110000, 135000, 160000, 220000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSurrogaResidualDebtInput(amt.toString())}
                      className={`px-2.5 py-0.5 text-xs rounded border transition-colors cursor-pointer ${
                        surrogaResidualDebt === amt
                          ? 'bg-emerald-600 text-white font-bold border-emerald-600'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                      }`}
                    >
                      € {amt.toLocaleString('it-IT')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Valore Immobile Stimato con Campo Editabile */}
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <label htmlFor="surroga-property-input" className="font-semibold text-slate-800">
                    Valore Attuale Immobile (€)
                  </label>
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1 focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600">
                    <span className="text-xs text-slate-500 font-bold">€</span>
                    <input
                      id="surroga-property-input"
                      type="text"
                      inputMode="numeric"
                      value={surrogaPropertyValueInput}
                      onChange={(e) => setSurrogaPropertyValueInput(e.target.value)}
                      onBlur={() => {
                        if (!surrogaPropertyValueInput.trim()) setSurrogaPropertyValueInput('200000');
                      }}
                      className="w-32 bg-transparent text-slate-900 font-mono font-bold text-right text-base focus:outline-none"
                      placeholder="es. 200000"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={30000}
                  max={600000}
                  step={5000}
                  value={surrogaPropertyValue || 0}
                  onChange={(e) => setSurrogaPropertyValueInput(e.target.value)}
                  className="w-full accent-slate-900 cursor-pointer"
                />
                <div className="text-xs text-slate-500 mt-1">
                  LTV Surroga: <strong className="font-mono text-slate-800">{surrogaCalculation.surrogaLtv}%</strong> (Massimo ammissibile per surroga: 80%)
                </div>
              </div>

              {/* Tasso Attuale vs Nuovo Tasso Proposto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200">
                  <label htmlFor="surroga-old-rate" className="block text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">
                    Tasso Attuale (TAN Vecchio)
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      id="surroga-old-rate"
                      type="text"
                      inputMode="decimal"
                      value={surrogaCurrentRateInput}
                      onChange={(e) => setSurrogaCurrentRateInput(e.target.value)}
                      onBlur={() => {
                        if (!surrogaCurrentRateInput.trim()) setSurrogaCurrentRateInput('4.60');
                      }}
                      className="w-full bg-white border border-amber-300 rounded-lg px-3 py-1.5 text-base font-extrabold text-amber-950 font-mono tabular-nums focus:outline-none"
                    />
                    <span className="text-base font-bold text-amber-900">%</span>
                  </div>
                  <span className="text-[11px] text-amber-800 mt-1 block">Tasso alto stipulato negli anni scorsi</span>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200">
                  <label htmlFor="surroga-new-rate" className="block text-xs font-bold text-emerald-900 uppercase tracking-wide mb-1">
                    Nuovo Tasso Proposto (TAN Surroga)
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      id="surroga-new-rate"
                      type="text"
                      inputMode="decimal"
                      value={surrogaNewRateInput}
                      onChange={(e) => setSurrogaNewRateInput(e.target.value)}
                      onBlur={() => {
                        if (!surrogaNewRateInput.trim()) setSurrogaNewRateInput('2.80');
                      }}
                      className="w-full bg-white border border-emerald-300 rounded-lg px-3 py-1.5 text-base font-extrabold text-emerald-950 font-mono tabular-nums focus:outline-none"
                    />
                    <span className="text-base font-bold text-emerald-900">%</span>
                  </div>
                  <span className="text-[11px] text-emerald-800 mt-1 block">Nuova offerta fisso/variabile oggi</span>
                </div>
              </div>

              {/* Durata Residua vs Nuova Durata Surroga */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="surroga-old-years" className="block text-xs font-semibold text-slate-700 mb-1">Anni Residui da Pagare</label>
                  <select
                    id="surroga-old-years"
                    value={surrogaRemainingYears}
                    onChange={(e) => {
                      const yrs = parseInt(e.target.value, 10);
                      setSurrogaRemainingYears(yrs);
                      setSurrogaNewYears(yrs);
                    }}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value={10}>10 Anni residui</option>
                    <option value={15}>15 Anni residui</option>
                    <option value={20}>20 Anni residui</option>
                    <option value={25}>25 Anni residui</option>
                    <option value={30}>30 Anni residui</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="surroga-new-years" className="block text-xs font-semibold text-slate-700 mb-1">Nuova Durata Desiderata</label>
                  <select
                    id="surroga-new-years"
                    value={surrogaNewYears}
                    onChange={(e) => setSurrogaNewYears(parseInt(e.target.value, 10))}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value={10}>10 Anni (Riduci durata)</option>
                    <option value={15}>15 Anni</option>
                    <option value={20}>20 Anni (Stessa durata)</option>
                    <option value={25}>25 Anni (Allunga per abbassare rata)</option>
                    <option value={30}>30 Anni</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right: Surroga Results & Savings Summary */}
            <div className="lg:col-span-5 space-y-6">
              {/* Risparmio Rata Card */}
              <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-emerald-300 font-bold">
                  <span>Confronto Rate Mensili</span>
                  <PiggyBank className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="grid grid-cols-2 gap-3 py-2 border-y border-emerald-900">
                  <div>
                    <span className="text-xs text-emerald-300/80 block">Vecchia Rata:</span>
                    <strong className="text-xl font-bold text-rose-300 font-mono line-through">
                      {surrogaCalculation.oldMonthlyInstallment} €/m
                    </strong>
                  </div>

                  <div>
                    <span className="text-xs text-emerald-300/80 block">Nuova Rata Surroga:</span>
                    <strong className="text-2xl font-extrabold text-white font-mono">
                      {surrogaCalculation.newMonthlyInstallment} €/m
                    </strong>
                  </div>
                </div>

                {/* Risparmio Evidenziato */}
                <div className="bg-emerald-900/80 p-4 rounded-xl border border-emerald-800 text-center space-y-1">
                  <div className="text-xs uppercase text-emerald-300 font-semibold tracking-wider flex items-center justify-center gap-1">
                    <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                    Risparmio Sulla Rata Mensile
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-300 font-mono tabular-nums">
                    -{surrogaCalculation.monthlySavings} € <span className="text-sm font-normal text-emerald-200">/mese</span>
                  </div>
                  <div className="text-xs text-emerald-200 font-medium">
                    Pari a <strong className="font-mono text-white">-{surrogaCalculation.annualSavings.toLocaleString('it-IT')} €</strong> ogni anno!
                  </div>
                </div>

                {/* Risparmio Totale Interessi */}
                <div className="pt-2 text-xs text-emerald-200 flex justify-between items-center">
                  <span>Risparmio Totale Interessi Futuri:</span>
                  <strong className="text-lg font-bold text-emerald-300 font-mono tabular-nums">
                    -{surrogaCalculation.totalInterestSavings.toLocaleString('it-IT')} €
                  </strong>
                </div>
              </div>

              {/* Zero Cost Guarantee & Disclaimer Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h4 className="font-bold text-slate-900 text-sm">Garanzia Surroga 100% Gratuita</h4>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span>Spese di Istruttoria Bancaria:</span>
                    <strong className="text-emerald-700 font-mono">0 € (Gratis)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Spese di Perizia Immobile:</span>
                    <strong className="text-emerald-700 font-mono">0 € (Gratis)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Parcella Notaio (Atto di surroga):</span>
                    <strong className="text-emerald-700 font-mono">0 € (A carico banca)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Penali di Estinzione Vecchio Mutuo:</span>
                    <strong className="text-emerald-700 font-mono">0 € (Banned per legge)</strong>
                  </div>
                </div>

                {/* Explicit Veracity Disclaimer */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nota sulla veridicità dei dati:</strong> I tassi e i risparmi calcolati sono stime indicative basate sulle convenzioni correnti. Le condizioni definitive saranno verificate con l'istituto di credito prescelto.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onPrefeasibilityRequest({ propertyValue: surrogaPropertyValue, loanAmount: surrogaResidualDebt, duration: surrogaNewYears })}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer mt-2"
                >
                  <span>Richiedi Verifica Surroga con Marianna Di Martino</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
