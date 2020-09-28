// Referencia direta ao pacote 
require('dotenv').config()

const express = require("express");

// Referencia pelo caminho relativo 
const routes = require('./src/routes')

const app = express();
// Express -> Funções que permitem o funcionamento do servidor web. 
// Ao adicionar express() à váriável App estamos adicionando a essa variável uma instância do express

// JSON -> JavaScript Object Notation
// Habilita o uso de JSON nas requisições e respostas
// Exemplo de JSON: {name: "João" , idade: 19}
app.use(express.json());

// Separando a responsabilidade de rotas da aplicação para um arquivo separado.
app.use(routes)

// Função de Callback: Ela é tipicamente passada como argumento de outra função e/ou chamada quando um evento for acontecido, ou quando uma parte de código receber uma resposta de que estava à espera.
app.listen(3000, function(){
    console.log("Server is running in http://localhost:3000")
}); 