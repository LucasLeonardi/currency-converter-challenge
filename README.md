# Documentação

O projeto foi implementado com NESTJS, Typescript e para o banco usei uma solução de banco em memoria, infelizmente não conheço muitas soluçoes para banco embadded
para o Typescript, porem gostaria de dizer que tenho vasto conhecimento em soluções de banco de dados tradicionais como postgres e minha ideia inicial era construir
uma solução utilizando postgres juntamente ao Docker.

Para para rodar o projeto recomendo utilização do Node 14.15.0 pois foi a versão que utilizei durante o projeto, NVM é uma ótima ferramente que permite mudar com facilidade
a versão do Node utilizada.

Para instalar o projeto basta digitar npm i

Para rodar o projeto digite npm run start:dev

Uma vez que o projeto esteja rodando basta acessar localhost:300/api para acessar o swegger

Como o projeto exigia uma usuario decidi criar um pequeno sistema de criação de conta de login e autenticação de rotar com o token JWT
O token é recebido após o login e deve ser utilizado para as rotas post e get currency-converter.

Para utilizar o token no swegger basta clicar no botão "Authoriza" e preencher com o token

As rotas users e users/login aceitam name e password como parametros, decidi encriptar o password utilizando bcrypt

A rota /currency-converter aceita fromCurrency(a moeda que voce quer converter), toCurrency(para qual moeda sera convertida) e originalAmount(valor a ser convertido)

Para rodar os testes unitarios de forma isolada:
  Testar user controller: npm run test:watch -t src/users/users.controller.spec.ts
  Testar user service: npm run test:watch -t src/users/users.service.spec.ts
  Testar currency-converter controller: npm run test:watch src/currency-converter/currency-converter.controller.spec.ts
  Testar currency-converter service: npm run test:watch src/currency-converter/currency-converter.service.spec.ts

Desde já agradeço pela oportunidade e espero ter atendido as espectativas

# Conversor de moedas

Voc� dever� implementar uma API Rest que seja capaz de realizar a convers�o entre duas moedas
utilizando taxas de convers�es atualizadas de um servi�o externo.

Para realiza��o da convers�o � necess�rio o ID do usu�rio que deseja realizar a convers�o.

A API dever� registrar cada transa��o de convers�o com todas as informa��es relacionadas e tamb�m
disponibilizar um endpoint para consulta das transa��es realizadas por um usu�rio.

O projeto dever� ser feito em Node.js com TypeScript.

1. Deve ser poss�vel realizar a convers�o entre 4 moedas no m�nimo (BRL, USD, EUR, JPY);
1. As taxas de convers�o devem ser obtidas de [https://api.exchangeratesapi.io/latest?base=EUR] 
  (Usar a API Free - Tem limita��o de requisi��es, e apenas convers�o com base na moeda EUR);
1. As transa��es de convers�o devem ser persistidas no banco de dados (embedded) contendo:
    * ID do usu�rio;
    * Moeda origem;
    * Valor origem;
    * Moeda destino;
    * Taxa de convers�o utilizada;
    * Data/Hora UTC;
1. Uma transa��o com sucesso deve retornar:
    * ID da transa��o
    * ID do usu�rio;
    * Moeda origem;
    * Valor origem;
    * Moeda destino;
    * Valor destino;
    * Taxa de convers�o utilizada;
    * Data/Hora UTC;
1. Os casos de falha devem retornar com status code pertinente e descri��o no corpo;
1. Dever� existir um endpoint para listagem de todas as transa��es realizadas por usu�rio;
1. Deve haver uma cobertura satisfat�ria de testes;
1. Deve-se adicionar a esse arquivo explica��es sobre como rodar a aplica��o, e uma apresenta��o sobre o
projeto: prop�sito, features, motiva��o das principais escolhas de tecnologias, e separa��o das camadas;
1. Todo o c�digo deve ser em ingl�s;
1. Disponibilizar o c�digo apenas nesse reposit�rio, sem nenhuma c�pia p�blica, para evitar pl�gio;

## Itens desej�veis
* Logs
* Tratamento de exce��es
* Documenta��o
* Coes�o de commits
* Mensagens de commits claras
* Configura��o de lint
* Testes unit�rios
* Testes de integra��o
* Documenta��o dos endpoints
* Estar rodando e dispon�vel (Ex: Heroku, ou similar)
* CI/CD
