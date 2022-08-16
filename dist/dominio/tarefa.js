export class Tarefa {
    constructor(titulo, dataCri, dataConcl, categoria, statusConclusao) {
        this.id = Math.floor(Math.random() * 65536);
        this.titulo = titulo;
        this.dataConclusao = dataConcl;
        this.dataCriacao = dataCri;
        this.categoria = categoria;
        this.statusConclusao = statusConclusao;
    }
}
