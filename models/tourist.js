var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
//tourist Schema
var touristschema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:
    {
        type:String
    },
    contactNo:{
        type:String
    },
    email:{
        type:String
    }
});



touristschema.methods.generateHash = function (password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

touristschema.methods.validPassword = function (password){
	console.log (bcrypt.compareSync(password,this.password))
	return bcrypt.compareSync(password,this.password);
}

module.exports=mongoose.model('tourist',touristschema);
//get Tourist
module.exports.getTourist=function(callback,limit){
    Tourist.find(callback).limit(limit);
    //Tour.find(callback);
    //console.log(callback);
}

module.exports.getTouristById=function(id,callback){
    Tourist.findOne(id,callback);
    //Tour.find(callback);
    //console.log(callback);
}

module.exports.addTourist=function(tourist,callback){
    Tourist.create(tourist,callback);
    //Tour.find(callback);
    //console.log(callback);
}
  
module.exports.updateTourist=function(id,tourist,options,callback){
    var query=Tourist.findOne(id);
    var update ={
        name:tourist.name,
        discription:tourist.discription
    } 
    Tourist.findOneAndUpdate(query,update,options,callback);
    //Tour.find(callback);
    //console.log(callback);
}

module.exports.deleteTourist=function(id,callback){
    //var query=Tourist.findOne(id);
    Tourist.deleteOne(id,callback);
    //Tour.find(callback);
    //console.log(callback);
}
