import { EntidadeBase } from "../../shared/entidade.model.js";

export class Contato extends EntidadeBase {
  public nome: string;
  public telefone: string;
  public acao: string;

  constructor(nome: string, telefone: string, acao: string, id?: string) {
    super();

    if (id) {
      this.id = id;
    }

    this.nome = nome;
    this.telefone = telefone;
    this.acao = acao;
  }
}