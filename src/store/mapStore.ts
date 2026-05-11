import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MapBounds } from '../types';

export type MapKind = 'aerial' | 'outdoor' | 'osm';

// Filtr datových zdrojů — která sada linií se zobrazí
export type SourceFilter = 'all' | 'csv' | 'slackmap';

const KIND_KEY = 'slackline_map_kind';
const SOURCE_KEY = 'slackline_source_filter';

interface MapState {
  bounds: MapBounds | null;
  center: { lat: number; lon: number };
  zoom: number;
  kind: MapKind;
  sourceFilter: SourceFilter;
  setBounds: (b: MapBounds | null) => void;
  setCenter: (lat: number, lon: number) => void;
  setZoom: (z: number) => void;
  setKind: (k: MapKind) => void;
  setSourceFilter: (s: SourceFilter) => void;
  hydrate: () => Promise<void>;
}

export const useMapStore = create<MapState>((set) => ({
  bounds: null,
  center: { lat: 49.8, lon: 15.5 },
  zoom: 7,
  kind: 'aerial',
  sourceFilter: 'all',
  setBounds: (bounds) => set({ bounds }),
  setCenter: (lat, lon) => set({ center: { lat, lon } }),
  setZoom: (zoom) => set({ zoom }),
  setKind: (kind) => {
    set({ kind });
    AsyncStorage.setItem(KIND_KEY, kind).catch(() => {});
  },
  setSourceFilter: (sourceFilter) => {
    set({ sourceFilter });
    AsyncStorage.setItem(SOURCE_KEY, sourceFilter).catch(() => {});
  },
  hydrate: async () => {
    try {
      const k = await AsyncStorage.getItem(KIND_KEY);
      if (k === 'aerial' || k === 'outdoor' || k === 'osm') set({ kind: k });
    } catch {}
    try {
      const s = await AsyncStorage.getItem(SOURCE_KEY);
      if (s === 'all' || s === 'csv' || s === 'slackmap') set({ sourceFilter: s });
    } catch {}
  },
}));
