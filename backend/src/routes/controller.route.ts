// backend/src/routes/controller.route.ts

import { FastifyInstance } from 'fastify';

export default async function controllerRoutes(app: FastifyInstance) {
  app.get('/api/controllers', async (request, reply) => {
    return { data: [] }; // Dummy response
  });
}
