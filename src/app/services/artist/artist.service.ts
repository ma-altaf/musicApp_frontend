import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationRequest } from '../models/pagination-request';
import { PaginationResponse } from '../models/pagination-response';
import { Artist } from '../models/artist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private baseUrl: string = 'http://localhost:8080/artist';

  constructor(private http: HttpClient) {}

  getArtists({
    pageNo = 0,
    pageSize = 2,
    orderBy = 'id',
    order = 'ASC',
  }: PaginationRequest): Observable<PaginationResponse<Artist>> {
    return this.http.get<PaginationResponse<Artist>>(`${this.baseUrl}/get`, {
      params: {
        pageNo,
        pageSize,
        orderBy,
        order,
      },
    });
  }

  getArtistById(id: String): Observable<Artist> {
    return this.http.get<Artist>(`${this.baseUrl}/get/${id}`);
  }

  searchArtists(query: String): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.baseUrl}/search/${query}`);
  }
}
