# Introdução

Esta é a aplicação usada como modelo para as demais aplicações do TRE-TO. Ela usa separação de frontend e backend. No primeiro é usado ReactJS e no segundo, é usado Spring Boot. Para padronização, ambas as pastas devem estar dentro do mesmo repositório Git.

# ReactJS

Documentação: http://reactjs.org 

## JSX:
* HTML e JS juntos
* Uso de JS puro para os operadores
* Componentes
* DOM Virtual
* Webpack e BabelJS

## Criação da aplicação
* Instalar o create-react-app
* npm install create-react-app
* Criar a aplicação
  * $node_modules/.bin/create-react-app frontend
  * $node_modules é a pasta node_modules que será criada quando o create-react-app for instalado.

## Execução da aplicação
* `cd frontend`
* `npm start`

## Uso do router (templates e links entre páginas)
* npm install --save-dev react-router-dom

# Spring Boot

* Java 8
* Documentação de cada subprojeto em http://spring.io 
* Criação do projeto em http://start.spring.io/ (com Maven)
* Dependências:
  * Web
  * H2
  * JPA
  * Security
  * Lombok: https://projectlombok.org/
  
# Ambiente de desenvolvimento

* Recomenda-se o uso do Spring Tool Suite, pois é possível habilitar o *hot swapping* na forma apresentada na seção 'Dicas'.
* Para usar o Lombok, deve-se executar o arquivo lombok-<VERSAO>.jar e escolher a IDE usada.

## Controllers

* Spring Web MVC (https://docs.spring.io/spring/docs/5.0.3.RELEASE/spring-framework-reference/web.html)
* RestController: retorno em JSON
* Principais anotações do RestController:
  * @<VERBO>Mapping
  * @PathVariable
  * @Valid

## Criação das entidade e dos repositórios
* Usamos Spring Data JPA, que é compatível com Hibernate
* Doc do Spring Data JPA: https://docs.spring.io/spring-data/jpa/docs/2.0.3.RELEASE/reference/html/
* Doc do Hibernate: hibernate.org
* Acessando o H2:
  * Adicionar a classe ConsoleConfiguration
  * Usar a URL jdbc:h2:mem:testdb no login
* Repositório: *service* para acesso a dados
* HQL: *Hibernate Query Language* - linguagem para consulta ao BD por meio das classes de entidade. Expressões HQL são representadas com a anotação @Query.

## Segurança

A aplicação modelo está configurada para trabalhar com CORS e CSRF. O primeiro se refere, a grosso modo, à possibilidade de uma página fazer requisições assíncronas a um recurso hospedado em outro endereço/porta. Esse é o caso quando o cliente em React acessa o *backend* em Spring Boot/MVC.

Já o CSRF é um tipo de ataque em que um atacante se aproveita de uma sessão aberta do usuário. O Spring Security possui a proteção para esse tipo de ataque habilitada por padrão. Na aplicação modelo, essa proteção é mantida, requerendo o envio de cookies específicos para as operações autenticadas, por parte do cliente, em React.

## Dicas

* Habilitando Hot Swapping no STS: http://blog.netgloo.com/2014/05/21/hot-swapping-in-spring-boot-with-eclipse-sts/
* Consulta de dependências do Maven: http://mvnrepository.org
