# Testes Automatizados - Conecta Doações

## Configuração

Para executar os testes, instale as dependências:

```bash
npm install
```

## Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## Estrutura de Testes

- `auth.test.js` - Testes de autenticação
  - Validação de estrutura de dados
  - Validação de formato de e-mail
  - Validação de senha
  - Validação de endereço
  - Códigos de erro do Firebase

- `donations.test.js` - Testes de doações
  - Estrutura de dados de doação
  - Validação de categorias, condições e status
  - Validação de imagens (máximo 3)
  - Cálculo de estatísticas
  - Validação de filtros

- `messages.test.js` - Testes de mensagens
  - Estrutura de mensagem
  - Validação de envio (prevenir envio para próprio item)
  - Agrupamento em conversas
  - Status de leitura
  - Respostas a mensagens
  - Filtros de mensagens

- `setup.js` - Configuração e mocks globais

## Observação

Os testes estão focados em:
1. **Validação de estrutura de dados** - Garantir que os dados têm o formato correto
2. **Validação de regras de negócio** - Verificar lógica de validação
3. **Cálculos e transformações** - Testar funções de processamento de dados
4. **Agrupamentos e filtros** - Verificar lógica de agrupamento e filtragem

Devido aos imports via CDN do Firebase, os testes focam em validar a estrutura, formato de dados e lógica de negócio, que são os aspectos mais importantes e testáveis sem um ambiente Firebase completo.

## Testes Implementados

### auth.test.js
- ✅ Validação de estrutura de cadastro
- ✅ Validação de formato de endereço
- ✅ Validação de formato de e-mail
- ✅ Validação de tamanho mínimo de senha
- ✅ Validação de nome completo
- ✅ Estrutura de respostas (sucesso/erro)
- ✅ Mapeamento de códigos de erro do Firebase

### donations.test.js
- ✅ Estrutura de dados de doação
- ✅ Validação de categorias permitidas
- ✅ Validação de condições permitidas
- ✅ Validação de status permitidos
- ✅ Limite de 3 imagens por item
- ✅ Validação de campos obrigatórios
- ✅ Cálculo de estatísticas
- ✅ Normalização de status
- ✅ Validação de URLs de imagem

### messages.test.js
- ✅ Estrutura de mensagem
- ✅ Validação de mensagem mínima (10 caracteres)
- ✅ Prevenção de envio para próprio item
- ✅ Agrupamento em conversas
- ✅ Ordenação por data
- ✅ Status de leitura
- ✅ Contagem de não lidas
- ✅ Respostas a mensagens (inversão sender/receiver)
- ✅ Linkagem de respostas
- ✅ Filtros de mensagens

## Cobertura de Testes

Os testes cobrem:
- ✅ Validação de dados de entrada
- ✅ Estrutura de respostas
- ✅ Regras de negócio principais
- ✅ Cálculos e transformações
- ✅ Agrupamentos e filtros
- ✅ Validação de formatos


**Última Atualização:** 19/11/2025
