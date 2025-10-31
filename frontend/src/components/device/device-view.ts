// frontend/src/components/device/device-view.ts

import { LitElement, html } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { deviceService } from '../../services/device.service';
import { Device } from 'src/models';
import './device-card.ts';
import './device-detail-modal.ts';
import { eventLogService } from 'src/services/event-log.service';
import { eventLogStore } from 'src/event-log/event-log-store';

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
  private simulationInterval: number | undefined;

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    const all = await deviceService.getAll();
    this.sensors = all
      .filter((d) => d.type === 'sensor')
      .map((s) => ({ ...s })); // force SimulatedDevice
    this.actuators = all.filter((d) => d.type === 'actuator');

    if (this.useSimulation) {
      this.startSimulation();
    } else {
      this.initMQTT();
    }
  }

  disconnectedCallback() {
    clearInterval(this.simulationInterval);
  }

  private handleToggleMode(e: Event) {
    const target = e.target as HTMLInputElement;
    this.useSimulation = target.checked;

    if (this.useSimulation) {
      this.startSimulation();
    } else {
      this.stopSimulation();
      this.initMQTT();
    }
  }

  private startSimulation() {
    this.simulationInterval = window.setInterval(() => {
      this.runSensorSimulation();
    }, 5000);
    console.info('[SIMULATION] Started');
  }

  private stopSimulation() {
    clearInterval(this.simulationInterval);
    console.info('[SIMULATION] Stopped');
  }

  private initMQTT() {
    // MQTT integration
    console.info('[MQTT] Listening for device data...');
  }

  private handleDeviceClick(device: Device) {
    this.selectedDevice = device;
    this.modalEl?.open();
  }

  private runSensorSimulation() {
    // ✅ Ambil snapshot sensor sebelumnya
    const prevSensors = this.sensors.map((s) => ({ ...s }));

    const newSensors = prevSensors.map((sensor) => {
      if (
        sensor.type !== 'sensor' ||
        typeof sensor.value !== 'number' ||
        typeof sensor.alarm_min !== 'number' ||
        typeof sensor.alarm_max !== 'number'
      ) {
        return sensor;
      }

      const prevValue = sensor.value;
      const min = sensor.alarm_min;
      const max = sensor.alarm_max;

      const newValue = parseFloat(
        (Math.random() * (max - min + 10) + (min - 5)).toFixed(2)
      );

      const isAlarm = newValue < min || newValue > max;
      const wasAlarm = prevValue < min || prevValue > max;

      let status_value: SimulatedDevice['status_value'] = 'normal';
      if (newValue < min) status_value = 'low-alarm';
      else if (newValue > max) status_value = 'high-alarm';

      if (isAlarm && !wasAlarm) {
        this.recordEvent(
          sensor,
          'alarm',
          `Alarm! ${sensor.function} = ${newValue}`,
          prevValue,
          newValue
        );
      } else if (!isAlarm && wasAlarm) {
        this.recordEvent(
          sensor,
          'info',
          `${sensor.function} back to normal`,
          prevValue,
          newValue
        );
      }

      return {
        ...sensor,
        value: newValue,
        lastAlarmActive: isAlarm,
        status_value,
      };
    });

    this.sensors = newSensors;
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

    eventLogStore.items.unshift(event);
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
