var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String },
    password: { type: String }

})

var userprofileSchema = new Schema({
    firstname:  { type: String },
    lastname :  { type: String },
    address  :  { type: String },
    userid: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
})

const userModel = mongoose.model('user', userSchema);
const userprofileModel = mongoose.model('userprofile', userprofileSchema);

module.exports.signUp = async(data1,data2)=> {
    try{
        let usr = new userModel(data1)
        var data = await usr.save()
        data2.userid = data._id
        let user1 = new userprofileModel(data2)
        var dat = await user1.save()
        return dat
    }
 catch(e){
     return []
 }
}


module.exports.findUserprofile = async(userid)=> {
    try{
        var data = await userprofileModel.find({userid:userid})
        return data
    }catch(e){
        return []
    }
}

module.exports.findUser = async(userid)=> {
    try{
        var data = await userModel.find({_id:userid})
        return data
    }catch(e){
        return []
    }
}

module.exports.listallusers = async()=> {
    try{
        var data = await userModel.find({})
        return data
    }catch(e){
        return []
    }
}

module.exports.listallusersprofiles = async()=> {
    try{
        var data = await userprofileModel.find({})
        return data
    }catch(e){
        return []
    }
}

module.exports.findUserbymail = async(email)=> {
    try{
        var data = await userModel.find({email:email})
        return data
    }catch(e){
        return []
    }
}
