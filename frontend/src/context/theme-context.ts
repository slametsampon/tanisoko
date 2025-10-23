// frontend/src/context/theme-context.ts
import { createContext } from '@lit/context';

export type Theme = 'light' | 'dark';

export const themeContext = createContext<Theme>(Symbol('theme'));
