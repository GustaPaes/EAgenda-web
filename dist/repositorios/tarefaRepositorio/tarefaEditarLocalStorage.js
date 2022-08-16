export class TarefaEditarLocalStorage {
    constructor() {
        this.localStorage = window.localStorage;
    }
    seleciona() {
        const jsonDados = this.localStorage.getItem("edicaoTarefa");
        if (jsonDados) {
            let tar = JSON.parse(jsonDados);
            return tar;
        }
        return undefined;
    }
    inserir(dados) {
        const jsonDados = JSON.stringify(dados);
        this.localStorage.setItem("edicaoTarefa", jsonDados);
    }
    excluir() {
        this.localStorage.removeItem("edicaoTarefa");
    }
}
