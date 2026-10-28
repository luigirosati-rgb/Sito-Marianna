import React from 'react';
import { X, Cookie, ShieldCheck, ExternalLink, Settings, CheckCircle2, AlertCircle } from 'lucide-react';

interface CookiePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCookiePreferences: () => void;
}

export const CookiePolicyModal: React.FC<CookiePolicyModalProps> = ({
  isOpen,
  onClose,
  onOpenCookiePreferences,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Cookie className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Informativa Estesa sui Cookie (Cookie Policy)</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                In conformità alle Linee guida del Garante Privacy del 10 giugno 2021 e alla Direttiva ePrivacy 2002/58/CE
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Chiudi informativa cookie"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable Cookie Policy Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed font-sans">
          {/* Summary Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-950 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-1">Cosa sono i Cookie?</strong>
              I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell'utente (browser), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. Questo sito utilizza unicamente cookie tecnici necessari al funzionamento e, solo se preventivamente autorizzati dall'utente, cookie di analisi o personalizzazione.
            </div>
          </div>

          {/* Section 1: Principi Fondamentali Garante Privacy 2021 */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2 border-slate-200">
              1. Conformità alle Linee Guida del Garante della Privacy (10 Giugno 2021)
            </h3>
            <p>
              In ossequio alle direttive emanate dall'Autorità Garante per la Protezione dei Dati Personali (Doc. web n. 9677876):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li><strong>Impostazioni Predefinite (Privacy by Default):</strong> Al primo accesso, l'utente naviga in modalità protetta senza che venga attivato alcun cookie o tracciatore diverso da quelli strettamente tecnici.</li>
              <li><strong>Equiparazione della Chiusura (Pulsante X / Rifiuta tutti):</strong> Chiudendo il banner o facendo clic su "Rifiuta tutti" non viene prestato alcun consenso ai cookie non essenziali.</li>
              <li><strong>Esercizio e Revoca del Consenso in ogni momento:</strong> Tramite il pulsante galleggiante "Preferenze Privacy" presente su tutte le pagine, l'utente può riaprire il pannello delle preferenze e modificare le sue scelte quando lo desidera.</li>
            </ul>
          </section>

          {/* Section 2: Categorie di Cookie Utilizzate */}
          <section className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2 border-slate-200">
              2. Categorie di Cookie e Finalità
            </h3>

            {/* Category 1: Technical */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Cookie Tecnici e Strettamente Necessari (Sempre Attivi)
                </span>
                <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  Obbligatori per Legge
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Sono indispensabili per il corretto funzionamento del sito, per la navigazione sicura, per consentire la compilazione dei moduli di simulazione e per memorizzare le impostazioni sulla privacy scelte dall'utente. Per l'installazione di tali cookie non è richiesto il preventivo consenso dell'utente (Art. 122 D.Lgs. 196/2003).
              </p>
              <div className="text-[11px] text-slate-500 font-mono bg-white p-2 rounded border border-slate-200 mt-1">
                Esempi: <code>cookie_consent_status</code> (memorizza il consenso privacy per 6 mesi), <code>session_id</code>.
              </div>
            </div>

            {/* Category 2: Analytics */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Cookie Analitici e Prestazionali (Opzionali)
                </span>
                <span className="text-[11px] font-semibold bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                  Richiedono Consenso
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Laddove attivati, consentono di raccogliere informazioni in forma aggregata ed anonima sul numero degli utenti e su come questi visitano il sito (pagine più viste, tempo di permanenza), al fine di migliorare le prestazioni del servizio.
              </p>
            </div>

            {/* Category 3: Marketing */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Settings className="w-4 h-4 text-purple-600" />
                  Cookie di Marketing e Profilazione (Opzionali)
                </span>
                <span className="text-[11px] font-semibold bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                  Richiedono Consenso
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Servono a tracciare la navigazione dell'utente in rete per creare profili sui suoi gusti, abitudini e scelte, al fine di trasmettere messaggi pubblicitari in linea con le preferenze manifestate dall'utente durante la navigazione.
              </p>
            </div>
          </section>

          {/* Section 3: Gestione tramite Browser */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2 border-slate-200">
              3. Come Disabilitare i Cookie dai Principali Browser
            </h3>
            <p className="text-xs text-slate-600">
              Oltre ad utilizzare il nostro pannello di controllo, è possibile gestire o disabilitare i cookie direttamente dalle impostazioni del proprio browser di navigazione:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
              <a
                href="https://support.google.com/chrome/answer/95647?hl=it"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg flex items-center justify-between transition-colors"
              >
                <span>Google Chrome</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg flex items-center justify-between transition-colors"
              >
                <span>Mozilla Firefox</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg flex items-center justify-between transition-colors"
              >
                <span>Apple Safari</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-400c-57f3-4382-d77824f2927d"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg flex items-center justify-between transition-colors"
              >
                <span>Microsoft Edge</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </section>

          {/* Section 4: Fonti Normative Ufficiali */}
          <section className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Riferimenti Normativi e Guida Ufficiale Garante Privacy:
            </div>
            <p className="text-xs text-slate-600">
              Per maggiori informazioni sui tuoi diritti e sulle norme in materia di strumenti di tracciamento, puoi consultare la scheda sintetica ufficiale dell'Autorità Garante Privacy per la Protezione dei Dati Personali:
            </p>
            <div className="pt-1">
              <a
                href="https://www.garanteprivacy.it/cookie"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline"
              >
                <span>Linee guida Garante Privacy per i cookie (garanteprivacy.it/cookie)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenCookiePreferences();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            Personalizza Preferenze Cookie
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
          >
            Chiudi Informativa
          </button>
        </div>
      </div>
    </div>
  );
};
