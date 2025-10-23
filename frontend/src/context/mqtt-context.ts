// frontend/src/context/mqtt-context.ts

import { createContext } from '@lit/context';
import mqtt, { MqttClient } from 'mqtt';
import {
  getMode,
  setMode,
  type DeviceMode,
  isMockMode,
  isMqttMode,
  isSimMode,
} from '../services/mode';
// import { devicesStore } from '../services/devices-store';

export interface MqttContextValue {
  mode: DeviceMode;
  isConnected: boolean;
  lastMessage: {
    topic: string;
    payload: string;
  } | null;
  client: MqttClient | null;
  toggleMode: () => void;
  setMode: (mode: DeviceMode) => void; // ← tambahkan
  publish: (topic: string, payload: string) => void;
}

export const mqttContext = createContext<MqttContextValue>('mqtt-context');

const MQTT_CONTEXT_EVENT = 'mqtt:context-updated';

export function createMqttContext(): MqttContextValue {
  const mode = getMode();
  let mqttClient: MqttClient | null = null;
  let connected = false;
  let lastMessage: { topic: string; payload: string } | null = null;

  console.info('[mqttContext] 🌐 Creating context in mode:', mode);

  if (mode === 'mqtt') {
    mqttClient = mqtt.connect('ws://localhost:9001', {
      clean: true,
      reconnectPeriod: 2000,
    });

    mqttClient.on('connect', () => {
      connected = true;
      console.info('[mqtt] ✅ Connected to broker');
    });

    mqttClient.on('close', () => {
      connected = false;
      console.warn('[mqtt] 🔌 Connection closed');
    });

    mqttClient.on('error', (err) => {
      console.error('[mqtt] ❌ Error:', err);
    });

    mqttClient.on('message', (topic, payload) => {
      const msg = payload.toString().trim();
      lastMessage = { topic, payload: msg };
      console.debug('[mqtt] 📩 Message received:', { topic, msg });
    });
  } else if (mode === 'mock') {
    console.info('[mqttContext] 🧪 Running in MOCK mode');
  } else if (mode === 'sim') {
    console.info('[mqttContext] 🧪 Running in SIMULATION mode');
  }

  function rotateMode(prev: DeviceMode): DeviceMode {
    switch (prev) {
      case 'mock':
        return 'sim';
      case 'sim':
        return 'mqtt';
      case 'mqtt':
      default:
        return 'mock';
    }
  }

  return {
    mode,
    isConnected: connected,
    lastMessage,
    client: mqttClient,
    toggleMode() {
      const current = getMode();
      const next = rotateMode(current);

      console.warn(`[mqttContext] 🔁 Switching to: ${next}`);
      setMode(next);
      // devicesStore.init(); // refresh device handler

      window.dispatchEvent(
        new CustomEvent(MQTT_CONTEXT_EVENT, {
          detail: createMqttContext(),
        })
      );
    },
    setMode: (mode: DeviceMode) => {
      if (mode !== getMode()) {
        console.info(`[mqttContext] 🔧 setMode() to ${mode}`);
        setMode(mode);
        console.info('[mqttContext] 🌐 Mode changed to:', mode);
        // devicesStore.init(true);
        window.dispatchEvent(
          new CustomEvent('mqtt:context-updated', {
            detail: createMqttContext(),
          })
        );
      }
    },
    publish(topic, payload) {
      if (mqttClient?.connected) {
        mqttClient.publish(topic, payload);
        console.info('[mqtt] 🚀 Published:', { topic, payload });
      } else {
        console.warn('[mqtt] ❌ Cannot publish — not connected');
      }
    },
  };
}
