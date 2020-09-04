<h3 align="center">
	Chatroom - NodeJS - ReactJS
</h3>

## Visão geral

**Este projeto foi desenvolvido para fins de aprendizagem.** 4 telas estão disponíveis, divididas entre o sistema web e mobile.

## Execução do projeto

Em primeiro lugar, certifique-se de que o NodeJS(v12.18.3) e Node Package Manager (npm) estão instalados em sua máquina. Feito isso, siga os seguintes passos:

1. Clone este repositório ou baixe e descompacte o arquivo .zip
2. Utilize o comando "npm install" em seu terminal nos diretórios "backend" e "frontend" para fazer download das dependências do projeto
3. Depois de concluidos os downloads, em duas janelas distintas do seu terminal, utilize o comando "npm start" nos diretórios "backend" e "frontend" para executar os projetos. É importante que você não feche os terminais para manter os processos rodando
4. Uma janela no seu navegador deve abrir automaticamente mostrando a aplicação web. Caso isso não aconteça, acesse manualmente pelo endereço http://localhost:3000 ou pela porta indicada em seu terminal após executar o comando "npm start" no diretório "frontend"

## Rotas da aplicação web

A aplicação web possui 4 rotas, sendo elas:

1. /adminLogin (tela de login do adminstrador, a qual redireciona o usuário à dashboard caso o login seja efetuado)
2. /dashboard (tela de dashboard do administrador, onde é possível executar ações como listagem, filtragem e exclusão de mensagens)
3. / (rota raíz da aplicação, carrega a página do login de participante)
4. /chat (tela do chatroom dos participantes, nela é possível ver e enviar mensagens)

## Dados para efetuar login

O banco de dados possui 3 participantes cadastrados que podem ser utilizados para login:

|       Participante 1      |      Participante 2      |      Participante 3      |
| ------------------------- | ------------------------ | ------------------------ |
|  username: Participante1  |  username: Participante2 | username: Participante2  |
|  senha: participante1     |  senha: participante2    | senha: participante2     |

O banco de dados possui 1 administrador cadastrado que pode ser utilizado para login:

| Admin 1  	    |
| ----------------- |
|  username: Admin  |
|  senha: admin     |

## Contribuidores

<table>
  <tr>
<td align="center"><a href="https://github.com/RogerBambinetti"><img src="https://avatars0.githubusercontent.com/u/50684839?s=460&v=4" width="100px;" alt="Roger Bambinetti"/><br /><sub><b>Roger Bambinetti</b></sub></a></td>
  </tr>
</table>
