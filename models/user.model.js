const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Users = new  Schema(

        {
            "_id":{type:String},
            "userid":{type:String},
            "password":{type:String},
            "email":{type:String},
            "active":{type:String}
        }
);
module.exports = mongoose.model('Users',Users);