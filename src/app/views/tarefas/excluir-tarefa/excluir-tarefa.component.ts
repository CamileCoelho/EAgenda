import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisualizarTarefaViewModel } from '../models/visualizar-tarefa.view-model';
import { TarefasService } from '../services/tarefas.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-excluir-tarefa',
  templateUrl: './excluir-tarefa.component.html',
  styleUrls: ['./excluir-tarefa.component.css'],
})
export class ExcluirTarefaComponent implements OnInit {
  tarefaVM?: VisualizarTarefaViewModel;

  constructor(
    private tarefasService: TarefasService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['tarefa'])).subscribe({
      next: (tarefa) => this.obterTarefa(tarefa),
      error: (erro) => this.processarFalha(erro),
    });
  }

  gravar() {
    this.tarefasService.excluir(this.tarefaVM!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  obterTarefa(tarefa: VisualizarTarefaViewModel) {
    this.tarefaVM = tarefa;
  }

  processarSucesso() {
    this.toastrService.success(`A tarefa foi excluída com sucesso!`, 'Sucesso');

    this.router.navigate(['/tarefas', 'listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
