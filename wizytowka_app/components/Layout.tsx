import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export const colors = {
  background: '#071021',
  card: '#1c2638',
  card2: '#202a3d',
  text: '#f4f6ff',
  muted: '#c7ccdc',
  accent: '#6fd1ff',
  input: '#343a50',
};

export function Screen({ children, scroll = true }: { children: React.ReactNode; scroll?: boolean }) {
  const content = <View style={styles.inner}>{children}</View>;
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {scroll ? <ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView> : content}
    </SafeAreaView>
  );
}

export function HeaderIcons() {
  return <View style={styles.headerSpacer} />;
}

export function BigTitle({ children, compact = false }: { children: React.ReactNode; compact?: boolean }) {
  return <Text style={[styles.bigTitle, compact && styles.compactTitle]}>{children}</Text>;
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return <Text style={styles.paragraph}>{children}</Text>;
}

export function PillButton({ icon, label, href }: { icon: keyof typeof Ionicons.glyphMap; label: string; href: string }) {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.pill} onPress={() => router.push(href as never)}>
      <Ionicons name={icon} size={22} color={colors.text} />
      <Text style={styles.pillText}>{label}</Text>
    </TouchableOpacity>
  );
}

export const commonStyles = styles;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inner: {
    paddingHorizontal: 28,
    paddingTop: 22,
    paddingBottom: 150,
  },
  headerSpacer: {
    height: 26,
    marginBottom: 46,
  },
  bigTitle: {
    color: colors.text,
    fontSize: 48,
    lineHeight: 54,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 22,
  },
  compactTitle: {
    fontSize: 42,
    lineHeight: 48,
  },
  paragraph: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 32,
    marginBottom: 36,
  },
  pill: {
    height: 64,
    borderRadius: 34,
    backgroundColor: colors.card2,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  pillText: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 18,
  },
});
