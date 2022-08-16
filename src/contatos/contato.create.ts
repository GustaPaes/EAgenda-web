import { IPaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./contato.model.js";
import { ContatoRepositoryLocalStorage } from "./contato.repository.local-storage.js";

class ContatoPaginaCadastro implements IPaginaHTML, IPaginaFormulario {
  private txtNome: HTMLInputElement;
  private txtTelefone: HTMLInputElement;
  private txtAcao: HTMLInputElement;

  private rdbPrioridade: HTMLInputElement;
  private btnSalvar: HTMLButtonElement;

  private idSelecionado: string;

  constructor(private repositorioContatos: IRepositorio<Contato>, id?: string) {

    this.configurarElementos();

    if (id) {
      this.idSelecionado = id;

      const contatoSelecionado = this.repositorioContatos.selecionarPorId(id);

      if (contatoSelecionado)
        this.preencherFormulario(contatoSelecionado);
    }
  }

  private preencherFormulario(contatoSelecionado: Contato) {
    this.txtNome.value = contatoSelecionado.nome;
    this.txtTelefone.value = contatoSelecionado.telefone;
    this.txtAcao.value = contatoSelecionado.acao;

    this.rdbPrioridade.checked = true;
  }

  configurarElementos(): void {
    this.txtNome = document.getElementById("txtNome") as HTMLInputElement;
    this.txtTelefone = document.getElementById("txtTelefone") as HTMLInputElement;
    this.txtAcao = document.getElementById("txtAcao") as HTMLInputElement;
    this.btnSalvar = document.getElementById("btnSalvarContato") as HTMLButtonElement;

    // operador discard _
    this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
  }

  gravarRegistros(): void {
    const contato = this.obterDadosFormulario();

    if (!this.idSelecionado)
      this.repositorioContatos.inserir(contato);
    else
      this.repositorioContatos.editar(contato.id, contato);

    // método para redirecionar usuario
    window.location.href = "contato.list.html";
  }

  private obterDadosFormulario(): Contato {
    const nome = this.txtNome.value;
    const telefone = this.txtTelefone.value;
    const acao = this.txtAcao.value;

    let contato = null;
    
    if (!this.idSelecionado)
    contato = new Contato(nome, telefone, acao);
    else
    contato = new Contato(nome, telefone, acao, this.idSelecionado);

    return contato;
  }
}

const params = new URLSearchParams(window.location.search);

const id = params.get("id") as string;

new ContatoPaginaCadastro(new ContatoRepositoryLocalStorage(), id);