import { Language, ShiftType } from '../types';
import { getLiveMyanmarTime } from './scheduleCalculator';

export interface StoredSettings {
  shift: ShiftType;
  rotationMode: 'auto' | 'manual';
  hasEveningOutage: boolean;
  showGenerator: boolean; // default: false (မီးလာ၊ မီးပျက် အချိန်ဇယားပဲပြရန်)
  language: Language;
  isSoundEnabled: boolean;
}

const STORAGE_KEY = 'yangon_power_settings_v4';
const LEGACY_STORAGE_KEY = 'yangon_power_settings_v3';

export const DEFAULT_SETTINGS: StoredSettings = {
  shift: 'shift_a', // Today (Oct 7) is Shift A
  rotationMode: 'auto', // Default: Auto daily alternating rotation
  hasEveningOutage: true, // 5 PM - 9 PM evening outage is active
  showGenerator: false, // Default: FALSE as requested by user! Only show power on / off schedule by default
  language: 'my',
  isSoundEnabled: true,
};

export function loadStoredSettings(): StoredSettings {
  const liveMmt = getLiveMyanmarTime();
  if (typeof window === 'undefined') {
    return {
      ...DEFAULT_SETTINGS,
      shift: liveMmt.autoShift,
    };
  }

  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Check previous key for language/sound migration
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY) || localStorage.getItem('komorebi_power_settings_v1');
      if (legacyRaw) {
        const legacyParsed = JSON.parse(legacyRaw);
        const migrated: StoredSettings = {
          shift: liveMmt.autoShift, // Use today's correct auto-shift (Oct 7 = Shift A)
          rotationMode: 'auto',
          hasEveningOutage: true,
          showGenerator: false,
          language: legacyParsed.language === 'en' ? 'en' : 'my',
          isSoundEnabled: typeof legacyParsed.isSoundEnabled === 'boolean' ? legacyParsed.isSoundEnabled : true,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        return migrated;
      }
      return {
        ...DEFAULT_SETTINGS,
        shift: liveMmt.autoShift,
      };
    }
    const parsed = JSON.parse(raw);
    const rotationMode = parsed.rotationMode === 'manual' ? 'manual' : 'auto';
    const computedShift: ShiftType = rotationMode === 'auto'
      ? liveMmt.autoShift
      : (parsed.shift === 'shift_b' ? 'shift_b' : 'shift_a');

    return {
      shift: computedShift,
      rotationMode,
      hasEveningOutage: typeof parsed.hasEveningOutage === 'boolean' ? parsed.hasEveningOutage : true,
      showGenerator: typeof parsed.showGenerator === 'boolean' ? parsed.showGenerator : false,
      language: parsed.language === 'en' ? 'en' : 'my',
      isSoundEnabled: typeof parsed.isSoundEnabled === 'boolean' ? parsed.isSoundEnabled : true,
    };
  } catch (e) {
    console.warn('Failed to parse settings from localStorage', e);
    return {
      ...DEFAULT_SETTINGS,
      shift: liveMmt.autoShift,
    };
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
