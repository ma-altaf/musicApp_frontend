import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../models/song';
import { PaginationRequest } from '../models/pagination-request';
import { PaginationResponse } from '../models/pagination-response';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  private baseUrl: string = 'http://localhost:8080/song';
  private http: HttpClient = inject(HttpClient);

  getSongs({
    pageNo = 0,
    pageSize = 2,
    orderBy = 'title',
    order = 'ASC',
  }: PaginationRequest): Observable<PaginationResponse<Song>> {
    return this.http.get<PaginationResponse<Song>>(`${this.baseUrl}/get`, {
      params: {
        pageNo,
        pageSize,
        orderBy,
        order,
      },
    });
  }

  getSongById(id: String): Observable<Song> {
    return this.http.get<Song>(`${this.baseUrl}/get/${id}`);
  }

  searchSongs(query: String): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.baseUrl}/search/${query}`);
  }

  getSongsByArtist(id: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.baseUrl}/artist/${id}`);
  }

  addSong(songForm: any) {
    return this.http.post(`${this.baseUrl}/add`, songForm);
  }

  updateSong(songForm: any) {
    return this.http.post(`${this.baseUrl}/update`, songForm);
  }
}
