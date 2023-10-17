import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListarTarefaViewModel } from '../models/listar-tarefa.view-model';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-tarefas',
  templateUrl: './listar-tarefas.component.html',
  styleUrls: ['./listar-tarefas.component.css'],
})
export class ListarTarefasComponent implements OnInit {
  tarefas: ListarTarefaViewModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['tarefas'])).subscribe({
      next: (tarefas) => this.obterTarefas(tarefas),
      error: (erro) => this.processarFalha(erro),
    });
  }

  obterTarefas(tarefas: ListarTarefaViewModel[]) {
    this.tarefas = tarefas;
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Erro');
  }
}
