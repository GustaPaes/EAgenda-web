export class ContatoEditarLocalStorage {
    constructor() {
        this.localStorage = window.localStorage;
    }
    seleciona() {
        const jsonDados = this.localStorage.getItem("editarContato");
        if (jsonDados) {
            let tar = JSON.parse(jsonDados);
            return tar;
        }
        return undefined;
    }
    inserir(dados) {
        const jsonDados = JSON.stringify(dados);
        this.localStorage.setItem("editarContato", jsonDados);
    }
    excluir() {
        this.localStorage.removeItem("editarContato");
    }
}
