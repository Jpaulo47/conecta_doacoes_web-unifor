# Requisitos do Sistema - Conecta Doações

> **MVP - Etapa 2 (N708)**  
> Plataforma para conectar doadores e beneficiários, promovendo economia circular

**Data:** 19/11/2025  
**Versão:** 1.0

---

## 1. Introdução

### 1.1 Propósito
O Conecta Doações é uma plataforma web que facilita a conexão entre pessoas que desejam doar itens e aquelas que precisam deles, promovendo a economia circular e reduzindo o desperdício.

### 1.2 Escopo
MVP (Minimum Viable Product) focado em funcionalidades essenciais para conectar doadores e beneficiários em comunidades locais.

### 1.3 Objetivos
- Facilitar doações de itens entre pessoas
- Reduzir desperdício e promover reutilização
- Contribuir para ODS 11 - Cidades Sustentáveis
- Criar uma comunidade solidária local

---

## 2. Requisitos Funcionais

### 2.1 Módulo A: Autenticação

#### RF-A1: Cadastro de Usuário
**Prioridade:** Alta (P0)

**Descrição:** O sistema deve permitir que novos usuários se cadastrem fornecendo nome, e-mail, senha e endereço completo.

**Entradas:**
- Nome completo (mínimo 3 caracteres)
- E-mail válido (único)
- Senha (mínimo 6 caracteres)
- Endereço completo: CEP, Logradouro, Número, Complemento, Bairro, Cidade, UF

**Processamento:**
- Validar formato de e-mail
- Validar senha (mínimo 6 caracteres)
- Buscar endereço via API ViaCEP (quando CEP fornecido)
- Criar usuário no Firebase Authentication
- Salvar dados adicionais no Firestore (collection `users`)
- Aceitar termos de serviço (obrigatório)

**Saídas:**
- Usuário cadastrado com sucesso
- Redirecionamento para home page
- Mensagem de erro em caso de falha

**Regras de Negócio:**
- E-mail deve ser único no sistema
- Senha deve ter no mínimo 6 caracteres
- CEP deve ter 8 dígitos
- Todos os campos de endereço são obrigatórios (exceto complemento)

---

#### RF-A2: Login de Usuário
**Prioridade:** Alta (P0)

**Descrição:** O sistema deve permitir que usuários cadastrados façam login usando e-mail e senha.

**Entradas:**
- E-mail
- Senha

**Processamento:**
- Validar credenciais no Firebase Authentication
- Manter sessão ativa (localStorage)
- Atualizar estado de autenticação

**Saídas:**
- Usuário autenticado e redirecionado para home
- Mensagem de erro em caso de credenciais inválidas

**Regras de Negócio:**
- E-mail e senha são obrigatórios
- Tentativas de login falhadas devem mostrar mensagem genérica (segurança)

---

#### RF-A3: Logout
**Prioridade:** Alta (P0)

**Descrição:** O sistema deve permitir que usuários encerrem sua sessão.

**Processamento:**
- Desconectar usuário do Firebase Authentication
- Limpar dados de sessão (localStorage)
- Atualizar UI (navbar)

**Saídas:**
- Usuário deslogado
- Redirecionamento para home page

---

#### RF-A4: Recuperação de Senha
**Prioridade:** Média (P1)

**Descrição:** O sistema deve permitir que usuários recuperem sua senha através de e-mail.

**Entradas:**
- E-mail cadastrado

**Processamento:**
- Verificar se e-mail existe no sistema
- Enviar link de recuperação via Firebase Auth
- Link deve expirar após 1 hora

**Saídas:**
- E-mail de recuperação enviado
- Mensagem de confirmação

---

### 2.2 Módulo B: Navegação e Descoberta

#### RF-B1: Home Page / Listagem de Doações
**Prioridade:** Alta (P0)

**Descrição:** O sistema deve exibir uma listagem pública de todos os itens disponíveis para doação.

**Funcionalidades:**
- Exibir cards com informações dos itens
- Mostrar carrossel de imagens (até 3 fotos por item)
- Exibir título, categoria, localização, condição
- Botão "Ver Item" em cada card
- Seção de estatísticas (itens doados, disponíveis, total, usuários)
- Contadores animados

**Regras de Negócio:**
- Apenas itens com status "available" devem aparecer por padrão
- Ordenação: mais recentes primeiro
- Máximo 3 imagens por item

---

#### RF-B2: Busca e Filtro
**Prioridade:** Alta (P0)

**Descrição:** O sistema deve permitir buscar e filtrar itens por diferentes critérios.

**Filtros:**
- Por categoria (dropdown)
- Por condição (dropdown)
- Por localização (input de texto)
- Por status (checkboxes: Disponível, Reservado, Doado)

**Busca:**
- Busca por nome/título (em tempo real)
- Busca case-insensitive

**Processamento:**
- Aplicar filtros em tempo real
- Combinar múltiplos filtros (AND)
- Manter filtros durante navegação

---

#### RF-B3: Detalhes do Item
**Prioridade:** Alta (P0)

**Descrição:** O sistema deve exibir informações detalhadas de um item específico.

**Informações exibidas:**
- Galeria de imagens (até 3 fotos) com navegação
- Título completo
- Descrição detalhada
- Badges: categoria, condição, localização
- Nome do doador
- Data de cadastro
- Botão "Ver no mapa" (se endereço disponível)

**Funcionalidades:**
- Formulário para enviar mensagem ao doador
- Link para "Meus Itens" (se for o dono do item)
- Prevenção de envio de mensagem para próprio item

---

### 2.3 Módulo C: Gestão de Doações

#### RF-C1: Cadastrar Doação
**Prioridade:** Alta (P0)

**Descrição:** Usuário logado deve poder cadastrar um novo item para doação.

**Campos:**
- Título do item (obrigatório)
- Descrição detalhada (obrigatório)
- Categoria (dropdown: Móveis, Roupas, Eletrônicos, Livros, Brinquedos, Outros)
- Condição (dropdown: Novo, Usado - Ótimo, Usado - Bom, Precisa Reparo)
- Endereço (automático do perfil do usuário, somente leitura)
- Imagens (até 3 fotos - upload ou URL)
- Checkbox: "Declaro que o item está em condições de uso"

**Processamento:**
- Validar campos obrigatórios
- Upload de imagens para Firebase Storage (se arquivo)
- Salvar URL(s) de imagem(ns) no Firestore
- Criar documento na collection `donations`
- Status inicial: "available"

**Saídas:**
- Item cadastrado com sucesso
- Redirecionamento para "Meus Itens"

---

#### RF-C2: Meus Itens
**Prioridade:** Alta (P0)

**Descrição:** Usuário logado deve poder visualizar todos os seus itens cadastrados.

**Funcionalidades:**
- Listagem de itens do usuário (cards ou tabela)
- Exibir: foto, título, categoria, status
- Busca local (nome/categoria)
- Botões: Editar e Excluir
- Filtro por status

**Regras de Negócio:**
- Apenas itens do usuário logado são exibidos
- Ordenação: mais recentes primeiro

---

#### RF-C3: Editar Doação
**Prioridade:** Alta (P0)

**Descrição:** Usuário logado deve poder editar seus próprios itens.

**Campos editáveis:**
- Todos os campos do cadastro
- Status (disponível, reservado, doado)
- Imagens (adicionar/remover/editar - até 3)

**Processamento:**
- Validar que usuário é o dono do item
- Atualizar documento no Firestore
- Upload de novas imagens se necessário
- Manter imagens antigas se não alteradas

**Saídas:**
- Item atualizado com sucesso
- Redirecionamento para "Meus Itens"

---

#### RF-C4: Excluir Doação
**Prioridade:** Alta (P0)

**Descrição:** Usuário logado deve poder excluir seus próprios itens.

**Processamento:**
- Validar que usuário é o dono do item
- Confirmar exclusão (diálogo)
- Excluir documento do Firestore
- Excluir imagens do Storage (opcional - para economizar espaço)

**Saídas:**
- Item excluído com sucesso
- Atualização da lista "Meus Itens"

---

### 2.4 Módulo D: Interação e Perfil

#### RF-D1: Enviar Mensagem
**Prioridade:** Alta (P0)

**Descrição:** Usuário logado deve poder enviar mensagem ao doador de um item.

**Entradas:**
- ID do item (doação)
- Texto da mensagem (mínimo 10 caracteres)

**Processamento:**
- Validar que usuário está logado
- Validar que não está enviando mensagem para próprio item
- Criar documento na collection `messages`
- Salvar: donationId, senderId, receiverId, message, senderName, senderEmail
- Status inicial: read = false

**Saídas:**
- Mensagem enviada com sucesso
- Confirmação visual

---

#### RF-D2: Caixa de Mensagens
**Prioridade:** Alta (P0)

**Descrição:** Usuário logado deve poder visualizar e gerenciar suas mensagens.

**Funcionalidades:**
- Visualizar mensagens recebidas e enviadas
- Agrupar mensagens em conversas/canais por remetente/destinatário
- Exibir thread completa da conversa
- Filtros: Todas / Lidas / Não Lidas
- Marcar mensagens como lidas
- Responder mensagens
- Contador de mensagens não lidas
- Link para ver item relacionado

**Regras de Negócio:**
- Mensagens agrupadas por: donationId + participantes (senderId + receiverId)
- Ordenação: conversas com mensagem mais recente primeiro
- Thread mostra histórico cronológico completo

---

#### RF-D3: Edição de Perfil
**Prioridade:** Média (P1)

**Descrição:** Usuário logado deve poder editar suas informações de perfil.

**Campos editáveis:**
- Nome completo
- Endereço completo (CEP, Logradouro, Número, Complemento, Bairro, Cidade, UF)

**Processamento:**
- Buscar endereço via ViaCEP (quando CEP fornecido)
- Atualizar documento na collection `users`
- Atualizar displayName no Firebase Auth (se nome alterado)

**Saídas:**
- Perfil atualizado com sucesso
- Mensagem de confirmação

---

### 2.5 Módulo E: Componentes UI

#### RF-E1: Navbar Global
**Prioridade:** Alta (P0)

**Descrição:** Todas as páginas devem ter uma navbar consistente.

**Funcionalidades:**
- Logo "Conecta Doações"
- Links quando deslogado: Home, Entrar, Cadastrar
- Links quando logado: Home, Nova Doação, Meus Itens, Mensagens, Perfil, Sair
- Responsivo (mobile-friendly)

---

#### RF-E2: Footer
**Prioridade:** Média (P1)

**Descrição:** Footer moderno com informações sobre o projeto.

**Conteúdo:**
- Logo e descrição
- Links rápidos
- Informações sobre ODS 11
- Copyright

---

## 3. Requisitos Não-Funcionais

### 3.1 Performance
- Páginas devem carregar em menos de 3 segundos
- Imagens devem ser otimizadas (máximo 2MB por imagem)
- Queries do Firestore devem ser eficientes (com índices quando necessário)

### 3.2 Usabilidade
- Interface intuitiva e fácil de usar
- Feedback visual em todas as ações (loading, sucesso, erro)
- Mensagens de erro claras e em português
- Validação em tempo real nos formulários

### 3.3 Segurança
- Autenticação obrigatória para ações sensíveis
- Security Rules no Firestore
- Validação tanto no frontend quanto no backend
- Prevenção de XSS (escapamento de HTML)

### 3.4 Compatibilidade
- Suporte para navegadores modernos (Chrome, Firefox, Edge, Safari)
- Responsivo para mobile, tablet e desktop
- Bootstrap 5 para layout responsivo

### 3.5 Confiabilidade
- Tratamento de erros em todas as operações
- Mensagens de erro amigáveis
- Fallbacks para operações assíncronas

### 3.6 Escalabilidade
- Arquitetura baseada em Firebase (escala automaticamente)
- Desnormalização de dados para reduzir queries
- Paginação (futuro) para listagens grandes

---

## 4. Casos de Uso

### 4.1 UC-01: Cadastrar e Fazer Login

**Ator:** Usuário não cadastrado

**Fluxo Principal:**
1. Usuário acessa a página de login
2. Usuário clica em "Cadastrar"
3. Usuário preenche formulário de cadastro
4. Usuário busca CEP e preenche endereço automaticamente
5. Usuário aceita termos de serviço
6. Sistema valida dados
7. Sistema cria conta
8. Sistema redireciona para home

**Fluxo Alternativo 4a:** CEP não encontrado
- Sistema mostra mensagem de erro
- Usuário preenche endereço manualmente

---

### 4.2 UC-02: Cadastrar Item para Doação

**Ator:** Usuário logado (doador)

**Fluxo Principal:**
1. Usuário clica em "Nova Doação"
2. Sistema exibe formulário de cadastro
3. Usuário preenche informações do item
4. Usuário adiciona até 3 fotos (upload ou URL)
5. Usuário declara que item está em condições de uso
6. Sistema valida dados
7. Sistema faz upload de imagens (se necessário)
8. Sistema salva item no Firestore
9. Sistema redireciona para "Meus Itens"

---

### 4.3 UC-03: Buscar e Visualizar Item

**Ator:** Usuário (qualquer)

**Fluxo Principal:**
1. Usuário acessa home page
2. Usuário visualiza listagem de itens
3. Usuário aplica filtros (opcional)
4. Usuário clica em "Ver Item"
5. Sistema exibe detalhes completos do item
6. Usuário visualiza galeria de imagens

---

### 4.4 UC-04: Enviar Mensagem ao Doador

**Ator:** Usuário logado (interessado)

**Fluxo Principal:**
1. Usuário visualiza detalhes de um item
2. Usuário preenche formulário de mensagem
3. Usuário envia mensagem
4. Sistema valida que não é o próprio item
5. Sistema salva mensagem no Firestore
6. Sistema mostra mensagem de sucesso

**Fluxo Alternativo 4a:** Usuário não está logado
- Sistema solicita login
- Redireciona para página de login

---

### 4.5 UC-05: Gerenciar Mensagens

**Ator:** Usuário logado (dono do item)

**Fluxo Principal:**
1. Usuário acessa "Mensagens"
2. Sistema exibe conversas agrupadas
3. Usuário visualiza thread completa de uma conversa
4. Usuário responde mensagem
5. Sistema salva resposta
6. Sistema atualiza UI automaticamente

---

## 5. Regras de Negócio

1. **Autenticação:** Apenas usuários logados podem cadastrar itens e enviar mensagens
2. **Propriedade:** Usuários só podem editar/excluir seus próprios itens
3. **Mensagens:** Usuários não podem enviar mensagens para seus próprios itens
4. **Status:** Itens podem ter status: available, reserved, donated
5. **Imagens:** Máximo 3 imagens por item
6. **Validação:** Todos os campos obrigatórios devem ser validados
7. **CEP:** Integração com ViaCEP para busca automática de endereço
8. **Estatísticas:** Contadores calculados em tempo real do Firestore

---

## 6. Glossário

- **ODS 11:** Objetivo de Desenvolvimento Sustentável 11 - Cidades Sustentáveis
- **Firestore:** Banco de dados NoSQL do Firebase
- **Firebase Auth:** Serviço de autenticação do Firebase
- **Firebase Storage:** Serviço de armazenamento de arquivos do Firebase
- **ViaCEP:** API gratuita para busca de endereços por CEP no Brasil
- **MVP:** Minimum Viable Product (Produto Mínimo Viável)
- **CRUD:** Create, Read, Update, Delete (operações básicas de banco de dados)

---

**Última Atualização:** 19/11/2025  
**Versão:** 1.0

