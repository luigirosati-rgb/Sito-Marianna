import React from 'react';
import { ShieldCheck, Flame, HeartPulse, Briefcase, ExternalLink, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

export const InsuranceServices: React.FC<{ onContact: () => void }> = ({ onContact }) => {
  const kironInsuranceUrl = 'https://www.kiron.it/it/prodotti-e-servizi/assicurazioni';

  return (
    <section id="assicurazioni" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Servizi Aggiuntivi Kìron Partner
              </span>
              <span aria-hidden="true">·</span>
              <span>Protezione Patrimonio e Famiglia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              L'importanza delle Polizze Assicurative sul Mutuo
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Un mutuo è un impegno a lungo termine (20-30 anni). Affiancare le giuste coperture assicurative significa proteggere l'immobile da eventi catastrofici ed evitare che imprevisti della vita gravino sulla serenità dei tuoi cari.
            </p>
          </div>

          <a
            href={kironInsuranceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors shadow-2xs shrink-0 w-fit"
          >
            <span>Consulta Trasparenza Assicurazioni Kìron</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>

        {/* --- PERCHÉ LE POLIZZE SONO FONDAMENTALI (BRIEF EXPLANATION) --- */}
        <div className="mb-12 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                Perché Assicurare il Mutuo Casa?
              </div>
              <h3 className="text-2xl font-bold text-white">
                Proteggi la tua Casa e il Futuro dei tuoi Figli
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Durante la durata del finanziamento, eventi imprevisti come un grave infortunio, la perdita del posto di lavoro o la prematura scomparsa del capofamiglia potrebbero compromettere la capacità di pagare le rate.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Le polizze di protezione del credito (CPI) intervengono pagando le rate o estinguendo l'intero debito residuo alla banca. In questo modo **la casa rimane di proprietà della tua famiglia**, senza il rischio di pignoramenti o di lasciare debiti ereditari ai figli.
              </p>
            </div>

            <div className="lg:col-span-5 bg-slate-800/90 rounded-xl p-5 border border-slate-700 space-y-3 text-xs text-slate-200">
              <div className="font-bold text-white text-sm pb-2 border-b border-slate-700 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                Regole e Libertà di Scelta per il Cliente
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Unica obbligatoria:</strong> La polizza Incendio & Scoppio sulle mura dell'immobile è l'unica richiesta obbligatoriamente dalla banca.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Libertà di scelta:</strong> Hai sempre il diritto di sottoscrivere la polizza presso una compagnia di tua fiducia, senza vincoli alla banca.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Consulenza personalizzata:</strong> Marianna Di Martino ti aiuta a valutare il pacchetto più trasparente ed economico per le tue reali esigenze.</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- I 4 PRODOTTI ASSICURATIVI PRINCIPALI --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Incendio e Scoppio */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  Obbligatoria per Legge
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-2">
                  Incendio e Scoppio
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Protegge il valore delle mura dell'immobile finanziato da danni materiali e diretti causati da incendio, esplosione, scoppio o fulmini per l'intera durata del mutuo.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Garantisce il ripristino dell'immobile o il saldo alla banca.
            </div>
          </div>

          {/* 2. Polizza Vita */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded-md">
                  Facoltativa Consigliata
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-2">
                  Protezione Vita ("Vita a Colori")
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  In caso di prematura scomparsa del mutuatario, la polizza estingue il debito residuo verso la banca, evitando che il mutuo ricada sugli eredi o sulla famiglia.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              La casa resta per intero agli eredi senza debiti pendenti.
            </div>
          </div>

          {/* 3. Infortunio e Invalidità */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded-md">
                  Protezione Persona
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-2">
                  Invalidità Permanente
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Interviene se un grave infortunio o una malattia compromettono la capacità lavorativa permanente, rimborsando il capitale residuo del finanziamento.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Tutelato anche in caso di incapacità lavorativa totale.
            </div>
          </div>

          {/* 4. Perdita del Lavoro */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded-md">
                  Per Dipendenti Privati
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-2">
                  Perdita d'Impiego
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Copre il pagamento delle rate mensili del mutuo fino a 12 o 24 mesi consecutivi in caso di licenziamento involontario o cassa integrazione.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Tempo necessario per trovare un nuovo impiego in serenità.
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="mt-10 text-center">
          <button
            onClick={onContact}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-2xs cursor-pointer"
          >
            <span>Richiedi una Valutazione Assicurativa Personalizzata con Marianna</span>
          </button>
        </div>
      </div>
    </section>
  );
};
