export class ContatoLocalStorage {
    constructor() {
        this.localStorage = window.localStorage;
    }
    inserir(dados) {
        const jsonDados = JSON.stringify(dados);
        this.localStorage.setItem("contatos", jsonDados);
    }
    excluir(id) {
        const tar = this.selecionarId(id);
        const dados = this.selecionarTodos();
        dados.splice(dados.findIndex(x => x.id == (tar === null || tar === void 0 ? void 0 : tar.id)), 1);
        this.localStorage.removeItem("contatos");
        this.inserir(dados);
    }
    selecionarTodos() {
        const jsonDados = this.localStorage.getItem("contatos");
        if (jsonDados) {
            let tar = JSON.parse(jsonDados);
            return tar;
        }
        else {
            let lista = [];
            return lista;
        }
    }
    selecionarId(id) {
        const dados = this.selecionarTodos();
        return dados.find(x => x.id == id);
    }
}
