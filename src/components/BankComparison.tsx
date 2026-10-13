import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Check, Info, Filter, ExternalLink, Trophy, ShieldCheck, ChevronDown, ChevronUp, Landmark } from 'lucide-react';
import { BANK_OFFERS, KIRON_TRANSPARENCY_INFO, KIRON_ALL_PARTNER_BANKS } from '../data/marketRates';
import { BankOffer } from '../types/mortgage';

interface BankComparisonProps {
  onSelectBank: (bank: BankOffer) => void;
}

export const BankComparison: React.FC<BankComparisonProps> = ({ onSelectBank }) => {
  const [rateFilter, setRateFilter] = useState<'all' | 'fisso' | 'variabile'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [benchmarkLoan, setBenchmarkLoan] = useState<number>(150000);
  const [benchmarkYears, setBenchmarkYears] = useState<number>(25);
  const [showAllPartners, setShowAllPartners] = useState<boolean>(false);

  // Filtered bank list
  const filteredOffers = useMemo(() => {
    return BANK_OFFERS.filter((offer) => {
      if (rateFilter !== 'all' && offer.rateType !== rateFilter) {
        return false;
      }
      if (categoryFilter !== 'all') {
        return offer.category.includes(categoryFilter as any);
      }
      return true;
    });
  }, [rateFilter, categoryFilter]);

  // Top 5 banks
  const top5Banks = useMemo(() => {
    return KIRON_ALL_PARTNER_BANKS.filter((b) => b.isTop5).sort((a, b) => a.rank - b.rank);
  }, []);

  // Formula per calcolo rata mensile standard alla francese
  const calculateInstallment = (principal: number, annualRatePct: number, years: number) => {
    const monthlyRate = annualRatePct / 100 / 12;
    const totalMonths = years * 12;
    if (monthlyRate === 0) return Math.round(principal / totalMonths);
    const installment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return Math.round(installment);
  };

  return (
    <section id="banche" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Convenzioni Kìron Partner S.p.A. (OAM N. M39)
              </span>
              <span aria-hidden="true">·</span>
              <span>Monitoraggio Settimanale</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Confronto tassi e offerte banche partner
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Elenco aggiornato degli istituti bancari convenzionati Kìron. Verifichiamo ogni settimana le condizioni di credito per garantirti il miglior tasso e le migliori probabilità di delibera.
            </p>
          </div>

          {/* Interactive Benchmark Quick Tweaker */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center gap-4 text-sm shrink-0">
            <div>
              <label htmlFor="benchmark-amount" className="text-xs text-slate-500 block">Importo Mutuo Simulato</label>
              <select
                id="benchmark-amount"
                value={benchmarkLoan}
                onChange={(e) => setBenchmarkLoan(parseInt(e.target.value, 10))}
                className="bg-white border border-slate-300 rounded-md px-2.5 py-1 text-slate-900 font-semibold text-sm focus:outline-hidden"
              >
                <option value={100000}>100.000 €</option>
                <option value={150000}>150.000 €</option>
                <option value={200000}>200.000 €</option>
                <option value={250000}>250.000 €</option>
                <option value={300000}>300.000 €</option>
              </select>
            </div>
            <div>
              <label htmlFor="benchmark-duration" className="text-xs text-slate-500 block">Durata</label>
              <select
                id="benchmark-duration"
                value={benchmarkYears}
                onChange={(e) => setBenchmarkYears(parseInt(e.target.value, 10))}
                className="bg-white border border-slate-300 rounded-md px-2.5 py-1 text-slate-900 font-semibold text-sm focus:outline-hidden"
              >
                <option value={15}>15 Anni</option>
                <option value={20}>20 Anni</option>
                <option value={25}>25 Anni</option>
                <option value={30}>30 Anni</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- TOP 5 BANCHE DEL MOMENTO HIGHLIGHT BANNER --- */}
        <div className="mb-12 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
                <Trophy className="w-4 h-4 text-amber-400" />
                Classifica della Settimana
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Le 5 Migliori Banche del Momento per Condizioni & Tasso
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Selezionate e verificate settimanalmente tra gli istituti convenzionati della rete Kìron Partner S.p.A.
              </p>
            </div>

            <a
              href={KIRON_TRANSPARENCY_INFO.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors shrink-0 w-fit"
            >
              <span>Trasparenza Ufficiale Kìron</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6">
            {top5Banks.map((bank) => {
              const estInstallment = calculateInstallment(benchmarkLoan, bank.tan, benchmarkYears);
              return (
                <div
                  key={bank.rank}
                  className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-extrabold text-amber-400 font-mono">#{bank.rank} TOP CHOICE</span>
                      <span className="text-[11px] text-slate-400 font-mono">TAN {bank.tan.toFixed(2)}%</span>
                    </div>

                    <div className="text-sm font-bold text-white leading-snug">
                      {bank.name}
                    </div>

                    <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                      {bank.highlight}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-700/80 flex items-baseline justify-between text-xs">
                    <span className="text-slate-400">Rata {benchmarkLoan / 1000}k€:</span>
                    <strong className="text-white font-mono tabular-nums text-sm font-extrabold">{estInstallment} €/m</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters Bar: Interactive Buttons/Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
          {/* Rate Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Tipologia:
            </span>
            <div className="inline-flex p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setRateFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  rateFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tutti ({BANK_OFFERS.length})
              </button>
              <button
                onClick={() => setRateFilter('fisso')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  rateFilter === 'fisso'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tasso Fisso
              </button>
              <button
                onClick={() => setRateFilter('variabile')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  rateFilter === 'variabile'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tasso Variabile
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'Tutte le Finalità' },
              { id: 'prima_casa', label: 'Prima Casa' },
              { id: 'giovani_consap', label: 'Under 36 Consap 100%' },
              { id: 'green', label: 'Green (Classe A/B)' },
              { id: 'surroga', label: 'Surroga' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bank Offers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => {
            const monthlyPayment = calculateInstallment(benchmarkLoan, offer.tan, benchmarkYears);

            return (
              <div
                key={offer.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  {/* Top Bar Card */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xs tracking-tighter ${offer.logoBg}`}
                      >
                        {offer.logoText}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base leading-tight">
                          {offer.bankName}
                        </h3>
                        <div className="text-xs text-slate-500 mt-0.5 capitalize">
                          {offer.rateType === 'fisso' ? 'Tasso Fisso Costante' : 'Tasso Variabile Indicizzato'}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-500">Rata Stimata</div>
                      <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                        {monthlyPayment} €<span className="text-xs font-normal text-slate-500">/mese</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Title */}
                  <div className="text-sm font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-100">
                    {offer.productName}
                  </div>

                  {/* Rates Matrix */}
                  <div className="grid grid-cols-2 gap-3 mb-5 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-center">
                    <div>
                      <div className="text-xs text-slate-500 font-medium">TAN</div>
                      <div className="text-2xl font-extrabold text-slate-900 tabular-nums mt-0.5">
                        {offer.tan.toFixed(2)}%
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                        Spread: {offer.spread.toFixed(2)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">TAEG Indicativo</div>
                      <div className="text-2xl font-extrabold text-slate-700 tabular-nums mt-0.5">
                        {offer.taeg.toFixed(2)}%
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Max LTV: {offer.maxLtv}%
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Vantaggi Inclusi
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
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[11px] text-slate-500 mb-3 flex items-center justify-between">
                    <span>Istruttoria: {offer.investigationFee} €</span>
                    <span>Perizia: {offer.appraisalFee} €</span>
                  </div>
                  <button
                    onClick={() => onSelectBank(offer)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Valuta con Marianna Di Martino</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- FULL KÌRON PARTNER BANKS DIRECTORY TOGGLE --- */}
        <div className="mt-12 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-slate-700" />
                Elenco Completo Banche Partner Kìron ({KIRON_ALL_PARTNER_BANKS.length} Istituti)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {KIRON_TRANSPARENCY_INFO.updateFrequency} · Iscrizione OAM N. M39
              </p>
            </div>

            <button
              onClick={() => setShowAllPartners(!showAllPartners)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer w-fit"
            >
              <span>{showAllPartners ? 'Nascondi Elenco Completo' : 'Mostra Tutti i 14 Istituti Partner'}</span>
              {showAllPartners ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showAllPartners && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6">
              {KIRON_ALL_PARTNER_BANKS.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>{b.type}</span>
                    {b.isTop5 && <span className="text-amber-600 font-bold">Top 5 Best</span>}
                  </div>
                  <div className="font-bold text-slate-900 text-sm">{b.name}</div>
                  <div className="text-xs text-slate-600">{b.highlight}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Advisory & Transparency Note */}
        <div className="mt-8 bg-white rounded-xl p-5 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
          <Info className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Trasparenza Kìron Partner S.p.A. & Stima dei Tassi:</strong> Tutti i tassi (TAN/TAEG) e le rate mensili riporte nelle schede costituiscono stime a scopo illustrativo basate sulle rilevazioni settimanali. L'elenco degli istituti bancari partner è verificato periodicamente e conforme alle informazioni ufficiali della sezione Trasparenza Kìron (<a href={KIRON_TRANSPARENCY_INFO.officialUrl} target="_blank" rel="noopener noreferrer" className="underline font-semibold text-slate-800">{KIRON_TRANSPARENCY_INFO.officialUrl}</a>). Le condizioni contrattuali definitive saranno stabilite dalla banca in fase di istruttoria.
          </p>
        </div>
      </div>
    </section>
  );
};
