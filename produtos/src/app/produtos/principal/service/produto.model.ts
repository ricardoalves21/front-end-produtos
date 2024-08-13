import { Cidade } from "./cidade.model";

export interface Produto {
  id?: number;
  nome: string;
  valor: number;
  estoque: number;
  cidade: Cidade;
}
