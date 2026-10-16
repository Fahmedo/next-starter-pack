export interface SiteConfig {
  name: string;
  description: string;
  url: string;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
}
