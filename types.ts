export interface DaySchedule {
  day: string;
  subjects: string[];
}

export interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
  tag: 'Important' | 'Info' | 'Event';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}