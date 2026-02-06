import { io, Socket } from 'socket.io-client';
import type { ServerToClientEvents, ClientToServerEvents } from '@kitchen/shared';

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let guestSocket: TypedSocket | null = null;
let kitchenSocket: TypedSocket | null = null;

export function getGuestSocket(): TypedSocket {
  if (!guestSocket) {
    guestSocket = io('/guest', {
      autoConnect: false,
    }) as TypedSocket;
  }
  return guestSocket;
}

export function getKitchenSocket(pin: string): TypedSocket {
  if (!kitchenSocket) {
    kitchenSocket = io('/kitchen', {
      autoConnect: false,
      auth: { token: pin },
    }) as TypedSocket;
  }
  return kitchenSocket;
}

export function disconnectGuest() {
  if (guestSocket) {
    guestSocket.disconnect();
    guestSocket = null;
  }
}

export function disconnectKitchen() {
  if (kitchenSocket) {
    kitchenSocket.disconnect();
    kitchenSocket = null;
  }
}
