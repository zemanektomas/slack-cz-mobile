import { create } from 'zustand';

interface SyncState {
  lastSyncAt: string | null;
  syncing: boolean;
  error: string | null;
  setLastSyncAt: (iso: string) => void;
  setSyncing: (v: boolean) => void;
  setError: (e: string | null) => void;
}

export const useSyncStore = create<SyncState>((set) => ({
  lastSyncAt: null,
  syncing: false,
  error: null,
  setLastSyncAt: (iso) => set({ lastSyncAt: iso }),
  setSyncing: (syncing) => set({ syncing }),
  setError: (error) => set({ error }),
}));
