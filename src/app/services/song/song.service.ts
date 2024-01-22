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
    pageSize = 6,
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

  sortSongs(songs: Song[], field: number) {
    switch (field) {
      case 0:
        songs = songs.sort((a, b) => a.released - b.released);
        break;
      case 1:
        songs = songs.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 2:
        songs = songs.sort((a, b) => a.downloads - b.downloads);
        break;
      case 3:
        songs = songs.sort((a, b) => a.favourites - b.favourites);
        break;
      case 4:
        songs = songs.sort((a, b) => a.listens - b.listens);
        break;
    }
    return songs;
  }
}

export const SongSort: string[] = [
  'Date',
  'title',
  'Downloads',
  'Favourites',
  'Listens',
];
