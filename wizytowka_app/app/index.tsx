import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { BigTitle, HeaderIcons, Paragraph, PillButton, Screen, colors } from '../components/Layout';
import { useProfile } from '../context/ProfileContext';

export default function HomeScreen() {
  const { profile } = useProfile();
  return (
    <Screen>
      <HeaderIcons />
      <View style={styles.avatarWrap}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
      </View>
      <BigTitle compact>{profile.firstName} {profile.lastName}</BigTitle>
      <Paragraph>{profile.description}</Paragraph>
      <View style={styles.buttons}>
        <PillButton icon="grid-outline" label="Projekty" href="/projects" />
        <PillButton icon="person-outline" label="O mnie" href="/about" />
        <PillButton icon="mail-outline" label="Kontakt" href="/contact" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.card,
    borderWidth: 3,
    borderColor: colors.accent,
  },
  buttons: {
    marginTop: 40,
  },
});
