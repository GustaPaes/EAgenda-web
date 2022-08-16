export class RepositorioLocalStorage {
    constructor() {
        this.localStorage = window.localStorage;
    }
    inserir(dados) {
        const jsonDados = JSON.stringify(dados);
        this.localStorage.setItem("historico", jsonDados);
    }
    excluir() {
        this.localStorage.removeItem("historico");
    }
    selecionarTodos() {
        const jsonDados = this.localStorage.getItem("historico");
        if (jsonDados) {
            return JSON.parse(jsonDados);
        }
        else {
            return [];
        }
    }
}
