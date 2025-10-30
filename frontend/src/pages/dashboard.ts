// frontend/src/pages/dashboard.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { eventLogStore, loadEventLogData } from '../event-log/event-log-store';
import '../components/event/event-history.ts';

/**
 * PageDashboard
 * ---------------------
 * Halaman dengan tab Produksi, Devices, dan Event History.
 */
@customElement('page-dashboard')
export class PageDashboard extends LitElement {
  @state() private activeTab: 'produksi' | 'devices' | 'history' = 'produksi';

  createRenderRoot() {
    return this; // gunakan light DOM agar Tailwind global aktif
  }

  private handleTabChange(e: Event) {
    const target = e.currentTarget as HTMLButtonElement;
    const id = target.dataset.id as typeof this.activeTab;
    if (id) this.activeTab = id;
  }

  render() {
    return html`
      <div class="p-6 space-y-6">
        <!-- Tabs -->
        <div class="flex space-x-4 border-b pb-2">
          <button
            data-id="produksi"
            @click=${this.handleTabChange}
            class=${this.activeTab === 'produksi'
              ? 'text-green-700 font-semibold border-b-2 border-green-600 pb-1'
              : 'text-gray-500 hover:text-green-600'}
          >
            🏭 Produksi
          </button>
          <button
            data-id="devices"
            @click=${this.handleTabChange}
            class=${this.activeTab === 'devices'
              ? 'text-green-700 font-semibold border-b-2 border-green-600 pb-1'
              : 'text-gray-500 hover:text-green-600'}
          >
            🔌 Devices
          </button>
          <button
            data-id="history"
            @click=${this.handleTabChange}
            class=${this.activeTab === 'history'
              ? 'text-green-700 font-semibold border-b-2 border-green-600 pb-1'
              : 'text-gray-500 hover:text-green-600'}
          >
            📜 Event History
          </button>
        </div>

        <!-- Tab content -->
        ${this.activeTab === 'produksi'
          ? html`
              <div
                class="bg-yellow-50 border border-yellow-300 p-4 rounded text-sm text-yellow-800"
              >
                Halaman dummy tab <strong>Produksi</strong> — belum ada konten.
              </div>
            `
          : this.activeTab === 'devices'
          ? html`
              <div
                class="bg-yellow-50 border border-yellow-300 p-4 rounded text-sm text-yellow-800"
              >
                Halaman dummy tab <strong>Devices</strong> — placeholder tanpa
                integrasi MQTT.
              </div>
            `
          : html`<event-history></event-history>`}
      </div>
    `;
  }
}
