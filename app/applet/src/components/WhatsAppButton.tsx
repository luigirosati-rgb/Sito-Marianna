import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '393272389625',
  defaultMessage = 'Ciao Marianna, vorrei informazioni e una consulenza per un mutuo casa.'
}) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Tooltip Card - visible on desktop and tablet */}
      {showTooltip && (
        <div className="hidden sm:flex relative bg-white text-slate-900 px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 text-xs font-medium max-w-xs flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <span>Vuoi un parere rapido sul tuo mutuo? <strong>Scrivimi su WhatsApp</strong></span>
          <button
            onClick={() => setShowTooltip(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full transition-colors shrink-0 ml-1 cursor-pointer"
            aria-label="Chiudi avviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button - hidden on mobile (since MobileActionBar has WhatsApp), visible on desktop */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contatta Marianna Di Martino su WhatsApp"
        className="hidden md:flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="font-bold">Contatta Marianna</span>
      </a>
    </div>
  );
};
