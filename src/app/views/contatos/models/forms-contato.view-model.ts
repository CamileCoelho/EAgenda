export class FormsContatoViewModel {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  empresa: string;

  constructor(
    nome: string,
    email: string,
    telefone: string,
    cargo: string,
    empresa: string
  ) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.cargo = cargo;
    this.empresa = empresa;
  }
}
