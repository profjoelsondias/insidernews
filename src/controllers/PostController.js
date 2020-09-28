const knex = require("../database");

module.exports = {
    async store(req, res) {
        // Criar uma postagem 
        const {content, category} = req.body
        const newPost = {
            content, 
            category, 
            author: req.authenticatedUser,
            isAproved: false
        }
        return res.send(newPost)
    }, 

    async index(req, res) {
        // Listar postagens aprovadas para publicação
    }, 
    async update(req, res){
        // Atualizar uma postagem 
    }, 
    async delete(req, res){
        // Excluir uma postagem
    }
}