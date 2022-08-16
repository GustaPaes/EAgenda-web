export class Contato{

  id: number;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo:string;


  constructor(nome:string, email:string, telefone:string, empresa:string, cargo:string){
    this.id = Math.floor(Math.random() * 65536);
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.empresa = empresa;
    this.cargo = cargo;
  }
}