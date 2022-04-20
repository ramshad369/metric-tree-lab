var express = require('express')
var router = express.Router()
var multer = require('multer')
var notesModel = require('../models/notesModel')
var ensureToken = require('../utils/jwttoken')
var jwt_decode = require("jwt-decode") 
var usermodel = require('../models/userModel')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
router.post('/createnotes',ensureToken, async(req, res) =>{

      var upload = multer({ storage: storage }).single('fileupload');  

      upload(req, res,async function(err) {
        if (req.fileValidationError) {
             res.status(400)
             res.send(req.fileValidationError);
             return
        }
        else if (!req.file) {
            res.status(400)
            res.send('Please select an image to upload');
            return
        }
        else if (err instanceof multer.MulterError) {
            res.status(400) 
            res.send(err)
            return
        }
        else if (err) {
                   res.status(400)
                   res.send(err)
                   return
        }

        var userdetails = jwt_decode(req.headers.authorization) 

        var result1 = await usermodel.findUserprofile(userdetails._id)

    let data ={}
        data.userid = userdetails._id
        data.userprofile = result1._id
        data.notetext = req.body.notetext
        data.fileupload = req.file.path

        notesModel.createnotes(data,(error,result)=>{
        if(!result){
            res.json({ error: 'Adding notes is failed!', error_description: error })
            return
        }
            res.json({ message: 'notes created successfully!'})
    })
      })
})

router.post('/updatenotes',ensureToken, async(req, res) =>{
    var upload = multer({ storage: storage }).single('fileupload');  

    upload(req, res,async function(err) {
      if (req.fileValidationError) {
           res.status(400)
           res.send(req.fileValidationError);
           return
      }
      else if (!req.file) {
          res.status(400)
          res.send('Please select an image to upload');
          return
      }
      else if (err instanceof multer.MulterError) {
          res.status(400) 
          res.send(err)
          return
      }
      else if (err) {
                 res.status(400)
                 res.send(err)
                 return
      }

      var userdetails = jwt_decode(req.headers.authorization) 

      var result1 = await usermodel.findUserprofile(userdetails._id)

  let data ={}
      data.userid = userdetails._id
      data.userprofile = result1._id
      data.notetext = req.body.notetext
      data.fileupload = req.file.path

     var result = await notesModel.updatenotes(data,req.body.notesid)
      if(!result){
          res.status(400)
          res.json({ error: 'Updating notes is failed!', error_description: error })
          return
      }
          res.json({ message: 'notes updated successfully!'})
  })

})
router.get('/listallnotes', async (req, res) =>{
    notesModel.listallnotes((result)=>{
        if(!result){
            res.status(400)
            res.json({ error: 'notes data empty', error_description: "" })
            return
        }
        res.json(result)
    })

})

router.delete('/deletenote', async (req, res) =>{
    notesModel.deletenotes(req.body.notesid,(result)=>{
        if(!result){
            res.status(400)
            res.json({ error: 'notes data empty', error_description: "" })
            return
        }
        res.json(result)
    })

})

module.exports = router
