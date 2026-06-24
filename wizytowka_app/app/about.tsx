import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BigTitle, HeaderIcons, Screen, colors } from '../components/Layout';
import { Profile, useProfile } from '../context/ProfileContext';

export default function AboutScreen() {
  const { profile, updateProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    description: profile.description,
    experience: profile.experience,
    technologies: profile.technologies.join(', '),
    email: profile.email,
    phone: profile.phone,
    avatar: profile.avatar,
  });

  function startEdit() {
    setForm({
      firstName: profile.firstName,
      lastName: profile.lastName,
      description: profile.description,
      experience: profile.experience,
      technologies: profile.technologies.join(', '),
      email: profile.email,
      phone: profile.phone,
      avatar: profile.avatar,
    });
    setEditing(true);
  }

  function saveProfile() {
    if (form.firstName.trim().length < 2 || form.lastName.trim().length < 2) {
      Alert.alert('Błąd', 'Imię i nazwisko muszą mieć co najmniej 2 znaki.');
      return;
    }
    if (form.description.trim().length < 20) {
      Alert.alert('Błąd', 'Opis profilu jest za krótki.');
      return;
    }
    if (!form.email.includes('@')) {
      Alert.alert('Błąd', 'Podaj poprawny adres e-mail.');
      return;
    }

    const nextProfile: Profile = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      description: form.description.trim(),
      experience: form.experience.trim() || '2+ lata doświadczenia',
      technologies: form.technologies
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      email: form.email.trim(),
      phone: form.phone.trim(),
      avatar: form.avatar.trim() || profile.avatar,
    };

    updateProfile(nextProfile);
    setEditing(false);
    Alert.alert('Zapisano', 'Profil został zaktualizowany.');
  }

  if (editing) {
    return (
      <Screen>
        <HeaderIcons />
        <BigTitle compact>Edytuj profil</BigTitle>
        <Text style={styles.formHint}>Zmiany są zapisywane lokalnie w AsyncStorage.</Text>

        <Text style={styles.label}>IMIĘ</Text>
        <TextInput style={styles.input} value={form.firstName} onChangeText={(value) => setForm({ ...form, firstName: value })} />

        <Text style={styles.label}>NAZWISKO</Text>
        <TextInput style={styles.input} value={form.lastName} onChangeText={(value) => setForm({ ...form, lastName: value })} />

        <Text style={styles.label}>OPIS</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={form.description}
          onChangeText={(value) => setForm({ ...form, description: value })}
          multiline
        />

        <Text style={styles.label}>DOŚWIADCZENIE</Text>
        <TextInput style={styles.input} value={form.experience} onChangeText={(value) => setForm({ ...form, experience: value })} />

        <Text style={styles.label}>TECHNOLOGIE, PO PRZECINKU</Text>
        <TextInput style={styles.input} value={form.technologies} onChangeText={(value) => setForm({ ...form, technologies: value })} />

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>TELEFON</Text>
        <TextInput style={styles.input} value={form.phone} onChangeText={(value) => setForm({ ...form, phone: value })} keyboardType="phone-pad" />
        
        <Text style={styles.label}>LINK DO ZDJĘCIA PROFILOWEGO</Text>
        <TextInput
          style={styles.input}
          value={form.avatar}
          onChangeText={(value) => setForm({ ...form, avatar: value })}
          autoCapitalize="none"
          placeholder="https://..."
          placeholderTextColor={colors.muted}
        />
        <TouchableOpacity style={styles.primaryButton} onPress={saveProfile}>
          <Text style={styles.primaryButtonText}>Zapisz profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => setEditing(false)}>
          <Text style={styles.secondaryButtonText}>Anuluj</Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  return (
    <Screen>
      <HeaderIcons />
      <Text style={styles.smallLabel}>Portfolio</Text>
      
      <View style={styles.avatarWrap}>
      <Image source={{ uri: profile.avatar }} style={styles.avatar} />
      </View>
      
      <BigTitle>O Mnie</BigTitle>
      <Text style={styles.paragraph}>{profile.description}</Text>

      <View style={styles.experienceCard}>
        <Text style={styles.experienceText}>{profile.experience}</Text>
        <Text style={styles.medal}>🏅</Text>
      </View>

      <Text style={styles.sectionTitle}>Technologie:</Text>
      <View style={styles.techWrap}>
        {profile.technologies.map((tech) => (
          <View key={tech} style={styles.techPill}>
            <Text style={styles.techText}>{tech.toUpperCase()}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={startEdit}>
        <Text style={styles.primaryButtonText}>Edytuj profil</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  smallLabel: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 16,
  },
  paragraph: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 32,
    marginBottom: 36,
  },
  experienceCard: {
    backgroundColor: colors.card2,
    borderRadius: 10,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 40,
  },
  experienceText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  medal: {
    fontSize: 36,
    marginTop: 8,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 20,
  },
  techWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  techPill: {
    backgroundColor: '#343a50',
    borderRadius: 7,
    paddingHorizontal: 22,
    paddingVertical: 8,
  },
  techText: {
    color: colors.text,
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '700',
  },
  formHint: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 22,
  },
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
    minHeight: 130,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 18,
  },
  primaryButtonText: {
    color: '#071021',
    fontSize: 18,
    fontWeight: '900',
  },
  secondaryButton: {
    backgroundColor: colors.card2,
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.card,
    borderWidth: 3,
    borderColor: colors.accent,
},
});
