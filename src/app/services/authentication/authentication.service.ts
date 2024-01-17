import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl: string = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<Artist> {
    return this.http.post<Artist>(`${this.baseUrl}/register`, {
      username,
      password,
    });
  }

  login(username: string, password: string): Observable<Artist> {
    return this.http.post<Artist>(`${this.baseUrl}/login`, {
      username,
      password,
    });
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<Artist> {
    return this.http.post<Artist>(`${this.baseUrl}/updatePassword`, {
      oldPassword,
      newPassword,
    });
  }
}
