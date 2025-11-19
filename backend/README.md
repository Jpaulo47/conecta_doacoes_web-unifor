# Backend - Conecta Doações

## Arquitetura Backend

Este projeto utiliza **Firebase** como solução de backend completa, eliminando a necessidade de criar e manter uma API REST própria.

## Serviços Firebase Utilizados

### 1. **Firebase Authentication**
- Gerenciamento completo de usuários
- Método de autenticação: Email/Password
- Funcionalidades:
  - Cadastro de novos usuários
  - Login/Logout
  - Recuperação de senha
  - Gestão de sessão

### 2. **Cloud Firestore**
- Banco de dados NoSQL em tempo real
- Collections utilizadas:
  - `users` - Dados dos usuários
  - `donations` - Itens para doação
  - `messages` - Mensagens entre usuários

### 3. **Firebase Storage** (Opcional)
- Armazenamento de imagens dos itens
- Alternativa: URLs externas de imagens

### 4. **Firebase Hosting**
- Deploy da aplicação web
- HTTPS automático
- CDN global

## Configuração

As configurações do Firebase estão localizadas em:
```
frontend/web/js/firebase-config.js
```

## Security Rules

As regras de segurança do Firestore estão documentadas em:
```
database/security-rules.txt
```

## Documentação Completa

Para mais detalhes sobre a API do Firebase, consulte:
```
docs/api/api_documentation.md
```

## Vantagens desta Arquitetura

✅ **Sem necessidade de servidor próprio**
- Firebase gerencia toda infraestrutura

✅ **Escalabilidade automática**
- Suporta crescimento sem configuração adicional

✅ **Segurança integrada**
- Firebase Security Rules protegem os dados

✅ **Desenvolvimento mais rápido**
- Foco nas funcionalidades do MVP

✅ **Custo reduzido**
- Plano gratuito suficiente para MVP

## Limitações do MVP

❌ Não possui API REST própria (conforme especificação)
❌ Não possui servidor Node.js/Express
✅ Todas as operações são realizadas diretamente via Firebase SDK

---

**Nota:** Esta arquitetura está alinhada com os requisitos da Etapa 2 (N708) que especifica o uso de Firebase como backend.

