export const NAMESPACES = {
  GUEST: '/guest',
  KITCHEN: '/kitchen',
} as const;

export const ROOMS = {
  table: (tableId: string) => `table:${tableId}`,
  kitchen: 'kitchen-room',
} as const;
