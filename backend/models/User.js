const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [/.+@.+\..+/, "Ceci n'est pas un email valide"],
        required: [true, 'Un email est nécessaire'],
        unique: true
    }, //adresse e-mail de l'utilisateur [unique]
    password: {type: String, require: true,} //mot de passe de l'utilisateur haché
});

userSchema.plugin(uniqueValidator, { message: 'Cet email est déjà utilisé sur ce site.' });
module.exports = mongoose.model('User', userSchema);