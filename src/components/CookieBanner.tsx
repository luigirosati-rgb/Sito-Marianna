import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, X, Check, Lock, ChevronRight, FileText, AlertCircle } from 'lucide-react';
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
      // If no valid consent found, display banner after a tiny delay
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
    status: 'accepted_all' | 'rejected_all' | 'customized' | 'essential_only'
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

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true }, 'accepted_all');
  };

  const handleRejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false }, 'rejected_all');
  };

  const handleSavePreferences = () => {
    saveConsent(preferences, 'customized');
  };

  const isPreferenceOpen = activeModal === 'cookie_preferences';

  return (
    <>
      {/* 1. FIRST LAYER BANNER (Garante Privacy 10 giugno 2021) */}
      {showBanner && !isPreferenceOpen && (
        <div className="fixed bottom-0 inset-x-0 z-[90] p-4 sm:p-6 bg-slate-950/95 text-white backdrop-blur-md border-t border-slate-800 shadow-2xl animate-fade-in-up">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Message Text & Legal Context */}
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Informativa Cookie e Tutela della Privacy (Regolamento UE 2016/679 - GDPR)
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Questo sito utilizza <strong>cookie tecnici e necessari</strong> per garantire il corretto funzionamento delle simulazioni mutuo e della navigazione. Previo tuo consenso esplicito, possiamo utilizzare anche <strong>cookie analitici e di profilazione</strong> per misurare l'audience e personalizzare le offerte.
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                <span>In conformità alle Linee Guida del Garante Privacy (10 Giugno 2021)</span>
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

            {/* Action Buttons with EQUAL PROMINENCE */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0">
              <button
                onClick={handleRejectAll}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-bold text-xs transition-colors border border-slate-700 hover:border-slate-600 text-center cursor-pointer shadow-sm"
              >
                Rifiuta Tutti (Solo Essenziali)
              </button>

              <button
                onClick={() => setActiveModal('cookie_preferences')}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-emerald-400 rounded-xl font-bold text-xs transition-colors border border-slate-700 hover:border-emerald-500/50 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                Personalizza
              </button>

              <button
                onClick={handleAcceptAll}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-colors shadow-lg shadow-emerald-950/50 text-center cursor-pointer"
              >
                Accetta Tutti
              </button>
            </div>

            {/* Close 'X' Button (defaults to Essential Only per Garante Privacy) */}
            <button
              onClick={handleRejectAll}
              className="absolute top-3 right-3 lg:top-4 lg:right-4 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Chiudi banner (mantiene solo cookie essenziali)"
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
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">Centro Preferenze Privacy & Cookie</h3>
                  <p className="text-xs text-slate-400">Gestisci e personalizza le tue opzioni di consenso</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preference Categories */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  Puoi abilitare o disabilitare liberamente ciascuna categoria di cookie in qualsiasi momento. I cookie tecnici essenziali non possono essere disattivati poiché necessari al funzionamento sicuro del sito.
                </p>
              </div>

              {/* Category 1: Technical (Necessary) */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-slate-500" />
                    <span className="font-bold text-slate-900">1. Cookie Tecnici e Necessari</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                    <span>Sempre Attivi</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Necessari per permettere la navigazione, il mantenimento delle sessioni di simulazione mutui e il salvataggio delle tue scelte sulla privacy. Non richiedono consenso preventivo.
                </p>
              </div>

              {/* Category 2: Analytics */}
              <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-slate-900">2. Cookie Analitici e Statistici</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Permettono di raccogliere dati statistici aggregati in forma anonima sul traffico e sull'utilizzo delle funzionalità della piattaforma, aiutandoci a migliorare il servizio.
                </p>
              </div>

              {/* Category 3: Marketing */}
              <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span className="font-bold text-slate-900">3. Cookie di Marketing e Profilazione</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, marketing: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Utilizzati per mostrare comunicazioni e offerte personalizzate in base alle tue preferenze durante la navigazione sul sito.
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button
                onClick={handleRejectAll}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                Rifiuta Non Essenziali
              </button>
              
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleSavePreferences}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
                >
                  Salva Selezioni
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
                >
                  Accetta Tutti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PERSISTENT FLOATING PRIVACY BADGE (Ex Art. 7 comma 3 GDPR) */}
      {!showBanner && (
        <button
          onClick={() => setActiveModal('cookie_preferences')}
          className="fixed bottom-4 left-4 z-40 px-3.5 py-2.5 bg-slate-950/90 text-white hover:bg-emerald-900 rounded-full shadow-lg border border-slate-700/80 hover:border-emerald-500 text-xs font-semibold flex items-center gap-2 transition-all group hover:scale-105 cursor-pointer backdrop-blur-md"
          title="Gestisci preferenze privacy e cookie in qualsiasi momento"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-slate-200 group-hover:text-white">Privacy & Cookie</span>
        </button>
      )}
    </>
  );
};
