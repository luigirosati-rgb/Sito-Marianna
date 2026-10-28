import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, X, Lock, FileText, ShieldAlert } from 'lucide-react';
import { CookiePreferences, ConsentRecord, ActivePrivacyModal } from '../types/privacy';

const STORAGE_KEY = 'marianna_cookie_consent_v1';
const CONSENT_VERSION = '1.0.0';

interface CookieBannerProps {
  onOpenPrivacyPolicy: () => void;
  onOpenCookiePolicy: () => void;
  activeModal: ActivePrivacyModal;
  setActiveModal: (modal: ActivePrivacyModal) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  onOpenPrivacyPolicy,
  onOpenCookiePolicy,
  activeModal,
  setActiveModal,
}) => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  // Load existing consent on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: ConsentRecord = JSON.parse(saved);
        if (parsed && parsed.preferences) {
          setPreferences(parsed.preferences);
          setShowBanner(false);
          return;
        }
      }
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 500);
      return () => clearTimeout(timer);
    } catch (e) {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (
    prefs: CookiePreferences,
    status: 'accepted_all' | 'rejected_all' | 'customized' | 'essential_only' | 'zero_third_party'
  ) => {
    const record: ConsentRecord = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      preferences: prefs,
      status,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch (e) {
      console.warn('Impossibile salvare il consenso nei dati locali', e);
    }
    setPreferences(prefs);
    setShowBanner(false);
    setActiveModal(null);
  };

  const handleConfirmEssentialOnly = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false }, 'zero_third_party');
  };

  const isPreferenceOpen = activeModal === 'cookie_preferences';

  return (
    <>
      {/* 1. FIRST LAYER BANNER WITH ZERO THIRD-PARTY GUARANTEE */}
      {showBanner && !isPreferenceOpen && (
        <div className="fixed bottom-0 inset-x-0 z-[90] p-4 sm:p-6 bg-slate-950/95 text-white backdrop-blur-md border-t border-slate-800 shadow-2xl animate-fade-in-up">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Text & Explicit Guarantee */}
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Tutela della Privacy: Garanzia Zero Trasmissione a Parti Terze
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Questo sito rispetta la tua riservatezza: <strong>nessun dato personale viene trasmesso, ceduto o condiviso con parti terze o fornitori pubblicitari esterni</strong>. Vengono utilizzati esclusivamente cookie tecnici essenziali di prima parte necessari per la navigazione e per l'elaborazione protetta delle simulazioni mutuo.
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                <span className="text-emerald-400 font-medium">✓ 100% Nessuna Terza Parte</span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <button
                  onClick={onOpenPrivacyPolicy}
                  className="text-emerald-400 hover:underline font-medium cursor-pointer"
                >
                  Leggi Privacy Policy
                </button>
                <span aria-hidden="true">·</span>
                <button
                  onClick={onOpenCookiePolicy}
                  className="text-emerald-400 hover:underline font-medium cursor-pointer"
                >
                  Leggi Cookie Policy
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0">
              <button
                onClick={handleConfirmEssentialOnly}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-colors shadow-lg text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Accetta Cookie Essenziali (Zero Terze Parti)</span>
              </button>

              <button
                onClick={() => setActiveModal('cookie_preferences')}
                className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl font-bold text-xs transition-colors border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                Dettagli
              </button>
            </div>

            {/* Close 'X' Button */}
            <button
              onClick={handleConfirmEssentialOnly}
              className="absolute top-3 right-3 lg:top-4 lg:right-4 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Chiudi banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. SECOND LAYER PREFERENCES MODAL */}
      {isPreferenceOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">Centro Privacy & Dati Personali</h3>
                  <p className="text-xs text-slate-400">Verifica della politica Zero Parti Terze</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preference Categories */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                  Su questa piattaforma <strong>nessun dato viene trasmesso a parti terze</strong>. La navigazione e l'invio dei moduli avvengono direttamente con il Titolare del Trattamento in forma riservata e crittografata.
                </p>
              </div>

              {/* Category 1: Technical (Necessary) */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">1. Cookie Tecnici Locali (Prima Parte)</span>
                  </div>
                  <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                    Attivi (Prima Parte)
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consentono la navigazione sicura sul sito e il calcolo delle simulazioni. I dati non lasciano mai il server del Titolare.
                </p>
              </div>

              {/* Category 2: Third Parties (Disabled) */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-100 opacity-80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-slate-500" />
                    <span className="font-bold text-slate-700">2. Tracciamento o Cookie di Parti Terze</span>
                  </div>
                  <div className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                    Disattivato / Non Presente
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  In conformità alle disposizioni richieste, non è attivo alcun sistema di tracciamento o trasmissione dati verso soggetti terzi o social network.
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
              <button
                onClick={handleConfirmEssentialOnly}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                Conferma e Salva Impostazioni
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. PERSISTENT FLOATING PRIVACY BADGE */}
      {!showBanner && (
        <button
          onClick={() => setActiveModal('cookie_preferences')}
          className="fixed bottom-4 left-4 z-40 px-3.5 py-2.5 bg-slate-950/90 text-white hover:bg-emerald-900 rounded-full shadow-lg border border-slate-700/80 hover:border-emerald-500 text-xs font-semibold flex items-center gap-2 transition-all group hover:scale-105 cursor-pointer backdrop-blur-md"
          title="Verifica garanzia riservatezza e assenza parti terze"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-slate-200 group-hover:text-white">Zero Parti Terze · Privacy</span>
        </button>
      )}
    </>
  );
};
