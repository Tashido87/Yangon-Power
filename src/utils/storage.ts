import { Language, ShiftType } from '../types';

export interface StoredSettings {
  shift: ShiftType;
  hasEveningOutage: boolean;
  language: Language;
  isSoundEnabled: boolean;
}

const STORAGE_KEY = 'komorebi_power_settings_v1';

export const DEFAULT_SETTINGS: StoredSettings = {
  shift: 'shift_b',
  hasEveningOutage: false, // Default: false as user explicitly requested "ညနေ ၅ ဆို မီးမပျက်တော့ဘူးနော်။ လောလောဆယ်"
  language: 'my',
  isSoundEnabled: true,
};

export function loadStoredSettings(): StoredSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      shift: parsed.shift === 'shift_a' ? 'shift_a' : 'shift_b',
      hasEveningOutage: typeof parsed.hasEveningOutage === 'boolean' ? parsed.hasEveningOutage : false,
      language: parsed.language === 'en' ? 'en' : 'my',
      isSoundEnabled: typeof parsed.isSoundEnabled === 'boolean' ? parsed.isSoundEnabled : true,
    };
  } catch (e) {
    console.warn('Failed to parse settings from localStorage', e);
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: Partial<StoredSettings>): void {
  if (typeof window === 'undefined') return;
  try {
    const current = loadStoredSettings();
    const updated: StoredSettings = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save settings to localStorage', e);
  }
}
