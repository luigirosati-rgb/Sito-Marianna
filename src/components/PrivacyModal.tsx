import React from 'react';
import { X, ShieldCheck, ExternalLink, Mail, Phone, MapPin, Scale, FileText, UserCheck, Lock, ShieldAlert } from 'lucide-react';

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
              <h2 className="text-xl font-bold tracking-tight">Informativa sulla Privacy & Garanzia Zero Parti Terze</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Ai sensi degli artt. 13 e 14 del Regolamento Generale sulla Protezione dei Dati (UE) 2016/679 (GDPR) e Codice Privacy D.Lgs. 196/2003
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Chiudi informativa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable Legal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed font-sans">
          {/* Strict Zero Third-Party Banner */}
          <div className="bg-emerald-50 border-2 border-emerald-400 rounded-xl p-4 text-emerald-950 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
            <ShieldAlert className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold text-emerald-900 text-sm block mb-1 uppercase tracking-wide">
                Garantito 100%: Nessun Dato Viene Trasmesso o Ceduto a Parti Terze
              </strong>
              In totale conformità alla volontà dell'utente e alla normativa europea GDPR, <strong>nessun dato personale, di navigazione o finanziario raccolto tramite questo sito viene mai trasmesso, ceduto, venduto o condiviso con terzi, broker pubblicitari, retargeting network o soggetti terzi</strong> per scopi commerciali, promozionali o di profilazione.
            </div>
          </div>

          {/* Section 1: Titolare del Trattamento */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-2 border-slate-200">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              1. Titolare del Trattamento Esclusivo
            </h3>
            <p>
              I dati forniti dall'utente sono trattati in via riservata ed esclusiva dal Titolare del Trattamento senza l'intervento di intermediari terzi:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-1.5 font-medium text-slate-800">
              <div><strong>Titolare Unico:</strong> Marianna Di Martino</div>
              <div><strong>Qualifica Professionale:</strong> Consulente Mutui · Collaboratore di KÌRON PARTNER S.p.A. (Mediatore Creditizio iscritto OAM n. M39)</div>
              <div className="flex items-center gap-2 pt-1"><MapPin className="w-4 h-4 text-slate-500 shrink-0" /> Sede Operativa: Via Nuova Poggioreale, 43 - 80143 Napoli (NA)</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-500 shrink-0" /> E-mail Riservata Privacy: <a href="mailto:marianna.dimartino@kiron.it" className="text-emerald-700 underline font-semibold">marianna.dimartino@kiron.it</a></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-500 shrink-0" /> Telefono Diretto: <a href="tel:+393272389625" className="text-slate-900 font-mono">+39 327 2389625</a></div>
            </div>
          </section>

          {/* Section 2: Divieto Assoluto di Trasmissione a Terzi */}
          <section className="space-y-3 bg-slate-900 text-white p-5 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              2. Politica "Zero Parti Terze" (Zero Third-Party Transfers)
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm">
              In ottemperanza alle specifiche direttive della Piattaforma e alla normativa GDPR:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
              <li><strong>Zero Cessione Commerciale:</strong> I tuoi dati personali (nome, telefono, email, reddito o preferenze finanziarie) non verranno MAI ceduti né venduti a terzi.</li>
              <li><strong>Zero Script o Cookie di Tracciamento Terzo:</strong> Il sito NON fa uso di pixel di tracciamento social (Meta Pixel, TikTok Pixel, LinkedIn Insights), né di tracker pubblicitari di parti terze (Google Remarketing, Criteo, Taboola, ecc.).</li>
              <li><strong>Gestione Diretta ed Esclusiva:</strong> La tua richiesta viene inviata direttamente ed esclusivamente alla Dr.ssa Marianna Di Martino al solo scopo di fornirti la consulenza sul mutuo da te espressamente richiesta.</li>
            </ul>
          </section>

          {/* Section 3: Finalità del Trattamento */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2 border-slate-200">
              3. Finalità Esclusive del Trattamento (Art. 6 GDPR)
            </h3>
            <p>
              I dati inviati volontariamente tramite i moduli di contatto del sito vengono trattati unicamente per le seguenti finalità dirette:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs sm:text-sm">
              <li>Rispondere alle richieste dirette dell'utente per la prefattibilità del mutuo casa e la simulazione rata.</li>
              <li>Fissare l'appuntamento concordato (in presenza o in videocall).</li>
              <li>Adempiere agli obblighi di legge previsti dalla normativa OAM e Banca d'Italia in materia di trasparenza creditizia.</li>
            </ul>
          </section>

          {/* Section 4: Modalità di Conservazione */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2 border-slate-200">
              4. Modalità di Conservazione e Sicurezza dei Dati
            </h3>
            <p>
              Tutte le informazioni sono gestite mediante strumenti informatici ad elevato standard di protezione e cifratura ex art. 32 GDPR. I dati sono conservati su server localizzati esclusivamente nell'Unione Europea e accessibili solo ed unicamente al Titolare del Trattamento.
            </p>
          </section>

          {/* Section 5: Diritti dell'Interessato (art. 15-22 GDPR) */}
          <section className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600" />
              5. Esercizio Immediato dei Diritti (Accesso, Cancellazione, Oblio)
            </h3>
            <p className="text-xs sm:text-sm">
              Puoi richiedere in qualsiasi momento e senza alcun costo la visione, modifica o **cancellazione immediata** di tutti i tuoi dati contattando direttamente il Titolare via email a: <a href="mailto:marianna.dimartino@kiron.it" className="text-emerald-700 font-bold underline">marianna.dimartino@kiron.it</a>.
            </p>
          </section>

          {/* Section 6: Fonti Istituzionali Ufficiali */}
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2 border-slate-200">
              6. Fonti Normative Istituzionali
            </h3>
            <div className="bg-slate-100 p-4 rounded-xl border border-slate-300 space-y-2">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" /> Riferimenti Normativi Ufficiali:
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
            Verifica Impostazioni Cookie
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
