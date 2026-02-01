// backend/src/services/mqtt.service.ts

import mqtt from 'mqtt';

const brokerUrl = 'mqtt://localhost:1883'; // Ganti jika broker di tempat lain
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('📡 Connected to MQTT broker');
});

client.on('error', (err) => {
  console.error('❌ MQTT connection error:', err);
});

export function publish(topic: string, message: string | object) {
  const payload =
    typeof message === 'string' ? message : JSON.stringify(message);
  client.publish(topic, payload, (err) => {
    if (err) {
      console.error('❌ MQTT publish error:', err);
    } else {
      console.log(`📤 Published to ${topic}: ${payload}`);
    }
  });
}

export function subscribe(topic: string) {
  client.subscribe(topic, (err) => {
    if (err) {
      console.error(`❌ Failed to subscribe ${topic}:`, err);
    } else {
      console.log(`📥 Subscribed to ${topic}`);
    }
  });
}

client.on('message', (topic, payload) => {
  console.log(`📨 Received on ${topic}: ${payload.toString()}`);
});
