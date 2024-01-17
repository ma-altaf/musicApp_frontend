import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist';
import { TokenResponse } from '../models/token-response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl: string = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  register(
    username: string,
    password: string
  ): Observable<TokenResponse<Artist>> {
    return this.http.post<TokenResponse<Artist>>(`${this.baseUrl}/register`, {
      username,
      password,
    });
  }

  login(username: string, password: string): Observable<TokenResponse<Artist>> {
    return this.http.post<TokenResponse<Artist>>(`${this.baseUrl}/login`, {
      username,
      password,
    });
  }

  updatePassword(
    oldPassword: string,
    newPassword: string
  ): Observable<TokenResponse<Artist>> {
    return this.http.post<TokenResponse<Artist>>(
      `${this.baseUrl}/updatePassword`,
      {
        oldPassword,
        newPassword,
      }
    );
  }
}
