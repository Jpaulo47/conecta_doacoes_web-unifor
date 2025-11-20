# 🌱 Conecta Doações

> Juntos por um Futuro Sustentável - Conectando doadores e beneficiários em comunidades locais

[![Firebase](https://img.shields.io/badge/Firebase-10.7.1-orange)](https://firebase.google.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-green)]()

---

## 📖 Sobre o Projeto

**Conecta Doações** é uma plataforma web que facilita a doação de itens em comunidades locais, promovendo a economia circular e contribuindo para cidades mais sustentáveis, em alinhamento com o **ODS 11 - Cidades e Comunidades Sustentáveis**.

### 🎯 Problema que Soluciona

- **Desperdício**: Muitos itens em bom estado são descartados por falta de canais de doação acessíveis
- **Desigualdade**: Pessoas que precisam de itens não têm acesso facilitado a doadores
- **Sustentabilidade**: Falta de incentivo à reutilização e economia circular

### 💡 Solução

Uma plataforma simples e intuitiva que conecta quem quer doar com quem precisa, eliminando barreiras e promovendo sustentabilidade urbana.

---

## 🌍 ODS 11 - Cidades e Comunidades Sustentáveis

Este projeto contribui diretamente para a **Meta 11.6**:

> "Até 2030, reduzir o impacto ambiental negativo per capita das cidades, inclusive prestando especial atenção à gestão de resíduos"

### Como Contribuímos:

✅ **Redução de Resíduos**: Incentiva reutilização ao invés de descarte  
✅ **Economia Circular**: Promove ciclo de vida estendido dos produtos  
✅ **Inclusão Social**: Facilita acesso a itens para comunidades carentes  
✅ **Conscientização**: Educa sobre práticas sustentáveis

---

## ⚙️ Funcionalidades

### ✅ Implementadas

- [x] **Autenticação de Usuários**
  - Cadastro com nome, e-mail, senha e endereço completo
  - Integração com ViaCEP para busca automática de endereço
  - Login/Logout

- [x] **Navegação e Descoberta**
  - Listagem pública de doações disponíveis
  - Busca por nome do item
  - Filtros por categoria (Móveis, Roupas, Eletrônicos, etc.)
  - Filtros por condição (Novo, Usado, Precisa Reparo)
  - Visualização detalhada de itens

- [x] **Gestão de Doações**
  - Cadastrar nova doação
  - Listar minhas doações
  - Editar doações próprias
  - Excluir doações próprias
  - Gerenciar status (Disponível, Reservado, Doado)

- [x] **Sistema de Mensagens**
  - Enviar mensagem ao doador
  - Visualizar mensagens recebidas
  - Marcar mensagens como lidas

- [x] **Interface Responsiva**
  - Design mobile-first
  - Navbar dinâmica baseada em autenticação
  - Cards visuais de doações

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização customizada
- **Bootstrap 5.3** - Framework CSS responsivo
- **JavaScript ES6+** - Lógica e interatividade

### Backend & Database
- **Firebase Authentication** - Gerenciamento de usuários
- **Cloud Firestore** - Banco de dados NoSQL em tempo real
- **Firebase Hosting** - Deploy e hospedagem

### Ferramentas
- **Git & GitHub** - Versionamento de código
- **VS Code** - Editor de código
- **Chrome DevTools** - Debug e testes

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────┐
│   Cliente   │
│  (Browser)  │
└──────┬──────┘
       │
       │ HTTPS
       ▼
┌─────────────────────┐
│  Firebase Hosting   │
│   (index.html)      │
└──────┬──────────────┘
       │
       │ Firebase SDK
       ▼
┌─────────────────────────────────┐
│        Firebase Services        │
│  ┌──────────────────────────┐  │
│  │  Authentication          │  │
│  │  (Email/Password)        │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │  Cloud Firestore         │  │
│  │  - users                 │  │
│  │  - donations             │  │
│  │  - messages              │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │  Security Rules          │  │
│  └──────────────────────────┘  │
└─────────────────────────────────┘
```

### Componentes Principais

- **firebase-config.js**: Configuração e inicialização do Firebase
- **auth.js**: Módulo de autenticação (cadastro, login, logout)
- **donations.js**: Módulo CRUD de doações
- **messages.js**: Módulo de mensagens entre usuários
- **styles.css**: Estilos customizados do tema verde sustentável

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge)
- Servidor web local (Live Server, http-server, etc.)
- Conexão com internet (para Firebase)

### Instalação

1. **Clone o repositório**
```bash
[git clone https://github.com/[seu-usuario]/conecta-doacoes.git](https://github.com/Jpaulo47/conecta_doacoes_web-unifor.git)
cd conecta-doacoes
```

2. **Configure o Firebase** (caso queira usar seu próprio projeto)

Edite o arquivo `frontend/web/js/firebase-config.js` com suas credenciais:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  // ...
};
```

3. **Execute o projeto**

Opção 1 - Live Server (VS Code):
- Instale a extensão "Live Server"
- Clique com botão direito em `frontend/web/index.html`
- Selecione "Open with Live Server"

Opção 2 - http-server (Node.js):
```bash
npm install -g http-server
cd frontend/web
http-server
```

Opção 3 - Python:
```bash
cd frontend/web
python -m http.server 8000
```

4. **Acesse no navegador**
```
http://localhost:5500  (Live Server)
http://localhost:8080  (http-server)
http://localhost:8000  (Python)
```

---

## 🌐 Acesso ao Sistema

### 🔗 URL de Produção
**🚀 Sistema no ar:** [https://conecta-doacoes-fc684.web.app](https://conecta-doacoes-fc684.web.app)

### 👤 Credenciais de Teste
Você pode criar sua própria conta ou usar para testes:
- **Crie uma conta:** Clique em "Cadastrar" e preencha o formulário
- **Sistema totalmente funcional** com cadastro, doações e mensagens

---

## 📂 Estrutura do Projeto

```
conecta-doacoes/
├── frontend/
│   └── web/
│       ├── index.html              # Página principal (Home)
│       ├── login.html              # Login/Cadastro
│       ├── nova-doacao.html        # Cadastrar nova doação
│       ├── meus-itens.html         # Gerenciar minhas doações
│       ├── editar-item.html        # Editar doação
│       ├── detalhes.html           # Detalhes do item
│       ├── mensagens.html          # Sistema de mensagens
│       ├── perfil.html             # Editar perfil do usuário
│       ├── sobre.html              # Página sobre o projeto
│       ├── como-funciona.html      # Como funciona a plataforma
│       ├── css/
│       │   ├── styles.css          # Estilos globais
│       │   ├── statistics.css      # Estilos de estatísticas
│       │   ├── mobile-fix.css      # Correções para navbar mobile
│       │   └── sidebar-mobile-fix.css  # Correções para sidebar mobile
│       ├── js/
│       │   ├── firebase-config.js  # Configuração Firebase
│       │   ├── auth.js             # Módulo de autenticação
│       │   ├── donations.js        # CRUD de doações
│       │   ├── messages.js         # Sistema de mensagens
│       │   └── mobile-menu-fix.js  # Fix para menu mobile
│       └── tests/
│           ├── auth.test.js        # Testes de autenticação
│           ├── donations.test.js   # Testes de doações
│           ├── messages.test.js    # Testes de mensagens
│           ├── setup.js            # Configuração do Jest
│           └── __mocks__/          # Mocks do Firebase
├── backend/
│   └── README.md                   # Explicação sobre Firebase BaaS
├── database/
│   ├── schema.md                   # Modelo de dados Firestore
│   └── security-rules.txt          # Regras de segurança
├── docs/
│   ├── requirements/
│   │   └── requirements.md         # Requisitos completos
│   ├── architecture/
│   │   └── architecture.md         # Arquitetura do sistema
│   └── api/
│       └── api_documentation.md    # Documentação da API Firebase
├── validation/
│   ├── target_audience.md          # Definição do público-alvo (template)
│   ├── validation_report.md        # Relatório de validação (template)
│   ├── INSTRUCOES_VALIDACAO.md     # Guia completo para validação
│   ├── evidence/                   # Fotos/vídeos da validação
│   └── feedback/                   # Feedbacks coletados
├── prototypes/                     # Protótipos da Etapa 1 (N705)
├── .gitignore
├── .firebaserc                     # Configuração do Firebase
├── firebase.json                   # Configuração do Firebase Hosting
├── jest.config.js                  # Configuração do Jest
├── package.json                    # Dependências do projeto
├── .babelrc                        # Configuração do Babel
└── README.md                       # Este arquivo
```

---

## 👥 Validação com Público-Alvo

**Status:** 📋 Estrutura preparada - Aguardando realização

### Próximos Passos

A validação será realizada com instituições e pessoas específicas que trabalham com doações. A estrutura completa de documentação foi preparada:

- ✅ Templates de documentação criados
- ✅ Questionário estruturado preparado
- ✅ Guia completo de instruções disponível
- 📅 Agendamento com público-alvo em andamento

**Documentação:**
- 📝 [Instruções completas para validação](validation/INSTRUCOES_VALIDACAO.md)
- 📋 [Template de definição de público-alvo](validation/target_audience.md)
- 📊 [Template de relatório de validação](validation/validation_report.md)

Após a validação, os feedbacks coletados serão analisados e melhorias serão implementadas no sistema.

---

## 👨‍💻 Equipe de Desenvolvimento

- **Rodrigo Gomes** - Desenvolvedor Full Stack
- **Matrícula:** [A definir]

---

## 📝 Status do Projeto

**Fase Atual:** Implementação Completa ✅  
**Progresso Técnico:** 100% (Aguardando apenas validação com público-alvo)  
**Sistema:** Totalmente funcional e em produção

🔗 **URL:** https://conecta-doacoes-fc684.web.app

---

## 📚 Documentação Adicional

- 📋 [Requisitos do Sistema](docs/requirements/requirements.md)
- 🏗️ [Arquitetura do Sistema](docs/architecture/architecture.md)
- 🔌 [Documentação da API](docs/api/api_documentation.md)
- 🗄️ [Schema do Banco de Dados](database/schema.md)
- 🔒 [Security Rules](database/security-rules.txt)
- 🎨 [Protótipos Visuais](prototypes/)
- ✅ [Testes Automatizados](frontend/web/tests/README.md)

---

## 🤝 Como Contribuir

Este é um projeto acadêmico (MVP - Etapa 2 - N708), mas sugestões são bem-vindas!

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Ver arquivo `LICENSE` para mais detalhes.

---

## 📞 Contato

**Rodrigo Gomes**  
📧 E-mail: [seu-email@example.com]  
🔗 LinkedIn: [seu-linkedin]  
🐙 GitHub: [@seu-usuario](https://github.com/seu-usuario)

---

## 🙏 Agradecimentos

- **Universidade/Instituição** - Pelo projeto desafiador
- **Firebase** - Pela plataforma robusta e gratuita
- **Bootstrap** - Pelo framework CSS responsivo
- **Comunidade Open Source** - Por todo conhecimento compartilhado

---

<div align="center">

**Conecta Doações** - Contribuindo para um mundo mais sustentável 🌱

Desenvolvido com ❤️ para a comunidade

</div>

---

**Última Atualização:** 20/11/2025  
**Versão:** 1.0.0 (MVP Completo - Aguardando Validação)

