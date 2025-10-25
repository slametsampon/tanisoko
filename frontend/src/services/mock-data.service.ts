// frontend/src/services/mock-data.service.ts

/**
 * Generic function to fetch mock JSON data from ./assets/mock/
 * @param filename - Name of the mock file, e.g. "event.json"
 * @returns Parsed JSON as type T
 */
export async function fetchMockData<T>(filename: string): Promise<T> {
  const path = `./assets/mocks/${filename}`;
  console.log(`📥 [fetchMockData] Fetching mock data: ${path}`);

  try {
    const res = await fetch(path);
    console.log(`[fetchMockData] Response status: ${res.status}`);

    if (!res.ok) {
      throw new Error(
        `❌ Gagal fetch mock data: ${path} → ${res.status} ${res.statusText}`
      );
    }

    const contentType = res.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await res.text();
      console.warn(`⚠️ Bukan response JSON:\n${text.substring(0, 100)}...`);
      throw new Error(`Respon bukan JSON: ${path}`);
    }

    const data = await res.json();
    console.log(`✅ [fetchMockData] Sukses load ${filename}:`, data);
    return data;
  } catch (err) {
    console.error(`❌ [fetchMockData] Gagal memuat file ${filename}:`, err);
    throw err;
  }
}
