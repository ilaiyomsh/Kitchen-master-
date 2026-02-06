export const TABLE_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  NEEDS_SERVICE: 'needs_service',
} as const;

export type TableStatus = (typeof TABLE_STATUS)[keyof typeof TABLE_STATUS];

export const TABLE_STATUS_VALUES = Object.values(TABLE_STATUS);
