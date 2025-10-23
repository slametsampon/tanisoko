// frontend/src/context/user-context.ts

import { createContext } from '@lit/context';
import type { AuthUser } from '../services/auth-service';

/**
 * Context global untuk menyimpan user yang sedang login.
 * Dapat diakses di seluruh komponen dengan @consume({ context: userContext })
 */
export const userContext = createContext<AuthUser | null>('user-context');
