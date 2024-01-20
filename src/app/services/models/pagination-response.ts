import { Song } from './song';

export interface PaginationResponse<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
