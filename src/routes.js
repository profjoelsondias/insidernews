const express = require("express");

// Cria uma instancia do gerenciador de rotas do express
const route = express.Router();
const authMiddleware = require('./middlewares/auth') 

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const PostController = require('./controllers/PostController');

// Criar um usuário - http://localhost:3000/users - POST
route.post("/users", UserController.store ) //C - Create |Verbo: POST  |Função: store
route.get("/users", UserController.index) // R - Read  |Verbo: GET    | Função: index

route.post("/login", SessionController.store )

// Verificar se as requisições possuem token
route.use(authMiddleware)
route.post('/posts', PostController.store ) // imprime ola mundo

// Permite que esse arquivo seja importado em outro arquivo 
module.exports = route;