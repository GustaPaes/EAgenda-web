import { Tarefa } from "../../dominio/tarefa.js";
import { TarefaEditarLocalStorage } from "../../repositorios/tarefaRepositorio/tarefaEditarLocalStorage.js";
import { TarefaLocalStorage } from "../../repositorios/tarefaRepositorio/tarefaLocalStorage.js";

//formulario
const submitFormulario = <HTMLFormElement>document.getElementById("formularioTarefa");
//btn
const btnSalvarTarefa = <HTMLButtonElement>document.getElementById("salvarTarefa");
//campos dados
const selectStarusTarefa = <HTMLSelectElement>document.getElementById("statusConclusao");
const selectPrioridadeTarefa = <HTMLSelectElement>document.getElementById("prioridade");
const dataConclusaoTarefa = <HTMLDataElement>document.getElementById("dataConclusao");
const dataCriacaoTarefa = <HTMLDataElement>document.getElementById("dataCriacao");
const tituloTarefa = <HTMLInputElement>document.getElementById("titulo");
const id = <HTMLInputElement>document.getElementById("campoIdentificacao");
const campodata1 = <HTMLLabelElement>document.getElementById("campodata1");
const campodata2 = <HTMLLabelElement>document.getElementById("campodata2");


function tentarGravarTarefa(tarefa: Tarefa): boolean {

  const repo = new TarefaLocalStorage();
  const dados = repo.selecionarTodos();

  let validaParaInsercao: boolean = validarTarefa(tarefa, dados);
  if (validaParaInsercao) {
    dados.push(tarefa)
    repo.inserir(dados);
    return true;
  }
  return false;

}

function tentarEditarTarefa(tarefa: Tarefa): boolean {
  const repo = new TarefaLocalStorage();
  const dados = repo.selecionarTodos();

  let validacaoTarefa = validarTarefa(tarefa, dados);
  if (validacaoTarefa) {
    let tar = dados.findIndex(x => x.id == tarefa.id)
    dados[tar] = tarefa
    repo.inserir(dados);
    return true;
  }
  else return false;

}
function validarTarefa(tarefa: Tarefa, dados: Tarefa[]): boolean {

  let tarefaComMesmoNome = dados.find(x => x.titulo == tarefa.titulo)
  if (tarefaComMesmoNome == undefined) return true;

  if (tarefa.id === tarefaComMesmoNome?.id) return true;

  alert("Tarefas não poder possuir o mesmo nome.");
  return false;
}

function preencherCampos(tarefa: Tarefa) {
  selectStarusTarefa.value = tarefa.statusConclusao;
  selectPrioridadeTarefa.value = tarefa.categoria;
  dataConclusaoTarefa.value = tarefa.dataConclusao;
  dataCriacaoTarefa.value = tarefa.dataCriacao;
  tituloTarefa.value = tarefa.titulo
  id.value = tarefa.id.toString();
}
function PegarObjetoTela(): Tarefa | undefined {

  const statusTarefa = selectStarusTarefa.value;
  const prioridade = selectPrioridadeTarefa.value;

  const dataConclusao = dataConclusaoTarefa.value;

  const dataCriacao = dataCriacaoTarefa.value;

  const titulo = tituloTarefa.value;

  let tarefa = new Tarefa(titulo, dataCriacao, dataConclusao, prioridade, statusTarefa);
  if (id.value === "0") return tarefa;
  tarefa.id = parseInt(id.value);
  return tarefa;
}

window.onload = function () {
  let editar: TarefaEditarLocalStorage = new TarefaEditarLocalStorage();
  let tarefa = editar.seleciona()
  editar.excluir();
  if (tarefa) {
    preencherCampos(tarefa);
    campodata1.hidden = true;
    campodata2.hidden = true
  }

}

submitFormulario.addEventListener("submit",
  function (event) {
    const tarefa = PegarObjetoTela();

    if (tarefa == undefined) {
      event.preventDefault();
    }
    else if (id.value === "0") {
      let podeContinuar = tentarGravarTarefa(tarefa);
      if (!podeContinuar) event.preventDefault();
    }
    else if (id.value !== "0") {
      let podeContinuar = tentarEditarTarefa(tarefa);
      if (!podeContinuar) event.preventDefault();

    }
  }
  , true);




