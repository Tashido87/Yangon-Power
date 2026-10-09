/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HeroStatusCard } from './components/HeroStatusCard';
import { DailyVisualBar } from './components/DailyVisualBar';
import { SettingsModal } from './components/SettingsModal';
import { calculateStatus, getLiveMyanmarTime } from './utils/scheduleCalculator';
import { soundManager } from './utils/audio';
import { loadStoredSettings, saveStoredSettings } from './utils/storage';
import { Language, PowerState, ShiftType } from './types';

export default function App() {
  // Load persistent user preferences from browser localStorage
  const initialSettings = loadStoredSettings();

  const [language, setLanguage] = useState<Language>(initialSettings.language);
  const [isSoundEnabled, setIsSoundEnabled] = useState(initialSettings.isSoundEnabled);
  const [rotationMode, setRotationMode] = useState<'auto' | 'manual'>(initialSettings.rotationMode || 'auto');
  const [shift, setShift] = useState<ShiftType>(initialSettings.shift);
  // Active: 5 PM - 9 PM evening outage is active
  const [hasEveningOutage, setHasEveningOutage] = useState<boolean>(initialSettings.hasEveningOutage);
  // Generator schedule display: Default is FALSE as requested by user (only show grid power on / outage schedule)
  const [showGenerator, setShowGenerator] = useState<boolean>(initialSettings.showGenerator);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Time management: Initialize immediately with actual current Myanmar Local Time (Asia/Yangon UTC+6:30)
  const initialMyanmarTime = getLiveMyanmarTime();
  const [isSimulated, setIsSimulated] = useState(false);
  const [currentHour, setCurrentHour] = useState(initialMyanmarTime.hour);
  const [currentMinute, setCurrentMinute] = useState(initialMyanmarTime.minute);
  const [currentSecond, setCurrentSecond] = useState(initialMyanmarTime.second);
  const [liveDateEn, setLiveDateEn] = useState(initialMyanmarTime.dateStrEn);
  const [liveDateMy, setLiveDateMy] = useState(initialMyanmarTime.dateStrMy);
  const [liveShortDateEn, setLiveShortDateEn] = useState(initialMyanmarTime.dateShortEn);
  const [liveShortDateMy, setLiveShortDateMy] = useState(initialMyanmarTime.dateShortMy);

  const prevStatusRef = useRef<PowerState | null>(null);

  // Synchronize soundManager with initial sound preference
  useEffect(() => {
    soundManager.setSoundEnabled(isSoundEnabled);
  }, []);

  // Live real-time clock ticker synchronized with Myanmar Standard Time (MMT)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSimulated) {
        const mmt = getLiveMyanmarTime();
        setCurrentHour(mmt.hour);
        setCurrentMinute(mmt.minute);
        setCurrentSecond(mmt.second);
        setLiveDateEn(mmt.dateStrEn);
        setLiveDateMy(mmt.dateStrMy);
        setLiveShortDateEn(mmt.dateShortEn);
        setLiveShortDateMy(mmt.dateShortMy);

        // In auto rotation mode, automatically switch shift when a new day arrives in Myanmar!
        if (rotationMode === 'auto') {
          setShift(mmt.autoShift);
        }
      } else {
        // In preview simulation mode, tick smoothly second-by-second
        setCurrentSecond((prevSec) => {
          if (prevSec >= 59) {
            setCurrentMinute((prevMin) => {
              if (prevMin >= 59) {
                setCurrentHour((prevH) => (prevH + 1) % 24);
                return 0;
              }
              return prevMin + 1;
            });
            return 0;
          }
          return prevSec + 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isSimulated, rotationMode]);

  // Status calculation based on active time, active shift, evening outage toggle, and generator display preference
  const statusInfo = calculateStatus(
    {
      hour: currentHour,
      minute: currentMinute,
      second: currentSecond,
    },
    shift,
    hasEveningOutage,
    showGenerator
  );

  // Sound chime when state transitions
  useEffect(() => {
    if (prevStatusRef.current && prevStatusRef.current !== statusInfo.state && isSoundEnabled) {
      soundManager.playZenChime();
      soundManager.triggerVibrate([50, 100, 50]);
    }
    prevStatusRef.current = statusInfo.state;
  }, [statusInfo.state, isSoundEnabled]);

  const handleShiftChange = (newShift: ShiftType, mode: 'auto' | 'manual' = 'manual') => {
    setShift(newShift);
    setRotationMode(mode);
    saveStoredSettings({ shift: newShift, rotationMode: mode });
  };

  const handleToggleEveningOutage = (val: boolean) => {
    setHasEveningOutage(val);
    saveStoredSettings({ hasEveningOutage: val });
  };

  const handleToggleShowGenerator = (val: boolean) => {
    setShowGenerator(val);
    saveStoredSettings({ showGenerator: val });
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    saveStoredSettings({ language: newLang });
  };

  const handleToggleSound = () => {
    const next = !isSoundEnabled;
    setIsSoundEnabled(next);
    soundManager.setSoundEnabled(next);
    saveStoredSettings({ isSoundEnabled: next });
  };

  const handleSimulateTime = (hour: number, minute: number) => {
    setIsSimulated(true);
    setCurrentHour(hour);
    setCurrentMinute(minute);
    setCurrentSecond(0);
  };

  const handleResetToLive = () => {
    const mmt = getLiveMyanmarTime();
    setIsSimulated(false);
    setCurrentHour(mmt.hour);
    setCurrentMinute(mmt.minute);
    setCurrentSecond(mmt.second);
    setLiveDateEn(mmt.dateStrEn);
    setLiveDateMy(mmt.dateStrMy);
    setLiveShortDateEn(mmt.dateShortEn);
    setLiveShortDateMy(mmt.dateShortMy);
    if (rotationMode === 'auto') {
      setShift(mmt.autoShift);
    }
  };

  // Format time string for display (e.g. "1:15:24 PM")
  const formatClockTime = (h: number, m: number, s: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${displayH}:${pad(m)}:${pad(s)} ${period}`;
  };

  const dateDisplay = language === 'en' ? liveDateEn : liveDateMy;
  const shortDateDisplay = language === 'en' ? liveShortDateEn : liveShortDateMy;
  const timeDisplay = formatClockTime(currentHour, currentMinute, currentSecond);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D3142] flex flex-col font-sans selection:bg-[#7A9E7E]/20">
      
      {/* Top Header */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Single Dashboard Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-4 sm:space-y-5 pb-10">
        
        {/* Hero Live Status Card */}
        <HeroStatusCard
          currentDateStr={dateDisplay}
          currentShortDateStr={shortDateDisplay}
          currentTimeStr={timeDisplay}
          statusInfo={statusInfo}
          language={language}
          shift={shift}
          rotationMode={rotationMode}
          hasEveningOutage={hasEveningOutage}
          showGenerator={showGenerator}
          onOpenSettings={() => setIsSettingsOpen(true)}
          isSimulated={isSimulated}
          simulatedHour={currentHour}
          simulatedMinute={currentMinute}
          onSimulateTimeChange={handleSimulateTime}
          onResetToLive={handleResetToLive}
        />

        {/* 24-Hour Visual Bar */}
        <DailyVisualBar
          currentHour={currentHour}
          currentMinute={currentMinute}
          language={language}
          shift={shift}
          hasEveningOutage={hasEveningOutage}
          showGenerator={showGenerator}
          onSelectHour={(hour) => handleSimulateTime(hour, 0)}
          isSimulated={isSimulated}
          onResetToLive={handleResetToLive}
        />

        {/* Clean Minimalist Footer */}
        <footer className="pt-5 pb-3 border-t border-[#EFECE6] text-center text-xs text-[#8AA399] space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A9E7E]" />
            <span>Yangon Power · Real-time Myanmar Power & Generator Tracker</span>
          </div>
          <p className="text-[11px] text-[#A0A6B2]">
            {language === 'en'
              ? 'Myanmar Standard Time (UTC+6:30) · Saved preferences in local browser'
              : 'မြန်မာစံတော်ချိန် (UTC+6:30) · ရွေးချယ်မှုများကို Browser တွင် သိမ်းဆည်းပေးထားပါသည်'}
          </p>
        </footer>

      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        shift={shift}
        rotationMode={rotationMode}
        onShiftChange={handleShiftChange}
        hasEveningOutage={hasEveningOutage}
        onToggleEveningOutage={handleToggleEveningOutage}
        showGenerator={showGenerator}
        onToggleShowGenerator={handleToggleShowGenerator}
        language={language}
        onLanguageChange={handleLanguageChange}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={handleToggleSound}
      />

    </div>
  );
}
