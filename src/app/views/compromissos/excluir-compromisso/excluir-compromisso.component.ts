import { Component, OnInit } from '@angular/core';
import { CompromissosService } from '../services/compromissos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisualizarCompromissoViewModel } from '../models/visualizar-compromisso.view-model';

@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html',
  styleUrls: ['./excluir-compromisso.component.css'],
})
export class ExcluirCompromissoComponent implements OnInit {
  compromissoVM?: VisualizarCompromissoViewModel;

  constructor(
    private compromissosService: CompromissosService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.compromissoVM = this.route.snapshot.data['compromisso'];
  }

  gravar() {
    this.compromissosService.excluir(this.compromissoVM!.id).subscribe(() => {
      this.toastrService.success(
        `O compromisso foi excluído com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/compromissos', 'listar']);
    });
  }
}
