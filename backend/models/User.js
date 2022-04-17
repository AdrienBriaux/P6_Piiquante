const mongoose = require('mongoose');

// Contrôle de l'existence unique de l'adresse mail dans la base de données

const uniqueValidator = require('mongoose-unique-validator');

// Création schéma utilisateur

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

// Mise à disposition du model User

module.exports = mongoose.model('User', userSchema);