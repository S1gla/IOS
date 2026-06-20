import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { BigTitle, HeaderIcons, Paragraph, Screen, colors } from '../../components/Layout';
import { useProjects } from '../../context/ProjectsContext';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop';

export default function NewProjectScreen() {
  const { addProject } = useProjects();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [technologies, setTechnologies] = useState('React Native, Expo');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [image, setImage] = useState('');

  function saveProject() {
    if (name.trim().length < 3) {
      Alert.alert('Błąd', 'Nazwa projektu musi mieć co najmniej 3 znaki.');
      return;
    }
    if (description.trim().length < 10) {
      Alert.alert('Błąd', 'Krótki opis musi mieć co najmniej 10 znaków.');
      return;
    }
    if (longDescription.trim().length < 20) {
      Alert.alert('Błąd', 'Dłuższy opis musi mieć co najmniej 20 znaków.');
      return;
    }

    const parsedYear = Number(year);
    if (Number.isNaN(parsedYear) || parsedYear < 2000 || parsedYear > 2100) {
      Alert.alert('Błąd', 'Podaj poprawny rok realizacji.');
      return;
    }

    addProject({
      name: name.trim(),
      description: description.trim(),
      longDescription: longDescription.trim(),
      image: image.trim() || DEFAULT_IMAGE,
      technologies: technologies
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      year: parsedYear,
    });

    Alert.alert('Dodano', 'Projekt został zapisany lokalnie.');
    router.replace('/projects');
  }

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <HeaderIcons />
        <BigTitle compact>Dodaj projekt</BigTitle>
        <Paragraph>Uzupełnij formularz. Projekt zostanie zapisany lokalnie w AsyncStorage.</Paragraph>

        <Text style={styles.label}>NAZWA PROJEKTU</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Np. Portfolio mobilne" placeholderTextColor={colors.muted} />

        <Text style={styles.label}>KRÓTKI OPIS</Text>
        <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Opis widoczny na liście" placeholderTextColor={colors.muted} />

        <Text style={styles.label}>DŁUŻSZY OPIS</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={longDescription}
          onChangeText={setLongDescription}
          placeholder="Opis widoczny w szczegółach projektu"
          placeholderTextColor={colors.muted}
          multiline
        />

        <Text style={styles.label}>TECHNOLOGIE, PO PRZECINKU</Text>
        <TextInput style={styles.input} value={technologies} onChangeText={setTechnologies} placeholder="React Native, Expo" placeholderTextColor={colors.muted} />

        <Text style={styles.label}>ROK</Text>
        <TextInput style={styles.input} value={year} onChangeText={setYear} keyboardType="number-pad" placeholder="2025" placeholderTextColor={colors.muted} />

        <Text style={styles.label}>LINK DO OBRAZU OPCJONALNIE</Text>
        <TextInput style={styles.input} value={image} onChangeText={setImage} autoCapitalize="none" placeholder="https://..." placeholderTextColor={colors.muted} />

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Anuluj</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveProject}>
            <Text style={styles.saveText}>Zapisz</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.text,
    fontSize: 11,
    letterSpacing: 3,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: '#4f566c',
    borderRadius: 8,
    color: colors.text,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
  },
  button: {
    flex: 1,
    borderRadius: 28,
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.card2,
  },
  saveButton: {
    backgroundColor: colors.accent,
  },
  cancelText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  saveText: {
    color: '#071021',
    fontSize: 16,
    fontWeight: '900',
  },
});
