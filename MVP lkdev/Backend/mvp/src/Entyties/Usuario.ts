import { Transacao } from './Transacao';
export class Usuario {
  public uid: number;
  public nome: string;
  public sobrenome: string;
  public rendaMensal: number;
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
  public adicionarTransacao(): void {}
  public removerTransacao(id: string): void {}

  public calcularSaldo(): number {
    let saldo = 0;
    this.transacoes.forEach((i) => {
      if (i.categoria == 'Lucro') {
        saldo += i.valor;
        console.log(`O seu saldo é de $${saldo}`);
        return saldo;
      } else {
        saldo -= i.valor;
        console.log(`O seu saldo é de $${saldo}`);
        return saldo;
      }
    });
  }
}
