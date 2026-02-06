import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { env } from '../config/env';
import { NAMESPACES, ROOMS } from './namespaces';
import { registerOrderHandlers } from './handlers/order.handler';
import { registerKitchenHandlers } from './handlers/kitchen.handler';
import { registerTableHandlers } from './handlers/table.handler';
import { logger } from '../utils/logger';

export function createSocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      methods: ['GET', 'POST'],
    },
  });

  // Guest namespace
  const guestNsp = io.of(NAMESPACES.GUEST);
  guestNsp.on('connection', (socket) => {
    logger.debug(`Guest connected: ${socket.id}`);
    registerTableHandlers(socket);
    registerOrderHandlers(guestNsp, socket, kitchenNsp);
  });

  // Kitchen namespace with PIN auth
  const kitchenNsp = io.of(NAMESPACES.KITCHEN);
  kitchenNsp.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token === env.KITCHEN_PIN) {
      socket.data.isKitchenManager = true;
      next();
    } else {
      next(new Error('Authentication failed'));
    }
  });
  kitchenNsp.on('connection', (socket) => {
    logger.info(`Kitchen manager connected: ${socket.id}`);
    socket.join(ROOMS.kitchen);
    registerKitchenHandlers(kitchenNsp, socket, guestNsp);
  });

  return io;
}
