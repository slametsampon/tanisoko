// backend/index.ts

import Fastify from 'fastify';
import controllerRoutes from './src/routes/controller.route';

const app = Fastify();

app.register(controllerRoutes);

app.listen({ port: 3000 }, () => {
  console.log('🚀 Fastify server is running at http://localhost:3000');
});
