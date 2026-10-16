import axios, { AxiosError } from 'axios';

import { API_TIMEOUT_MS } from '@/config/constants';
import { env } from '@/config/env';
import { handleAxiosError } from '@/utils/error';

export const API = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use((config) => {
  // Attach headers (e.g. Authorization) here when your app needs them.
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    handleAxiosError(error);
    return Promise.reject(error);
  },
);

/** Example service pattern: one file per feature in services/, hooks in hook/<feature>/. */
