# API de usuários

Uma API básica de registro e autenticação de usuários.

## Tecnologias utilizadas

- Node.js
- Fastify
- Prisma ORM
- Vitest
- Docker

# Rotas

### /users

Registro de usuários, são necessários o nome, e-mail e senha.

### /users/sessions

Autenticação de usuários, são necessários o e-mail e senha criada. Retornará um JWT (JSON Web Token).