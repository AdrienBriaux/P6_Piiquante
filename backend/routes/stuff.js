const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/stuff');
const multer = require('../middleware/multer-config');

// Route pour ajouter une nouvelle sauce

router.post('/', auth, multer, stuffCtrl.createThing);

// Route pour envoyer les likes/dislikes/annuler

router.post('/:id/like', auth, stuffCtrl.likeThing);

// Route pour modifier une sauce

router.put('/:id', auth, multer, stuffCtrl.modifyThing);

// Route pour supprimer une sauce

router.delete('/:id', auth, stuffCtrl.deleteThing);

// Route pour prendre une seul sauce

router.get('/:id', auth, stuffCtrl.getOneThing);

// Route pour récupérer toutes les sauces

router.get('/', auth, stuffCtrl.getAllThings);

module.exports = router;