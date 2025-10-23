// frontend/src/components/roles.ts

// Urutan hierarki (rendah → tinggi)
export const ROLE_ORDER = ['guest', 'operator', 'engineer', 'admin'] as const;
export type Role = (typeof ROLE_ORDER)[number];

// Permission granular
export const PERMS = {
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_HISTORY: 'view_history',
  OPERATE_EQUIPMENT: 'operate_equipment', // nyalakan/matikan peralatan
  CONFIGURE: 'configure', // akses halaman konfigurasi
  MANAGE_DEVICES: 'manage_devices', // tambah/hapus device/sensor
} as const;
export type Perm = (typeof PERMS)[keyof typeof PERMS];

// Mapping role → permission
export const ROLE_PERMS: Record<Role, Perm[]> = {
  guest: [PERMS.VIEW_DASHBOARD],
  operator: [PERMS.VIEW_DASHBOARD, PERMS.VIEW_HISTORY, PERMS.OPERATE_EQUIPMENT],
  engineer: [
    PERMS.VIEW_DASHBOARD,
    PERMS.VIEW_HISTORY,
    PERMS.OPERATE_EQUIPMENT,
    PERMS.CONFIGURE,
    PERMS.MANAGE_DEVICES,
  ],
  admin: Object.values(PERMS), // semua
};

// helper bandingkan level
export function roleGte(a: Role, b: Role) {
  return ROLE_ORDER.indexOf(a) >= ROLE_ORDER.indexOf(b);
}
