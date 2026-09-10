export interface UserProgress {
  id: string;
  username: string;
  avatarUrl: string | null;
  currentXp: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
}
