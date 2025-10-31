// frontend/src/services/simulator.service.ts
import { deviceService } from './device.service';
import { eventLogService } from './event-log.service';
import { eventLogStore } from 'src/event-log/event-log-store';
import type { Device } from 'src/models';

interface SimulatedDevice extends Device {
  lastAlarmActive?: boolean;
  status_value?: 'normal' | 'low-alarm' | 'high-alarm' | 'sensor-fail';
}

class SimulatorService {
  private sensors: SimulatedDevice[] = [];
  private interval: number | undefined;
  private readonly maxLogs = 30;

  async init() {
    const all = await deviceService.getAll();
    this.sensors = all
      .filter((d) => d.type === 'sensor')
      .map((s) => ({ ...s }));
  }

  start() {
    if (this.interval) return; // already running
    this.interval = window.setInterval(() => this.runSimulation(), 5000);
    console.info('[SIMULATOR] Running globally');
  }

  stop() {
    clearInterval(this.interval);
    this.interval = undefined;
    console.info('[SIMULATOR] Stopped');
  }

  getSensors(): SimulatedDevice[] {
    return this.sensors;
  }

  private runSimulation() {
    this.sensors = this.sensors.map((sensor) => {
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
        this.record(
          sensor,
          'alarm',
          `Alarm! ${sensor.function} = ${newValue}`,
          prevValue,
          newValue
        );
      } else if (!isAlarm && wasAlarm) {
        this.record(
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
  }

  private record(
    sensor: SimulatedDevice,
    category: 'alarm' | 'info',
    summary: string,
    prev: number,
    value: number
  ) {
    const event = eventLogService.add({
      source: 'device',
      source_id: sensor.id,
      category,
      summary,
      recorded_by: 'simulator',
      device_tag: sensor.tag_number,
      previous_value: prev,
      value,
      note: 'Simulated by global service',
    });

    eventLogStore.items.unshift(event);

    // Batasi max N
    if (eventLogStore.items.length > this.maxLogs) {
      eventLogStore.items.length = this.maxLogs;
    }
    window.dispatchEvent(new CustomEvent('event-log-updated'));
  }
}

export const simulatorService = new SimulatorService();
