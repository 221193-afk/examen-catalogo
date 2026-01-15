import { Injectable, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';  // ajusta si tu endpoint es diferente
  constructor(private http: HttpClient) {}   // inyecta HttpClient

  private platformId = inject(PLATFORM_ID);

  login(credentials: { username: string; password: string }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(   // ← ajusta /auth/login si tu endpoint es /login o /api/login
    tap(response => {
      console.log('Respuesta del backend:', response);
      if (response && response.token) {
        this.setToken(response.token);
        console.log('Token guardado correctamente');
      } else {
        console.warn('No se recibió token en la respuesta');
      }
    }),
    catchError(err => {
      console.error('Error en petición login:', err);
      return throwError(() => err);
    })
  );
}

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem('token');
  }
}