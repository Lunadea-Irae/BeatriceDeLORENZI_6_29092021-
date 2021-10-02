const mongoose = require('mongoose');
const uniqueValidator = require('@vgdaut/mongoose-unique-validator');

const sauceSchema = mongoose.Schema({
    userId: { type: String, require: true }, // l'identifiant MongoDB unique de l'utilisateur qui a créé la sauce
    name: { type: String, required: true,unique:true,validate: [/^[<>%\$]/, "Ceci n'est pas un nom de sauce valide"]}, // nom de la sauce
    manufacturer: { type: String, require: true,validate: [/^[<>%\$]/, "Ceci n'est pas un fabricant valide"] }, // fabricant de la sauce
    description: { type: String, require: true,validate: [/^[<>%\$]/, "Ceci n'est pas une description autorisée, supprimez les caractères spéciaux."] }, // description de la sauce
    mainPepper: { type: String, require: true,validate: [/^[<>%\$]/, "Ceci n'est pas un ingrédient valide"] }, // le principal ingrédient épicé de la sauce
    imageUrl: { type: String, require: true }, // l'URL de l'image de la sauce téléchargée par l'utilisateur
    heat: { type: Number, require: true}, // nombre entre 1 et 10 décrivant la sauce
    likes: { type: Number, require: true }, // nombre d'utilisateurs qui aiment (= likent) la sauce
    dislikes: { type: Number, require: true }, // nombre d'utilisateurs qui n'aiment pas (= dislike) la sauce
    usersLiked: { type: Array, require: true },// [ "String <userId>" ]  tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce
    usersDisliked: { type: Array, require: true } //[ "String <userId>" ]  tableau des identifiants des utilisateurs qui n'ont pas aimé (= disliked) la sauce
});

sauceSchema.plugin(uniqueValidator, { message: 'Ce nom de sauce est déjà utilisé sur ce site.' });
module.exports = mongoose.model('Sauce', sauceSchema);