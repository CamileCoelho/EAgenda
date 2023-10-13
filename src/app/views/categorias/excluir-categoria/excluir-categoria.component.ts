import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from '../services/categorias.service';
import { ContatosRoutingModule } from './../../contatos/contatos-routing.module';
import { Component, OnInit } from '@angular/core';
import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria.view-model';
import { DespesasService } from '../../despesas/services/despesas.service';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styleUrls: ['./excluir-categoria.component.css'],
})
export class ExcluirCategoriaComponent implements OnInit {
  categoriaVM?: VisualizarCategoriaViewModel;

  constructor(
    private categoriasService: CategoriasService,
    private despesasService: DespesasService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaVM = this.route.snapshot.data['categoria'];

    this.despesasService.verificarSeHaCategoria("mercado").subscribe((categoriaExiste) => {
      console.log(categoriaExiste);
    });
  }

  gravar() {
    this.categoriasService.excluir(this.categoriaVM!.id).subscribe(() => {
      this.toastrService.success(
        `A categoria foi excluída com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/categorias', 'listar']);
    });
  }
}
