# Arquitetura do Sistema - Conecta Doações

> **MVP - Etapa 2 (N708)**  
> Documentação da arquitetura técnica do sistema

**Data:** 19/11/2025  
**Versão:** 1.0

---

## 1. Visão Geral da Arquitetura

O Conecta Doações é uma aplicação web **client-side** (Single Page Application) que utiliza o Firebase como Backend-as-a-Service (BaaS). A arquitetura segue o padrão **SPA (Single Page Application)** com comunicação direta entre frontend e serviços Firebase.

### 1.1 Padrão Arquitetural
- **Arquitetura:** Client-Side + Firebase BaaS
- **Comunicação:** Direta (Firebase SDK no browser)
- **Estado:** Gerenciado localmente (JavaScript + localStorage)
- **Segurança:** Security Rules no Firestore + Firebase Auth

---

## 2. Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   HTML5      │  │   CSS3       │  │  JavaScript  │  │
│  │  (Páginas)   │  │  (Bootstrap) │  │   (ES6+)     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                          │                               │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Firebase JavaScript SDK (v10.7.1)          │  │
│  └───────────────────────────────────────────────────┘  │
└───────────────────────────┼─────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼───────┐  ┌────────▼────────┐  ┌──────▼──────┐
│ Firebase Auth │  │ Cloud Firestore │  │Firebase     │
│ (Usuários)    │  │  (Dados)        │  │Storage      │
│               │  │                 │  │(Imagens)    │
└───────────────┘  └─────────────────┘  └─────────────┘
```

---

## 3. Componentes Principais

### 3.1 Frontend

#### 3.1.1 Estrutura de Arquivos
```
frontend/web/
├── index.html           # Home page (listagem de doações)
├── login.html           # Login e cadastro
├── detalhes.html        # Detalhes de um item
├── nova-doacao.html     # Cadastro de item
├── meus-itens.html      # Gerenciamento de itens
├── editar-item.html     # Edição de item
├── mensagens.html       # Caixa de mensagens
├── perfil.html          # Edição de perfil
├── sobre.html           # Página sobre
├── como-funciona.html   # Como funciona
├── css/
│   ├── styles.css       # Estilos globais
│   └── statistics.css   # Estilos de estatísticas
└── js/
    ├── firebase-config.js  # Configuração Firebase
    ├── auth.js             # Módulo de autenticação
    ├── donations.js        # Módulo de doações (CRUD)
    └── messages.js         # Módulo de mensagens
```

#### 3.1.2 Tecnologias Frontend
- **HTML5:** Estrutura semântica das páginas
- **CSS3:** Estilização customizada + Bootstrap 5
- **Bootstrap 5.3.2:** Framework CSS responsivo
- **JavaScript ES6+:** Lógica da aplicação (módulos ES6)
- **Bootstrap Icons:** Ícones do sistema

---

### 3.2 Backend (Firebase)

#### 3.2.1 Firebase Authentication
**Propósito:** Gerenciamento de usuários e autenticação

**Configuração:**
- Método: Email/Password
- Providers: Apenas Email/Password no MVP

**Uso no Sistema:**
- Cadastro de novos usuários
- Login de usuários existentes
- Logout
- Recuperação de senha
- Verificação de estado de autenticação

**Funções Principais:**
- `createUserWithEmailAndPassword()` - Cadastro
- `signInWithEmailAndPassword()` - Login
- `signOut()` - Logout
- `sendPasswordResetEmail()` - Recuperação de senha
- `onAuthStateChanged()` - Listener de estado

---

#### 3.2.2 Cloud Firestore
**Propósito:** Banco de dados NoSQL para armazenar dados da aplicação

**Collections:**
1. **users** - Dados dos usuários
2. **donations** - Itens para doação
3. **messages** - Mensagens entre usuários

**Características:**
- Banco NoSQL orientado a documentos
- Queries eficientes com índices
- Security Rules para controle de acesso
- Timestamps automáticos
- Escala automaticamente

**Queries Principais:**
- Buscar doações disponíveis: `where('status', '==', 'available')`
- Buscar doações de um usuário: `where('userId', '==', userId)`
- Buscar mensagens recebidas: `where('receiverId', '==', userId)`

---

#### 3.2.3 Firebase Storage
**Propósito:** Armazenamento de imagens dos itens

**Estrutura:**
```
/donations/
  /{userId}/
    /{timestamp}_{index}_{filename}
```

**Regras:**
- Apenas usuários autenticados podem fazer upload
- Apenas o dono do item pode substituir/deletar imagens
- Máximo 3 imagens por item
- Formato permitido: JPG, PNG, GIF
- Tamanho máximo: 2MB por imagem

---

### 3.3 Módulos JavaScript

#### 3.3.1 firebase-config.js
**Propósito:** Configuração e inicialização do Firebase

**Exporta:**
- `app` - Instância do Firebase App
- `auth` - Instância do Firebase Auth
- `db` - Instância do Firestore
- `storage` - Instância do Firebase Storage

---

#### 3.3.2 auth.js
**Propósito:** Gerenciamento de autenticação

**Funções Exportadas:**
- `signUp(name, email, password, address)` - Cadastro
- `signIn(email, password)` - Login
- `signOutUser()` - Logout
- `resetPassword(email)` - Recuperação de senha
- `getCurrentUser()` - Obter usuário atual
- `getUserData(uid)` - Buscar dados do usuário
- `updateUserProfile(uid, data)` - Atualizar perfil
- `checkAuthState()` - Verificar estado de autenticação

**Dependências:**
- Firebase Auth
- Firestore (para salvar dados do usuário)

---

#### 3.3.3 donations.js
**Propósito:** CRUD completo de doações

**Funções Exportadas:**
- `createDonation(donationData)` - Criar doação
- `getDonations(filters)` - Buscar doações (com filtros)
- `getDonationById(id)` - Buscar doação por ID
- `updateDonation(id, data)` - Atualizar doação
- `deleteDonation(id)` - Excluir doação
- `getUserDonations(userId)` - Buscar doações de um usuário
- `getStatistics()` - Calcular estatísticas

**Dependências:**
- Firebase Auth (para verificar usuário)
- Firestore (para CRUD)
- Firebase Storage (para upload de imagens)

---

#### 3.3.4 messages.js
**Propósito:** Sistema de mensagens

**Funções Exportadas:**
- `sendMessage(donationId, receiverId, messageText, replyToMessageId)` - Enviar mensagem
- `getReceivedMessages(userId)` - Buscar mensagens recebidas
- `getSentMessages(userId)` - Buscar mensagens enviadas
- `markAsRead(messageId)` - Marcar como lida
- `replyToMessage(originalMessage, replyText)` - Responder mensagem
- `groupMessagesByConversation(messages, currentUserId)` - Agrupar em conversas
- `loadMessagesPage(filter)` - Carregar página de mensagens

**Dependências:**
- Firebase Auth (para verificar usuário)
- Firestore (para CRUD de mensagens)

---

## 4. Fluxo de Dados

### 4.1 Fluxo de Cadastro
```
Usuário → Formulário HTML → auth.js → Firebase Auth
                                      → Firestore (users)
                                      → Atualizar UI
```

### 4.2 Fluxo de Criar Doação
```
Usuário → Formulário HTML → donations.js → Validar Auth
                                         → Upload Storage (imagens)
                                         → Firestore (donations)
                                         → Atualizar UI
```

### 4.3 Fluxo de Enviar Mensagem
```
Usuário → Formulário HTML → messages.js → Validar Auth
                                        → Validar (não próprio item)
                                        → Firestore (messages)
                                        → Atualizar UI
```

---

## 5. Segurança

### 5.1 Firebase Security Rules

**Firestore Rules:**
- Usuários podem ler todas as doações públicas
- Usuários podem criar/editar/excluir apenas seus próprios itens
- Usuários podem ler mensagens onde são sender ou receiver
- Usuários podem criar mensagens
- Usuários podem atualizar apenas suas próprias mensagens (marcar como lida)

**Storage Rules:**
- Apenas usuários autenticados podem fazer upload
- Apenas o dono do item pode substituir/deletar imagens
- Validação de tipo de arquivo (imagens apenas)
- Validação de tamanho (máximo 2MB)

---

### 5.2 Validações no Frontend
- Validação de campos obrigatórios
- Validação de formato (e-mail, CEP)
- Validação de tamanho mínimo/máximo
- Prevenção de XSS (escapamento de HTML)
- Prevenção de envio para próprio item

---

## 6. Integrações Externas

### 6.1 ViaCEP API
**Propósito:** Busca automática de endereço por CEP

**Endpoint:**
```
GET https://viacep.com.br/ws/{cep}/json/
```

**Uso:**
- Cadastro de usuário (preencher endereço)
- Edição de perfil (atualizar endereço)

**Dados Retornados:**
- Logradouro
- Bairro
- Cidade
- UF
- (Número e Complemento preenchidos pelo usuário)

---

## 7. Desnormalização de Dados

Para otimizar queries e reduzir custos, alguns dados são **desnormalizados**:

1. **donations.userName** - Nome do doador salvo junto com a doação
2. **messages.senderName** - Nome do remetente salvo na mensagem
3. **messages.senderEmail** - E-mail do remetente salvo na mensagem
4. **messages.receiverName** - Nome do destinatário salvo na mensagem

**Benefícios:**
- Reduz número de queries
- Melhora performance
- Reduz custos do Firestore

**Desvantagem:**
- Necessidade de atualizar múltiplos documentos se nome do usuário mudar
- Para MVP, isso é aceitável

---

## 8. Escalabilidade

### 8.1 Arquitetura Escalável
- Firebase escala automaticamente
- Firestore suporta milhões de documentos
- Firebase Storage suporta grande volume de arquivos

### 8.2 Otimizações Implementadas
- Desnormalização de dados
- Índices em queries frequentes
- Paginação futura (não implementada no MVP)
- Limite de 3 imagens por item

### 8.3 Limitações do MVP
- Sem paginação (carrega todos os itens)
- Sem cache de dados
- Sem CDN para imagens (usa Firebase Storage diretamente)

---

## 9. Tecnologias e Versões

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| HTML | 5 | Estrutura |
| CSS | 3 | Estilização |
| JavaScript | ES6+ | Lógica |
| Bootstrap | 5.3.2 | Framework CSS |
| Firebase SDK | 10.7.1 | Backend services |
| Bootstrap Icons | 1.11.1 | Ícones |

---

## 10. Estrutura de Dados

### 10.1 Collections do Firestore

Ver arquivo: `database/schema.md` para documentação completa do schema.

**Resumo:**
- `users` - Dados dos usuários
- `donations` - Itens para doação
- `messages` - Mensagens entre usuários

---

## 11. Deploy e Hospedagem

### 11.1 Firebase Hosting
**Configuração:**
- Pasta pública: `frontend/web`
- Build: Não necessário (arquivos estáticos)
- Deploy: `firebase deploy --only hosting`

**URL de Produção:**
- [A definir após deploy]

---

## 12. Melhorias Futuras

### 12.1 Curto Prazo
- Paginação de listagens
- Cache de dados no localStorage
- Compressão de imagens antes do upload
- Notificações push para novas mensagens

### 12.2 Médio Prazo
- Sistema de avaliações/reviews
- Sistema de favoritos
- Filtros avançados (raio de busca)
- Mapa interativo com localização dos itens

### 12.3 Longo Prazo
- Aplicativo mobile (React Native)
- Integração com redes sociais
- Sistema de pontos/recompensas
- Moderação de conteúdo

---

**Última Atualização:** 19/11/2025  
**Versão:** 1.0

