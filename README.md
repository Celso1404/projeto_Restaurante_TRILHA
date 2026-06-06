# Projeto Restaurante Saboroso

Bem-vindo ao repositório do **Restaurante Saboroso**, uma aplicação web full-stack desenvolvida para gerenciar as operações de um restaurante fictício. Este projeto foi desenvolvido utilizando Node.js e inclui um site público dinâmico e um painel administrativo completo.

## 🚀 Tecnologias Utilizadas

* **Back-end:** Node.js, Express.js
* **Banco de Dados:** MySQL (via pacote `mysql2`)
* **Front-end (Site Público):** HTML5, CSS3, JavaScript, EJS (Embedded JavaScript templating), Bootstrap
* **Front-end (Painel Admin):** AdminLTE (Bootstrap 3), FontAwesome, Ionicons

## 📁 Estrutura do Projeto

O projeto está dividido nas seguintes áreas principais:

### 1. Sistema de Views (Site Público)
Arquivos `.ejs` responsáveis pela interface que o cliente acessa.
* `index.ejs`, `menus.ejs`, `reservations.ejs`, `services.ejs`, `contacts.ejs`
* Componentes reutilizáveis (Includes): Cabeçalhos (`header.ejs`), rodapés (`footer.ejs`), alertas e blocos de conteúdo dinâmico (pratos populares, serviços, formulários de reserva e contato).

### 2. Rotas (`/routes`)
Controladores da aplicação que gerenciam as requisições HTTP:
* `index.js`: Gerencia as rotas principais do site (Home, Contatos, Menus, Reservas, Serviços), recebendo dados de formulários (`POST`) e renderizando as páginas (`GET`).
* `users.js`: Rota base para gerenciamento de usuários do sistema.

### 3. Modelos e Banco de Dados (`/inc`)
Scripts que interagem diretamente com o banco de dados MySQL:
* `db.js`: Configuração e exportação da conexão com o banco de dados `saboroso`.
* `menus.js`: Funções para resgatar os pratos do banco.
* `reservations.js`: Funções para renderizar a página de reservas e salvar novos agendamentos na tabela `tb_reservations`.
* `contacts.js`: Funções para salvar as mensagens recebidas via formulário na tabela `tb_contacts`.

### 4. Painel Administrativo (`/public/admin`)
Interface restrita para gerenciamento do restaurante, baseada no template AdminLTE.
* `index.html`: Tela inicial com dashboard e métricas.
* `menus.html`: Gerenciamento do cardápio (CRUD de pratos).
* `reservations.html`: Gestão de reservas de mesas com filtros por data.
* `contacts.html` e `emails.html`: Visualização de mensagens e leads de newsletter.
* `users.html`: Controle de acesso e permissões de usuários administradores.
* `login.html`: Tela de autenticação do sistema.

## ⚙️ Funcionalidades

* **Cardápio Dinâmico:** Os pratos são puxados diretamente do banco de dados e exibidos no site.
* **Reservas de Mesas:** Sistema integrado onde clientes enviam pedidos de reserva que caem diretamente no painel de administração.
* **Fale Conosco:** Formulário de contato validado e conectado ao banco de dados.
* **Painel Admin Completo:** Gestão total do conteúdo (adicionar/editar pratos, aprovar reservas, ler mensagens, cadastrar usuários).

## 🛠️ Como Executar o Projeto

1. Clone o repositório.
2. Certifique-se de ter o Node.js e o MySQL instalados na sua máquina.
3. Instale as dependências executando:
   ```bash
   npm install
   ```
4. Crie um banco de dados MySQL chamado `saboroso` e importe o schema/tabelas necessárias (`tb_menus`, `tb_reservations`, `tb_contacts`, `tb_users`).
5. Configure as credenciais do banco de dados no arquivo `/inc/db.js` (usuário e senha).
6. Inicie a aplicação:
   ```bash
   npm start
   ```
7. Acesse o site em `http://localhost:3000` (ou a porta configurada no seu arquivo principal).

---
*Desenvolvido como parte do curso prático de JavaScript.*