import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthStatus } from '../types';

interface AuthState {
  user: User | null;
  status: AuthStatus;
  isGuest: boolean;
  setUser: (user: User | null) => void;
  setStatus: (status: AuthStatus) => void;
  signIn: (email: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signInAsGuest: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      status: 'unauthenticated',
      isGuest: false,
      
      setUser: (user) => set({ user }),
      setStatus: (status) => set({ status }),
      
      signIn: async (email: string, _password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user: User = {
          id: '1',
          email,
          name: 'User',
        };
        
        set({ user, status: 'authenticated', isGuest: false });
        return true;
      },
      
      signInWithGoogle: async () => {
        // Simulate Google OAuth
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user: User = {
          id: '2',
          email: 'user@gmail.com',
          name: 'Google User',
        };
        
        set({ user, status: 'authenticated', isGuest: false });
        return true;
      },
      
      signInAsGuest: () => {
        const user: User = {
          id: 'guest',
          email: 'guest@openlab.app',
          name: 'Guest',
        };
        
        set({ user, status: 'authenticated', isGuest: true });
      },
      
      signOut: () => {
        set({ user: null, status: 'unauthenticated', isGuest: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user, isGuest: state.isGuest }),
    }
  )
);
