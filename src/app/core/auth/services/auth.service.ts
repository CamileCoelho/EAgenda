import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from "rxjs";
import { RegistrarUsuarioViewModel as RegistrarUsuarioViewModel } from "../models/registrar-usuario.view-module";
import { LocalStorageService } from "./local-storage.service";
import { TokenViewModel } from "../models/token.view-module";
import { AutenticarUsuarioViewModel } from "../models/autenticar-usuario.view-model";
import { UsuarioTokenViewModel } from "../models/usuario-token.view-module";

@Injectable()
export class AuthService {
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/conta/';

  private endpointRegistrar: string = this.endpoint + 'registrar';
  private endpointLogin: string = this.endpoint + 'autenticar';

  private usuarioAutenticado: BehaviorSubject <
    UsuarioTokenViewModel | undefined >;

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
    this.usuarioAutenticado = new BehaviorSubject <
    UsuarioTokenViewModel | undefined > (undefined);
  }

  public obterUsuarioAutenticado() {
    return this.usuarioAutenticado.asObservable();
  }

  public registrar(usuario: RegistrarUsuarioViewModel): Observable<TokenViewModel> {
    return this.http.post<any>(this.endpointRegistrar, usuario).pipe(
      map((res) => res.dados),
      tap((dados: TokenViewModel) =>
        this.localStorage.salvarDadosLocaisUsuario(dados)
      ),
      catchError((err) => this.processarErroHttp(err))
    );
  }

  public login(
    usuario: AutenticarUsuarioViewModel
  ): Observable<TokenViewModel> {
    return this.http.post<any>(this.endpointLogin, usuario).pipe(
      map((res) => res.dados),
      tap((dados: TokenViewModel) => {
        this.localStorage.salvarDadosLocaisUsuario(dados),
        this.notificarLogin(dados.usuarioToken)
      }),
      // tap((dados: TokenViewModel) =>
      //   this.notificarLogin(dados.usuarioToken)
      // ), da p fzr ali justo ou separado sem escopo
      catchError((err) => this.processarErroHttp(err))
    );
  }

  private notificarLogin(usuario: UsuarioTokenViewModel): void {
    this.usuarioAutenticado.next(usuario)
  }

  private notificarLogout(): void {
    this.usuarioAutenticado.next(undefined)
  }

  private processarErroHttp(erro: HttpErrorResponse) {
    let mensagemErro = '';

    if (erro.status == 0)
      mensagemErro = 'Ocorreu um erro ao processar a requisição.';
    if (erro.status == 401)
      mensagemErro =
        'O usuário não está autorizado. Efetue login e tente novamente.';
    else mensagemErro = erro.error?.erros[0];

    return throwError(() => new Error(mensagemErro));
  }
}