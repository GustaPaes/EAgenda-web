import { TarefaEditarLocalStorage } from "../../repositorios/tarefaRepositorio/tarefaEditarLocalStorage.js";
import { TarefaLocalStorage } from "../../repositorios/tarefaRepositorio/tarefaLocalStorage.js";
//objetos da tela
const tabelaTarefas = document.getElementById("tabelaTarefas");
const localStorage = new TarefaLocalStorage();
const selectFiltroBusca = document.getElementById("filtroDeBusca");
function alimentarTarefasTabela(listaTarefas) {
    if (listaTarefas == undefined)
        return;
    const linhasTabela = document.querySelectorAll(".linhasTabela");
    linhasTabela.forEach(lst => {
        lst.remove();
    });
    listaTarefas.forEach(tarefa => {
        let linha = tabelaTarefas.insertRow();
        linha.className = "linhasTabela";
        let coluna1 = linha.insertCell();
        let coluna2 = linha.insertCell();
        let coluna3 = linha.insertCell();
        let coluna4 = linha.insertCell();
        let coluna5 = linha.insertCell();
        let valor = tarefa.id;
        coluna1.innerHTML = "<b>" + valor + "</b>";
        coluna2.innerHTML = "<td>" + tarefa.titulo + "</td>";
        coluna3.innerHTML = "<td>" + tarefa.categoria.toString() + "</td>";
        coluna4.innerHTML = "<td>" + tarefa.statusConclusao + "%</td>";
        let botao1 = "<a href='../html/cadastroTarefa.html'>" +
            "<button  class='btn btn-primary editar' value='" + valor + "' style='width: 40px;' >" +
            "<i class='bi bi-pencil text-light'></i>"
            + "</button>" +
            "</a>";
        botao1 +=
            "<button  class='btn btn-primary excluir ' style='width: 40px; ' value='" + valor + "' style='width: 40px;' >" +
                "<i class='bi bi-trash text-light'></i>"
                + "</button>";
        coluna5.innerHTML = botao1;
    });
}
selectFiltroBusca.addEventListener("change", function () {
    let tarefas = localStorage.selecionarTodos();
    let valor = selectFiltroBusca.value;
    switch (valor) {
        case "0":
            return alimentarTarefasTabela(localStorage.selecionarTodos());
        case "1":
            let tarefas = localStorage.selecionarTodos();
            tarefas.sort(function (x, z) {
                if (pegarValor(x.categoria) > pegarValor(z.categoria))
                    return 1;
                return -1;
            });
            alimentarTarefasTabela(tarefas);
            return;
        case "2":
            let lista = localStorage.selecionarTodos();
            lista.sort(function (x, z) {
                if (pegarValor(x.categoria) > pegarValor(z.categoria))
                    return -1;
                return 1;
            });
            alimentarTarefasTabela(lista);
            return;
        case "3":
            let lista2 = localStorage.selecionarTodos();
            let novalista = lista2.filter(x => x.statusConclusao === "100");
            alimentarTarefasTabela(novalista);
            return;
        case "4":
            let lista3 = localStorage.selecionarTodos();
            let novalista2 = lista3.filter(x => x.statusConclusao !== "100");
            alimentarTarefasTabela(novalista2);
            return;
    }
});
function pegarValor(str) {
    if (str === "Alta")
        return 3;
    if (str === "Normal")
        return 2;
    return 1;
}
function excluirPorId(id) {
    localStorage.excluir(id);
    location.reload();
}
function editarPorId(id) {
    let editar = new TarefaEditarLocalStorage();
    let tarefa = localStorage.selecionarId(id);
    editar.inserir(tarefa);
}
window.onload = function () {
    alimentarTarefasTabela(localStorage.selecionarTodos());
    var botoesEditar = document.querySelectorAll(".editar");
    var botoesExcluir = document.querySelectorAll(".excluir");
    for (var i = 0; i < botoesEditar.length; i++) {
        let botao = botoesEditar[i];
        botao.addEventListener("click", function () {
            let valor = parseInt(botao.value);
            editarPorId(valor);
        });
    }
    for (var i = 0; i < botoesExcluir.length; i++) {
        let botao = botoesExcluir[i];
        botao.addEventListener("click", function () {
            let valor = parseInt(botao.value);
            excluirPorId(valor);
        });
    }
};
