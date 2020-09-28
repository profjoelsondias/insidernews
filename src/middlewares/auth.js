const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const authConfig = require('../config/authConfig')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    // console.log(` >> Auth: ${authHeader}`)
    if(!authHeader){
        return res.status(401).json({error: 'Token not provided'})
    }

    const [, token] = authHeader.split(' ')
   
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret)
        req.authenticatedUser = decoded.username
        return next()
        
    } catch (error) {
        return res.status(401).json({error: 'Token invalid'})
    }
}

module.exports = authMiddleware