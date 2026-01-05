export type CategoriaTransacao = 'Despesa' | 'Lucro';

export class Transacao {
  constructor(
    public id: string,
    public valor: number,
    public categoria: CategoriaTransacao,
    public data: Date,
    public descricao: string,
    public status: string,
  ) {}

  public marcarComoPago(): void {}

  public editarDados(novosDados: Partial<Transacao>): void {}
}
