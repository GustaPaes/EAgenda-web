import { Contato } from "../../dominio/contato";
import { IEditaRegistro } from "../../interfaces/IEditaRegistro";

export class ContatoEditarLocalStorage implements IEditaRegistro {

  private readonly localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }
  
  seleciona() {
    const jsonDados = this.localStorage.getItem("editarContato");

    if (jsonDados) {
      let tar = JSON.parse(jsonDados)
      return tar;
    }

    return undefined;  
  }

  inserir(dados: Contato): void {
    const jsonDados = JSON.stringify(dados);
    this.localStorage.setItem("editarContato", jsonDados);
  }

  excluir(): void {
    this.localStorage.removeItem("editarContato");
  }


}
