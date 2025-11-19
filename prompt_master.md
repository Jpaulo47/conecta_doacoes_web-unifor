# 📌 Prompt Mestre: Conecta Doações MVP (Etapa 2 - N708)

> **Guia Completo para Implementação do MVP Multiplataforma**  
> Transformando documentação em um Produto de Software Funcional

---

## 📑 Índice

1. [Referência Rápida](#-referência-rápida)
2. [Resumo Executivo](#-resumo-executivo)
3. [Stack Tecnológica](#-stack-tecnológica)
4. [Identidade do Projeto](#-identidade-do-projeto)
5. [Funcionalidades do MVP](#-funcionalidades-do-mvp)
6. [Modelo de Dados](#-modelo-de-dados-firestore)
7. [Simplificações para MVP](#-simplificações-para-mvp-baseado-nos-protótipos) ⭐ NOVO
8. [Roadmap de Implementação](#-roadmap-de-implementação)
9. [Estrutura do Repositório](#-estrutura-do-repositório)
10. [Critérios de Entrega](#-critérios-de-entrega)
11. [Validação com Público-Alvo](#-validação-com-público-alvo-obrigatória-e-crítica)
12. [Critérios de Avaliação Oficial](#-critérios-de-avaliação-oficial-total-50-pontos)
13. [Penalizações](#-penalizações-leia-com-atenção)
14. [Conteúdo Obrigatório do README.md](#-conteúdo-obrigatório-do-readmemd)
15. [Prazo de Entrega](#-prazo-de-entrega)
16. [Checklist Final de Submissão](#-checklist-final-de-submissão)

---

## 🎯 Referência Rápida

### **Status do Projeto**
- **Etapa Atual:** Etapa 2 - Desenvolvimento do MVP
- **Fase:** Planejamento e Configuração Inicial
- **Próxima Ação:** Criar estrutura do repositório

### **Informações Essenciais**
- **Nome:** Conecta Doações
- **ODS:** ODS 11 - Cidades e Comunidades Sustentáveis
- **Stack:** HTML + Bootstrap + JavaScript + Firebase
- **Funcionalidades Core:** CRUD de Doações + Autenticação + Sistema de Mensagens

### **Links Importantes**
- Repositório: [A definir]
- Firebase Console: [A configurar]
- Deploy: [A definir]

---

## 📘 Resumo Executivo

### 🎯 Objetivo
Transformar a documentação e protótipos da Etapa 1 (N705) em um **Produto de Software Funcional (MVP)** validado com público-alvo real.

### 🔍 Critérios de Avaliação
1. ✅ **Funcionalidade do MVP** - Sistema completo e operacional
2. ✅ **Qualidade do Código** - Código limpo, comentado e adaptado ao Firebase
3. ✅ **Testes e Documentação** - Cobertura adequada e docs completos
4. ✅ **Validação com Público-Alvo** - Evidências concretas de uso e feedback

### ⚠️ Restrições
- ❌ Nenhuma API REST própria (usar Firebase diretamente)
- ❌ Sem mapas interativos (apenas busca por localização textual)
- ✅ Foco em funcionalidades essenciais (MVP)

---

## 🛠️ Stack Tecnológica

### **Frontend**
```
HTML5 + CSS3
Bootstrap 5.x (responsivo)
JavaScript ES6+ (puro, sem frameworks)
```

### **Backend & Database**
```
Firebase Authentication (gerenciamento de usuários)
Cloud Firestore (banco NoSQL)
Firebase Hosting (deploy)
Firebase Security Rules (segurança)
```

### **Ferramentas de Desenvolvimento**
```
Git & GitHub (versionamento)
VS Code (IDE recomendada)
Chrome DevTools (debug)
```

---

## 🏷️ Identidade do Projeto

**Nome:** Conecta Doações  
**Slogan:** Juntos por um Futuro Sustentável  
**ODS:** 11 - Cidades e Comunidades Sustentáveis

**Propósito:**  
Conectar doadores e beneficiários em comunidades locais, promovendo a economia circular e reduzindo o desperdício através de uma plataforma web acessível e intuitiva.

---

## ⚙️ Funcionalidades do MVP

### 🔐 **Módulo A: Autenticação**

| ID  | Funcionalidade          | Descrição                                    | Prioridade | Status |
| --- | ----------------------- | -------------------------------------------- | ---------- | ------ |
| A1  | Cadastro de Usuário     | Registro com Nome, E-mail e Senha            | P0 (Alta)  | ☐      |
| A2  | Login de Usuário        | Autenticação via E-mail e Senha              | P0 (Alta)  | ☐      |
| A3  | Logout                  | Encerramento de sessão                       | P0 (Alta)  | ☐      |
| A4  | Recuperação de Senha    | Reset via e-mail (Firebase Auth)             | P1 (Média) | ☐      |

### 🏠 **Módulo B: Navegação e Descoberta**

| ID  | Funcionalidade     | Descrição                                    | Prioridade | Status |
| --- | ------------------ | -------------------------------------------- | ---------- | ------ |
| B1  | Home Page          | Listagem pública de doações disponíveis      | P0 (Alta)  | ☐      |
| B2  | Busca e Filtro     | Filtros por Categoria, Localização e Condição| P0 (Alta)  | ☐      |
| B3  | Detalhes do Item   | Visualização completa de um item específico  | P0 (Alta)  | ☐      |

### 📦 **Módulo C: Gestão de Doações**

| ID  | Funcionalidade          | Descrição                                | Prioridade | Status |
| --- | ----------------------- | ---------------------------------------- | ---------- | ------ |
| C1  | Cadastrar Doação        | Create: Nome, Descrição, Categoria, etc. | P0 (Alta)  | ☐      |
| C2  | Meus Itens              | Listagem de itens do usuário logado      | P0 (Alta)  | ☐      |
| C3  | Editar Doação           | Update de itens próprios                 | P0 (Alta)  | ☐      |
| C4  | Excluir Doação          | Delete de itens próprios                 | P0 (Alta)  | ☐      |

### 💬 **Módulo D: Interação e Perfil**

| ID  | Funcionalidade      | Descrição                                | Prioridade | Status |
| --- | ------------------- | ---------------------------------------- | ---------- | ------ |
| D1  | Enviar Mensagem     | Contato com doador via Firestore         | P0 (Alta)  | ☐      |
| D2  | Caixa de Mensagens  | Visualização de mensagens recebidas      | P0 (Alta)  | ☐      |
| D3  | Edição de Perfil    | Atualizar nome e informações do usuário  | P1 (Média) | ☐      |

### 🧭 **Módulo E: Componentes UI**

| ID  | Funcionalidade | Descrição                               | Prioridade | Status |
| --- | -------------- | --------------------------------------- | ---------- | ------ |
| E1  | Navbar Global  | Menu responsivo com estados de autenticação | P0 (Alta) | ☐   |
| E2  | Sidebar        | Menu lateral para área logada           | P1 (Média) | ☐      |
| E3  | Footer         | Rodapé com informações e ODS 11         | P1 (Média) | ☐      |

---

## 🗄️ Modelo de Dados (Firestore)

### **Coleção: users**
```javascript
{
  uid: string,              // ID do Firebase Auth
  name: string,             // Nome do usuário
  email: string,            // E-mail (único)
  location: string,         // Cidade/região
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### **Coleção: donations**
```javascript
{
  id: string (auto),        // ID do documento
  userId: string,           // Referência ao dono
  title: string,            // Título do item
  description: string,      // Descrição detalhada
  category: string,         // Móveis, Roupas, Eletrônicos, etc.
  condition: string,        // Novo, Usado, A Reparar
  location: string,         // Localização do item
  imageUrl: string,         // URL da foto (opcional)
  status: string,           // available, reserved, donated
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### **Coleção: messages**
```javascript
{
  id: string (auto),
  donationId: string,       // Item relacionado
  senderId: string,         // Quem enviou
  receiverId: string,       // Dono do item
  message: string,          // Texto da mensagem
  senderName: string,       // Nome do remetente
  senderEmail: string,      // E-mail do remetente
  read: boolean,            // Status de leitura
  createdAt: timestamp
}
```

### **Security Rules Básicas**
```javascript
// Usuários podem ler/escrever apenas seus próprios dados
// Doações públicas para leitura, escrita apenas pelo dono
// Mensagens acessíveis apenas por remetente e destinatário
```

---

## 🎨 Simplificações para MVP (baseado nos protótipos)

### ⚠️ **IMPORTANTE: Manter o Escopo Enxuto**

Os protótipos visuais contêm algumas funcionalidades **além do escopo do MVP**. Esta seção clarifica o que implementar e o que deixar para versões futuras.

### ✅ **O QUE IMPLEMENTAR (P0 - Alta Prioridade)**

#### **1. Tela de Login/Cadastro**
- ✅ Form de login (e-mail + senha)
- ✅ Form de cadastro (nome + e-mail + senha)
- ✅ Tabs para alternar entre Login/Cadastro
- ✅ Link "Esqueceu sua senha?" (Firebase Auth)
- ✅ Validação de campos obrigatórios

#### **2. Tela de Cadastro de Item**
- ✅ Nome do Item (text input)
- ✅ Descrição Detalhada (textarea)
- ✅ Categoria (dropdown: Móveis, Roupas, Eletrônicos, Livros, Brinquedos, Outros)
- ✅ Condição (dropdown: Novo, Usado - Ótimo, Usado - Bom, Precisa Reparo)
- ✅ Localização (text input: cidade/bairro)
- ✅ **Upload de 1 foto** (URL externa ou Firebase Storage)
- ✅ Checkbox de termos de serviço
- ✅ Botões: Cancelar e Cadastrar

#### **3. Tela Home/Busca de Doações**
- ✅ Campo de busca por nome do item
- ✅ Sidebar com filtros de Categoria (checkboxes)
- ✅ Sidebar com filtros de Localização (checkboxes)
- ✅ Grid de cards de itens (Bootstrap grid)
- ✅ Card: foto, título, categoria, localização, condição
- ✅ Botão "Ver Item" em cada card

#### **4. Tela de Detalhes do Item**
- ✅ Foto grande do item
- ✅ Título, descrição completa
- ✅ Badges: categoria, condição, localização
- ✅ Nome do doador (opcional)
- ✅ **Formulário simples de mensagem** (apenas textarea)
- ✅ Botão "Enviar Mensagem"
- ❌ **REMOVER:** Botão "Reservar" separado (reserva via mensagem)
- ❌ **REMOVER:** Sistema de "Propor Troca"

#### **5. Tela Meus Itens**
- ✅ Listagem de itens do usuário logado
- ✅ Tabela/cards com: foto, nome, categoria, status
- ✅ Status simples: Disponível / Reservado / Doado
- ✅ Botões: Editar e Excluir
- ✅ Busca local (filtro por nome/categoria)
- ❌ **REMOVER:** Status "Aguardando aprovação" (não há moderação no MVP)

#### **6. Tela de Edição de Item**
- ✅ Formulário idêntico ao cadastro (pré-preenchido)
- ✅ Permitir alterar: nome, descrição, categoria, condição, localização
- ✅ Permitir alterar status (disponível/reservado/doado)
- ✅ Permitir alterar foto (substituir URL)
- ❌ **REMOVER:** Upload de múltiplas fotos (apenas 1 por item)
- ❌ **REMOVER:** Sistema de tags personalizadas
- ❌ **REMOVER:** Histórico de alterações (não é P0)

#### **7. Tela de Caixa de Mensagens**
- ✅ Listagem de mensagens recebidas
- ✅ Exibir: nome do remetente, item relacionado, mensagem, data
- ✅ Badge "Lida" / "Não lida"
- ✅ Clicar na mensagem: marca como lida
- ✅ Link para ver o item relacionado

### ❌ **O QUE NÃO IMPLEMENTAR NO MVP**

#### **Funcionalidades Fora do Escopo:**

1. **❌ Landing Page Elaborada**
   - Os protótipos têm Hero, "Doações em Destaque", Estatísticas, "Como Funciona"
   - **Para MVP:** Home pode ser diretamente a listagem de doações
   - **Alternativa:** Banner simples no topo da home

2. **❌ Sistema de "Propor Troca"**
   - Protótipo tem formulário para oferecer item em troca
   - **Para MVP:** Apenas doações diretas (sem trocas)

3. **❌ Múltiplas Fotos por Item**
   - Protótipo permite até 5 fotos
   - **Para MVP:** 1 foto por item (imageUrl único)

4. **❌ Sistema de Tags**
   - Protótipo tem tags personalizadas (Móveis, Cama, Casal, Usado, Doação)
   - **Para MVP:** Usar apenas categoria fixa

5. **❌ Histórico de Alterações**
   - Protótipo mostra quem alterou, quando e o quê
   - **Para MVP:** Não é necessário (apenas timestamps no Firestore)

6. **❌ Botão "Reservar" Separado**
   - Protótipo tem botão dedicado para reservar
   - **Para MVP:** Reserva feita via mensagem ao doador

7. **❌ Sistema de Aprovação/Moderação**
   - Protótipo tem status "Aguardando aprovação"
   - **Para MVP:** Itens publicados ficam disponíveis imediatamente

8. **❌ Estatísticas em Tempo Real**
   - Protótipo mostra "500+ doações, 100+ pessoas"
   - **Para MVP:** Não é necessário (dados fictícios)

### 📊 **Comparação: Protótipos vs MVP**

| Funcionalidade | Protótipo | MVP | Justificativa |
|----------------|-----------|-----|---------------|
| Login/Cadastro | ✅ | ✅ | Core do sistema |
| Listagem de doações | ✅ | ✅ | Core do sistema |
| Filtros básicos | ✅ | ✅ | Core do sistema |
| Cadastro de item | ✅ | ✅ | Core do sistema |
| Detalhes do item | ✅ | ✅ | Core do sistema |
| Enviar mensagem | ✅ | ✅ | Core do sistema |
| Meus itens | ✅ | ✅ | Core do sistema |
| Editar/Excluir item | ✅ | ✅ | Core do sistema |
| **1 foto por item** | ❌ (5 fotos) | ✅ | Simplificação |
| **Múltiplas fotos** | ✅ | ❌ | Nice-to-have |
| **Sistema de tags** | ✅ | ❌ | Nice-to-have |
| **Propor troca** | ✅ | ❌ | Fora do escopo |
| **Histórico** | ✅ | ❌ | Não essencial |
| **Botão reservar** | ✅ | ❌ | Via mensagem é suficiente |
| **Aprovação** | ✅ | ❌ | Sem moderação no MVP |
| **Landing page** | ✅ | ⚠️ | Opcional/Simplificada |

### 💡 **Recomendações de Implementação**

#### **Para Manter Simplicidade:**

1. **Upload de Imagens:**
   ```javascript
   // Opção 1: URL externa (mais simples)
   imageUrl: "https://exemplo.com/foto.jpg"
   
   // Opção 2: Firebase Storage (se necessário)
   // Apenas 1 upload por item
   ```

2. **Status do Item:**
   ```javascript
   // Apenas 3 estados simples
   status: "available" | "reserved" | "donated"
   ```

3. **Sistema de Mensagens:**
   ```javascript
   // Mensagem simples, sem thread/conversas
   // Apenas enviar texto para o dono do item
   message: {
     donationId, senderId, receiverId,
     message, senderName, senderEmail,
     read: false, createdAt
   }
   ```

4. **Home Page:**
   ```html
   <!-- Opção Simples (Recomendada): -->
   <!-- index.html = listagem de doações -->
   <!-- Banner no topo com logo + slogan -->
   <!-- Não criar landing page separada -->
   ```

### 🎯 **Decisão Final para MVP:**

**IMPLEMENTAR:**
- Todas as funcionalidades P0 (Alta) do `prompt_master.md`
- Usar protótipos como REFERÊNCIA VISUAL
- Simplificar onde indicado nesta seção

**NÃO IMPLEMENTAR:**
- Funcionalidades marcadas com ❌
- Deixar para versões futuras (pós-MVP)

---

## 🗺️ Roadmap de Implementação

### **📍 FASE 1: Planejamento e Configuração (2-3 dias)**

| # | Tarefa | Descrição Detalhada | Status |
|---|--------|---------------------|--------|
| 1 | Criar Repositório | - Criar repo no GitHub<br>- Adicionar .gitignore<br>- Criar estrutura de pastas obrigatória | ☐ |
| 2 | Configurar Firebase | - Criar projeto no Firebase Console<br>- Habilitar Auth (Email/Password)<br>- Criar banco Firestore<br>- Obter credenciais (firebaseConfig) | ☐ |
| 3 | Setup Frontend | - Criar pasta `frontend/web/`<br>- Adicionar Bootstrap CDN<br>- Criar arquivo base `index.html` | ☐ |
| 4 | Documentação Inicial | - Criar `README.md` básico<br>- Documentar estrutura do projeto | ☐ |

**Entregáveis:** Repositório configurado + Firebase ativo

---

### **📍 FASE 2: Backend/Database (3-4 dias)**

| # | Tarefa | Descrição Detalhada | Status |
|---|--------|---------------------|--------|
| 5 | Modelagem Firestore | - Criar collections: users, donations, messages<br>- Documentar schema em `database/schema.md` | ☐ |
| 6 | Security Rules | - Implementar regras de segurança<br>- Testar permissões no console | ☐ |
| 7 | Auth Setup (A1, A2) | - Criar `js/auth.js`<br>- Implementar cadastro e login<br>- Gerenciar sessão com localStorage | ☐ |
| 8 | CRUD Donations | - Criar `js/donations.js`<br>- Implementar Create, Read, Update, Delete | ☐ |
| 9 | Sistema de Mensagens | - Criar `js/messages.js`<br>- Implementar envio e leitura | ☐ |

**Entregáveis:** Firebase 100% funcional + Lógica JS completa

---

### **📍 FASE 3: Frontend/Interface (5-7 dias)**

| # | Tarefa | Descrição Detalhada | Status |
|---|--------|---------------------|--------|
| 10 | Estrutura HTML Base | - Criar templates: login, cadastro, home, detalhes<br>- Aplicar Bootstrap Grid | ☐ |
| 11 | Navbar Responsiva (E1) | - Menu dinâmico (logado/deslogado)<br>- Links: Home, Meus Itens, Perfil, Logout | ☐ |
| 12 | Sidebar (E2) | - Menu lateral para área do usuário<br>- Mobile-friendly (collapse) | ☐ |
| 13 | Tela Login/Cadastro (A1, A2) | - Formulários com validação<br>- Integração com `auth.js` | ☐ |
| 14 | Home Page (B1, B2) | - Listagem de doações<br>- Filtros por categoria/localização<br>- Cards responsivos | ☐ |
| 15 | Cadastro de Doação (C1) | - Formulário completo<br>- Upload de imagem (URL externa ou Firebase Storage) | ☐ |
| 16 | Meus Itens (C2, C3, C4) | - Listagem filtrada por userId<br>- Botões Editar/Excluir | ☐ |
| 17 | Detalhes + Contato (B3, D1) | - Modal ou página de detalhes<br>- Formulário de mensagem | ☐ |
| 18 | Perfil do Usuário (D3) | - Visualização e edição de dados<br>- Histórico de doações | ☐ |
| 19 | Caixa de Mensagens (D2) | - Listagem de mensagens recebidas<br>- Marcar como lida | ☐ |
| 20 | Tratamento de Erros e Validações | - Validação de formulários (frontend)<br>- Mensagens de erro amigáveis<br>- Loading states<br>- Validação de campos obrigatórios | ☐ |

**Entregáveis:** Interface completa + Integração Front-Back 100% + Validações

---

### **📍 FASE 4: Validação com Público-Alvo (4-5 dias)**

| # | Tarefa | Descrição Detalhada | Arquivo | Status |
|---|--------|---------------------|---------|--------|
| 21 | Definir Público-Alvo | - Perfil demográfico ESPECÍFICO<br>- Nome, localização, contato<br>- Necessidades específicas | `validation/target_audience.md` | ☐ |
| 22 | Preparar Apresentação | - Criar pitch/apresentação<br>- Demonstração guiada do sistema | - | ☐ |
| 23 | Realizar Validação | - Mínimo 3-5 usuários reais<br>- Sessões de uso supervisionado<br>- Registrar em foto/vídeo (com autorização) | `validation/evidence/` | ☐ |
| 24 | Coletar Feedback | - Questionário estruturado<br>- Registro de observações<br>- Sugestões de melhorias | `validation/feedback/` | ☐ |
| 25 | Documentar Evidências | - Prints, fotos, vídeos<br>- Depoimentos escritos<br>- Termo de autorização | `validation/evidence/` | ☐ |
| 26 | Implementar Ajustes | - Correções baseadas no feedback<br>- Priorizar melhorias críticas | - | ☐ |
| 27 | Relatório de Validação | - Compilar resultados<br>- Análise de melhorias implementadas<br>- Resumo para README.md | `validation/validation_report.md` | ☐ |

**Entregáveis:** Evidências concretas + Relatório de validação

---

### **📍 FASE 5: Finalização e Entrega (3-4 dias)**

| # | Tarefa | Descrição Detalhada | Status |
|---|--------|---------------------|--------|
| 28 | **Testes Automatizados** (OBRIGATÓRIO) | - Implementar testes unitários (Jest)<br>- Testar funções críticas (auth, CRUD)<br>- Documentar cobertura de testes | ☐ |
| 29 | Testes Manuais | - Testar todos os fluxos<br>- Verificar responsividade<br>- Checar security rules | ☐ |
| 30 | Documentação Técnica | - `docs/requirements/requirements.md`<br>- `docs/architecture/architecture.md`<br>- `docs/api/api_documentation.md` (Firebase) | ☐ |
| 31 | Deploy Firebase Hosting | - Build de produção<br>- Configurar firebase.json<br>- Deploy: `firebase deploy` | ☐ |
| 32 | README Completo | - **TODAS** as seções obrigatórias<br>- Instruções de instalação<br>- Credenciais demo<br>- Resumo da validação | ☐ |
| 33 | Revisão Final | - Checklist de estrutura obrigatória<br>- Verificar todos os arquivos<br>- Revisar commits<br>- Confirmar repositório PÚBLICO | ☐ |
| 34 | Submissão AVA | - Documento com nomes e matrículas<br>- Link do repositório (público)<br>- Confirmar entrega até 01/12/2025 23h59 | ☐ |

**Entregáveis:** Sistema completo + Docs + Deploy ativo

---

## 📂 Estrutura do Repositório

```
conecta-doacoes/
│
├── README.md                          # Documentação principal do projeto
├── .gitignore                         # Arquivos ignorados pelo Git
│
├── frontend/
│   └── web/
│       ├── index.html                 # Home page (B1)
│       ├── login.html                 # Tela de login (A2)
│       ├── cadastro.html              # Tela de cadastro (A1)
│       ├── nova-doacao.html           # Cadastro de item (C1)
│       ├── meus-itens.html            # Gerenciamento (C2, C3, C4)
│       ├── detalhes.html              # Detalhes + contato (B3, D1)
│       ├── perfil.html                # Edição de perfil (D3)
│       ├── mensagens.html             # Caixa de mensagens (D2)
│       │
│       ├── css/
│       │   └── styles.css             # Estilos customizados
│       │
│       ├── js/
│       │   ├── firebase-config.js     # Configuração do Firebase
│       │   ├── auth.js                # Autenticação (A1, A2)
│       │   ├── donations.js           # CRUD de doações (C1-C4)
│       │   ├── messages.js            # Sistema de mensagens (D1, D2)
│       │   ├── profile.js             # Gestão de perfil (D3)
│       │   └── utils.js               # Funções auxiliares
│       │
│       └── assets/
│           └── images/                # Logos, ícones, etc.
│
├── backend/
│   └── README.md                      # Explicação sobre uso do Firebase
│
├── database/
│   ├── schema.md                      # Modelo de dados Firestore
│   └── security-rules.txt             # Regras de segurança
│
├── docs/
│   ├── requirements/
│   │   └── requirements.md            # Requisitos funcionais/não-funcionais
│   ├── architecture/
│   │   └── architecture.md            # Arquitetura do sistema
│   └── api/
│       └── api_documentation.md       # Documentação Firebase API
│
├── validation/
│   ├── target_audience.md             # Definição do público-alvo
│   ├── validation_report.md           # Relatório de validação
│   ├── evidence/                      # Prints, fotos, vídeos
│   │   └── [arquivos de evidência]
│   └── feedback/                      # Questionários e respostas
│       └── [feedbacks coletados]
│
└── prototypes/                        # Protótipos da Etapa 1 (referência)
    └── [arquivos de design]
```

---

## ✅ Critérios de Entrega

### **Requisitos Obrigatórios**

- [ ] Sistema 100% funcional com todas as funcionalidades P0 implementadas
- [ ] Código limpo, comentado e versionado no GitHub
- [ ] Firebase configurado com Auth + Firestore + Security Rules
- [ ] Interface responsiva (mobile + desktop)
- [ ] Tratamento de erros e validações implementado em todos os formulários
- [ ] **Testes automatizados** (unitários e/ou integração) - OBRIGATÓRIO
- [ ] Validação com mínimo 3 usuários do público-alvo **ESPECÍFICOS**
- [ ] Evidências documentadas (prints, fotos, vídeos) com autorização
- [ ] Relatório de validação completo
- [ ] Documentação técnica (requirements, architecture, API)
- [ ] Deploy ativo no Firebase Hosting
- [ ] README com instruções claras e **todas as seções obrigatórias**
- [ ] Repositório **público** no GitHub
- [ ] Estrutura de pastas **EXATAMENTE** como especificado

### **Diferenciais (Pontuação Extra)**

- [ ] Sistema de notificações (ex: alerta de nova mensagem)
- [ ] Fotos hospedadas no Firebase Storage (em vez de URLs externas)
- [ ] Perfil público do doador com histórico
- [ ] Filtros avançados (múltiplos simultâneos)
- [ ] Animações e microinterações na UI

---

## 🎯 Validação com Público-Alvo (OBRIGATÓRIA E CRÍTICA)

### ⚠️ **ATENÇÃO: Esta é uma exigência FUNDAMENTAL**

A validação com público-alvo não é opcional. **Ausência deste requisito resulta em penalização de -2,0 pontos.**

### ✅ **Público-Alvo CORRETO (Específico e Identificável)**

O público-alvo deve ser **específico, nomeado e localizável**:

**✅ EXEMPLOS CORRETOS:**
- "Dona Maria Silva, coordenadora da Associação de Moradores do Bairro Bom Jardim (Fortaleza/CE)"
- "Sr. João Pereira, responsável pela Cooperativa de Catadores Reciclagem Solidária (Jangurussu)"
- "Instituto Social Vida Nova - Rua das Flores, 123, Messejana - Contato: (85) 9999-9999"
- "Padre José da Paróquia São Francisco (Rua X, Bairro Y) - atende famílias carentes"

### ❌ **Público-Alvo INCORRETO (Genérico e Não-Identificável)**

**❌ EXEMPLOS INCORRETOS:**
- "Comerciantes em geral"
- "Moradores de bairros periféricos"
- "Usuários de transporte público"
- "ONGs que trabalham com doações"
- "Pessoas que precisam de doações"

### 📋 **Checklist de Validação com Público-Alvo**

- [ ] **Identificação Específica:**
  - Nome completo da pessoa/instituição
  - Endereço ou localização exata
  - Telefone ou e-mail de contato
  - Contexto e necessidades específicas

- [ ] **Contato e Apresentação:**
  - Registro de reunião/apresentação realizada
  - Fotos ou vídeos (com autorização escrita/verbal documentada)
  - Data e local do encontro

- [ ] **Validação das Funcionalidades:**
  - Demonstração do sistema funcionando
  - Público-alvo testou o sistema pessoalmente
  - Feedback coletado sobre cada funcionalidade principal

- [ ] **Documentação Completa:**
  - `validation/target_audience.md` com dados específicos
  - `validation/validation_report.md` com relato detalhado
  - `validation/evidence/` com fotos/vídeos/prints
  - `validation/feedback/` com questionários/anotações
  - Resumo no `README.md` principal

### 📝 **Modelo de Questionário de Validação**

```markdown
1. O sistema é fácil de usar? (1-5)
2. As funcionalidades atendem suas necessidades? (1-5)
3. O que você mais gostou?
4. O que precisa melhorar?
5. Você usaria este sistema? Por quê?
6. Sugestões de novas funcionalidades?
```

---

## 📊 Critérios de Avaliação Oficial (Total: 5,0 pontos)

### **1. Funcionalidade e Qualidade - 1,8 pontos**

| Item | Descrição | Pontos |
|------|-----------|--------|
| 1.1 | Implementação completa dos requisitos funcionais | 0,6 |
| 1.2 | Qualidade da interface e experiência do usuário | 0,6 |
| 1.3 | Tratamento de erros e validações | 0,6 |

**Checklist:**
- [ ] Todas as funcionalidades P0 (Alta) implementadas e funcionando
- [ ] Interface responsiva (mobile + desktop)
- [ ] Mensagens de erro claras e amigáveis
- [ ] Validação de formulários no frontend e backend
- [ ] Fluxos de usuário intuitivos

### **2. Arquitetura e Código - 1,2 pontos**

| Item | Descrição | Pontos |
|------|-----------|--------|
| 2.1 | Aderência à arquitetura planejada | 0,4 |
| 2.2 | Qualidade e organização do código | 0,4 |
| 2.3 | Implementação adequada do banco de dados | 0,4 |

**Checklist:**
- [ ] Código limpo e bem organizado
- [ ] Comentários relevantes no código
- [ ] Separação clara de responsabilidades (auth, donations, messages)
- [ ] Firebase Security Rules implementadas corretamente
- [ ] Modelo de dados seguindo o schema definido

### **3. Testes e Documentação - 1,2 pontos**

| Item | Descrição | Pontos |
|------|-----------|--------|
| 3.1 | Implementação de testes automatizados | 0,5 |
| 3.2 | Qualidade da documentação técnica | 0,3 |
| 3.3 | Instruções claras para instalação e execução | 0,4 |

**Checklist:**
- [ ] Testes automatizados implementados (unitários e/ou integração)
- [ ] `docs/requirements/requirements.md` completo
- [ ] `docs/architecture/architecture.md` completo
- [ ] `docs/api/api_documentation.md` completo
- [ ] README.md com todas as seções obrigatórias
- [ ] Instruções de instalação testadas e funcionais

### **4. Validação com Público-Alvo - 0,8 pontos**

| Item | Descrição | Pontos |
|------|-----------|--------|
| 4.1 | Definição específica e identificável do público-alvo | 0,3 |
| 4.2 | Comprovação de contato/apresentação realizada | 0,3 |
| 4.3 | Documentação do feedback e ajustes implementados | 0,2 |

**Checklist:**
- [ ] Público-alvo específico (nome, localização, contato)
- [ ] Evidências fotográficas/vídeo da validação
- [ ] Relatório de validação detalhado
- [ ] Feedback documentado
- [ ] Ajustes implementados baseados no feedback

---

## ⚠️ PENALIZAÇÕES (LEIA COM ATENÇÃO)

### **Penalizações Automáticas que Serão Aplicadas:**

| Infração | Penalização | Criticidade |
|----------|-------------|-------------|
| **Estrutura de pastas não segue o padrão EXATO** | **-2,0 pontos** | 🔴 CRÍTICA |
| **Ausência de validação com público-alvo** | **-2,0 pontos** | 🔴 CRÍTICA |
| **Sistema não funcional** | **-5,0 pontos** | 🔴 CRÍTICA |
| **Repositório inexistente, incorreto ou privado** | **-5,0 pontos** | 🔴 CRÍTICA |
| **README.md incompleto ou sem seções obrigatórias** | **-0,5 pontos** | 🟡 ALTA |

### **⚠️ Atenção Especial:**

1. **Estrutura do Repositório:**
   - A estrutura de pastas deve ser **EXATAMENTE** como especificada
   - Todos os arquivos `.md` obrigatórios devem existir
   - Pastas vazias não contam (adicionar arquivo `.gitkeep` se necessário)

2. **Validação com Público-Alvo:**
   - Não pode ser genérico
   - Deve haver evidências reais (fotos/vídeos)
   - Relatório deve ser detalhado e específico

3. **Sistema Funcional:**
   - Deve rodar sem erros
   - Deploy deve estar ativo e acessível
   - Instruções de instalação devem funcionar

4. **Repositório Público:**
   - Repositório DEVE estar público no GitHub
   - Link do repositório deve estar correto no AVA
   - Todos os arquivos devem estar commitados

---

## 📋 Conteúdo OBRIGATÓRIO do README.md

### **Seções que DEVEM estar presentes:**

#### **1. Título e Descrição do Projeto**
```markdown
- Nome do sistema
- Descrição do propósito
- Problema que soluciona
- Vinculação com ODS 11
```

#### **2. Funcionalidades Implementadas**
```markdown
- Lista completa de funcionalidades
- Status: Completo, Parcial, Não implementado
- Screenshots das telas principais
```

#### **3. Tecnologias Utilizadas**
```markdown
- Linguagens de programação
- Frameworks e bibliotecas
- Banco de dados
- Ferramentas de desenvolvimento
```

#### **4. Arquitetura do Sistema**
```markdown
- Visão geral da arquitetura
- Componentes principais
- Integrações realizadas
- Diagrama (opcional, mas recomendado)
```

#### **5. Instruções de Instalação e Execução**
```markdown
- Pré-requisitos (Node.js, Firebase CLI, etc.)
- Passo a passo para instalação
- Comandos para execução
- Configurações necessárias (Firebase config)
```

#### **6. Acesso ao Sistema**
```markdown
- URL do sistema em produção
- Credenciais de teste (usuário/senha demo)
- Link para vídeo demonstrativo (se aplicável)
```

#### **7. Validação com Público-Alvo**
```markdown
- Definição específica do público-alvo
- Resumo do processo de validação
- Principais feedbacks recebidos
- Ajustes implementados
```

#### **8. Equipe de Desenvolvimento**
```markdown
- Nome completo dos membros
- Matrícula de cada membro
- Papéis e contribuições principais (opcional)
```

#### **9. Estrutura do Projeto** (opcional, mas recomendado)
```markdown
- Organização das pastas
- Descrição dos principais arquivos
```

#### **10. Links Importantes**
```markdown
- Repositório GitHub
- Deploy em produção
- Documentação técnica
- Relatório de validação
```

### **Exemplo de README Mínimo Aceitável:**

```markdown
# Conecta Doações

Sistema web para conectar doadores e beneficiários em comunidades locais.

## Problema Solucionado
[Descrição do problema e como o sistema resolve]

## ODS 11
[Como o projeto contribui para Cidades e Comunidades Sustentáveis]

## Funcionalidades
- [x] Cadastro e login de usuários
- [x] Listagem de doações disponíveis
- [x] Cadastro de itens para doação
- [x] Sistema de mensagens
...

## Tecnologias
- Frontend: HTML, CSS, Bootstrap, JavaScript
- Backend: Firebase (Auth + Firestore)
- Deploy: Firebase Hosting

## Instalação
[Instruções passo a passo]

## Acesso
- URL: https://[seu-projeto].web.app
- Usuário demo: demo@exemplo.com
- Senha demo: demo123

## Validação com Público-Alvo
Público-alvo: [Nome específico, localização, contato]
Validação realizada em: [Data]
Principais feedbacks: [Resumo]
Ver relatório completo: [link para validation/validation_report.md]

## Equipe
- Nome Completo (Matrícula)
- Nome Completo (Matrícula)
```

---

## ⏰ PRAZO DE ENTREGA

**Data Limite:** 01/12/2025, às 23h59  
**Local:** AVA (local apropriado para submissão)

### **O que deve ser submetido no AVA:**

1. **Documento contendo:**
   - Nome completo de todos os integrantes
   - Matrícula de cada integrante
   - Link para o repositório GitHub (público)

2. **Repositório GitHub deve conter:**
   - Código-fonte completo
   - Documentação técnica
   - Relatório de validação
   - README.md completo

### **⚠️ IMPORTANTE:**
- Não serão aceitas entregas por e-mail
- Não serão aceitas entregas após o prazo
- Todos os membros do grupo devem estar cadastrados no AVA

---

## 📝 Notas para o Assistente de IA

### **Contexto de Uso**
Este documento serve como guia principal para implementação do MVP. Use-o para:
1. Verificar o escopo e prioridades antes de implementar features
2. Atualizar status conforme tarefas forem concluídas
3. Consultar modelo de dados e stack tecnológica
4. Validar estrutura de pastas e arquivos

### **Atualização de Status**
- Alterar ☐ para ✅ conforme tarefas forem concluídas
- Manter registro de bloqueios ou problemas encontrados
- Atualizar seção "Referência Rápida" com informações atualizadas

### **Priorização**
- **P0 (Alta):** Essencial para o MVP funcionar
- **P1 (Média):** Importante, mas pode ser pós-MVP se necessário
- **P2 (Baixa):** Nice-to-have, implementar apenas se houver tempo

---

## ✅ CHECKLIST FINAL DE SUBMISSÃO

### **📦 Implementação Técnica**

- [ ] Sistema implementa **TODOS** os requisitos funcionais P0 (Alta)
- [ ] Frontend implementado conforme especificado
- [ ] Backend/Firebase funcionando corretamente
- [ ] Banco de dados (Firestore) implementado conforme schema
- [ ] **Testes automatizados** para principais funcionalidades (OBRIGATÓRIO)
- [ ] Tratamento de erros e validações em todos os formulários
- [ ] Código comentado e bem organizado
- [ ] Sistema está disponível para teste (deploy ativo)
- [ ] Instruções de instalação funcionam perfeitamente
- [ ] Repositório segue **EXATAMENTE** a estrutura definida
- [ ] Repositório está **PÚBLICO** no GitHub

### **👥 Validação com Público-Alvo**

- [ ] Público-alvo **ESPECÍFICO** identificado (nome, localização, contato)
- [ ] Contato/apresentação realizada com público-alvo
- [ ] Comprovação fotográfica/vídeo da apresentação (com autorização)
- [ ] Feedback coletado do público-alvo sobre funcionalidades
- [ ] Ajustes implementados baseados no feedback
- [ ] Relatório detalhado em `validation/validation_report.md`
- [ ] Definição do público em `validation/target_audience.md`
- [ ] Evidências em `validation/evidence/`
- [ ] Feedback coletado em `validation/feedback/`
- [ ] Resumo da validação incluído no `README.md`

### **📄 Documentação**

- [ ] `README.md` completo com **TODAS** as seções obrigatórias:
  - [ ] Título e descrição do projeto
  - [ ] Problema solucionado e ODS 11
  - [ ] Funcionalidades implementadas
  - [ ] Tecnologias utilizadas
  - [ ] Arquitetura do sistema
  - [ ] Instruções de instalação e execução
  - [ ] URL de acesso e credenciais de teste
  - [ ] Validação com público-alvo (resumo)
  - [ ] Equipe (nomes completos e matrículas)
- [ ] `docs/requirements/requirements.md` completo
- [ ] `docs/architecture/architecture.md` completo
- [ ] `docs/api/api_documentation.md` completo
- [ ] `database/schema.md` com modelo Firestore
- [ ] `database/security-rules.txt` documentado

### **🚀 Deploy e Acesso**

- [ ] Sistema em produção no Firebase Hosting
- [ ] URL de acesso funcionando
- [ ] Credenciais de teste criadas
- [ ] Sistema testado no ambiente de produção

### **📤 Submissão no AVA**

- [ ] Documento preparado com:
  - [ ] Nome completo de todos os integrantes
  - [ ] Matrícula de cada integrante
  - [ ] Link correto do repositório GitHub (público)
- [ ] Todos os membros cadastrados na equipe do AVA
- [ ] Submissão confirmada até **01/12/2025, 23h59**

### **⚠️ Verificação de Penalizações**

Revisar para EVITAR penalizações:

- [ ] ✅ Estrutura de pastas segue padrão EXATO (senão: **-2,0 pontos**)
- [ ] ✅ Validação com público-alvo presente e documentada (senão: **-2,0 pontos**)
- [ ] ✅ Sistema está funcional e testável (senão: **-5,0 pontos**)
- [ ] ✅ Repositório existe, está correto e PÚBLICO (senão: **-5,0 pontos**)
- [ ] ✅ README.md completo com todas as seções (senão: **-0,5 pontos**)

### **🎯 Pontuação Esperada**

Se todos os itens acima estiverem completos:

- Funcionalidade e Qualidade: 1,8 pts
- Arquitetura e Código: 1,2 pts
- Testes e Documentação: 1,2 pts
- Validação com Público-Alvo: 0,8 pts

**TOTAL: 5,0 pontos** ✅

---

## 🎯 Próximos Passos

1. **Criar estrutura do repositório** conforme especificado
2. **Configurar projeto Firebase** e obter credenciais
3. **Implementar autenticação** (base para todo o sistema)
4. **Desenvolver CRUD de doações** (core do MVP)
5. **Construir interface responsiva**
6. **Realizar validação com usuários reais**
7. **Fazer deploy e finalizar documentação**

---

---

**Última Atualização:** 19/11/2025  
**Versão:** 3.1 (Validado com Requisitos Oficiais + Análise de Protótipos)  
**Responsável:** [Seu nome/equipe]

---

## 📌 RESUMO DAS MUDANÇAS

### ✅ **v3.1 (NOVA) - Análise de Protótipos:**
1. **Nova Seção:** "Simplificações para MVP (baseado nos protótipos)"
2. **Tabela Comparativa:** Protótipos vs MVP (o que implementar/remover)
3. **Clarificação:** Funcionalidades dos protótipos que estão além do MVP
4. **Recomendações:** Instruções específicas de o que simplificar
5. **Documento Complementar:** `ANALISE_PROTOTIPOS_VS_PROMPT.md`

### ✅ **v3.0 - Validação com Requisitos Oficiais:**
1. **Seção de Validação com Público-Alvo** detalhada com exemplos corretos/incorretos
2. **Critérios de Avaliação Oficial** com pontuação completa (5,0 pontos)
3. **Seção de Penalizações** com todas as penalizações automáticas
4. **Conteúdo Obrigatório do README.md** com todas as seções exigidas
5. **Prazo de Entrega** oficial (01/12/2025, 23h59)
6. **Checklist Final de Submissão** completo e detalhado

### ⚠️ **Correções Importantes:**
- Testes automatizados movidos de "diferenciais" para **OBRIGATÓRIOS**
- Adicionada tarefa específica de tratamento de erros e validações (Fase 3)
- Reforçado que público-alvo deve ser **ESPECÍFICO** (não genérico)
- Enfatizado que repositório deve estar **PÚBLICO**
- **NOVO:** Clarificado que múltiplas fotos, tags, histórico e sistema de troca estão **FORA DO MVP**

### 📊 **Conformidade:**
- ✅ 100% alinhado com a proposta oficial de trabalho (N708)
- ✅ Todas as penalizações documentadas
- ✅ Todos os requisitos obrigatórios listados
- ✅ Estrutura de pastas exata da proposta
- ✅ Critérios de avaliação detalhados
- ✅ **NOVO:** Protótipos analisados e simplificações documentadas
