# 🚧 README em construção 🚧

# Sobre o Projeto 

- Neste projeto foi desenvolvido uma API para ser consumida por um frontend ja fornecido, onde é apresentado uma tabela relacionadas a partidas de futebol.
- Usando a ORM sequelize para fazer coletar, criar e remover informações do banco.

<a href="./img/xxxxxxxxxx.png">
  <img src="./img/xxxxxxxxxx.png" width="30%"></img>
</a>
<a href="./img/xxxxxxxxxx.png">
  <img src="./img/xxxxxxxxxx.png" width="30%"></img>
</a>
<a href="./img/xxxxxxxxxx.png">
  <img src="./img/xxxxxxxxxx.png" width="30%"></img>
</a>

# Tecnologias e ferramentas usadas 🛠

![TypeScript](https://img.shields.io/badge/-TypeScript-235a97?style=flat-square&logo=typescript&logoColor=ffffff)
![Mocha](https://img.shields.io/badge/-Mocha-896446?style=flat-square&logo=mocha&logoColor=ffffff)
![Chai](https://img.shields.io/badge/-Chai-a40802?style=flat-square&logo=chai)
![Sinon](https://img.shields.io/badge/-Sinon-a0d3a4?style=flat-square&logo=sinon)
![Docker](https://img.shields.io/badge/-Docker-003f8c?style=flat-square&logo=docker&logoColor=fff)
![Express](https://img.shields.io/badge/-Express-339999?style=flat-square&logo=express)
![MySQL](https://img.shields.io/badge/-MySQL-EAA221?style=flat-square&logo=mysql&logoColor=1e4c68)
![Sequelize](https://img.shields.io/badge/-Sequelize-02afef?style=flat-square&logo=sequelize&logoColor=ffffff)
![JWToken](https://img.shields.io/badge/-JWToken-000?style=flat-square&logo=jsonwebtokens&logoColor=d63aff)
![Swagger](https://img.shields.io/badge/-Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=000)

# Desafios

- Técnicamente por ser algo que garante a melhor qualidade do projeto, foquei no uso do TDD (Test Driven Development), imaginar e prever o fluxo e abstração de cada funcionalidade na aplicação, para criar um teste para caso de falha e acerto, construir fases mais acertivas que deixam claro o que o teste está realizando para em caso de falhas, ser nítido onde ocorreu o erro, inicialmente na aplicação usei muito o teste manual abrindo o thunderclient para ver se realmente os testes estavam corretos, ao começar a me familiarizar mais com os testes a agilidade se tornava maior na criação e na confiança dos testes.
- Na parte lógica o maior desafio, foi para criar a tabela de leadership, onde eu precisava classicar cada time, com base em seus resultados, definindo um filtro, onde ele era "visitante" ou da "casa".


# Conclusão

- Foi muito gratificante, desenvolver e práticar nesse projeto o uso de classes, conseguir usar as classes para resolver o desafio para criar uma tabela de leadership, desenvolver e enteder melhor os testes de integração usando o typescript.
- Usei classes para seguir o padrão inicial do projeto para definir os services, mas quero melhorar o uso dos principios do SOLID, usei classes mais para familiarização, mas poderia ter aplicado vários principios no desenvolvimento, pretendo aplicar os principios de liskov, abrindo possibilidades de mudança de ORM e uma flexibilização maior no projeto.

# Iniciando o Projeto Blogs API.

Importante: seguir a ordem apresentada a baixo, para o funcionamento.

<details>
  <summary>
    <strong>
      ⚠️ Configurações mínimas para execução do projeto
    </strong>
  </summary>

   - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2
 - API Client ([Thunder Client](https://www.thunderclient.com/), [Insomnia](https://insomnia.rest/), [POSTMAN](https://www.postman.com/), ou algum outro de sua preferência)

</details>

<details>
  <summary>
    <strong>
      ⚙️ Variáveis de ambiente
    </strong>
  </summary>

Deve-se criar um arquivo .env na raiz do projeto com o seguinte conteúdo:
```
#### SERVER VARS
NODE_ENV=development
API_PORT=3000

#### DATABASE VARS
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB_NAME=blogs-api
MYSQL_USER=root
MYSQL_PASSWORD=password

#### SECRECT VARS
JWT_SECRET=suaSenhaSecreta
```
</details>

<details>
  <summary>
    <strong>
      ⚠️ Inicie o docker-compose
    </strong>
  </summary>

Para iniciar o docker compose, você deve estar dentro da pasta raiz do projeto usar o comando: `docker-compose up -d`

Verifique se os container está funcionando e rodando com o comando `docker ps`. Devem aparecer dois container com o nome de *blogs_api* e *blogs_api_db*.

</details>

<details>
  <summary>
    <strong>
      🗂 Acessando as Rotas
    </strong>
  </summary>

As rodas desenvolvidas no projeto são;

# /products
### GET - `localhost:3000/products/search`
- Rota responsável por realizar uma consultas por qualquer palavra inclusa em um nome de produto, usando o sinal de `?q=NomeDesejado` após search.

<details>
  <summary>
    Exemplo:
  </summary>

  ⚠️ Pode ser usado o URL em seu navegador, um API Client ou acessando a rota `localhost:3000/docs` em seu navegador.

  <a href="./img/swagger_searchProductName.png">
    <img src="./img/swagger_searchProductName.png" width="60%"></img>
  </a>

</details>

#
### GET - `localhost:3000/xxx/x`
- Rota responsável por realizar uma consulta por um produto especifico com base em seu *id*.
<details>
  <summary>
    Exemplo:
  </summary>

  ⚠️ Pode ser usado o URL em seu navegador, um API Client ou acessando a rota `localhost:3000/docs` em seu navegador.

  <a href="./img/swagger_getProductId.png">
    <img src="./img/swagger_getProductId.png" width="60%"></img>
  </a>

</details>

</details>
