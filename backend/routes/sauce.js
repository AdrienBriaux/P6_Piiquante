const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauce');
const multer = require('../middleware/multer-config');

// Route pour ajouter une nouvelle sauce

router.post('/', auth, multer, sauceCtrl.createThing);

// Route pour envoyer les likes/dislikes/annuler

router.post('/:id/like', auth, sauceCtrl.likeThing);

// Route pour modifier une sauce

router.put('/:id', auth, multer, sauceCtrl.modifyThing);

// Route pour supprimer une sauce

router.delete('/:id', auth, sauceCtrl.deleteThing);

// Route pour prendre une seul sauce

router.get('/:id', auth, sauceCtrl.getOneThing);

// Route pour récupérer toutes les sauces

router.get('/', auth, sauceCtrl.getAllThings);

module.exports = router;