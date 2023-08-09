export interface MoodOptionType {
  emoji: string;
  description: string;
}

export type MoodOptionWithTimestamp = {
  mood: MoodOptionType;
  timestamp: number;
};
