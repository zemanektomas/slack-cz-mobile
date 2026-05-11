// Theme tokens — light a dark varianty.
// useTheme() vrací aktivní paletu podle nastavení telefonu.
// app.json má userInterfaceStyle: "automatic" — RN poslouchá systém.

import { useColorScheme } from 'react-native';

export interface Theme {
  bg: string;          // hlavní pozadí obrazovky
  surface: string;     // pozadí karet, listů, header baru
  surfaceAlt: string;  // pozadí sort baru, řádků pod hover
  border: string;      // tenké oddělovače
  text: string;        // primary text
  textMuted: string;   // sekundární text, meta info
  textDim: string;     // labelky, "uppercase" hinty
  accent: string;      // markery na mapě, aktivní stav
  danger: string;      // restriction, error stav
  dangerBg: string;
  mapStyle: 'light' | 'dark';
}

const light: Theme = {
  bg: '#f3f4f6',
  surface: '#ffffff',
  surfaceAlt: '#f9fafb',
  border: '#e5e7eb',
  text: '#111827',
  textMuted: '#6b7280',
  textDim: '#9ca3af',
  accent: '#2563eb',
  danger: '#b91c1c',
  dangerBg: '#fee2e2',
  mapStyle: 'light',
};

const dark: Theme = {
  bg: '#0b0f17',
  surface: '#111827',
  surfaceAlt: '#1f2937',
  border: '#1f2937',
  text: '#f3f4f6',
  textMuted: '#9ca3af',
  textDim: '#6b7280',
  accent: '#60a5fa',
  danger: '#fca5a5',
  dangerBg: '#3f1d1d',
  mapStyle: 'dark',
};

export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? dark : light;
}
