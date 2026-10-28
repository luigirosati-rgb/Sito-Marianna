import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenPrivacyPolicy?: () => void;
  onOpenCookiePolicy?: () => void;
  onOpenCookiePreferences?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyPolicy,
  onOpenCookiePolicy,
  onOpenCookiePreferences,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs py-14 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          {/* Col 1: Brand & OAM Authority */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-xl font-bold text-white tracking-tight">
              Marianna Di Martino
              <span className="block text-xs font-medium text-emerald-400 mt-0.5">Consulente Mutui · Kìron Partner S.p.A.</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Consulenza del credito immobiliare e mediazione creditizia. Accompagno famiglie e acquirenti nella scelta consapevole del miglior mutuo casa tra oltre 20 istituti convenzionati KÌRON PARTNER S.p.A.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>KÌRON PARTNER S.p.A. · Mediatore Creditizio OAM N. M39</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Navigazione Rapida
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('profilo')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Chi Sono & Abilitazione OAM
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('osservatorio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Osservatorio Euribor & Eurirs
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('banche')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Confronto Tassi Banche
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('calcolatore')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Calcolatore Rata & Costi Compravendita
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('guida')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Guida all'Acquisto Casa in 6 Fasi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contatti e Recapiti */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Contatti & Sede
            </div>
            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a
                  href="mailto:marianna.dimartino@kiron.it"
                  className="hover:text-white transition-colors underline decoration-slate-600 font-medium"
                >
                  marianna.dimartino@kiron.it
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <a href="tel:+393272389625" className="hover:text-white transition-colors underline decoration-slate-600 font-mono font-semibold">
                  +39 327 2389625
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Agenzia Kìron Napoli</div>
                  <div className="text-slate-300">Via Nuova Poggioreale, 43 - 80143 Napoli (NA)</div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-0.5">Consulenze in presenza in sede oppure Online a distanza</div>
                  <div className="text-[11px] text-slate-300 font-semibold mt-1">Consulenza 100% gratuita e senza alcun obbligo</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimers & Copyright */}
        <div className="pt-8 space-y-4 text-[11px] text-slate-400 leading-relaxed">
          <p className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 text-slate-300">
            <strong>Informativa e Ruolo Professionale:</strong> Sono una consulente mutui legata a Kìron. <strong>KÌRON PARTNER S.p.A.</strong> è un mediatore creditizio iscritto al n. <strong>M39</strong> dell’elenco tenuto dall’Organismo degli Agenti e dei Mediatori (OAM). Nello svolgimento della sua attività, KÌRON PARTNER S.p.A. per tramite dei suoi collaboratori pone in relazione gli istituti di credito con la clientela per la concessione di finanziamenti. KÌRON PARTNER S.p.A. agisce quale mediatore (convenzionato/non convenzionato).
          </p>
          <p>
            <strong>Trasparenza Informativa e Deontologia Professionale:</strong> Marianna Di Martino opera come collaboratrice nel rispetto delle disposizioni del Titolo VI-bis del D.Lgs. 385/1993 (Testo Unico Bancario) e del D.Lgs. 141/2010. Prima della conclusione di qualsiasi contratto di finanziamento o di mediazione, vengono consegnati al cliente il Foglio Informativo, la Guida Pratica della Banca d'Italia e il Documento di Sintesi recante tutte le condizioni economiche e contrattuali.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-900 text-slate-400">
            <div>
              © {new Date().getFullYear()} Marianna Di Martino · Consulente Mutui KÌRON PARTNER S.p.A. (Mediatore Creditizio OAM N. M39)
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-slate-300">
              {onOpenPrivacyPolicy && (
                <button
                  onClick={onOpenPrivacyPolicy}
                  className="hover:text-emerald-400 underline transition-colors cursor-pointer"
                >
                  Privacy Policy GDPR
                </button>
              )}
              <span aria-hidden="true" className="text-slate-600">·</span>
              {onOpenCookiePolicy && (
                <button
                  onClick={onOpenCookiePolicy}
                  className="hover:text-emerald-400 underline transition-colors cursor-pointer"
                >
                  Cookie Policy
                </button>
              )}
              <span aria-hidden="true" className="text-slate-600">·</span>
              {onOpenCookiePreferences && (
                <button
                  onClick={onOpenCookiePreferences}
                  className="hover:text-emerald-400 underline font-medium transition-colors cursor-pointer text-emerald-400"
                >
                  Gestisci Preferenze Privacy
                </button>
              )}
              <span aria-hidden="true" className="text-slate-600">·</span>
              <a
                href="https://www.organismo-am.it"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 underline transition-colors cursor-pointer"
              >
                Registro OAM Ufficiale
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

