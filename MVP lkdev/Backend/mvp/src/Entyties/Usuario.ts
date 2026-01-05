import { Transacao } from './Transacao';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryColumn()
  public uid: number;

  @Column()
  public nome: string;

  @Column()
  public sobrenome: string;

  @Column('decimal', { precision: 10, scale: 2 })
  public rendaMensal: number;

  @OneToMany(() => Transacao, (transacao) => transacao.usuario)
  public transacoes: Transacao[];

  constructor(
    uid: number,
    nome: string,
    sobrenome: string,
    rendaMensal: number,
    transacoes: Transacao[],
  ) {
    this.uid = uid;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.rendaMensal = rendaMensal;
    this.transacoes = transacoes;
  }

  public adicionarTransacao(t: Transacao): void {
    const gerarTrecho = (tamanho: number): string => {
      const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let resultado = '';
      for (let i = 0; i < tamanho; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres[indiceAleatorio];
      }
      return resultado;
    };

    const gerarIDFormatado = (): string => {
      const p1 = gerarTrecho(3);
      const p2 = gerarTrecho(4);
      const p3 = gerarTrecho(6);
      const p4 = gerarTrecho(7);
      return `${p1}-${p2}-${p3}-${p4}`;
    };

    const idFinal = gerarIDFormatado();

    const novTransacao = new Transacao(
      idFinal,
      t.valor,
      t.categoria,
      t.descricao,
      t.data,
      t.status,
    );

    this.transacoes.push(novTransacao);
  }

  public removerTransacao(id: string): void {
    this.transacoes = this.transacoes.filter((t) => t.id !== id);
  }

  public calcularSaldo(): number {
    let saldo = 0;

    this.transacoes.forEach((i) => {
      if (i.categoria === 'Lucro') {
        saldo += i.valor;
      } else if (i.categoria === 'Despesa') {
        saldo -= i.valor;
      }
    });

    return saldo;
  }
}