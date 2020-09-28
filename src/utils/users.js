const knex = require('../database')

module.exports = {
    consultUser : async (username) => {
        const result = await knex('users').where({username})
        let credentials = {}
        
        if(!result.length === 0){
            const {password, ...data} = result[0]
            credentials = {data, password}
        }        
        return credentials
    }
}