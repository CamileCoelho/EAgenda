import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItemTarefaViewModel } from '../models/item-tarefa.view-model';
import { StatusItemTarefa } from '../models/status-item-tarefa.enum';
import { TarefasService } from '../services/tarefas.service';
import { FormsTarefaViewModel } from '../models/forms-tarefa.view-model';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css'],
})
export class EditarTarefaComponent implements OnInit {
  formTarefa?: FormGroup;
  tituloItemControl?: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private tarefasService: TarefasService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
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

    this.route.data.pipe(map((dados) => dados['tarefa'])).subscribe({
      next: (tarefa) => this.obterTarefa(tarefa),
      error: (erro) => this.processarFalha(erro),
    });
  }

  obterTarefa(tarefa: FormsTarefaViewModel) {
    this.formTarefa?.patchValue(tarefa);

    // Carregando itens no FormArray
    for (let itemCadastrado of tarefa.itens) {
      const novoItemGroup = this.formBuilder.group({
        id: [itemCadastrado.id],
        titulo: [itemCadastrado.titulo],
        status: [itemCadastrado.status],
        concluido: [itemCadastrado.concluido],
      });

      this.itens.push(novoItemGroup);
    }
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
    const grupo = this.itens.controls.at(index);

    const valorAtual = grupo?.get('status')?.value as StatusItemTarefa;

    const valorAlternado =
      valorAtual == StatusItemTarefa.Removido
        ? StatusItemTarefa.Inalterado
        : StatusItemTarefa.Removido;

    grupo?.patchValue({ status: valorAlternado });
  }

  concluirItem(index: number): void {
    const grupo = this.itens.controls.at(index);

    const valorAtual = grupo?.get('concluido')?.value as boolean;

    const valorAlternado = !valorAtual;

    grupo?.patchValue({ concluido: valorAlternado });
  }

  campoEstaInvalido(nome: string) {
    return (
      this.formTarefa!.get(nome)!.touched && this.formTarefa!.get(nome)!.invalid
    );
  }

  gravar(): void {
    if (this.formTarefa?.invalid) {
      const erros = this.formTarefa.validate();

      for (let erro of erros) this.toastrService.warning(erro);

      return;
    }

    const id = this.route.snapshot.paramMap.get('id')!;

    this.tarefasService.editar(id, this.formTarefa?.value).subscribe({
      next: (tarefa: FormsTarefaViewModel) => this.processarSucesso(tarefa),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(tarefa: FormsTarefaViewModel) {
    this.toastrService.success(
      `A tarefa "${tarefa.titulo}" foi editada com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/tarefas', 'listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
