import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BigTitle, HeaderIcons, Paragraph, Screen, colors } from '../../components/Layout';
import { useProjects } from '../../context/ProjectsContext';

export default function ProjectsScreen() {
  const { projects } = useProjects();

  return (
    <Screen>
      <HeaderIcons />
      <BigTitle>Wybrane{`\n`}Projekty</BigTitle>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Paragraph>

      <TouchableOpacity activeOpacity={0.85} style={styles.addButton} onPress={() => router.push('/projects/new')}>
        <Ionicons name="add" size={28} color="#071021" />
        <Text style={styles.addButtonText}>Dodaj projekt</Text>
      </TouchableOpacity>

      <View style={styles.list}>
        {projects.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            style={styles.card}
            onPress={() => router.push(`/projects/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardBody}>
              <Text style={styles.projectTitle}>{item.name}</Text>
              <Text style={styles.projectDescription}>{item.description}</Text>
              <View style={styles.moreRow}>
                <Text style={styles.moreText}>ZOBACZ WIĘCEJ</Text>
                <Ionicons name="arrow-forward" size={18} color={colors.text} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addButtonText: {
    color: '#071021',
    fontSize: 18,
    fontWeight: '900',
  },
  list: {
    paddingBottom: 70,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: 26,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 128,
    backgroundColor: '#132139',
  },
  cardBody: {
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 24,
  },
  projectTitle: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 10,
  },
  projectDescription: {
    color: colors.text,
    fontSize: 19,
    lineHeight: 28,
  },
  moreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 34,
    marginTop: 28,
  },
  moreText: {
    color: colors.text,
    fontSize: 11,
    letterSpacing: 4,
    fontWeight: '700',
  },
});
