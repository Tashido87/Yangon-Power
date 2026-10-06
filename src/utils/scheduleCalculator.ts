import { CurrentStatusCalculation, PowerState, NextEventInfo, ShiftType } from '../types';

export interface DailyScheduleTransition {
  hour: number;
  minute: number;
  totalMinutes: number;
  state: PowerState;
  slotId: number | null;
  labelEn: string;
  labelMy: string;
  badgeEn: string;
  badgeMy: string;
}

// SHIFT B (9:00 AM - 1:00 PM & 5:00 PM - 9:00 PM Outage, 1:00 PM - 5:00 PM & 9:00 PM+ Power Restored)
export const TRANSITIONS_SHIFT_B: DailyScheduleTransition[] = [
  {
    hour: 0,
    minute: 0,
    totalMinutes: 0,
    state: 'NIGHT_SHUTDOWN',
    slotId: null,
    labelEn: 'Night Rest Period (Generator shut down)',
    labelMy: 'ညဘက်အိပ်ချိန် (မီးစက်လုံးဝပိတ်ထားသည်)',
    badgeEn: 'Night Rest / Generator Off',
    badgeMy: 'ညဘက်အိပ်ချိန် / မီးစက်ပိတ်',
  },
  {
    hour: 6,
    minute: 0,
    totalMinutes: 360,
    state: 'GRID_NORMAL',
    slotId: null,
    labelEn: 'Morning Grid Power Active (06:00 AM – 09:00 AM)',
    labelMy: 'မနက်ပိုင်း အစိုးရမီးရရှိချိန် (မနက် ၆:၀၀ မှ ၉:၀၀ အထိ)',
    badgeEn: 'Grid Power Normal',
    badgeMy: 'အစိုးရမီး ရရှိနေသည်',
  },
  {
    hour: 9,
    minute: 0,
    totalMinutes: 540,
    state: 'OUTAGE_STANDBY',
    slotId: null,
    labelEn: 'Outage Begins · Standby until 11:00 AM',
    labelMy: 'မီးပျက်ချိန် စတင် · မနက် ၁၁:၀၀ အထိ မီးစက်နားချိန်',
    badgeEn: 'Power Outage / Standby',
    badgeMy: 'မီးပျက် / စောင့်ဆိုင်း',
  },
  {
    hour: 11,
    minute: 0,
    totalMinutes: 660,
    state: 'GEN_RUNNING',
    slotId: null,
    labelEn: 'Lunch Generator Running (11:00 AM – 01:00 PM)',
    labelMy: 'နေ့လယ်စာချိန် မီးစက်မောင်းနေသည် (နေ့လယ် ၁:၀၀ အထိ)',
    badgeEn: 'Generator Running',
    badgeMy: 'မီးစက်မောင်းနေသည်',
  },
  {
    hour: 13,
    minute: 0,
    totalMinutes: 780,
    state: 'GRID_NORMAL',
    slotId: null,
    labelEn: 'Power Restored (01:00 PM – 05:00 PM) · EPC Grid Active',
    labelMy: 'မီးပြန်လာပါပြီ (နေ့လယ် ၁:၀၀ မှ ညနေ ၅:၀၀ အထိ) · အစိုးရမီးရရှိချိန်',
    badgeEn: 'Grid Power Restored',
    badgeMy: 'မီးပြန်လာသည် / အစိုးရမီး',
  },
  {
    hour: 17,
    minute: 0,
    totalMinutes: 1020,
    state: 'OUTAGE_STANDBY',
    slotId: null,
    labelEn: 'Evening Outage Begins · Standby until 06:00 PM',
    labelMy: 'ညနေပိုင်း မီးပျက်ချိန် စတင် · ညနေ ၆:၀၀ အထိ မီးစက်နားချိန်',
    badgeEn: 'Power Outage / Standby',
    badgeMy: 'မီးပျက် / စောင့်ဆိုင်း',
  },
  {
    hour: 18,
    minute: 0,
    totalMinutes: 1080,
    state: 'GEN_RUNNING',
    slotId: null,
    labelEn: 'Evening Peak Generator Running (06:00 PM – 09:00 PM)',
    labelMy: 'ညနေပိုင်း မီးစက်မောင်းနေသည် (ည ၉:၀၀ အထိ)',
    badgeEn: 'Generator Running',
    badgeMy: 'မီးစက်မောင်းနေသည်',
  },
  {
    hour: 21,
    minute: 0,
    totalMinutes: 1260,
    state: 'GRID_NORMAL',
    slotId: null,
    labelEn: 'Power Restored at 9:00 PM · Night Grid Active',
    labelMy: 'ည ၉:၀၀ နာရီ မီးပြန်လာပါပြီ · ညဘက် အစိုးရမီး ရရှိချိန်',
    badgeEn: 'Grid Power Restored (9:00 PM)',
    badgeMy: 'မီးပြန်လာသည် / အစိုးရမီး',
  },
  {
    hour: 23,
    minute: 0,
    totalMinutes: 1380,
    state: 'NIGHT_SHUTDOWN',
    slotId: null,
    labelEn: 'Night Rest Period (11:00 PM – 06:00 AM)',
    labelMy: 'ညဘက် မီးစက်ရပ်နားချိန် (ည ၁၁:၀၀ မှ မနက် ၆:၀၀ အထိ)',
    badgeEn: 'Night Rest / Generator Off',
    badgeMy: 'ညဘက်အိပ်ချိန် / မီးစက်ပိတ်',
  },
];

// SHIFT A (5:00 AM - 9:00 AM & 1:00 PM - 5:00 PM Outage, 9:00 AM - 1:00 PM & 5:00 PM+ Power Restored, ညမပျက်)
export const TRANSITIONS_SHIFT_A: DailyScheduleTransition[] = [
  {
    hour: 0,
    minute: 0,
    totalMinutes: 0,
    state: 'NIGHT_SHUTDOWN',
    slotId: null,
    labelEn: 'Night Rest Period (Generator shut down)',
    labelMy: 'ညဘက်အိပ်ချိန် (မီးစက်လုံးဝပိတ်ထားသည်)',
    badgeEn: 'Night Rest / Generator Off',
    badgeMy: 'ညဘက်အိပ်ချိန် / မီးစက်ပိတ်',
  },
  {
    hour: 5,
    minute: 0,
    totalMinutes: 300,
    state: 'OUTAGE_STANDBY',
    slotId: null,
    labelEn: 'Early Morning Outage Begins · Standby until 07:00 AM',
    labelMy: 'မနက်စောစော မီးပျက်ချိန် · ၇:၀၀ အထိ စောင့်ဆိုင်း',
    badgeEn: 'Power Outage / Standby',
    badgeMy: 'မီးပျက် / စောင့်ဆိုင်း',
  },
  {
    hour: 7,
    minute: 0,
    totalMinutes: 420,
    state: 'GEN_RUNNING',
    slotId: null,
    labelEn: 'Morning Generator Running (07:00 AM – 09:00 AM)',
    labelMy: 'မနက်ပိုင်း မီးစက်မောင်းနေသည် (မနက် ၉:၀၀ အထိ)',
    badgeEn: 'Generator Running',
    badgeMy: 'မီးစက်မောင်းနေသည်',
  },
  {
    hour: 9,
    minute: 0,
    totalMinutes: 540,
    state: 'GRID_NORMAL',
    slotId: null,
    labelEn: 'Power Restored (09:00 AM – 01:00 PM) · EPC Grid Active',
    labelMy: 'မီးပြန်လာပါပြီ (မနက် ၉:၀၀ မှ နေ့လယ် ၁:၀၀ အထိ) · အစိုးရမီးရရှိချိန်',
    badgeEn: 'Grid Power Restored',
    badgeMy: 'မီးပြန်လာသည် / အစိုးရမီး',
  },
  {
    hour: 13,
    minute: 0,
    totalMinutes: 780,
    state: 'OUTAGE_STANDBY',
    slotId: null,
    labelEn: 'Afternoon Outage Begins · Standby until 02:00 PM',
    labelMy: 'နေ့လယ်ပိုင်း မီးပျက်ချိန် · ၂:၀၀ အထိ မီးစက်နားချိန်',
    badgeEn: 'Power Outage / Standby',
    badgeMy: 'မီးပျက် / စောင့်ဆိုင်း',
  },
  {
    hour: 14,
    minute: 0,
    totalMinutes: 840,
    state: 'GEN_RUNNING',
    slotId: null,
    labelEn: 'Afternoon Generator 1 (02:00 PM – 03:00 PM)',
    labelMy: 'နေ့လယ်ပိုင်း မီးစက်မောင်းနေသည် (နေ့လယ် ၃:၀၀ အထိ)',
    badgeEn: 'Generator Running',
    badgeMy: 'မီးစက်မောင်းနေသည်',
  },
  {
    hour: 15,
    minute: 0,
    totalMinutes: 900,
    state: 'OUTAGE_STANDBY',
    slotId: null,
    labelEn: 'Afternoon Generator Rest · Standby until 04:00 PM',
    labelMy: 'မီးစက်ခေတ္တနားချိန် · ညနေ ၄:၀၀ အထိ စောင့်ဆိုင်း',
    badgeEn: 'Power Outage / Standby',
    badgeMy: 'မီးပျက် / စောင့်ဆိုင်း',
  },
  {
    hour: 16,
    minute: 0,
    totalMinutes: 960,
    state: 'GEN_RUNNING',
    slotId: null,
    labelEn: 'Late Afternoon Generator 2 (04:00 PM – 05:00 PM)',
    labelMy: 'ညနေစောင်း မီးစက်မောင်းနေသည် (ညနေ ၅:၀၀ အထိ)',
    badgeEn: 'Generator Running',
    badgeMy: 'မီးစက်မောင်းနေသည်',
  },
  {
    hour: 17,
    minute: 0,
    totalMinutes: 1020,
    state: 'GRID_NORMAL',
    slotId: null,
    labelEn: 'Power Restored (05:00 PM – 11:00 PM) · ညမပျက်',
    labelMy: 'ညနေ ၅ နာရီ မီးပြန်လာပါပြီ · ညမပျက် (အစိုးရမီး ရရှိချိန်)',
    badgeEn: 'Grid Power Restored (No Night Outage)',
    badgeMy: 'မီးပြန်လာသည် / ညမပျက်',
  },
  {
    hour: 23,
    minute: 0,
    totalMinutes: 1380,
    state: 'NIGHT_SHUTDOWN',
    slotId: null,
    labelEn: 'Night Rest Period (11:00 PM – 05:00 AM)',
    labelMy: 'ညဘက် မီးစက်ရပ်နားချိန် (ည ၁၁:၀၀ မှ မနက် ၅:၀၀ အထိ)',
    badgeEn: 'Night Rest / Generator Off',
    badgeMy: 'ညဘက်အိပ်ချိန် / မီးစက်ပိတ်',
  },
];

// SHIFT B without 5:00 PM outage (Power returned at 1:00 PM and stays active throughout the evening!)
export const TRANSITIONS_SHIFT_B_NO_EVENING: DailyScheduleTransition[] = [
  {
    hour: 0,
    minute: 0,
    totalMinutes: 0,
    state: 'NIGHT_SHUTDOWN',
    slotId: null,
    labelEn: 'Night Rest Period (Generator shut down)',
    labelMy: 'ညဘက်အိပ်ချိန် (မီးစက်လုံးဝပိတ်ထားသည်)',
    badgeEn: 'Night Rest / Generator Off',
    badgeMy: 'ညဘက်အိပ်ချိန် / မီးစက်ပိတ်',
  },
  {
    hour: 6,
    minute: 0,
    totalMinutes: 360,
    state: 'GRID_NORMAL',
    slotId: null,
    labelEn: 'Morning Grid Power Active (06:00 AM – 09:00 AM)',
    labelMy: 'မနက်ပိုင်း အစိုးရမီးရရှိချိန် (မနက် ၆:၀၀ မှ ၉:၀၀ အထိ)',
    badgeEn: 'Grid Power Normal',
    badgeMy: 'အစိုးရမီး ရရှိနေသည်',
  },
  {
    hour: 9,
    minute: 0,
    totalMinutes: 540,
    state: 'OUTAGE_STANDBY',
    slotId: null,
    labelEn: 'Outage Begins · Standby until 11:00 AM',
    labelMy: 'မီးပျက်ချိန် စတင် · မနက် ၁၁:၀၀ အထိ မီးစက်နားချိန်',
    badgeEn: 'Power Outage / Standby',
    badgeMy: 'မီးပျက် / စောင့်ဆိုင်း',
  },
  {
    hour: 11,
    minute: 0,
    totalMinutes: 660,
    state: 'GEN_RUNNING',
    slotId: null,
    labelEn: 'Lunch Generator Running (11:00 AM – 01:00 PM)',
    labelMy: 'နေ့လယ်စာချိန် မီးစက်မောင်းနေသည် (နေ့လယ် ၁:၀၀ အထိ)',
    badgeEn: 'Generator Running',
    badgeMy: 'မီးစက်မောင်းနေသည်',
  },
  {
    hour: 13,
    minute: 0,
    totalMinutes: 780,
    state: 'GRID_NORMAL',
    slotId: null,
    labelEn: 'Power Restored at 01:00 PM · Evening Grid Power Active',
    labelMy: 'နေ့လယ် ၁:၀၀ နာရီ မီးပြန်လာပါပြီ · အစိုးရမီး ရရှိနေသည်',
    badgeEn: 'Grid Power Restored',
    badgeMy: 'မီးပြန်လာသည် / အစိုးရမီး',
  },
];

export function calculateStatus(
  dateOrTime: { hour: number; minute: number; second: number },
  shift: ShiftType = 'shift_b',
  hasEveningOutage: boolean = false
): CurrentStatusCalculation {
  const { hour, minute, second } = dateOrTime;
  const currentTotalMinutes = hour * 60 + minute;
  const currentTotalSeconds = currentTotalMinutes * 60 + second;

  let transitions: DailyScheduleTransition[];
  if (shift === 'shift_a') {
    transitions = TRANSITIONS_SHIFT_A;
  } else {
    transitions = hasEveningOutage ? TRANSITIONS_SHIFT_B : TRANSITIONS_SHIFT_B_NO_EVENING;
  }

  // Determine current active transition
  let activeTransition = transitions[0];
  for (let i = 0; i < transitions.length; i++) {
    if (currentTotalMinutes >= transitions[i].totalMinutes) {
      activeTransition = transitions[i];
    } else {
      break;
    }
  }

  const formatTimeStr = (h: number, m: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = m.toString().padStart(2, '0');
    return `${displayH}:${displayM} ${period}`;
  };

  let nextEvent: NextEventInfo;

  // Specific rule for Shift B when evening outage is off (1:00 PM onwards):
  // Power is back at 1:00 PM and won't cut at 5:00 PM.
  // The next power outage is TOMORROW MORNING at 05:00 AM (Shift A)!
  if (shift === 'shift_b' && !hasEveningOutage && currentTotalMinutes >= 780) {
    const remainingToday = 86400 - currentTotalSeconds;
    const tomorrow5AmSeconds = 5 * 3600;
    const secondsRemaining = remainingToday + tomorrow5AmSeconds;

    nextEvent = {
      type: 'OUTAGE_STANDBY',
      targetHour: 5,
      targetMinute: 0,
      eventDescriptionEn: 'Tomorrow 05:00 AM · Next Power Outage',
      eventDescriptionMy: 'မနက်ဖြန် မနက် ၅:၀၀ (မီးပျက်ချိန်)',
      secondsRemaining: Math.max(0, secondsRemaining),
      timeString: '05:00 AM (Tomorrow)',
      timeStringEn: '05:00 AM (Tomorrow)',
      timeStringMy: 'မနက် ၅:၀၀ (မနက်ဖြန်)',
    };
  } else if (shift === 'shift_a' && currentTotalMinutes >= 1020) {
    // In Shift A, after 17:00 (5:00 PM), power returned and night is on!
    // Next outage is tomorrow morning at 09:00 AM (Shift B)!
    const remainingToday = 86400 - currentTotalSeconds;
    const tomorrow9AmSeconds = 9 * 3600;
    const secondsRemaining = remainingToday + tomorrow9AmSeconds;

    nextEvent = {
      type: 'OUTAGE_STANDBY',
      targetHour: 9,
      targetMinute: 0,
      eventDescriptionEn: 'Tomorrow 09:00 AM · Next Power Outage',
      eventDescriptionMy: 'မနက်ဖြန် မနက် ၉:၀၀ (မီးပျက်ချိန်)',
      secondsRemaining: Math.max(0, secondsRemaining),
      timeString: '09:00 AM (Tomorrow)',
      timeStringEn: '09:00 AM (Tomorrow)',
      timeStringMy: 'မနက် ၉:၀၀ (မနက်ဖြန်)',
    };
  } else {
    // Normal same-day transition
    const nextTransitionIndex = transitions.findIndex((t) => t.totalMinutes > currentTotalMinutes);

    if (nextTransitionIndex !== -1) {
      const nextTransition = transitions[nextTransitionIndex];
      const targetSeconds = nextTransition.totalMinutes * 60;
      const secondsRemaining = targetSeconds - currentTotalSeconds;
      const tStr = formatTimeStr(nextTransition.hour, nextTransition.minute);

      nextEvent = {
        type: nextTransition.state,
        targetHour: nextTransition.hour,
        targetMinute: nextTransition.minute,
        eventDescriptionEn: nextTransition.labelEn,
        eventDescriptionMy: nextTransition.labelMy,
        secondsRemaining: Math.max(0, secondsRemaining),
        timeString: tStr,
        timeStringEn: tStr,
        timeStringMy: tStr,
      };
    } else {
      // Fallback wrap to tomorrow morning
      const targetHour = shift === 'shift_b' ? 5 : 9;
      const remainingToday = 86400 - currentTotalSeconds;
      const tomorrowTargetSeconds = targetHour * 3600;
      const secondsRemaining = remainingToday + tomorrowTargetSeconds;

      nextEvent = {
        type: 'OUTAGE_STANDBY',
        targetHour,
        targetMinute: 0,
        eventDescriptionEn: `Tomorrow ${targetHour === 5 ? '05:00 AM' : '09:00 AM'} · Next Outage`,
        eventDescriptionMy: `မနက်ဖြန် မနက် ${targetHour === 5 ? '၅:၀၀' : '၉:၀၀'} (မီးပျက်ချိန်)`,
        secondsRemaining: Math.max(0, secondsRemaining),
        timeString: `${targetHour === 5 ? '05:00 AM' : '09:00 AM'} (Tomorrow)`,
        timeStringEn: `${targetHour === 5 ? '05:00 AM' : '09:00 AM'} (Tomorrow)`,
        timeStringMy: `မနက် ${targetHour === 5 ? '၅:၀၀' : '၉:၀၀'} (မနက်ဖြန်)`,
      };
    }
  }

  const isNightRest = hour >= 23 || (shift === 'shift_b' ? hour < 6 : hour < 5);
  const generatorIsActive = activeTransition.state === 'GEN_RUNNING';
  const powerIsOut = activeTransition.state === 'OUTAGE_STANDBY';

  return {
    state: activeTransition.state,
    stateBadgeEn: activeTransition.badgeEn,
    stateBadgeMy: activeTransition.badgeMy,
    stateDescEn: activeTransition.labelEn,
    stateDescMy: activeTransition.labelMy,
    activeSlotId: null,
    nextEvent,
    isNightRest,
    generatorIsActive,
    powerIsOut,
  };
}

export function formatCountdown(totalSeconds: number): {
  hours: number;
  minutes: number;
  seconds: number;
  formattedStr: string;
} {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  let formattedStr = '';
  if (hours > 0) {
    formattedStr = `${hours}h ${pad(minutes)}m ${pad(seconds)}s`;
  } else {
    formattedStr = `${pad(minutes)}m ${pad(seconds)}s`;
  }

  return { hours, minutes, seconds, formattedStr };
}

export interface MyanmarTimeInfo {
  hour: number;
  minute: number;
  second: number;
  year: number;
  month: number;
  day: number;
  weekday: string;
  dateStrEn: string;
  dateStrMy: string;
}

export function getLiveMyanmarTime(): MyanmarTimeInfo {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Yangon',
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  const parts = formatter.formatToParts(now);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '';

  const hour = parseInt(getPart('hour') || '0', 10) % 24;
  const minute = parseInt(getPart('minute') || '0', 10);
  const second = parseInt(getPart('second') || '0', 10);
  const day = parseInt(getPart('day') || '1', 10);
  const month = parseInt(getPart('month') || '1', 10);
  const year = parseInt(getPart('year') || '2026', 10);
  const weekday = getPart('weekday') || 'Tuesday';

  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthsMy = ['ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်', 'ဇူလိုင်', 'ဩဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ', 'ဒီဇင်ဘာ'];
  const daysMy: Record<string, string> = {
    Sunday: 'တနင်္ဂနွေ',
    Monday: 'တနင်္လာ',
    Tuesday: 'အင်္ဂါ',
    Wednesday: 'ဗုဒ္ဓဟူး',
    Thursday: 'ကြာသပတေး',
    Friday: 'သောကြာ',
    Saturday: 'စနေ',
  };

  const toMyDigits = (n: number | string) => {
    const myanmarDigits = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];
    return n.toString().replace(/[0-9]/g, (d) => myanmarDigits[parseInt(d, 10)]);
  };

  const dateStrEn = `${weekday}, ${monthsEn[month - 1]} ${day}, ${year}`;
  const dateStrMy = `${toMyDigits(year)} ခုနှစ်၊ ${monthsMy[month - 1]}လ ${toMyDigits(day)} ရက် (${daysMy[weekday] || weekday}နေ့)`;

  return {
    hour,
    minute,
    second,
    year,
    month,
    day,
    weekday,
    dateStrEn,
    dateStrMy,
  };
}

