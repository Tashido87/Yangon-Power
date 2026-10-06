import { ScheduleSlot } from '../types';

export const SCHEDULE_DATE_STR = 'Tuesday, October 6, 2026';
export const SCHEDULE_DATE_MY = '၂၀၂၆ ခုနှစ်၊ အောက်တိုဘာလ ၆ ရက် (အင်္ဂါနေ့)';
export const SCHEDULE_DATE_SHORT = '6.10.2026';

export const SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    id: 1,
    slotNumber: 1,
    timeRange: '05:00 - 09:00',
    timeRangeFormatted: '05:00 AM – 09:00 AM',
    startHour: 5,
    endHour: 9,
    outageRange: '05:00 AM – 09:00 AM',
    generatorRuns: '07:00 AM – 09:00 AM',
    standbyRuns: '05:00 AM – 07:00 AM',
    generatorHoursTotal: 2,
    intervals: [
      { startHour: 5, endHour: 7, startStr: '05:00 AM', endStr: '07:00 AM', type: 'standby' },
      { startHour: 7, endHour: 9, startStr: '07:00 AM', endStr: '09:00 AM', type: 'generator' },
    ],
    noteEn: 'Generator runs for 2 hours (07:00 AM – 09:00 AM). Morning routine power provided.',
    noteMy: 'မနက် ၇:၀၀ မှ ၉:၀၀ အထိ မီးစက် (၂) နာရီမောင်းပါမည်။ ကျန်အချိန် အသင့်စောင့်ဆိုင်း (Standby) ဖြစ်ပါသည်။',
  },
  {
    id: 2,
    slotNumber: 2,
    timeRange: '09:00 - 13:00',
    timeRangeFormatted: '09:00 AM – 01:00 PM',
    startHour: 9,
    endHour: 13,
    outageRange: '09:00 AM – 01:00 PM',
    generatorRuns: '11:00 AM – 01:00 PM',
    standbyRuns: '09:00 AM – 11:00 AM',
    generatorHoursTotal: 2,
    intervals: [
      { startHour: 9, endHour: 11, startStr: '09:00 AM', endStr: '11:00 AM', type: 'standby' },
      { startHour: 11, endHour: 13, startStr: '11:00 AM', endStr: '01:00 PM', type: 'generator' },
    ],
    noteEn: 'Standby 09:00 AM – 11:00 AM | Generator runs 11:00 AM – 01:00 PM (Lunch hours).',
    noteMy: 'မနက် ၉:၀၀ မှ ၁၁:၀၀ အထိ မီးစက်နားမည် (Standby)။ နေ့လယ်စာချိန် ၁၁:၀၀ မှ ၁:၀၀ ထိ မီးစက်မောင်းပါမည်။',
  },
  {
    id: 3,
    slotNumber: 3,
    timeRange: '13:00 - 17:00',
    timeRangeFormatted: '01:00 PM – 05:00 PM',
    startHour: 13,
    endHour: 17,
    outageRange: '01:00 PM – 05:00 PM',
    generatorRuns: '02:00 PM – 03:00 PM & 04:00 PM – 05:00 PM',
    standbyRuns: '01:00 PM – 02:00 PM & 03:00 PM – 04:00 PM',
    generatorHoursTotal: 2,
    intervals: [
      { startHour: 13, endHour: 14, startStr: '01:00 PM', endStr: '02:00 PM', type: 'standby' },
      { startHour: 14, endHour: 15, startStr: '02:00 PM', endStr: '03:00 PM', type: 'generator' },
      { startHour: 15, endHour: 16, startStr: '03:00 PM', endStr: '04:00 PM', type: 'standby' },
      { startHour: 16, endHour: 17, startStr: '04:00 PM', endStr: '05:00 PM', type: 'generator' },
    ],
    noteEn: 'Split run: 2:00 PM – 3:00 PM and 4:00 PM – 5:00 PM (1 hour run, 1 hour rest alternate).',
    noteMy: 'နေ့လယ် ၂:၀၀ မှ ၃:၀၀ နှင့် ညနေ ၄:၀၀ မှ ၅:၀၀ အထိ (၁) နာရီစီ ခွဲခြားမောင်းပါမည်။',
  },
  {
    id: 4,
    slotNumber: 4,
    timeRange: '17:00 - 21:00',
    timeRangeFormatted: '05:00 PM – 09:00 PM',
    startHour: 17,
    endHour: 21,
    outageRange: '05:00 PM – 09:00 PM',
    generatorRuns: '06:00 PM – 09:00 PM',
    standbyRuns: '05:00 PM – 06:00 PM',
    generatorHoursTotal: 3,
    intervals: [
      { startHour: 17, endHour: 18, startStr: '05:00 PM', endStr: '06:00 PM', type: 'standby' },
      { startHour: 18, endHour: 21, startStr: '06:00 PM', endStr: '09:00 PM', type: 'generator' },
    ],
    noteEn: 'Evening peak: Standby 05:00 PM – 06:00 PM | Extended 3-hr generator run 06:00 PM – 09:00 PM.',
    noteMy: 'ညနေ ၅:၀၀ မှ ၆:၀၀ ထိ စောင့်ဆိုင်းပြီး ညနေ ၆:၀၀ မှ ည ၉:၀၀ အထိ ညပိုင်းအတွက် (၃) နာရီဆက်တိုက် မောင်းပါမည်။',
  },
];

export const BUILDING_POLICIES = {
  nightShutdown: {
    startHour: 23, // 11:00 PM
    endHour: 6,    // 06:00 AM
    startStr: '11:00 PM',
    endStr: '06:00 AM',
    titleEn: 'Night Rest & Quiet Hours',
    titleMy: 'ညဘက် မီးစက်ရပ်နားချိန်',
    descEn: 'Generator shut down from 11:00 PM to 06:00 AM for noise regulations and quiet rest.',
    descMy: 'ည ၁၁:၀၀ နာရီမှ မနက် ၆:၀၀ နာရီအထိ ညအိပ်ချိန်ဖြစ်၍ မီးစက်လုံးဝ ရပ်နားထားပါမည်။',
  },
  liftEmergency: {
    fee: 15000,
    currency: 'MMK',
    titleEn: 'Emergency Lift Request',
    titleMy: 'အရေးပေါ် ဓာတ်လှေကား အသုံးပြုခွင့်',
    rateEn: '15,000 MMK / trip',
    rateMy: '၁၅,၀၀၀ ကျပ် / ခေါက်',
    descEn: 'During generator standby hours, residents may request an emergency elevator run for medical, elderly, or heavy burden needs.',
    descMy: 'မီးစက်နားချိန် (Standby) အတွင်း အရေးပေါ်ကျန်းမာရေး၊ သက်ကြီးရွယ်အိုနှင့် လေးလံသောပစ္စည်းများ သယ်ယူရန်အတွက် ဓာတ်လှေကား သီးသန့်မောင်းနှင်ခွင့် တောင်းဆိုနိုင်ပါသည်။ (၁ ခေါက်လျှင် ၁၅,၀၀၀ ကျပ်)',
  },
  hotline: {
    office: '+95 9 789 123 456',
    securityDesk: '+95 9 450 888 999',
    liftTechnician: '+95 9 250 111 222',
    viberChannel: 'https://invite.viber.com/?g2=komorebi-condo-power',
  }
};
