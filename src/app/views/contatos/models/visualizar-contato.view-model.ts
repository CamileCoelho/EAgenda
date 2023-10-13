export class VisualizarContatoViewModel {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  empresa: string;

  constructor(
    id: string,
    nome: string,
    email: string,
    telefone: string,
    cargo: string,
    empresa: string
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.cargo = cargo;
    this.empresa = empresa;
  }
}
