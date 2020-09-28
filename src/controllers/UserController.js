const knex = require('../database')
const bcrypt = require('bcryptjs')

module.exports = {   
    async store(req, res){
        const consultUser =  async (username) => {
            const result = await knex('users').where({username})
            console.log(" > Resultado: ", result)
            const {password, ...data} = result[0]
            return {data, password}
        }

        try {
            // {username: "LoideMartha", password: "abc123", isAdmin: false}
            // Coleta dos dados do corpo da requisição
            const {username, isAdmin = false} = req.body; // Desestruturação 
           // Hash da senha com o Bcrypt 
            const password = await bcrypt.hash(req.body.password, 8)
            // Armazenando (insert) os dados coletados na tabela "users" 
            await knex('users').insert({username, password, isAdmin})
            // Consultando na base um usuário onde o username seja o mesmo do REQ Body
            const newUser = await consultUser(username)
            console.log(" > Novo Usuário : ", newUser)
            return res.send(newUser.data)
        } catch (error) {
            return res.status('500').json({error: error.message})
        }
    },
    async index(req, res){
        const results = await knex('users')
        return res.json(results)
    },
}