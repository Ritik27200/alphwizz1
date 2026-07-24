let AsyncStorageModule: any;
try {
  AsyncStorageModule = require('@react-native-async-storage/async-storage').default;
} catch {
  const memoryStore: Record<string, string> = {};
  AsyncStorageModule = {
    getItem: async (key: string) => memoryStore[key] || null,
    setItem: async (key: string, value: string) => {
      memoryStore[key] = value;
    },
  };
}

export type Reminder = {
  id: string;
  name: string;
  hour: number; // 1-12
  minute: number; // 0-59
  meridiem: "AM" | "PM";
  days: number[]; // 0=Sun..6=Sat
  enabled: boolean;
  icon: "gym" | "walk" | "supplement" | "meditation" | "water";
  coachAssisted?: boolean;
};

const KEY = "@reminders_v1";

export const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
export const DAY_FULL = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export async function loadReminders(): Promise<Reminder[]> {
  try {
    const raw = await AsyncStorageModule.getItem(KEY);
    if (!raw) return defaultSeed();
    return JSON.parse(raw) as Reminder[];
  } catch {
    return defaultSeed();
  }
}

export async function saveReminders(list: Reminder[]): Promise<void> {
  try {
    await AsyncStorageModule.setItem(KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("Storage save error", e);
  }
}

export function formatDays(days: number[]): string {
  return days
    .slice()
    .sort((a, b) => a - b)
    .map((d) => DAY_FULL[d])
    .join(", ");
}

export function formatTime(hour: number, minute: number, meridiem: "AM" | "PM"): string {
  const hh = hour.toString().padStart(2, "0");
  const mm = minute.toString().padStart(2, "0");
  return `${hh}:${mm} ${meridiem}`;
}

function defaultSeed(): Reminder[] {
  return [
    {
      id: "seed-1",
      name: "Gym Session",
      hour: 6,
      minute: 30,
      meridiem: "PM",
      days: [1, 3, 5],
      enabled: false,
      icon: "gym",
    },
    {
      id: "seed-2",
      name: "Evening Walk",
      hour: 7,
      minute: 30,
      meridiem: "PM",
      days: [1, 3, 5],
      enabled: true,
      icon: "walk",
      coachAssisted: true,
    },
  ];
}
