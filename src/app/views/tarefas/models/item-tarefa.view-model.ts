import { StatusItemTarefa } from './status-item-tarefa.enum';

export type ItemTarefaViewModel = {
  id?: string;
  titulo: string;
  status: StatusItemTarefa;
  concluido: boolean;
};
