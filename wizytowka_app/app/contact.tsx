import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BigTitle, HeaderIcons, Paragraph, Screen, colors } from '../components/Layout';
import { useProfile } from '../context/ProfileContext';

export default function ContactScreen() {
  const { profile } = useProfile();
  const [name, setName] = useState('Jan');
  const [email, setEmail] = useState('jan@mail.pl');
  const [message, setMessage] = useState('Wiadomość....');

  function sendMessage() {
    if (name.trim().length < 2) {
      Alert.alert('Błąd', 'Podaj imię.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Błąd', 'Podaj poprawny adres e-mail.');
      return;
    }
    if (message.trim().length < 5) {
      Alert.alert('Błąd', 'Wiadomość jest za krótka.');
      return;
    }
    Alert.alert('Wysłano', 'Wiadomość została przygotowana do wysłania.');
  }

  return (
    <Screen>
      <HeaderIcons />
      <BigTitle>Kontakt</BigTitle>
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Paragraph>

      <View style={styles.formCard}>
        <Text style={styles.label}>IMIĘ</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholderTextColor={colors.muted} />
        <Text style={styles.label}>EMAIL</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor={colors.muted} />
        <Text style={styles.label}>WIADOMOŚĆ</Text>
        <TextInput style={[styles.input, styles.textArea]} value={message} onChangeText={setMessage} multiline placeholderTextColor={colors.muted} />
        <TouchableOpacity activeOpacity={0.85} style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Wyślij wiadomość</Text>
        </TouchableOpacity>
      </View>

      <InfoCard icon="mail-outline" label="EMAIL" value={profile.email} />
      <InfoCard icon="call-outline" label="TELEFON" value={profile.phone} />
    </Screen>
  );
}

function InfoCard({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.infoCard}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={28} color={colors.accent} />
      </View>
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 22,
    marginBottom: 30,
  },
  label: {
    color: colors.text,
    fontSize: 11,
    letterSpacing: 4,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: '#4f566c',
    borderRadius: 7,
    color: colors.text,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  sendButton: {
    marginTop: 8,
    backgroundColor: colors.accent,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  sendText: {
    color: '#071021',
    fontSize: 18,
    fontWeight: '900',
  },
  infoCard: {
    backgroundColor: colors.card2,
    borderRadius: 10,
    padding: 18,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
  },
  iconCircle: {
    width: 64,
    height: 40,
    borderRadius: 22,
    backgroundColor: '#03202c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: {
    color: colors.text,
    fontSize: 11,
    letterSpacing: 5,
  },
  infoValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 6,
  },
});
