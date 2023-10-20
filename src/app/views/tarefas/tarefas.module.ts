import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'src/app/extensions/form-group.extension';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TarefasService } from './services/tarefas.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TarefasRoutingModule } from './tarefas-routing.module';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';
import { InserirTarefaComponent } from './inserir-tarefa/inserir-tarefa.component';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { ExcluirTarefaComponent } from './excluir-tarefa/excluir-tarefa.component';
@NgModule({
  declarations: [InserirTarefaComponent, ListarTarefasComponent, EditarTarefaComponent, ExcluirTarefaComponent],
  imports: [ CommonModule, TarefasRoutingModule, ReactiveFormsModule, NgSelectModule, NgbTooltipModule, MatIconModule, MatButtonModule],
  providers: [TarefasService],
})
export class TarefasModule {}
