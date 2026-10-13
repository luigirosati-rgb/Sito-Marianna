import React from 'react';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';

interface MobileActionBarProps {
  onOpenConsultation: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onOpenConsultation }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 px-3 py-2.5 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 items-center text-center">
        {/* Direct Call */}
        <a
          href="tel:+393272389625"
          className="flex flex-col items-center justify-center py-1.5 px-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-100 rounded-lg transition-colors border border-slate-700/80"
        >
          <Phone className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[11px] font-bold leading-none">Chiama Ora</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href="https://wa.me/393272389625?text=Salve%20Dott.ssa%20Marianna%20Di%20Martino,%20vorrei%20maggiori%20informazioni%20per%20una%20consulenza%20mutuo%20gratuita."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white rounded-lg transition-colors border border-emerald-600/80 shadow-xs"
        >
          <MessageCircle className="w-4 h-4 text-emerald-100 mb-0.5" />
          <span className="text-[11px] font-bold leading-none">WhatsApp</span>
        </a>

        {/* Free Consultation Request */}
        <button
          type="button"
          onClick={onOpenConsultation}
          className="flex flex-col items-center justify-center py-1.5 px-2 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-extrabold rounded-lg transition-colors border border-emerald-400/80 shadow-xs cursor-pointer"
        >
          <CalendarCheck className="w-4 h-4 text-slate-950 mb-0.5" />
          <span className="text-[11px] font-black leading-none uppercase tracking-tight">Consulenza</span>
        </button>
      </div>
    </div>
  );
};
