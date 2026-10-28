import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, PhoneCall, Clock, Calendar, AlertCircle, MapPin, Video } from 'lucide-react';
import { BankOffer } from '../types/mortgage';

interface PrefeasibilityFormProps {
  initialData?: {
    propertyValue?: number;
    loanAmount?: number;
    duration?: number;
    selectedBank?: BankOffer | null;
  };
}

import { parseCurrency } from '../utils/numberFormatters';

export const PrefeasibilityForm: React.FC<PrefeasibilityFormProps> = ({ initialData }) => {
  const [purpose, setPurpose] = useState<string>('prima_casa');
  const [propertyPriceInput, setPropertyPriceInput] = useState<string>((initialData?.propertyValue || 200000).toString());
  const [loanAmountInput, setLoanAmountInput] = useState<string>((initialData?.loanAmount || 160000).toString());
  const [employmentType, setEmploymentType] = useState<string>('indeterminato_privato');
  const [monthlyIncomeInput, setMonthlyIncomeInput] = useState<string>('2600');

  const propertyPrice = parseCurrency(propertyPriceInput, 200000);
  const loanAmount = parseCurrency(loanAmountInput, 160000);
  const monthlyIncome = parseCurrency(monthlyIncomeInput, 2600);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [consultationMode, setConsultationMode] = useState<'presenza' | 'online'>('online');
  const [notes, setNotes] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [privacyAccepted, setPrivacyAccepted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Inserisci il tuo nome e cognome.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Inserisci un indirizzo email valido.');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorMessage('Inserisci un numero di telefono valido per il ricontatto.');
      return;
    }
    if (!privacyAccepted) {
      setErrorMessage('È necessario prendere visione e accettare l\'informativa sulla privacy per proseguire.');
      return;
    }

    setIsSubmitting(true);
    // Simulate swift submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="contatto" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Servizio Gratuito & Riservato</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Richiedi la tua prefattibilità mutuo gratuita
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Compila i dati essenziali: analizzerò gratuitamente il tuo profilo reddituale per individuare la banca convenzionata con il miglior tasso e le massime probabilità di delibera.
          </p>

          {/* Guarantee banner */}
          <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-900 flex items-center justify-center gap-2 font-medium shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span><strong>Nessun Costo e Nessun Obbligo:</strong> La consulenza è al 100% gratuita e non vincola la persona in alcun modo.</span>
          </div>
        </div>

        {initialData?.selectedBank && (
          <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-700">
            <div>
              Banca selezionata per valutazione: <strong className="text-slate-900 font-bold">{initialData.selectedBank.bankName}</strong> ({initialData.selectedBank.productName})
            </div>
            <span className="font-mono font-bold text-slate-900">TAN {initialData.selectedBank.tan.toFixed(2)}%</span>
          </div>
        )}

        {isSubmitted ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 text-center space-y-5">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">
                Richiesta di Prefattibilità Inviata con Successo!
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Grazie <strong>{fullName}</strong>. Ho ricevuto la tua richiesta per un mutuo di circa <strong>{loanAmount.toLocaleString('it-IT')} €</strong> su immobile di valore <strong>{propertyPrice.toLocaleString('it-IT')} €</strong>.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 max-w-md mx-auto text-left space-y-3 text-xs text-slate-700">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                Cosa succederà adesso?
              </div>
              <p>
                1. <strong>Contatto telefonico in 24h:</strong> Ti chiamerò al numero <span className="font-mono font-semibold">{phone}</span> per concordare l'appuntamento ({consultationMode === 'presenza' ? 'presso la sede di Via Nuova Poggioreale 43 a Napoli' : 'in videocall online o telefonica'}).
              </p>
              <p>
                2. <strong>Raccolta documentale semplificata:</strong> Ti invierò l'elenco dei documenti necessari (ultime buste paga / dichiarazione dei redditi).
              </p>
              <p>
                3. <strong>Studio di fattibilità:</strong> Riceverai la comparazione reale dei tassi e il parere preliminare di fattibilità.
              </p>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setFullName('');
                setEmail('');
                setPhone('');
              }}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline pt-2 cursor-pointer"
            >
              Invia un'altra richiesta o modifica i parametri
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs"
          >
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Finalità Operazione */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                Finalità dell'Operazione
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'prima_casa', label: 'Acquisto 1ª Casa' },
                  { id: 'giovani_under36', label: 'Under 36 Consap' },
                  { id: 'seconda_casa', label: 'Seconda Casa' },
                  { id: 'surroga', label: 'Surroga Mutuo Esistente' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPurpose(item.id)}
                    className={`py-2 px-3 rounded-lg border text-center font-medium transition-all cursor-pointer ${
                      purpose === item.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dati Economici Principali */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="form-property-price" className="block text-xs font-semibold text-slate-700 mb-1">
                  Valore Immobile (€)
                </label>
                <input
                  id="form-property-price"
                  type="text"
                  inputMode="numeric"
                  value={propertyPriceInput}
                  onChange={(e) => setPropertyPriceInput(e.target.value)}
                  onBlur={() => {
                    if (!propertyPriceInput.trim()) setPropertyPriceInput('200000');
                  }}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 font-mono tabular-nums focus:outline-hidden"
                  required
                  placeholder="200000"
                />
              </div>

              <div>
                <label htmlFor="form-loan-amount" className="block text-xs font-semibold text-slate-700 mb-1">
                  Mutuo Desiderato (€)
                </label>
                <input
                  id="form-loan-amount"
                  type="text"
                  inputMode="numeric"
                  value={loanAmountInput}
                  onChange={(e) => setLoanAmountInput(e.target.value)}
                  onBlur={() => {
                    if (!loanAmountInput.trim()) setLoanAmountInput('160000');
                  }}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 font-mono tabular-nums focus:outline-hidden"
                  required
                  placeholder="160000"
                />
              </div>

              <div>
                <label htmlFor="form-monthly-income" className="block text-xs font-semibold text-slate-700 mb-1">
                  Reddito Mensile Netto (€)
                </label>
                <input
                  id="form-monthly-income"
                  type="text"
                  inputMode="numeric"
                  value={monthlyIncomeInput}
                  onChange={(e) => setMonthlyIncomeInput(e.target.value)}
                  onBlur={() => {
                    if (!monthlyIncomeInput.trim()) setMonthlyIncomeInput('2600');
                  }}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 font-mono tabular-nums focus:outline-hidden"
                  required
                  placeholder="2600"
                />
              </div>
            </div>

            {/* Inquadramento Lavorativo */}
            <div>
              <label htmlFor="form-employment-type" className="block text-xs font-semibold text-slate-700 mb-1">
                Tipo di Impiego Principale
              </label>
              <select
                id="form-employment-type"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-hidden"
              >
                <option value="indeterminato_privato">Dipendente Tempo Indeterminato (Settore Privato)</option>
                <option value="pubblico_statale">Dipendente Pubblico / Statale / Forze dell'Ordine</option>
                <option value="piva_professionista">Libero Professionista / Partita IVA / Ditta Individuale</option>
                <option value="determinato">Dipendente Tempo Determinato (con eventuale garante)</option>
                <option value="pensionato">Pensionato</option>
              </select>
            </div>

            {/* Modalità Consulenza Desiderata */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                Modalità di Consulenza Preferita
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setConsultationMode('online')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                    consultationMode === 'online'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Video className={`w-4 h-4 shrink-0 mt-0.5 ${consultationMode === 'online' ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="font-bold">Consulenza Online (Consigliata)</div>
                    <div className={`text-[11px] mt-0.5 ${consultationMode === 'online' ? 'text-slate-300' : 'text-slate-500'}`}>
                      In videocall o telefono, comoda e senza spostamenti
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationMode('presenza')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                    consultationMode === 'presenza'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${consultationMode === 'presenza' ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="font-bold">In Presenza in Agenzia</div>
                    <div className={`text-[11px] mt-0.5 ${consultationMode === 'presenza' ? 'text-slate-300' : 'text-slate-500'}`}>
                      Via Nuova Poggioreale, 43 - 80143 Napoli (NA)
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Dati di Contatto */}
            <div className="pt-2 border-t border-slate-200">
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
                    placeholder="es. Marco Rossi"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-hidden"
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
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-hidden"
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
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="form-city" className="block text-xs font-semibold text-slate-700 mb-1">
                    Città / Provincia immobile
                  </label>
                  <input
                    id="form-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="es. Milano, Roma, Bologna..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Note opzionali */}
            <div>
              <label htmlFor="form-notes" className="block text-xs font-semibold text-slate-700 mb-1">
                Note o dubbi particolari (Opzionale)
              </label>
              <textarea
                id="form-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="es. Ho già individuato la casa, vorrei sapere se posso accedere al fondo Consap 100%..."
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-hidden"
              />
            </div>

            {/* Privacy, veridicità e consenso */}
            <div className="text-[11px] text-slate-500 leading-relaxed space-y-2 pt-2 border-t border-slate-200">
              <div className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-slate-200">
                <input
                  id="form-privacy-consent"
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  required
                />
                <label htmlFor="form-privacy-consent" className="text-xs text-slate-700 cursor-pointer leading-snug">
                  Dichiaro di aver preso visione dell'<strong>Informativa sulla Privacy (GDPR UE 2016/679)</strong> e acconsento al trattamento dei dati personali per l'elaborazione della richiesta di prefattibilità mutuo. *
                </label>
              </div>

              <p className="text-[11px] text-slate-500">
                <strong>100% Gratuito e Senza Obbligo:</strong> La consulenza non obbliga in alcun modo e non comporta costi. I dati forniti saranno trattati da Marianna Di Martino esclusivamente per la verifica preliminare di fattibilità creditizia ai sensi delle normative vigenti.
              </p>
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Elaborazione richiesta in corso...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Invia Richiesta di Prefattibilità Gratuita</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
