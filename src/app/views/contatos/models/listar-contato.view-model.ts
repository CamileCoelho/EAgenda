export class ListarContatoViewModel {
  id: string;
  nome: string;
  telefone: string;

  constructor(id: string, nome: string, telefone: string) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
  }
}
