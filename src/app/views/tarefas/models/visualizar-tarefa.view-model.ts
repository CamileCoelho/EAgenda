import { VisualizarItemTarefaViewModel } from './visualizar-item-tarefa.view-model';

export type VisualizarTarefaViewModel = {
  id: string;
  titulo: string;
  dataCriacao: Date;
  dataConclusao?: Date;

  quantidadeItens: number;
  percentualConcluido: number;

  prioridade: string;
  situacao: string;

  itens: VisualizarItemTarefaViewModel[];
};
