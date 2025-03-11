import { Meditation } from "./meditation";

export interface Alarm {
  id: string;
  time: string; // Format: "8:00 AM"
  enabled: boolean;
  meditation: Meditation;
  initialVolume: number; // 0-100
  maxVolume: number; // 0-100
  gradualVolume: boolean;
}
