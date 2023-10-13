import axios from 'axios';
import { Injectable } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthInitializationService {
  constructor() { }

  async obterChaveDeAutenticacao() {
    const apiUrl = 'https://e-agenda-web-api.onrender.com/api';
    const authPath = '/conta/autenticar';
    const authUrl = apiUrl + authPath;

    const autorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNTI0NzcxNC0zZjdiLTRkMjAtYmUzMy03MGI2OWFkNDM3NjIiLCJlbWFpbCI6ImNhbWlsZWNvZWxobzIzQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJDYW1pbGUiLCJuYmYiOjE2OTcwNTIwMTUsImV4cCI6MTY5NzA4MDgxNSwiaWF0IjoxNjk3MDUyMDE1LCJpc3MiOiJlQWdlbmRhIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCJ9.GPc87R-R_R3qoxcsOvKj6AgSdE05ZRglsMKuhSNRtNU'; 
    
    const credentials = {
      email: 'camilecoelho23@gmail.com',
      senha: '123C@mile',
    };

    const headers = {
      Accept: '*/*',
      Authorization: autorization,
      'Content-Type': 'application/json',
    };

    try {
      console.log('Enviando solicitação de autenticação:', credentials);
      const response = await axios.post(authUrl, credentials, { headers });
      console.log('Resposta da autenticação:', response.data);

      const { sucesso, dados } = response.data;

      if (sucesso && dados && dados.chave) {
        environment.apiKey = dados.chave;
        //console.log('Autenticação bem-sucedida. Chave obtida:', dados.chave);
      } else {
        console.error('Falha na autenticação');
      }
    } catch (error) {
      console.error('Erro na solicitação de autenticação:', error);
    }
  }

  initializeApp() {
    this.obterChaveDeAutenticacao();
  }
}


// async function obterChaveDeAutenticacao() {
//   try {
//     const response = await axios.post(authUrl, credentials, { headers });
//     const { sucesso, dados } = response.data;

//     if (sucesso && dados && dados.chave) {
//       environment.apiKey = dados.chave;
//     } else {
//       console.error('Falha na autenticação');
//     }
//   } catch (error) {
//     console.error('Erro na solicitação de autenticação:', error);
//   }
// }


// Função de inicialização
export function initializeApp(authService: AuthInitializationService) {
  return () => authService.initializeApp();
}

// A função initializeApp é a função de inicialização que será chamada quando a aplicação for inicializada.
export const AuthInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: initializeApp,
  deps: [AuthInitializationService],
  multi: true,
};



