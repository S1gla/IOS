import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BigTitle, HeaderIcons, Paragraph, PillButton, Screen } from '../components/Layout';
import { useProfile } from '../context/ProfileContext';

export default function HomeScreen() {
  const { profile } = useProfile();
  return (
    <Screen>
      <HeaderIcons />
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
  buttons: {
    marginTop: 60,
  },
});
