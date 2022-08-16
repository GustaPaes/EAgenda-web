import { Tarefa } from "../dominio/tarefa";

export interface IEditaRegistro {

  inserir(dados: any): void;
  excluir(): void;
  seleciona(): any | undefined;

}
