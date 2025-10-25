// models/user.model.ts
import { z } from 'zod';

// 🎯 Enum untuk peran pengguna
export const UserRoleEnum = z.enum(['admin', 'engineer', 'operator', 'guest']);
export type UserRole = z.infer<typeof UserRoleEnum>;

// 🎯 Validasi input saat registrasi/update
export const UserInputSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6).optional(),
  role: UserRoleEnum,
  avatarUrl: z.string().url().nullable().optional(),
});

export type UserBase = z.infer<typeof UserInputSchema>;

// 🎯 Validasi data yang tersimpan di DB
export const UserRecordSchema = z.object({
  username: z.string(),
  passwordHash: z.string(),
  role: UserRoleEnum,
  avatarUrl: z.string().nullable().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type UserRecord = z.infer<typeof UserRecordSchema>;

// 🎯 Validasi untuk form login
export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginInput = z.infer<typeof LoginSchema>;

// user.model.ts
export const UserSchema = UserInputSchema;
export type User = z.infer<typeof UserSchema>;
