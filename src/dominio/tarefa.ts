export class Tarefa{

  id: number;
  titulo: string;
  dataCriacao: string;
  dataConclusao: string;
  categoria: string;
  statusConclusao:string;


  constructor(titulo:string, dataCri:string, dataConcl:string, categoria:string, statusConclusao:string){
    this.id = Math.floor(Math.random() * 65536);
    this.titulo = titulo;
    this.dataConclusao = dataConcl;
    this.dataCriacao = dataCri;
    this.categoria = categoria;
    this.statusConclusao = statusConclusao;
  }
}