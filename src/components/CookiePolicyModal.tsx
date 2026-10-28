import React from 'react';
import { X, Cookie, ShieldCheck, ExternalLink, Settings, CheckCircle2, ShieldAlert } from 'lucide-react';

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
              <h2 className="text-xl font-bold tracking-tight">Cookie Policy & Assenza Tracciamento Terze Parti</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Conforme alle Linee guida del Garante Privacy del 10 giugno 2021 e alla Direttiva ePrivacy 2002/58/CE
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Chiudi informativa cookie"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed font-sans">
          {/* Third-Party Zero Banner */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-emerald-950 text-xs sm:text-sm flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block mb-1">Nessun Cookie o Tracciatore di Parti Terze:</strong>
              Questo sito utilizza **esclusivamente cookie tecnici di prima parte** essenziali alla navigazione. NON vengono utilizzati cookie di terze parti (es. social network, ad network esterni, pixel di profilazione commerciale) né vengono trasmessi dati a soggetti terzi.
            </div>
          </div>

          {/* Section 1: Cookie di Prima Parte Strettamente Necessari */}
          <section className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2 border-slate-200">
              1. Tipologia di Cookie Utilizzati (Solo Prima Parte)
            </h3>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Cookie Tecnici di Prima Parte (Sempre Attivi)
                </span>
                <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  Prima Parte / Essenziali
                </span>
              </div>
              <p className="text-xs text-slate-600">
                L'utilizzo è limitato ai soli cookie di sessione e tecnici locali necessari per salvare le preferenze di navigazione dell'utente e consentire l'utilizzo dei calcolatori e delle simulazioni mutuo in modalità totalmente protetta.
              </p>
              <div className="text-[11px] text-slate-500 font-mono bg-white p-2 rounded border border-slate-200 mt-1">
                Identificatore: <code>marianna_cookie_consent_v1</code> (salva la scelta privacy direttamente sul tuo dispositivo senza inviare dati all'esterno).
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-xl border border-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                  Cookie e Profilazione di Terze Parti
                </span>
                <span className="text-[11px] font-semibold bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                  DISATTIVATI / NON PRESENTI
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Sul presente sito **NON sono attivi** cookie di terze parti, pixel di retargeting o script di profilazione commerciale esterna. Nessun dato di navigazione viene condiviso con parti terze.
              </p>
            </div>
          </section>

          {/* Section 2: Gestione Browser */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2 border-slate-200">
              2. Controllo dei Cookie tramite Browser
            </h3>
            <p className="text-xs text-slate-600">
              Puoi verificare o bloccare i cookie in qualsiasi momento direttamente dalle impostazioni riservate del tuo browser:
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
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenCookiePreferences();
            }}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline cursor-pointer"
          >
            Pannello Preferenze Cookie
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
          >
            Chiudi Informativa
          </button>
        </div>
      </div>
    </div>
  );
};
