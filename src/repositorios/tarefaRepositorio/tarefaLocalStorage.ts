import { Tarefa } from "../../dominio/tarefa";
import { IRepositorio } from "../../interfaces/IRepositorio";

export class TarefaLocalStorage implements IRepositorio {

  private readonly localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  selecionarId(id: number): Tarefa | undefined {
    const dados = this.selecionarTodos();
    return dados.find(x => x.id == id);
  }

  inserir(dados: Tarefa[]): void {
    const jsonDados = JSON.stringify(dados);
    this.localStorage.setItem("tarefa", jsonDados);
  }

  excluir(id: number): void {
    const tar = this.selecionarId(id);
    const dados = this.selecionarTodos();
    dados.splice(dados.findIndex(x => x.id == tar?.id), 1);
    this.localStorage.removeItem("tarefa");
    this.inserir(dados);
  }

  selecionarTodos(): Tarefa[] {
    const jsonDados = this.localStorage.getItem("tarefa");

    if (jsonDados) {
      let tar = JSON.parse(jsonDados)
      return tar;
    } else {
      let lista:Tarefa[] = [];      
      return lista;
    }

  }

}