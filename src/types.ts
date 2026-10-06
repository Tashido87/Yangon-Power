export type Language = 'en' | 'my';

export type ShiftType = 'shift_b' | 'shift_a';
// shift_b: 09:00-13:00 Outage, 13:00-17:00 Power Restored, 17:00-21:00 Outage
// shift_a: 05:00-09:00 Outage, 09:00-13:00 Power Restored, 13:00-17:00 Outage, 17:00+ Power Restored (ညမပျက်)

export type PowerState = 
  | 'GEN_RUNNING'      // Generator is currently running (Green/Matcha)
  | 'OUTAGE_STANDBY'   // Power outage & generator standby (Peach/Coral alert)
  | 'GRID_NORMAL'      // City Grid Power on (Soft Blue/Warm Sand)
  | 'NIGHT_SHUTDOWN';  // Generator shut down for quiet night hours 23:00 - 06:00 (Muted Slate)

export interface TimeInterval {
  startHour: number; // decimal or fractional hour e.g. 7.0
  endHour: number;   // e.g. 9.0
  startStr: string;  // "07:00 AM"
  endStr: string;    // "09:00 AM"
  type: 'generator' | 'standby' | 'grid' | 'night';
}

export interface ScheduleSlot {
  id: number;
  slotNumber: number;
  timeRange: string;         // "05:00 - 09:00"
  timeRangeFormatted: string;// "05:00 AM – 09:00 AM"
  startHour: number;
  endHour: number;
  outageRange: string;       // "05:00 AM – 09:00 AM"
  generatorRuns: string;     // "07:00 AM – 09:00 AM"
  generatorHoursTotal: number;
  standbyRuns?: string;
  intervals: TimeInterval[];
  noteEn: string;
  noteMy: string;
}

export interface NextEventInfo {
  type: PowerState;
  targetHour: number;
  targetMinute: number;
  eventDescriptionEn: string;
  eventDescriptionMy: string;
  secondsRemaining: number;
  timeString: string;
  timeStringEn?: string;
  timeStringMy?: string;
}

export interface CurrentStatusCalculation {
  state: PowerState;
  stateBadgeEn: string;
  stateBadgeMy: string;
  stateDescEn: string;
  stateDescMy: string;
  activeSlotId: number | null;
  nextEvent: NextEventInfo;
  isNightRest: boolean;
  generatorIsActive: boolean;
  powerIsOut: boolean;
}

export interface LiftBookingForm {
  unitNumber: string;
  floor: string;
  contactNumber: string;
  reason: 'elderly' | 'medical' | 'groceries' | 'urgent' | 'regular';
  notes: string;
}
