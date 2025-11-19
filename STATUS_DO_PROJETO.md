# 📊 STATUS DO PROJETO - Conecta Doações MVP

> **Dashboard de Progresso e Organização**  
> Acompanhe todas as etapas de desenvolvimento até a entrega final

**Prazo Final:** 01/12/2025, 23h59  
**Dias Restantes:** [Calcular]  
**Progresso Geral:** 0/95 tarefas (0%)

---

## 📅 LINHA DO TEMPO

```
Hoje -----> Fase 1 -----> Fase 2 -----> Fase 3 -----> Fase 4 -----> Fase 5 -----> 01/12/2025
         (2-3 dias)    (3-4 dias)    (5-7 dias)    (4-5 dias)    (3-4 dias)      ENTREGA
```

---

## 🎯 PROGRESSO POR FASE

| Fase | Descrição | Tarefas | Concluídas | % | Status |
|------|-----------|---------|------------|---|--------|
| 1 | Planejamento e Configuração | 4 | 0 | 0% | ⏳ Pendente |
| 2 | Backend/Database (Firebase) | 5 | 0 | 0% | ⏳ Pendente |
| 3 | Frontend/Interface | 11 | 0 | 0% | ⏳ Pendente |
| 4 | Validação com Público-Alvo | 7 | 0 | 0% | ⏳ Pendente |
| 5 | Finalização e Entrega | 7 | 0 | 0% | ⏳ Pendente |
| **FUNCIONALIDADES** | Módulos A-E | 15 | 0 | 0% | ⏳ Pendente |
| **DOCUMENTAÇÃO** | Docs obrigatórios | 6 | 0 | 0% | ⏳ Pendente |
| **VALIDAÇÃO** | Público-alvo | 10 | 0 | 0% | ⏳ Pendente |
| **ENTREGA** | Submissão final | 30 | 0 | 0% | ⏳ Pendente |

**TOTAL:** 0/95 tarefas concluídas

---

## 📍 FASE 1: PLANEJAMENTO E CONFIGURAÇÃO (2-3 dias)

**Meta:** Repositório configurado + Firebase ativo  
**Status:** ⏳ Não iniciado  
**Progresso:** 0/4 tarefas

### Tarefas:

- [ ] **1.1 Criar Repositório GitHub**
  - [ ] Criar repositório público no GitHub
  - [ ] Nome: `conecta-doacoes` (ou similar)
  - [ ] Adicionar `.gitignore` para Node.js/JavaScript
  - [ ] Criar estrutura de pastas obrigatória
  - [ ] Fazer commit inicial
  - [ ] Confirmar que repositório está PÚBLICO

- [ ] **1.2 Configurar Firebase**
  - [ ] Acessar [Firebase Console](https://console.firebase.google.com/)
  - [ ] Criar novo projeto "Conecta Doações"
  - [ ] Habilitar Firebase Authentication
  - [ ] Habilitar método de login: Email/Password
  - [ ] Criar banco de dados Firestore
  - [ ] Modo: Produção (com rules)
  - [ ] Obter credenciais do projeto (firebaseConfig)
  - [ ] Documentar credenciais em local seguro

- [ ] **1.3 Setup Frontend**
  - [ ] Criar pasta `frontend/web/`
  - [ ] Criar arquivo `index.html` base
  - [ ] Adicionar Bootstrap 5 via CDN
  - [ ] Adicionar Firebase SDK via CDN
  - [ ] Criar estrutura de pastas: `css/`, `js/`, `assets/`
  - [ ] Testar se arquivos carregam no navegador

- [ ] **1.4 Documentação Inicial**
  - [ ] Criar `README.md` básico na raiz
  - [ ] Incluir: nome do projeto, descrição breve
  - [ ] Incluir: tecnologias utilizadas
  - [ ] Incluir: instruções de setup (temporárias)
  - [ ] Fazer commit da estrutura inicial

**Entregáveis:**
- [ ] Repositório público no GitHub com estrutura completa
- [ ] Firebase configurado e credenciais obtidas
- [ ] Estrutura frontend básica funcionando

---

## 📍 FASE 2: BACKEND/DATABASE (3-4 dias)

**Meta:** Firebase 100% funcional + Lógica JS completa  
**Status:** ⏳ Não iniciado  
**Progresso:** 0/5 tarefas

### Tarefas:

- [ ] **2.1 Modelagem Firestore**
  - [ ] Criar collection `users` no Firestore Console
  - [ ] Criar collection `donations` no Firestore Console
  - [ ] Criar collection `messages` no Firestore Console
  - [ ] Documentar schema em `database/schema.md`
  - [ ] Testar criação manual de documentos

- [ ] **2.2 Security Rules**
  - [ ] Escrever rules para `users` (usuário lê/escreve apenas seus dados)
  - [ ] Escrever rules para `donations` (público lê, dono escreve)
  - [ ] Escrever rules para `messages` (remetente/destinatário apenas)
  - [ ] Testar rules no Firebase Console
  - [ ] Documentar rules em `database/security-rules.txt`

- [ ] **2.3 Autenticação (A1, A2)**
  - [ ] Criar arquivo `frontend/web/js/firebase-config.js`
  - [ ] Adicionar configuração do Firebase
  - [ ] Criar arquivo `frontend/web/js/auth.js`
  - [ ] Implementar função `signUp(name, email, password)`
  - [ ] Implementar função `signIn(email, password)`
  - [ ] Implementar função `signOut()`
  - [ ] Implementar gerenciamento de sessão (localStorage)
  - [ ] Testar cadastro e login manualmente

- [ ] **2.4 CRUD de Doações**
  - [ ] Criar arquivo `frontend/web/js/donations.js`
  - [ ] Implementar função `createDonation(data)`
  - [ ] Implementar função `getDonations(filters)`
  - [ ] Implementar função `getDonationById(id)`
  - [ ] Implementar função `updateDonation(id, data)`
  - [ ] Implementar função `deleteDonation(id)`
  - [ ] Implementar função `getUserDonations(userId)`
  - [ ] Testar todas as operações no console

- [ ] **2.5 Sistema de Mensagens**
  - [ ] Criar arquivo `frontend/web/js/messages.js`
  - [ ] Implementar função `sendMessage(donationId, receiverId, message)`
  - [ ] Implementar função `getReceivedMessages(userId)`
  - [ ] Implementar função `markAsRead(messageId)`
  - [ ] Testar envio e recebimento de mensagens

**Entregáveis:**
- [ ] Firestore com 3 collections configuradas
- [ ] Security Rules implementadas e testadas
- [ ] 3 arquivos JS com todas as funções CRUD
- [ ] Testes manuais realizados via console

---

## 📍 FASE 3: FRONTEND/INTERFACE (5-7 dias)

**Meta:** Interface completa + Integração Front-Back 100%  
**Status:** ⏳ Não iniciado  
**Progresso:** 0/11 tarefas

### Tarefas:

- [ ] **3.1 Criar Arquivo CSS Global**
  - [ ] Criar `frontend/web/css/styles.css`
  - [ ] Definir cores do tema (verde sustentável)
  - [ ] Definir tipografia e espaçamentos
  - [ ] Criar classes utilitárias

- [ ] **3.2 Navbar Global (E1)**
  - [ ] Criar componente navbar em todas as páginas
  - [ ] Logo "Conecta Doações" + slogan
  - [ ] Links: Home, Buscar Doações
  - [ ] Links dinâmicos quando logado: Meus Itens, Mensagens, Perfil, Sair
  - [ ] Links quando deslogado: Entrar, Cadastrar
  - [ ] Navbar responsiva (mobile-friendly)
  - [ ] Testar navegação

- [ ] **3.3 Footer (E3)**
  - [ ] Criar componente footer
  - [ ] Incluir informações sobre ODS 11
  - [ ] Links: Sobre, Como Funciona, Termos
  - [ ] Copyright com ano atual
  - [ ] Adicionar em todas as páginas

- [ ] **3.4 Tela Login/Cadastro (A1, A2)**
  - [ ] Criar `frontend/web/login.html`
  - [ ] Criar tabs "Entrar" e "Cadastrar"
  - [ ] Form de login: e-mail, senha, botão "Entrar"
  - [ ] Form de cadastro: nome, e-mail, senha, confirmar senha
  - [ ] Validação de campos (frontend)
  - [ ] Integração com `auth.js`
  - [ ] Mensagens de erro amigáveis
  - [ ] Link "Esqueceu sua senha?"
  - [ ] Redirecionar para home após login bem-sucedido
  - [ ] Testar fluxo completo

- [ ] **3.5 Home Page / Listagem de Doações (B1, B2)**
  - [ ] Criar `frontend/web/index.html`
  - [ ] Banner com logo e slogan no topo
  - [ ] Sidebar com filtros (categorias e localizações)
  - [ ] Campo de busca por nome do item
  - [ ] Grid de cards de doações (Bootstrap grid)
  - [ ] Card: foto, título, categoria, localização, condição
  - [ ] Botão "Ver Item" em cada card
  - [ ] Implementar busca em tempo real
  - [ ] Implementar filtros (checkboxes)
  - [ ] Carregar doações do Firestore
  - [ ] Testar responsividade

- [ ] **3.6 Tela de Detalhes do Item (B3, D1)**
  - [ ] Criar `frontend/web/detalhes.html`
  - [ ] Exibir foto grande do item
  - [ ] Exibir título, descrição completa
  - [ ] Exibir badges: categoria, condição, localização
  - [ ] Exibir informações do doador (nome)
  - [ ] Formulário de mensagem: textarea + botão "Enviar"
  - [ ] Validação: apenas usuários logados podem enviar
  - [ ] Integração com `messages.js`
  - [ ] Mensagem de sucesso após envio
  - [ ] Testar fluxo completo

- [ ] **3.7 Tela Cadastro de Doação (C1)**
  - [ ] Criar `frontend/web/nova-doacao.html`
  - [ ] Form: Nome do Item (text)
  - [ ] Form: Descrição Detalhada (textarea)
  - [ ] Form: Categoria (dropdown)
  - [ ] Form: Condição (dropdown)
  - [ ] Form: Localização (text)
  - [ ] Form: Foto do Item (URL ou upload)
  - [ ] Checkbox: "Declaro que o item está em condições..."
  - [ ] Botões: Cancelar e Cadastrar
  - [ ] Validação de campos obrigatórios
  - [ ] Integração com `donations.js`
  - [ ] Redirecionar para "Meus Itens" após sucesso
  - [ ] Testar cadastro completo

- [ ] **3.8 Tela Meus Itens (C2, C3, C4)**
  - [ ] Criar `frontend/web/meus-itens.html`
  - [ ] Sidebar com menu de navegação
  - [ ] Título "Gerenciar Minhas Doações"
  - [ ] Campo de busca local (nome/categoria)
  - [ ] Tabela ou cards com itens do usuário
  - [ ] Colunas: Foto, Nome, Categoria, Status
  - [ ] Botão "Editar" para cada item
  - [ ] Botão "Excluir" com confirmação
  - [ ] Integração com `donations.js`
  - [ ] Carregar apenas itens do usuário logado
  - [ ] Testar edição e exclusão

- [ ] **3.9 Tela Edição de Item**
  - [ ] Criar `frontend/web/editar-item.html`
  - [ ] Formulário idêntico ao cadastro (pré-preenchido)
  - [ ] Carregar dados do item via URL param (?id=xxx)
  - [ ] Permitir alterar todos os campos
  - [ ] Select de status: disponível, reservado, doado
  - [ ] Botão "Salvar Alterações"
  - [ ] Integração com `donations.js` (update)
  - [ ] Validação de campos
  - [ ] Voltar para "Meus Itens" após salvar
  - [ ] Testar fluxo completo

- [ ] **3.10 Tela Caixa de Mensagens (D2)**
  - [ ] Criar `frontend/web/mensagens.html`
  - [ ] Sidebar com menu de navegação
  - [ ] Título "Minhas Mensagens"
  - [ ] Listagem de mensagens recebidas
  - [ ] Exibir: nome remetente, item relacionado, mensagem, data
  - [ ] Badge "Lida" / "Não lida"
  - [ ] Clicar na mensagem: marca como lida
  - [ ] Link para ver o item relacionado
  - [ ] Integração com `messages.js`
  - [ ] Ordenar por data (mais recente primeiro)
  - [ ] Testar fluxo completo

- [ ] **3.11 Tratamento de Erros e Validações**
  - [ ] Implementar validação em todos os formulários
  - [ ] Mensagens de erro amigáveis (português)
  - [ ] Loading states (spinners) em operações async
  - [ ] Validar campos obrigatórios
  - [ ] Validar formato de e-mail
  - [ ] Validar tamanho mínimo de senha
  - [ ] Tratar erros do Firebase (auth, firestore)
  - [ ] Exibir mensagens de sucesso/erro (toasts ou alerts)
  - [ ] Testar todos os cenários de erro

**Entregáveis:**
- [ ] 7 páginas HTML completas e funcionais
- [ ] Todas as funcionalidades P0 implementadas
- [ ] Interface responsiva (mobile + desktop)
- [ ] Validações e tratamento de erros

---

## 📍 FASE 4: VALIDAÇÃO COM PÚBLICO-ALVO (4-5 dias)

**Meta:** Evidências concretas + Relatório de validação  
**Status:** ⏳ Não iniciado  
**Progresso:** 0/7 tarefas

### Tarefas:

- [ ] **4.1 Definir Público-Alvo ESPECÍFICO**
  - [ ] Identificar pessoa/instituição específica (nome completo)
  - [ ] Definir localização exata (endereço/bairro)
  - [ ] Obter contato (telefone/e-mail)
  - [ ] Documentar contexto e necessidades
  - [ ] Criar arquivo `validation/target_audience.md`
  - [ ] **ATENÇÃO:** Deve ser ESPECÍFICO, não genérico

- [ ] **4.2 Preparar Apresentação**
  - [ ] Criar apresentação/pitch do sistema
  - [ ] Preparar roteiro de demonstração
  - [ ] Definir funcionalidades a demonstrar
  - [ ] Preparar questionário de feedback
  - [ ] Agendar encontro com público-alvo

- [ ] **4.3 Realizar Validação (mínimo 3-5 pessoas)**
  - [ ] Apresentar o projeto para o público-alvo
  - [ ] Demonstrar o sistema funcionando
  - [ ] Permitir que testem pessoalmente
  - [ ] Registrar em foto/vídeo (COM AUTORIZAÇÃO)
  - [ ] Observar dificuldades e reações
  - [ ] Anotar comentários espontâneos

- [ ] **4.4 Coletar Feedback Estruturado**
  - [ ] Aplicar questionário:
    - [ ] "O sistema é fácil de usar?" (1-5)
    - [ ] "As funcionalidades atendem suas necessidades?" (1-5)
    - [ ] "O que você mais gostou?"
    - [ ] "O que precisa melhorar?"
    - [ ] "Você usaria este sistema? Por quê?"
    - [ ] "Sugestões de novas funcionalidades?"
  - [ ] Registrar todas as respostas
  - [ ] Salvar em `validation/feedback/`

- [ ] **4.5 Documentar Evidências**
  - [ ] Organizar fotos da validação
  - [ ] Organizar vídeos (se houver)
  - [ ] Capturar prints do sistema em uso
  - [ ] Obter depoimentos escritos (se possível)
  - [ ] Obter termo de autorização de uso de imagem
  - [ ] Salvar tudo em `validation/evidence/`

- [ ] **4.6 Implementar Ajustes Prioritários**
  - [ ] Listar feedbacks críticos
  - [ ] Priorizar melhorias viáveis
  - [ ] Implementar correções urgentes
  - [ ] Testar alterações
  - [ ] Documentar o que foi ajustado

- [ ] **4.7 Criar Relatório de Validação**
  - [ ] Criar `validation/validation_report.md`
  - [ ] Incluir: definição do público-alvo
  - [ ] Incluir: metodologia de validação
  - [ ] Incluir: resumo dos feedbacks
  - [ ] Incluir: análise dos resultados
  - [ ] Incluir: lista de ajustes implementados
  - [ ] Incluir: conclusões e aprendizados
  - [ ] Adicionar resumo no `README.md`

**Entregáveis:**
- [ ] `validation/target_audience.md` completo
- [ ] `validation/validation_report.md` completo
- [ ] Mínimo 5 fotos/vídeos em `validation/evidence/`
- [ ] Feedback de 3-5 pessoas em `validation/feedback/`
- [ ] Ajustes implementados e documentados

**⚠️ PENALIZAÇÃO:** -2,0 pontos se não realizar validação

---

## 📍 FASE 5: FINALIZAÇÃO E ENTREGA (3-4 dias)

**Meta:** Sistema completo + Docs + Deploy ativo  
**Status:** ⏳ Não iniciado  
**Progresso:** 0/7 tarefas

### Tarefas:

- [ ] **5.1 Implementar Testes Automatizados (OBRIGATÓRIO)**
  - [ ] Instalar Jest: `npm install --save-dev jest`
  - [ ] Criar pasta `frontend/web/tests/`
  - [ ] Criar testes para `auth.js` (signup, signin)
  - [ ] Criar testes para `donations.js` (CRUD)
  - [ ] Criar testes para `messages.js` (enviar, receber)
  - [ ] Executar testes: `npm test`
  - [ ] Documentar cobertura de testes
  - [ ] Corrigir falhas

- [ ] **5.2 Testes Manuais Completos**
  - [ ] Testar fluxo: cadastro → login → logout
  - [ ] Testar fluxo: criar doação → editar → excluir
  - [ ] Testar fluxo: buscar doação → ver detalhes → enviar mensagem
  - [ ] Testar fluxo: receber mensagem → marcar como lida
  - [ ] Testar filtros e busca
  - [ ] Testar em mobile (Chrome DevTools)
  - [ ] Testar em diferentes navegadores
  - [ ] Testar security rules (tentar acessos não autorizados)
  - [ ] Documentar bugs encontrados e corrigir

- [ ] **5.3 Documentação Técnica**
  - [ ] Criar `docs/requirements/requirements.md`:
    - [ ] Requisitos funcionais (lista completa)
    - [ ] Requisitos não-funcionais
    - [ ] Casos de uso principais
  - [ ] Criar `docs/architecture/architecture.md`:
    - [ ] Visão geral da arquitetura
    - [ ] Diagrama de componentes (opcional)
    - [ ] Tecnologias utilizadas
    - [ ] Integrações (Firebase)
  - [ ] Criar `docs/api/api_documentation.md`:
    - [ ] Documentar Firebase Auth
    - [ ] Documentar Firestore collections
    - [ ] Documentar Security Rules
    - [ ] Exemplos de queries

- [ ] **5.4 Deploy no Firebase Hosting**
  - [ ] Instalar Firebase CLI: `npm install -g firebase-tools`
  - [ ] Login: `firebase login`
  - [ ] Inicializar: `firebase init hosting`
  - [ ] Configurar pasta public: `frontend/web`
  - [ ] Criar arquivo `firebase.json`
  - [ ] Testar localmente: `firebase serve`
  - [ ] Fazer deploy: `firebase deploy`
  - [ ] Testar URL de produção
  - [ ] Documentar URL no README

- [ ] **5.5 Criar README.md Completo**
  - [ ] Seção 1: Título e Descrição
    - [ ] Nome: Conecta Doações
    - [ ] Descrição do propósito
    - [ ] Problema que soluciona
    - [ ] Vinculação com ODS 11
  - [ ] Seção 2: Funcionalidades Implementadas
    - [ ] Lista completa (com checkboxes)
    - [ ] Screenshots das telas principais
  - [ ] Seção 3: Tecnologias Utilizadas
    - [ ] Frontend: HTML, CSS, Bootstrap, JavaScript
    - [ ] Backend: Firebase (Auth + Firestore)
    - [ ] Deploy: Firebase Hosting
  - [ ] Seção 4: Arquitetura
    - [ ] Visão geral
    - [ ] Componentes principais
  - [ ] Seção 5: Instalação e Execução
    - [ ] Pré-requisitos
    - [ ] Passo a passo
    - [ ] Configuração do Firebase
  - [ ] Seção 6: Acesso ao Sistema
    - [ ] URL: [URL do Firebase Hosting]
    - [ ] Credenciais de teste (criar usuário demo)
  - [ ] Seção 7: Validação com Público-Alvo
    - [ ] Nome do público-alvo
    - [ ] Resumo da validação
    - [ ] Principais feedbacks
    - [ ] Link para relatório completo
  - [ ] Seção 8: Equipe
    - [ ] Nome completo (Matrícula)
    - [ ] [Outros membros se houver]
  - [ ] Seção 9: Estrutura do Projeto (opcional)
  - [ ] Seção 10: Links Importantes

- [ ] **5.6 Revisão Final**
  - [ ] Verificar estrutura de pastas (EXATAMENTE como especificado)
  - [ ] Verificar todos os arquivos obrigatórios:
    - [ ] `README.md` completo
    - [ ] `docs/requirements/requirements.md`
    - [ ] `docs/architecture/architecture.md`
    - [ ] `docs/api/api_documentation.md`
    - [ ] `database/schema.md`
    - [ ] `validation/target_audience.md`
    - [ ] `validation/validation_report.md`
  - [ ] Revisar todos os commits (mensagens claras)
  - [ ] Confirmar que repositório está PÚBLICO
  - [ ] Testar clone do repositório em máquina limpa
  - [ ] Testar instruções do README (seguir passo a passo)

- [ ] **5.7 Preparar Submissão no AVA**
  - [ ] Criar documento Word/PDF com:
    - [ ] Nome completo: [Seu nome]
    - [ ] Matrícula: [Sua matrícula]
    - [ ] Link do repositório GitHub (público)
    - [ ] Link do deploy (Firebase Hosting)
  - [ ] Verificar que todos os membros da equipe estão cadastrados no AVA
  - [ ] Fazer backup de todo o projeto
  - [ ] Preparar para submissão até 01/12/2025, 23h59

**Entregáveis:**
- [ ] Testes automatizados implementados
- [ ] Documentação técnica completa (3 arquivos)
- [ ] Deploy ativo e funcional
- [ ] README.md com todas as seções obrigatórias
- [ ] Repositório revisado e validado
- [ ] Documento de submissão pronto

---

## ⚙️ FUNCIONALIDADES DO MVP (15 funcionalidades)

**Status:** ⏳ Não iniciado  
**Progresso:** 0/15 funcionalidades

### 🔐 Módulo A: Autenticação

- [ ] **A1: Cadastro de Usuário** (P0)
  - Nome, E-mail e Senha → Firebase Auth + Firestore
  
- [ ] **A2: Login de Usuário** (P0)
  - E-mail e Senha → Firebase Auth
  
- [ ] **A3: Logout** (P0)
  - Encerrar sessão → Firebase Auth
  
- [ ] **A4: Recuperação de Senha** (P1)
  - Reset via e-mail → Firebase Auth

### 🏠 Módulo B: Navegação e Descoberta

- [ ] **B1: Home Page** (P0)
  - Listagem pública de doações disponíveis
  
- [ ] **B2: Busca e Filtro** (P0)
  - Filtros por Categoria, Localização e Condição
  
- [ ] **B3: Detalhes do Item** (P0)
  - Visualização completa de um item específico

### 📦 Módulo C: Gestão de Doações

- [ ] **C1: Cadastrar Doação** (P0)
  - Create: Nome, Descrição, Categoria, etc.
  
- [ ] **C2: Meus Itens** (P0)
  - Listagem de itens do usuário logado
  
- [ ] **C3: Editar Doação** (P0)
  - Update de itens próprios
  
- [ ] **C4: Excluir Doação** (P0)
  - Delete de itens próprios

### 💬 Módulo D: Interação e Perfil

- [ ] **D1: Enviar Mensagem** (P0)
  - Contato com doador via Firestore
  
- [ ] **D2: Caixa de Mensagens** (P0)
  - Visualização de mensagens recebidas
  
- [ ] **D3: Edição de Perfil** (P1)
  - Atualizar nome e informações do usuário

### 🧭 Módulo E: Componentes UI

- [ ] **E1: Navbar Global** (P0)
  - Menu responsivo com estados de autenticação

---

## 📄 DOCUMENTAÇÃO OBRIGATÓRIA (6 documentos)

**Status:** ⏳ Não iniciado  
**Progresso:** 0/6 documentos

- [ ] **README.md** (raiz do projeto)
  - [ ] Todas as 10 seções obrigatórias
  - [ ] Screenshots das telas principais
  - [ ] Instruções de instalação funcionais
  
- [ ] **docs/requirements/requirements.md**
  - [ ] Requisitos funcionais
  - [ ] Requisitos não-funcionais
  - [ ] Casos de uso
  
- [ ] **docs/architecture/architecture.md**
  - [ ] Arquitetura do sistema
  - [ ] Componentes principais
  - [ ] Tecnologias e integrações
  
- [ ] **docs/api/api_documentation.md**
  - [ ] Firebase Auth
  - [ ] Firestore Collections
  - [ ] Security Rules
  
- [ ] **database/schema.md**
  - [ ] Modelo de dados Firestore
  - [ ] Collections: users, donations, messages
  
- [ ] **validation/validation_report.md**
  - [ ] Relatório completo de validação
  - [ ] Evidências e feedbacks

---

## 👥 VALIDAÇÃO COM PÚBLICO-ALVO (10 itens)

**Status:** ⏳ Não iniciado  
**Progresso:** 0/10 itens

### Identificação Específica:
- [ ] Nome completo da pessoa/instituição
- [ ] Endereço ou localização exata
- [ ] Telefone ou e-mail de contato
- [ ] Contexto e necessidades específicas

### Contato e Apresentação:
- [ ] Registro de reunião/apresentação realizada
- [ ] Fotos ou vídeos (com autorização)
- [ ] Data e local do encontro

### Validação das Funcionalidades:
- [ ] Demonstração do sistema funcionando
- [ ] Público-alvo testou pessoalmente
- [ ] Feedback coletado sobre funcionalidades

### Documentação Completa:
- [ ] `validation/target_audience.md` com dados específicos
- [ ] `validation/validation_report.md` com relato detalhado
- [ ] `validation/evidence/` com fotos/vídeos/prints
- [ ] `validation/feedback/` com questionários
- [ ] Resumo no `README.md` principal

---

## 📤 CHECKLIST FINAL DE SUBMISSÃO (30 itens)

**Status:** ⏳ Não iniciado  
**Progresso:** 0/30 itens

### 📦 Implementação Técnica

- [ ] Sistema implementa TODOS os requisitos P0 (Alta)
- [ ] Frontend implementado conforme especificado
- [ ] Backend/Firebase funcionando corretamente
- [ ] Banco de dados Firestore implementado
- [ ] **Testes automatizados** implementados (OBRIGATÓRIO)
- [ ] Tratamento de erros em todos os formulários
- [ ] Código comentado e organizado
- [ ] Sistema disponível para teste (deploy ativo)
- [ ] Instruções de instalação funcionam
- [ ] Repositório segue estrutura EXATA
- [ ] Repositório está PÚBLICO

### 👥 Validação com Público-Alvo

- [ ] Público-alvo ESPECÍFICO identificado
- [ ] Contato/apresentação realizada
- [ ] Comprovação fotográfica/vídeo (com autorização)
- [ ] Feedback coletado sobre funcionalidades
- [ ] Ajustes implementados baseados no feedback
- [ ] Relatório em `validation/validation_report.md`
- [ ] Definição em `validation/target_audience.md`
- [ ] Evidências em `validation/evidence/`
- [ ] Feedback em `validation/feedback/`
- [ ] Resumo no `README.md`

### 📄 Documentação

- [ ] `README.md` completo (10 seções)
- [ ] `docs/requirements/requirements.md` completo
- [ ] `docs/architecture/architecture.md` completo
- [ ] `docs/api/api_documentation.md` completo
- [ ] `database/schema.md` completo

### 🚀 Deploy e Submissão

- [ ] Sistema em produção (Firebase Hosting)
- [ ] URL de acesso funcionando
- [ ] Credenciais de teste criadas
- [ ] Documento de submissão preparado
- [ ] Submissão realizada no AVA até 01/12/2025, 23h59

---

## ⚠️ VERIFICAÇÃO DE PENALIZAÇÕES

**Revisar para EVITAR perda de pontos:**

- [ ] ✅ Estrutura de pastas segue padrão EXATO (senão: **-2,0 pontos**)
- [ ] ✅ Validação com público-alvo presente (senão: **-2,0 pontos**)
- [ ] ✅ Sistema está funcional e testável (senão: **-5,0 pontos**)
- [ ] ✅ Repositório existe, correto e PÚBLICO (senão: **-5,0 pontos**)
- [ ] ✅ README.md completo (senão: **-0,5 pontos**)

**Máximo de penalizações possíveis:** -9,5 pontos

---

## 🎯 CRITÉRIOS DE AVALIAÇÃO (5,0 pontos)

### 1. Funcionalidade e Qualidade - 1,8 pontos
- [ ] Requisitos funcionais completos (0,6)
- [ ] Interface e UX de qualidade (0,6)
- [ ] Tratamento de erros e validações (0,6)

### 2. Arquitetura e Código - 1,2 pontos
- [ ] Aderência à arquitetura planejada (0,4)
- [ ] Qualidade e organização do código (0,4)
- [ ] Implementação adequada do banco (0,4)

### 3. Testes e Documentação - 1,2 pontos
- [ ] Testes automatizados (0,5)
- [ ] Qualidade da documentação técnica (0,3)
- [ ] Instruções claras (0,4)

### 4. Validação com Público-Alvo - 0,8 pontos
- [ ] Definição específica do público (0,3)
- [ ] Comprovação de contato (0,3)
- [ ] Feedback e ajustes (0,2)

**PONTUAÇÃO ESPERADA:** 5,0 / 5,0

---

## 📊 MÉTRICAS DO PROJETO

### Estatísticas de Código (atualizar conforme progresso):
- **Linhas de código:** 0
- **Arquivos HTML:** 0/7
- **Arquivos JS:** 0/6
- **Arquivos CSS:** 0/1
- **Testes implementados:** 0

### Estatísticas do Firebase:
- **Collections criadas:** 0/3
- **Usuários cadastrados:** 0
- **Doações cadastradas:** 0
- **Mensagens enviadas:** 0

### Estatísticas de Documentação:
- **Páginas de documentação:** 0/6
- **Screenshots:** 0/10
- **Evidências de validação:** 0/5

---

## 🗓️ LOG DE PROGRESSO

### Formato: [Data] - [Fase] - [Descrição]

```
[__/__/2025] - Início - Projeto iniciado
[__/__/2025] - Fase 1 - Repositório criado
[__/__/2025] - Fase 1 - Firebase configurado
[__/__/2025] - Fase 2 - Auth implementado
[__/__/2025] - Fase 2 - CRUD de doações completo
[__/__/2025] - Fase 3 - Telas principais criadas
[__/__/2025] - Fase 3 - Sistema funcionando
[__/__/2025] - Fase 4 - Validação realizada
[__/__/2025] - Fase 5 - Deploy realizado
[__/__/2025] - Entrega - Projeto submetido no AVA
```

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

### **Agora (hoje):**
1. [ ] Criar repositório GitHub (público)
2. [ ] Criar projeto no Firebase
3. [ ] Criar estrutura de pastas

### **Amanhã:**
1. [ ] Configurar Firebase Auth
2. [ ] Criar Firestore collections
3. [ ] Implementar `auth.js`

### **Esta semana:**
1. [ ] Completar Fase 1 e Fase 2
2. [ ] Iniciar Fase 3 (frontend)
3. [ ] Criar primeiras telas (login, home)

---

## 💡 DICAS IMPORTANTES

### ✅ **Para Manter o Ritmo:**
- Seguir ordem do roadmap (Fase 1 → 2 → 3 → 4 → 5)
- Fazer commits frequentes (mínimo 1x por dia)
- Testar cada funcionalidade antes de passar para a próxima
- Não pular etapas

### ⚠️ **Armadilhas Comuns:**
- Não implementar múltiplas fotos (apenas 1)
- Não criar sistema de tags (usar categorias fixas)
- Não criar landing page complexa (home = listagem)
- Não esquecer da validação com público-alvo
- Não deixar documentação para última hora

### 🎯 **Foco no MVP:**
- Implementar apenas funcionalidades P0 (Alta)
- Funcionalidades P1 (Média) apenas se sobrar tempo
- Priorizar funcional sobre bonito
- Priorizar entrega no prazo sobre features extras

---

## 📞 INFORMAÇÕES DE CONTATO

### Equipe:
- **Nome:** [Seu nome]
- **Matrícula:** [Sua matrícula]
- **E-mail:** [Seu e-mail]

### Recursos Úteis:
- **Firebase Console:** https://console.firebase.google.com/
- **Bootstrap Docs:** https://getbootstrap.com/docs/5.3/
- **Firebase Docs:** https://firebase.google.com/docs
- **GitHub Repo:** [Link após criar]

---

**Última Atualização:** [Data de hoje]  
**Próxima Revisão:** [Data + 3 dias]  
**Responsável:** [Seu nome]

---

## 🎯 LEMBRETE FINAL

### **PRAZO:** 01/12/2025, 23h59

**Dias úteis até a entrega:** [Calcular]

**É POSSÍVEL! Siga o plano, mantenha o foco no MVP, e tudo dará certo! 🚀**

