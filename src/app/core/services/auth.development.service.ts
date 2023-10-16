import { Injectable } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthInitializationService {
  constructor(private http: HttpClient) { }

  email ='teste@teste.com';
  senha = 'String@123';

  obterChaveDeAutenticacao(email: string, senha: string): Observable<boolean> {
    const apiUrl = 'https://e-agenda-web-api.onrender.com/api';
    const authPath = '/conta/autenticar';
    const authUrl = apiUrl + authPath;

    const credentials = {
      email: email,
      senha: senha,
    };

    const headers = new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json',
    });

    console.log('Enviando solicitação de autenticação:', credentials);

    return this.http.post(authUrl, credentials, { headers }).pipe(
      map((response: any) => {
        const { sucesso, dados } = response;
        if (sucesso && dados && dados.chave) {
          environment.apiKey = dados.chave;
          return true;
        } else {
          console.error('Falha na autenticação');
          return false;
        }
      }),
      catchError((error) => {
        console.error('Erro na solicitação de autenticação:', error);
        return of(false);
      })
    );
  }

  initializeApp(): Observable<boolean> {
    return this.obterChaveDeAutenticacao(this.email, this.senha);
  }
}

export function initializeApp(authService: AuthInitializationService) {
  return () => authService.initializeApp();
}

export const AuthInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: initializeApp,
  deps: [AuthInitializationService],
  multi: true,
};
