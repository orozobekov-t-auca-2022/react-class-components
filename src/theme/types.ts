export interface IThemeContext {
  theme: string;
  toggleTheme: () => void;
}

export type Theme = 'light' | 'dark';
