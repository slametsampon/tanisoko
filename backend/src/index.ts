// backend/src/index.ts

import Fastify from 'fastify';
import { controllerRoutes } from './routes/controller.route';
import './mqtt/client';

const app = Fastify();

app.register(controllerRoutes);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server ready at ${address}`);
});
