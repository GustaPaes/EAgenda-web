export interface IRepositorio {

  inserir(dados: any[]): void;
  excluir(id:number): void;
  selecionarTodos(): any[] | undefined;
  selecionarId(id:number): any | undefined;
}