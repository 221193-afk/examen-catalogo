import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor ejecutado para URL:', req.url);   // ← agrega esto

  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();  // ← agrega esto

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log('Error capturado en interceptor:', err.status);  // ← agrega
      if (err.status === 401 || err.status === 403) {
        authService.clearToken();
        // router.navigate(['/']);
      }
      return throwError(() => err);
    })
  );
};