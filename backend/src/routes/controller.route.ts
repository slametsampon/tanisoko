// backend/src/routes/controller.route.ts
import { FastifyInstance } from 'fastify';
import { publishControllerStatus } from '../mqtt/client.js';

export async function controllerRoutes(fastify: FastifyInstance) {
  fastify.get('/controllers', async (req, reply) => {
    reply.send([
      { id: 'esp32-a1', location: 'Greenhouse', status: 'online' },
      { id: 'esp32-b4', location: 'Irrigation', status: 'offline' },
    ]);
  });

  // ✅ Endpoint uji publish MQTT
  fastify.post<{
    Params: { id: string };
    Body: Record<string, any>; // ✅ Ini akan hilangkan error 'unknown'
  }>('/controllers/:id/status', async (req, reply) => {
    const controllerId = req.params.id;
    const body = req.body;

    publishControllerStatus(controllerId, body); // ✅ Sekarang tidak error
    reply.code(200).send({ message: 'published', data: body });
  });
}
