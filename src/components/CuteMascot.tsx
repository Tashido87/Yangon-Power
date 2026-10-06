import React from 'react';
import { PowerState } from '../types';

interface CuteMascotProps {
  state: PowerState;
  className?: string;
}

export const CuteMascot: React.FC<CuteMascotProps> = ({ state, className = '' }) => {
  if (state === 'GRID_NORMAL') {
    // Joyful celebration mascot when City Grid Power is back!
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="absolute -inset-2 bg-[#4A90E2]/15 rounded-full blur-md animate-soft-pulse" />
        <svg
          viewBox="0 0 120 120"
          className="w-24 h-24 md:w-28 md:h-28 relative z-10 transition-transform duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Glowing Lightbulb above */}
          <circle cx="60" cy="22" r="8" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2.5" className="animate-pulse" />
          <path d="M57 30H63V32H57V30Z" fill="#9CA3AF" />
          <path d="M58 32H62V34H58V32Z" fill="#9CA3AF" />
          {/* Bulb Rays */}
          <line x1="60" y1="9" x2="60" y2="5" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="49" y1="13" x2="45" y2="10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="71" y1="13" x2="75" y2="10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

          {/* Sparkles */}
          <circle cx="20" cy="38" r="2.5" fill="#4A90E2" className="animate-ping" style={{ animationDuration: '2s' }} />
          <path d="M102 36L104 42L110 44L104 46L102 52L100 46L94 44L100 42L102 36Z" fill="#F59E0B" opacity="0.8" />

          {/* Generator Body (Resting happily with power on) */}
          <rect x="25" y="44" width="70" height="50" rx="16" fill="#FFFFFF" stroke="#4A90E2" strokeWidth="4" />
          <path d="M42 44V36C42 33 45 31 48 31H72C75 31 78 33 78 36V44" stroke="#4A90E2" strokeWidth="3" strokeLinecap="round" />

          {/* Joyful Closed Curved Eyes ^_^ */}
          <path d="M50 64C52 61 56 61 58 64" stroke="#2D3142" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M72 64C74 61 78 61 80 64" stroke="#2D3142" strokeWidth="3.5" strokeLinecap="round" />

          {/* Big Happy Smile */}
          <path d="M60 70C60 74 65 76 68 74C71 72 71 70 71 70" stroke="#2D3142" strokeWidth="3" strokeLinecap="round" />

          {/* Blush Cheeks */}
          <circle cx="48" cy="69" r="4.5" fill="#E2847A" opacity="0.45" />
          <circle cx="82" cy="69" r="4.5" fill="#E2847A" opacity="0.45" />

          {/* Clean City Plug Emblem */}
          <circle cx="65" cy="50" r="5" fill="#EEF5FA" />
          <circle cx="65" cy="50" r="2.5" fill="#4A90E2" />

          {/* Feet */}
          <rect x="36" y="93" width="12" height="6" rx="3" fill="#2D3142" />
          <rect x="72" y="93" width="12" height="6" rx="3" fill="#2D3142" />
        </svg>
      </div>
    );
  }

  if (state === 'GEN_RUNNING') {
    // Cute running generator with happy eyes, tiny spark, green gentle aura
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="absolute -inset-2 bg-[#7A9E7E]/15 rounded-full blur-md animate-soft-pulse" />
        <svg
          viewBox="0 0 120 120"
          className="w-24 h-24 md:w-28 md:h-28 relative z-10 transition-transform duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sparkles / Energy stars */}
          <circle cx="20" cy="28" r="3" fill="#7A9E7E" className="animate-ping" style={{ animationDuration: '2s' }} />
          <path d="M102 24L105 32L113 35L105 38L102 46L99 38L91 35L99 32L102 24Z" fill="#8AA399" opacity="0.8" />
          <path d="M16 86L18 92L24 94L18 96L16 102L14 96L8 94L14 92L16 86Z" fill="#7A9E7E" opacity="0.6" />

          {/* Generator Body */}
          <rect x="25" y="42" width="70" height="52" rx="16" fill="#FFFFFF" stroke="#7A9E7E" strokeWidth="4" />
          
          {/* Top Handle */}
          <path d="M42 42V32C42 28.6863 44.6863 26 48 26H72C75.3137 26 78 28.6863 78 32V42" stroke="#7A9E7E" strokeWidth="4" strokeLinecap="round" />

          {/* Side Ventilation Grille */}
          <line x1="33" y1="56" x2="33" y2="78" stroke="#E5EFE7" strokeWidth="3" strokeLinecap="round" />
          <line x1="39" y1="56" x2="39" y2="78" stroke="#E5EFE7" strokeWidth="3" strokeLinecap="round" />

          {/* Happy Kawaii Eyes */}
          <path d="M52 64C54 61 58 61 60 64" stroke="#2D3142" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M72 64C74 61 78 61 80 64" stroke="#2D3142" strokeWidth="3.5" strokeLinecap="round" />

          {/* Cheerful Mouth */}
          <path d="M63 71C63 73.5 66 75.5 68.5 75.5C71 75.5 74 73.5 74 71" stroke="#2D3142" strokeWidth="3" strokeLinecap="round" />

          {/* Blush Cheeks */}
          <circle cx="49" cy="69" r="4" fill="#E2847A" opacity="0.45" />
          <circle cx="83" cy="69" r="4" fill="#E2847A" opacity="0.45" />

          {/* Power Bolt Emblem */}
          <circle cx="66" cy="46" r="6" fill="#7A9E7E" />
          <path d="M67 42L64 46H68L65 50" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

          {/* Feet */}
          <rect x="36" y="93" width="12" height="6" rx="3" fill="#2D3142" />
          <rect x="72" y="93" width="12" height="6" rx="3" fill="#2D3142" />

          {/* Gentle Exhaust Steam */}
          <circle cx="88" cy="30" r="3" fill="#8AA399" opacity="0.5" className="animate-bounce" />
          <circle cx="94" cy="22" r="4" fill="#8AA399" opacity="0.3" />
        </svg>
      </div>
    );
  }

  if (state === 'NIGHT_SHUTDOWN') {
    // Sleeping cute generator with sleep cap, moon, peaceful expression
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="absolute -inset-2 bg-[#8AA399]/10 rounded-full blur-md" />
        <svg
          viewBox="0 0 120 120"
          className="w-24 h-24 md:w-28 md:h-28 relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Crescent Moon */}
          <path
            d="M95 24C92 24 86 28 86 36C86 44 92 48 97 48C94 51 89 52 84 50C77 47 74 39 77 32C79 27 85 24 90 23C92 23 94 23.5 95 24Z"
            fill="#EAD79B"
            opacity="0.85"
          />
          {/* Little Stars */}
          <circle cx="24" cy="32" r="2" fill="#8AA399" opacity="0.6" />
          <circle cx="36" cy="20" r="1.5" fill="#8AA399" opacity="0.5" />

          {/* Floating Zzz */}
          <text x="86" y="22" fill="#8AA399" fontSize="12" fontWeight="bold" fontFamily="sans-serif">z</text>
          <text x="96" y="14" fill="#8AA399" fontSize="9" fontWeight="bold" fontFamily="sans-serif">z</text>

          {/* Generator Body */}
          <rect x="25" y="44" width="70" height="50" rx="16" fill="#FFFFFF" stroke="#8AA399" strokeWidth="4" />
          
          {/* Handle */}
          <path d="M42 44V34C42 30.6863 44.6863 28 48 28H72C75.3137 28 78 30.6863 78 34V44" stroke="#8AA399" strokeWidth="4" strokeLinecap="round" />

          {/* Sleeping Closed Eyes */}
          <path d="M50 67C52 69 56 69 58 67" stroke="#2D3142" strokeWidth="3" strokeLinecap="round" />
          <path d="M72 67C74 69 78 69 80 67" stroke="#2D3142" strokeWidth="3" strokeLinecap="round" />

          {/* Little Quiet Mouth */}
          <ellipse cx="65" cy="74" rx="2.5" ry="3" fill="#2D3142" opacity="0.6" />

          {/* Soft Night Blush */}
          <circle cx="48" cy="71" r="3.5" fill="#E2847A" opacity="0.3" />
          <circle cx="82" cy="71" r="3.5" fill="#E2847A" opacity="0.3" />

          {/* Feet */}
          <rect x="36" y="93" width="12" height="6" rx="3" fill="#6C727F" />
          <rect x="72" y="93" width="12" height="6" rx="3" fill="#6C727F" />
        </svg>
      </div>
    );
  }

  // OUTAGE_STANDBY or default: Cozy resting generator waiting patiently
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute -inset-2 bg-[#E2847A]/15 rounded-full blur-md animate-soft-pulse" />
      <svg
        viewBox="0 0 120 120"
        className="w-24 h-24 md:w-28 md:h-28 relative z-10 transition-transform duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Warm cozy lantern glow symbol */}
        <circle cx="20" cy="34" r="6" fill="#F4D3C9" opacity="0.7" />
        <path d="M19 30L21 34H17L21 38" stroke="#E2847A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Generator Body */}
        <rect x="25" y="42" width="70" height="52" rx="16" fill="#FFFFFF" stroke="#E2847A" strokeWidth="4" />
        
        {/* Handle */}
        <path d="M42 42V32C42 28.6863 44.6863 26 48 26H72C75.3137 26 78 28.6863 78 32V42" stroke="#E2847A" strokeWidth="4" strokeLinecap="round" />

        {/* Resting / Waiting Eyes (Polite Dots with slight tilt) */}
        <circle cx="53" cy="65" r="3.5" fill="#2D3142" />
        <circle cx="54.5" cy="63.5" r="1.2" fill="#FFFFFF" />
        <circle cx="77" cy="65" r="3.5" fill="#2D3142" />
        <circle cx="78.5" cy="63.5" r="1.2" fill="#FFFFFF" />

        {/* Gentle smile */}
        <path d="M62 72C64 73.5 66 73.5 68 72" stroke="#2D3142" strokeWidth="2.8" strokeLinecap="round" />

        {/* Cute Peach Blush */}
        <circle cx="47" cy="70" r="4.5" fill="#E2847A" opacity="0.4" />
        <circle cx="83" cy="70" r="4.5" fill="#E2847A" opacity="0.4" />

        {/* Standby indicator emblem */}
        <circle cx="65" cy="46" r="5" fill="#F7DCD6" />
        <circle cx="65" cy="46" r="2.5" fill="#E2847A" />

        {/* Feet */}
        <rect x="36" y="93" width="12" height="6" rx="3" fill="#2D3142" />
        <rect x="72" y="93" width="12" height="6" rx="3" fill="#2D3142" />
      </svg>
    </div>
  );
};
