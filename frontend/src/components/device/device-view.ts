// frontend/src/components/device/device-view.ts

import { LitElement, html } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { deviceService } from '../../services/device.service';
import { Device } from '@/models';
import './device-card.ts';
import './device-detail-modal.ts';

@customElement('device-view')
export class DeviceView extends LitElement {
  @state() private sensors: Device[] = [];
  @state() private actuators: Device[] = [];
  @state() private selectedDevice: Device | null = null;
  @query('device-detail-modal') private modalEl!: any;

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    const all = await deviceService.getAll();
    this.sensors = all.filter((d) => d.type === 'sensor');
    this.actuators = all.filter((d) => d.type === 'actuator');
  }

  private handleDeviceClick(device: Device) {
    this.selectedDevice = device;
    this.modalEl?.open();
  }

  render() {
    return html`
      <div class="space-y-6">
        <!-- SENSORS -->
        <div>
          <h2 class="text-lg font-semibold text-gray-700 mb-2">📟 Sensors</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${this.sensors.map(
              (d) => html`<device-card
                .device=${d}
                @click=${() => this.handleDeviceClick(d)}
              ></device-card> `
            )}
          </div>
        </div>

        <!-- ACTUATORS -->
        <div>
          <h2 class="text-lg font-semibold text-gray-700 mb-2">🛠 Actuators</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${this.actuators.map(
              (d) => html`<device-card
                .device=${d}
                @click=${() => this.handleDeviceClick(d)}
              ></device-card> `
            )}
          </div>
        </div>
      </div>
      ${this.selectedDevice
        ? html`
            <device-detail-modal
              .device=${this.selectedDevice}
            ></device-detail-modal>
          `
        : null}
    `;
  }
}
