import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

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
      {/* Strict 3-zone contract: Brand — 4-5 single line links — 1 primary action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, single line text element */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('home');
          }}
          className="flex flex-col hover:opacity-90 transition-opacity shrink-0"
        >
          <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap leading-none">
            Marianna Di Martino
          </span>
          <span className="text-[10px] font-semibold tracking-wide text-emerald-800 uppercase mt-0.5">
            Consulente Mutui · Kìron Partner
          </span>
        </a>

        {/* Zone 2: 4-5 nav links, 1-2 word labels, single line */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => scrollTo('profilo')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Chi Sono
          </button>
          <button
            onClick={() => scrollTo('osservatorio')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Osservatorio Tassi
          </button>
          <button
            onClick={() => scrollTo('banche')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Confronto Banche
          </button>
          <button
            onClick={() => scrollTo('calcolatore')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Calcolatore Mutuo
          </button>
          <button
            onClick={() => scrollTo('calcolatore-surroga')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-emerald-800 font-semibold"
          >
            Simulatore Surroga
          </button>
          <button
            onClick={() => scrollTo('guida')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Guida Acquisto
          </button>
          <button
            onClick={() => scrollTo('assicurazioni')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Polizze Assicurative
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex px-5 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            Richiedi Consulenza
          </button>

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-md focus:outline-hidden"
            aria-label="Apri menu principale"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollTo('profilo')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-slate-900"
          >
            Chi Sono
          </button>
          <button
            onClick={() => scrollTo('osservatorio')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-slate-900"
          >
            Osservatorio Tassi
          </button>
          <button
            onClick={() => scrollTo('banche')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-slate-900"
          >
            Confronto Banche
          </button>
          <button
            onClick={() => scrollTo('calcolatore')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-slate-900"
          >
            Calcolatore Mutuo
          </button>
          <button
            onClick={() => scrollTo('calcolatore-surroga')}
            className="block w-full text-left py-2 text-base font-semibold text-emerald-800 hover:text-emerald-900"
          >
            Simulatore Surroga
          </button>
          <button
            onClick={() => scrollTo('guida')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-slate-900"
          >
            Guida Acquisto
          </button>
          <button
            onClick={() => scrollTo('assicurazioni')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-slate-900"
          >
            Polizze Assicurative
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-slate-900 rounded-lg"
            >
              Richiedi Consulenza Gratuita
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
