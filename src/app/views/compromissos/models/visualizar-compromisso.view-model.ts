import { ListarContatoViewModel } from '../../contatos/models/listar-contato.view-model';
import { TipoLocalCompromissoEnum } from './tipo-local-compromisso.enum';

export type VisualizarCompromissoViewModel = {
  id: string;
  assunto: string;
  tipoLocal: TipoLocalCompromissoEnum;
  link: string;
  local: string;

  data: Date;
  horaInicio: string;
  horaTermino: string;

  contato?: ListarContatoViewModel;
};
