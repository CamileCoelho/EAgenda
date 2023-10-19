import { inject } from "@angular/core"; 
import { LocalStorageService } from "./local-storage.service";
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const httpTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {  
  const token = inject(LocalStorageService).obterDadosLocaisSalvos()?.chave;

  const requestModificado = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  
  return next(requestModificado);
};