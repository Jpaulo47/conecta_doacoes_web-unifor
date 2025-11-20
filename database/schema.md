# Schema do Banco de Dados - Firestore

## Visão Geral

Este documento descreve o modelo de dados utilizado no Cloud Firestore para o projeto Conecta Doações.

---

## Collections

### 1. **users**

Armazena informações dos usuários cadastrados.

**Caminho:** `/users/{userId}`

**Estrutura:**

```javascript
{
  uid: string,              // ID do Firebase Auth (Document ID)
  name: string,             // Nome completo do usuário
  email: string,            // E-mail (único)
  location: string,         // Cidade/região (compatibilidade)
  address: {                // Endereço completo estruturado
    cep: string,            // CEP (8 dígitos)
    logradouro: string,     // Nome da rua/avenida
    numero: string,         // Número do imóvel
    complemento: string,    // Complemento (opcional)
    bairro: string,         // Bairro
    cidade: string,         // Cidade
    uf: string              // Estado (sigla)
  },
  createdAt: timestamp,     // Data de criação da conta
  updatedAt: timestamp      // Data da última atualização
}
```

**Exemplo:**

```javascript
{
  uid: "abc123xyz789",
  name: "João Silva",
  email: "joao.silva@example.com",
  location: "Fortaleza, CE - Centro",
  address: {
    cep: "60355650",
    logradouro: "Rua João Pessoa",
    numero: "123",
    complemento: "Apto 101",
    bairro: "Centro",
    cidade: "Fortaleza",
    uf: "CE"
  },
  createdAt: Timestamp(2025-11-19 10:30:00),
  updatedAt: Timestamp(2025-11-19 10:30:00)
}
```

**Índices:**
- `uid` (automático - document ID)
- `email` (para buscas)

**Campos Obrigatórios:**
- `uid`, `name`, `email`, `address`, `createdAt`, `updatedAt`

**Campos Opcionais:**
- `location` (mantido para compatibilidade)

---

### 2. **donations**

Armazena os itens disponíveis para doação.

**Caminho:** `/donations/{donationId}`

**Estrutura:**

```javascript
{
  id: string (auto),        // ID do documento (gerado automaticamente)
  userId: string,           // Referência ao dono (users.uid)
  userName: string,         // Nome do doador (desnormalizado)
  title: string,            // Título/nome do item
  description: string,      // Descrição detalhada
  category: string,         // Categoria do item
  condition: string,        // Estado/condição do item
  location: string,         // Localização do item (string formatada)
  address: object,          // Endereço completo do usuário (opcional)
  imageUrls: array,         // Array de URLs de imagens (até 3)
  imageUrl: string,         // URL da primeira foto (compatibilidade)
  status: string,           // Status: available, reserved, donated
  createdAt: timestamp,     // Data de criação
  updatedAt: timestamp      // Data da última atualização
}
```

**Valores permitidos:**

- **category:** 
  - "Móveis"
  - "Roupas"
  - "Eletrônicos"
  - "Livros"
  - "Brinquedos"
  - "Outros"

- **condition:**
  - "Novo"
  - "Usado - Ótimo"
  - "Usado - Bom"
  - "Precisa Reparo"

- **status:**
  - "available" - Disponível para doação
  - "reserved" - Reservado por alguém
  - "donated" - Já foi doado

**Exemplo:**

```javascript
{
  id: "donation001",
  userId: "abc123xyz789",
  userName: "João Silva",
  title: "Sofá 3 lugares",
  description: "Sofá em ótimo estado, cor bege, muito confortável.",
  category: "Móveis",
  condition: "Usado - Ótimo",
  location: "Fortaleza, CE - Aldeota",
  address: {
    cep: "60150160",
    logradouro: "Rua Silva Jatahy",
    numero: "456",
    complemento: "Casa",
    bairro: "Aldeota",
    cidade: "Fortaleza",
    uf: "CE"
  },
  imageUrls: [
    "https://example.com/sofa1.jpg",
    "https://example.com/sofa2.jpg",
    "https://example.com/sofa3.jpg"
  ],
  imageUrl: "https://example.com/sofa1.jpg",
  status: "available",
  createdAt: Timestamp(2025-11-19 11:00:00),
  updatedAt: Timestamp(2025-11-19 11:00:00)
}
```

**Índices:**
- `userId` (para buscar doações de um usuário)
- `status` (para filtrar doações disponíveis)
- `category` (para filtros)
- `createdAt` (para ordenação)

**Campos Obrigatórios:**
- `userId`, `userName`, `title`, `description`, `category`, `condition`, `location`, `imageUrls`, `status`, `createdAt`, `updatedAt`

**Campos Opcionais:**
- `address` (endereço completo do usuário)
- `imageUrl` (compatibilidade - primeira imagem do array)

---

### 3. **messages**

Armazena mensagens enviadas entre usuários.

**Caminho:** `/messages/{messageId}`

**Estrutura:**

```javascript
{
  id: string (auto),        // ID da mensagem
  donationId: string,       // Item relacionado
  senderId: string,         // ID de quem enviou
  receiverId: string,       // ID do dono do item
  message: string,          // Texto da mensagem
  senderName: string,       // Nome do remetente (desnormalizado)
  senderEmail: string,      // E-mail do remetente (desnormalizado)
  read: boolean,            // Status de leitura
  createdAt: timestamp      // Data de envio
}
```

**Exemplo:**

```javascript
{
  id: "msg001",
  donationId: "donation001",
  senderId: "xyz789abc123",
  receiverId: "abc123xyz789",
  message: "Olá! Tenho interesse no sofá. Ainda está disponível?",
  senderName: "Maria Oliveira",
  senderEmail: "maria@example.com",
  read: false,
  createdAt: Timestamp(2025-11-19 12:00:00)
}
```

**Índices:**
- `receiverId` (para buscar mensagens recebidas)
- `donationId` (para buscar mensagens de um item)
- `read` (para filtrar não lidas)
- `createdAt` (para ordenação)

---

## Relacionamentos

```
users (1) ──── (N) donations
  └─ Um usuário pode ter várias doações

donations (1) ──── (N) messages
  └─ Um item pode ter várias mensagens

users (1) ──── (N) messages (como receiver)
  └─ Um usuário pode receber várias mensagens

users (1) ──── (N) messages (como sender)
  └─ Um usuário pode enviar várias mensagens
```

---

## Desnormalização

Para otimizar leituras, alguns dados são **desnormalizados**:

- `donations.userName` - Evita join com `users`
- `messages.senderName` - Evita join com `users`
- `messages.senderEmail` - Facilita contato direto

**Observação:** Em caso de atualização do nome do usuário, seria necessário atualizar todos os documentos relacionados. Para o MVP, isso é aceitável.

---

## Queries Comuns

### Buscar todas as doações disponíveis:
```javascript
const q = query(
  collection(db, 'donations'), 
  where('status', '==', 'available'),
  orderBy('createdAt', 'desc')
);
```

### Buscar doações de um usuário:
```javascript
const q = query(
  collection(db, 'donations'), 
  where('userId', '==', currentUserId),
  orderBy('createdAt', 'desc')
);
```

### Buscar mensagens recebidas (não lidas):
```javascript
const q = query(
  collection(db, 'messages'), 
  where('receiverId', '==', currentUserId),
  where('read', '==', false),
  orderBy('createdAt', 'desc')
);
```

---

## Regras de Segurança

Ver arquivo: `database/security-rules.txt`

---

## Migrações Futuras

Possíveis melhorias para versões futuras:

1. **Adicionar subcollection de imagens** (múltiplas fotos por item)
2. **Adicionar collection de reviews** (avaliações de doadores)
3. **Adicionar collection de favorites** (itens favoritos)
4. **Adicionar threads de conversação** (ao invés de mensagens isoladas)
5. **Adicionar notificações** (alertas de novas mensagens)

---

**Última Atualização:** 19/11/2025  
**Versão:** 1.0

