// frontend/src/services/mode.ts

export type DeviceMode = 'mock' | 'mqtt' | 'sim';

const KEY = 'device.mode';
const VALID_MODES: DeviceMode[] = ['mock', 'mqtt', 'sim'];
// src/services/mode.ts

const modeCapabilities: Record<string, string[]> = {
  mock: ['mock'],
  mqtt: ['mqtt'],
  sim: ['mock', 'simulator'],
};

export function hasCapability(capability: string): boolean {
  const mode = getMode(); // Ambil dari localStorage, context, atau apapun yang Anda pakai
  return modeCapabilities[mode]?.includes(capability) ?? false;
}

/**
 * Mengambil mode saat ini dari localStorage.
 * Jika tidak tersedia atau invalid, fallback ke 'mock'.
 */
export function getMode(): DeviceMode {
  const raw = localStorage.getItem(KEY);
  return VALID_MODES.includes(raw as DeviceMode) ? (raw as DeviceMode) : 'mock';
}

/**
 * Mengatur mode baru ke localStorage.
 * Hanya menerima nilai yang valid.
 */
export function setMode(mode: DeviceMode): void {
  if (VALID_MODES.includes(mode)) {
    localStorage.setItem(KEY, mode);
  } else {
    console.warn(`[mode] Invalid mode "${mode}", ignoring`);
  }
}

/**
 * Cek apakah mode saat ini adalah 'mock'
 */
export function isMockMode(): boolean {
  return hasCapability('mock');
}

/**
 * Cek apakah mode saat ini adalah 'mqtt'
 */
export function isMqttMode(): boolean {
  return hasCapability('mqtt');
}

/**
 * Cek apakah mode saat ini adalah 'sim'
 */
export function isSimMode(): boolean {
  return getMode() === 'sim';
}
