import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, ShieldCheck, MapPin, Video, Info, Lock } from 'lucide-react';
import { BankOffer } from '../types/mortgage';

interface PrefeasibilityFormProps {
  initialData?: {
    propertyValue?: number;
    loanAmount?: number;
    duration?: number;
    selectedBank?: BankOffer | null;
  };
}

export const PrefeasibilityForm: React.FC<PrefeasibilityFormProps> = ({ initialData }) => {
  // State variables
  const [propertyValue, setPropertyValue] = useState<number>(220000);
  const [loanAmount, setLoanAmount] = useState<number>(170000);
  const [duration, setDuration] = useState<number>(25);
  const [employmentType, setEmploymentType] = useState<string>('indeterminato_privato');
  const [consultationMode, setConsultationMode] = useState<'online' | 'presenza'>('online');

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      if (initialData.propertyValue) setPropertyValue(initialData.propertyValue);
      if (initialData.loanAmount) setLoanAmount(initialData.loanAmount);
      if (initialData.duration) setDuration(initialData.duration);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Inserisci il tuo nome e cognome.');
      return;
    }
    if (!phone.trim() || phone.length < 6) {
      setErrorMessage('Inserisci un numero di telefono / WhatsApp valido per contattarti.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Inserisci un indirizzo email valido.');
      return;
    }

    setIsSubmitting(true);

    // Simulation of transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contatto" className="py-12 sm:py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950 text-emerald-300 rounded-full border border-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Consulenza 100% Gratuita e Senza Vincoli</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Richiedi la Verifica di Prefattibilità Mutuo
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Senza alcun costo né obbligo. Analizzo per te la fattibilità del finanziamento e le migliori opzioni di tasso con oltre 20 istituti convenzionati Kìron.
          </p>

          <div className="text-xs text-emerald-400 font-semibold pt-1">
            Sede Operativa: Via Nuova Poggioreale, 43 - 80143 Napoli (NA) · Oppure Online
          </div>
        </div>

        {/* Form Container Card */}
        <div className="bg-white text-slate-900 rounded-2xl p-5 sm:p-8 shadow-2xl border border-slate-200">
          
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900">
                Richiesta Inviata con Successo!
              </h3>

              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Grazie <strong>{fullName}</strong>. Ho ricevuto la tua richiesta di prefattibilità.
                La <strong>Dott.ssa Marianna Di Martino</strong> ti ricontatterà entro 24 ore lavorative via telefono o email per la tua consulenza gratuita.
              </p>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-md mx-auto text-xs text-slate-700 space-y-1 text-left">
                <div className="font-bold text-slate-900">Riepilogo della richiesta:</div>
                <div>· Immobile: <strong>{propertyValue.toLocaleString('it-IT')} €</strong></div>
                <div>· Mutuo richiesto: <strong>{loanAmount.toLocaleString('it-IT')} €</strong> ({duration} Anni)</div>
                <div>· Modalità consulenza: <strong>{consultationMode === 'online' ? 'Online a distanza' : 'In Presenza a Napoli (Via Nuova Poggioreale 43)'}</strong></div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFullName('');
                  setPhone('');
                  setEmail('');
                  setNotes('');
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Invia un'altra richiesta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-bold">
                  {errorMessage}
                </div>
              )}

              {/* Step 1: Scenario Parameters */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  1. Parametri della Simulazione
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="form-prop-val" className="block text-xs font-semibold text-slate-700 mb-1">
                      Prezzo Casa (€)
                    </label>
                    <input
                      id="form-prop-val"
                      type="number"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="form-loan-val" className="block text-xs font-semibold text-slate-700 mb-1">
                      Importo Mutuo (€)
                    </label>
                    <input
                      id="form-loan-val"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="form-dur-val" className="block text-xs font-semibold text-slate-700 mb-1">
                      Durata Mutuo
                    </label>
                    <select
                      id="form-dur-val"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-bold text-slate-900 focus:outline-none"
                    >
                      <option value={15}>15 Anni</option>
                      <option value={20}>20 Anni</option>
                      <option value={25}>25 Anni</option>
                      <option value={30}>30 Anni</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Inquadramento Lavorativo */}
              <div>
                <label htmlFor="form-employment" className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                  Inquadramento Lavorativo Principale
                </label>
                <select
                  id="form-employment"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base sm:text-sm font-semibold text-slate-900 focus:outline-none"
                >
                  <option value="indeterminato_privato">Dipendente Tempo Indeterminato (Settore Privato)</option>
                  <option value="pubblico_statale">Dipendente Pubblico / Statale / Forze dell'Ordine</option>
                  <option value="piva_professionista">Libero Professionista / Partita IVA / Ditta Individuale</option>
                  <option value="determinato">Dipendente Tempo Determinato (con eventuale garante)</option>
                  <option value="pensionato">Pensionato</option>
                </select>
              </div>

              {/* Modalità Consulenza - Large Touch Cards */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                  Modalità di Consulenza Preferita (Gratuita)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationMode('online')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      consultationMode === 'online'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Video className={`w-5 h-5 shrink-0 mt-0.5 ${consultationMode === 'online' ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <div>
                      <div className="font-bold text-sm">Consulenza Online (Consigliata)</div>
                      <div className={`text-xs mt-0.5 ${consultationMode === 'online' ? 'text-slate-300' : 'text-slate-500'}`}>
                        In videocall o telefono, senza vincoli né spostamenti
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultationMode('presenza')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      consultationMode === 'presenza'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${consultationMode === 'presenza' ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <div>
                      <div className="font-bold text-sm">In Presenza in Sede</div>
                      <div className={`text-xs mt-0.5 ${consultationMode === 'presenza' ? 'text-slate-300' : 'text-slate-500'}`}>
                        Via Nuova Poggioreale, 43 - 80143 Napoli (NA)
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Contact Inputs - iOS Safe Font Size (text-base) */}
              <div className="pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-full-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Nome e Cognome *
                    </label>
                    <input
                      id="form-full-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="es. Mario Rossi"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="form-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                      Telefono / WhatsApp *
                    </label>
                    <input
                      id="form-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="es. 340 1234567"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="form-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Email *
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="es. mario.rossi@email.it"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="form-city" className="block text-xs font-semibold text-slate-700 mb-1">
                      Città o Provincia immobile
                    </label>
                    <input
                      id="form-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="es. Napoli, Caserta, Avellino..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label htmlFor="form-notes" className="block text-xs font-semibold text-slate-700 mb-1">
                  Note o esigenze particolari (Opzionale)
                </label>
                <textarea
                  id="form-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="es. Vorrei sapere se rientro nelle agevolazioni Consap Under 36 100%..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              {/* Disclosure Note */}
              <div className="text-[11px] text-slate-500 leading-relaxed space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Trasparenza, Privacy e Riservatezza</span>
                </div>
                <p>
                  <strong>100% Gratuito e Senza Obbligo:</strong> La consulenza non obbliga in alcun modo la persona e non ha nessun costo. I dati forniti saranno trattati da Marianna Di Martino esclusivamente per la verifica preliminare di fattibilità creditizia ai sensi del Regolamento UE 2016/679 (GDPR) e della normativa OAM.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-extrabold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-xl shadow-md transition-colors cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>invio richiesta in corso...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-emerald-400" />
                    <span>Invia Richiesta di Prefattibilità Gratuita</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
