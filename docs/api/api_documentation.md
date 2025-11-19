# Documentação da API - Conecta Doações

> **MVP - Etapa 2 (N708)**  
> Documentação das integrações com Firebase e APIs externas

**Data:** 19/11/2025  
**Versão:** 1.0

---

## 1. Introdução

O Conecta Doações utiliza **Firebase** como Backend-as-a-Service (BaaS), não possuindo uma API REST própria. Todas as operações são realizadas diretamente através do **Firebase JavaScript SDK** no frontend.

---

## 2. Firebase Services

### 2.1 Firebase Authentication

#### 2.1.1 Configuração

**Import:**
```javascript
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
```

**Métodos Disponíveis:**
- `createUserWithEmailAndPassword(auth, email, password)`
- `signInWithEmailAndPassword(auth, email, password)`
- `signOut(auth)`
- `sendPasswordResetEmail(auth, email)`
- `updateProfile(user, { displayName })`
- `onAuthStateChanged(auth, callback)`

**Objeto User:**
```javascript
{
  uid: string,              // ID único do usuário
  email: string,            // E-mail do usuário
  displayName: string,      // Nome do usuário
  emailVerified: boolean,   // E-mail verificado
  // ... outros campos
}
```

---

### 2.2 Cloud Firestore

#### 2.2.1 Configuração

**Import:**
```javascript
import { 
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
```

---

#### 2.2.2 Collection: users

**Caminho:** `/users/{userId}`

**Operações:**

##### Criar Usuário
```javascript
const userRef = doc(db, 'users', userId);
await setDoc(userRef, {
  uid: userId,
  name: 'João Silva',
  email: 'joao@example.com',
  address: { /* objeto de endereço */ },
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
});
```

##### Buscar Usuário
```javascript
const userRef = doc(db, 'users', userId);
const userSnap = await getDoc(userRef);
if (userSnap.exists()) {
  const userData = userSnap.data();
}
```

##### Atualizar Usuário
```javascript
const userRef = doc(db, 'users', userId);
await updateDoc(userRef, {
  name: 'Novo Nome',
  updatedAt: serverTimestamp()
});
```

---

#### 2.2.3 Collection: donations

**Caminho:** `/donations/{donationId}`

**Operações:**

##### Criar Doação
```javascript
const donationsRef = collection(db, 'donations');
const docRef = await addDoc(donationsRef, {
  userId: currentUser.uid,
  userName: currentUser.displayName,
  title: 'Sofá usado',
  description: 'Sofá em bom estado',
  category: 'Móveis',
  condition: 'Bom Estado',
  location: 'Fortaleza, CE',
  imageUrls: ['url1', 'url2', 'url3'],
  status: 'available',
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
});
```

##### Buscar Todas as Doações
```javascript
const donationsRef = collection(db, 'donations');
const q = query(
  donationsRef,
  where('status', '==', 'available'),
  orderBy('createdAt', 'desc')
);
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  console.log(doc.id, doc.data());
});
```

##### Buscar Doação por ID
```javascript
const donationRef = doc(db, 'donations', donationId);
const donationSnap = await getDoc(donationRef);
if (donationSnap.exists()) {
  const donationData = donationSnap.data();
}
```

##### Atualizar Doação
```javascript
const donationRef = doc(db, 'donations', donationId);
await updateDoc(donationRef, {
  title: 'Novo Título',
  status: 'reserved',
  updatedAt: serverTimestamp()
});
```

##### Excluir Doação
```javascript
const donationRef = doc(db, 'donations', donationId);
await deleteDoc(donationRef);
```

##### Buscar Doações do Usuário
```javascript
const donationsRef = collection(db, 'donations');
const q = query(
  donationsRef,
  where('userId', '==', userId)
);
const querySnapshot = await getDocs(q);
```

---

#### 2.2.4 Collection: messages

**Caminho:** `/messages/{messageId}`

**Operações:**

##### Enviar Mensagem
```javascript
const messagesRef = collection(db, 'messages');
const docRef = await addDoc(messagesRef, {
  donationId: 'donation-123',
  senderId: currentUser.uid,
  receiverId: 'receiver-456',
  message: 'Olá! Tenho interesse neste item.',
  senderName: currentUser.displayName,
  senderEmail: currentUser.email,
  receiverName: 'Nome do Destinatário',
  receiverEmail: 'email@example.com',
  read: false,
  replyToMessageId: null, // ou ID da mensagem original (se resposta)
  createdAt: serverTimestamp()
});
```

##### Buscar Mensagens Recebidas
```javascript
const messagesRef = collection(db, 'messages');
const q = query(
  messagesRef,
  where('receiverId', '==', userId)
);
const querySnapshot = await getDocs(q);
```

##### Buscar Mensagens Enviadas
```javascript
const messagesRef = collection(db, 'messages');
const q = query(
  messagesRef,
  where('senderId', '==', userId)
);
const querySnapshot = await getDocs(q);
```

##### Marcar Mensagem como Lida
```javascript
const messageRef = doc(db, 'messages', messageId);
await updateDoc(messageRef, {
  read: true
});
```

---

### 2.3 Firebase Storage

#### 2.3.1 Configuração

**Import:**
```javascript
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
```

#### 2.3.2 Operações

##### Upload de Imagem
```javascript
const storage = getStorage();
const storageRef = ref(storage, `donations/${userId}/${timestamp}_${index}_${filename}`);
await uploadBytes(storageRef, file);
const downloadURL = await getDownloadURL(storageRef);
```

##### Deletar Imagem
```javascript
const storageRef = ref(storage, `donations/${userId}/${filename}`);
await deleteObject(storageRef);
```

---

## 3. Security Rules

### 3.1 Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users: usuário pode ler/escrever apenas seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Donations: público pode ler, apenas dono pode escrever
    match /donations/{donationId} {
      allow read: if true; // Público pode ler
      allow create: if request.auth != null 
                    && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null 
                            && resource.data.userId == request.auth.uid;
    }
    
    // Messages: apenas sender/receiver podem ler
    match /messages/{messageId} {
      allow read: if request.auth != null 
                  && (resource.data.senderId == request.auth.uid 
                      || resource.data.receiverId == request.auth.uid);
      allow create: if request.auth != null 
                    && request.resource.data.senderId == request.auth.uid;
      allow update: if request.auth != null 
                    && resource.data.receiverId == request.auth.uid;
    }
  }
}
```

### 3.2 Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /donations/{userId}/{allPaths=**} {
      allow read: if true; // Público pode ler
      allow write: if request.auth != null && request.auth.uid == userId
                   && request.resource.size < 2 * 1024 * 1024 // 2MB
                   && request.resource.contentType.matches('image/.*');
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 4. APIs Externas

### 4.1 ViaCEP API

#### 4.1.1 Endpoint
```
GET https://viacep.com.br/ws/{cep}/json/
```

#### 4.1.2 Parâmetros
- `cep` (string): CEP com 8 dígitos (com ou sem hífen)

#### 4.1.3 Resposta de Sucesso
```javascript
{
  "cep": "60355-650",
  "logradouro": "Rua João Pessoa",
  "complemento": "",
  "bairro": "Centro",
  "localidade": "Fortaleza",
  "uf": "CE",
  "ibge": "2304400",
  "gia": "",
  "ddd": "85",
  "siafi": "1389"
}
```

#### 4.1.4 Resposta de Erro
```javascript
{
  "erro": true
}
```

#### 4.1.5 Exemplo de Uso
```javascript
async function buscarCEP(cep) {
  const cepLimpo = cep.replace(/\D/g, '');
  const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
  const data = await response.json();
  
  if (data.erro) {
    throw new Error('CEP não encontrado');
  }
  
  return {
    logradouro: data.logradouro,
    bairro: data.bairro,
    cidade: data.localidade,
    uf: data.uf
  };
}
```

---

## 5. Estrutura de Respostas

### 5.1 Padrão de Resposta das Funções

Todas as funções do sistema seguem um padrão de resposta:

```javascript
// Sucesso
{
  success: true,
  data: { /* dados retornados */ },
  id: "doc-id" // quando aplicável
}

// Erro
{
  success: false,
  error: "Mensagem de erro descritiva"
}
```

### 5.2 Exemplos

#### Exemplo 1: Criar Doação
```javascript
const result = await createDonation(donationData);
if (result.success) {
  console.log('Doação criada:', result.id);
  console.log('Dados:', result.data);
} else {
  console.error('Erro:', result.error);
}
```

#### Exemplo 2: Buscar Doações
```javascript
const result = await getDonations({ category: 'Móveis' });
if (result.success) {
  result.data.forEach(donation => {
    console.log(donation.title);
  });
} else {
  console.error('Erro:', result.error);
}
```

---

## 6. Índices Necessários

Para queries compostas, o Firestore requer índices. Os seguintes índices devem ser criados:

### 6.1 Collection: donations
- `status` (ascending) + `createdAt` (descending)
- `userId` (ascending) + `createdAt` (descending)
- `category` (ascending) + `status` (ascending)

### 6.2 Collection: messages
- `receiverId` (ascending) + `createdAt` (descending)
- `senderId` (ascending) + `createdAt` (descending)

**Nota:** O Firebase pode criar índices automaticamente quando necessário, exibindo um link na mensagem de erro.

---

## 7. Tratamento de Erros

### 7.1 Erros Comuns

#### Erro de Autenticação
```javascript
{
  code: 'auth/user-not-found',
  message: 'Usuário não encontrado'
}
```

#### Erro de Permissão
```javascript
{
  code: 'permission-denied',
  message: 'Missing or insufficient permissions'
}
```

#### Erro de Validação
```javascript
{
  success: false,
  error: 'Campos obrigatórios não preenchidos'
}
```

---

## 8. Rate Limits

### 8.1 Firebase Auth
- **Criar usuário:** 10/min por IP
- **Login:** Sem limite específico
- **Recuperação de senha:** 5/min por e-mail

### 8.2 Firestore
- **Leituras:** Até 10.000/segundo
- **Escritas:** Até 10.000/segundo
- **Deletes:** Até 10.000/segundo

### 8.3 ViaCEP
- **Gratuito:** Sem limite oficial, mas uso moderado recomendado

---

## 9. Boas Práticas

### 9.1 Firestore
- Usar `serverTimestamp()` para datas
- Desnormalizar dados quando necessário
- Criar índices para queries frequentes
- Usar `where` antes de `orderBy`

### 9.2 Storage
- Validar tipo de arquivo no frontend
- Validar tamanho antes do upload
- Usar nomes únicos para arquivos
- Deletar arquivos antigos quando substituídos

### 9.3 Segurança
- Nunca expor credenciais no código
- Validar dados no frontend E backend (Security Rules)
- Usar HTTPS sempre
- Implementar rate limiting quando necessário

---

**Última Atualização:** 19/11/2025  
**Versão:** 1.0

