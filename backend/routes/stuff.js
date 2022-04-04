const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/stuff');
const multer = require('../middleware/multer-config');

// Route pour ajouter une nouvelle sauce

router.post('/api/sauces', auth, multer, stuffCtrl.createThing);

// Route pour supprimer une sauce

router.delete('/api/sauces/:id', auth, stuffCtrl.deleteThing);

// Route pour récupérer toutes les sauces

router.get('/api/sauces', auth, stuffCtrl.getAllThings);

module.exports = router;