import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'src/app/extensions/form-group.extension';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoriasService } from './services/categorias.service';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { CardCategoriaComponent } from './card-categoria/card-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { ExcluirCategoriaComponent } from './excluir-categoria/excluir-categoria.component';

@NgModule({
  declarations: [InserirCategoriaComponent, ListarCategoriasComponent, CardCategoriaComponent, EditarCategoriaComponent, ExcluirCategoriaComponent],
  imports: [CommonModule, CategoriasRoutingModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  providers: [CategoriasService],
})
export class CategoriasModule {}
