const mongoose = require('mongoose');

// Controle de l'existence unique de l'adresse mail dans la dataBase

const uniqueValidator = require('mongoose-unique-validator');

// Création chéma utilisateur

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

// Mise à disposition du model User 

module.exports = mongoose.model('User', userSchema);