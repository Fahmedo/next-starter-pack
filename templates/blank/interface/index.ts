/** API entity / request / response shapes. Add `<feature>.entity.ts` files and re-export them here. */
export interface ApiResponse<T> {
  statusCode: number;
  message?: string;
  data: T;
}

export interface PaginatedQuery {
  page?: number;
  limit?: number;
  search?: string;
}
