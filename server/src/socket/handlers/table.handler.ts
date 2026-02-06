import { Socket } from 'socket.io';
import { ROOMS } from '../namespaces';
import { logger } from '../../utils/logger';

export function registerTableHandlers(socket: Socket) {
  socket.on('guest:join-table', ({ tableId, guestSessionId }) => {
    socket.join(ROOMS.table(tableId));
    socket.data.tableId = tableId;
    socket.data.guestSessionId = guestSessionId;
    logger.debug(`Guest ${guestSessionId} joined table room: ${tableId}`);
  });

  socket.on('disconnect', () => {
    logger.debug(`Socket disconnected: ${socket.id}`);
  });
}
