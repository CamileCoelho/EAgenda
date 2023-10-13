import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'src/app/extensions/form-group.extension';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DespesasService } from './services/despesas.service';
import { DespesasRoutingModule } from './despesas-routing.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { EditarDespesaComponent } from './editar-despesa/editar-despesa.component';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { ExcluirDespesaComponent } from './excluir-despesa/excluir-despesa.component';

@NgModule({
  declarations: [
    InserirDespesaComponent, 
    ListarDespesasComponent, 
    EditarDespesaComponent, 
    ExcluirDespesaComponent],
  imports: [
    CommonModule,
    DespesasRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    CategoriasModule,
  ],
  providers: [DespesasService],
})
export class DespesasModule {}
