// backend/src/mqtt/client.ts

import mqtt from 'mqtt';

const brokerUrl = 'mqtt://localhost:1883'; // ganti sesuai broker Anda
const client = mqtt.connect(brokerUrl);

// Saat konek
client.on('connect', () => {
  console.log('📡 Connected to MQTT broker');
  client.subscribe('tanisoko/controller/+/status', (err) => {
    if (err) {
      console.error('❌ Subscribe failed:', err.message);
    } else {
      console.log('✅ Subscribed to controller status topic');
    }
  });
});

// Saat menerima pesan
client.on('message', (topic, message) => {
  console.log(`📨 MQTT message on [${topic}]: ${message.toString()}`);
});

// Untuk publish dari aplikasi:
export function publishControllerStatus(controllerId: string, payload: object) {
  const topic = `tanisoko/controller/${controllerId}/status`;
  client.publish(topic, JSON.stringify(payload));
}

export default client;
