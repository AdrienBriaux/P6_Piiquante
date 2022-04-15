const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

app.use(helmet());
// Protection contre les failles XSS pour express
app.use(helmet.xssFilter());
// Protection X-Frame-Options contre l'insertion de la page dans une frame
app.use(helmet.frameguard({ action: 'deny' }));
// Sécurité anti clickjacking
app.use(helmet.noSniff());


// Gestion des requêtes avec CORS
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization ');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    res.setHeader('Cross-Origin-Resource-Policy', "cross-origin")
    next();
});

// Connection MongoDB

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Convertion des réponses en JSON

app.use(express.json());

//////////////// Enregistrement des chemins de requête ///////////////////

// Mise à disposition des routes user

app.use('/api/auth', userRoutes);

// Mise à disposition des routes sauces

app.use('/api/sauces', sauceRoutes);


// Mise à disposition du contenu images

app.use('/images', express.static(path.join(__dirname, 'images')));

// Mise à disposition de app.js
module.exports = app;