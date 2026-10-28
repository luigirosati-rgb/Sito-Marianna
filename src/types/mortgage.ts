export interface MarketRateItem {
  name: string;
  code: string;
  value: number;
  previousValue: number;
  change: number; // positive or negative
  period: string;
  description: string;
}

export interface BankOffer {
  id: string;
  bankName: string;
  productName: string;
  logoText: string;
  logoBg: string;
  rateType: 'fisso' | 'variabile' | 'misto';
  tan: number;
  taeg: number;
  spread: number;
  benchmark: string;
  maxLtv: number;
  category: ('prima_casa' | 'seconda_casa' | 'giovani_consap' | 'surroga' | 'green')[];
  investigationFee: number; // Spese istruttoria (€)
  appraisalFee: number; // Spese perizia (€)
  minDuration: number;
  maxDuration: number;
  highlights: string[];
  notes?: string;
}

export interface CostBreakdown {
  propertyPrice: number;
  loanAmount: number;
  downPayment: number;
  ltv: number;
  isFirstHome: boolean;
  isFromBuilder: boolean;
  cadastralValue: number;
  registrationTax: number;
  vatTax: number;
  substituteTax: number;
  notaryFee: number;
  agencyFee: number;
  bankInvestigationFee: number;
  bankAppraisalFee: number;
  totalAncillaryCosts: number;
  totalCashNeeded: number;
}

export interface InstallmentSimulation {
  monthlyInstallment: number;
  totalInterest: number;
  totalRepayment: number;
  debtToIncomeRatio: number;
  sustainabilityStatus: 'ottimale' | 'accettabile' | 'critico';
}

export interface PrefeasibilityLead {
  purpose: 'prima_casa' | 'giovani_under36' | 'seconda_casa' | 'surroga' | 'ristrutturazione';
  propertyValue: number;
  loanAmount: number;
  durationYears: number;
  preferredRate: 'fisso' | 'variabile' | 'consigliami';
  employmentType: 'indeterminato_privato' | 'pubblico_statale' | 'piva_professionista' | 'determinato' | 'pensionato';
  monthlyNetIncome: number;
  coSignerIncome: number;
  existingLoansMonthly: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  notes?: string;
}
