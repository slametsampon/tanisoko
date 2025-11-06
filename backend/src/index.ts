// backend/src/index.ts

import Fastify from 'fastify';
import { controllerRoutes } from '../src/routes/controller.route';

const app = Fastify();

app.register(controllerRoutes);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server ready at ${address}`);
});
