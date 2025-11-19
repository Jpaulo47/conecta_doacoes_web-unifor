# 🚀 Como Iniciar o Projeto

## ⚡ Início Rápido (3 Passos)

### 1️⃣ Configure o Firebase Console (5 minutos)

```
1. Acesse: https://console.firebase.google.com/
2. Selecione: "conecta-doacoes-fc684"
3. Vá em: Firestore Database > Criar banco de dados
4. Vá em: Regras > Copie de database/security-rules.txt > Publicar
5. Vá em: Authentication > Verificar Email/Password está ativo
```

**📖 Guia detalhado:** `PROXIMOS_PASSOS_FIREBASE.md`

---

### 2️⃣ Inicie o Servidor Local

**Opção A - Python:**
```bash
cd frontend/web
python -m http.server 8000
```
Abra: `http://localhost:8000`

**Opção B - Node.js:**
```bash
cd frontend/web
npx http-server -p 8080
```
Abra: `http://localhost:8080`

**Opção C - VS Code:**
1. Instale extensão "Live Server"
2. Clique direito em `frontend/web/index.html`
3. "Open with Live Server"

---

### 3️⃣ Teste a Conexão

```
Abra: http://localhost:8000/test-firebase.html

Clique em:
✅ "Testar Firestore"
✅ "Testar Authentication"

Resultado esperado: ✅ Verde = Tudo OK!
```

---

## 📂 Arquivos Importantes

| Arquivo | O que é | Quando usar |
|---------|---------|-------------|
| `index.html` | Página principal | Sempre |
| `test-firebase.html` | Teste de conexão | Ao configurar Firebase |
| `PROXIMOS_PASSOS_FIREBASE.md` | Guia de setup | **LEIA AGORA!** |
| `CONFIGURACAO_COMPLETA.md` | Resumo do que foi feito | Para entender estrutura |
| `STATUS_DO_PROJETO.md` | Dashboard de progresso | Acompanhar tarefas |
| `prompt_master.md` | Guia completo do MVP | Referência geral |

---

## 🎯 Fluxo de Trabalho Sugerido

### Hoje (Configuração):
```
✅ Ler este arquivo
✅ Configurar Firebase Console
✅ Testar conexão
✅ Ver index.html funcionando
```

### Amanhã (Desenvolvimento):
```
⏳ Criar tela login.html
⏳ Criar tela nova-doacao.html
⏳ Criar tela meus-itens.html
⏳ Testar cadastro de usuário
⏳ Testar cadastro de doação
```

### Esta Semana (Frontend):
```
⏳ Completar todas as páginas
⏳ Integrar sistema de mensagens
⏳ Testar responsividade
⏳ Implementar validações
```

---

## 🔍 Verificação Rápida

Execute este checklist antes de continuar:

### Firebase Console:
- [ ] Firestore Database criado
- [ ] Security Rules aplicadas
- [ ] Authentication ativo (Email/Password)

### Código Local:
- [ ] Servidor local rodando
- [ ] `test-firebase.html` com testes verdes
- [ ] Console do navegador (F12) sem erros
- [ ] `index.html` carregando corretamente

### Arquivos:
- [ ] `firebase-config.js` com suas credenciais
- [ ] `auth.js` e `donations.js` criados
- [ ] `styles.css` carregando
- [ ] Pastas criadas conforme estrutura

**✅ Se todos estiverem OK, você está pronto para desenvolver!**

---

## 🐛 Erros Comuns e Soluções

### Erro: "Firebase not initialized"
```
Causa: Firebase ainda não foi configurado no Console
Solução: Siga o guia PROXIMOS_PASSOS_FIREBASE.md
```

### Erro: "CORS error" ou "Access-Control-Allow-Origin"
```
Causa: Abrindo arquivo HTML diretamente (file:///)
Solução: Use servidor local (Python, Node ou Live Server)
```

### Erro: "Missing or insufficient permissions"
```
Causa: Security Rules não aplicadas
Solução: Copie database/security-rules.txt para Firebase Console
```

### Erro: "Module not found" ou "Failed to load"
```
Causa: Caminhos incorretos ou servidor não iniciado
Solução: Verifique se está em frontend/web/ ao iniciar servidor
```

---

## 💡 Dicas Úteis

### 1. Console do Navegador (F12)
- Use para ver logs do Firebase
- Mensagens de sucesso/erro aparecem aqui
- Comandos: `console.log('🔥 Firebase:', app)`

### 2. Firebase Console
- Veja dados em tempo real
- Monitore erros de security rules
- Acompanhe usuários cadastrados

### 3. Git/GitHub
```bash
# Fazer commits frequentes
git add .
git commit -m "Descrição do que fez"
git push origin main
```

### 4. Backup
- Sempre salve antes de grandes mudanças
- Use branches do Git para features
- Documente o que fizer

---

## 📞 Recursos Úteis

| Recurso | Link |
|---------|------|
| Firebase Docs | https://firebase.google.com/docs |
| Bootstrap Docs | https://getbootstrap.com/docs/5.3/ |
| Firebase Console | https://console.firebase.google.com/ |
| JavaScript MDN | https://developer.mozilla.org/pt-BR/ |

---

## 🎯 Meta do Projeto

**Entregar MVP funcional até:** 01/12/2025, 23h59

**Funcionalidades essenciais (P0):**
- ✅ Autenticação (login/cadastro)
- ✅ Listar doações
- ✅ Cadastrar doação
- ✅ Editar/excluir doação
- ✅ Enviar mensagens
- ✅ Visualizar mensagens

**Progresso atual:** ~15% (Configuração inicial)

---

## 🚦 Status Atual

```
┌───────────────────────────────────┐
│  PROJETO: Conecta Doações         │
│  STATUS: Configuração Concluída   │
│  PRÓXIMO: Firebase Console Setup  │
│                                   │
│  ✅ Código: Pronto                │
│  ⏳ Firebase: Aguardando você     │
│  ⏳ Testes: Pendente              │
└───────────────────────────────────┘
```

---

## 🎬 Ação Imediata

**FAÇA AGORA:**

1. Abra: `PROXIMOS_PASSOS_FIREBASE.md`
2. Configure o Firebase Console (10 minutos)
3. Teste com `test-firebase.html`
4. Comemore! 🎉

**Depois:**

1. Leia: `STATUS_DO_PROJETO.md` para ver próximas tarefas
2. Continue desenvolvimento das telas
3. Commit frequente no Git

---

## ✅ Tudo Pronto?

Se você:
- ✅ Configurou Firebase Console
- ✅ Testou e está verde
- ✅ Servidor local rodando
- ✅ Entendeu a estrutura

**Parabéns! Você está pronto para desenvolver! 🚀**

Próximo arquivo a criar: `frontend/web/login.html`

---

**Última Atualização:** 19/11/2025  
**Tempo estimado de setup:** 15-20 minutos  
**Dificuldade:** ⭐⭐☆☆☆ (Fácil-Médio)

---

**Boa sorte! Vamos criar um MVP incrível! 💪🌱**

