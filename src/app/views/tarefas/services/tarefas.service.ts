import { Injectable } from '@angular/core';
import { FormsTarefaViewModel } from '../models/forms-tarefa.view-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ListarTarefaViewModel } from '../models/listar-tarefa.view-model';
import { VisualizarTarefaViewModel } from '../models/visualizar-tarefa.view-model';
import { LocalStorageService } from 'src/app/core/auth/services/local-storage.service';

@Injectable()
export class TarefasService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/tarefas/';

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  public inserir(
    tarefa: FormsTarefaViewModel
  ): Observable<FormsTarefaViewModel> {
    return this.http
      .post<any>(this.endpoint, tarefa, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public editar(
    id: string,
    tarefa: FormsTarefaViewModel
  ): Observable<FormsTarefaViewModel> {
    return this.http
      .put<any>(this.endpoint + id, tarefa, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete<any>(
      this.endpoint + id,
      this.obterHeadersAutorizacao()
    );
  }

  public selecionarTodos(): Observable<ListarTarefaViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarPorId(id: string): Observable<FormsTarefaViewModel> {
    return this.http
      .get<any>(this.endpoint + id, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarTarefaCompletaPorId(
    id: string
  ): Observable<VisualizarTarefaViewModel> {
    return this.http
      .get<any>(
        this.endpoint + 'visualizacao-completa/' + id,
        this.obterHeadersAutorizacao()
      )
      .pipe(map((res) => res.dados));
  }

  private obterHeadersAutorizacao() {
    const token = this.localStorage.obterDadosLocaisSalvos()?.chave;

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}
