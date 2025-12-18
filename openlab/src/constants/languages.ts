export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const languages: Language[] = [
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
];

export const defaultLanguage = languages.find(l => l.code === 'en')!;
