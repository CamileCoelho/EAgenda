import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view-model';
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model';
import { LocalStorageService } from 'src/app/core/auth/services/local-storage.service';
import { VisualizarCompromissoViewModel } from '../models/visualizar-compromisso.view-model';

@Injectable()
export class CompromissosService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/compromissos/';

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  public inserir(
    compromissso: FormsCompromissoViewModel
  ): Observable<FormsCompromissoViewModel> {
    return this.http
      .post<any>(this.endpoint, compromissso)
      .pipe(map((res) => res.dados));
  }

  public editar(
    id: string,
    compromisso: FormsCompromissoViewModel
  ): Observable<FormsCompromissoViewModel> {
    return this.http
      .put<any>(this.endpoint + id, compromisso)
      .pipe(map((res) => res.dados));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete(this.endpoint + id);
  }

  public selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(map((res) => res.dados));
  }

  public selecionarPorId(id: string): Observable<FormsCompromissoViewModel> {
    return this.http
      .get<any>(this.endpoint + id)
      .pipe(map((res) => res.dados));
  }

  public selecionarCompromissoCompletoPorId(
    id: string
  ): Observable<VisualizarCompromissoViewModel> {
    return this.http
      .get<any>(this.endpoint + 'visualizacao-completa/' + id)
      .pipe(map((res) => res.dados));
  }
}
