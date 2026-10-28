export interface CookiePreferences {
  necessary: boolean; // Always true, first-party technical cookies only
  analytics: boolean; // Disabled / First-party only (no third parties)
  marketing: boolean; // Always false / No third-party data transmission
}

export interface ConsentRecord {
  version: string;
  timestamp: string; // ISO string
  preferences: CookiePreferences;
  status: 'accepted_all' | 'rejected_all' | 'customized' | 'essential_only' | 'zero_third_party';
}

export type ActivePrivacyModal = 'privacy_policy' | 'cookie_policy' | 'cookie_preferences' | null;
