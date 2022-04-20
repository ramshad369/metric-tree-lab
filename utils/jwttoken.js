const { JsonWebTokenError } = require("jsonwebtoken")
var jwt = require("jsonwebtoken")

ensureToken = (req, res, next)=> {
    var authHeader = req.headers.authorization
    if(authHeader == undefined){
        res.status(401).send({error: "No token provided!"})
        return
    }
    var token = authHeader.split(" ") [1]
    jwt.verify(token,"edu_secret_key",(error, decoded)=>{
        if(error){
            res.status(500).send({error: "authentication failed!"})
            return
        }
        else{
            next()
        }
    })
  }
  module.exports = ensureToken