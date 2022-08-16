import { ContatoEditarLocalStorage } from "../../repositorios/contatoRepositorio/contatoEditarLocalStorage.js";
import { ContatoLocalStorage } from "../../repositorios/contatoRepositorio/contatoLocalStorage.js";
const localStorage = new ContatoLocalStorage();
const tabelaContatos = document.getElementById("tabelaContatos");
function alimentarTarefasTabela(listaContatos) {
    if (listaContatos == undefined)
        return;
    const linhasTabela = document.querySelectorAll(".linhasTabela");
    linhasTabela.forEach(lst => {
        lst.remove();
    });
    listaContatos.forEach(contato => {
        let linha = tabelaContatos.insertRow();
        linha.className = "linhasTabela";
        let coluna1 = linha.insertCell();
        let coluna2 = linha.insertCell();
        let coluna3 = linha.insertCell();
        let coluna5 = linha.insertCell();
        let valor = contato.id;
        coluna1.innerHTML = "<b>" + valor + "</b>";
        coluna2.innerHTML = "<td>" + contato.nome + "</td>";
        coluna3.innerHTML = "<td>" + contato.telefone + "</td>";
        let botao1 = "<div >";
        botao1 += "<a href='../html/cadastroContato.html'>" +
            "<button  class='btn btn-primary editar' value='" + valor + "' style='width: 40px;' >" +
            "<i class='bi bi-pencil text-light'></i>"
            + "</button>" +
            "</a>";
        botao1 +=
            "<button  class='btn btn-primary excluir '  value='" + valor + "' style='width: 40px;' >" +
                "<i class='bi bi-trash text-light'></i>"
                + "</button>";
        botao1 += '</div>';
        coluna5.innerHTML = botao1;
    });
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
function editarPorId(id) {
    let editar = new ContatoEditarLocalStorage();
    let contato = localStorage.selecionarId(id);
    if (contato != undefined)
        editar.inserir(contato);
}
function excluirPorId(id) {
    localStorage.excluir(id);
    location.reload();
}
