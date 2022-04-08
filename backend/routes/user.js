const express = require('express');
const router = express.Router();

// Cible le controleur spécifié
const userCtrl = require('../controllers/user');

// Routes d'accés vers les controleurs user
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Mise à disposition du routeur
module.exports = router;