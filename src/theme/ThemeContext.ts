import { createContext } from 'react';
import type { IThemeContext } from './types';

export const DEFAULT_THEME = 'light';

export const ThemeContext = createContext<IThemeContext>({
  theme: DEFAULT_THEME,
  toggleTheme: () => {},
});