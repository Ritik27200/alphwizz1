import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Switch,
  NativeSyntheticEvent,
  NativeScrollEvent,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
let Haptics: any = {
  selectionAsync: async () => {},
  notificationAsync: async () => {},
  NotificationFeedbackType: { Success: 'success' },
};
try {
  Haptics = require('expo-haptics');
} catch {}

import {
  DAY_LABELS,
  Reminder,
  formatDays,
  formatTime,
  loadReminders,
  saveReminders,
} from "@/src/utils/reminders";

const COLORS = {
  bg: "#FFFFFF",
  navy: "#0F2C5A",
  navyDark: "#0B1F42",
  sub: "#8B94A6",
  border: "#EEF0F4",
  green: "#26B24C",
  orange: "#F58A2E",
  blue: "#2F7BE0",
  chipBg: "#F5F7FB",
  cardBg: "#FBFBFC",
};

const ITEM_H = 48;
const VISIBLE = 5; // 2 above + selected + 2 below
const PAD = ITEM_H * 2;

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const MERIDIEMS: ("AM" | "PM")[] = ["AM", "PM"];

export default function ReminderScreen() {
  const router = useRouter();

  const [hour, setHour] = useState(6);
  const [minute, setMinute] = useState(0);
  const [meridiem, setMeridiem] = useState<"AM" | "PM">("AM");
  const [selectedDays, setSelectedDays] = useState<number[]>([3]); // Wed
  const [name, setName] = useState("");
  const [items, setItems] = useState<Reminder[]>([]);

  useEffect(() => {
    loadReminders().then(setItems);
  }, []);

  const tomorrowLabel = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const wd = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][d.getDay()];
    const mo = [
      "JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC",
    ][d.getMonth()];
    return `TOMORROW - ${wd}, ${d.getDate()} ${mo}`;
  }, []);

  const toggleDay = (idx: number) => {
    Haptics.selectionAsync().catch(() => {});
    setSelectedDays((prev) =>
      prev.includes(idx) ? prev.filter((d) => d !== idx) : [...prev, idx]
    );
  };

  const toggleReminder = async (id: string, val: boolean) => {
    const next = items.map((r) => (r.id === id ? { ...r, enabled: val } : r));
    setItems(next);
    await saveReminders(next);
  };

  const saveNew = async () => {
    if (!name.trim()) return;
    const newItem: Reminder = {
      id: `r-${Date.now()}`,
      name: name.trim(),
      hour,
      minute,
      meridiem,
      days: selectedDays.length ? selectedDays : [3],
      enabled: true,
      icon: "supplement",
    };
    const next = [newItem, ...items];
    setItems(next);
    await saveReminders(next);
    setName("");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {}
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView edges={["top"]} style={styles.safe}>
        {/* Header */}
        <View style={styles.header} testID="reminder-header">
          <Pressable
            onPress={() => router.back()}
            style={styles.headerIcon}
            testID="back-button"
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.navy} />
          </Pressable>
          <Text style={styles.headerTitle}>Set Reminder</Text>
          <Pressable style={styles.headerIcon} testID="calendar-button">
            <Ionicons name="calendar-outline" size={22} color={COLORS.navy} />
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Time Picker */}
        <View style={styles.timeWrap} testID="time-picker">
          <View style={styles.selectionOverlay} pointerEvents="none" />
          <WheelColumn
            data={HOURS.map((h) => h.toString().padStart(2, "0"))}
            value={hour.toString().padStart(2, "0")}
            onChange={(v) => setHour(parseInt(v, 10))}
            width={70}
            testID="wheel-hour"
          />
          <Text style={styles.colon}>:</Text>
          <WheelColumn
            data={MINUTES.map((m) => m.toString().padStart(2, "0"))}
            value={minute.toString().padStart(2, "0")}
            onChange={(v) => setMinute(parseInt(v, 10))}
            width={70}
            testID="wheel-minute"
          />
          <WheelColumn
            data={MERIDIEMS}
            value={meridiem}
            onChange={(v) => setMeridiem(v as "AM" | "PM")}
            width={64}
            small
            testID="wheel-meridiem"
          />
        </View>

        {/* Tomorrow banner */}
        <Text style={styles.tomorrow} testID="tomorrow-banner">
          {tomorrowLabel}
        </Text>

        {/* Day selector */}
        <View style={styles.daysCard} testID="days-selector">
          <View style={styles.daysHeader}>
            <Text style={styles.daysLabel}>SELECT DATE</Text>
            <Ionicons name="calendar-outline" size={16} color={COLORS.sub} />
          </View>
          <View style={styles.daysRow}>
            {DAY_LABELS.map((d, i) => {
              const selected = selectedDays.includes(i);
              return (
                <Pressable
                  key={i}
                  onPress={() => toggleDay(i)}
                  style={[styles.dayItem, selected && styles.dayItemSel]}
                  testID={`day-${i}`}
                >
                  <Text
                    style={[styles.dayText, selected && styles.dayTextSel]}
                  >
                    {d}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Reminder Name */}
        <Text style={styles.fieldLabel}>REMINDER NAME</Text>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            placeholder="Morning Supplement"
            placeholderTextColor="#B3B9C5"
            value={name}
            onChangeText={setName}
            testID="reminder-name-input"
            returnKeyType="done"
            onSubmitEditing={saveNew}
          />
          {name.length > 0 && (
            <Pressable
              onPress={saveNew}
              style={styles.saveBtn}
              testID="save-reminder-button"
            >
              <Text style={styles.saveBtnText}>Save</Text>
            </Pressable>
          )}
        </View>

        {/* Existing reminders */}
        <View style={{ marginTop: 18, gap: 10 }} testID="reminders-list">
          {items.map((r) => (
            <ReminderRow key={r.id} item={r} onToggle={toggleReminder} />
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* ---------- Wheel Column ---------- */
function WheelColumn({
  data,
  value,
  onChange,
  width,
  small,
  testID,
}: {
  data: string[];
  value: string;
  onChange: (v: string) => void;
  width: number;
  small?: boolean;
  testID?: string;
}) {
  const ref = useRef<ScrollView>(null);
  const initialIndex = Math.max(0, data.indexOf(value));
  const lastIdx = useRef<number>(initialIndex);

  useEffect(() => {
    const idx = data.indexOf(value);
    if (idx >= 0 && idx !== lastIdx.current) {
      lastIdx.current = idx;
      ref.current?.scrollTo({ y: idx * ITEM_H, animated: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    // Set initial scroll offset once after mount
    const t = setTimeout(() => {
      ref.current?.scrollTo({ y: initialIndex * ITEM_H, animated: false });
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const idx = Math.round(y / ITEM_H);
    const clamped = Math.max(0, Math.min(data.length - 1, idx));
    if (clamped !== lastIdx.current) {
      lastIdx.current = clamped;
      Haptics.selectionAsync().catch(() => {});
      onChange(data[clamped]);
    }
  };

  return (
    <ScrollView
      ref={ref}
      style={{ width, height: ITEM_H * VISIBLE }}
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM_H}
      decelerationRate="fast"
      onMomentumScrollEnd={onMomentumEnd}
      contentContainerStyle={{ paddingVertical: PAD }}
      testID={testID}
    >
      {data.map((it, i) => {
        const active = it === value;
        return (
          <View
            key={it}
            style={{
              height: ITEM_H,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: small ? 22 : active ? 40 : 26,
                fontWeight: active ? "800" : "500",
                color: active ? COLORS.navyDark : "#C6CCD8",
              }}
            >
              {it}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

/* ---------- Reminder Row ---------- */
function ReminderRow({
  item,
  onToggle,
}: {
  item: Reminder;
  onToggle: (id: string, val: boolean) => void;
}) {
  const iconName =
    item.icon === "gym"
      ? "arm-flex"
      : item.icon === "walk"
      ? "walk"
      : item.icon === "meditation"
      ? "meditation"
      : item.icon === "water"
      ? "water"
      : "pill";
  const iconColor =
    item.icon === "gym"
      ? "#2F7BE0"
      : item.icon === "walk"
      ? COLORS.green
      : "#7C5DD4";

  return (
    <View style={styles.reminderRow} testID={`reminder-${item.id}`}>
      <View style={[styles.reminderIcon, { backgroundColor: `${iconColor}15` }]}>
        <MaterialCommunityIcons name={iconName as any} size={22} color={iconColor} />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <View style={styles.reminderTitleRow}>
          <Text style={styles.reminderName}>{item.name}</Text>
          {item.coachAssisted && (
            <View style={styles.coachTag}>
              <Text style={styles.coachTagText}>COACH ASSISTED</Text>
            </View>
          )}
        </View>
        <View style={{ flexDirection: "row", marginTop: 4 }}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={12}
            color={COLORS.sub}
            style={{ marginTop: 2 }}
          />
          <Text style={styles.reminderMeta}>
            {" "}
            {formatTime(item.hour, item.minute, item.meridiem)}   {formatDays(item.days)}
          </Text>
        </View>
      </View>
      <Switch
        value={item.enabled}
        onValueChange={(v) => onToggle(item.id, v)}
        trackColor={{ true: COLORS.green, false: "#D9DEE7" }}
        thumbColor="#FFF"
        testID={`toggle-${item.id}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: COLORS.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.bg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.navy,
  },

  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 32 },

  timeWrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: ITEM_H * VISIBLE,
    marginTop: 8,
  },
  selectionOverlay: {
    position: "absolute",
    top: ITEM_H * 2,
    left: 0,
    right: 0,
    height: ITEM_H,
    backgroundColor: "#F5F7FB",
    borderRadius: 12,
  },
  colon: {
    fontSize: 40,
    fontWeight: "800",
    color: COLORS.navyDark,
    marginHorizontal: 2,
    marginBottom: 4,
  },

  tomorrow: {
    color: COLORS.orange,
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.6,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
  },

  daysCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  daysHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  daysLabel: {
    color: COLORS.sub,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayItem: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  dayItemSel: { backgroundColor: COLORS.blue },
  dayText: { color: "#A9B0BF", fontWeight: "700", fontSize: 13 },
  dayTextSel: { color: "#FFF" },

  fieldLabel: {
    color: COLORS.sub,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
    marginTop: 18,
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.navy,
    paddingVertical: 10,
  },
  saveBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.green,
  },
  saveBtnText: { color: "#FFF", fontWeight: "700", fontSize: 12 },

  reminderRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  reminderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  reminderTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  reminderName: { color: COLORS.navy, fontWeight: "700", fontSize: 14 },
  coachTag: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  coachTagText: { color: "#FFF", fontSize: 8, fontWeight: "800", letterSpacing: 0.4 },
  reminderMeta: { color: COLORS.sub, fontSize: 11, fontWeight: "500" },
});
