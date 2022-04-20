var express = require('express')
var router = express.Router()

var user =require('./controllers/user')
var notes =require('./controllers/notes')

router.use('/user', user)
router.use('/notes', notes)

module.exports = router