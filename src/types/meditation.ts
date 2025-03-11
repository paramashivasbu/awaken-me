export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: string;
  audioUrl?: string;
}
