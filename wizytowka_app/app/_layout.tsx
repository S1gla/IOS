import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { ProjectsProvider } from '../context/ProjectsContext';
import { ProfileProvider } from '../context/ProfileContext';
import { colors } from '../components/Layout';
import { StatusBar } from 'expo-status-bar';

function TabIcon({ name, focused }: { name: keyof typeof Ionicons.glyphMap; focused: boolean }) {
  return (
    <View style={[styles.iconBox, focused && styles.iconBoxActive]}>
      <Ionicons name={name} size={28} color={focused ? '#061225' : '#d7dbea'} />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ProfileProvider>
      <ProjectsProvider>
        <StatusBar style="light" />
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              left: 28,
              right: 28,
              bottom: 18,
              height: 70,
              borderRadius: 38,
              borderTopWidth: 0,
              backgroundColor: colors.card2,
              elevation: 0,
              shadowOpacity: 0,
              paddingTop: 8,
              paddingBottom: 8,
            },
            tabBarItemStyle: {
              height: 54,
            },
          }}
        >
          <Tabs.Screen name="index" options={{ tabBarIcon: ({ focused }) => <TabIcon name="home-outline" focused={focused} /> }} />
          <Tabs.Screen name="projects" options={{ tabBarIcon: ({ focused }) => <TabIcon name="briefcase-outline" focused={focused} /> }} />
          <Tabs.Screen name="contact" options={{ tabBarIcon: ({ focused }) => <TabIcon name="mail-outline" focused={focused} /> }} />
          <Tabs.Screen name="about" options={{ tabBarIcon: ({ focused }) => <TabIcon name="person-outline" focused={focused} /> }} />
        </Tabs>
      </ProjectsProvider>
    </ProfileProvider>
  );
}

const styles = StyleSheet.create({
  iconBox: {
    width: 54,
    height: 42,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxActive: {
    backgroundColor: colors.accent,
  },
});
