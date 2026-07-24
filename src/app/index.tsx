import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  bg: "#F5F6FA",
  card: "#FFFFFF",
  navy: "#0F2C5A",
  navyDark: "#0B1F42",
  subText: "#6B7280",
  green: "#26B24C",
  greenDark: "#1E9B3F",
  orange: "#F58A2E",
  orangeLight: "#FDBB6F",
  yellow: "#FFE58F",
  yellowSoft: "#FFF3C4",
  border: "#EEF0F4",
  bluePill: "#DCEBFF",
  purplePill: "#EADCFF",
  pinkPill: "#FFE0E9",
  greenPill: "#D6F5DE",
  peachPill: "#FFE0CC",
  tealPill: "#CDEFEA",
};

type QuickAction = {
  label: string;
  icon: React.ReactNode;
  bg: string;
};

const quickActions: QuickAction[] = [
  {
    label: "Meal Plan",
    bg: COLORS.bluePill,
    icon: <MaterialCommunityIcons name="silverware-fork-knife" size={22} color="#3B7BD9" />,
  },
  {
    label: "Water Intake",
    bg: COLORS.tealPill,
    icon: <MaterialCommunityIcons name="water" size={22} color="#1DA6A0" />,
  },
  {
    label: "Activity Tracking",
    bg: COLORS.greenPill,
    icon: <MaterialCommunityIcons name="leaf" size={22} color="#26B24C" />,
  },
  {
    label: "Meditation",
    bg: COLORS.purplePill,
    icon: <MaterialCommunityIcons name="meditation" size={22} color="#7C5DD4" />,
  },
  {
    label: "Exercise",
    bg: COLORS.peachPill,
    icon: <MaterialCommunityIcons name="run-fast" size={22} color="#EA6A2C" />,
  },
  {
    label: "Sleep",
    bg: COLORS.pinkPill,
    icon: <MaterialCommunityIcons name="weather-night" size={22} color="#D9439E" />,
  },
  {
    label: "Wellness Assessments",
    bg: COLORS.bluePill,
    icon: <MaterialCommunityIcons name="shield-outline" size={22} color="#3B7BD9" />,
  },
  {
    label: "Progress",
    bg: COLORS.greenPill,
    icon: <MaterialCommunityIcons name="chart-line" size={22} color="#26B24C" />,
  },
  {
    label: "Daily Motivation",
    bg: COLORS.yellowSoft,
    icon: <MaterialCommunityIcons name="lightbulb-on" size={22} color="#E0A81C" />,
  },
];

const milestones = [
  {
    uri: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=60",
    label: "Lost 15 kg in 10 months",
  },
  {
    uri: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=60",
    label: "Gained 8 kg muscle in 6 months",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.root} testID="home-screen">
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#F58A2E", "#F5B33E", "#7CC63A", "#26B24C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerBg}
      />
      <SafeAreaView edges={["top"]} style={styles.safeTop}>
        {/* Header */}
        <View style={styles.header} testID="home-header">
          <Pressable style={styles.iconBtn} testID="menu-button">
            <Ionicons name="menu" size={24} color="#FFF" />
          </Pressable>
          <View style={styles.headerCenter}>
            <View style={styles.avatarWrap}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=60",
                }}
                style={styles.avatar}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.hiUser}>Hi User!</Text>
              <Text style={styles.userName} numberOfLines={1}>
                Bikash Ranjan Elias
              </Text>
            </View>
          </View>
          <Pressable style={styles.iconBtn} testID="notification-button">
            <Ionicons name="notifications-outline" size={22} color="#FFF" />
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="home-scroll"
      >
        {/* Onboarding Status */}
        <View style={styles.onboardingCard} testID="onboarding-card">
          <View style={styles.onboardingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.onboardingTitle}>Onboarding Status</Text>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>Level 10</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: "60%" }]} />
                </View>
                <Text style={styles.progressLabel}>60%</Text>
              </View>
              <Text style={styles.onboardingDesc}>
                You&apos;re on the Path to become a Wellness Champion
              </Text>
            </View>
            <Pressable style={styles.nextChip} testID="onboarding-next">
              <Text style={styles.nextChipText}>Next</Text>
              <Ionicons name="chevron-forward" size={14} color="#0F2C5A" />
            </Pressable>
          </View>

          {/* Coach message */}
          <View style={styles.coachRow}>
            <View style={styles.coachAvatar}>
              <Text style={styles.coachEmoji}>🐱</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.coachTitle}>Your Life Coach&apos;s message</Text>
              <Text style={styles.coachMsg}>
                Small steps every day. Stay hydrated & keep moving!
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.grid} testID="quick-actions">
          {quickActions.map((a, i) => (
            <Pressable
              key={a.label}
              style={styles.gridItem}
              testID={`quick-action-${i}`}
              onPress={() => router.push("/reminder")}
            >
              <View style={[styles.iconCircle, { backgroundColor: a.bg }]}>
                {a.icon}
              </View>
              <Text style={styles.gridLabel} numberOfLines={2}>
                {a.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Get a Reminder button */}
        <Pressable
          style={styles.reminderBtn}
          onPress={() => router.push("/reminder")}
          testID="get-reminder-button"
        >
          <Ionicons name="notifications" size={18} color="#FFF" />
          <Text style={styles.reminderBtnText}>Get a Reminder</Text>
        </Pressable>

        {/* Champion of the Month */}
        <View style={styles.championCard} testID="champion-card">
          <Text style={styles.championTitle}>
            Wanna become Champion of the Month?
          </Text>
          <Text style={styles.championScore}>
            Your current Monthly score is <Text style={{ color: COLORS.green }}>732</Text>
          </Text>
          <Text style={styles.championSub}>
            You are 10 positions away to becoming the Monthly Champion.
          </Text>
        </View>

        {/* Today's Milestones */}
        <Text style={styles.sectionTitle}>Today&apos;s Milestones</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingHorizontal: 4 }}
          testID="milestones-scroll"
        >
          {milestones.map((m) => (
            <View key={m.uri} style={styles.milestoneCard}>
              <Image source={{ uri: m.uri }} style={styles.milestoneImg} />
              <Text style={styles.milestoneLabel}>{m.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Personalized Path */}
        <View style={styles.pathCard} testID="path-card">
          <Text style={styles.pathTitle}>A Personalized Path to Better Health</Text>
          <Text style={styles.pathDesc}>
            Experience one-on-one personalized consultation to co-create your
            diet, habits and goals with your Wellness Coach.
          </Text>
          <Pressable>
            <Text style={styles.pathLink}>
              Where have I met my Wellness Coach?
            </Text>
          </Pressable>
          <Pressable style={styles.orangeBtn} testID="book-counselling-button">
            <Text style={styles.orangeBtnText}>Book a Counselling Session</Text>
          </Pressable>
        </View>

        {/* Join Community */}
        <View style={styles.communityCard} testID="community-card">
          <Text style={styles.communityTitle}>
            Join India&apos;s Growing Wellness Community
          </Text>
          <Pressable style={styles.communityBtn} testID="join-community-button">
            <FontAwesome5 name="whatsapp" size={18} color="#FFF" />
            <Text style={styles.communityBtnText}>ITW Community</Text>
          </Pressable>
        </View>

        {/* Share Vitality */}
        <View style={styles.shareCard} testID="share-card">
          <Feather name="gift" size={22} color="#FFF" style={{ marginBottom: 8 }} />
          <Text style={styles.shareTitle}>Share the Vitality</Text>
          <Text style={styles.shareDesc}>
            Refer a family member or friend and get a wellness gift card.
          </Text>
          <Pressable style={styles.communityBtn} testID="refer-whatsapp-button">
            <FontAwesome5 name="whatsapp" size={18} color="#FFF" />
            <Text style={styles.communityBtnText}>Refer on WhatsApp</Text>
          </Pressable>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav} testID="bottom-nav">
        <NavItem icon="home" label="Home" active />
        <NavItem icon="crown" label="Champion" material color={COLORS.orange} />
        <NavItem icon="chatbubbles-outline" label="Chat" />
        <NavItem icon="person-outline" label="Profile" />
      </View>
    </View>
  );
}

function NavItem({
  icon,
  label,
  active,
  material,
  color,
}: {
  icon: string;
  label: string;
  active?: boolean;
  material?: boolean;
  color?: string;
}) {
  const tint = active ? COLORS.navy : color ?? "#9AA3B2";
  return (
    <Pressable style={styles.navItem} testID={`nav-${label.toLowerCase()}`}>
      {material ? (
        <MaterialCommunityIcons name={icon as any} size={22} color={tint} />
      ) : (
        <Ionicons name={icon as any} size={22} color={tint} />
      )}
      <Text style={[styles.navLabel, { color: tint }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  headerBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 220,
  },
  safeTop: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 8 : 4,
    paddingBottom: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  avatarWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "#FFF",
    overflow: "hidden",
  },
  avatar: { width: "100%", height: "100%" },
  hiUser: { color: "#FFF", fontSize: 12, opacity: 0.9 },
  userName: { color: "#FFF", fontSize: 15, fontWeight: "700" },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },

  onboardingCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    marginTop: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  onboardingRow: { flexDirection: "row", alignItems: "center" },
  onboardingTitle: { color: COLORS.navy, fontWeight: "700", fontSize: 15 },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  progressLabel: { color: COLORS.subText, fontSize: 11, fontWeight: "600" },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#EEF0F4",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: COLORS.green, borderRadius: 3 },
  onboardingDesc: {
    color: COLORS.subText,
    fontSize: 11,
    marginTop: 6,
  },
  nextChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F0F3F8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    marginLeft: 8,
  },
  nextChipText: { color: COLORS.navy, fontWeight: "600", fontSize: 12 },
  coachRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  coachAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.yellow,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  coachEmoji: { fontSize: 24 },
  coachTitle: { color: COLORS.navy, fontWeight: "700", fontSize: 13 },
  coachMsg: { color: COLORS.subText, fontSize: 12, marginTop: 2 },

  sectionTitle: {
    color: COLORS.navy,
    fontWeight: "700",
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  gridItem: {
    width: "31%",
    alignItems: "center",
    marginVertical: 8,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  gridLabel: {
    fontSize: 11,
    color: COLORS.navy,
    textAlign: "center",
    fontWeight: "500",
  },

  reminderBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.green,
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 14,
    shadowColor: COLORS.green,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  reminderBtnText: { color: "#FFF", fontWeight: "700", fontSize: 14 },

  championCard: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  championTitle: { color: COLORS.navy, fontWeight: "700", fontSize: 16 },
  championScore: {
    color: COLORS.navy,
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
  },
  championSub: { color: COLORS.subText, fontSize: 12, marginTop: 4 },

  milestoneCard: {
    width: 150,
    borderRadius: 16,
    backgroundColor: "#FFF",
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  milestoneImg: {
    width: "100%",
    height: 110,
    borderRadius: 12,
  },
  milestoneLabel: {
    fontSize: 11,
    color: COLORS.navy,
    fontWeight: "600",
    marginTop: 6,
    textAlign: "center",
  },

  pathCard: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pathTitle: { color: COLORS.navy, fontWeight: "700", fontSize: 15 },
  pathDesc: { color: COLORS.subText, fontSize: 12, marginTop: 6, lineHeight: 18 },
  pathLink: {
    color: COLORS.orange,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
  },
  orangeBtn: {
    marginTop: 12,
    backgroundColor: COLORS.orange,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  orangeBtnText: { color: "#FFF", fontWeight: "700", fontSize: 13 },

  communityCard: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  communityTitle: {
    color: COLORS.navy,
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
  },
  communityBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.green,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "stretch",
  },
  communityBtnText: { color: "#FFF", fontWeight: "700", fontSize: 14 },

  shareCard: {
    backgroundColor: COLORS.navyDark,
    borderRadius: 18,
    padding: 16,
    marginTop: 16,
    alignItems: "center",
  },
  shareTitle: { color: "#FFF", fontWeight: "700", fontSize: 15 },
  shareDesc: {
    color: "#C9D1DE",
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 12,
  },

  bottomNav: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  navItem: { flex: 1, alignItems: "center", gap: 2 },
  navLabel: { fontSize: 10, fontWeight: "600" },
});
