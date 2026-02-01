# 📘 One-Stop Developer Reference: HMI IoT Frontend

reference : ChatGpt => TaniSoko : konfigurasi_hmi

> Panduan lengkap dan ringkas untuk pengembangan sistem antarmuka konfigurasi IoT berbasis **LitElement**, **Tailwind CSS**, dan **TypeScript** dengan arsitektur _component-driven_ dan _schema-driven_.

---

## 🧱 Struktur Folder (Terbaru)

```bash
frontend/
├── src/
│   ├── components/                    # UI komponen reusable
│   │   ├── DynamicForm.ts             # Form universal dinamis
│   │   ├── DynamicTable.ts            # Tabel universal dengan aksi
│   │   └── konfigurasi/               # Komponen khusus HMI konfigurasi
│   │       ├── sidebar-model-menu.ts
│   │       ├── dynamic-main-content.ts
│   │       └── model-page.ts
│   ├── pages/
│   │   └── konfigurasi_hmi.ts         # Entry page konfigurasi
│   ├── config/
│   │   └── model-definitions.ts       # Metadata definisi model
│   ├── services/
│   │   ├── getService.ts              # Factory service handler
│   │   └── service-map.ts             # Peta model ↔ handler
├── styles/
│   └── tailwind.css
├── tailwind.config.js
├── tsconfig.json
```

---

## 🧩 Menambahkan Model/Entitas Baru

### 1. Tambah definisi di `config/model-definitions.ts`

```ts
modelDefinitions.pompa_air = {
  label: 'Pompa Air',
  fields: [
    { key: 'name', label: 'Nama Pompa' },
    { key: 'power_rating', label: 'Daya (Watt)' },
  ],
  displayFields: ['name', 'power_rating'],
  schema: z.object({
    name: z.string().min(1),
    power_rating: z.number().positive(),
  }),
};
```

### 2. Tambahkan service handler ke `service-map.ts`

```ts
import { PompaAirService } from './pompa-air-service';
export const serviceMap = {
  pompa_air: new PompaAirService(),
  ...
};
```

### 3. Buat handler service baru

```ts
export class PompaAirService {
  async getAll() { ... }
  async create(data) { ... }
  async update(id, data) { ... }
  async delete(id) { ... }
}
```

> Tidak perlu menyentuh UI – akan otomatis muncul di sidebar dan halaman konfigurasi.

---

## 📋 DynamicForm Behavior

- Props:
  - `.model`: nama model untuk ambil definisi
  - `.initialData`: data default saat edit

- Submit:
  - Jika `formData.id` ada → `update()`
  - Jika tidak ada → `create()`

- Tombol `Create/Update` otomatis tergantung `formData.id`

---

## 📋 DynamicTable Behavior

- Props:
  - `.model`, `.items`, `.columns`
- Emit event:
  - `@edit`: emit item ke parent
  - `@delete`: emit item untuk dihapus

---

## 🔁 Alur Edit (Tombol ✏️)

1. Klik `✏️` pada tabel → emit `edit` event
2. `model-page.ts` menangani event:
   ```ts
   this.selectedItem = e.detail;
   ```
3. Dikirim ke `<dynamic-form>` sebagai `.initialData`
4. Di `updated()`, isi `formData` disalin dari `initialData`
5. Jika `formData.id` tersedia → tombol jadi **"Update"**

```ts
if (this.initialData?.id) {
  cleanData.id = this.initialData.id;
}
```

---

## 🎨 Styling dan Dark Mode

- `tailwind.config.js`

  ```js
  darkMode: 'class';
  ```

- Contoh input field:

  ```html
  <input class="bg-white dark:bg-gray-800 dark:text-white" />
  ```

- Untuk tombol:
  ```html
  <button class="bg-green-600 hover:bg-green-700 text-white">Update</button>
  ```

---

## 🧪 Tips Debug

- Log saat prop berubah:
  ```ts
  console.log('[DynamicForm] updated', this.initialData);
  ```
- Pastikan `formData.id` ada:
  ```ts
  console.log('formData.id =', this.formData.id);
  ```

---

## ✅ Checklist Developer

| Tugas                                   | Status |
| --------------------------------------- | ------ |
| Tambahkan definisi di model-definitions | ✅     |
| Tambahkan handler di service-map        | ✅     |
| Buat handler CRUD baru                  | ✅     |
| Tombol Update saat Edit berfungsi       | ✅     |
| Styling tetap konsisten dark/light      | ✅     |

---

## 🧠 Best Practice

- Gunakan prop `.key=${item.id}` pada `dynamic-form` jika edit tidak merender ulang.
- Gunakan `dark:` class untuk semua input agar nyaman dalam dark mode.
- Jangan ubah logic `DynamicForm` dan `DynamicTable` sembarangan – cukup konfigurasi via `model-definitions`.
- Untuk fitur lanjutan (e.g. cancel edit, auto save), buat fitur baru di `model-page.ts`, bukan di komponen dasar.

---

## 📎 Kontak Tim Teknis

Jika ada pertanyaan, eskalasi, atau ingin menambah fitur, hubungi:

- Lead Dev: `@your-name-here`
- Repo GitHub: `https://github.com/your-org/your-repo`
- Dokumentasi internal (Confluence / Wiki / Notion)

---

Selamat membangun sistem HMI yang scalable, modular, dan nyaman digunakan 🚀
