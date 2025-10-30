// frontend/src/components/device/device-detail-modal.ts

import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { Device } from '@/models';

@customElement('device-detail-modal')
export class DeviceDetailModal extends LitElement {
  @property({ type: Object }) device!: Device;
  @query('dialog') dialogEl!: HTMLDialogElement;

  createRenderRoot() {
    return this;
  }

  public open() {
    this.dialogEl?.showModal();
  }

  public close() {
    this.dialogEl?.close();
  }

  private get metadata() {
    try {
      return JSON.parse(this.device.metadata_json || '{}');
    } catch (e) {
      return {};
    }
  }

  render() {
    const d = this.device;
    const metadata = this.metadata;

    return html`
      <dialog
        class="p-6 rounded-lg w-full max-w-lg border border-gray-300 shadow space-y-4"
      >
        <h2 class="text-xl font-bold text-gray-800">
          🧩 ${d.name} (${d.tag_number})
        </h2>

        <div class="space-y-2 text-sm text-gray-700">
          <div><strong>Deskripsi:</strong> ${d.description}</div>
          <div><strong>Node:</strong> ${d.node_id}</div>
          <div><strong>IP:</strong> ${d.ip_address}</div>
          <div><strong>Platform:</strong> ${d.platform}</div>
          <div><strong>Firmware:</strong> v${d.firmware_version}</div>
          <div><strong>Tipe:</strong> ${d.type} – ${d.function}</div>
          ${d.type === 'sensor'
            ? html`<div><strong>Nilai:</strong> ${d.value} ${d.unit}</div>`
            : html`<div>
                <strong>Status:</strong> ${d.current_state?.toUpperCase()}
              </div>`}
          <div><strong>Mode:</strong> ${d.operation_mode}</div>
          <div>
            <strong>Alarm Min:</strong> ${d.alarm_min},
            <strong>Max:</strong> ${d.alarm_max}
          </div>
        </div>

        <div class="pt-4 border-t">
          <h3 class="text-sm font-semibold text-gray-600">🔎 Metadata:</h3>
          <div
            class="bg-gray-50 border rounded p-2 text-xs font-mono whitespace-pre-wrap"
          >
            ${Object.entries(metadata).length > 0
              ? html`${Object.entries(metadata).map(
                  ([key, val]) =>
                    html`<div>
                      <span class="text-gray-500">${key}</span>: ${val}
                    </div>`
                )}`
              : html`<div class="text-gray-400 italic">
                  Tidak ada metadata
                </div>`}
          </div>
        </div>

        <div class="text-right">
          <button
            @click=${this.close}
            class="text-sm px-4 py-1 border rounded hover:bg-gray-100"
          >
            Tutup
          </button>
        </div>
      </dialog>
    `;
  }
}
