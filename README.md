# 💰 MVP-Wallet (Fullstack)

O **MVP-Wallet** é uma plataforma robusta de gestão financeira pessoal. O projeto foi desenvolvido para oferecer um controle rigoroso de entradas (lucros) e saídas (despesas), garantindo persistência de dados e uma interface reativa.

---

## 🏗️ Arquitetura do Sistema

A aplicação utiliza uma arquitetura **Client-Server** desacoplada, garantindo que o frontend e o backend possam evoluir de forma independente.

### 🔄 Fluxo de Comunicação
1.  **Frontend (React)**: Captura as intenções do usuário.
2.  **Camada de Transporte (API REST)**: Envia os dados formatados como **DTOs** (Data Transfer Objects).
3.  **Backend (Node.js/TypeScript)**: Processa as regras de negócio, gera IDs únicos e valida a operação.
4.  **Persistência (TypeORM/Postgres)**: O ORM mapeia as classes para o banco relacional, garantindo a integridade referencial.

### 📊 Modelagem de Dados (Entidades)
A arquitetura do banco de dados é baseada em um relacionamento **1:N (Um para Muitos)**:
- **Usuario**: Entidade principal que detém a posse das transações.
- **Transacao**: Cada registro financeiro que aponta para um `Usuario` através de uma *Foreign Key*.
- **TypeORM**: Atua como o cérebro da persistência, transformando objetos TypeScript em queries SQL eficientes.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend** ⚛️
- **React**: Biblioteca para construção da interface.
- **TypeScript**: Tipagem estrita para evitar erros em tempo de execução.
- **CSS Modules/Tailwind**: Estilização moderna e responsiva.

### **Backend** 🟢
- **Node.js**: Ambiente de execução.
- **TypeORM**: Mapeador objeto-relacional (ORM).
- **PostgreSQL**: Banco de dados relacional de alta performance.

---

## 🚀 Como Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone [https://github.com/lkznx7/MVP---Wallet.git](https://github.com/lkznx7/MVP---Wallet.git)
cd "MVP Wallet"
