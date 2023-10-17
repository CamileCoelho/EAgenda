import { UsuarioTokenViewModel } from "./usuario-token.view-module";

export type TokenViewModel = {
  chave: string;
  dataExpiracao: Date;
  usuarioToken: UsuarioTokenViewModel;
}