import { Contato } from "../../dominio/contato.js";
import { ContatoEditarLocalStorage } from "../../repositorios/contatoRepositorio/contatoEditarLocalStorage.js";
import { ContatoLocalStorage } from "../../repositorios/contatoRepositorio/contatoLocalStorage.js";
//inputs
const cargo = document.getElementById("cargo");
const empresa = document.getElementById("empresa");
const telefone = document.getElementById("telefone");
const email = document.getElementById("email");
const nome = document.getElementById("nome");
const id = document.getElementById("campoIdentificacao");
//formulario
const submitFormulario = document.getElementById("formularioContato");
window.onload = function () {
    let editar = new ContatoEditarLocalStorage();
    let contato = editar.seleciona();
    editar.excluir();
    if (contato) {
        preencherCampos(contato);
    }
};
submitFormulario.addEventListener("submit", function (event) {
    const contato = PegarObjetoTela();
    if (contato == undefined) {
        event.preventDefault();
    }
    else if (id.value === "0") {
        let podeContinuar = tentarGravarContato(contato);
        if (!podeContinuar)
            event.preventDefault();
    }
    else if (id.value !== "0") {
        let podeContinuar = tentarEditarContato(contato);
        if (!podeContinuar)
            event.preventDefault();
    }
}, true);
function validarContato(contato, dados) {
    //validar nome 
    if (!validarNome(contato, dados))
        return false;
    //validar Email 
    if (!validarEmail(contato, dados))
        return false;
    //validar Telefone   
    if (!validarTelefone(contato, dados))
        return false;
    return true;
}
function validarTelefone(contato, dados) {
    let contatoComMesmoTelefone = dados.find(x => x.telefone === contato.telefone);
    if (contatoComMesmoTelefone == undefined)
        return true;
    if (contato.id === (contatoComMesmoTelefone === null || contatoComMesmoTelefone === void 0 ? void 0 : contatoComMesmoTelefone.id))
        return true;
    alert("Contatos não podem usar Telefones repetidos. ");
    return false;
}
function validarEmail(contato, dados) {
    let contatoComMesmoEmail = dados.find(x => x.email === contato.email);
    if (contatoComMesmoEmail == undefined)
        return true;
    if (contato.id === (contatoComMesmoEmail === null || contatoComMesmoEmail === void 0 ? void 0 : contatoComMesmoEmail.id))
        return true;
    alert("Contatos não podem usar Emails repetidos. ");
    return false;
}
function validarNome(contato, dados) {
    let contatoComMesmoNome = dados.find(x => x.nome === contato.nome);
    if (contatoComMesmoNome == undefined)
        return true;
    if (contato.id === (contatoComMesmoNome === null || contatoComMesmoNome === void 0 ? void 0 : contatoComMesmoNome.id))
        return true;
    alert("Contatos não podem usar nomes repetidos. ");
    return false;
}
function PegarObjetoTela() {
    let inputNome = nome.value;
    let inputEmail = email.value;
    let inputTelefone = telefone.value;
    let inputCargo = cargo.value;
    let inputEmpresa = empresa.value;
    let contato = new Contato(inputNome, inputEmail, inputTelefone, inputEmpresa, inputCargo);
    if (id.value === "0")
        return contato;
    contato.id = parseInt(id.value);
    return contato;
}
function tentarGravarContato(contato) {
    const repo = new ContatoLocalStorage();
    const dados = repo.selecionarTodos();
    let validaParaInsercao = validarContato(contato, dados);
    if (validaParaInsercao) {
        dados.push(contato);
        repo.inserir(dados);
        return true;
    }
    return false;
}
function tentarEditarContato(contato) {
    const repo = new ContatoLocalStorage();
    const dados = repo.selecionarTodos();
    let validacaoTarefa = validarContato(contato, dados);
    if (validacaoTarefa) {
        let tar = dados.findIndex(x => x.id == contato.id);
        dados[tar] = contato;
        repo.inserir(dados);
        return true;
    }
    else
        return false;
}
function preencherCampos(contato) {
    nome.value = contato.nome;
    email.value = contato.email;
    telefone.value = contato.telefone;
    cargo.value = contato.cargo;
    empresa.value = contato.empresa;
    id.value = contato.id;
}
