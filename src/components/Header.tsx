import React from 'react';
import { Volume2, VolumeX, Languages, Settings } from 'lucide-react';
import { Language } from '../types';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  isSoundEnabled,
  onToggleSound,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EFECE6] px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
        {/* Brand mark */}
        <div className="flex items-center gap-2">
          <div className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#2D3142] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7A9E7E] inline-block animate-soft-pulse" />
            <span>Yangon Power</span>
          </div>
        </div>

        {/* Quick Tools: Sound, Language & Setting */}
        <div className="flex items-center gap-2">
          {/* Sound / Vibration Toggle Button */}
          <button
            onClick={() => {
              onToggleSound();
              if (!isSoundEnabled) {
                soundManager.setSoundEnabled(true);
                soundManager.playCutePop();
              }
            }}
            title={isSoundEnabled ? 'Sound is on' : 'Sound is muted'}
            aria-label="Toggle sound and vibration"
            className={`cute-press h-9 px-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-medium border transition-all ${
              isSoundEnabled
                ? 'bg-white border-[#7A9E7E]/30 text-[#7A9E7E] shadow-2xs'
                : 'bg-white/60 border-[#EFECE6] text-[#6C727F]'
            }`}
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-70" />}
            <span className="hidden sm:inline text-[11px]">
              {isSoundEnabled ? (language === 'en' ? 'Sound' : 'အသံဖွင့်') : (language === 'en' ? 'Mute' : 'အသံပိတ်')}
            </span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => {
              const newLang = language === 'en' ? 'my' : 'en';
              onLanguageChange(newLang);
              soundManager.playCutePop();
              soundManager.triggerVibrate([20]);
            }}
            title="Toggle English / Myanmar (မြန်မာ)"
            className="cute-press h-9 px-2.5 sm:px-3 rounded-xl bg-white border border-[#EFECE6] text-xs font-semibold text-[#2D3142] shadow-2xs hover:border-[#8AA399]/40 flex items-center gap-1.5 transition-all"
          >
            <Languages className="w-3.5 h-3.5 text-[#8AA399]" />
            <span className="tabular-nums">{language === 'en' ? 'မြန်မာ' : 'EN'}</span>
          </button>

          {/* Settings Modal Button */}
          <button
            onClick={() => {
              onOpenSettings();
              soundManager.playCutePop();
            }}
            title="Open Settings"
            aria-label="Open Settings"
            className="cute-press h-9 px-2.5 sm:px-3 rounded-xl bg-white border border-[#EFECE6] text-xs font-semibold text-[#2D3142] shadow-2xs hover:border-[#7A9E7E]/50 flex items-center gap-1.5 transition-all"
          >
            <Settings className="w-3.5 h-3.5 text-[#7A9E7E]" />
            <span className="text-[11px] font-medium hidden xs:inline">{language === 'en' ? 'Settings' : 'ချိန်ညှိရန်'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

