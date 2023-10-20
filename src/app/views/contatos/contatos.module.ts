import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'src/app/extensions/form-group.extension';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContatosService } from './services/contatos.service';
import { ContatosRoutingModule } from './contatos-routing.module';
import { CardContatoComponent } from './card-contato/card-contato.component';
import { EditarContatoComponent } from './editar-contato/editar-contato.component';
import { InserirContatoComponent } from './inserir-contato/inserir-contato.component';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';
import { ExcluirContatoComponent } from './excluir-contato/excluir-contato.component';

@NgModule({
  declarations: [
    InserirContatoComponent,
    ListarContatosComponent,
    EditarContatoComponent,
    ExcluirContatoComponent,
    CardContatoComponent,
  ],
  imports: [ CommonModule, ReactiveFormsModule, ContatosRoutingModule, MatIconModule, MatButtonModule],
  providers: [ContatosService],
})
export class ContatosModule {}
