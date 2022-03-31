const express = require('express');
const mongoose = require('mongoose');
const app = express();

// CORS

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Connection MongoDB

mongoose.connect('mongodb+srv://Ibanez:Ibanez@cluster0.fpqz2.mongodb.net/sauces?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Convertion des réponses en JSON

app.use(express.json());

// test server

app.use((req, res, next) => {
    console.log('requête reçue !');
})

module.exports = app;