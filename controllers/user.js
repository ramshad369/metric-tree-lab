var express = require('express')
var router = express.Router()
var usermodel = require('../models/userModel')
var validateuser = require('../validator/userValidator')
var bcrypt = require( 'bcrypt' );
var jwt = require("jsonwebtoken")
var ensureToken = require('../utils/jwttoken')

router.post('/signup', validateuser.signupValidation(), async (req, res) =>{
    try{
        let data ={}
        data.email = req.body.email
        var password = bcrypt.hashSync( req.body.password, 10 );
        data.password = password
    
    let dat = {}
        dat.firstname = req.body.firstname
        dat.lastname = req.body.lastname
        dat.address = req.body.address
    
        var userlist = await usermodel.listallusers()
        
        for(i=0;i<userlist.length;i++){
        if(userlist[i].email === req.body.email){
            res.status(400)
            res.json({ error: 'cannot use this email!', error_description: "email id already in use!" })
            return
        }
    }
        
    var result = await usermodel.signUp(data,dat)
        if(!result){
            res.status(400)
            res.json({ error: 'signup failed!', error_description: "error" })
            return
        }
            res.json({ message: 'signup successful!'})
        }catch(error){
            console.log(error);
        }
    })
    
    router.post('/login', validateuser.loginValidation(), async (req, res) =>{
     try{
        var result = await usermodel.findUserbymail(req.body.email)

        bcrypt.compare( req.body.password, result[0].password, function( err, result1 ) {
            if( result1 ) {
                    let data = {
                        _id: result[0]._id,
                        email: result[0].email
                    }
                    let token = jwt.sign(data,"edu_secret_key",{expiresIn: 86400})
                    res.json({ message: 'login successful!', token: token, userId:data._id}) 
                     } 
             else {
                    res.status(400)
                    res.json({ message: 'login failed!',error_description: "incorrect password!"})
                    return
            }
        }) 
     }catch(error){
         console.log(error);
     }
     })
     
router.get('/listallusersprofiles', async (req, res) =>{
       var result = await usermodel.listallusersprofiles()
            if(!result){
                res.status(400)
                res.json({ error: 'notes data empty', error_description: "" })
                return
            }
            res.json(result)
        })
    
router.get('/logout', async (req, res) =>{
console.log("wipe the token!")
res.status(204)
return
        })     
    module.exports = router