import { Tarefa } from "../dominio/tarefa.js";
import { TarefaLocalStorage } from "../repositorios/tarefaLocalStorage.js";
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
function tentarGravarTarefa(tarefa) {
    const repo = new TarefaLocalStorage();
    const dados = repo.selecionarTodos();
    dados.push(tarefa);
    repo.inserir(dados);
}
function PegarObjetoTela() {
    const statusTarefa = selectStarusTarefa.value;
    const prioridade = selectPrioridadeTarefa.value;
    const dataConclusao = dataConclusaoTarefa.value;
    const dataCriacao = dataCriacaoTarefa.value;
    const titulo = tituloTarefa.value;
    return new Tarefa(titulo, dataCriacao, dataConclusao, prioridade, statusTarefa);
}
submitFormulario.addEventListener("submit", function (event) {
    const tarefa = PegarObjetoTela();
    if (tarefa == undefined) {
        event.preventDefault();
    }
    else
        tentarGravarTarefa(tarefa);
}, true);
