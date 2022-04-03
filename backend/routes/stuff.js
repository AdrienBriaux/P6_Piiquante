const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff')

// Route pour ajouter une nouvelle sauce

router.post('/api/sauces', stuffCtrl.createThing);

// Route pour supprimer une sauce

router.delete('/api/sauces/:id', stuffCtrl.deleteThing);

// Route pour récupérer toutes les sauces

router.get('/api/sauces', stuffCtrl.getAllThings);

module.exports = router;