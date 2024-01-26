import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private http: HttpClient = inject(HttpClient);
  playlistPopupSong: WritableSignal<Song | null> = signal(null);

  private baseUrl: string = 'http://localhost:8080/playlist';

  getUserPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.baseUrl}/get`);
  }

  addPlaylist(title: string): Observable<Playlist> {
    return this.http.post<Playlist>(`${this.baseUrl}/add`, { title });
  }

  getPlaylistById(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.baseUrl}/get/${id}`);
  }

  addSongToPlaylist(playlistId: number): Observable<Playlist> {
    return this.http.post<Playlist>(
      `${this.baseUrl}/addSong/${playlistId}/${this.playlistPopupSong()?.id}`,
      {}
    );
  }

  openPlaylistPopup(song: Song) {
    this.playlistPopupSong.set(song);
  }
}
