# 📱 Vult Finance - Gerenciador Financeiro Mobile

Aplicativo mobile desenvolvido em **React Native** com **Expo** para controle de finanças pessoais, atendendo aos requisitos de persistência real de dados em **SQLite** e ciclo **CRUD completo**.

---

## 📌 Sobre o Projeto

O **Vult Finance** permite gerenciar movimentações financeiras (receitas e despesas) de forma simples e rápida. O aplicativo conta com visualização centralizada de saldos no Dashboard, histórico detalhado com filtros por categoria/tipo e formulário dinâmico para cadastro e edição de transações.

---

## 🎯 Requisitos Técnicos Atendidos

* **Interface Mobile Funcional:** Duas telas integradas via Bottom Tab Navigation e formulário exibido via janela modal.
* **CRUD Completo:**
  * **Create:** Cadastro de receitas e despesas com descrição, valor, categoria e data.
  * **Read:** Listagem de dados no Dashboard (resumo) e na tela de Histórico (com filtragem).
  * **Update:** Edição total dos dados de qualquer registro já salvo.
  * **Delete:** Remoção de transações com confirmação prévia via alerta nativo.
* **Persistência Real:** Armazenamento resiliente entre sessões utilizando banco de dados SQLite local.

---

## ⚖️ Justificativa Técnica: SQLite vs. AsyncStorage

Optamos pelo **SQLite (`expo-sqlite`)** em detrimento do AsyncStorage pelos seguintes motivos:

1. **Cálculos e Agregações Nativas:** O SQLite permite realizar a soma de saldos diretamente no banco através de queries SQL (`SELECT SUM(valor)... WHERE tipo = 'receita'`). No AsyncStorage, seria necessário carregar todo o histórico de dados em memória JavaScript para iterar e calcular os saldos.
2. **Performance e Escala:** O processamento nativo do SQLite consome menos memória do dispositivo e mantém o app rápido mesmo com centenas de transações gravadas.
3. **Integridade de Dados:** O banco relacional garante tipos de dados estritos (`REAL`, `TEXT`, `INTEGER`), evitando falhas de conversão de tipos comuns ao salvar JSONs simples em chave-valor.

---

## 🏗️ Arquitetura e Estrutura de Pastas

O projeto adota uma arquitetura modular com separação clara de responsabilidades (camada de dados isolada das telas e componentes visuais):


prism-finance/
├── src/
│   ├── database/
│   │   ├── init.js                     # Inicialização do banco e criação da tabela
│   │   └── transactionRepository.js    # Módulo com todas as consultas SQL (CRUD)
│   ├── components/
│   │   ├── SummaryCards.js             # Cards do topo (Saldo, Receita e Despesa)
│   │   ├── TransactionItem.js          # Item individual da lista com botões de ação
│   │   └── TransactionModal.js         # Modal para criar e editar transações
│   ├── screens/
│   │   ├── DashboardScreen.js          # Tela 1: Visão geral e últimas movimentações
│   │   └── HistoryScreen.js            # Tela 2: Filtros avançados e lista completa
│   └── navigation/
│       └── AppNavigator.js             # Configuração da navegação por abas
├── App.js                              # Ponto de entrada do aplicativo
├── package.json
└── README.md