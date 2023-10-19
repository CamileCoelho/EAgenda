import { Observable, map } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivateFn, UrlTree, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);

  return inject(AuthService)
    .obterUsuarioAutenticado()
    .pipe(
      map((usuario) => {
        if (usuario) return router.parseUrl('/dashboard');

        return true;
      })
    );
};
