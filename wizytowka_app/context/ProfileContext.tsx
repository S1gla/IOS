import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadData, saveData } from '../utils/storage';

export type Profile = {
  firstName: string;
  lastName: string;
  description: string;
  experience: string;
  technologies: string[];
  email: string;
  phone: string;
  avatar: string;
};

const defaultProfile: Profile = {
  firstName: 'Dominik',
  lastName: 'Koziarz',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  experience: '2+ lata doświadczenia',
  technologies: ['React.js', 'Node.js', 'TypeScript', 'JavaScript', 'Python'],
  email: 'mail@mail.com',
  phone: '123 456 789',
  avatar: 'https://thumbs.dreamstime.com/b/random-photo-unfamiliar-dog-very-beautiful-random-photo-unfamiliar-dog-very-beautiful-337696951.jpg',
};

type ProfileContextValue = {
  profile: Profile;
  updateProfile: (profile: Profile) => void;
  resetProfile: () => void;
};

const STORAGE_KEY = 'portfolio_profile';
const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const saved = await loadData<Profile>(STORAGE_KEY);
      if (saved) setProfile(saved);
      setLoaded(true);
    }
    loadProfile();
  }, []);

  useEffect(() => {
    if (loaded) saveData(STORAGE_KEY, profile);
  }, [profile, loaded]);

  function updateProfile(nextProfile: Profile) {
    setProfile(nextProfile);
  }

  function resetProfile() {
    setProfile(defaultProfile);
  }

  return <ProfileContext.Provider value={{ profile, updateProfile, resetProfile }}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile musi być użyty wewnątrz ProfileProvider');
  return context;
}
