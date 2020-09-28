const knex = require('../database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/authConfig')

module.exports = {
    
    async store(req, res) {
        
        const {username, password} = req.body        
        
        // Funções de processamento 
        const consultUser =  async (username) => {
            const result = await knex('users').where({username})
            const {password, ...data} = result[0]
            // console.log(result)
            return {data, password}
        }

        const checkPassword = async (password, hash) => {
            const validate = await bcrypt.compare(password, hash)
            return validate
        }

        try {
            const user = await consultUser(username)
            // console.log(user)
            // Validações 
            if (!user) {
                return res.status(401).json({error: 'Users not found'}) 
            }

            if(!(await checkPassword(password, user.password))){
                return res.status(401).json({error: 'Password does not match'}) 
            }

            return res.json({
                user: user.data, 
                token: jwt.sign({username}, authConfig.secret, {
                    expiresIn: authConfig.expiresIn,
                })
            })
        } catch (error) {
            console.log(error)
            return res.status(401).json(error)
        }
    }
}