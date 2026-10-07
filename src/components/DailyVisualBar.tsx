import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Language, ShiftType } from '../types';
import { translations } from '../i18n/translations';

interface DailyVisualBarProps {
  currentHour: number;
  currentMinute: number;
  language: Language;
  shift: ShiftType;
  hasEveningOutage?: boolean;
  onSelectHour?: (hour: number) => void;
  isSimulated?: boolean;
  onResetToLive?: () => void;
}

interface Segment {
  start: number; // 0..24
  end: number;
  type: 'gen' | 'standby' | 'night' | 'grid';
  labelEn: string;
  labelMy: string;
}

const SEGMENTS_SHIFT_B: Segment[] = [
  { start: 0, end: 6, type: 'night', labelEn: 'Night Rest (11PM-6AM)', labelMy: 'ညဘက်အိပ်ချိန် (၁၁-၆ မနက်)' },
  { start: 6, end: 9, type: 'grid', labelEn: 'Morning Grid Power (6AM-9AM)', labelMy: 'မနက် အစိုးရမီး (၆-၉ မနက်)' },
  { start: 9, end: 11, type: 'standby', labelEn: 'Outage Standby (9AM-11AM)', labelMy: 'မီးပျက် / နားချိန် (၉-၁၁ မနက်)' },
  { start: 11, end: 13, type: 'gen', labelEn: 'Lunch Generator (11AM-1PM)', labelMy: 'နေ့လယ် မီးစက် (၁၁-၁ နေ့လယ်)' },
  { start: 13, end: 17, type: 'grid', labelEn: 'Power Restored (1PM-5PM) · EPC Grid Active', labelMy: 'မီးပြန်လာပါပြီ (၁-၅ ညနေ) · အစိုးရမီးရရှိချိန်' },
  { start: 17, end: 18, type: 'standby', labelEn: 'Evening Standby (5PM-6PM)', labelMy: 'ညနေ နားချိန် (၅-၆ ညနေ)' },
  { start: 18, end: 21, type: 'gen', labelEn: 'Evening Peak Generator (6PM-9PM)', labelMy: 'ညနေ မီးစက် (၆-၉ ည)' },
  { start: 21, end: 23, type: 'grid', labelEn: 'Power Restored (9PM-11PM) · Night Grid Active', labelMy: 'ည ၉ နာရီ မီးပြန်လာသည် (၉-၁၁ ည) · အစိုးရမီး' },
  { start: 23, end: 24, type: 'night', labelEn: 'Night Rest (11PM-12AM)', labelMy: 'ညဘက်အိပ်ချိန် (၁၁-၁၂ ည)' },
];

const SEGMENTS_SHIFT_B_NO_EVENING: Segment[] = [
  { start: 0, end: 6, type: 'night', labelEn: 'Night Rest (11PM-6AM)', labelMy: 'ညဘက်အိပ်ချိန် (၁၁-၆ မနက်)' },
  { start: 6, end: 9, type: 'grid', labelEn: 'Morning Grid Power (6AM-9AM)', labelMy: 'မနက် အစိုးရမီး (၆-၉ မနက်)' },
  { start: 9, end: 11, type: 'standby', labelEn: 'Outage Standby (9AM-11AM)', labelMy: 'မီးပျက် / နားချိန် (၉-၁၁ မနက်)' },
  { start: 11, end: 13, type: 'gen', labelEn: 'Lunch Generator (11AM-1PM)', labelMy: 'နေ့လယ် မီးစက် (၁၁-၁ နေ့လယ်)' },
  { start: 13, end: 23, type: 'grid', labelEn: 'Power Restored (1PM-11PM) · EPC Grid Active', labelMy: 'မီးပြန်လာပါပြီ (၁-၁၁ ည) · အစိုးရမီးရရှိချိန်' },
  { start: 23, end: 24, type: 'night', labelEn: 'Night Rest (11PM-12AM)', labelMy: 'ညဘက်အိပ်ချိန် (၁၁-၁၂ ည)' },
];

const SEGMENTS_SHIFT_A: Segment[] = [
  { start: 0, end: 5, type: 'night', labelEn: 'Night Rest (11PM-5AM)', labelMy: 'ညဘက်အိပ်ချိန် (၁၁-၅ မနက်)' },
  { start: 5, end: 7, type: 'standby', labelEn: 'Morning Standby (5AM-7AM)', labelMy: 'မနက်စောစော နားချိန် (၅-၇ မနက်)' },
  { start: 7, end: 9, type: 'gen', labelEn: 'Morning Generator (7AM-9AM)', labelMy: 'မနက်ပိုင်း မီးစက် (၇-၉ မနက်)' },
  { start: 9, end: 13, type: 'grid', labelEn: 'Power Restored (9AM-1PM) · EPC Grid Active', labelMy: 'မနက် ၉ နာရီ မီးပြန်လာသည် (၉-၁ နေ့လယ်)' },
  { start: 13, end: 14, type: 'standby', labelEn: 'Afternoon Standby (1PM-2PM)', labelMy: '၁ နာရီ ပြန်ပျက် / နားချိန် (၁-၂ နေ့လယ်)' },
  { start: 14, end: 15, type: 'gen', labelEn: 'Afternoon Generator 1 (2PM-3PM)', labelMy: 'နေ့လယ် မီးစက် (၂-၃ နေ့လယ်)' },
  { start: 15, end: 16, type: 'standby', labelEn: 'Afternoon Standby (3PM-4PM)', labelMy: 'နေ့လယ် နားချိန် (၃-၄ ညနေ)' },
  { start: 16, end: 17, type: 'gen', labelEn: 'Afternoon Generator 2 (4PM-5PM)', labelMy: 'ညနေစောင်း မီးစက် (၄-၅ ညနေ)' },
  { start: 17, end: 23, type: 'grid', labelEn: 'Power Restored (5PM-11PM) · ညမပျက်', labelMy: 'ညနေ ၅ နာရီ မီးပြန်လာသည် · ညမပျက် (၅-၁၁ ည)' },
  { start: 23, end: 24, type: 'night', labelEn: 'Night Rest (11PM-12AM)', labelMy: 'ညဘက်အိပ်ချိန် (၁၁-၁၂ ည)' },
];

export const DailyVisualBar: React.FC<DailyVisualBarProps> = ({
  currentHour,
  currentMinute,
  language,
  shift,
  hasEveningOutage = true,
  onSelectHour,
  isSimulated = false,
  onResetToLive,
}) => {
  const [selectedSeg, setSelectedSeg] = React.useState<Segment | null>(null);
  const t = translations[language];
  const currentFraction = (currentHour * 60 + currentMinute) / 1440;
  const currentPercent = Math.min(100, Math.max(0, currentFraction * 100));

  let daySegments = SEGMENTS_SHIFT_B;
  if (shift === 'shift_a') {
    daySegments = SEGMENTS_SHIFT_A;
  } else {
    daySegments = hasEveningOutage ? SEGMENTS_SHIFT_B : SEGMENTS_SHIFT_B_NO_EVENING;
  }

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-[#EFECE6] shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-xs sm:text-sm font-bold text-[#2D3142] flex items-center gap-2">
            <span>{t.visualBarTitle}</span>
            <span className="text-[11px] font-normal text-[#8AA399]">
              {shift === 'shift_b'
                ? (language === 'en' ? '· 9 AM Outage Shift' : '· မနက် ၉ နာရီပျက် အလှည့်')
                : (language === 'en' ? '· 5 AM Outage Shift' : '· မနက် ၅ နာရီပျက် အလှည့်')}
            </span>
          </h3>
          {isSimulated && onResetToLive && (
            <button
              type="button"
              onClick={() => {
                setSelectedSeg(null);
                onResetToLive();
              }}
              className="cute-press text-[11px] font-bold text-[#4E7652] bg-[#EBF3EC] hover:bg-[#DCEBDD] px-2 py-0.5 rounded-lg flex items-center gap-1 border border-[#7A9E7E]/30"
              title="Reset to current live Myanmar Standard Time"
            >
              <RotateCcw className="w-3 h-3 text-[#7A9E7E]" />
              <span>{language === 'en' ? 'Reset Live' : 'လက်ရှိအချိန်'}</span>
            </button>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-[#6C727F]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#7A9E7E]" />
            <span>{t.legendGenerator}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#7AA2C2]" />
            <span>{language === 'en' ? 'Grid (Power Back)' : 'အစိုးရမီး'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#E2847A]" />
            <span>{t.legendStandby}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#8AA399]/40" />
            <span>{t.legendNight}</span>
          </div>
        </div>
      </div>

      {/* The 24-Hour Timeline Bar */}
      <div className="relative pt-4 pb-2">
        {/* Current Time Pin Marker */}
        <div
          className="absolute top-0 -ml-2.5 z-20 flex flex-col items-center pointer-events-none transition-all duration-300"
          style={{ left: `${currentPercent}%` }}
        >
          <div className="w-5 h-5 rounded-full bg-[#2D3142] text-white flex items-center justify-center shadow-md">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <div className="w-0.5 h-7 bg-[#2D3142]" />
        </div>

        {/* The Bar Track */}
        <div className="h-7 sm:h-6 w-full rounded-xl overflow-hidden flex border border-[#EAE6DF] shadow-inner bg-[#FAF7F2]">
          {daySegments.map((seg, idx) => {
            const widthPct = ((seg.end - seg.start) / 24) * 100;
            let bgColor = 'bg-[#E2847A]';
            if (seg.type === 'gen') bgColor = 'bg-[#7A9E7E] active:bg-[#688B6C]';
            else if (seg.type === 'grid') bgColor = 'bg-[#7AA2C2] active:bg-[#5C8CAE]';
            else if (seg.type === 'night') bgColor = 'bg-[#8AA399]/40 active:bg-[#8AA399]/60';
            else bgColor = 'bg-[#F4D3C9] active:bg-[#E2847A]';

            const label = language === 'en' ? seg.labelEn : seg.labelMy;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedSeg(seg);
                  if (onSelectHour) onSelectHour(seg.start);
                }}
                title={label}
                style={{ width: `${widthPct}%` }}
                className={`h-full transition-opacity cursor-pointer relative ${bgColor}`}
              >
                <span className="sr-only">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Time Marker Labels Under the Bar */}
        <div className="flex justify-between text-[10px] text-[#8AA399] font-mono mt-1.5 tabular-nums">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>

        {/* Mobile touch inspector feedback chip */}
        {selectedSeg && (
          <div className="mt-2.5 p-2 rounded-xl bg-[#FAF7F2] border border-[#EAE6DF] flex items-center justify-between text-[11px] text-[#2D3142] animate-in fade-in duration-150">
            <span className="font-semibold">
              {language === 'en' ? selectedSeg.labelEn : selectedSeg.labelMy}
            </span>
            <div className="flex items-center gap-1.5 ml-2">
              {isSimulated && onResetToLive && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSeg(null);
                    onResetToLive();
                  }}
                  className="text-[#7A9E7E] hover:text-[#587a5b] text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-[#EFECE6] flex items-center gap-1"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>{language === 'en' ? 'Reset' : 'လက်ရှိအချိန်'}</span>
                </button>
              )}
              <button
                onClick={() => setSelectedSeg(null)}
                className="text-[#8AA399] hover:text-[#2D3142] text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white border border-[#EFECE6]"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
