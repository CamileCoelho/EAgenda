import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  Routes,
} from '@angular/router';
import { InserirContatoComponent } from './inserir-contato/inserir-contato.component';
import { EditarContatoComponent } from './editar-contato/editar-contato.component';
import { ExcluirContatoComponent } from './excluir-contato/excluir-contato.component';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';
import { FormsContatoViewModel } from './models/forms-contato.view-model';
import { ListarContatoViewModel } from './models/listar-contato.view-model';
import { VisualizarContatoViewModel } from './models/visualizar-contato.view-model';
import { ContatosService } from './services/contatos.service';

const listarContatosResolver: ResolveFn<ListarContatoViewModel[]> = () => {
  return inject(ContatosService).selecionarTodos();
};

const formsContatoResolver: ResolveFn<FormsContatoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ContatosService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarContatoResolver: ResolveFn<VisualizarContatoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ContatosService).selecionarContatoCompletoPorId(
    route.paramMap.get('id')!
  );
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },

  {
    path: 'listar',
    component: ListarContatosComponent,
    resolve: { contatos: listarContatosResolver },
  },
  {
    path: 'inserir',
    component: InserirContatoComponent,
  },
  {
    path: 'editar/:id',
    component: EditarContatoComponent,
    resolve: { contato: formsContatoResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirContatoComponent,
    resolve: { contato: visualizarContatoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContatosRoutingModule {}
