import { FormaPagamentoEnum } from "./forma-pagamento.enum";

export type VisualizarDespesaViewModel = {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: string;
  categoriasSelecionadas: string[];
};
