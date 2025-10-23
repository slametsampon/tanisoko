export type UserRole = 'admin' | 'engineer' | 'operator' | 'guest';

export interface UserBase {
  username: string;
  password?: string; // plaintext saat input (opsional saat update)
  role: UserRole;
  avatarUrl?: string | null;
}

export interface UserRecord {
  username: string;
  passwordHash: string; // yang tersimpan di DB
  role: UserRole;
  avatarUrl?: string | null;
  createdAt: number;
  updatedAt: number;
}
