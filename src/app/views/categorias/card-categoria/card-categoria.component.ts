import { Component, Input } from '@angular/core';
import { ListarCategoriaViewModel } from '../models/listar-categoria.view-model';

@Component({
  selector: 'app-card-categoria',
  templateUrl: './card-categoria.component.html',
  styleUrls: ['./card-categoria.component.css'],
})
export class CardCategoriaComponent {
  @Input({ required: true }) categoria!: ListarCategoriaViewModel;
}
