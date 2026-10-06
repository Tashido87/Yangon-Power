import React from 'react';
import { Moon, Info, Sparkles } from 'lucide-react';
import { BUILDING_POLICIES } from '../data/scheduleData';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface NightRulesCardProps {
  language: Language;
}

export const NightRulesCard: React.FC<NightRulesCardProps> = ({ language }) => {
  const t = translations[language];
  const { nightShutdown } = BUILDING_POLICIES;

  return (
    <section className="w-full space-y-3">
      {/* Night Shutdown & Rest Hours Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EFECE6] shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EEF2F0] text-[#556961] flex items-center justify-center shrink-0">
              <Moon className="w-4 h-4 text-[#8AA399]" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#2D3142]">
                {t.nightRuleHeader}
              </h3>
              <span className="text-xs font-mono font-medium text-[#8AA399]">
                11:00 PM – 06:00 AM
              </span>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-[#8AA399] bg-[#FAF7F2] border border-[#EFECE6] px-2.5 py-0.5 rounded-full">
            {language === 'en' ? 'Quiet Rest Hours' : 'တိတ်ဆိတ်ချိန်'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#6C727F] leading-relaxed mb-3">
          {t.nightRuleDesc}
        </p>

        <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE6DF] flex items-start gap-2 text-xs text-[#6C727F]">
          <Info className="w-3.5 h-3.5 text-[#8AA399] shrink-0 mt-0.5" />
          <span>
            {language === 'en'
              ? 'Hallway and staircase emergency solar-battery lights remain active during quiet night hours.'
              : 'စင်္ကြံနှင့် လှေကားထစ်များရှိ အရေးပေါ် ဆိုလာဘက်ထရီမီးများ ပုံမှန်လင်းနေပါမည်။'}
          </span>
        </div>
      </div>

      {/* Friendly Tip */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE6DF] flex items-center gap-2.5 text-xs text-[#6C727F]">
        <Sparkles className="w-4 h-4 text-[#7A9E7E] shrink-0" />
        <p className="leading-relaxed">
          {t.fridgeNotice}
        </p>
      </div>
    </section>
  );
};
