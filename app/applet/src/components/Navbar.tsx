import React, { useState } from 'react';
import { Menu, X, ChevronRight, MapPin, Phone, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Title */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('home');
          }}
          className="flex flex-col hover:opacity-90 transition-opacity shrink-0"
        >
          <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap leading-none">
            Marianna Di Martino
          </span>
          <span className="text-[10px] font-semibold tracking-wide text-emerald-800 uppercase mt-1 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Consulente Mutui · Kìron Partner
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => scrollTo('profilo')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Chi Sono
          </button>
          <button
            onClick={() => scrollTo('osservatorio')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Osservatorio Tassi
          </button>
          <button
            onClick={() => scrollTo('banche')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Confronto Banche
          </button>
          <button
            onClick={() => scrollTo('calcolatore')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Calcolatore Mutuo
          </button>
          <button
            onClick={() => scrollTo('calcolatore-surroga')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer text-emerald-800 font-semibold"
          >
            Simulatore Surroga
          </button>
          <button
            onClick={() => scrollTo('guida')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Guida Acquisto
          </button>
          <button
            onClick={() => scrollTo('assicurazioni')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Polizze
          </button>
        </nav>

        {/* Action Button & Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            Richiedi Consulenza
          </button>

          {/* Mobile hamburger menu button with large tap target */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-slate-800 hover:text-slate-900 hover:bg-slate-100 rounded-xl focus:outline-none transition-colors border border-slate-200"
            aria-label="Apri menu principale"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Slide-Down */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-8 space-y-2 max-h-[85vh] overflow-y-auto shadow-2xl animate-fade-in">
          {/* Agency Badge inside menu */}
          <div className="p-3 bg-slate-900 text-white rounded-xl mb-3 space-y-1 text-xs">
            <div className="font-bold flex items-center justify-between text-emerald-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Marianna Di Martino · Kìron Partner
              </span>
              <span className="bg-emerald-900 text-emerald-200 text-[10px] px-2 py-0.5 rounded font-mono">
                OAM M39
              </span>
            </div>
            <div className="text-slate-300 flex items-center gap-1.5 pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Via Nuova Poggioreale, 43 - Napoli (Sede o Online)</span>
            </div>
          </div>

          <div className="space-y-1 text-slate-800 font-medium">
            <button
              onClick={() => scrollTo('profilo')}
              className="flex items-center justify-between w-full py-3 px-3 text-base text-left rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors"
            >
              <span>Chi Sono & Certificazione OAM</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => scrollTo('osservatorio')}
              className="flex items-center justify-between w-full py-3 px-3 text-base text-left rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors"
            >
              <span>Osservatorio Tassi (Euribor / IRS)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => scrollTo('banche')}
              className="flex items-center justify-between w-full py-3 px-3 text-base text-left rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors"
            >
              <span>Confronto Offerte 20+ Banche</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => scrollTo('calcolatore')}
              className="flex items-center justify-between w-full py-3 px-3 text-base text-left rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors"
            >
              <span>Calcolatore Rata & Costi Notaio</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => scrollTo('calcolatore-surroga')}
              className="flex items-center justify-between w-full py-3 px-3 text-base font-semibold text-emerald-900 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <span>Simulatore Risparmio Surroga</span>
              <ChevronRight className="w-4 h-4 text-emerald-600" />
            </button>

            <button
              onClick={() => scrollTo('guida')}
              className="flex items-center justify-between w-full py-3 px-3 text-base text-left rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors"
            >
              <span>Guida all'Acquisto Casa (6 Fasi)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => scrollTo('assicurazioni')}
              className="flex items-center justify-between w-full py-3 px-3 text-base text-left rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors"
            >
              <span>Polizze Mutuo & Protezione Casa</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3.5 text-center text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-colors"
            >
              Richiedi Consulenza Gratuita
            </button>

            <a
              href="tel:+393272389625"
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Chiamata diretta: +39 327 2389625</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
