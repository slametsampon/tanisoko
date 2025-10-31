// frontend/src/components/device/device-card.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Device } from 'src/models';

@customElement('device-card')
export class DeviceCard extends LitElement {
  @property({ type: Object }) device!: Device;

  createRenderRoot() {
    return this;
  }

  render() {
    const d = this.device;
    const isSensor = d.type === 'sensor';
    const icon = isSensor ? '📟' : '🛠';
    const statusColor =
      d.status_connectivity === 'online' ? 'text-green-600' : 'text-red-500';

    // 🔥 Cek alarm status (sensor only)
    let alarm = false;
    if (isSensor && typeof d.value === 'number') {
      alarm =
        typeof d.value === 'number' &&
        typeof d.alarm_min === 'number' &&
        typeof d.alarm_max === 'number' &&
        (d.value < d.alarm_min || d.value > d.alarm_max);
    }

    const stateInfo = isSensor
      ? html`
          <div class="text-sm">
            📈
            <span
              class="${alarm ? 'text-red-600 font-bold' : 'text-green-700'}"
            >
              ${d.value} ${d.unit}
            </span>
          </div>
        `
      : html`<div class="text-sm">
          ⚙️ ${String(d.current_state).toUpperCase()}
        </div>`;

    return html`
      <div
        class="p-4 rounded-lg border shadow bg-white space-y-1 hover:bg-gray-50 cursor-pointer transition"
        title="Klik untuk lihat detail"
        @click=${() =>
          this.dispatchEvent(
            new CustomEvent('click', { bubbles: true, composed: true })
          )}
      >
        <div class="flex justify-between items-center">
          <div
            class="flex items-center gap-2 text-lg font-semibold text-gray-800"
          >
            ${icon} ${d.name}
          </div>
          <span class="${statusColor} text-xs">${d.status_connectivity}</span>
        </div>

        <div class="text-sm text-gray-600">${d.description}</div>
        <div class="text-sm text-gray-500">🧩 ${d.function} (${d.type})</div>

        ${stateInfo}

        <!-- ✅ Tambah badge ALARM jika aktif -->
        ${alarm
          ? html`
              <div>
                <span
                  class="inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded"
                >
                  ⚠️ Alarm!
                </span>
              </div>
            `
          : null}

        <div class="text-sm text-gray-500">
          🔌 ${d.node_id} – ${d.ip_address}
        </div>
        <div class="text-xs text-gray-400">FW v${d.firmware_version}</div>
      </div>
    `;
  }
}
