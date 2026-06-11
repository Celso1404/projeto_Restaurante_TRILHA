# 🍽️ Restaurante Saboroso - Sistema Web & Painel Administrativo

> Um sistema web full-stack completo para gestão de um restaurante, contemplando um site dinâmico voltado para o cliente final e um painel administrativo robusto, reativo e seguro para a gestão do estabelecimento.

Este projeto foi desenvolvido com foco nas melhores práticas de desenvolvimento de software. O backend foi construído com **Node.js**, **Express**, e **MySQL**, utilizando uma arquitetura moderna baseada em `Promises` e `async/await`. O frontend administrativo conta com um layout elegante construído sobre o **AdminLTE** e **Bootstrap 3**, utilizando componentes em **JavaScript Vanilla Orientado a Objetos** para requisições assíncronas (AJAX), manipulação de DOM e atualizações em tempo real com **Socket.io**.

---

## ✨ Principais Funcionalidades

### 🌐 Site Público (Front-end)
* **Cardápio Dinâmico:** Exibição de pratos com sistema de destaques embaralhados aleatoriamente na página inicial.
* **Reservas Inteligentes:** Formulário de reservas de mesas integrado no banco de dados.
* **Fale Conosco & Newsletter:** Sistema de envio de mensagens de contato e captura de e-mails para campanhas de marketing.

### 🔒 Painel Administrativo (Back-end)
* **Dashboard em Tempo Real:** Visão geral com contadores atualizados instantaneamente (via `Socket.io`) e gráficos analíticos de reservas.
* **Gestão de Reservas:** Sistema de aprovação e edição com controle de status dinâmico (Pendente, Confirmada, Cancelada, Finalizada) e paginação inteligente processada direto no banco de dados (`SQL_CALC_FOUND_ROWS`).
* **Gestão de Cardápio:** Upload de imagens com preview instantâneo (via `FileReader` API) utilizando o `formidable` para processamento no backend, além de controle completo do menu.
* **Gestão de Contatos e E-mails:** Visualização e exclusão de mensagens recebidas e e-mails de newsletter.
* **Segurança e Autenticação Avançadas:**
  * Login seguro com controle de sessões otimizado via **Redis**.
  * Senhas fortemente criptografadas no banco de dados utilizando **bcrypt**.
  * Arquitetura inteligente de *fallback* para migração transparente e segura de senhas legadas (texto puro para hash).
  * Proteção de credenciais, portas e chaves da aplicação utilizando variáveis de ambiente (`.env`).
* **Componentes JS Reutilizáveis (POO):** Criação de classes próprias (`HcodeGrid`, `HcodeFileReader`) e protótipos de formulário (`HTMLFormElement.prototype.save`) para padronizar o comportamento assíncrono (AJAX) com a `Fetch API` em todas as telas do painel.

---

## 🚀 Tecnologias e Versões Utilizadas

**Back-end:**
* **Express.js:** `^4.15.2`
* **MySQL2:** `^3.22.4` (Com suporte nativo a Promises)
* **Sessões de Alta Performance:** `redis (^3.1.2)` e `connect-redis (^6.1.3)`
* **Segurança:** `bcrypt (^6.0.0)` e `dotenv (^17.4.2)`
* **Real-time:** `socket.io (^4.8.3)`
* **Manipulação de Datas:** `moment (^2.30.1)`
* **Upload de Arquivos:** `formidable (^3.5.4)`
* **Middlewares e Utilitários:** `express-session (^1.19.0)`, `body-parser (^2.2.2)`, `cookie-parser (~1.4.4)`, `morgan (~1.9.1)`

**Front-end:**
* **JavaScript Vanilla:** ES6+ Classes, Fetch API
* **Template Engine:** `EJS (~2.6.1)` (Uso avançado de partials para componentização)
* **Framework CSS:** AdminLTE & Bootstrap 3

---

## ⚙️ Variáveis de Ambiente (.env)

Para rodar este projeto com segurança, você precisará criar um arquivo chamado `.env` na raiz do repositório contendo as seguintes configurações:

```env
# Configurações do Banco de Dados
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha_secreta
MYSQL_DATABASE=saboroso

# Configurações da Aplicação
SESSION_SECRET=chave_super_secreta_para_sessoes
PORT=3000

#COMO RODAR O PROJETO

git clone [https://github.com/seu-usuario/restaurante-saboroso.git](https://github.com/seu-usuario/restaurante-saboroso.git)

2 - Acessar a pasta do projeto e rodar as dependências

npm install

3 - Acesse as aplicações no seu navegador:

Site Público: http://localhost:3000

Painel Admin: http://localhost:3000/admin (Faça o login inicial com o usuário padrão e altere a senha imediatamente para gerar o Hash de segurança).

