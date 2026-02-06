import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../config/api';
import type { Table } from '@kitchen/shared';

export function useTable() {
  const { tableId } = useParams<{ tableId: string }>();

  const query = useQuery({
    queryKey: ['table', tableId],
    queryFn: () => apiFetch<{ table: Table }>(`/tables/${tableId}`),
    enabled: !!tableId,
  });

  return {
    tableId: tableId || '',
    table: query.data?.table,
    isLoading: query.isLoading,
    error: query.error,
  };
}
