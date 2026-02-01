// backend/src/controllers/controller.controller.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { ControllerSchema } from '@shared/models/controller.model';

export async function getControllers(req: FastifyRequest, reply: FastifyReply) {
  // Dummy data
  const dummy = [
    { id: 'esp32-a1', location: 'Greenhouse', status: 'online' },
    { id: 'esp32-b4', location: 'Irrigation', status: 'offline' },
  ];

  reply.send(dummy);
}

export async function createController(
  req: FastifyRequest<{ Body: unknown }>,
  reply: FastifyReply
) {
  try {
    const parsed = ControllerSchema.parse(req.body);
    console.log('Received Controller:', parsed);
    reply.code(201).send({ message: 'Controller created', data: parsed });
  } catch (err) {
    reply.code(400).send({ error: 'Invalid data', details: err });
  }
}
