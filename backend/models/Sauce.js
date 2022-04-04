const mongoose = require('mongoose');

// Création schéma d'une sauce 

const sauceSchema = mongoose.Schema({

    userId: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, value: 0 },
    dislikes: { type: Number, value: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] }
});


// Mise à disposition du model Sauce

module.exports = mongoose.model('Sauce', sauceSchema);