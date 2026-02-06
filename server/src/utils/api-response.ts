import { Response } from 'express';

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

interface ApiErrorResponse {
  success: false;
  error: string;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function sendSuccess<T>(res: Response, data: T, status = 200): void {
  const response: ApiResponse<T> = { success: true, data };
  res.status(status).json(response);
}

export function sendError(res: Response, error: string, status = 400): void {
  const response: ApiResponse<never> = { success: false, error };
  res.status(status).json(response);
}
