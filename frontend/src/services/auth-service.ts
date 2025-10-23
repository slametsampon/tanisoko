// frontend/src/services/auth-service.ts

import { fetchUserByUsername, createUser } from 'src/services/user.service';
import { isMockMode } from 'src/services/mode';
import { API_BASE } from 'src/config/api-base';
import {
  ROLE_PERMS,
  roleGte,
  type Role,
  type Perm,
} from 'src/components/roles';

export type AuthUser = {
  username: string;
  avatarUrl?: string;
  token: string;
  role?: Role;
};

export class AuthService {
  private static KEY = 'auth_token_v1';
  private static USER = 'auth_user_v1';

  /**
   * Login user → mock mode pakai UserRepository,
   * live mode pakai API /api/auth/login
   */
  static async login(username: string, password: string): Promise<AuthUser> {
    if (isMockMode()) {
      const user = await fetchUserByUsername(username);

      if (!user || user.passwordHash !== password) {
        throw new Error('Login gagal (MOCK): username/password salah.');
      }

      const token = `mock-${user.username}-${Date.now()}`;
      const role = (user.role ?? 'guest').toLowerCase() as Role;

      const authUser: AuthUser = {
        username: user.username,
        avatarUrl: user.avatarUrl ?? '',
        role,
        token,
      };

      localStorage.setItem(this.KEY, token);
      localStorage.setItem(this.USER, JSON.stringify(authUser));
      window.dispatchEvent(new Event('auth:changed'));
      return authUser;
    }

    // --- LIVE mode: call backend API ---
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      let msg = 'Login gagal. Periksa kredensial Anda.';
      try {
        const j = await res.json();
        if (j?.message) msg = j.message;
      } catch {}
      throw new Error(msg);
    }

    const data = (await res.json()) as {
      username: string;
      avatarUrl?: string;
      role?: Role;
    };

    const token = `session-${data.username}-${Date.now()}`;
    const role = (data.role ?? 'guest') as Role;

    const authUser: AuthUser = {
      username: data.username,
      avatarUrl: data.avatarUrl ?? '',
      role,
      token,
    };

    localStorage.setItem(this.KEY, token);
    localStorage.setItem(
      this.USER,
      JSON.stringify({
        username: authUser.username,
        avatarUrl: authUser.avatarUrl,
        role: authUser.role,
      })
    );

    window.dispatchEvent(new Event('auth:changed'));
    return authUser;
  }

  /**
   * Registrasi user baru → konsisten lewat UserService
   */
  static async register(user: {
    username: string;
    password: string;
    role?: Role;
    avatarUrl?: string;
  }) {
    await createUser({
      username: user.username,
      password: user.password,
      role: user.role ?? 'guest',
      avatarUrl: user.avatarUrl,
    });
  }

  static logout() {
    localStorage.removeItem(this.KEY);
    localStorage.removeItem(this.USER);
    window.dispatchEvent(new Event('auth:changed'));
  }

  static getToken(): string | null {
    return localStorage.getItem(this.KEY);
  }

  static getUser(): {
    username: string;
    avatarUrl: string;
    role?: Role;
  } | null {
    const raw = localStorage.getItem(this.USER);
    if (!raw) return null;
    try {
      const j = JSON.parse(raw);
      const role = j.role ? (String(j.role).toLowerCase() as Role) : undefined;
      return {
        username: j.username ?? 'Guest',
        avatarUrl: j.avatarUrl ?? '',
        role,
      };
    } catch {
      return null;
    }
  }

  static getUserWithToken(): AuthUser | null {
    const user = this.getUser();
    const token = this.getToken();
    return user && token ? { ...user, token } : null;
  }

  static isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // === RBAC helpers ===
  static hasRole(role: Role): boolean {
    const u = this.getUser();
    return !!u?.role && u.role === role;
  }

  static hasRoleAtLeast(minRole: Role): boolean {
    const u = this.getUser();
    if (!u?.role) return false;
    return roleGte(u.role, minRole);
  }

  static can(perm: Perm): boolean {
    const u = this.getUser();
    if (!u?.role) return false;
    if (u.role === 'admin') return true;
    return ROLE_PERMS[u.role].includes(perm);
  }
}
