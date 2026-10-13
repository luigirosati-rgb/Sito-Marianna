/**
 * Utility functions for parsing user numeric inputs accurately in Italian & International formats.
 */

/**
 * Parses a rate / percentage input (e.g., TAN, TAEG, DTI %).
 * Accepts inputs like "4.60", "4,60", "2.85", "2,85", "0.5".
 * Replaces comma with dot for decimal handling.
 * NEVER strips dots from single decimal percentage rates (avoiding turning 4.60 into 460).
 */
export const parseRate = (val: string | number, fallback = 0): number => {
  if (typeof val === 'number') return isNaN(val) ? fallback : val;
  if (!val || typeof val !== 'string' || val.trim() === '') return fallback;

  const trimmed = val.trim();
  // Replace comma with dot (e.g. "4,60" -> "4.60")
  const cleaned = trimmed.replace(/,/g, '.');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? fallback : parsed;
};

/**
 * Parses monetary amounts (e.g. loan amount, property value, income).
 * Handles both plain numbers ("135000"), Italian formatted ("135.000" or "135.000,50")
 * and English formatted ("135,000" or "135,000.50").
 */
export const parseCurrency = (val: string | number, fallback = 0): number => {
  if (typeof val === 'number') return isNaN(val) ? fallback : val;
  if (!val || typeof val !== 'string' || val.trim() === '') return fallback;

  const trimmed = val.trim();

  // If both dots and commas exist (e.g. "135.000,50" or "135,000.50")
  if (trimmed.includes('.') && trimmed.includes(',')) {
    if (trimmed.indexOf('.') < trimmed.indexOf(',')) {
      // Italian format: 135.000,50 -> dots are thousands, comma is decimal
      const cleaned = trimmed.replace(/\./g, '').replace(',', '.');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? fallback : parsed;
    } else {
      // US format: 135,000.50 -> commas are thousands, dot is decimal
      const cleaned = trimmed.replace(/,/g, '');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? fallback : parsed;
    }
  }

  // If only dot exists (e.g. "135.000" vs "135000.50")
  if (trimmed.includes('.')) {
    const parts = trimmed.split('.');
    // If it looks like Italian thousands separators e.g. "135.000" or "1.500.000"
    // where every group after the first is exactly 3 digits
    if (parts.length > 1 && parts.every((part, idx) => idx === 0 || part.length === 3)) {
      const cleaned = trimmed.replace(/\./g, '');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? fallback : parsed;
    }
    // Standard decimal dot
    const parsed = parseFloat(trimmed);
    return isNaN(parsed) ? fallback : parsed;
  }

  // If only comma exists (e.g. "135000,50" or "135,000")
  if (trimmed.includes(',')) {
    const parts = trimmed.split(',');
    if (parts.length === 2 && parts[1].length <= 2) {
      // Italian decimal comma e.g. 135000,50
      const cleaned = trimmed.replace(',', '.');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? fallback : parsed;
    }
    // Thousands comma e.g. 135,000
    const cleaned = trimmed.replace(/,/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? fallback : parsed;
  }

  const parsed = parseFloat(trimmed);
  return isNaN(parsed) ? fallback : parsed;
};
