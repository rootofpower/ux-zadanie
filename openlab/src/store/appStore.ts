import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language, languages, defaultLanguage } from '../constants/languages';
import { AppMode } from '../types';

interface AppState {
  language: Language;
  mode: AppMode;
  hasCompletedOnboarding: boolean;
  
  setLanguage: (language: Language) => void;
  setMode: (mode: AppMode) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: defaultLanguage,
      mode: 'voice',
      hasCompletedOnboarding: false,
      
      setLanguage: (language) => set({ language }),
      setMode: (mode) => set({ mode }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      resetOnboarding: () => set({ hasCompletedOnboarding: false }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
