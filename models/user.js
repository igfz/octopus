var Mongoose = require("mongoose");
var CommonDao = require('../models/commonDao');

var Schema = Mongoose.Schema;
var userSchema = new Schema({ 
    email : String, 
    name : String, 
    salt : String, 
    password : String 
});
module.exports = Mongoose.model('User',userSchema);

//module.exports = new CommonDao(userModel);
