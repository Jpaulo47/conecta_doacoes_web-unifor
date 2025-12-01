# Backend - Conecta Doações

## Arquitetura Backend

Este projeto utiliza **Firebase** como solução de backend completa, eliminando a necessidade de criar e manter uma API REST própria.

## Serviços Firebase Utilizados

### 1. **Firebase Authentication**
- Gerenciamento completo de usuários
- Método de autenticação: Email/Password
- Funcionalidades:
  - Cadastro de novos usuários com endereço completo
  - Integração com ViaCEP para busca automática de endereço
  - Login/Logout
  - Gestão de sessão

### 2. **Cloud Firestore**
- Banco de dados NoSQL em tempo real
- Collections utilizadas:
  - `users` - Dados dos usuários com endereço completo
  - `donations` - Itens para doação com múltiplas imagens
  - `messages` - Mensagens entre usuários com sistema de threads

### 3. **Firebase Storage**
- Armazenamento de imagens dos itens
- Suporte a múltiplas imagens (até 3 por item)
- URLs públicas para acesso às imagens

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

## Justificativa da Arquitetura

✅ **Firebase como Backend-as-a-Service (BaaS)**
- A proposta N708 lista Firebase como ferramenta oficial
- Firebase fornece backend completo (autenticação, banco de dados, storage)
- Elimina necessidade de servidor próprio
- Todas as operações são realizadas via Firebase SDK

✅ **Benefícios para o MVP:**
- Desenvolvimento mais rápido e focado nas funcionalidades
- Escalabilidade automática
- Segurança integrada (Security Rules)
- Custo zero (plano gratuito)
- Deploy simplificado

