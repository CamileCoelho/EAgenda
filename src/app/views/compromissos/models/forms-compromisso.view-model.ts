import { TipoLocalCompromissoEnum } from './tipo-local-compromisso.enum';

export type FormsCompromissoViewModel = {
  assunto: string;
  tipoLocal: TipoLocalCompromissoEnum;
  link: string;
  local: string;

  data: Date;
  horaInicio: string;
  horaTermino: string;

  contatoId?: string;
};
