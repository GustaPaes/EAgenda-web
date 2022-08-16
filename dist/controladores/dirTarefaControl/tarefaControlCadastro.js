import { Tarefa } from "../../dominio/tarefa.js";
import { TarefaEditarLocalStorage } from "../../repositorios/tarefaRepositorio/tarefaEditarLocalStorage.js";
import { TarefaLocalStorage } from "../../repositorios/tarefaRepositorio/tarefaLocalStorage.js";
//formulario
const submitFormulario = document.getElementById("formularioTarefa");
//btn
const btnSalvarTarefa = document.getElementById("salvarTarefa");
//campos dados
const selectStarusTarefa = document.getElementById("statusConclusao");
const selectPrioridadeTarefa = document.getElementById("prioridade");
const dataConclusaoTarefa = document.getElementById("dataConclusao");
const dataCriacaoTarefa = document.getElementById("dataCriacao");
const tituloTarefa = document.getElementById("titulo");
const id = document.getElementById("campoIdentificacao");
const campodata1 = document.getElementById("campodata1");
const campodata2 = document.getElementById("campodata2");
function tentarGravarTarefa(tarefa) {
    const repo = new TarefaLocalStorage();
    const dados = repo.selecionarTodos();
    let validaParaInsercao = validarTarefa(tarefa, dados);
    if (validaParaInsercao) {
        dados.push(tarefa);
        repo.inserir(dados);
        return true;
    }
    return false;
}
function tentarEditarTarefa(tarefa) {
    const repo = new TarefaLocalStorage();
    const dados = repo.selecionarTodos();
    let validacaoTarefa = validarTarefa(tarefa, dados);
    if (validacaoTarefa) {
        let tar = dados.findIndex(x => x.id == tarefa.id);
        dados[tar] = tarefa;
        repo.inserir(dados);
        return true;
    }
    else
        return false;
}
function validarTarefa(tarefa, dados) {
    let tarefaComMesmoNome = dados.find(x => x.titulo == tarefa.titulo);
    if (tarefaComMesmoNome == undefined)
        return true;
    if (tarefa.id === (tarefaComMesmoNome === null || tarefaComMesmoNome === void 0 ? void 0 : tarefaComMesmoNome.id))
        return true;
    alert("Tarefas não poder possuir o mesmo nome.");
    return false;
}
function preencherCampos(tarefa) {
    selectStarusTarefa.value = tarefa.statusConclusao;
    selectPrioridadeTarefa.value = tarefa.categoria;
    dataConclusaoTarefa.value = tarefa.dataConclusao;
    dataCriacaoTarefa.value = tarefa.dataCriacao;
    tituloTarefa.value = tarefa.titulo;
    id.value = tarefa.id.toString();
}
function PegarObjetoTela() {
    const statusTarefa = selectStarusTarefa.value;
    const prioridade = selectPrioridadeTarefa.value;
    const dataConclusao = dataConclusaoTarefa.value;
    const dataCriacao = dataCriacaoTarefa.value;
    const titulo = tituloTarefa.value;
    let tarefa = new Tarefa(titulo, dataCriacao, dataConclusao, prioridade, statusTarefa);
    if (id.value === "0")
        return tarefa;
    tarefa.id = parseInt(id.value);
    return tarefa;
}
window.onload = function () {
    let editar = new TarefaEditarLocalStorage();
    let tarefa = editar.seleciona();
    editar.excluir();
    if (tarefa) {
        preencherCampos(tarefa);
        campodata1.hidden = true;
        campodata2.hidden = true;
    }
};
submitFormulario.addEventListener("submit", function (event) {
    const tarefa = PegarObjetoTela();
    if (tarefa == undefined) {
        event.preventDefault();
    }
    else if (id.value === "0") {
        let podeContinuar = tentarGravarTarefa(tarefa);
        if (!podeContinuar)
            event.preventDefault();
    }
    else if (id.value !== "0") {
        let podeContinuar = tentarEditarTarefa(tarefa);
        if (!podeContinuar)
            event.preventDefault();
    }
}, true);
