import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CompromissosService } from '../services/compromissos.service';
import { ContatosService } from '../../contatos/services/contatos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view-model';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato.view-model';

@Component({
  selector: 'app-inserir-compromisso',
  templateUrl: './inserir-compromisso.component.html',
  styleUrls: ['./inserir-compromisso.component.css'],
})
export class InserirCompromissoComponent implements OnInit {
  form?: FormGroup;

  compromissoFormVM?: FormsCompromissoViewModel;
  contatos: ListarContatoViewModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private compromissosService: CompromissosService,
    private contatosService: ContatosService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      assunto: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      tipoLocal: new FormControl(0, [Validators.required]),
      link: new FormControl(''),
      local: new FormControl(''),
      data: new FormControl('09/10/2023', [Validators.required]),
      horaInicio: new FormControl('08:00', [Validators.required]),
      horaTermino: new FormControl('09:00', [Validators.required]),
      contatoId: new FormControl(''),
    });

    this.contatosService
      .selecionarTodos()
      .subscribe(
        (contatosCadastrados) => (this.contatos = contatosCadastrados)
      );
  }

  gravar() {
    if (this.form?.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }

      return;
    }

    this.compromissosService.inserir(this.form?.value).subscribe((res) => {
      this.toastrService.success(
        `O compromisso "${res.assunto}" foi salvo com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/compromissos', 'listar']);
    });
  }
}
