const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const userRoutes = require('./routes/user');
const stuffRoutes = require('./routes/stuff');

// CORS

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Connection MongoDB

mongoose.connect('mongodb+srv://Ibanez:Ibanez@cluster0.fpqz2.mongodb.net/Piiquante?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Convertion des réponses en JSON

app.use(express.json());

//////////////// Enregistrement des chemins de requête ///////////////////

// Mise à disposition de la route authentification sécurisé

app.use('/api/auth', userRoutes);

// Mise à disposition des routes stuff

app.use('/api/sauces', stuffRoutes);


// Mise à disposition du contenu images

app.use('/images', express.static(path.join(__dirname, 'images')));

// test server

app.use((req, res) => {
    console.log('requête reçue !');
})

// Mise à disposition de app.js
module.exports = app;