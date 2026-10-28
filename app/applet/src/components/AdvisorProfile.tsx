import React from 'react';
import { ShieldCheck, MapPin, Monitor, Building2, Award, FileText } from 'lucide-react';
import mariannaPhoto from '../assets/images/marianna_di_martino_photo_1791821479204.jpg';

interface AdvisorProfileProps {
  onContact: () => void;
}

export const AdvisorProfile: React.FC<AdvisorProfileProps> = ({ onContact }) => {
  return (
    <section id="profilo" className="py-12 sm:py-16 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Portrait & Credentials Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Advisor Portrait Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="relative rounded-xl overflow-hidden aspect-4/3 sm:aspect-square bg-slate-200">
                <img
                  src={mariannaPhoto}
                  alt="Dott.ssa Marianna Di Martino Consulente Mutui Kìron Napoli"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-lg border border-slate-700/80">
                  <div className="font-bold text-sm">Dott.ssa Marianna Di Martino</div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                    Consulente del Credito · Kìron Partner S.p.A.
                  </div>
                </div>
              </div>

              {/* Verified OAM Badge Block */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="flex items-center gap-1.5 text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    Iscrizione OAM
                  </span>
                  <span className="font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded text-[11px]">
                    N. M39
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 leading-snug">
                  Collaboratrice accreditata <strong>KÌRON PARTNER S.p.A.</strong>, primo gruppo di mediazione creditizia in Italia.
                </div>
              </div>
            </div>

            {/* Office Address & Modalities Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3.5 shadow-md">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm pb-2 border-b border-slate-800">
                <Building2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Dove Trovarmi & Come Consulenza</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {/* In Person Location */}
                <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700/70 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Sede Operativa in Presenza (Napoli):</span>
                  </div>
                  <div className="text-slate-200 font-medium pl-6">
                    Via Nuova Poggioreale, 43 - 80143 Napoli (NA)
                  </div>
                </div>

                {/* Online Video Call */}
                <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700/70 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <Monitor className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Consulenza Online a Distanza:</span>
                  </div>
                  <div className="text-slate-300 pl-6 leading-relaxed text-[11px]">
                    In videocall o telefonica per chi preferisce la comodità da casa, con invio documenti digitale.
                  </div>
                </div>

                {/* Free & Obligation Free Banner */}
                <div className="bg-emerald-950 p-3.5 rounded-xl border border-emerald-500/50 text-emerald-100 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5 text-xs">
                    <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Consulenza 100% Gratuita e Senza Vincoli</span>
                  </div>
                  <div className="text-emerald-200 text-[11px] leading-relaxed">
                    La consulenza non obbliga in alcun modo la persona e non ha nessun costo.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Bio, Regulatory Disclosures & Working Method */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>Profilo Professionale & Garanzie Clienti</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Dalla tua parte, con la forza e le convenzioni del Gruppo Kìron.
              </h2>
            </div>

            {/* Mandatory OAM Kìron Disclosure Box */}
            <div className="p-4 bg-white text-slate-900 rounded-xl space-y-2 border border-slate-300 shadow-2xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                Informativa sulla Mediazione Creditizia (KÌRON PARTNER S.p.A.)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sono una consulente mutui legata a <strong>Kìron</strong>. <strong>KÌRON PARTNER S.p.A.</strong> è un mediatore creditizio iscritto al n. <strong>M39</strong> dell’elenco tenuto dall’Organismo degli Agenti e dei Mediatori (OAM). Nello svolgimento della sua attività, KÌRON PARTNER S.p.A. per tramite dei suoi collaboratori pone in relazione gli istituti di credito con la clientela per la concessione di finanziamenti. KÌRON PARTNER S.p.A. agisce quale mediatore (convenzionato/non convenzionato).
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Mi chiamo <strong>Marianna Di Martino</strong> e opero come consulente mutui e collaboratrice del Gruppo <strong>KÌRON PARTNER S.p.A.</strong> Da oltre 12 anni aiuto famiglie, giovani coppie e acquirenti a realizzare il progetto della propria casa con la massima serenità finanziaria.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              A differenza della singola filiale bancaria, il cui dipendente può proporti solo i prodotti del proprio catalogo, la mia attività è <strong>orientata unicamente al tuo interesse</strong>. Conosco le politiche creditizie dei comitati e so esattamente quale istituto approverà la tua richiesta alle condizioni più trasparenti e vantaggiose.
            </p>

            {/* Metodo di Lavoro in 4 Fasi */}
            <div className="pt-2 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Il Mio Metodo di Lavoro per il Tuo Mutuo
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-xs font-bold text-emerald-700 font-mono">FASE 01</div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">Prefattibilità Scientifica</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Analisi reddituale preventiva per calcolare la tua capacità di rata prima di firmare proposte d'acquisto o versare caparre.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-xs font-bold text-emerald-700 font-mono">FASE 02</div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">Scouting & Negoziazione</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Presentazione del dossier sui canali riservati di oltre 20 banche convenzionate per ottenere tassi e spread scontati.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-xs font-bold text-emerald-700 font-mono">FASE 03</div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">Perizia & Tutela Tecnica</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Supporto nel dialogo con i periti della banca per garantire l'esito positivo della stima dell'immobile.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-xs font-bold text-emerald-700 font-mono">FASE 04</div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">Presenza al Rogito Notarile</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Verifica preliminare della minuta notarile e affiancamento personale all'atto definitivo di compravendita e mutuo.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-2">
              <button
                onClick={onContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                <span>Prenota una Prima Consulenza Gratuita con Marianna Di Martino</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
