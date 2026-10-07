import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types';
import { soundManager } from '../utils/audio';

interface PWAInstallButtonProps {
  language: Language;
  compact?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ language, compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If already running in standalone mode (already installed), don't show prompt
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    soundManager.playCutePop();
    if (isInstallable) {
      await install();
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        title={language === 'en' ? 'Add Yangon Power to Home Screen' : 'ပင်မမျက်နှာပြင်သို့ ထည့်သွင်းရန်'}
        className={`cute-press flex items-center gap-1.5 font-semibold transition-all rounded-xl border shadow-2xs ${
          compact
            ? 'h-9 px-2.5 bg-white hover:bg-[#FAF7F2] border-[#EFECE6] text-[#7A9E7E] text-xs'
            : 'px-3 py-1.5 bg-[#7A9E7E] hover:bg-[#688B6C] text-white text-xs'
        }`}
      >
        <Download className="w-3.5 h-3.5" />
        <span>{language === 'en' ? 'Add to Home' : 'App သွင်းရန်'}</span>
      </button>

      {/* Guided Step-by-Step Modal for iOS & Mobile Browsers */}
      {showGuide && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowGuide(false)}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#EAE6DF] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with App Icon */}
            <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
              <div className="flex items-center gap-3">
                <img 
                  src="/pwa-192x192.png" 
                  alt="Yangon Power Mascot" 
                  className="w-12 h-12 rounded-2xl border border-[#EAE6DF] shadow-xs object-contain p-0.5 bg-[#FAF7F2]"
                />
                <div>
                  <h3 className="font-display text-base font-bold text-[#2D3142]">
                    Yangon Power
                  </h3>
                  <p className="text-[11px] text-[#7A9E7E] font-medium">
                    {language === 'en' ? 'Add to Home Screen' : 'ပင်မမျက်နှာပြင်သို့ ထည့်ရန်'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#EAE6DF] text-[#6C727F] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Instruction Steps */}
            <div className="space-y-2.5 text-xs text-[#2D3142]">
              <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE6DF] space-y-2">
                <div className="font-bold text-[#7A9E7E] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>
                    {language === 'en' ? 'How to install on Mobile:' : 'ဖုန်း Screen ပေါ်သို့ Icon ထည့်နည်း -'}
                  </span>
                </div>

                {isIOS ? (
                  <ol className="space-y-2 text-[11px] text-[#6C727F] leading-relaxed list-decimal list-inside">
                    <li>
                      Safari browser အောက်ခြေရှိ <Share2 className="w-3.5 h-3.5 inline mx-1 text-[#4A90E2]" /> <strong>Share</strong> ခလုတ်ကို နှိပ်ပါ။
                    </li>
                    <li>
                      အောက်သို့ အနည်းငယ်ဆွဲချပြီး <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-[#2D3142]" /> <strong>"Add to Home Screen"</strong> (သို့မဟုတ်) <strong>"ပင်မမျက်နှာပြင်သို့ ထည့်ရန်"</strong> ကို ရွေးပါ။
                    </li>
                    <li>
                      ညာဘက်အပေါ်ထောင့်ရှိ <strong>"Add"</strong> ကို နှိပ်လိုက်ပါက မီးစက်ပုံ icon ဖြင့် ဖုန်းမျက်နှာပြင်ပေါ်တွင် အသင့်ပေါ်လာပါမည်။
                    </li>
                  </ol>
                ) : (
                  <ol className="space-y-2 text-[11px] text-[#6C727F] leading-relaxed list-decimal list-inside">
                    <li>
                      Browser ညာဘက်အပေါ်ရှိ <strong>⋮ (အစက် ၃ စက်)</strong> Menu ကို နှိပ်ပါ။
                    </li>
                    <li>
                      <strong>"Add to Home screen"</strong> (သို့မဟုတ်) <strong>"Install app"</strong> ကို ရွေးချယ်ပါ။
                    </li>
                    <li>
                      မီးစက်ပုံ icon လေးဖြင့် ဖုန်း App အဖြစ် အသုံးပြုနိုင်ပါပြီ။
                    </li>
                  </ol>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="cute-press w-full py-2.5 rounded-xl bg-[#7A9E7E] hover:bg-[#688B6C] text-white text-xs font-bold shadow-xs"
            >
              {language === 'en' ? 'Got it' : 'နားလည်ပါပြီ'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
