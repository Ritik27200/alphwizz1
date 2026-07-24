import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function HamburgerIcon({ size = 24, color = '#E67E22' }: { size?: number; color?: string }) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'space-around', paddingVertical: 2 }}>
      <View style={{ height: 3, backgroundColor: color, borderRadius: 2 }} />
      <View style={{ height: 3, backgroundColor: color, borderRadius: 2, width: '80%' }} />
      <View style={{ height: 3, backgroundColor: color, borderRadius: 2, width: '60%' }} />
    </View>
  );
}

export function BellIcon({ size = 22, color = '#333' }: { size?: number; color?: string }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size - 4 }}>🔔</Text>
    </View>
  );
}

export function HealUploadIcon() {
  return <Text style={{ fontSize: 24 }}>🍽️</Text>;
}

export function WaterIcon() {
  return <Text style={{ fontSize: 24 }}>💧</Text>;
}

export function StepsIcon() {
  return <Text style={{ fontSize: 24 }}>👣</Text>;
}

export function MeditationIcon() {
  return <Text style={{ fontSize: 24 }}>🧘</Text>;
}

export function ExerciseIcon() {
  return <Text style={{ fontSize: 24 }}>🏋️</Text>;
}

export function NutritionIcon() {
  return <Text style={{ fontSize: 24 }}>💊</Text>;
}

export function WellnessPrescriptionIcon() {
  return <Text style={{ fontSize: 24 }}>📋</Text>;
}

export function ProgressIcon() {
  return <Text style={{ fontSize: 24 }}>📊</Text>;
}

export function DailyReflectionIcon() {
  return <Text style={{ fontSize: 24 }}>📓</Text>;
}

export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <Text style={{ fontSize: size }}>💬</Text>
  );
}

export function GiftIcon() {
  return <Text style={{ fontSize: 24 }}>🎁</Text>;
}

export function BackArrowIcon({ size = 24, color = '#000' }: { size?: number; color?: string }) {
  return (
    <Text style={{ fontSize: size, fontWeight: 'bold', color: color }}>‹</Text>
  );
}

export function CalendarIcon({ size = 20 }: { size?: number }) {
  return <Text style={{ fontSize: size }}>📅</Text>;
}
