// frontend/src/components/konfigurasi/dynamic-main-content.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { modelDefinitions } from 'src/config/model-definitions';

type ModelKey = keyof typeof modelDefinitions;

@customElement('dynamic-main-content')
export class DynamicMainContent extends LitElement {
  @property({ type: String }) model: ModelKey | null = null;

  createRenderRoot() {
    return this;
  }

  private getBgColorForModel(model: ModelKey): string {
    const colorMap: Record<ModelKey, string> = {
      sensor_suhu: 'bg-green-50',
      relay_aktuator: 'bg-blue-50',
      komunikasi_wifi: 'bg-yellow-50',
      konfigurasi_umum: 'bg-gray-50',
    };
    return colorMap[model] || 'bg-slate-50';
  }

  render() {
    if (!this.model) {
      return html`
        <main class="bg-white rounded-xl shadow p-4">
          <h2 class="text-2xl font-bold mb-4">📁 Panel Konfigurasi Sistem</h2>
          <p class="text-gray-700 mb-2">
            Selamat datang di halaman konfigurasi sistem IoT. Silakan pilih
            jenis entitas di panel kiri untuk mulai mengatur parameter
            masing-masing komponen.
          </p>
          <p class="text-gray-600 text-sm italic">
            Contoh entitas: sensor suhu, aktuator relay, modul komunikasi, dsb.
          </p>
        </main>
      `;
    }

    return html`
      <main
        class="${this.getBgColorForModel(this.model)} rounded-xl shadow p-4"
      >
        <page-konfigurasi-model .model=${this.model}></page-konfigurasi-model>
      </main>
    `;
  }
}
