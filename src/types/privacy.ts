export interface CookiePreferences {
  necessary: boolean; // Always true, technical cookies
  analytics: boolean; // Performance / Analytics cookies
  marketing: boolean; // Marketing / Profiling cookies
}

export interface ConsentRecord {
  version: string;
  timestamp: string; // ISO string
  preferences: CookiePreferences;
  status: 'accepted_all' | 'rejected_all' | 'customized' | 'essential_only';
}

export type ActivePrivacyModal = 'privacy_policy' | 'cookie_policy' | 'cookie_preferences' | null;
