import { IEditaRegistro } from "../../interfaces/IEditaRegistro";

export class TarefaEditarLocalStorage implements IEditaRegistro {

  private readonly localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }
  
  seleciona() {
    const jsonDados = this.localStorage.getItem("edicaoTarefa");

    if (jsonDados) {
      let tar = JSON.parse(jsonDados)
      return tar;
    }

    return undefined;  
  }

  inserir(dados: any): void {
    const jsonDados = JSON.stringify(dados);
    this.localStorage.setItem("edicaoTarefa", jsonDados);
  }

  excluir(): void {
    this.localStorage.removeItem("edicaoTarefa");
  }


}
