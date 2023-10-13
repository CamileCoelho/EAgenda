import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';
import { CategoriasService } from '../services/categorias.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inserir-categoria',
  templateUrl: './inserir-categoria.component.html',
  styleUrls: ['./inserir-categoria.component.css'],
})
export class InserirCategoriaComponent implements OnInit {
  form?: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
    });
  }

  campoEstaInvalido(nome: string) {
    return this.form?.get(nome)!.touched && this.form?.get(nome)!.invalid;
  }

  gravar() {
    if (this.form?.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }

      return;
    }

    this.categoriasService.inserir(this.form?.value).subscribe((res) => {
      this.toastrService.success(
        `A categoria "${res.titulo}" foi cadastrada com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/categorias/listar']);
    });
  }
}
