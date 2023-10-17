import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ItemTarefaViewModel } from '../models/item-tarefa.view-model';
import { StatusItemTarefa } from '../models/status-item-tarefa.enum';
import { ToastrService } from 'ngx-toastr';
import { TarefasService } from '../services/tarefas.service';
import { Router } from '@angular/router';
import { FormsTarefaViewModel } from '../models/forms-tarefa.view-model';

@Component({
  selector: 'app-inserir-tarefa',
  templateUrl: './inserir-tarefa.component.html',
  styleUrls: ['./inserir-tarefa.component.css'],
})
export class InserirTarefaComponent implements OnInit {
  formTarefa?: FormGroup;
  tituloItemControl?: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private tarefasService: TarefasService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  get itens(): FormArray {
    return this.formTarefa?.get('itens') as FormArray;
  }

  ngOnInit(): void {
    this.formTarefa = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: [0, [Validators.required]],

      itens: new FormArray([]),
    });

    this.tituloItemControl = this.formBuilder.control('');
  }

  campoEstaInvalido(nome: string) {
    return (
      this.formTarefa!.get(nome)!.touched && this.formTarefa!.get(nome)!.invalid
    );
  }

  adicionarItem(): void {
    const item: ItemTarefaViewModel = {
      titulo: this.tituloItemControl?.value,
      status: StatusItemTarefa.Adicionado,
      concluido: false,
    };

    const novoItemGroup = this.formBuilder.group({
      titulo: [item.titulo],
      status: [item.status],
      concluido: [item.concluido],
    });

    this.itens.push(novoItemGroup);

    this.tituloItemControl?.reset();
  }

  removerItem(index: number): void {
    this.itens.removeAt(index);
  }

  gravar(): void {
    if (this.formTarefa?.invalid) {
      const erros = this.formTarefa.validate();

      for (let erro of erros) this.toastrService.warning(erro);

      return;
    }

    this.tarefasService.inserir(this.formTarefa?.value).subscribe({
      next: (tarefa: FormsTarefaViewModel) => this.processarSucesso(tarefa),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(tarefa: FormsTarefaViewModel) {
    this.toastrService.success(
      `A tarefa "${tarefa.titulo}" foi inserida com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/tarefas', 'listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
