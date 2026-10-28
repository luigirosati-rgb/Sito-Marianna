import React, { useState, useMemo } from 'react';
import { Calculator, ShieldAlert, CheckCircle, AlertTriangle, ArrowRight, Info, ShieldCheck, Landmark } from 'lucide-react';
import { parseRate, parseCurrency } from '../utils/numberFormatters';

interface MortgageCalculatorProps {
  onPrefeasibilityRequest: (data: { propertyValue: number; loanAmount: number; duration: number; selectedBank?: any }) => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ onPrefeasibilityRequest }) => {
  // --- ACQUISTO CASA INPUT STATES ---
  const [propertyPriceInput, setPropertyPriceInput] = useState<string>('220000');
  const [downPaymentInput, setDownPaymentInput] = useState<string>('50000');
  const [durationYears, setDurationYears] = useState<number>(25);
  const [annualRateInput, setAnnualRateInput] = useState<string>('2.85');
  const [rateType, setRateType] = useState<'fisso' | 'variabile'>('fisso');
  const [isFirstHome, setIsFirstHome] = useState<boolean>(true);
  const [isFromBuilder, setIsFromBuilder] = useState<boolean>(false);
  const [includeAgency, setIncludeAgency] = useState<boolean>(true);
  const [monthlyIncomeInput, setMonthlyIncomeInput] = useState<string>('2800');
  const [existingDebtsInput, setExistingDebtsInput] = useState<string>('0');

  // Valori numerici calcolati in tempo reale
  const propertyPrice = parseCurrency(propertyPriceInput, 220000);
  const downPayment = parseCurrency(downPaymentInput, 50000);
  const annualRate = parseRate(annualRateInput, 2.85);
  const monthlyIncome = parseCurrency(monthlyIncomeInput, 2800);
  const existingDebts = parseCurrency(existingDebtsInput, 0);

  // Calcolo importo mutuo e LTV
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
      purchaseTax = propertyPrice * (isFirstHome ? 0.04 : 0.10);
    } else {
      purchaseTax = estimatedCadastralValue * (isFirstHome ? 0.02 : 0.09);
      if (isFirstHome && purchaseTax < 1000) purchaseTax = 1000;
    }

    const mortgageTaxRate = isFirstHome ? 0.0025 : 0.02;
    const mortgageTax = loanAmount * mortgageTaxRate;

    let notaryFee = 1600;
    if (propertyPrice > 300000) notaryFee = 2800;
    else if (propertyPrice > 180000) notaryFee = 2200;

    const agencyFee = includeAgency ? propertyPrice * 0.03 : 0;
    const appraisalFee = 320;
    const investigationFee = Math.min(1200, Math.max(500, loanAmount * 0.005));

    const totalAncillary = purchaseTax + mortgageTax + notaryFee + agencyFee + appraisalFee + investigationFee;
    const totalCashRequired = downPayment + totalAncillary;

    return {
      purchaseTax: Math.round(purchaseTax),
      mortgageTax: Math.round(mortgageTax),
      notaryFee: Math.round(notaryFee),
      agencyFee: Math.round(agencyFee),
      appraisalFee: Math.round(appraisalFee),
      investigationFee: Math.round(investigationFee),
      totalAncillary: Math.round(totalAncillary),
      totalCashRequired: Math.round(totalCashRequired)
    };
  }, [propertyPrice, downPayment, loanAmount, isFirstHome, isFromBuilder, includeAgency]);

  return (
    <section id="calcolatore" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-8 sm:mb-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Simulatore Finanziario Completo</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Calcolatore Mutuo Prima Casa & Costi Notarili
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Calcola la tua rata mensile, il rapporto rata/reddito e il totale di liquidità necessaria per imposte, notaio e perizia.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form Controls */}
          <div className="lg:col-span-7 bg-slate-50 p-4 sm:p-7 rounded-2xl border border-slate-200/90 space-y-6 shadow-xs">
            
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
              1. Dati Compravendita & Importo Mutuo
            </div>

            {/* Prezzo Immobile */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="property-price" className="text-xs sm:text-sm font-semibold text-slate-800">
                  Valore Immobile (€)
                </label>

                {/* Mobile-friendly Quick Presets */}
                <div className="hidden sm:flex gap-1 text-[11px]">
                  {[120000, 180000, 250000, 350000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setPropertyPriceInput(val.toString())}
                      className="px-2 py-0.5 bg-white border border-slate-300 rounded hover:bg-slate-100 text-slate-700 cursor-pointer font-mono"
                    >
                      {(val / 1000).toFixed(0)}k
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <input
                  id="property-price"
                  type="text"
                  value={propertyPriceInput}
                  onChange={(e) => setPropertyPriceInput(e.target.value)}
                  onBlur={() => setPropertyPriceInput(propertyPrice.toString())}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-base sm:text-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <span className="absolute right-3.5 top-2.5 text-sm font-bold text-slate-400">€</span>
              </div>

              <input
                type="range"
                min={50000}
                max={600000}
                step={5000}
                value={propertyPrice}
                onChange={(e) => setPropertyPriceInput(e.target.value)}
                className="w-full mt-2 accent-slate-900 cursor-pointer"
              />
            </div>

            {/* Anticipo Disponibile */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="down-payment" className="text-xs sm:text-sm font-semibold text-slate-800">
                  Anticipo Disponibile (€)
                </label>
                <span className="text-xs text-slate-500 font-mono">
                  {propertyPrice > 0 ? ((downPayment / propertyPrice) * 100).toFixed(1) : 0}% del prezzo
                </span>
              </div>

              <div className="relative">
                <input
                  id="down-payment"
                  type="text"
                  value={downPaymentInput}
                  onChange={(e) => setDownPaymentInput(e.target.value)}
                  onBlur={() => setDownPaymentInput(downPayment.toString())}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-base sm:text-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <span className="absolute right-3.5 top-2.5 text-sm font-bold text-slate-400">€</span>
              </div>

              <input
                type="range"
                min={0}
                max={propertyPrice}
                step={2500}
                value={downPayment}
                onChange={(e) => setDownPaymentInput(e.target.value)}
                className="w-full mt-2 accent-slate-900 cursor-pointer"
              />
            </div>

            {/* Importo Mutuo Risultante & LTV Card */}
            <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Importo Mutuo Richiesto</div>
                <div className="text-2xl font-extrabold font-mono text-emerald-400">
                  {loanAmount.toLocaleString('it-IT')} €
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">LTV (Loan to Value)</div>
                <div className={`text-xl font-mono font-extrabold ${ltv > 80 ? 'text-amber-400' : 'text-white'}`}>
                  {ltv.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Durata & Tasso */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration-years" className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Durata Mutuo (Anni)
                </label>
                <select
                  id="duration-years"
                  value={durationYears}
                  onChange={(e) => setDurationYears(parseInt(e.target.value, 10))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-bold text-slate-900 focus:outline-none"
                >
                  <option value={10}>10 Anni (120 rate)</option>
                  <option value={15}>15 Anni (180 rate)</option>
                  <option value={20}>20 Anni (240 rate)</option>
                  <option value={25}>25 Anni (300 rate)</option>
                  <option value={30}>30 Anni (360 rate)</option>
                </select>
              </div>

              <div>
                <label htmlFor="annual-rate" className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Tasso Ipotizzato TAN (%)
                </label>
                <div className="relative">
                  <input
                    id="annual-rate"
                    type="text"
                    value={annualRateInput}
                    onChange={(e) => setAnnualRateInput(e.target.value)}
                    onBlur={() => setAnnualRateInput(annualRate.toFixed(2))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-mono font-bold text-slate-900 focus:outline-none"
                  />
                  <span className="absolute right-3.5 top-2.5 text-sm font-bold text-slate-400">%</span>
                </div>
              </div>
            </div>

            {/* Tipologia Tasso Toggle */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">Tipologia di Tasso</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRateType('fisso');
                    setAnnualRateInput('2.85');
                  }}
                  className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    rateType === 'fisso'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Tasso Fisso (Scelta Sicura)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRateType('variabile');
                    setAnnualRateInput('3.20');
                  }}
                  className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    rateType === 'variabile'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Tasso Variabile
                </button>
              </div>
            </div>

            {/* 2. Sostenibilità Reddituale */}
            <div className="pt-2 border-t border-slate-200 space-y-4">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                2. Test Sostenibilità Rata / Reddito
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="monthly-income" className="block text-xs font-semibold text-slate-800 mb-1">
                    Reddito Mensile Netto Nucleo (€)
                  </label>
                  <input
                    id="monthly-income"
                    type="text"
                    value={monthlyIncomeInput}
                    onChange={(e) => setMonthlyIncomeInput(e.target.value)}
                    onBlur={() => setMonthlyIncomeInput(monthlyIncome.toString())}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-base sm:text-sm font-mono font-bold text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="existing-debts" className="block text-xs font-semibold text-slate-800 mb-1">
                    Rate Prestiti Già Attive (€/mese)
                  </label>
                  <input
                    id="existing-debts"
                    type="text"
                    value={existingDebtsInput}
                    onChange={(e) => setExistingDebtsInput(e.target.value)}
                    onBlur={() => setExistingDebtsInput(existingDebts.toString())}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-base sm:text-sm font-mono font-bold text-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Options Checkboxes */}
            <div className="pt-2 border-t border-slate-200 space-y-2 text-xs text-slate-800">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFirstHome}
                  onChange={(e) => setIsFirstHome(e.target.checked)}
                  className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
                />
                <span>Agevolazione Prima Casa (Imposta di registro al 2%)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeAgency}
                  onChange={(e) => setIncludeAgency(e.target.checked)}
                  className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
                />
                <span>Includi Provvigione Agenzia Immobiliare (~3% + IVA)</span>
              </label>
            </div>

          </div>

          {/* Right Column: Dynamic Results & Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Rata Mensile Hero Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Rata Mensile Stimata</span>
                <span className="bg-emerald-950 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-800">
                  Ammortamento Francese
                </span>
              </div>

              <div className="text-center py-2">
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white tabular-nums tracking-tight">
                  {purchaseCalculation.monthlyInstallment.toLocaleString('it-IT')} €
                  <span className="text-sm font-normal text-slate-400">/mese</span>
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Rate da pagare: {durationYears * 12} per {durationYears} Anni
                </div>
              </div>

              {/* Debt to Income Ratio Badge */}
              <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Rapporto Rata/Reddito:</span>
                  <strong className="text-base font-mono font-extrabold text-white">
                    {purchaseCalculation.dtiRatio}%
                  </strong>
                </div>

                <div>
                  {purchaseCalculation.sustainability === 'ottimale' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-950 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Ottimale (&lt;30%)
                    </span>
                  )}
                  {purchaseCalculation.sustainability === 'accettabile' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-950 text-amber-300 text-xs font-bold rounded-lg border border-amber-700">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      Accettabile (30-35%)
                    </span>
                  )}
                  {purchaseCalculation.sustainability === 'critico' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-950 text-rose-300 text-xs font-bold rounded-lg border border-rose-700">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                      Elevato (&gt;35%)
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Totale Interessi Futuri:</span>
                  <strong className="font-mono text-white">{purchaseCalculation.totalInterest.toLocaleString('it-IT')} €</strong>
                </div>
                <div className="flex justify-between">
                  <span>Totale Restituito alla Banca:</span>
                  <strong className="font-mono text-white">{purchaseCalculation.totalRepaid.toLocaleString('it-IT')} €</strong>
                </div>
              </div>
            </div>

            {/* Costi Accessori Compravendita Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="font-bold text-slate-900 text-sm">Stima Costi Accessori Acquisto</div>
                <span className="text-xs font-mono font-extrabold text-slate-900">
                  {ancillaryCosts.totalAncillary.toLocaleString('it-IT')} €
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Imposta di Registro / IVA:</span>
                  <strong className="font-mono text-slate-900">{ancillaryCosts.purchaseTax.toLocaleString('it-IT')} €</strong>
                </div>
                <div className="flex justify-between">
                  <span>Imposta Sostitutiva Mutuo:</span>
                  <strong className="font-mono text-slate-900">{ancillaryCosts.mortgageTax.toLocaleString('it-IT')} €</strong>
                </div>
                <div className="flex justify-between">
                  <span>Parcella Notarile Indicativa:</span>
                  <strong className="font-mono text-slate-900">{ancillaryCosts.notaryFee.toLocaleString('it-IT')} €</strong>
                </div>
                <div className="flex justify-between">
                  <span>Spese Perizia & Istruttoria:</span>
                  <strong className="font-mono text-slate-900">
                    {(ancillaryCosts.appraisalFee + ancillaryCosts.investigationFee).toLocaleString('it-IT')} €
                  </strong>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 bg-slate-50 -mx-5 -mb-5 p-5 rounded-b-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">Totale Liquidità Necessaria:</span>
                  <strong className="text-lg font-mono font-extrabold text-emerald-800">
                    {ancillaryCosts.totalCashRequired.toLocaleString('it-IT')} €
                  </strong>
                </div>

                <div className="text-[11px] text-slate-500 leading-tight">
                  (Incluso anticipo di <strong>{downPayment.toLocaleString('it-IT')} €</strong> + imposte e spese notarili)
                </div>

                <button
                  type="button"
                  onClick={() => onPrefeasibilityRequest({ propertyValue: propertyPrice, loanAmount, duration: durationYears })}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer mt-1 shadow-sm"
                >
                  <span>Invia questa Simulazione a Marianna Di Martino</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>

            {/* Note on Free & Non-Binding Consultation */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Consulenza 100% Gratuita e Senza Impegno:</strong> Riceverai un'analisi dettagliata senza alcun vincolo per te.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
