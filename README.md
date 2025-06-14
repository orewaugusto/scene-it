# scene-it

## 1. Membros do grupo

- Daniel Augusto Lopes
- Pedro Henrique Madeira de Oliveira Pereira
- Pedro Henrique Silva Goncalves de Souza

## 2. Explicação do sistema

Este sistema é uma aplicação web que permite aos usuários buscar, avaliar e comentar sobre filmes. O projeto tem como objetivo simular uma plataforma semelhante ao Letterboxd, permitindo que usuários:

- Realizem buscas por filmes com base em títulos, utilizando a API do The Movie Database (TMDb);
- Cadastrem-se no sistema;
- Criem avaliações, incluindo nota e comentários para filmes específicos;

A arquitetura do sistema segue um padrão em camadas: `Router → Controller → Service → Repository → Banco de dados`, com separação clara de responsabilidades e uso de interfaces para desacoplamento e testes.
Até aqui foram implementados apenas os endpoints mais fundamentais do sistema, como cadastro de usuários, busca e criação de avaliações de filmes. A integração com o front-end ainda não foi realizada. Existem funcionalidades secundárias ainda a serem implementadas posteriormente, como a possibilidade de usuários seguirem uns aos outros, criarem listas personalizadas de filmes e interagirem com o conteúdo da comunidade.

---

## 3. Tecnologias utilizadas

- **Node.js** com **Express** para criação da API REST.
- **TypeScript** para tipagem estática e maior segurança durante o desenvolvimento.
- **Prisma ORM** como camada de acesso ao banco de dados relacional (PostgreSQL).
- **Supabase** como plataforma de banco de dados hospedado.
- **class-validator** para validação declarativa dos dados recebidos nos DTOs.
- **Jest** para testes unitários.
- **TMDb API** para obtenção de dados reais de filmes (título, descrição, ano, imagem, etc.).
- **Arquitetura em camadas** e uso extensivo de **interfaces** para garantir testabilidade e modularidade.

---
