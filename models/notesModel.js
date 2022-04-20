var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var notesSchema = new Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
    userprofileid: { type: mongoose.Schema.Types.ObjectId, ref: "userprofile"},
    notetext: { type: String },
    fileupload: { type: String },
})

const notesModel = mongoose.model('notes', notesSchema);

module.exports.createnotes = (data1,callback)=> {
    let usr = new notesModel(data1)
    usr.save((error, data) => { callback(error, data) })
}

module.exports.updatenotes = async (data, id)=> {
    try{
        return notesModel.updateOne({_id:id}, data).exec()
    }catch(e){
        return []
    }
}


module.exports.listallnotes = async (callback)=> {
    await notesModel.find({}).exec((err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}

module.exports.deletenotes = (id,callback)=> {
    notesModel.deleteOne({_id:id},(err,data)=>{
        if(err){
            callback(null)
        }
        else{
            callback(data)
        }
    })
}



