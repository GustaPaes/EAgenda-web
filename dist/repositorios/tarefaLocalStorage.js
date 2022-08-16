export class TarefaLocalStorage {
    constructor() {
        this.localStorage = window.localStorage;
    }
    selecionarId(id) {
        const dados = this.selecionarTodos();
        return dados.find(x => x.id == id);
    }
    inserir(dados) {
        const jsonDados = JSON.stringify(dados);
        this.localStorage.setItem("tarefa", jsonDados);
    }
    excluir(id) {
        const tar = this.selecionarId(id);
        const dados = this.selecionarTodos();
        dados.splice(dados.findIndex(x => x.id == (tar === null || tar === void 0 ? void 0 : tar.id)), 1);
        this.localStorage.removeItem("tarefa");
        this.inserir(dados);
    }
    selecionarTodos() {
        const jsonDados = this.localStorage.getItem("tarefa");
        if (jsonDados) {
            let tar = JSON.parse(jsonDados);
            return tar;
        }
        else {
            let lista = [];
            return lista;
        }
    }
}
