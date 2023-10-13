import { NgModule, inject } from '@angular/core';
import { DespesasService } from './services/despesas.service';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { EditarDespesaComponent } from './editar-despesa/editar-despesa.component';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { ExcluirDespesaComponent } from './excluir-despesa/excluir-despesa.component';

const listarDespesasResolver = () => {
  return inject(DespesasService).selecionarTodos();
};

const formsDespesaResolver = (route: ActivatedRouteSnapshot) => {
  return inject(DespesasService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarDespesaResolver = (route: ActivatedRouteSnapshot) => {
  return inject(DespesasService).selecionarDespesaCompletaPorId(
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
    component: ListarDespesasComponent,
    resolve: { despesas: listarDespesasResolver },
  },
  {
    path: 'inserir',
    component: InserirDespesaComponent,
  },
  {
    path: 'editar/:id',
    component: EditarDespesaComponent,
    resolve: { despesa: formsDespesaResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirDespesaComponent,
    resolve: { despesa: visualizarDespesaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespesasRoutingModule {}
