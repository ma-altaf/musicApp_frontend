export interface PaginationRequest {
  pageNo?: number;
  pageSize?: number;
  orderBy?: string;
  order?: 'ASC' | 'DESC';
}
