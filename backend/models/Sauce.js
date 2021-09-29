const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
name : {type:String,required:true}, // nom de la sauce
manufacturer : {type:String,require:true}, // fabricant de la sauce
description : {type:String,require:true}, // description de la sauce
mainPepper : {type:String,require:true}, // le principal ingrédient épicé de la sauce
imageUrl : {type:String,require:true}, // l'URL de l'image de la sauce téléchargée par l'utilisateur
heat :{type: Number,require:true}, // nombre entre 1 et 10 décrivant la sauce
likes : {type:Number,require:true}, // nombre d'utilisateurs qui aiment (= likent) la sauce
dislikes : {type:Number,require:true}, // nombre d'utilisateurs qui n'aiment pas (= dislike) la sauce
usersLiked : {type:Array,require:true},// [ "String <userId>" ]  tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce
usersDisliked : {type:Array,require:true} //[ "String <userId>" ]  tableau des identifiants des utilisateurs qui n'ont pas aimé (= disliked) la sauce
});

module.exports = mongoose.model('Sauce', sauceSchema);