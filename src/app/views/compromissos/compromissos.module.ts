import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ContatosModule } from '../contatos/contatos.module';
import { CompromissosService } from './services/compromissos.service';
import { CompromissosRoutingModule } from './compromissos-routing.module';
import { EditarCompromissoComponent } from './editar-compromisso/editar-compromisso.component';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { ExcluirCompromissoComponent } from './excluir-compromisso/excluir-compromisso.component';

@NgModule({
  declarations: [InserirCompromissoComponent, ListarCompromissosComponent, EditarCompromissoComponent, ExcluirCompromissoComponent],
  imports: [CommonModule, CompromissosRoutingModule, NgbModule, ReactiveFormsModule, ContatosModule],
  providers: [CompromissosService],
})
export class CompromissosModule {}
