export const colors = {
  // Background
  background: '#121212',
  surface: '#1E1E1E',
  surfaceAlt: '#1F1F1F',
  black: '#000000',
  
  // Primary (Pink gradient)
  primary: '#FF0099',
  primaryLight: '#FD3DB5',
  
  // Accent
  accent: '#0082FC',
  accentDark: '#003363',
  danger: '#FF004D',
  
  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#E1E1E1',
  textMuted: '#9CA3AF',
  textPlaceholder: '#ADAEBC',
  textDark: '#6B7280',
  
  // Border
  border: '#374151',
  borderLight: '#4B5563',
  
  // Transparent
  transparent: 'transparent',
} as const;

export type ColorName = keyof typeof colors;
