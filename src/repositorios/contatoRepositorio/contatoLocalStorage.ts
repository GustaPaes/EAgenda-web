import { Contato } from "../../dominio/contato";
import { IRepositorio } from "../../interfaces/IRepositorio";

export class ContatoLocalStorage implements IRepositorio {

  private readonly localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  inserir(dados: Contato[]): void {
    const jsonDados = JSON.stringify(dados);
    this.localStorage.setItem("contatos", jsonDados);
  }

  excluir(id: number): void {
    const tar = this.selecionarId(id);

    const dados = this.selecionarTodos();

    dados.splice(dados.findIndex(x => x.id == tar?.id), 1);
    this.localStorage.removeItem("contatos");
    this.inserir(dados);
  }

  selecionarTodos(): Contato[]  {
    const jsonDados = this.localStorage.getItem("contatos");

    if (jsonDados) {
      let tar = JSON.parse(jsonDados)
      return tar;
    } else {
      let lista: Contato[] = [];
      return lista;
    }
  }

  selecionarId(id: number) {
    const dados = this.selecionarTodos();
    return dados.find(x => x.id == id);
  }


}