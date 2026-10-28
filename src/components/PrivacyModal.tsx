import React from 'react';
import { X, ShieldCheck, ExternalLink, Mail, Phone, MapPin, Scale, FileText, UserCheck, Lock } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCookiePreferences: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
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
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Informativa sulla Privacy (Privacy Policy)</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Ai sensi degli artt. 13 e 14 del Regolamento Generale sulla Protezione dei Dati (UE) 2016/679 (GDPR) e del Codice Privacy D.Lgs. 196/2003 e s.m.i.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Chiudi informativa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable Legal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed font-sans">
          {/* Summary Callout */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-950 text-xs sm:text-sm flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-1">Impegno per la Trasparenza e la Protezione dei Dati:</strong>
              I tuoi dati personali sono trattati nel rispetto dei principi di correttezza, liceità, trasparenza e tutela della riservatezza. Il presente documento descrive le modalità di raccolta, utilizzo, conservazione e protezione dei dati personali effettuati attraverso questo sito web.
            </div>
          </div>

          {/* Section 1: Titolare del Trattamento */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-2 border-slate-200">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              1. Titolare del Trattamento e Dati di Contatto
            </h3>
            <p>
              Il Titolare del Trattamento dei dati personali forniti tramite questo sito è:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-1.5 font-medium text-slate-800">
              <div><strong>Titolare:</strong> Marianna Di Martino</div>
              <div><strong>Qualifica Professionale:</strong> Consulente Mutui · Collaboratore di KÌRON PARTNER S.p.A. (Mediatore Creditizio iscritto OAM n. M39)</div>
              <div className="flex items-center gap-2 pt-1"><MapPin className="w-4 h-4 text-slate-500 shrink-0" /> Sede Operativa: Via Nuova Poggioreale, 43 - 80143 Napoli (NA)</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-500 shrink-0" /> E-mail di Contatto Privacy: <a href="mailto:marianna.dimartino@kiron.it" className="text-emerald-700 underline font-semibold">marianna.dimartino@kiron.it</a></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-500 shrink-0" /> Telefono: <a href="tel:+393272389625" className="text-slate-900 font-mono">+39 327 2389625</a></div>
            </div>
          </section>

          {/* Section 2: Tipologia di Dati Raccolti */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2 border-slate-200">
              2. Tipologie di Dati Personali Raccolti
            </h3>
            <p>
              Tramite la navigazione e la compilazione del modulo di prefattibilità e contatto sul presente sito, possono essere raccolte le seguenti categorie di dati:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>Dati identificativi e di contatto:</strong> Nome, cognome, indirizzo e-mail, numero di telefono cellulare.</li>
              <li><strong>Dati finanziari e patrimoniali orientativi per la prefattibilità del mutuo:</strong> Importo del prestito richiesto, valore dell'immobile, durata del finanziamento, situazione lavorativa, reddito mensile/annuo indicativo.</li>
              <li><strong>Dati di navigazione e tecnici:</strong> Indirizzo IP, orari di accesso, parametri di sistema, log di consenso cookie, identificativo unico di sessione.</li>
            </ul>
          </section>

          {/* Section 3: Finalità e Basi Giuridiche del Trattamento */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2 border-slate-200">
              3. Finalità del Trattamento e Basi Giuridiche (ex art. 6 GDPR)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700 border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Finalità del Trattamento</th>
                    <th className="p-3">Base Giuridica (Art. 6 GDPR)</th>
                    <th className="p-3">Natura del Conferimento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Esecuzione di richieste precontrattuali di consulenza creditizia e simulazione mutuo.</td>
                    <td className="p-3">Esecuzione di misure precontrattuali adottate su richiesta dell'interessato (Art. 6, par. 1, lett. b GDPR).</td>
                    <td className="p-3">Facoltativo ma necessario per erogare la consulenza richiesta.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Adempimento di obblighi di legge, normativi o regolamentari OAM / Banca d'Italia.</td>
                    <td className="p-3">Adempimento di un obbligo legale al quale è soggetto il Titolare (Art. 6, par. 1, lett. c GDPR).</td>
                    <td className="p-3">Obbligatorio per legge.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Navigazione sul sito e sicurezza informatica.</td>
                    <td className="p-3">Legittimo interesse del Titolare a garantire la funzionalità e la sicurezza del sito (Art. 6, par. 1, lett. f GDPR).</td>
                    <td className="p-3">Automatico e tecnico.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Statistiche e personalizzazione tramite cookie non essenziali.</td>
                    <td className="p-3">Consenso libero ed esplicito espresso dall'utente tramite il banner cookie (Art. 6, par. 1, lett. a GDPR).</td>
                    <td className="p-3">Totalmente facoltativo. Revocabile in qualsiasi momento.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Modalità di Trattamento e Conservazione dei Dati */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2 border-slate-200">
              4. Modalità di Trattamento e Tempi di Conservazione
            </h3>
            <p>
              Il trattamento è effettuato mediante strumenti informatici, telematici e/o manuali con logiche strettamente correlate alle finalità e con l'adozione di adeguate misure di sicurezza tecniche e organizzative ex art. 32 GDPR.
            </p>
            <p>
              <strong>Periodo di conservazione:</strong> I dati personali saranno conservati esclusivamente per il tempo strettamente necessario a gestire la richiesta di consulenza creditizia (massimo 12 mesi dalla ricezione per contatti non finalizzati) oppure per i tempi prescritti dalle norme in materia creditizia e fiscale (fino a 10 anni in caso di perfezionamento della pratica di mediazione).
            </p>
          </section>

          {/* Section 5: Destinatari dei Dati e Trasferimento Extra-UE */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2 border-slate-200">
              5. Destinatari e Trasferimento dei Dati
            </h3>
            <p>
              I dati non saranno mai venduti o ceduti a terzi per scopi commerciali autonomi. I dati potranno essere comunicati esclusivamente a:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>KÌRON PARTNER S.p.A.:</strong> Società di mediazione creditizia per la gestione delle istruttorie finanziarie.</li>
              <li><strong>Istituti di Credito e Banche convenzionate:</strong> Previo specifico consenso dell'interessato per l'inoltro delle richieste di mutuo.</li>
              <li><strong>Fornitori di servizi tecnici e hosting web:</strong> Designati quali Responsabili del Trattamento ex art. 28 GDPR.</li>
            </ul>
            <p className="text-xs text-slate-600">
              I dati sono conservati su server ubicati all'interno dell'Unione Europea. Eventuali trasferimenti verso Paesi Extra-UE avvengono unicamente in presenza di Decisioni di Adeguatezza o Clausole Contrattuali Standard approvate dalla Commissione Europea.
            </p>
          </section>

          {/* Section 6: Diritti dell'Interessato (art. 15-22 GDPR) */}
          <section className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600" />
              6. Diritti dell'Interessato (Art. 15–22 GDPR)
            </h3>
            <p>
              In ogni momento, l'interessato ha il diritto di esercitare verso il Titolare i seguenti diritti garantiti dal GDPR:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-1">Diritto di Accesso (Art. 15)</strong>
                Ottenere conferma che sia in corso un trattamento e accedere ai propri dati.
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-1">Diritto di Rettifica (Art. 16)</strong>
                Ottenere l'aggiornamento o la correzione dei dati inesatti.
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-1">Cancellazione / Oblio (Art. 17)</strong>
                Richiedere la cancellazione dei dati non più necessari o trattati illecitamente.
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-1">Limitazione del Trattamento (Art. 18)</strong>
                Chiedere il blocco temporaneo del trattamento dei propri dati.
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-1">Portabilità dei Dati (Art. 20)</strong>
                Ricevere i propri dati in formato strutturato di uso comune e leggibile da dispositivo automatico.
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-1">Opposizione e Revoca Consenso (Art. 21)</strong>
                Opporti al trattamento e revocare il consenso espresso in qualsiasi momento.
              </div>
            </div>
            <p className="text-xs pt-2 text-slate-700">
              Per esercitare ciascuno dei diritti sopra citati, è possibile inviare una richiesta scritta a mezzo e-mail all'indirizzo: <a href="mailto:marianna.dimartino@kiron.it" className="text-emerald-700 font-semibold underline">marianna.dimartino@kiron.it</a>. Risponderemo senza ingiustificato ritardo entro 30 giorni dalla richiesta.
            </p>
          </section>

          {/* Section 7: Diritto di Reclamo e Fonti Istituzionali Ufficiali */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2 border-slate-200">
              7. Diritto di Reclamo e Fonti Istituzionali di Riferimento
            </h3>
            <p>
              Qualora ritenga che il trattamento dei propri dati violi le disposizioni del Regolamento UE 2016/679 o la normativa italiana vigenti, l'interessato ha il diritto di proporre reclamo all'Autorità Garante per la protezione dei dati personali.
            </p>

            <div className="bg-slate-100 p-4 rounded-xl border border-slate-300 space-y-2">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" /> Fonti Ufficiali ed Istituzionali Consultabili:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <a
                  href="https://www.garanteprivacy.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2.5 rounded-lg border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 flex items-center justify-between font-medium transition-colors"
                >
                  <span>Garante Privacy Italia</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://www.normattiva.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2.5 rounded-lg border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 flex items-center justify-between font-medium transition-colors"
                >
                  <span>Normattiva (Codice Privacy)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a
                  href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32016R0679"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2.5 rounded-lg border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 flex items-center justify-between font-medium transition-colors"
                >
                  <span>EUR-Lex (GDPR UE 2016/679)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </section>

          {/* Section 8: Aggiornamenti della Policy */}
          <section className="text-xs text-slate-500 pt-2 border-t border-slate-200">
            <strong>Ultimo aggiornamento conforme alle fonti normative vigenti:</strong> Ottobre 2026. Il presente documento viene aggiornato al variare della normativa o delle modalità di trattamento.
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenCookiePreferences();
            }}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline cursor-pointer"
          >
            Gestisci / Personalizza le Preferenze Cookie
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
          >
            Ho Compreso e Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
