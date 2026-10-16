import type { AxiosError } from 'axios';
import { toast } from 'sonner';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/** Pulls a readable message out of an API error payload. */
export function getErrorMessage(error: AxiosError): string {
  const data = error.response?.data;
  if (isRecord(data)) {
    const candidate = data.message ?? data.error ?? data.detail;
    if (typeof candidate === 'string' && candidate.trim()) return candidate;
    if (Array.isArray(candidate) && typeof candidate[0] === 'string') {
      return candidate.join(', ');
    }
  }
  return error.message || 'Something went wrong';
}

/** Shows a toast for failed requests. Used by the axios response interceptor. */
export function handleAxiosError(error: AxiosError): void {
  if (!error.response) {
    toast.error(
      error.code === 'ECONNABORTED'
        ? 'Request timed out. Please try again.'
        : 'Failed to establish network connection.',
    );
    return;
  }
  toast.error(getErrorMessage(error));
}
