import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContatosService } from '../../contatos/services/contatos.service';
import { CompromissosService } from '../services/compromissos.service';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato.view-model';
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view-model';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styleUrls: ['./editar-compromisso.component.css'],
})
export class EditarCompromissoComponent implements OnInit {
  form?: FormGroup;

  compromissoFormVM?: FormsCompromissoViewModel;
  contatos: ListarContatoViewModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private compromissosService: CompromissosService,
    private contatosService: ContatosService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
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

    this.compromissoFormVM = this.route.snapshot.data['compromisso'];

    this.form.patchValue(this.compromissoFormVM!);

    const dataFormatada = this.compromissoFormVM?.data
      ?.toString()
      .substring(0, 10);

    this.form.patchValue({ data: dataFormatada });
  }

  gravar() {
    if (this.form?.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }

      return;
    }

    const id = this.route.snapshot.paramMap.get('id')!;

    this.compromissosService.editar(id, this.form?.value).subscribe((res) => {
      this.toastrService.success(
        `O compromisso "${res.assunto}" foi salvo com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/compromissos', 'listar']);
    });
  }
}
