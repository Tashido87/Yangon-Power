import React from 'react';
import { X, Settings, Check, Zap, Moon, Volume2, VolumeX, Languages, Sparkles } from 'lucide-react';
import { Language, ShiftType } from '../types';
import { soundManager } from '../utils/audio';
import { PWAInstallButton } from './PWAInstallButton';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: ShiftType;
  rotationMode?: 'auto' | 'manual';
  onShiftChange: (shift: ShiftType, mode?: 'auto' | 'manual') => void;
  hasEveningOutage: boolean;
  onToggleEveningOutage: (val: boolean) => void;
  showGenerator: boolean;
  onToggleShowGenerator: (val: boolean) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  shift,
  rotationMode = 'auto',
  onShiftChange,
  hasEveningOutage,
  onToggleEveningOutage,
  showGenerator,
  onToggleShowGenerator,
  language,
  onLanguageChange,
  isSoundEnabled,
  onToggleSound,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#EAE6DF] max-h-[90vh] overflow-y-auto space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#FAF7F2] border border-[#EAE6DF] flex items-center justify-center text-[#7A9E7E]">
              <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#2D3142]">
                {language === 'en' ? 'Settings & Preferences' : 'စနစ်ချိန်ညှိချက်များ'}
              </h2>
              <p className="text-[11px] text-[#8AA399]">
                {language === 'en' ? 'Customized for your condo building' : 'ကွန်ဒိုမီးပေးစနစ် စိတ်ကြိုက်ချိန်ညှိရန်'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              soundManager.playCutePop();
            }}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#F3EFEA] text-[#6C727F] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section 1: Power Shift Selection */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#2D3142] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#7A9E7E]" />
              <span>{language === 'en' ? 'Daily Power Shift Rotation:' : 'မီးပေးအလှည့်ကျစနစ် (တရက်စီ အလှည့်ကျ) -'}</span>
            </label>
            {rotationMode === 'auto' && (
              <span className="text-[10px] text-[#7A9E7E] font-semibold bg-[#EBF3EC] px-2 py-0.5 rounded-full border border-[#7A9E7E]/30">
                {language === 'en' ? 'Auto Rotation Active' : 'အလိုအလျောက် အလှည့်ကျစနစ်'}
              </span>
            )}
          </div>

          {/* Auto Mode Card */}
          <button
            type="button"
            onClick={() => {
              onShiftChange('shift_a', 'auto');
              soundManager.playCutePop();
            }}
            className={`w-full cute-press p-3 rounded-2xl text-left border transition-all ${
              rotationMode === 'auto'
                ? 'bg-[#EBF3EC]/60 border-[#7A9E7E] text-[#2D3142] ring-2 ring-[#7A9E7E]/10'
                : 'bg-white border-[#EAE6DF] text-[#6C727F] hover:bg-[#FAF7F2]/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#2D3142] flex items-center gap-1.5">
                <span>🔄 {language === 'en' ? 'Auto Daily Alternation (Recommended)' : 'အလိုအလျောက် တရက်စီ အလှည့်ကျစနစ် (သတ်မှတ်ထားသည်)'}</span>
              </span>
              {rotationMode === 'auto' && (
                <span className="w-4 h-4 rounded-full bg-[#7A9E7E] text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5" />
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#6C727F] leading-relaxed">
              {language === 'en'
                ? 'Yesterday 9-1 Cut → Today 5-9 Cut (9 AM Power Back) → Alternates daily.'
                : 'မနေ့က ၉-၁ မီးပျက်လျှင် ယနေ့ ၅-၉ မီးပျက်ပြီး ၉:၀၀ မီးပြန်လာမည် (ရက်အလိုက် အလိုအလျောက် ပြောင်းလဲပေးပါသည်)။'}
            </p>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Shift A */}
            <button
              type="button"
              onClick={() => {
                onShiftChange('shift_a', 'manual');
                soundManager.playCutePop();
              }}
              className={`cute-press p-3 rounded-2xl text-left border transition-all ${
                shift === 'shift_a' && rotationMode !== 'auto'
                  ? 'bg-[#FAF7F2] border-[#7A9E7E] text-[#2D3142] shadow-xs ring-2 ring-[#7A9E7E]/10'
                  : 'bg-white border-[#EAE6DF] text-[#6C727F] hover:bg-[#FAF7F2]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#2D3142]">
                  {language === 'en' ? 'Shift A (5 AM Outage · 9 AM Back)' : 'အလှည့် A (မနက် ၅ နာရီပျက် · ၉ နာရီလာ)'}
                </span>
                {shift === 'shift_a' && rotationMode !== 'auto' && (
                  <span className="w-4 h-4 rounded-full bg-[#7A9E7E] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#727885] leading-relaxed">
                {language === 'en'
                  ? '5 AM Cut → 9 AM Back → 1 PM Cut → 5 PM Back (Night ON)'
                  : '၅ နာရီပျက် → ၉ နာရီလာ → ၁ နာရီပျက် → ၅ နာရီလာ (ညမပျက်)'}
              </p>
            </button>

            {/* Shift B */}
            <button
              type="button"
              onClick={() => {
                onShiftChange('shift_b', 'manual');
                soundManager.playCutePop();
              }}
              className={`cute-press p-3 rounded-2xl text-left border transition-all ${
                shift === 'shift_b' && rotationMode !== 'auto'
                  ? 'bg-[#FAF7F2] border-[#7A9E7E] text-[#2D3142] shadow-xs ring-2 ring-[#7A9E7E]/10'
                  : 'bg-white border-[#EAE6DF] text-[#6C727F] hover:bg-[#FAF7F2]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#2D3142]">
                  {language === 'en' ? 'Shift B (9 AM Outage · 1 PM Back)' : 'အလှည့် B (မနက် ၉ နာရီပျက် · ၁ နာရီလာ)'}
                </span>
                {shift === 'shift_b' && rotationMode !== 'auto' && (
                  <span className="w-4 h-4 rounded-full bg-[#7A9E7E] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#727885] leading-relaxed">
                {language === 'en'
                  ? '9 AM Cut → 1 PM Back → 5 PM Cut → 9 PM Back'
                  : '၉ နာရီပျက် → ၁ နာရီလာ → ၅ နာရီပျက် → ၉ နာရီလာ'}
              </p>
            </button>
          </div>
        </div>

        {/* Section 2: Evening 5:00 PM - 9:00 PM Outage Toggle */}
        <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE6DF] space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-[#2D3142] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E2847A]" />
                <span>
                  {language === 'en'
                    ? 'Evening 5:00 PM – 9:00 PM Outage'
                    : 'ညနေ ၅:၀၀ မှ ၉:၀၀ မီးပျက်ချိန်'}
                </span>
              </div>
              <p className="text-[11px] text-[#727885] mt-0.5 leading-relaxed">
                {hasEveningOutage
                  ? (language === 'en'
                      ? '5:00 PM – 9:00 PM Outage is active (Power back at 9:00 PM).'
                      : 'ညနေ ၅:၀၀ မှ ည ၉:၀၀ ထိ မီးပျက်ပါမည် (ည ၉:၀၀ မီးပြန်လာမည်)။')
                  : (language === 'en'
                      ? 'No 5 PM outage: Evening power remains ON.'
                      : 'ညနေ ၅ နာရီ မီးမပျက်ဘဲ ဆက်လက်ရရှိနေမည်။')}
              </p>
            </div>

            {/* Cute Pill Switch */}
            <button
              type="button"
              onClick={() => {
                onToggleEveningOutage(!hasEveningOutage);
                soundManager.playCutePop();
              }}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 shrink-0 ${
                hasEveningOutage ? 'bg-[#7A9E7E]' : 'bg-[#D1D5DB]'
              }`}
              title="Toggle Evening Outage"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                  hasEveningOutage ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="text-[10px] bg-white/80 p-2 rounded-xl border border-[#EFECE6] flex items-center justify-between">
            <span className={hasEveningOutage ? 'text-[#B8574B] font-medium' : 'text-[#7A9E7E] font-medium'}>
              {hasEveningOutage
                ? (language === 'en' ? '⚠️ 5 PM – 9 PM Outage Active' : '⚠️ ညနေ ၅ – ၉ မီးပျက်သည် (ည ၉ မီးလာ)')
                : (language === 'en' ? '✨ Evening power remains ON' : '✨ ညနေပိုင်း မီးဆက်လာမည်')}
            </span>
            <span className="font-semibold text-[#7A9E7E]">
              {language === 'en' ? 'Active' : 'သတ်မှတ်ထားသည်'}
            </span>
          </div>
        </div>

        {/* Section 3: Generator Schedule Display Toggle (Requested by user: default OFF) */}
        <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE6DF] space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-[#2D3142] flex items-center gap-1.5">
                <span className="text-sm">⚙️</span>
                <span>
                  {language === 'en'
                    ? 'Generator Schedule Display'
                    : 'မီးစက် အချိန်ဇယား ပြသမှု'}
                </span>
              </div>
              <p className="text-[11px] text-[#727885] mt-0.5 leading-relaxed">
                {showGenerator
                  ? (language === 'en'
                      ? 'Generator schedule enabled (Showing operating & standby hours).'
                      : 'မီးစက်မောင်းချိန်နှင့် နားချိန်များကို ထည့်သွင်းပြသနေပါသည်။')
                  : (language === 'en'
                      ? 'Hidden (Default) · Showing Grid Power On & Outage schedule only.'
                      : 'မီးစက်ပြသမှု ပိတ်ထားပါသည် · အစိုးရမီး လာ/ပျက် အချိန်ဇယားကိုသာ ပြသနေပါသည် (မူလသတ်မှတ်ချက်)။')}
              </p>
            </div>

            {/* Cute Pill Switch */}
            <button
              type="button"
              onClick={() => {
                onToggleShowGenerator(!showGenerator);
                soundManager.playCutePop();
              }}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 shrink-0 cursor-pointer ${
                showGenerator ? 'bg-[#7A9E7E]' : 'bg-[#D1D5DB]'
              }`}
              title="Toggle Generator Display"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                  showGenerator ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="text-[10px] bg-white/80 p-2 rounded-xl border border-[#EFECE6] flex items-center justify-between">
            <span className={showGenerator ? 'text-[#7A9E7E] font-medium' : 'text-[#6C727F] font-medium'}>
              {showGenerator
                ? (language === 'en' ? '🟢 Showing Generator Hours' : '🟢 မီးစက်မောင်းချိန်များ ပြသနေသည်')
                : (language === 'en' ? '⚪ Grid Power On / Off Only (Generator Hidden)' : '⚪ အစိုးရမီး လာ/ပျက် သီးသန့်ပြသမှု (မီးစက်မပြပါ)')}
            </span>
            <span className={`font-semibold ${showGenerator ? 'text-[#7A9E7E]' : 'text-[#6C727F]'}`}>
              {showGenerator ? (language === 'en' ? 'ON' : 'ဖွင့်ထားသည်') : (language === 'en' ? 'OFF (Default)' : 'ပိတ်ထားသည် (Default)')}
            </span>
          </div>
        </div>

        {/* Section 4: Language and Sound Controls */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Language Selector */}
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE6DF] space-y-1.5">
            <span className="text-[11px] font-bold text-[#6C727F] flex items-center gap-1">
              <Languages className="w-3 h-3 text-[#8AA399]" />
              <span>{language === 'en' ? 'Language' : 'ဘာသာစကား'}</span>
            </span>
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => {
                  onLanguageChange('my');
                  soundManager.playCutePop();
                }}
                className={`cute-press py-1.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                  language === 'my'
                    ? 'bg-white text-[#2D3142] border border-[#7A9E7E] shadow-2xs'
                    : 'text-[#6C727F] hover:bg-white/50'
                }`}
              >
                မြန်မာ
              </button>
              <button
                type="button"
                onClick={() => {
                  onLanguageChange('en');
                  soundManager.playCutePop();
                }}
                className={`cute-press py-1.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-white text-[#2D3142] border border-[#7A9E7E] shadow-2xs'
                    : 'text-[#6C727F] hover:bg-white/50'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE6DF] space-y-1.5">
            <span className="text-[11px] font-bold text-[#6C727F] flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-[#8AA399]" />
              <span>{language === 'en' ? 'Chime & Sound' : 'အသံဖွင့်/ပိတ်'}</span>
            </span>
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => {
                  if (!isSoundEnabled) onToggleSound();
                  soundManager.playCutePop();
                }}
                className={`cute-press py-1.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                  isSoundEnabled
                    ? 'bg-white text-[#7A9E7E] border border-[#7A9E7E] shadow-2xs'
                    : 'text-[#6C727F] hover:bg-white/50'
                }`}
              >
                {language === 'en' ? 'On' : 'ဖွင့်'}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isSoundEnabled) onToggleSound();
                }}
                className={`cute-press py-1.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                  !isSoundEnabled
                    ? 'bg-white text-[#6C727F] border border-[#EAE6DF] shadow-2xs'
                    : 'text-[#6C727F] hover:bg-white/50'
                }`}
              >
                {language === 'en' ? 'Mute' : 'ပိတ်'}
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Add to Home Screen (PWA) */}
        <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE6DF] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img 
              src="/pwa-192x192.png" 
              alt="Mascot Icon" 
              className="w-10 h-10 rounded-xl border border-[#EAE6DF] object-contain p-0.5 bg-white shadow-2xs shrink-0"
            />
            <div>
              <div className="text-xs font-bold text-[#2D3142]">
                {language === 'en' ? 'Add to Home Screen' : 'ဖုန်း Screen ပေါ်သို့ Icon ထည့်ရန်'}
              </div>
              <div className="text-[11px] text-[#727885]">
                {language === 'en' ? 'Install with mascot icon' : 'မီးစက်ပုံ icon လေးဖြင့် အသုံးပြုရန်'}
              </div>
            </div>
          </div>
          <PWAInstallButton language={language} />
        </div>

        {/* Persistence Notice */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#EBF3EC] text-[#4E7652] text-[11px] font-medium">
          <Check className="w-3.5 h-3.5 shrink-0" />
          <span>
            {language === 'en'
              ? 'Your preferences are automatically saved in this browser.'
              : 'ရွေးချယ်ထားသော အချက်အလက်များကို ဤ Browser တွင် အလိုအလျောက် သိမ်းဆည်းပေးထားပါသည်။'}
          </span>
        </div>

        {/* Close & Save Button */}
        <button
          type="button"
          onClick={() => {
            onClose();
            soundManager.playCutePop();
          }}
          className="cute-press w-full py-3 rounded-2xl bg-[#7A9E7E] text-white font-semibold text-sm shadow-sm hover:bg-[#688B6C] transition-colors flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>{language === 'en' ? 'Done & Close' : 'ပြီးပါပြီ · ပိတ်မည်'}</span>
        </button>
      </div>
    </div>
  );
};
