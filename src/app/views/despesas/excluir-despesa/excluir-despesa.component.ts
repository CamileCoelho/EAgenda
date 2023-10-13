import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DespesasService } from '../services/despesas.service';
import { VisualizarDespesaViewModel } from '../models/visualizar-despesa.view-model';

@Component({
  selector: 'app-excluir-despesa',
  templateUrl: './excluir-despesa.component.html',
  styleUrls: ['./excluir-despesa.component.css'],
})
export class ExcluirDespesaComponent implements OnInit {
  despesaVM?: VisualizarDespesaViewModel;

  constructor(
    private despesasService: DespesasService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.despesaVM = this.route.snapshot.data['despesa'];

    debugger

    this.despesasService.verificarSeHaCategoria("mercado").subscribe((categoriaExiste) => {
      console.log(categoriaExiste);
    });
  }

  gravar() {
    this.despesasService.excluir(this.despesaVM!.id).subscribe(() => {
      this.toastrService.success(
        `A despesa foi excluída com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/despesas', 'listar']);
    });
  }
}
