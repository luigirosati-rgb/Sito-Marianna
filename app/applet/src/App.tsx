/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarketRatesObservatory } from './components/MarketRatesObservatory';
import { BankComparison } from './components/BankComparison';
import { MortgageCalculator } from './components/MortgageCalculator';
import { SurrogaCalculator } from './components/SurrogaCalculator';
import { AdvisorProfile } from './components/AdvisorProfile';
import { HomeBuyingGuide } from './components/HomeBuyingGuide';
import { InsuranceServices } from './components/InsuranceServices';
import { PrefeasibilityForm } from './components/PrefeasibilityForm';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MobileActionBar } from './components/MobileActionBar';
import { BankOffer } from './types/mortgage';

export default function App() {
  const [prefilledFormData, setPrefilledFormData] = useState<{
    propertyValue?: number;
    loanAmount?: number;
    duration?: number;
    selectedBank?: BankOffer | null;
  }>({});

  const scrollToContact = () => {
    const el = document.getElementById('contatto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRates = () => {
    const el = document.getElementById('osservatorio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calcolatore');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBankSelect = (bank: BankOffer) => {
    setPrefilledFormData((prev) => ({
      ...prev,
      selectedBank: bank
    }));
    scrollToContact();
  };

  const handleCalculatorPrefeasibility = (data: { propertyValue: number; loanAmount: number; duration: number }) => {
    setPrefilledFormData((prev) => ({
      ...prev,
      propertyValue: data.propertyValue,
      loanAmount: data.loanAmount,
      duration: data.duration
    }));
    scrollToContact();
  };

  const handleSurrogaPrefeasibility = (data: { loanAmount: number; duration: number; currentRate: number; newRate: number }) => {
    setPrefilledFormData((prev) => ({
      ...prev,
      loanAmount: data.loanAmount,
      duration: data.duration
    }));
    scrollToContact();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white pb-16 md:pb-0">
      {/* Header Nav */}
      <Navbar onOpenConsultation={scrollToContact} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onStartSimulation={scrollToContact}
          onExploreRates={scrollToRates}
        />

        {/* 2. Professional Profile of Marianna Di Martino & OAM Credentials */}
        <AdvisorProfile onContact={scrollToContact} />

        {/* 3. Real-time Market Rates Observatory (Euribor, IRS, BCE, Spread) */}
        <MarketRatesObservatory onSimulate={scrollToCalculator} />

        {/* 4. Comparison of Bank Offers & Products */}
        <BankComparison onSelectBank={handleBankSelect} />

        {/* 5. Advanced Mortgage & Home Buying Costs Calculator */}
        <MortgageCalculator onPrefeasibilityRequest={handleCalculatorPrefeasibility} />

        {/* 5b. Dedicated Surroga & Refinancing Calculator */}
        <SurrogaCalculator onPrefeasibilityRequest={handleSurrogaPrefeasibility} />

        {/* 6. Step-by-Step Home Buying Guide in Italy */}
        <HomeBuyingGuide />

        {/* 7. Insurance & Ancillary Services (Kìron Partner) */}
        <InsuranceServices onContact={scrollToContact} />

        {/* 8. Interactive Pre-feasibility Form & Consultation Request */}
        <PrefeasibilityForm initialData={prefilledFormData} />

        {/* 9. Homebuyers FAQ */}
        <FaqSection />
      </main>

      {/* Floating WhatsApp Action Button for Desktop */}
      <WhatsAppButton />

      {/* Fixed Sticky Action Bar for Mobile Smartphones */}
      <MobileActionBar onOpenConsultation={scrollToContact} />

      {/* Compliant Footer with OAM disclosures */}
      <Footer />
    </div>
  );
}
