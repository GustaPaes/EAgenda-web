export class Contato {
    constructor(nome, email, telefone, empresa, cargo) {
        this.id = Math.floor(Math.random() * 65536);
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.empresa = empresa;
        this.cargo = cargo;
    }
}
