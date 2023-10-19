import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsDespesaViewModel } from '../models/forms-despesa.view-model';
import { ListarDespesaViewModel } from '../models/listar-despesa.view-model';
import { VisualizarDespesaViewModel } from '../models/visualizar-despesa.view-model';
import { LocalStorageService } from 'src/app/core/auth/services/local-storage.service';

@Injectable()
export class DespesasService {
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/despesas/';

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  public inserir(
    despesa: FormsDespesaViewModel
  ): Observable<FormsDespesaViewModel> {
    return this.http
      .post<any>(this.endpoint, despesa)
      .pipe(map((res) => res.dados));
  }

  public editar(
    id: string,
    despesa: FormsDespesaViewModel
  ): Observable<FormsDespesaViewModel> {
    return this.http
      .put<any>(this.endpoint + id, despesa)
      .pipe(map((res) => res.dados));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete<any>(this.endpoint + id);
  }

  public selecionarTodos(): Observable<ListarDespesaViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(map((res) => res.dados));
  }

  public selecionarPorId(id: string): Observable<FormsDespesaViewModel> {
    return this.http
      .get<any>(this.endpoint + id)
      .pipe(map((res) => res.dados));
  }

  public selecionarDespesaCompletaPorId(
    id: string
  ): Observable<VisualizarDespesaViewModel> {
    return this.http
      .get<any>(this.endpoint + 'visualizacao-completa/' + id)
      .pipe(map((res) => res.dados));
  }
  
  // public verificarSeHaCategoria(nome: string) {
  //   return this.http
  //     .get<any>(
  //       this.endpoint + 'visualizacao-completa',
  //       this.obterHeadersAutorizacao()
  //     )
  //     .pipe(map((res) => res.dados), map((dados) => {
  //       debugger
  //       const categoriaEmDespesa = dados.categoria.find((c: string) => c == nome);
  
  //       if(!categoriaEmDespesa) return false;
  
  //       return true;
  //     }));
  // }

  public verificarSeHaCategoria(categoria: string): Observable<boolean> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(
        map((res) => res.dados),
        map((dados) => {
          debugger

          const categoriaEncontrada = dados.some((despesa: VisualizarDespesaViewModel) => {
            return despesa.categoriasSelecionadas.includes(categoria);
          });
  
          if(!categoriaEncontrada) return false;
  
          return true;
        })
      );
  }  
}
