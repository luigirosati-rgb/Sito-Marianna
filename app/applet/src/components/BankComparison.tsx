import React, { useState } from 'react';
import { Check, ArrowUpRight, Landmark, ChevronDown, ChevronUp, Info, ShieldCheck } from 'lucide-react';
import { BankOffer } from '../types/mortgage';
import { KIRON_ALL_PARTNER_BANKS, KIRON_TRANSPARENCY_INFO } from '../data/marketRates';

interface BankComparisonProps {
  onSelectBank: (bank: BankOffer) => void;
}

const SAMPLE_OFFERS: BankOffer[] = [
  {
    id: 'intesa-fisso',
    bankName: 'Intesa Sanpaolo',
    productName: 'Mutuo Domus Tasso Fisso',
    rateType: 'fisso',
    tan: 2.70,
    taeg: 2.92,
    spread: 0.25,
    maxLtv: 80,
    investigationFee: 950,
    appraisalFee: 320,
    highlights: ['Sconto Green -0.10% classe A/B', 'Fondo Consap Under 36', 'Zero spese incasso rata'],
    logoBg: 'bg-emerald-800 text-white',
    logoText: 'ISP'
  },
  {
    id: 'unicredit-fisso',
    bankName: 'UniCredit',
    productName: 'Mutuo UniCredit Tasso Finito',
    rateType: 'fisso',
    tan: 2.75,
    taeg: 2.98,
    spread: 0.30,
    maxLtv: 80,
    investigationFee: 1000,
    appraisalFee: 300,
    highlights: ['Sospensione rata fino a 3 volte', 'Apertura conto opzionale', 'Convenzione Kìron attiva'],
    logoBg: 'bg-rose-700 text-white',
    logoText: 'UC'
  },
  {
    id: 'credit-agricole-green',
    bankName: 'Crédit Agricole',
    productName: 'Mutuo CA Green Smart',
    rateType: 'fisso',
    tan: 2.65,
    taeg: 2.88,
    spread: 0.20,
    maxLtv: 100,
    investigationFee: 850,
    appraisalFee: 320,
    highlights: ['Ammesso Consap 100%', 'Tasso super agevolato per classe A/B', 'Pre-delibera reddituale rapida'],
    logoBg: 'bg-emerald-600 text-white',
    logoText: 'CA'
  },
  {
    id: 'bnl-fisso',
    bankName: 'BNL BNP Paribas',
    productName: 'Mutuo BNL Spensierato',
    rateType: 'fisso',
    tan: 2.80,
    taeg: 3.05,
    spread: 0.35,
    maxLtv: 80,
    investigationFee: 900,
    appraisalFee: 300,
    highlights: ['Tasso bloccato alla richiesta', 'Nessuna penale estinzione anticipata', 'Copertura assicurativa dedicata'],
    logoBg: 'bg-emerald-900 text-white',
    logoText: 'BNL'
  },
  {
    id: 'bpm-fisso',
    bankName: 'Banco BPM',
    productName: 'Mutuo You Tasso Fisso',
    rateType: 'fisso',
    tan: 2.78,
    taeg: 3.01,
    spread: 0.32,
    maxLtv: 80,
    investigationFee: 950,
    appraisalFee: 320,
    highlights: ['Flessibilità cambio durata', 'Sconto istruttoria Kìron Partner', 'Consap accettato'],
    logoBg: 'bg-slate-900 text-white',
    logoText: 'BPM'
  },
  {
    id: 'chebanca-variabile',
    bankName: 'Mediobanca Premier',
    productName: 'Mutuo Variabile Capping Option',
    rateType: 'variabile',
    tan: 3.15,
    taeg: 3.38,
    spread: 0.70,
    maxLtv: 80,
    investigationFee: 900,
    appraisalFee: 300,
    highlights: ['Possibilità inserimento Cap', 'Gestione 100% digitale', 'Consulenza dedicata'],
    logoBg: 'bg-amber-800 text-white',
    logoText: 'MBP'
  }
];

export const BankComparison: React.FC<BankComparisonProps> = ({ onSelectBank }) => {
  const [categoryFilter, setCategoryFilter] = useState<'tutti' | 'fisso' | 'variabile' | 'consap'>('tutti');
  const [showAllPartners, setShowAllPartners] = useState<boolean>(false);

  const benchmarkLoan = 170000;
  const benchmarkYears = 25;

  const calculateInstallment = (loan: number, tan: number, years: number) => {
    const r = tan / 100 / 12;
    const n = years * 12;
    if (r === 0) return Math.round(loan / n);
    const m = (loan * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    return Math.round(m);
  };

  const filteredOffers = SAMPLE_OFFERS.filter((offer) => {
    if (categoryFilter === 'fisso') return offer.rateType === 'fisso';
    if (categoryFilter === 'variabile') return offer.rateType === 'variabile';
    if (categoryFilter === 'consap') return offer.maxLtv === 100 || offer.highlights.some(h => h.includes('Consap'));
    return true;
  });

  return (
    <section id="banche" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <Landmark className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Confronto Trasparente 20+ Banche Convenzionate</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Scegli la Migliore Offerta Mutuo di Oggi
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Grazie alle convenzioni nazionali del Gruppo <strong>Kìron Partner S.p.A.</strong>, accedi a condizioni e spread riservati. Stima calcolata su mutuo di <strong>170.000 € in 25 Anni</strong>.
            </p>
          </div>

          {/* Filter Tabs - Horizontal Scrolling on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 shrink-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'tutti', label: 'Tutte le Offerte' },
              { id: 'fisso', label: 'Tasso Fisso' },
              { id: 'consap', label: 'Consap Under 36 (100%)' },
              { id: 'variabile', label: 'Tasso Variabile' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id as any)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer shrink-0 border ${
                  categoryFilter === cat.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bank Offers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredOffers.map((offer) => {
            const monthlyPayment = calculateInstallment(benchmarkLoan, offer.tan, benchmarkYears);

            return (
              <div
                key={offer.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 flex flex-col justify-between hover:shadow-md transition-all shadow-2xs"
              >
                <div>
                  {/* Top Bar Card */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xs tracking-tighter shrink-0 ${offer.logoBg}`}
                      >
                        {offer.logoText}
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-base leading-tight">
                          {offer.bankName}
                        </h3>
                        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                          {offer.rateType === 'fisso' ? 'Tasso Fisso Costante' : 'Tasso Variabile'}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Rata Stimata</div>
                      <div className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                        {monthlyPayment} €<span className="text-xs font-normal text-slate-500">/m</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Title */}
                  <div className="text-xs sm:text-sm font-bold text-slate-800 mb-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                    <span>{offer.productName}</span>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      Max LTV {offer.maxLtv}%
                    </span>
                  </div>

                  {/* Rates Matrix */}
                  <div className="grid grid-cols-2 gap-3 mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                    <div>
                      <div className="text-[11px] text-slate-500 font-medium">TAN Finito</div>
                      <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">
                        {offer.tan.toFixed(2)}%
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        Spread: {offer.spread.toFixed(2)}%
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] text-slate-500 font-medium">TAEG Indicativo</div>
                      <div className="text-2xl font-extrabold text-slate-700 font-mono tabular-nums mt-0.5">
                        {offer.taeg.toFixed(2)}%
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Istruttoria: {offer.investigationFee} €
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-5">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Vantaggi Convenzione Kìron
                    </div>

                    {offer.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onSelectBank(offer)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-xl transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Valuta con Marianna Di Martino</span>
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Directory Toggle */}
        <div className="mt-10 bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-800" />
                Elenco Completo Banche Partner Kìron ({KIRON_ALL_PARTNER_BANKS.length} Istituti)
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                {KIRON_TRANSPARENCY_INFO.updateFrequency} · Mediatore Creditizio OAM N. M39
              </p>
            </div>

            <button
              onClick={() => setShowAllPartners(!showAllPartners)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <span>{showAllPartners ? 'Nascondi Elenco Banche' : 'Mostra Tutti i 14 Istituti Partner'}</span>
              {showAllPartners ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showAllPartners && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-5">
              {KIRON_ALL_PARTNER_BANKS.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase">
                    <span>{b.type}</span>
                    {b.isTop5 && <span className="text-emerald-700 font-extrabold">Top Partner</span>}
                  </div>
                  <div className="font-bold text-slate-900 text-sm">{b.name}</div>
                  <div className="text-[11px] text-slate-600 leading-snug">{b.highlight}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Advisory & Transparency Note */}
        <div className="mt-6 bg-slate-100 rounded-xl p-4 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
          <Info className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Trasparenza Kìron Partner S.p.A.:</strong> I tassi (TAN/TAEG) e le rate mensili riporte nelle schede costituiscono stime a scopo illustrativo basate sulle rilevazioni settimanali. Le condizioni contrattuali definitive saranno stabilite dall'istituto di credito in fase di istruttoria.
          </p>
        </div>

      </div>
    </section>
  );
};
