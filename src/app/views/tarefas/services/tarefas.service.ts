import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsTarefaViewModel } from '../models/forms-tarefa.view-model';
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
      .post<any>(this.endpoint, tarefa)
      .pipe(map((res) => res.dados));
  }

  public editar(
    id: string,
    tarefa: FormsTarefaViewModel
  ): Observable<FormsTarefaViewModel> {
    return this.http
      .put<any>(this.endpoint + id, tarefa)
      .pipe(map((res) => res.dados));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete<any>(this.endpoint + id);
  }

  public selecionarTodos(): Observable<ListarTarefaViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(map((res) => res.dados));
  }

  public selecionarPorId(id: string): Observable<FormsTarefaViewModel> {
    return this.http
      .get<any>(this.endpoint + id)
      .pipe(map((res) => res.dados));
  }

  public selecionarTarefaCompletaPorId(
    id: string
  ): Observable<VisualizarTarefaViewModel> {
    return this.http
      .get<any>(this.endpoint + 'visualizacao-completa/' + id)
      .pipe(map((res) => res.dados));
  }
}
