import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

export function useSocket(socket: Socket | null, shouldConnect = true) {
  const connectedRef = useRef(false);

  useEffect(() => {
    if (!socket || !shouldConnect) return;

    if (!connectedRef.current) {
      socket.connect();
      connectedRef.current = true;
    }

    return () => {
      if (connectedRef.current) {
        socket.disconnect();
        connectedRef.current = false;
      }
    };
  }, [socket, shouldConnect]);
}
