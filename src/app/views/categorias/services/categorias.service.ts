import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';
import { Observable, map } from 'rxjs';
import { ListarCategoriaViewModel } from '../models/listar-categoria.view-model';
import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria.view-model';
import { LocalStorageService } from 'src/app/core/auth/services/local-storage.service';

@Injectable()
export class CategoriasService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/categorias/';

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  public inserir(
    categoria: FormsCategoriaViewModel
  ): Observable<FormsCategoriaViewModel> {
    return this.http
      .post<any>(this.endpoint, categoria)
      .pipe(map((res) => res.dados));
  }

  public editar(
    id: string,
    categoria: FormsCategoriaViewModel
  ): Observable<FormsCategoriaViewModel> {
    return this.http
      .put<any>(this.endpoint + id, categoria)
      .pipe(map((res) => res.dados));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete<any>(this.endpoint + id);
  }

  public selecionarTodos(): Observable<ListarCategoriaViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(map((res) => res.dados));
  }

  public selecionarPorId(id: string): Observable<FormsCategoriaViewModel> {
    return this.http
      .get<any>(this.endpoint + id)
      .pipe(map((res) => res.dados));
  }

  public selecionarCategoriaCompletaPorId(
    id: string
  ): Observable<VisualizarCategoriaViewModel> {
    return this.http
      .get<any>(this.endpoint + 'visualizacao-completa/' + id)
      .pipe(map((res) => res.dados));
  }
}
