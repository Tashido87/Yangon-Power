import React, { useState } from 'react';
import { Clock, Calendar, Sliders, RotateCcw, Sparkles, Zap, ZapOff, Moon, ArrowRight, Settings } from 'lucide-react';
import { CurrentStatusCalculation, Language, ShiftType } from '../types';
import { CuteMascot } from './CuteMascot';
import { formatCountdown } from '../utils/scheduleCalculator';
import { soundManager } from '../utils/audio';
import { translations } from '../i18n/translations';

interface HeroStatusCardProps {
  currentDateStr: string;
  currentTimeStr: string;
  statusInfo: CurrentStatusCalculation;
  language: Language;
  shift: ShiftType;
  rotationMode?: 'auto' | 'manual';
  hasEveningOutage: boolean;
  onOpenSettings: () => void;
  isSimulated: boolean;
  simulatedHour: number;
  simulatedMinute: number;
  onSimulateTimeChange: (hour: number, minute: number) => void;
  onResetToLive: () => void;
}

export const HeroStatusCard: React.FC<HeroStatusCardProps> = ({
  currentDateStr,
  currentTimeStr,
  statusInfo,
  language,
  shift,
  rotationMode = 'auto',
  hasEveningOutage,
  onOpenSettings,
  isSimulated,
  simulatedHour,
  simulatedMinute,
  onSimulateTimeChange,
  onResetToLive,
}) => {
  const [showTimeSlider, setShowTimeSlider] = useState(false);
  const t = translations[language];

  const countdown = formatCountdown(statusInfo.nextEvent.secondsRemaining);

  // Styling attributes based on state
  const isRunning = statusInfo.state === 'GEN_RUNNING';
  const isNight = statusInfo.state === 'NIGHT_SHUTDOWN';
  const isOutage = statusInfo.state === 'OUTAGE_STANDBY';
  const isGrid = statusInfo.state === 'GRID_NORMAL';

  const cardBorderClass = isRunning
    ? 'border-[#7A9E7E]/30 shadow-[#7A9E7E]/5'
    : isGrid
    ? 'border-[#4A90E2]/35 shadow-[#4A90E2]/5'
    : isNight
    ? 'border-[#8AA399]/25 shadow-black/5'
    : 'border-[#E2847A]/35 shadow-[#E2847A]/5';

  const dotColor = isRunning
    ? 'bg-[#7A9E7E]'
    : isGrid
    ? 'bg-[#4A90E2]'
    : isNight
    ? 'bg-[#8AA399]'
    : 'bg-[#E2847A]';

  // Quick preset buttons for testing different times
  const presetsShiftB = [
    { label: '07:30 AM', desc: language === 'en' ? 'Grid Power' : 'မနက် အစိုးရမီး', h: 7, m: 30 },
    { label: '10:00 AM', desc: language === 'en' ? 'Standby' : 'မီးပျက် / နားချိန်', h: 10, m: 0 },
    { label: '12:00 PM', desc: language === 'en' ? 'Lunch Gen' : 'နေ့လယ် မီးစက်', h: 12, m: 0 },
    { label: '01:30 PM', desc: language === 'en' ? 'Power Back!' : '၁ နာရီ မီးလာချိန်', h: 13, m: 30 },
    { label: '05:30 PM', desc: language === 'en' ? 'Evening Standby' : 'ညနေ နားချိန်', h: 17, m: 30 },
    { label: '07:00 PM', desc: language === 'en' ? 'Evening Gen' : 'ညနေ မီးစက်', h: 19, m: 0 },
    { label: '09:30 PM', desc: language === 'en' ? 'Power Back!' : 'ည ၉ နာရီ မီးလာချိန်', h: 21, m: 30 },
    { label: '11:30 PM', desc: language === 'en' ? 'Night Grid' : 'ညဘက် အစိုးရမီး', h: 23, m: 30 },
  ];

  const presetsShiftA = [
    { label: '02:00 AM', desc: language === 'en' ? 'Night Grid' : 'ညဘက် အစိုးရမီး', h: 2, m: 0 },
    { label: '07:30 AM', desc: language === 'en' ? 'Morning Gen' : 'မနက် မီးစက်', h: 7, m: 30 },
    { label: '10:00 AM', desc: language === 'en' ? 'Power Back!' : '၉ နာရီ မီးလာချိန်', h: 10, m: 0 },
    { label: '01:30 PM', desc: language === 'en' ? 'Outage Standby' : '၁ နာရီ ပြန်ပျက်', h: 13, m: 30 },
    { label: '02:30 PM', desc: language === 'en' ? 'Afternoon Gen' : 'နေ့လယ် မီးစက်', h: 14, m: 30 },
    { label: '06:00 PM', desc: language === 'en' ? 'Night On' : 'ညနေ ၅ မီးလာ (ညမပျက်)', h: 18, m: 0 },
    { label: '11:30 PM', desc: language === 'en' ? 'Night Grid' : 'ညဘက် အစိုးရမီး', h: 23, m: 30 },
  ];

  const activePresets = shift === 'shift_a' ? presetsShiftA : presetsShiftB;

  return (
    <section id="hero-status" className="w-full">
      <div className={`relative bg-white rounded-3xl p-5 sm:p-7 border ${cardBorderClass} shadow-md transition-all duration-300`}>
        
        {/* Top Header Row: Date & Live Myanmar Clock */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#FAF7F2]">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#6C727F]">
            <Calendar className="w-4 h-4 text-[#8AA399]" />
            <span className="font-medium text-[#2D3142]">{currentDateStr}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Clock container */}
            <button
              type="button"
              onClick={() => {
                if (isSimulated) {
                  onResetToLive();
                  setShowTimeSlider(false);
                  soundManager.playCutePop();
                }
              }}
              title={isSimulated ? (language === 'en' ? 'Click to return to live time' : 'လက်ရှိအချိန်သို့ ပြန်သွားရန် နှိပ်ပါ') : 'Live Myanmar Time'}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-2xl border text-xs sm:text-sm font-semibold text-[#2D3142] tabular-nums shadow-inner transition-all ${
                isSimulated ? 'bg-[#FFF5F2] border-[#FADCD5] hover:border-[#E2847A] cursor-pointer' : 'bg-[#FAF7F2] border-[#EFECE6]'
              }`}
            >
              <Clock className={`w-3.5 h-3.5 ${isSimulated ? 'text-[#E2847A]' : 'text-[#7A9E7E]'}`} />
              <span>{currentTimeStr}</span>
              {isSimulated ? (
                <span className="text-[10px] font-bold text-[#E2847A] bg-[#FDF0EE] px-1.5 py-0.2 rounded-md uppercase tracking-wider ml-1">
                  {t.simBadge}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#7A9E7E] bg-[#EBF3EC] px-1.5 py-0.2 rounded-md uppercase tracking-wider ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A9E7E] animate-ping" />
                  MMT
                </span>
              )}
            </button>

            {/* Direct Reset to Live Button (shown when simulated) */}
            {isSimulated && (
              <button
                type="button"
                onClick={() => {
                  onResetToLive();
                  setShowTimeSlider(false);
                  soundManager.playCutePop();
                }}
                className="cute-press h-8 px-2.5 rounded-xl bg-[#7A9E7E] hover:bg-[#688B6C] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all animate-in fade-in"
                title="Reset to current live Myanmar Standard Time"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-[11px]">{language === 'en' ? 'Reset Live' : 'လက်ရှိအချိန်'}</span>
              </button>
            )}

            {/* Time travel trigger button */}
            <button
              onClick={() => {
                setShowTimeSlider(!showTimeSlider);
                soundManager.playCutePop();
              }}
              className={`cute-press h-8 px-2.5 rounded-xl border text-xs font-medium flex items-center gap-1 transition-all ${
                showTimeSlider
                  ? 'bg-[#7A9E7E] text-white border-[#7A9E7E]'
                  : 'bg-white border-[#EFECE6] text-[#6C727F] hover:text-[#2D3142]'
              }`}
              title="Test status at different hours"
            >
              <Sliders className="w-3 h-3" />
              <span className="hidden sm:inline">{t.timeTravelToggle}</span>
            </button>
          </div>
        </div>

        {/* Prominent Active Simulation Warning Banner */}
        {isSimulated && (
          <div className="mt-3 p-3 rounded-2xl bg-[#FFF6EE] border border-[#FADCD5] flex items-center justify-between gap-2 shadow-2xs animate-in fade-in">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E2847A] animate-ping shrink-0" />
              <div className="text-xs font-bold text-[#B8574B] truncate">
                {language === 'en'
                  ? 'Preview Mode Active (Simulated Hour)'
                  : 'အချိန်စမ်းသပ်မှု ပြုလုပ်နေပါသည် (Preview Mode)'}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onResetToLive();
                setShowTimeSlider(false);
                soundManager.playCutePop();
              }}
              className="cute-press px-3 py-1.5 rounded-xl bg-[#7A9E7E] hover:bg-[#688B6C] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Reset to Live Time' : 'လက်ရှိအချိန် ပြန်ထားရန်'}</span>
            </button>
          </div>
        )}

        {/* Subtle Active Shift Status Indicator */}
        <div className="pt-2 pb-1">
          <div className="flex items-center justify-between text-xs text-[#727885] px-3.5 py-2 bg-[#FAF7F2] rounded-2xl border border-[#EAE6DF]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-[#7A9E7E] animate-soft-pulse" />
              <span className="font-semibold text-[#2D3142]">
                {shift === 'shift_b'
                  ? (language === 'en' ? 'Shift B (9 AM – 1 PM Outage)' : 'အလှည့် B (မနက် ၉-၁ မီးပျက်)')
                  : (language === 'en' ? 'Shift A (5 AM – 9 AM Outage · 9 AM Back)' : 'အလှည့် A (မနက် ၅-၉ မီးပျက် · ၉ နာရီ မီးလာ)')}
              </span>
              <span className="text-[10px] text-[#7A9E7E] font-medium bg-[#EBF3EC] px-2 py-0.5 rounded-full border border-[#7A9E7E]/30">
                {language === 'en' ? 'Daily Alternation' : 'တရက်စီ အလှည့်ကျ'}
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenSettings}
              className="cute-press flex items-center gap-1.5 text-[11px] font-semibold text-[#7A9E7E] hover:text-[#587a5b] bg-white px-2.5 py-1 rounded-xl border border-[#EFECE6] shadow-2xs shrink-0"
              title="Open Settings to adjust schedule"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Settings' : 'ချိန်ညှိရန်'}</span>
            </button>
          </div>
        </div>

        {/* Time Travel / Simulation Drawer */}
        {showTimeSlider && (
          <div className="my-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE6DF] animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#2D3142]">{t.testTime}:</span>
                <span className="text-sm font-bold text-[#7A9E7E] tabular-nums bg-white px-2.5 py-0.5 rounded-lg border border-[#EFECE6]">
                  {currentTimeStr}
                </span>
              </div>
              {isSimulated && (
                <button
                  type="button"
                  onClick={() => {
                    onResetToLive();
                    setShowTimeSlider(false);
                    soundManager.playCutePop();
                  }}
                  className="cute-press px-3 py-1.5 rounded-xl bg-[#7A9E7E] hover:bg-[#688B6C] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Reset to Live MMT' : 'လက်ရှိအချိန် ပြန်ထားရန်'}</span>
                </button>
              )}
            </div>

            {/* Hour & Minute Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="1439"
                value={simulatedHour * 60 + simulatedMinute}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  const h = Math.floor(val / 60);
                  const m = val % 60;
                  onSimulateTimeChange(h, m);
                }}
                className="w-full h-2 bg-[#E5E0D8] rounded-lg appearance-none cursor-pointer accent-[#7A9E7E]"
              />
              <div className="flex justify-between text-[10px] text-[#8AA399] font-medium tabular-nums">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>23:59</span>
              </div>
            </div>

            {/* Quick Test Presets: Horizontally scrollable on mobile */}
            <div className="mt-3 pt-2.5 border-t border-[#EAE6DF] flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-[11px] text-[#6C727F] font-medium shrink-0 mr-1">Presets:</span>
              {activePresets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    onSimulateTimeChange(preset.h, preset.m);
                    soundManager.playCutePop();
                  }}
                  className={`cute-press text-[11px] px-2.5 py-1.5 rounded-xl border shrink-0 transition-all ${
                    simulatedHour === preset.h && Math.abs(simulatedMinute - preset.m) < 5
                      ? 'bg-[#7A9E7E] text-white border-[#7A9E7E]'
                      : 'bg-white text-[#2D3142] border-[#E5E0D8] hover:border-[#7A9E7E]/50'
                  }`}
                >
                  <span className="font-semibold">{preset.label}</span>
                  <span className="text-[9px] opacity-75 ml-1">({preset.desc})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Status Hero Banner Area */}
        <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-6">
          
          {/* Main Info Column */}
          <div className="flex-1 w-full text-left">
            {/* Mobile Mascot + Title Lockup */}
            <div className="flex items-center justify-between gap-3 sm:block">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#2D3142] leading-tight">
                  {isRunning && (
                    <span className="text-[#4E7652] flex items-center gap-2">
                      <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-[#7A9E7E] animate-bounce shrink-0" style={{ animationDuration: '2s' }} />
                      <span>{t.genRunningTitle}</span>
                    </span>
                  )}
                  {isOutage && (
                    <span className="text-[#B8574B] flex items-center gap-2">
                      <ZapOff className="w-6 h-6 sm:w-7 sm:h-7 text-[#E2847A] shrink-0" />
                      <span>{t.outageStandbyTitle}</span>
                    </span>
                  )}
                  {isNight && (
                    <span className="text-[#556961] flex items-center gap-2">
                      <Moon className="w-6 h-6 sm:w-7 sm:h-7 text-[#8AA399] shrink-0" />
                      <span>{t.nightShutdownTitle}</span>
                    </span>
                  )}
                  {isGrid && (
                    <span className="text-[#2C5E82] flex items-center gap-2">
                      <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#4A90E2] shrink-0" />
                      <span>{language === 'en' ? 'Grid Power Restored' : 'မီးပြန်လာပါပြီ'}</span>
                    </span>
                  )}
                </h1>
              </div>

              {/* Mobile-only inline mascot */}
              <div className="sm:hidden shrink-0">
                <div className="p-1.5 rounded-2xl bg-[#FAF7F2] border border-[#EFECE6] flex items-center justify-center">
                  <CuteMascot state={statusInfo.state} className="scale-90" />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop / Tablet Mascot */}
          <div className="hidden sm:flex flex-col items-center justify-center shrink-0">
            <div className="p-3 rounded-full bg-[#FAF7F2]/80 border border-[#EFECE6]/80 flex items-center justify-center shadow-xs">
              <CuteMascot state={statusInfo.state} />
            </div>
          </div>
        </div>

        {/* Bottom Banner Card: Countdown Timer to Next Scheduled Event */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-[#FAF7F2] grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 items-center">
          {/* Countdown block */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#EFECE6] flex items-center gap-3.5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE6DF] flex items-center justify-center shrink-0 text-[#7A9E7E] shadow-xs">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-[#8AA399]">
                {t.nextEventIn}
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono tracking-tight text-[#2D3142] tabular-nums">
                {countdown.formattedStr}
              </div>
            </div>
          </div>

          {/* Next upcoming event detail */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#EFECE6] flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE6DF] flex items-center justify-center shrink-0 text-[#E2847A] shadow-xs">
              <ArrowRight className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-medium uppercase tracking-wider text-[#8AA399] flex items-center gap-1.5">
                <span>{t.targetEvent}</span>
                <span className="font-bold text-[#2D3142] tabular-nums">
                  {language === 'en'
                    ? (statusInfo.nextEvent.timeStringEn || statusInfo.nextEvent.timeString)
                    : (statusInfo.nextEvent.timeStringMy || statusInfo.nextEvent.timeString)}
                </span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#2D3142] truncate">
                {language === 'en'
                  ? statusInfo.nextEvent.eventDescriptionEn
                  : statusInfo.nextEvent.eventDescriptionMy}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
