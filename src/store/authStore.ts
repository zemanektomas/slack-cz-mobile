import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const JWT_KEY = 'slackline_jwt';

interface User {
  id: string;
  username: string;
  display_name?: string | null;
  avatar_url?: string | null;
  is_admin: boolean;
}

interface AuthState {
  user: User | null;
  jwt: string | null;
  isHydrating: boolean;
  hydrate: () => Promise<void>;
  setSession: (jwt: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  jwt: null,
  isHydrating: true,
  hydrate: async () => {
    const jwt = await SecureStore.getItemAsync(JWT_KEY);
    // TODO: ověřit JWT proti /api/v1/auth/me a načíst user
    set({ jwt, isHydrating: false });
  },
  setSession: async (jwt, user) => {
    await SecureStore.setItemAsync(JWT_KEY, jwt);
    set({ jwt, user });
  },
  logout: async () => {
    await SecureStore.deleteItemAsync(JWT_KEY);
    set({ jwt: null, user: null });
  },
}));
