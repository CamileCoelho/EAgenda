import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ListarDespesaViewModel } from '../models/listar-despesa.view-model';

@Component({
  selector: 'app-listar-despesas',
  templateUrl: './listar-despesas.component.html',
  styleUrls: ['./listar-despesas.component.css'],
})
export class ListarDespesasComponent implements OnInit {
  despesas: ListarDespesaViewModel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.despesas = this.route.snapshot.data['despesas'];
  }
}
