/**
 * Myanmar Standard Time (MMT) Helper (UTC +06:30, Asia/Yangon)
 */

export function getMyanmarNow(): {
  hour: number;
  minute: number;
  second: number;
  dateStrEn: string;
  dateStrMy: string;
} {
  const now = new Date();

  // Extract Yangon time using Intl
  try {
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Yangon',
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    const parts = timeFormatter.formatToParts(now);
    const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '13', 10);
    const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '5', 10);
    const second = parseInt(parts.find(p => p.type === 'second')?.value || '0', 10);

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Yangon',
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const dateStrEn = dateFormatter.format(now); // e.g. "Tuesday, October 6, 2026"
    
    // Myanmar Burmese format
    const myanmarDays: Record<string, string> = {
      'Sunday': 'တနင်္ဂနွေနေ့',
      'Monday': 'တနင်္လာနေ့',
      'Tuesday': 'အင်္ဂါနေ့',
      'Wednesday': 'ဗုဒ္ဓဟူးနေ့',
      'Thursday': 'ကြာသပတေးနေ့',
      'Friday': 'သောကြာနေ့',
      'Saturday': 'စနေနေ့',
    };
    const dayName = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Yangon', weekday: 'long' }).format(now);
    const dayMy = myanmarDays[dayName] || 'အင်္ဂါနေ့';
    const dayNum = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Yangon', day: 'numeric' }).format(now);
    const yearNum = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Yangon', year: 'numeric' }).format(now);
    
    const burmeseDigits: Record<string, string> = {
      '0': '၀', '1': '၁', '2': '၂', '3': '၃', '4': '၄',
      '5': '၅', '6': '၆', '7': '၇', '8': '၈', '9': '၉',
    };
    const toBurmeseNum = (s: string) => s.split('').map(c => burmeseDigits[c] || c).join('');

    const dateStrMy = `${toBurmeseNum(yearNum)} ခုနှစ်၊ အောက်တိုဘာလ ${toBurmeseNum(dayNum)} ရက် (${dayMy})`;

    return {
      hour: hour % 24,
      minute,
      second,
      dateStrEn,
      dateStrMy,
    };
  } catch {
    // Fallback manual offset: UTC + 6.5 hours
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const mmt = new Date(utc + 6.5 * 3600000);
    return {
      hour: mmt.getHours(),
      minute: mmt.getMinutes(),
      second: mmt.getSeconds(),
      dateStrEn: 'Tuesday, October 6, 2026',
      dateStrMy: '၂၀၂၆ ခုနှစ်၊ အောက်တိုဘာလ ၆ ရက် (အင်္ဂါနေ့)',
    };
  }
}
