// frontend/src/components/device/device-view.ts

import { LitElement, html } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { deviceService } from '../../services/device.service';
import { Device } from 'src/models';
import './device-card.ts';
import './device-detail-modal.ts';
import { eventLogService } from 'src/services/event-log.service';
import { addEventLog } from 'src/event-log/event-log-store';
import { simulatorService } from 'src/services/simulator.service';

interface SimulatedDevice extends Device {
  lastAlarmActive?: boolean;
  status_value?: 'normal' | 'low-alarm' | 'high-alarm' | 'sensor-fail';
}

@customElement('device-view')
export class DeviceView extends LitElement {
  @state() private sensors: SimulatedDevice[] = [];
  @state() private actuators: Device[] = [];
  @state() private selectedDevice: Device | null = null;
  @query('device-detail-modal') private modalEl!: any;

  @state() private useSimulation = true;
  private syncInterval: number | undefined;

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();

    const all = await deviceService.getAll();
    this.sensors = all
      .filter((d) => d.type === 'sensor')
      .map((s) => ({ ...s }));
    this.actuators = all.filter((d) => d.type === 'actuator');

    // ❌ Tidak perlu panggil startSimulation lagi
    if (!this.useSimulation) {
      this.initMQTT();
    }

    // ✅ Sinkronisasi tampilan dengan sensor global
    this.syncInterval = window.setInterval(() => {
      this.sensors = [...simulatorService.getSensors()];
    }, 5000);
  }

  disconnectedCallback() {
    clearInterval(this.syncInterval);
  }

  private handleToggleMode(e: Event) {
    const target = e.target as HTMLInputElement;
    this.useSimulation = target.checked;

    if (this.useSimulation) {
      // ❌ Tidak perlu start ulang simulator
      console.info('[SIMULATION] Enabled (device-view)');
    } else {
      this.initMQTT();
    }
  }

  private initMQTT() {
    console.info('[MQTT] Listening for device data...');
  }

  private handleDeviceClick(device: Device) {
    this.selectedDevice = device;
    this.modalEl?.open();
  }

  private recordEvent(
    device: Device,
    category: 'alarm' | 'info',
    summary: string,
    previous_value: number,
    value: number
  ) {
    const event = eventLogService.add({
      source: 'device',
      source_id: device.id,
      category,
      summary,
      recorded_by: 'simulator',
      device_tag: device.tag_number,
      previous_value,
      value,
      note: 'Simulated by frontend',
    });

    addEventLog({
      source: 'device',
      source_id: device.id,
      category,
      summary,
      recorded_by: 'simulator',
      device_tag: device.tag_number,
      previous_value,
      value,
      note: 'Simulated by frontend',
    });
  }

  render() {
    return html`
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-700">🔌 Device View</h2>
        <label class="inline-flex items-center cursor-pointer">
          <span class="mr-2 text-sm text-gray-700">MQTT</span>
          <input
            type="checkbox"
            class="sr-only peer"
            .checked=${this.useSimulation}
            @change=${this.handleToggleMode}
          />
          <div
            class="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 relative transition"
          >
            <div
              class="w-5 h-5 bg-white rounded-full shadow absolute left-0 top-0.5 transform peer-checked:translate-x-full transition"
            ></div>
          </div>
          <span class="ml-2 text-sm text-gray-700">Simulasi</span>
        </label>
      </div>

      <div class="space-y-6">
        <!-- SENSORS -->
        <div>
          <h2 class="text-lg font-semibold text-gray-700 mb-2">📟 Sensors</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${this.sensors.map(
              (d) => html`
                <device-card
                  .device=${d}
                  @click=${() => this.handleDeviceClick(d)}
                ></device-card>
              `
            )}
          </div>
        </div>

        <!-- ACTUATORS -->
        <div>
          <h2 class="text-lg font-semibold text-gray-700 mb-2">🛠 Actuators</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${this.actuators.map(
              (d) => html`
                <device-card
                  .device=${d}
                  @click=${() => this.handleDeviceClick(d)}
                ></device-card>
              `
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
