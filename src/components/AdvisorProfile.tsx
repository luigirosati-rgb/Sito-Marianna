import React, { useState, useEffect } from 'react';
import { ShieldCheck, Camera, RotateCcw, Upload, Maximize2, Move, MapPin, Monitor, Building2 } from 'lucide-react';
import defaultAdvisorPhoto from '../assets/images/marianna_di_martino_photo_1791821479204.jpg';

export const AdvisorProfile: React.FC<{ onContact: () => void }> = ({ onContact }) => {
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [photoFit, setPhotoFit] = useState<'cover' | 'contain'>('cover');
  const [photoPosition, setPhotoPosition] = useState<'top' | 'center'>('top');

  useEffect(() => {
    const savedPhoto = localStorage.getItem('marianna_custom_advisor_photo');
    if (savedPhoto) {
      setCustomPhoto(savedPhoto);
    }
    const savedFit = localStorage.getItem('marianna_photo_fit');
    if (savedFit) {
      setPhotoFit(savedFit as 'cover' | 'contain');
    }
    const savedPos = localStorage.getItem('marianna_photo_position');
    if (savedPos) {
      setPhotoPosition(savedPos as 'top' | 'center');
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomPhoto(result);
        localStorage.setItem('marianna_custom_advisor_photo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setCustomPhoto(null);
    setPhotoFit('cover');
    setPhotoPosition('top');
    localStorage.removeItem('marianna_custom_advisor_photo');
    localStorage.removeItem('marianna_photo_fit');
    localStorage.removeItem('marianna_photo_position');
  };

  const toggleFit = () => {
    const nextFit = photoFit === 'cover' ? 'contain' : 'cover';
    setPhotoFit(nextFit);
    localStorage.setItem('marianna_photo_fit', nextFit);
  };

  const togglePosition = () => {
    const nextPos = photoPosition === 'top' ? 'center' : 'top';
    setPhotoPosition(nextPos);
    localStorage.setItem('marianna_photo_position', nextPos);
  };

  const displayPhoto = customPhoto || defaultAdvisorPhoto;

  return (
    <section id="profilo" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait & Official OAM Badge Box */}
          <div className="lg:col-span-5 space-y-6">
            {/* Container with vertical portrait proportions aspect-3/4 */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-3/4 bg-slate-900/5 max-w-md mx-auto lg:max-w-none group">
              <img
                src={displayPhoto}
                alt="Marianna Di Martino - Consulente Mutui iscritta OAM"
                className={`w-full h-full transition-all ${
                  photoFit === 'contain'
                    ? 'object-contain p-2 bg-slate-950'
                    : photoPosition === 'top'
                    ? 'object-cover object-top'
                    : 'object-cover object-center'
                }`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                <div className="flex items-end justify-between gap-2 pointer-events-auto">
                  <div>
                    <div className="text-xl font-bold">Marianna Di Martino</div>
                    <div className="text-xs text-slate-300 font-medium mt-0.5">
                      Consulente del Credito Immobiliare & Mediatrice OAM
                    </div>
                  </div>

                  {/* Quick Upload Action Button on Image */}
                  <label
                    htmlFor="advisor-photo-upload"
                    className="p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-white transition-all cursor-pointer flex items-center justify-center shrink-0 border border-white/30 hover:scale-105"
                    title="Carica la tua foto vera direttamente dal dispositivo"
                  >
                    <Camera className="w-5 h-5" />
                    <input
                      id="advisor-photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Photo Customization & Alignment Bar */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Upload className="w-4 h-4 text-slate-500" />
                <span>Gestisci Inquadratura Foto:</span>
              </div>
              
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Toggle Centering Position */}
                <button
                  type="button"
                  onClick={togglePosition}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  title="Cambia centraggio (In alto / Al centro)"
                >
                  <Move className="w-3.5 h-3.5 text-slate-500" />
                  <span>Posizione: {photoPosition === 'top' ? 'In Alto (Viso)' : 'Al Centro'}</span>
                </button>

                {/* Toggle Fit Mode (Riempi / Adatta Intera) */}
                <button
                  type="button"
                  onClick={toggleFit}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  title="Cambia modalità di ridimensionamento"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{photoFit === 'cover' ? 'Mostra Intera' : 'Riempi Riquadro'}</span>
                </button>

                {/* Upload Button */}
                <label
                  htmlFor="advisor-photo-upload-btn"
                  className="px-3 py-1.5 font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  Carica Foto
                  <input
                    id="advisor-photo-upload-btn"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {customPhoto && (
                  <button
                    type="button"
                    onClick={handleResetPhoto}
                    className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md transition-colors"
                    title="Ripristina foto predefinita"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Official Certification Card */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>Conformità Normativa OAM Verificabile</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Mediatore Creditizio:</span>
                  <span className="font-bold text-slate-900">KÌRON PARTNER S.p.A.</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Iscrizione Albo OAM:</span>
                  <span className="font-mono font-bold text-slate-900">N. M39 (Kìron Partner)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Qualifica Marianna:</span>
                  <span className="font-medium text-slate-800">Collaboratrice / Consulente Mutui</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Ente Vigilanza:</span>
                  <span className="font-medium text-slate-800">Organismo Agenti e Mediatori</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Polizza RC Professionale:</span>
                  <span className="font-medium text-emerald-700">Attiva a tutela del cliente</span>
                </div>
              </div>
            </div>

            {/* Office Address & Consultation Modalities Card */}
            <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <span>Sede Agenzia e Consulenza</span>
              </div>
              
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5 bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Sede Operativa In Presenza:</div>
                    <div className="text-slate-300 font-medium mt-0.5">
                      Via Nuova Poggioreale, 43 - 80143 Napoli (NA)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                  <Monitor className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Consulenza Online a Distanza:</div>
                    <div className="text-slate-300 mt-0.5 leading-relaxed">
                      Possibilità di svolgere l'intero percorso di consulenza e prefattibilità in videocall o telefonica, ovunque ti trovi.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-lg text-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Consulenza 100% Gratuita e Senza Vincoli:</div>
                    <div className="text-emerald-300 text-[11px] mt-0.5 leading-relaxed">
                      La consulenza non obbliga in alcun modo la persona e non ha nessun costo.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Philosophy & Difference */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Profilo Professionale</span>
              <span aria-hidden="true">·</span>
              <span>Esperienza e Indipendenza</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Dalla tua parte, con la forza e le convenzioni del Gruppo Kìron.
            </h2>

            {/* Mandated Regulatory & Kìron Partner Notice Box */}
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 border border-slate-800 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                Informativa sulla Mediazione Creditizia (KÌRON PARTNER S.p.A.)
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Sono una consulente mutui legata a <strong>Kìron</strong>. <strong>KÌRON PARTNER S.p.A.</strong> è un mediatore creditizio iscritto al n. <strong>M39</strong> dell’elenco tenuto dall’Organismo degli Agenti e dei Mediatori (OAM). Nello svolgimento della sua attività, KÌRON PARTNER S.p.A. per tramite dei suoi collaboratori pone in relazione gli istituti di credito con la clientela per la concessione di finanziamenti. KÌRON PARTNER S.p.A. agisce quale mediatore (convenzionato/non convenzionato).
              </p>
            </div>

            <p className="text-base text-slate-600 leading-relaxed">
              Mi chiamo <strong>Marianna Di Martino</strong> e opero come consulente mutui e collaboratrice del Gruppo <strong>KÌRON PARTNER S.p.A.</strong> Da oltre 12 anni aiuto famiglie, giovani coppie e acquirenti a realizzare il progetto della propria casa con la massima serenità finanziaria.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              A differenza della singola filiale bancaria, il cui dipendente può proporti solo ed esclusivamente i prodotti del proprio catalogo (spesso a condizioni standard), la mia attività è <strong>indipendente e orientata unicamente al tuo interesse</strong>. Conosco i criteri di delibera dei diversi comitati crediti e so esattamente quale banca delibererà la tua richiesta alle condizioni più vantaggiose.
            </p>

            {/* Metodo di Lavoro in 4 Fasi Editoriali */}
            <div className="pt-2 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Il Mio Metodo di Lavoro
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500">01.</div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">Prefattibilità Scientifica</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Analisi del reddito, del modello DTI (debt-to-income) e rilascio del budget massimo spendibile prima di versare caparre.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500">02.</div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">Scouting & Negoziazione</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Presentazione del dossier sui canali preferenziali di oltre 20 istituti per negoziare lo spread e gli oneri accessori.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500">03.</div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">Perizia & Tutela Tecnica</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Monitoraggio della perizia immobiliare e verifica preventiva di conformità edilizia e catastale dell'immobile.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-500">04.</div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">Presenza al Rogito Notarile</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Controllo della minuta notarile con il notaio e presenza fisica fino alla firma dell'atto di compravendita e mutuo.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-2">
              <button
                onClick={onContact}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                <span>Prenota una Prima Consulenza con Marianna Di Martino</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
