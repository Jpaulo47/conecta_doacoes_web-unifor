# 🔥 Próximos Passos - Configuração Firebase

## ✅ O que já foi feito

1. ✅ Estrutura de pastas criada
2. ✅ Credenciais Firebase configuradas no código
3. ✅ Página inicial (index.html) criada
4. ✅ Módulos JavaScript (auth.js, donations.js) implementados
5. ✅ Estilos CSS personalizados
6. ✅ Documentação inicial (README, schema, security rules)

---

## 🔧 O que você precisa fazer agora no Firebase Console

### 1️⃣ Configurar Firestore Database

1. Acesse: https://console.firebase.google.com/
2. Selecione o projeto: **"conecta-doacoes-fc684"**
3. No menu lateral, clique em **"Firestore Database"**
4. Se ainda não criou, clique em **"Criar banco de dados"**
5. Escolha modo: **"Produção"** (com regras)
6. Selecione localização: **"southamerica-east1 (São Paulo)"**
7. Aguarde a criação

### 2️⃣ Aplicar Security Rules

1. Ainda em **Firestore Database**, clique na aba **"Regras"** (Rules)
2. Apague o conteúdo padrão
3. Copie todo o conteúdo do arquivo: `database/security-rules.txt`
4. Cole no editor de regras
5. Clique em **"Publicar"** (Publish)
6. Aguarde confirmação

**⚠️ IMPORTANTE:** As regras garantem que:
- Doações são públicas para leitura
- Apenas donos podem editar/excluir suas doações
- Mensagens são privadas (apenas remetente e destinatário)
- Usuários só podem editar seu próprio perfil

### 3️⃣ Criar Collections Iniciais (Opcional)

Para testar, você pode criar manualmente as collections:

1. Em **Firestore Database**, clique em **"Iniciar coleção"**
2. Nome da coleção: **"donations"**
3. Adicione um documento de teste:
   - ID do documento: (auto-gerado)
   - Campos:
     ```
     title: string = "Sofá 3 lugares"
     description: string = "Sofá em ótimo estado"
     category: string = "Móveis"
     condition: string = "Usado - Ótimo"
     location: string = "Fortaleza, CE"
     imageUrl: string = "https://via.placeholder.com/400x300"
     status: string = "available"
     userId: string = "test-user"
     userName: string = "João Silva"
     createdAt: timestamp = (use server timestamp)
     updatedAt: timestamp = (use server timestamp)
     ```
4. Clique em **"Salvar"**

Repita para criar as collections:
- **users** (deixe vazia, será populada no cadastro)
- **messages** (deixe vazia, será populada quando enviar mensagem)

### 4️⃣ Verificar Authentication

1. No menu lateral, clique em **"Authentication"**
2. Clique na aba **"Sign-in method"**
3. Verifique se **"Email/Password"** está **Ativado**
4. Se não estiver, clique nele e ative

---

## 🧪 Testar a Configuração

### Opção 1: Teste Automatizado

1. Abra um servidor local:
   ```bash
   cd frontend/web
   # Escolha uma das opções:
   
   # Python
   python -m http.server 8000
   
   # Node.js (http-server)
   npx http-server -p 8080
   
   # VS Code Live Server (extensão)
   # Clique com botão direito no index.html > Open with Live Server
   ```

2. Acesse no navegador: `http://localhost:8000/test-firebase.html`

3. Clique nos botões de teste:
   - **"Testar Firestore"** - Verifica leitura/escrita no banco
   - **"Testar Authentication"** - Verifica se auth está configurado

4. Verifique o log. Deve aparecer:
   - ✅ Firebase inicializado com sucesso
   - ✅ Firestore conectado
   - ✅ Authentication disponível

### Opção 2: Teste Manual

1. Abra `index.html` no navegador (com servidor local)
2. Abra o Console do navegador (F12)
3. Deve aparecer: `🔥 Firebase inicializado com sucesso!`
4. Se houver doações no banco, elas aparecerão na tela

---

## 🐛 Solução de Problemas Comuns

### Erro: "Missing or insufficient permissions"

**Causa:** Security Rules não estão aplicadas ou estão incorretas

**Solução:**
1. Vá em Firestore > Regras
2. Verifique se copiou todo o conteúdo de `database/security-rules.txt`
3. Clique em "Publicar"
4. Aguarde alguns segundos e tente novamente

### Erro: "Firebase: Error (auth/configuration-not-found)"

**Causa:** Email/Password não está ativado no Authentication

**Solução:**
1. Vá em Authentication > Sign-in method
2. Ative "Email/Password"
3. Salve

### Erro: "Failed to get document because the client is offline"

**Causa:** Firestore Database não foi criado

**Solução:**
1. Vá em Firestore Database
2. Clique em "Criar banco de dados"
3. Escolha modo "Produção"
4. Aguarde criação

### Erro de CORS ou "No 'Access-Control-Allow-Origin'"

**Causa:** Abrindo HTML diretamente do sistema de arquivos

**Solução:**
- Sempre use um servidor local (Python, Node, Live Server)
- NUNCA abra o arquivo HTML diretamente (file:///)

---

## ✅ Checklist de Configuração

Antes de prosseguir, verifique:

- [ ] Projeto Firebase criado: "conecta-doacoes-fc684"
- [ ] Firestore Database criado (modo produção)
- [ ] Security Rules aplicadas (de `database/security-rules.txt`)
- [ ] Authentication ativado (Email/Password)
- [ ] Teste de conexão funcionando (`test-firebase.html`)
- [ ] Console do navegador sem erros

---

## 🎯 Próximos Passos no Desenvolvimento

Após configurar o Firebase, você pode:

1. **Criar a tela de Login/Cadastro** (`login.html`)
2. **Criar a tela de Nova Doação** (`nova-doacao.html`)
3. **Criar a tela Meus Itens** (`meus-itens.html`)
4. **Implementar sistema de mensagens** (`messages.js`)
5. **Testar todos os fluxos**

---

## 📞 Precisa de Ajuda?

Se encontrar algum erro:

1. Verifique o Console do navegador (F12)
2. Verifique o log do Firebase Console
3. Confira se todos os passos acima foram seguidos
4. Consulte a documentação: https://firebase.google.com/docs

---

## 📊 Status Atual do Projeto

**Fase 1: Planejamento e Configuração** - 50% concluída

✅ Estrutura criada
✅ Firebase configurado no código
✅ Documentação básica
⏳ Firebase Console (aguardando sua configuração)
⏳ Teste de conexão

Após configurar o Firebase Console, a Fase 1 estará 100% completa! 🎉

---

**Última Atualização:** 19/11/2025

