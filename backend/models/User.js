const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : {type:String,require:true,unique:true}, //adresse e-mail de l'utilisateur [unique]
    password : {type:String,require:true} //mot de passe de l'utilisateur haché
});


module.exports = mongoose.model('User', userSchema);