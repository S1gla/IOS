import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { BigTitle, HeaderIcons, Paragraph, Screen, colors } from '../../components/Layout';
import { useProjects } from '../../context/ProjectsContext';

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { projects, removeProject } = useProjects();
  const project = projects.find((item) => item.id === id);

  function confirmDelete() {
    if (!project) return;
    Alert.alert('Usuń projekt', `Czy na pewno usunąć projekt „${project.name}”?`, [
      { text: 'Anuluj', style: 'cancel' },
      {
        text: 'Usuń',
        style: 'destructive',
        onPress: () => {
          removeProject(project.id);
          router.replace('/projects');
        },
      },
    ]);
  }

  if (!project) {
    return (
      <Screen>
        <HeaderIcons />
        <BigTitle>Brak projektu</BigTitle>
        <Paragraph>Nie znaleziono projektu o podanym identyfikatorze.</Paragraph>
      </Screen>
    );
  }

  return (
    <Screen>
      <HeaderIcons />
      <Image source={{ uri: project.image }} style={styles.image} />
      <BigTitle compact>{project.name}</BigTitle>
      <Paragraph>{project.longDescription}</Paragraph>

      {project.technologies.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Technologie</Text>
          <View style={styles.techWrap}>
            {project.technologies.map((tech) => (
              <View key={tech} style={styles.techPill}>
                <Text style={styles.techText}>{tech.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      <Text style={styles.sectionTitle}>Rok realizacji</Text>
      <Text style={styles.yearText}>{project.year}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Wróć</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
        <Text style={styles.deleteText}>Usuń projekt</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 190,
    borderRadius: 10,
    marginBottom: 28,
    backgroundColor: colors.card,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
    marginTop: 8,
  },
  techWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 28,
  },
  techPill: {
    backgroundColor: '#343a50',
    borderRadius: 7,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  techText: {
    color: colors.text,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '700',
  },
  yearText: {
    color: colors.muted,
    fontSize: 18,
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: colors.accent,
    borderRadius: 26,
    paddingVertical: 14,
    alignItems: 'center',
  },
  backText: {
    color: '#071021',
    fontWeight: '900',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#3b1720',
    borderRadius: 26,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteText: {
    color: '#ff8da1',
    fontWeight: '900',
    fontSize: 16,
  },
});
