var emailValidator = require("email-validator")

signupValidation = () =>{

  return (req, res, next) => {

    if(!req.body.email){
      res.status(400)
      res.json({error: "invalid details!", error_description: "email is required!"})
      return
    }
    else if(typeof (req.body["email"]) !== "string"){
      res.status(400)
      res.json({error: "invalid details!", error_description: "email must be string!"})
      return
    }
    else if(!emailValidator.validate(req.body.email)){
      res.status(400)
      res.json({error: "invalid details!", error_description: "Invalid email!"})
      return
    }

    if(!req.body.password){
      res.status(400)
      res.json({error: "invalid details!", error_description: "password is required!"})
      return            
    }
    if(!req.body.firstname){
      res.status(400)
      res.json({error: "invalid details!", error_description: "firstname is required!"})
      return
    }
    else if(typeof (req.body["firstname"]) !== "string"){
      res.status(400)
      res.json({error: "invalid details!", error_description: "firstname must be string!"})
      return
    }    
    if(!req.body.lastname){
      res.status(400)
      res.json({error: "invalid details!", error_description: "lastname is required!"})
      return
    }
    else if(typeof (req.body["lastname"]) !== "string"){
      res.status(400)
      res.json({error: "invalid details!", error_description: "lastname must be string!"})
      return
    }
    if(!req.body.address){
      res.status(400)
      res.json({error: "invalid details!", error_description: "address is required!"})
      return
    }
    else if(typeof (req.body["address"]) !== "string"){
      res.status(400)
      res.json({error: "invalid details!", error_description: "address must be string!"})
      return
    }
    next()
  }
}
loginValidation = () =>{

  return (req, res, next) => {

    if(!req.body.email){
      res.status(400)
      res.json({error: "invalid details!", error_description: "email is required!"})
      return
    }
    else if(typeof (req.body["email"]) !== "string"){
      res.status(400)
      res.json({error: "invalid details!", error_description: "email must be string!"})
      return
    }
    else if(!emailValidator.validate(req.body.email)){
      res.status(400)
      res.json({error: "invalid details!", error_description: "Invalid email!"})
      return
    }

    if(!req.body.password){
      res.status(400)
      res.json({error: "invalid details!", error_description: "password is required!"})
      return            
    }
    next()
  }
}

module.exports ={
  signupValidation,
  loginValidation
}