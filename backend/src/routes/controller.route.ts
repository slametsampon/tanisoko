// backend/src/routes/controller.route.ts

import { FastifyInstance } from 'fastify';
import {
  getControllers,
  createController,
} from '../controllers/controller.controller.js';

export async function controllerRoutes(app: FastifyInstance) {
  app.get('/controllers', getControllers);
  app.post('/controllers', createController);
}
